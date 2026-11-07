/** Day theme blackish chrome for CTAs / table headers */
export const DAY_CHROME = "#0a0a0a";

/** Icon color: black (day) / silver (dark) */
export function iconTone(isDark) {
  return isDark ? "#C8C8C8" : "#0a0a0a";
}

/** CTA / table-header background: blackish day, chrome dark */
export function chromeBg(isDark) {
  return isDark ? "var(--color-chrome)" : DAY_CHROME;
}

const MODEL_IMAGES = {
  "a-class": "A-class.webp",
  "b-class": "B-class.webp",
  "c-class": "C-class.webp",
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
  "amg-gt": "Amg-gt.webp",
  "sprinter": "Sprinter.webp",
  "vito": "Vito.webp",
  "viano": "Viano.webp",
  "v-class": "V-class.webp",
  "vaneo": "Vaneo.webp",
  "vario": "Vario.webp",
  "citan": "Citan.webp",
};

/**
 * Resolve model hero image from registry parent slug or tagPill text.
 * @param {string} [parent] e.g. "b-class"
 * @param {string} [tagPill]
 */
export function variantModelImage(parent = "", tagPill = "") {
  const key = String(parent || "").toLowerCase().trim();
  if (key && MODEL_IMAGES[key]) {
    return `/model images/${MODEL_IMAGES[key]}`;
  }

  const pill = String(tagPill || "").toLowerCase();
  const match = Object.keys(MODEL_IMAGES).find((slug) => {
    const label = slug.replace(/-/g, " ");
    return pill.includes(label) || pill.includes(slug);
  });

  if (match) return `/model images/${MODEL_IMAGES[match]}`;
  return "/model images/C-class.webp";
}
