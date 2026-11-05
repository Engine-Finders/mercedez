import { GOLD } from "@/components/home/sectionBg";

/** Silver stroke/fill for dark theme SVG icons */
export const ICON_SILVER = "#C8C8C8";

/** Black for hero trust icons on day theme */
export const ICON_BLACK = "#0a0a0a";

/**
 * Engine-page icon color.
 * - hero: black (day) / silver (dark)
 * - section (default): gold (day) / silver (dark)
 */
export function iconColor(isDark, variant = "section") {
  if (isDark) return ICON_SILVER;
  return variant === "hero" ? ICON_BLACK : GOLD;
}

export function iconBorderClass(isDark, variant = "section") {
  if (isDark) return "border-white/25";
  return variant === "hero" ? "border-black/15" : "border-[rgba(171,132,80,0.35)]";
}

export function iconBgClass(isDark, variant = "section") {
  if (isDark) {
    return "bg-[radial-gradient(circle_at_30%_30%,rgba(200,200,200,0.14),rgba(10,10,10,0.96)_75%)]";
  }
  if (variant === "hero") {
    return "bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.06),rgba(255,255,255,0.98)_75%)]";
  }
  return "bg-[radial-gradient(circle_at_30%_30%,rgba(247,241,230,0.92),rgba(255,255,255,0.98)_75%)]";
}
