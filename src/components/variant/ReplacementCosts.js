"use client";

import { useState } from "react";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const ROW_ICONS = ["tag", "refresh", "wrench", "crown"];
const DESKTOP_COLS = "grid-cols-[1.2fr_1fr_1fr_0.9fr_1.4fr]";

function DesktopRow({ row, icon, isDark }) {
  const rowClass = isDark ? "bg-black text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${DESKTOP_COLS} items-center gap-px ${rowClass} px-2 py-3 text-[0.82rem] border-b ${borderBottom} last:border-b-0`}>
      <span className="flex items-center gap-2 px-2 font-semibold">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}>
          <GenIcon name={icon} className="h-3.5 w-3.5" />
        </span>
        <span dangerouslySetInnerHTML={{ __html: row.engineType }} />
      </span>
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`} dangerouslySetInnerHTML={{ __html: row.supplyOnly }} />
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`} dangerouslySetInnerHTML={{ __html: row.fittedIndie }} />
      <span className={`flex items-center gap-1.5 px-2 border-l ${cellDivider}`}>
        <span style={{ color: GOLD }}>
          <GenIcon name="shield" className="h-3.5 w-3.5 shrink-0" />
        </span>
        <span dangerouslySetInnerHTML={{ __html: row.warranty }} />
      </span>
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`} dangerouslySetInnerHTML={{ __html: row.bestFor }} />
    </div>
  );
}

function AccordionRow({ row, icon, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-sm bg-[var(--color-surface)] ${
        isOpen ? "border-2" : "border-[var(--color-border)]"
      }`}
      style={isOpen ? { borderColor: GOLD } : undefined}
    >
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-3 p-4 text-left">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
            <GenIcon name={icon} className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.92rem] font-bold leading-tight text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: row.engineType }} />
            <p className="mt-0.5 truncate text-[0.74rem] text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: row.bestFor }} />
          </div>
        </div>
        <span style={{ color: GOLD }}>
          <GenIcon name="chevronDown" className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      {isOpen ? (
        <div className="flex flex-col gap-2.5 px-4 pb-4 text-[0.84rem]">
          {[
            { icon: "tag", label: "Supply Only", value: row.supplyOnly, gold: true },
            { icon: "wrench", label: "Fitted (Indie)", value: row.fittedIndie, gold: true },
            { icon: "shield", label: "Warranty", value: row.warranty, gold: false },
            { icon: "users", label: "Best For", value: row.bestFor, gold: false },
          ].map((item) => (
            <div key={item.label} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[var(--color-border)] pt-2.5">
              <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                <span style={{ color: GOLD }}>
                  <GenIcon name={item.icon} className="h-3.5 w-3.5 shrink-0" />
                </span>
                {item.label}
              </span>
              <span
                className={`font-semibold ${item.gold ? "" : "text-[var(--color-text)]"}`}
                style={item.gold ? { color: GOLD } : undefined}
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ReplacementCosts({ data }) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(1);
  if (!data) return null;

  const isDark = theme === "dark";
  const headerBg = isDark ? "bg-[var(--color-chrome)]" : "";
  const headerDivider = isDark ? "border-white/20" : "border-white/25";
  const bodyWrapperBg = isDark ? "bg-black" : "bg-[var(--color-table-surface)]";

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 3)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <SectionLabel number={3} isDark={isDark} />
        <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {data.h2}
        </h2>

        <div className="mt-6 flex flex-col gap-3 md:hidden">
          {data.rows?.map((row, index) => (
            <AccordionRow
              key={row.engineType}
              row={row}
              icon={ROW_ICONS[index % ROW_ICONS.length]}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-table-surface)] shadow-[0_14px_40px_var(--color-shadow)] backdrop-blur md:block">
          <div
            className={`grid ${DESKTOP_COLS} gap-px px-2 py-3 text-[0.82rem] font-semibold text-white ${headerBg}`}
            style={isDark ? undefined : { backgroundColor: GOLD }}
          >
            {data.columns?.map((col, index) => (
              <span key={col} className={`px-2 ${index > 0 ? `border-l ${headerDivider}` : ""}`}>
                {col}
              </span>
            ))}
          </div>
          <div className={bodyWrapperBg}>
            {data.rows?.map((row, index) => (
              <DesktopRow key={row.engineType} row={row} icon={ROW_ICONS[index % ROW_ICONS.length]} isDark={isDark} />
            ))}
          </div>
        </div>

        {data.figuresNote ? (
          <div
            className={`mt-6 flex gap-3 rounded-md border p-4 ${
              isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
            }`}
          >
            <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
              <GenIcon name="info" className="h-5 w-5" />
            </span>
            <p className={`text-[0.82rem] leading-[1.5] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`} dangerouslySetInnerHTML={{ __html: data.figuresNote }} />
          </div>
        ) : null}

        {data.labourEstimate ? (
          <div
            className={`mt-4 flex items-center gap-4 rounded-xl border p-4 shadow-sm md:hidden ${
              isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
              <GenIcon name="wrench" className="h-4.5 w-4.5" />
            </span>
            <p className={`text-[0.82rem] leading-[1.45] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <span className="font-bold">Labour estimate: </span>
              <span dangerouslySetInnerHTML={{ __html: data.labourEstimate }} />
            </p>
          </div>
        ) : null}

        {data.labourEstimate || data.cta?.label ? (
          <div
            className={`mt-4 hidden items-center gap-4 rounded-xl border p-4 shadow-sm md:flex ${
              isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }`}
          >
            {data.labourEstimate ? (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                  <GenIcon name="wrench" className="h-4.5 w-4.5" />
                </span>
                <p className={`flex-1 text-[0.82rem] leading-[1.45] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  <span className="font-bold">Labour estimate: </span>
                  <span dangerouslySetInnerHTML={{ __html: data.labourEstimate }} />
                </p>
              </>
            ) : null}
            {data.cta?.label ? (
              <a
                href="/quote"
                className="btn-cta flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-[0.8rem] font-bold text-white no-underline shadow-[0_12px_28px_var(--color-shadow)]"
                style={{ backgroundColor: GOLD }}
              >
                <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
                {data.cta.label}
              </a>
            ) : null}
          </div>
        ) : null}

        {data.cta?.label ? (
          <a
            href="/quote"
            className="btn-cta mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-white no-underline shadow-[0_12px_28px_var(--color-shadow)] md:hidden"
            style={{ backgroundColor: GOLD }}
          >
            <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap text-center text-[0.78rem] font-bold">{data.cta.label}</span>
            <GenIcon name="chevron" className="h-4 w-4 shrink-0" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
