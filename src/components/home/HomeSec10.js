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



import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import { useTheme } from "@/components/shared/themeProvider";

const RISK = {
  catastrophic: { bg: "#ed1c24", label: "Catastrophic if Ignored" },
  immediate: { bg: "#f06d11", label: "Immediate" },
  monitor: { bg: "#e8b923", label: "Monitor" },
  low: { bg: "#25a844", label: "Low" },
};

function RiskGlyph({ type }) {
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

function RiskBadge({ risk, isDark }) {
  const style = RISK[risk?.type] || RISK.monitor;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: style.bg }}>
        <RiskGlyph type={risk?.type} />
      </span>
      <span className={`${typeTable} font-medium leading-tight ${isDark ? "text-white/90" : "text-[var(--color-text)]"}`}>
        {risk?.label || style.label}
      </span>
    </span>
  );
}

function Tag({ value, isDark }) {
  if (!value) return null;
  return (
    <span className={`ml-1 ${typeBadge} font-medium uppercase tracking-[0.04em] ${isDark ? "text-white/45" : "text-[var(--color-text-muted)]"}`}>
      [{value}]
    </span>
  );
}

function Panel({ title, icon, isDark, children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-[0_6px_24px_rgba(10,26,43,0.05)] ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      } ${className}`}
    >
      <div className={`flex items-center gap-2.5 border-b px-3.5 py-3 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${isDark ? "bg-white/10" : "bg-[#F5EAD4]"}`}>
          <HomeIcon name={icon || "engine"} isDark={isDark} className="h-6 w-6 md:h-7 md:w-7" />
        </span>
        <h3 className={`font-lora ${typeH6} font-medium uppercase leading-snug tracking-[0.03em] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function ScrollTable({ minWidth, children }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

function ColHead({ cols, grid, isDark }) {
  return (
    <div
      className={`grid border-b px-3.5 py-2 ${typeTable} font-semibold uppercase tracking-[0.06em] ${grid} ${
        isDark ? "border-white/10 bg-white/5 text-white/50" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
      }`}
    >
      {cols.map((col) => (
        <span key={col}>{col}</span>
      ))}
    </div>
  );
}

function EnginesPanel({ data, isDark }) {
  if (!data) return null;
  const grid = "grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-2";

  return (
    <Panel title={data.title} icon={data.icon} isDark={isDark}>
      <ScrollTable minWidth="420px">
        <ColHead cols={data.columns || []} grid={grid} isDark={isDark} />
        {(data.rows || []).map((row) => (
          <div
            key={row.code}
            className={`grid items-center border-b px-3.5 py-2.5 last:border-b-0 ${grid} ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <span className={`${typeTable} tabular-nums ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>{row.rank}</span>
            <span className={`font-lora ${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.code}</span>
            <span className={`${typeTable} ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{row.label}</span>
            <span className={`${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.enquiries}
              <Tag value={row.tag} isDark={isDark} />
            </span>
          </div>
        ))}
      </ScrollTable>
    </Panel>
  );
}

function ModelsPanel({ data, isDark }) {
  if (!data) return null;
  const grid = "grid-cols-[2.5rem_minmax(0,1.2fr)_minmax(0,1fr)] gap-2";

  return (
    <Panel title={data.title} icon={data.icon} isDark={isDark}>
      <ScrollTable minWidth="340px">
        <ColHead cols={data.columns || []} grid={grid} isDark={isDark} />
        {(data.rows || []).map((row) => (
          <div
            key={row.model}
            className={`grid items-center border-b px-3.5 py-2.5 last:border-b-0 ${grid} ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <span className={`${typeTable} tabular-nums ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>{row.rank}</span>
            <span className={`font-lora ${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.model}</span>
            <span className={`${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.enquiries}
              <Tag value={row.tag} isDark={isDark} />
            </span>
          </div>
        ))}
      </ScrollTable>
    </Panel>
  );
}

function CostsPanel({ data, isDark }) {
  if (!data) return null;
  const grid = "grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-2";

  return (
    <Panel title={data.title} icon={data.icon} isDark={isDark}>
      <ScrollTable minWidth="280px">
        <ColHead cols={data.columns || []} grid={grid} isDark={isDark} />
        {(data.rows || []).map((row) => (
          <div
            key={row.code}
            className={`grid items-center border-b px-3.5 py-2.5 last:border-b-0 ${grid} ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <span className={`font-lora ${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.code}</span>
            <span className={`${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.cost}
              <Tag value={row.tag} isDark={isDark} />
            </span>
          </div>
        ))}
      </ScrollTable>
    </Panel>
  );
}

function FailuresPanel({ data, isDark }) {
  if (!data) return null;
  const grid = "grid-cols-[2.5rem_minmax(0,1.6fr)_minmax(140px,0.9fr)] gap-3";

  return (
    <Panel title={data.title} icon={data.icon} isDark={isDark}>
      <ScrollTable minWidth="480px">
        <ColHead cols={data.columns || []} grid={grid} isDark={isDark} />
        {(data.rows || []).map((row) => (
          <div
            key={row.rank}
            className={`grid items-center border-b px-3.5 py-2.5 last:border-b-0 ${grid} ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <span className={`${typeTable} tabular-nums ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>{row.rank}</span>
            <span className={`font-lora ${typeTable} font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.failure}
            </span>
            <RiskBadge risk={row.risk} isDark={isDark} />
          </div>
        ))}
      </ScrollTable>
    </Panel>
  );
}

function FeedPanel({ data, isDark }) {
  if (!data) return null;
  const grid = "grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)_minmax(0,1.1fr)_auto] gap-2";

  return (
    <Panel title={data.title} icon={data.icon} isDark={isDark}>
      <ScrollTable minWidth="520px">
        <ColHead cols={data.columns || []} grid={grid} isDark={isDark} />
        {(data.rows || []).map((row) => (
          <div
            key={`${row.vehicle}-${row.timestamp}`}
            className={`grid items-center border-b px-3.5 py-2.5 last:border-b-0 ${grid} ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="relative h-9 w-12 shrink-0 overflow-hidden">
                <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.vehicle} fill unoptimized className="object-contain" sizes="48px" />
              </div>
              <span className={`truncate font-lora ${typeTable} font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {row.vehicle}
              </span>
            </div>
            <span className={`${typeTable} ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{row.location}</span>
            <span className={`${typeTable} ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>{row.issue}</span>
            <span className={`whitespace-nowrap ${typeTable} ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>{row.timestamp}</span>
          </div>
        ))}
      </ScrollTable>
    </Panel>
  );
}

export default function HomeSec10({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 10)}`}>
      <SectionHeaderBand
        title="Mercedes-Benz Market Intelligence - What 4,200+ UK Owners Told Us in 2025"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 10)}
        panelRgb={sectionPanelRgb(isDark, 10)}
        titleClassName="max-w-[760px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <TrustBadges items={data.trustStrip} isDark={isDark} mobileRow />

        <div className="mt-5 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-3 md:gap-4">
          <EnginesPanel data={data.engines} isDark={isDark} />
          <ModelsPanel data={data.models} isDark={isDark} />
          <CostsPanel data={data.replacementCosts} isDark={isDark} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1.35fr_1fr] md:gap-4">
          <FailuresPanel data={data.failures} isDark={isDark} />
          <FeedPanel data={data.liveFeed} isDark={isDark} />
        </div>

        {data.footer ? (
          <p className={`mt-4 text-center ${typeSmall} italic md:mt-5 ${isDark ? "text-white/55" : "text-[var(--color-text-muted)]"}`}>
            {data.footer}
          </p>
        ) : null}
      </div>
    </section>
  );
}
