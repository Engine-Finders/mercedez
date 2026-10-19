import HomeIcon from "@/components/home/homeIcons";

/**
 * 4-badge trust strip — same layout as Section 6.
 * items: [{ icon, title, text }]
 */
export default function TrustBadges({ items, isDark = false, className = "" }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`mt-4 grid w-full grid-cols-2 overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] backdrop-blur-xl md:mt-5 md:max-w-8xl md:grid-cols-4 md:rounded-2xl ${
        isDark ? "border-white/12 bg-[rgba(10,10,10,0.55)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.85)]"
      } ${className}`.trim()}
    >
      {items.map((item) => {
        const title = item.title || item.label;
        const text = item.text || "";
        return (
          <li
            key={title}
            className={`flex flex-col items-center gap-1.5 border-r border-b px-2 py-3.5 text-center last:border-r-0 even:border-r-0 md:flex-row md:items-center md:gap-3 md:border-b-0 md:px-4 md:py-4 md:text-left md:even:border-r ${
              isDark ? "border-white/12" : "border-[var(--color-border)]"
            }`}
          >
            <HomeIcon name={item.icon} isDark={isDark} gold className="h-12 w-12 object-contain md:h-11 md:w-11" />
            <span className="min-w-0">
              <strong className={`block text-[0.78rem] leading-tight md:text-[0.88rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {title}
              </strong>
              {text ? (
                <span className={`mt-0.5 block text-[0.68rem] leading-[1.25] ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                  {text}
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
