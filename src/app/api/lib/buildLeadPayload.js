import { LEAD_SOURCE } from "@/app/api/lib/leadConfig";

/** Exact fields we send to CRM / include in lead emails (display order). */
export const SENT_LEAD_FIELDS = [
  "name",
  "email",
  "number",
  "postcode",
  "description",
  "source",
  "page_url",
  "vehicle_vrm",
  "vehicle_reg",
  "vehicle_brand",
  "vehicle_model",
  "vehicle_series",
  "vehicle_year",
  "vehicle_part",
  "engine_capacity",
  "fuel_type",
];

function normalizeCapacity(raw) {
  const cleaned = raw ? String(raw).replace(/[^\d.]/g, "") : "";
  const num = cleaned ? Number(cleaned) : NaN;
  if (!Number.isFinite(num) || num <= 0) return "";
  // DVLA often returns cc (e.g. 1995) - convert to litres for CRM.
  return String(Math.round(num >= 100 ? num / 1000 : num));
}

/**
 * Build a reusable lead payload from quote-form style contact + vehicle.
 * Safe to import from client components.
 */
export function buildQuoteLeadPayload({
  contact,
  vehicle,
  calculator = null,
  source = LEAD_SOURCE,
  pageUrl = "",
}) {
  const engineCapacity = normalizeCapacity(vehicle?.engineCapacity);
  const vrm = String(vehicle?.vrm || "").trim().toUpperCase();
  const resolvedPageUrl =
    pageUrl ||
    contact?.pageUrl ||
    contact?.sourceUrl ||
    (typeof window !== "undefined" ? window.location.href : "");

  const payload = {
    name: contact?.name || "",
    number: contact?.phone || contact?.number || "",
    email: contact?.email || "",
    postcode: contact?.postcode || "",
    description: contact?.remarks || contact?.description || "",
    vehicle_brand: vehicle?.brand || "",
    vehicle_model: vehicle?.model || vehicle?.series || "",
    vehicle_series: vehicle?.series || "",
    vehicle_reg: vrm,
    vehicle_vrm: vrm,
    vehicle_year: vehicle?.year || "",
    engine_capacity: engineCapacity,
    fuel_type: vehicle?.fuelType || vehicle?.fuel_type || "",
    vehicle_part: vehicle?.part || "Engine",
    source,
    page_url: resolvedPageUrl,
    honeypot: contact?.honeypot || "",
  };

  if (calculator && typeof calculator === "object") {
    payload.calculator = calculator;
  }

  return payload;
}

/** CRM-safe fields only (no calculator extras / honeypot). */
export function toCrmLeadPayload(payload = {}) {
  const vrm = String(payload.vehicle_vrm || payload.vehicle_reg || "").trim().toUpperCase();

  return {
    name: payload.name || "",
    email: payload.email || "",
    number: payload.number || "",
    postcode: payload.postcode || "",
    vehicle_brand: payload.vehicle_brand || "",
    vehicle_model: payload.vehicle_model || payload.vehicle_series || "",
    vehicle_reg: vrm,
    vehicle_vrm: vrm,
    vehicle_series: payload.vehicle_series || "",
    vehicle_year: payload.vehicle_year || "",
    engine_capacity: payload.engine_capacity || payload.engin_capacity || "",
    fuel_type: payload.fuel_type || payload.fuelType || "",
    vehicle_part: payload.vehicle_part || "Engine",
    description: payload.description || "",
    source: payload.source || LEAD_SOURCE,
    page_url: payload.page_url || payload.sourceUrl || payload.pageUrl || "",
  };
}
