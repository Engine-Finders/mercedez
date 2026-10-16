/** Alternating light-theme section backgrounds (1-based section index). */
export const SECTION_BG_A = "#EFEEE9";
export const SECTION_BG_B = "#F8F7F3";

/** Site gold for CTAs, table headers, tabs, legend accents. */
export const GOLD = "#AB8450";

/**
 * @param {boolean} isDark
 * @param {number} sectionIndex 1-based home section number (HomeSec1 = 1)
 */
export function homeSectionBg(isDark, sectionIndex) {
  if (isDark) return "bg-[var(--color-page)]";
  return sectionIndex % 2 === 1 ? "bg-[#EFEEE9]" : "bg-[#F8F7F3]";
}
