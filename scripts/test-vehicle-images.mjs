import imageMap from "../src/data/vehicleModelImages.json" with { type: "json" };
import fs from "fs";
import path from "path";

function clean(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function seriesToModelSlug(series = "", brand = "") {
  const text = clean(`${series} ${brand}`);
  if (!text) return "";
  if (/\bamg\s*gt\b/.test(text) || (/\bamg\b/.test(text) && /\bgt\s*\d*\b/.test(text))) return "amg-gt";
  if (/\bcitan\b/.test(text)) return "citan";
  if (/\bclc\b/.test(text)) return "clc-class";
  if (/\bclk\b/.test(text)) return "clk";
  if (/\bcls\b/.test(text)) return "cls";
  if (/\bcla\b/.test(text)) return "cla";
  const namedClass = text.match(/\b([abcegsvx])\s*class\b/);
  if (namedClass) return `${namedClass[1]}-class`;
  const badge = text.match(/(?:^|\s)([abcegsvx])\s*(\d{2,3})[a-z]*\b/);
  if (badge) return `${badge[1]}-class`;
  return "";
}
function resolveVehicleImage(vehicle = {}) {
  const slug = seriesToModelSlug(vehicle.series || vehicle.model || "", vehicle.brand || "");
  if (slug && imageMap.models[slug]) return imageMap.models[slug];
  return imageMap.default;
}

const cases = [
  { series: "C 300 AMG LINE PREMIUM MHEV A", brand: "MERCEDES-BENZ" },
  { series: "GLC 220 D 4M AMG LINE PREM A", brand: "MERCEDES-BENZ" },
  { series: "A CLASS", brand: "MERCEDES" },
  { series: "A180", brand: "MERCEDES" },
  { series: "A 200 D", brand: "MERCEDES" },
  { series: "CLA 200", brand: "MERCEDES" },
  { series: "B CLASS", brand: "MERCEDES" },
  { series: "CLS", brand: "MERCEDES" },
  { series: "AMG GT", brand: "MERCEDES" },
  { series: "CITAN", brand: "MERCEDES" },
];

for (const c of cases) {
  const slug = seriesToModelSlug(c.series, c.brand);
  const img = resolveVehicleImage(c);
  const file = path.join("public", img.replace(/^\//, ""));
  const exists = fs.existsSync(file);
  console.log(`${c.series.padEnd(34)} -> ${String(slug || "(default)").padEnd(12)} ${exists ? "FILE_OK" : "FILE_MISSING"} ${img}`);
}
