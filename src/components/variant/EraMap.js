"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const DESKTOP_COLS = "grid-cols-[130px_110px_1.3fr_1.2fr_1.1fr_1.8fr]";
const CAR_IMAGE = "/320d/era_map.webp";

const TRUST_POINTS = [
  { icon: "dollar", label: "Real UK Cost Data" },
  { icon: "shield", label: "Verified Reliability" },
  { icon: "users", label: "Expert Insights" },
  { icon: "clock", label: "Updated for 2025" },
];

function splitBracketTag(value = "") {
  const match = value.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
  if (!match) return { main: value, tag: "" };
  return { main: match[1].trim(), tag: match[2] };
}

function GenerationBadge({ generation, className = "" }) {
  return (
    <span
      className={`absolute left-0 top-0 flex h-full w-12 items-start justify-center pt-1 text-[0.72rem] font-bold text-white ${className}`}
      style={{ backgroundColor: GOLD, clipPath: "polygon(0 0, 100% 0, 45% 100%, 0 100%)" }}
    >
      {generation}
    </span>
  );
}

function GenerationThumb({ generation }) {
  return (
    <div className="relative h-16 w-full">
      <GenerationBadge generation={generation} />
      <Image src={CAR_IMAGE} alt={`BMW 320d ${generation}`} fill className="relative z-10 object-contain" sizes="130px" />
    </div>
  );
}

function DesktopRow({ row, isDark }) {
  const rowClass = isDark ? "bg-black text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${DESKTOP_COLS} items-stretch gap-px ${rowClass} text-[0.82rem] border-b ${borderBottom} last:border-b-0`}>
      <div className="flex items-center px-2 py-2">
        <GenerationThumb generation={row.generation} />
      </div>
      <span className={`flex items-center px-3 border-r ${cellDivider}`} dangerouslySetInnerHTML={{ __html: row.years }} />
      <span className={`flex items-center px-3 ${mutedText} border-r ${cellDivider}`} dangerouslySetInnerHTML={{ __html: row.engineCode }} />
      <span className={`flex items-center px-3 font-semibold border-r ${cellDivider}`} style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: row.reliability }} />
      <span className={`flex items-center px-3 font-semibold border-r ${cellDivider}`} dangerouslySetInnerHTML={{ __html: row.reconCost }} />
      <span className={`flex items-center px-3 py-3 leading-[1.4] ${mutedText}`} dangerouslySetInnerHTML={{ __html: row.eraNote }} />
    </div>
  );
}

function MobileCard({ row, isOpen, onToggle }) {
  const reliability = splitBracketTag(row.reliability);
  const reconCost = splitBracketTag(row.reconCost);

  return (
    <div
      className={`overflow-hidden rounded-md border bg-[var(--color-surface)] ${
        isOpen ? "" : "border-[var(--color-border)]"
      }`}
      style={isOpen ? { borderColor: GOLD } : undefined}
    >
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="relative grid w-full grid-cols-[104px_1fr_1fr] p-3 text-left">
        <span className="absolute right-3 top-3" style={{ color: GOLD }}>
          <GenIcon name="chevronDown" className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>

        <div className="flex flex-col items-center gap-0.5 pr-2.5">
          <span className="w-full rounded-md px-2 py-0.5 text-center text-[0.7rem] font-bold leading-tight text-white" style={{ backgroundColor: GOLD }}>
            {row.generation}
          </span>
          <span className="text-center text-[0.64rem] leading-tight text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: row.years }} />
          <div className="relative h-20 w-full">
            <Image src={CAR_IMAGE} alt={`BMW 320d ${row.generation}`} fill className="object-contain" sizes="104px" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1 border-l border-[var(--color-border)] px-2.5">
          <p className="text-[0.64rem] font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">Engine Code</p>
          <p className="text-[0.8rem] font-bold leading-tight text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: row.engineCode }} />
        </div>

        <div className="flex min-w-0 flex-col gap-2 border-l border-[var(--color-border)] px-2.5 pr-5">
          <div>
            <p className="text-[0.64rem] font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">Reliability</p>
            <p className="text-[0.85rem] font-bold leading-tight" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: reliability.main }} />
          </div>
          <div>
            <p className="text-[0.64rem] font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">Recon Cost (Guide)</p>
            <p className="text-[0.78rem] font-bold leading-tight" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: reconCost.main }} />
          </div>
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-[var(--color-border)] px-3.5 py-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">Era Note</p>
          <p className="mt-0.5 text-[0.76rem] leading-[1.4] text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: row.eraNote }} />
        </div>
      ) : null}
    </div>
  );
}

