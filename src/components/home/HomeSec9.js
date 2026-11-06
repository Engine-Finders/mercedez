"use client";

import {
  typeH1,
  typeH2,
  typeH3,
  typeH4,
  typeH5,
  typeH6,
  typeDesc,
  typeBody,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeButton,
  typeTable,
  typeEyebrow,
} from "@/components/shared/typography";



import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import { useTheme } from "@/components/shared/themeProvider";

const SEVERITY = {
  catastrophic: { bg: "#ed1c24", label: "Catastrophic if Ignored" },
  immediate: { bg: "#f06d11", label: "Immediate" },
  monitor: { bg: "#e8b923", label: "Monitor" },
  low: { bg: "#25a844", label: "Low" },
};

function SeverityGlyph({ type }) {
  if (type === "low") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 8v5m0 4h.01M10 4.9 2.6 18a2 2 0 0 0 1.74 3h15.32A2 2 0 0 0 21.4 18L14 4.9a2 2 0 0 0-3.48 0Z" />
    </svg>
  );
}

function SeverityBadge({ severity, isDark }) {
  const style = SEVERITY[severity?.type] || SEVERITY.monitor;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: style.bg }}>
        <SeverityGlyph type={severity?.type} />
      </span>
      <span className={`${typeTable} font-medium leading-tight ${isDark ? "text-white/90" : "text-[var(--color-text)]"}`}>
        {severity?.label || style.label}
      </span>
    </span>
  );
}

function FailureRow({ row, isDark, compact = false }) {
  const href = row.link?.href || "#";
  const gridCols = compact
    ? "md:grid-cols-[1.25rem_minmax(0,1fr)] md:gap-2.5 md:px-3.5 md:py-3"
    : "md:grid-cols-[1.75rem_minmax(120px,1.1fr)_minmax(140px,1.35fr)_minmax(100px,0.9fr)_auto] md:gap-3 md:px-3.5 md:py-3";

  return (
    <Link
      href={href}
      className={`grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2 gap-y-1.5 border-b px-3.5 py-3 no-underline last:border-b-0 hover:no-underline md:items-center ${gridCols} ${
        isDark ? "border-white/10 hover:bg-white/5" : "border-[rgba(0,0,0,0.06)] hover:bg-[#F8F7F3]"
      }`}
    >
      <span className={`flex items-center justify-center self-center text-center ${typeTable} font-normal tabular-nums ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>
        {row.id}
      </span>

      {compact ? (
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex min-w-0 items-start gap-2">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                isDark ? "border-white/15 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
              }`}
            >
              <HomeIcon name={row.icon || "engine"} isDark={isDark} className="h-5 w-5" />
            </span>
            <span className={`${typeTable} font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.title}
            </span>
          </div>
          <p className={`${typeTable} font-light ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
            {row.description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SeverityBadge severity={row.severity} isDark={isDark} />
            <span className={`font-lora ${typeTable} font-medium`} style={{ color: GOLD }}>
              {row.link?.label || "Read more →"}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border md:h-12 md:w-12 ${
                isDark ? "border-white/15 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
              }`}
            >
              <HomeIcon name={row.icon || "engine"} isDark={isDark} className="h-6 w-6 md:h-7 md:w-7" />
            </span>
            <span className={`${typeTable} font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.title}
            </span>
          </div>
          <p className={`col-span-2 ${typeTable} font-light md:col-span-1 ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
            {row.description}
          </p>
          {/* Mobile: severity + link in one row (like warning-signs card) */}
          <div className="col-span-2 flex flex-wrap items-center justify-between gap-2 md:hidden">
            <SeverityBadge severity={row.severity} isDark={isDark} />
            <span className={`font-lora ${typeTable} font-medium`} style={{ color: GOLD }}>
              {row.link?.label || "Read more →"}
            </span>
          </div>
          {/* Desktop: separate columns */}
          <div className="hidden md:block">
            <SeverityBadge severity={row.severity} isDark={isDark} />
          </div>
          <span className={`hidden whitespace-nowrap font-lora ${typeTable} font-medium md:inline`} style={{ color: GOLD }}>
            {row.link?.label || "Read more →"}
          </span>
        </>
      )}
    </Link>
  );
}

function FailureCard({ block, isDark, compact = false }) {
  if (!block) return null;

  return (
    <div className={`overflow-hidden rounded-xl border shadow-[0_6px_24px_rgba(10,26,43,0.05)] ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <div className={`flex items-center gap-2.5 border-b ${compact ? "px-3.5 py-3" : "px-4 py-3"} ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <span
          className={`flex shrink-0 items-center justify-center rounded-full ${compact ? "h-9 w-9" : "h-12 w-12 md:h-14 md:w-14"} ${
            isDark ? "bg-white/10" : "bg-[#F5EAD4]"
          }`}
        >
          <HomeIcon name={block.icon || "engine"} isDark={isDark} className={compact ? "h-5 w-5" : "h-7 w-7 md:h-8 md:w-8"} />
        </span>
        <h3 className={`font-lora ${typeH6} font-medium uppercase tracking-[0.04em] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {block.title}
        </h3>
      </div>

      {!compact ? (
        <div
          className={`hidden items-center border-b px-3.5 py-2.5 ${typeTable} font-semibold uppercase tracking-[0.06em] md:grid md:grid-cols-[1.75rem_minmax(120px,1.1fr)_minmax(140px,1.35fr)_minmax(100px,0.9fr)_auto] md:gap-3 ${
            isDark ? "border-white/10 bg-white/5 text-white/50" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
          }`}
        >
          {(block.columns || []).map((col) => (
            <span key={col} className={col === "#" || col === "ID" ? "text-center" : undefined}>
              {col}
            </span>
          ))}
        </div>
      ) : null}

      {(block.rows || []).map((row) => (
        <FailureRow key={`${block.title}-${row.id}`} row={row} isDark={isDark} compact={compact} />
      ))}
    </div>
  );
}

function UrgencyKey({ items, isDark }) {
  if (!items?.length) return null;

  return (
    <div
      className={`mt-5 flex flex-col gap-3 rounded-lg border px-4 py-3 md:mt-6 md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`}
    >
      <span className={`${typeEyebrow} ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
        Urgency Key
      </span>
      {items.map((item) => {
        const style = SEVERITY[item.type] || SEVERITY.monitor;
        return (
          <span key={item.type} className="inline-flex items-center gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: style.bg }}>
              <SeverityGlyph type={item.type} />
            </span>
            <span className={`${typeSmall} ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
              <strong className="font-medium">{item.label}</strong>
              <span className={isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}> - {item.text}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function HomeSec9({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 9)}`}>
      <SectionHeaderBand
        title="The Mercedes-Benz Failure Database"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 9)}
        panelRgb={sectionPanelRgb(isDark, 9)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.45fr_0.9fr] md:gap-4">
          <FailureCard block={data.engineFailures} isDark={isDark} />
          <FailureCard block={data.warningSigns} isDark={isDark} compact />
        </div>

        <UrgencyKey items={data.urgencyKey} isDark={isDark} />
      </div>
    </section>
  );
}
