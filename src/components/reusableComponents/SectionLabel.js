/**
 * Section eyebrow + half-solid / half-faint strip — sits above every H2.
 * Strip: black in light theme, white in dark (same as hero accents).
 * @param {number} [number] — renders as "SECTION {number}"
 * @param {string} [label] — optional full label override
 * @param {boolean} [isDark]
 * @param {string} [className]
 */
export default function SectionLabel({ number, label, isDark = false, className = "" }) {
  const text = label || (number != null ? `SECTION ${number}` : "SECTION");
  const strip = isDark
    ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
    : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)";

  return (
    <div className={`mb-2 flex items-center gap-3 md:mb-3 ${className}`.trim()}>
      <span
        className={`shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.14em] md:text-[0.75rem] ${
          isDark ? "text-white/85" : "text-[var(--color-text)]"
        }`}
      >
        {text}
      </span>
      <span className="h-[2px] w-[4.5rem] shrink-0 md:w-24" style={{ background: strip }} aria-hidden="true" />
    </div>
  );
}
