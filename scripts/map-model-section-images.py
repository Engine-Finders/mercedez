"""Map replacementCosts + engineEvolution images on all model JSONs from public/cars."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "src" / "data" / "models"
FILES = sorted(p.name for p in (ROOT / "public" / "cars").glob("*.webp"))
CODE_RE = re.compile(r"\b([A-Z]{1,3}\d{3})\b", re.I)

CODE_ALIASES = {
    "w208": ["c208", "a208"],
    "w209": ["c209", "a209"],
}

SLUG_FALLBACK = {
    "a-class": ["a-class"],
    "amg-gt": ["amg gt"],
    "b-class": ["b-class"],
    "c-class": ["c-class"],
    "citan": ["citan"],
    "cla": ["cla"],
    "clc-class": ["clc", "cl203"],
    "clk": ["clk"],
    "cls": ["cls"],
    "e-class": ["cls", "c-class"],
    "g-class": ["b-class"],
    "gla": ["b-class", "a-class"],
    "glc": ["c-class", "cla"],
    "gle": ["b-class", "c-class"],
    "glk": ["b-class"],
    "gls": ["b-class"],
    "m-class": ["b-class"],
    "r-class": ["b-class"],
    "s-class": ["cls", "c-class"],
    "sl": ["amg gt", "clk"],
    "slk-slc": ["clk"],
    "sls-amg": ["amg gt"],
    "sprinter": ["citan"],
    "v-class": ["citan"],
    "vaneo": ["a-class", "b-class"],
    "vario": ["citan"],
    "viano": ["citan"],
    "vito": ["citan"],
}


def score(name: str) -> tuple:
    fl = name.lower()
    amg = 1 if ("amg" in fl and "amg line" not in fl and "std amg" not in fl) else 0
    special = 1 if "special-" in fl or "evolution" in fl else 0
    std = 0 if ("standard" in fl or "std " in fl) else 1
    facelift = 1 if ("facelift" in fl or " lci" in fl) else 0
    dup = 5 if "(" in name else 0
    nums = [int(n) for n in re.findall(r"[a-z](\d{3})", fl)]
    newest = max(nums) if nums else 0
    return (-newest, amg, special, std, facelift, dup, len(name))


def files_for_code(code: str) -> list[str]:
    code = code.lower()
    needles = [code, *CODE_ALIASES.get(code, [])]
    out: list[str] = []
    seen: set[str] = set()
    for needle in needles:
        for f in FILES:
            if f in seen:
                continue
            if re.search(rf"(^|[- ]){re.escape(needle)}([- .]|$)", f.lower()):
                seen.add(f)
                out.append(f)
    return out


def pick_codes(text: str, slug: str) -> str | None:
    codes = CODE_RE.findall(text or "")
    cands: list[str] = []
    for code in codes:
        cands.extend(files_for_code(code))
    if cands:
        return sorted(set(cands), key=score)[0]
    for alt in SLUG_FALLBACK.get(slug, [slug]):
        parts = alt.lower().split()
        matched = [f for f in FILES if all(p in f.lower() for p in parts)]
        if matched:
            return sorted(matched, key=score)[0]
    return None


def main() -> None:
    updated = 0
    for path in sorted(MODELS_DIR.glob("*.json")):
        slug = path.stem
        data = json.loads(path.read_text(encoding="utf-8"))
        changed = False

        hero = (data.get("hero") or {}).get("headerImage") or {}
        hero_src = hero.get("src")
        if hero_src:
            quote = data.setdefault("editorialPullQuote", {})
            if isinstance(quote, dict):
                quote["image"] = {"src": hero_src, "alt": hero.get("alt") or f"Mercedes-Benz {slug}"}
                changed = True

        costs = data.get("replacementCosts") or {}
        for table in costs.get("tables") or []:
            if not isinstance(table, dict):
                continue
            filename = pick_codes(table.get("title") or "", slug)
            if filename:
                table["image"] = {
                    "src": f"/cars/{filename}",
                    "alt": table.get("title") or slug,
                }
                changed = True
                print(f"COST {slug:12s} {table.get('title','')[:40]:40s} -> {filename[:55]}")

        evo = data.get("engineEvolution") or {}
        for era in evo.get("eras") or []:
            if not isinstance(era, dict):
                continue
            blob = f"{era.get('era','')} {era.get('years','')} {era.get('keyEngines','')}"
            filename = pick_codes(blob, slug)
            if filename:
                era["image"] = {
                    "src": f"/cars/{filename}",
                    "alt": era.get("era") or slug,
                }
                changed = True
                print(f"EVO  {slug:12s} {(era.get('era') or '')[:40]:40s} -> {filename[:55]}")

        if changed:
            path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            updated += 1

    print(f"\nUpdated {updated} model JSON files")


if __name__ == "__main__":
    main()
