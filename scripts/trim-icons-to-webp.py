"""
Trim empty transparent padding from icon PNGs, then save as WebP.

Folders:
  public/Jaguar Black
  public/Jaguar Silver
  public/Mercedes gold

Usage:
  python scripts/trim-icons-to-webp.py
  python scripts/trim-icons-to-webp.py --max-side 512
  python scripts/trim-icons-to-webp.py --keep-png
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FOLDERS = [
    ROOT / "public" / "Jaguar Black",
    ROOT / "public" / "Jaguar Silver",
    ROOT / "public" / "Mercedes gold",
]


def trim_alpha(img: Image.Image, pad_ratio: float = 0.04) -> Image.Image:
    rgba = img.convert("RGBA")
    bbox = rgba.getbbox()
    if not bbox:
        return rgba

    left, top, right, bottom = bbox
    w, h = right - left, bottom - top
    pad = max(2, int(max(w, h) * pad_ratio))
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(rgba.width, right + pad)
    bottom = min(rgba.height, bottom + pad)
    return rgba.crop((left, top, right, bottom))


def fit_max_side(img: Image.Image, max_side: int) -> Image.Image:
    if max_side <= 0:
        return img
    w, h = img.size
    longest = max(w, h)
    if longest <= max_side:
        return img
    scale = max_side / float(longest)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    return img.resize((nw, nh), Image.Resampling.LANCZOS)


def process_file(path: Path, max_side: int, keep_png: bool) -> tuple[str, str]:
    out = path.with_suffix(".webp")
    with Image.open(path) as src:
        before = f"{src.width}x{src.height}"
        trimmed = trim_alpha(src)
        fitted = fit_max_side(trimmed, max_side)
        after = f"{fitted.width}x{fitted.height}"
        fitted.save(out, format="WEBP", lossless=True, method=6)

    if not keep_png and path.suffix.lower() == ".png" and out.exists():
        path.unlink()

    return before, after


def main() -> None:
    parser = argparse.ArgumentParser(description="Trim icon transparency and convert to WebP")
    parser.add_argument("--max-side", type=int, default=512, help="Max long-side px after trim (0 = no resize)")
    parser.add_argument("--keep-png", action="store_true", help="Keep original PNG files")
    args = parser.parse_args()

    total = 0
    for folder in FOLDERS:
        if not folder.is_dir():
            print(f"SKIP missing folder: {folder}")
            continue
        files = sorted(folder.glob("*.png")) + sorted(folder.glob("*.PNG"))
        # also re-trim existing webp if re-run
        if not files:
            files = sorted(folder.glob("*.webp"))
        print(f"\n=== {folder.name}: {len(files)} files ===")
        for path in files:
            if path.suffix.lower() == ".webp" and path.with_suffix(".png").exists():
                continue
            try:
                before, after = process_file(path, args.max_side, args.keep_png)
                total += 1
                print(f"OK  {path.name:55s} {before:>11s} -> {after}")
            except Exception as exc:  # noqa: BLE001
                print(f"ERR {path.name}: {exc}")

    print(f"\nDone. Processed {total} icons.")


if __name__ == "__main__":
    main()
