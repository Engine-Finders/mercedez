"use client";

import Link from "next/link";
import { useTheme } from "@/components/shared/themeProvider";
import { chromeBg } from "@/components/variant/variantTheme";

/**
 * Compact section-end CTA → /quote (no registration input).
 * Place at the end of a section content block; stays out of the way of existing UI.
 */
export default function SectionQuoteCta({
  label = "Get a Mercedes-Benz Engine Quote",
  support = "",
  href = "/quote",
  className = "",
  align = "start",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const alignClass = align === "center" ? "items-center text-center" : "items-stretch sm:items-start text-left";

  return (
    <div
      className={`mt-5 flex w-full flex-col gap-2.5 sm:mt-6 md:mt-7 ${alignClass} ${className}`.trim()}
    >
      {support ? (
        <p className={`max-w-[640px] text-[0.82rem] leading-[1.45] md:text-[0.9rem] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
          {support}
        </p>
      ) : null}
      <Link
        href={href}
        className="btn-cta inline-flex w-full max-w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-center text-[0.78rem] font-bold text-white no-underline shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:w-auto sm:px-5 sm:py-3 sm:text-[0.84rem]"
        style={{ backgroundColor: chromeBg(isDark) }}
      >
        <span>{String(label).replace(/\s*→\s*$/, "")}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
