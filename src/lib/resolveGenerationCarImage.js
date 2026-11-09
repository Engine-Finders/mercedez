import imageMap from "@/data/generationCarImages.json";

/**
 * Resolve generation-page car photos from /public/cars (not hero model pack shots).
 * @param {string} parent - registry parent e.g. "a-class"
 * @param {string} slug - generation chassis slug e.g. "w176"
 * @param {number} [index=0] - pick among matches
 * @returns {string} public path under /cars/...
 */
export function resolveGenerationCarImage(parent = "", slug = "", index = 0) {
  const p = String(parent || "")
    .toLowerCase()
    .trim()
    .replace(/^clc-class$/, "clc");
  const chassis = String(slug || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");

  const byKey = imageMap.byKey || {};
  let list = byKey[`${p}|${chassis}`] || [];

  // Soft fallback: any images for this parent
  if (!list.length && p) {
    list = Object.entries(byKey)
      .filter(([key]) => key.startsWith(`${p}|`))
      .flatMap(([, paths]) => paths);
  }

  if (!list.length) return imageMap.default || "/right.webp";
  const i = ((index % list.length) + list.length) % list.length;
  return list[i];
}

/**
 * @param {string} parent
 * @param {string} slug
 * @returns {string[]}
 */
export function listGenerationCarImages(parent = "", slug = "") {
  const p = String(parent || "")
    .toLowerCase()
    .trim()
    .replace(/^clc-class$/, "clc");
  const chassis = String(slug || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
  const byKey = imageMap.byKey || {};
  const list = byKey[`${p}|${chassis}`] || [];
  if (list.length) return list;
  if (!p) return [];
  return Object.entries(byKey)
    .filter(([key]) => key.startsWith(`${p}|`))
    .flatMap(([, paths]) => paths);
}
