"""Set hero + ownershipVerdict (sec2) images on all model JSON pages from public/model images."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "src" / "data" / "models"
IMG_DIR = ROOT / "public" / "model images"

# slug.json -> filename in public/model images
SLUG_TO_FILE = {
    "a-class": "A-class.webp",
    "amg-gt": "Amg-gt.webp",
    "b-class": "B-class.webp",
    "c-class": "C-class.webp",
    "citan": "Citan.webp",
    "cla": "Cla.webp",
    "clc-class": "CLC-Class.webp",
    "clk": "CLK.webp",
    "cls": "CLS.webp",
    "e-class": "E-class.webp",
    "g-class": "G-class.webp",
    "gla": "GLA.webp",
    "glc": "GLC.webp",
    "gle": "GLE.webp",
    "glk": "GLK.webp",
    "gls": "GLS.webp",
    "m-class": "M-class.webp",
    "r-class": "R-class.webp",
    "s-class": "S-class.webp",
    "sl": "SL.webp",
    "slk-slc": "SLK-SLC.webp",
    "sls-amg": "SLS-AMG.webp",
    "sprinter": "Sprinter.webp",
    "v-class": "V-class.webp",
    "vaneo": "Vaneo.webp",
    "vario": "Vario.webp",
    "viano": "Viano.webp",
    "vito": "Vito.webp",
}


def public_src(filename: str) -> str:
    # Keep folder name as-is (space); browsers/Next encode it.
    return f"/model images/{filename}"


def model_label(slug: str, data: dict) -> str:
    hero = data.get("hero") or {}
    h1 = hero.get("h1") or ""
    if h1:
        return h1.split(" Engines")[0].strip() or slug
    return slug.replace("-", " ").title()


def main() -> None:
    missing_files = []
    updated = 0

    for slug, filename in sorted(SLUG_TO_FILE.items()):
        path = MODELS_DIR / f"{slug}.json"
        if not path.exists():
            print(f"SKIP missing json: {slug}")
            continue
        if not (IMG_DIR / filename).exists():
            missing_files.append(filename)
            print(f"SKIP missing image: {filename}")
            continue

        data = json.loads(path.read_text(encoding="utf-8"))
        src = public_src(filename)
        alt = f"Mercedes-Benz {model_label(slug, data)}"
        image_obj = {"src": src, "alt": alt}

        hero = data.setdefault("hero", {})
        hero["headerImage"] = image_obj

        verdict = data.setdefault("ownershipVerdict", {})
        verdict["image"] = dict(image_obj)

        # Keep SEO OG image in sync when present
        og = (data.get("meta") or {}).get("openGraph")
        if isinstance(og, dict):
            og["image"] = src

        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        updated += 1
        print(f"OK {slug:12s} -> {filename}")

    print(f"\nUpdated {updated} model JSON files")
    if missing_files:
        print("Missing images:", ", ".join(missing_files))


if __name__ == "__main__":
    main()