export default function EraMap({ data }) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);
  if (!data) return null;

  const isDark = theme === "dark";
  const headerBg = isDark ? "bg-[var(--color-chrome)]" : "";
  const headerDivider = isDark ? "border-white/20" : "border-white/25";
  const bodyWrapperBg = isDark ? "bg-black" : "bg-[var(--color-table-surface)]";

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 2)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <SectionLabel number={2} isDark={isDark} />
        <div className="flex items-center gap-2.5">
          <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-white md:flex" style={{ backgroundColor: GOLD }}>
            <GenIcon name="clock" className="h-5 w-5" />
          </span>
          <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {data.title}
          </h2>
        </div>
        <p className={`mt-3 max-w-[520px] text-[0.82rem] leading-[1.45] md:text-[0.9rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
          Four generations. Four eras. One guide to reliability, costs and what really matters.
        </p>

        <div className="mt-6 flex flex-col gap-3 md:hidden">
          {data.rows?.map((row, index) => (
            <MobileCard
              key={row.generation}
              row={row}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-table-surface)] shadow-[0_14px_40px_var(--color-shadow)] backdrop-blur md:block">
          <div
            className={`grid ${DESKTOP_COLS} gap-px px-2 py-2.5 text-[0.78rem] font-semibold text-white ${headerBg}`}
            style={isDark ? undefined : { backgroundColor: GOLD }}
          >
            {data.columns?.map((col) => (
              <span key={col} className={`flex items-center px-3 border-r ${headerDivider} last:border-r-0`}>
                {col}
              </span>
            ))}
          </div>
          <div className={bodyWrapperBg}>
            {data.rows?.map((row) => (
              <DesktopRow key={row.generation} row={row} isDark={isDark} />
            ))}
          </div>
        </div>

        <div
          className={`mt-6 flex flex-col items-start gap-6 rounded-xl border p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between md:p-8 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
          }`}
        >
          <div className="flex items-start gap-4 lg:max-w-[45%] lg:items-center">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: "rgba(171,132,80,0.35)", backgroundColor: "rgba(171,132,80,0.12)", color: GOLD }}
            >
              <GenIcon name="shield" className="h-5 w-5" />
            </span>
            <div>
              <p className={`text-[0.95rem] font-bold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Why use this era map?</p>
              <p
                className={`mt-1 text-[0.8rem] leading-[1.45] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}
                dangerouslySetInnerHTML={{
                  __html:
                    data.sourceNote ||
                    "Every cost guide, reliability rating and engine code on this page is aligned to the data above. This keeps everything consistent and trustworthy.",
                }}
              />
            </div>
          </div>

          <span aria-hidden="true" className="hidden h-12 w-px shrink-0 lg:block" style={{ backgroundColor: "rgba(171,132,80,0.35)" }} />

          <div className="flex w-full flex-wrap items-center justify-between gap-6 lg:w-auto lg:flex-nowrap">
            {TRUST_POINTS.map((point, index) => (
              <div key={point.label} className="flex items-center gap-4">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-6 w-px shrink-0 bg-[var(--color-border)] lg:h-8" />
                ) : null}
                <div className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>
                    <GenIcon name={point.icon} className="h-4.5 w-4.5 shrink-0" />
                  </span>
                  <span className={`whitespace-nowrap text-[0.78rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{point.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.dataNote ? (
          <p className={`mt-4 text-[0.74rem] leading-[1.5] ${isDark ? "text-white/55" : "text-[var(--color-text-soft)]"}`} dangerouslySetInnerHTML={{ __html: data.dataNote }} />
        ) : null}
      </div>
    </section>
  );
}
