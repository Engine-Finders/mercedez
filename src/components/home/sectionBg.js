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

/** Mobile gold / desktop black–white faded underline under section titles. */
export function SectionFadeStrip({ isDark, className = "w-14" }) {
  return (
    <>
      <span className={`block h-[2px] md:hidden ${className}`} style={{ backgroundColor: GOLD }} aria-hidden="true" />
      <span
        className={`hidden h-[2px] md:block ${className}`}
        style={{
          background: isDark
            ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
            : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
