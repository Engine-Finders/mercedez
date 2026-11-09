/**
 * Convert PNG/JPG files to WebP without quality loss (lossless).
 *
 * Usage:
 *   node scripts/png-to-webp.mjs public/png
 *   node scripts/png-to-webp.mjs public/png/Icon.png public/icon.webp
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function listImages(inputPath) {
  const stat = await fs.stat(inputPath);
  if (stat.isFile()) return [inputPath];

  const entries = await fs.readdir(inputPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && IMAGE_EXT.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => path.join(inputPath, entry.name));
}

async function convertOne(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await sharp(src).webp({ lossless: true }).toFile(dest);
  const [inStat, outStat] = await Promise.all([fs.stat(src), fs.stat(dest)]);
  console.log(`✓ ${src} → ${dest} (${inStat.size} → ${outStat.size} bytes)`);
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error("Usage: node scripts/png-to-webp.mjs <file-or-dir> [out.webp]");
    process.exit(1);
  }

  const input = path.resolve(args[0]);
  const explicitOut = args[1] ? path.resolve(args[1]) : null;
  const files = await listImages(input);

  if (!files.length) {
    console.error("No PNG/JPG files found.");
    process.exit(1);
  }

  if (explicitOut && files.length !== 1) {
    console.error("Explicit output path only works with a single input file.");
    process.exit(1);
  }

  for (const src of files) {
    const dest = explicitOut
      ? explicitOut
      : path.join(path.dirname(src), `${path.basename(src, path.extname(src))}.webp`);
    await convertOne(src, dest);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
