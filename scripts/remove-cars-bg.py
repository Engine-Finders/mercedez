"""
Remove backgrounds from all WebP images in public/cars.
Keeps WebP format with lossless encoding (no quality/size downscale).

Usage:
  python scripts/remove-cars-bg.py
  python scripts/remove-cars-bg.py --limit 5          # test first N files
  python scripts/remove-cars-bg.py --skip-existing    # skip files that already have alpha
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

from PIL import Image
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
CARS_DIR = ROOT / "public" / "cars"


def has_useful_alpha(img: Image.Image) -> bool:
    """True if image already has real transparency (not fully opaque)."""
    if img.mode != "RGBA":
        return False
    extrema = img.getchannel("A").getextrema()
    return extrema[0] < 250


def process_file(path: Path, session, skip_existing: bool) -> str:
    with Image.open(path) as src:
        rgba = src.convert("RGBA")
        if skip_existing and has_useful_alpha(rgba):
            return "skipped"

        cut = remove(rgba, session=session)
        if not isinstance(cut, Image.Image):
            cut = Image.open(cut).convert("RGBA")
        else:
            cut = cut.convert("RGBA")

        # Preserve original pixel dimensions exactly
        if cut.size != rgba.size:
            cut = cut.resize(rgba.size, Image.Resampling.LANCZOS)

        cut.save(path, format="WEBP", lossless=True, method=6)
        return "ok"


def main() -> int:
    parser = argparse.ArgumentParser(description="Remove BG from public/cars WebP images")
    parser.add_argument("--limit", type=int, default=0, help="Only process first N files")
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="Skip images that already have transparency",
    )
    parser.add_argument(
        "--model",
        default="u2net",
        help="rembg model (u2net is fast; isnet-general-use is higher quality)",
    )
    args = parser.parse_args()

    if not CARS_DIR.is_dir():
        print(f"Missing folder: {CARS_DIR}", file=sys.stderr)
        return 1

    files = sorted(CARS_DIR.glob("*.webp"))
    if args.limit > 0:
        files = files[: args.limit]

    if not files:
        print("No .webp files found.")
        return 0

    print(f"Model: {args.model}")
    print(f"Files: {len(files)} in {CARS_DIR}")
    session = new_session(args.model)

    ok = skipped = failed = 0
    t0 = time.perf_counter()

    for i, path in enumerate(files, 1):
        rel = path.name
        try:
            status = process_file(path, session, args.skip_existing)
            if status == "skipped":
                skipped += 1
                print(f"[{i}/{len(files)}] skip  {rel}")
            else:
                ok += 1
                print(f"[{i}/{len(files)}] done  {rel}")
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"[{i}/{len(files)}] FAIL  {rel}: {exc}", file=sys.stderr)

    elapsed = time.perf_counter() - t0
    print(
        f"\nDone in {elapsed:.1f}s — ok={ok} skipped={skipped} failed={failed}"
    )
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
