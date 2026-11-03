"""Set generations.cards[].image on all model JSON pages from public/cars."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "src" / "data" / "models"
CARS_DIR = ROOT / "public" / "cars"
MODELS_IMG = CARS_DIR / "models"

FILES = sorted(p.name for p in CARS_DIR.glob("*.webp"))
MODEL_FILES = {p.stem: p.name for p in MODELS_IMG.glob("*.webp")} if MODELS_IMG.exists() else {}

CODE_RE = re.compile(r"\b([A-Z]{1,3}\d{3})\b", re.I)

# Chassis aliases when filename uses a sibling body code
CODE_ALIASES: dict[str, list[str]] = {
    "w208": ["c208", "a208"],
    "w209": ["c209", "a209"],
    "r190": ["c190"],
    "x290": ["r232", "c190"],
    "cl203": ["cl203"],
}

# When no chassis file exists, use nearest available cars folder match
SLUG_FALLBACK_NEEDLES: dict[str, list[str]] = {
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
    "glk": ["b-class", "c-class"],
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

BODY_HINTS = (
    ("cabriolet", ("cabriolet", "convertible")),
    ("convertible", ("cabriolet", "convertible")),
    ("estate", ("estate", "shooting brake")),
    ("shooting brake", ("shooting brake", "estate")),
    ("roadster", ("roadster",)),
    ("tourer", ("tourer",)),
    ("coupé", ("coupé", "coupe")),
    ("coupe", ("coupé", "coupe")),
)


def score_file(name: str, prefer_body: tuple[str, ...] = ()) -> tuple:
    fl = name.lower()
    body_hit = 0 if (prefer_body and any(b in fl for b in prefer_body)) else (1 if prefer_body else 0)
    amg_special = (
        1
        if ("amg" in fl and "amg line" not in fl and "std amg" not in fl and "standard amg" not in fl)
        else 0
    )
    special_trim = 1 if "special-" in fl or "evolution" in fl or "edition" in fl else 0
    standard = 0 if ("standard" in fl or "std " in fl or "std-" in fl) else 1
    facelift = 1 if ("facelift" in fl or " lci" in fl or "-lci" in fl) else 0
    dup = 5 if "(" in name else 0
    return (body_hit, amg_special, special_trim, standard, facelift, dup, len(name))


def files_for_code(code: str) -> list[str]:
    code = code.lower()
    needles = [code, *CODE_ALIASES.get(code, [])]
    out: list[str] = []
    seen: set[str] = set()
    for needle in needles:
        for f in FILES:
            fl = f.lower()
            if f in seen:
                continue
            # chassis token boundaries in filenames like "c-class-w203-..." or "amg gt-c190-..."
            if re.search(rf"(^|[- ]){re.escape(needle)}([- .]|$)", fl):
                seen.add(f)
                out.append(f)
    return out


def body_prefer(title: str) -> tuple[str, ...]:
    tl = title.lower()
    for key, needles in BODY_HINTS:
        if key in tl:
            return needles
    return ()


def pick_for_codes(codes: list[str], title: str) -> str | None:
    prefer = body_prefer(title)
    cands: list[str] = []
    for code in codes:
        cands.extend(files_for_code(code))
    # de-dupe preserve order
    seen: set[str] = set()
    uniq = []
    for f in cands:
        if f not in seen:
            seen.add(f)
            uniq.append(f)
    if not uniq:
        return None
    return sorted(uniq, key=lambda f: score_file(f, prefer))[0]


def pick_slug_fallback(slug: str) -> str | None:
    # Prefer dedicated model plate in /cars/models when chassis asset is missing
    if slug in MODEL_FILES:
        return f"models/{MODEL_FILES[slug]}"
    for alt in SLUG_FALLBACK_NEEDLES.get(slug, [slug]):
        parts = alt.lower().split()
        cands = [f for f in FILES if all(p in f.lower() for p in parts)]
        if not cands:
            continue

        def fallback_score(f: str) -> tuple:
            fl = f.lower()
            # Prefer higher chassis numbers when present (newer gens)
            nums = [int(n) for n in re.findall(r"[a-z](\d{3})", fl)]
            newest = max(nums) if nums else 0
            return (-newest, *score_file(f))

        return sorted(cands, key=fallback_score)[0]
    return None


def extract_codes(title: str) -> list[str]:
    return CODE_RE.findall(title)


def is_divider_card(title: str, codes: list[str], card: dict) -> bool:
    tl = title.lower()
    if " vs " in tl or "comparison" in tl or "dividing line" in tl:
        return True
    if "which generation" in tl or "which vario" in tl or "sub‑headline" in tl or "sub-headline" in tl:
        return True
    if "sub‑headline" in tl or title.lower().startswith("sub"):
        return True
    # engine-only prose cards (e.g. M159 blurb)
    if codes and all(c.upper().startswith("M") and c[1:].isdigit() for c in codes):
        if not re.search(r"\b[A-Z]{1,3}\d{3}\b.*\(", title):
            cta = (card.get("cta") or {}).get("label") or ""
            if not cta.strip():
                return True
    # text-only helper cards with no explore CTA and no rating
    cta = ((card.get("cta") or {}).get("label") or "").strip()
    rating = (card.get("rating") or "").strip()
    if not codes and not cta and not rating:
        return True
    return False


def public_src(filename: str) -> str:
    return f"/cars/{filename}"


def main() -> None:
    updated_cards = 0
    updated_files = 0
    missing = []

    for path in sorted(MODELS_DIR.glob("*.json")):
        slug = path.stem
        data = json.loads(path.read_text(encoding="utf-8"))
        gens = data.get("generations")
        if not isinstance(gens, dict):
            print(f"SKIP no generations: {slug}")
            continue
        cards = gens.get("cards")
        if not isinstance(cards, list):
            print(f"SKIP no cards: {slug}")
            continue

        changed = False
        for card in cards:
            if not isinstance(card, dict):
                continue
            title = card.get("title") or ""
            codes = extract_codes(title)

            if is_divider_card(title, codes, card):
                # keep any existing image; otherwise leave unset
                continue

            filename = pick_for_codes(codes, title) if codes else None
            if not filename:
                filename = pick_slug_fallback(slug)

            if not filename:
                missing.append((slug, title, codes))
                print(f"MISS {slug:12s} {codes} {title[:50]}")
                continue

            alt_code = codes[0].upper() if codes else slug
            card["image"] = {
                "src": public_src(filename),
                "alt": f"Mercedes-Benz {alt_code}",
            }
            updated_cards += 1
            changed = True
            print(f"OK   {slug:12s} {alt_code:6s} -> {Path(filename).name[:64]}")

        if changed:
            path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            updated_files += 1

    print(f"\nUpdated {updated_cards} cards across {updated_files} model JSON files")
    if missing:
        print(f"Missing {len(missing)} cards")


if __name__ == "__main__":
    main()
