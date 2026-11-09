/**
 * Title accent strip - sits below H2 (no "SECTION N" label).
 * Strip: black in light theme, white in dark.
 * @param {boolean} [isDark]
 * @param {string} [className]
 */
export default function SectionLabel({ isDark = false, className = "" }) {
  const strip = isDark
    ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
    : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)";

  return (
    <span
      className={`mt-2 block h-[2px] w-14 md:mt-2.5 md:w-16 ${className}`.trim()}
      style={{ background: strip }}
      aria-hidden="true"
    />
  );
}
