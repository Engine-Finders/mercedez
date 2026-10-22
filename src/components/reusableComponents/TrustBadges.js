import HomeIcon from "@/components/home/homeIcons";

/**
 * 4-badge trust strip - same layout as Section 6.
 * items: [{ icon, title, text }]
 * mobileRow: force 4-across on mobile (compact)
 */
export default function TrustBadges({ items, isDark = false, className = "", mobileRow = false }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`mt-4 grid w-full overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] backdrop-blur-xl md:mt-5 md:max-w-8xl md:grid-cols-4 md:rounded-2xl ${
        mobileRow ? "grid-cols-4" : "grid-cols-2"
      } ${
        isDark ? "border-white/12 bg-[rgba(10,10,10,0.55)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.85)]"
      } ${className}`.trim()}
    >
      {items.map((item) => {
        const title = item.title || item.label;
        const text = item.text || "";
        return (
          <li
            key={title}
            className={`flex flex-col items-center gap-1.5 border-r border-b text-center last:border-r-0 md:flex-row md:items-center md:gap-3 md:border-b-0 md:px-4 md:py-4 md:text-left md:even:border-r ${
              mobileRow
                ? "border-b-0 px-1.5 py-2.5 even:border-r"
                : "px-2 py-3.5 even:border-r-0"
            } ${isDark ? "border-white/12" : "border-[var(--color-border)]"}`}
          >
            <HomeIcon
              name={item.icon}
              isDark={isDark}
              gold
              className={`object-contain md:h-11 md:w-11 ${mobileRow ? "h-8 w-8" : "h-12 w-12"}`}
            />
            <span className="min-w-0 px-0.5">
              <strong
                className={`block leading-tight md:text-[0.88rem] ${
                  mobileRow ? "text-[0.55rem]" : "text-[0.78rem]"
                } ${isDark ? "text-white" : "text-[var(--color-text)]"}`}
              >
                {title}
              </strong>
              {text ? (
                <span
                  className={`mt-0.5 block leading-[1.2] md:text-[0.68rem] ${
                    mobileRow ? "text-[0.48rem]" : "text-[0.68rem]"
                  } ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}
                >
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
