"""Set ownershipVerdict (sec2) images on model pages from public/cars (reuse homeSec2 mapping)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "src" / "data" / "models"
HOME_SEC2 = ROOT / "src" / "data" / "home" / "homeSec2.json"

# Extra slugs not in homeSec2 href list → nearest car from public/cars
FALLBACK = {
    "sls-amg": "/cars/amg gt-c190-gt-coupé-2014–2016-new-iridium silver metallic-original amg gt body-amg gt c190 gt-45-angle-front-view.webp",
}


def main() -> None:
    home = json.loads(HOME_SEC2.read_text(encoding="utf-8"))
    by_slug: dict[str, dict] = {}
    for m in home.get("models") or []:
        href = (m.get("href") or "").strip("/")
        if href and m.get("image"):
            by_slug[href] = m["image"]

    updated = 0
    for path in sorted(MODELS_DIR.glob("*.json")):
        slug = path.stem
        data = json.loads(path.read_text(encoding="utf-8"))
        image = by_slug.get(slug)
        if not image and slug in FALLBACK:
            image = {"src": FALLBACK[slug], "alt": f"Mercedes-Benz {slug}"}
        if not image:
            print(f"SKIP no car map: {slug}")
            continue

        verdict = data.setdefault("ownershipVerdict", {})
        verdict["image"] = {
            "src": image["src"],
            "alt": image.get("alt") or f"Mercedes-Benz {slug}",
        }
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        updated += 1
        print(f"OK {slug:12s} -> {Path(image['src']).name[:60]}")

    print(f"\nUpdated {updated} model sec2 images")


if __name__ == "__main__":
    main()
