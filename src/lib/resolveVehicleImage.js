import imageMap from "@/data/vehicleModelImages.json";

/**
 * Match DVLA/API series text → local model image.
 * Uses short paths in /cars/models/*.webp (see vehicleModelImages.json).
 */

function clean(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * @param {string} series - API model / series (e.g. "C 300 AMG LINE…", "A CLASS", "CLA 200")
 * @param {string} brand
 * @returns {string} model key or ""
 */
export function seriesToModelSlug(series = "", brand = "") {
  const text = clean(`${series} ${brand}`);
  if (!text) return "";

  // Specific named models first
  if (/\bamg\s*gt\b/.test(text) || (/\bamg\b/.test(text) && /\bgt\s*\d*\b/.test(text))) return "amg-gt";
  if (/\bcitan\b/.test(text)) return "citan";
  if (/\bclc\b/.test(text)) return "clc-class";
  if (/\bclk\b/.test(text)) return "clk";
  if (/\bcls\b/.test(text)) return "cls";
  if (/\bcla\b/.test(text)) return "cla";

  // "A CLASS", "C-CLASS", …
  const namedClass = text.match(/\b([abcegsvx])\s*class\b/);
  if (namedClass) return `${namedClass[1]}-class`;

  // Badge codes: "C 300", "A180", "B 200 D", "E220" …
  // (avoid matching the trailing letter inside words like "glc")
  const badge = text.match(/(?:^|\s)([abcegsvx])\s*(\d{2,3})[a-z]*\b/);
  if (badge) return `${badge[1]}-class`;

  return "";
}

/**
 * @param {{ series?: string, brand?: string, model?: string }} vehicle
 * @returns {string} public image path
 */
export function resolveVehicleImage(vehicle = {}) {
  const series = vehicle.series || vehicle.model || "";
  const brand = vehicle.brand || "";
  const slug = seriesToModelSlug(series, brand);
  const models = imageMap.models || {};

  if (slug && models[slug]) return models[slug];
  return imageMap.default || "/right.webp";
}

export const MODEL_IMAGES = imageMap.models || {};
export const DEFAULT_VEHICLE_IMAGE = imageMap.default || "/right.webp";
