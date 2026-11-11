"use client";

import { useTheme } from "@/components/shared/themeProvider";
import OpenQuoteButton from "@/components/shared/OpenQuoteButton";
import { chromeBg } from "@/components/variant/variantTheme";

function ShieldCheckIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3 5 6v5c0 4.5 2.8 7.9 7 9 4.2-1.1 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.2 12.2 1.9 1.9 3.7-3.8" />
    </svg>
  );
}

/**
 * Section-end CTA — opens sticky quote modal (no /quote redirect).
 * Full-width boxed row: support text left, button right.
 */
export default function SectionQuoteCta({
  label = "Get a Mercedes-Benz Engine Quote",
  support = "",
  className = "",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const buttonLabel = String(label || "").replace(/\s*→\s*$/, "");

  return (
    <div
      className={`mt-5 flex w-full flex-col gap-3 rounded-lg border px-4 py-3.5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5 sm:py-4 md:mt-7 ${
        isDark
          ? "border-white/12 bg-[var(--color-surface-raised)]"
          : "border-[var(--color-border)] bg-[#F3F3F3]"
      } ${className}`.trim()}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <ShieldCheckIcon
          className={`mt-0.5 h-5 w-5 shrink-0 sm:h-6 sm:w-6 ${
            isDark ? "text-white/80" : "text-[#1a1a1a]"
          }`}
        />
        {support ? (
          <p
            className={`min-w-0 text-[0.82rem] font-semibold leading-[1.4] md:text-[0.9rem] ${
              isDark ? "text-white" : "text-[#1a1a1a]"
            }`}
          >
            {support}
          </p>
        ) : null}
      </div>

      <OpenQuoteButton
        className="btn-cta inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-center text-[0.72rem] font-bold uppercase tracking-wide text-white no-underline sm:w-auto sm:px-5 sm:py-3 sm:text-[0.78rem]"
        style={{ backgroundColor: chromeBg(isDark) }}
      >
        <span>{buttonLabel}</span>
        <span aria-hidden="true">→</span>
      </OpenQuoteButton>
    </div>
  );
}
