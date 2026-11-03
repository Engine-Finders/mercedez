"use client";

import Image from "next/image";
import { useState } from "react";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const DESKTOP_COLS = "grid-cols-[1.5fr_0.9fr_0.9fr_1.2fr_1.1fr]";
const ENGINE_IMAGE = "/320d/engine.webp";

function shortCode(engineCode = "") {
  return engineCode.split(" / ")[0].split(" (")[0];
}

const SPEC_ICONS = ["engine", "refresh", "gauge", "drum", "target"];

function splitSpecsTitle(title = "") {
  const match = title.match(/^(.*?)\s*\(([^)]+)\)\s*:?$/);
  if (!match) return { title: title.replace(/:$/, ""), tag: "" };
  return { title: match[1], tag: match[2] };
}

function DesktopRow({ row, isDark }) {
  const rowClass = isDark ? "bg-black text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${DESKTOP_COLS} items-center gap-px ${rowClass} px-2 py-2.5 text-[0.8rem] border-b ${borderBottom} last:border-b-0`}>
      <span className="flex items-center gap-2 px-2 font-semibold">
        <span className="relative h-9 w-11 shrink-0 overflow-hidden">
          <Image src={ENGINE_IMAGE} alt={row.engineCode} fill className="object-contain" sizes="44px" />
        </span>
        <span style={{ color: GOLD }}>{row.engineCode}</span>
      </span>
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`}>{row.years}</span>
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`}>{row.power}</span>
      <span className={`px-2 border-l ${cellDivider} ${mutedText}`}>{row.enquiries}</span>
      <span className={`px-2 border-l ${cellDivider} font-semibold`}>{row.avgReconCost}</span>
    </div>
  );
}

function DetailCard({ row, isDark }) {
  return (
    <div
      className={`flex gap-4 rounded-md border p-4 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
    >
      <span className="relative h-auto w-28 shrink-0 self-stretch">
        <Image src={ENGINE_IMAGE} alt={row.engineCode} fill className="object-contain" sizes="112px" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 text-[0.82rem]">
        <p className={`truncate text-[1rem] font-bold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.engineCode}</p>
        {[
          { icon: "clock", label: "Years", value: row.years },
          { icon: "gauge", label: "Power", value: row.power },
          { icon: "chart", label: "2025 Enquiries", value: row.enquiries },
          { icon: "dollar", label: "Avg. Recon Cost", value: row.avgReconCost, gold: true },
        ].map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 ${index < 3 ? `border-b pb-2.5 ${isDark ? "border-white/10" : "border-[var(--color-border)]"}` : ""}`}
          >
            <span className={`flex items-center gap-1.5 ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
              <span style={{ color: GOLD }}>
                <GenIcon name={item.icon} className="h-3.5 w-3.5 shrink-0" />
              </span>
              {item.label}
            </span>
            <span className={`font-semibold ${item.gold ? "" : isDark ? "text-white" : "text-[var(--color-text)]"}`} style={item.gold ? { color: GOLD } : undefined}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EngineCodes({ data }) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  if (!data) return null;

  const isDark = theme === "dark";
  const headerBg = isDark ? "bg-[var(--color-chrome)]" : "";
  const headerDivider = isDark ? "border-white/20" : "border-white/25";
  const bodyWrapperBg = isDark ? "bg-black" : "bg-[var(--color-table-surface)]";
  const rows = data.rows || [];

  const specsTitle = data.technicalSpecs ? splitSpecsTitle(data.technicalSpecs.title) : null;

  const technicalSpecsCard = data.technicalSpecs ? (
    <div
      className={`overflow-hidden rounded-xl border ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
      }`}
    >
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 border-b px-4 py-3 ${isDark ? "border-white/10" : "border-[var(--color-border)]"}`}>
        <p className={`text-[0.85rem] font-bold uppercase tracking-wide ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{specsTitle.title}</p>
        {specsTitle.tag ? (
          <span className="text-[0.68rem] font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
            {specsTitle.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col">
        {data.technicalSpecs.items?.map((item, index) => (
          <div
            key={item.label}
            className={`grid grid-cols-[1fr_1fr] gap-3 px-4 py-3 ${index > 0 ? `border-t ${isDark ? "border-white/10" : "border-[var(--color-border)]"}` : ""}`}
          >
            <span className={`flex items-center gap-2 border-r pr-3 text-[0.78rem] ${isDark ? "border-white/10 text-white/70" : "border-[var(--color-border)] text-[var(--color-text-muted)]"}`}>
              <span style={{ color: GOLD }}>
                <GenIcon name={SPEC_ICONS[index % SPEC_ICONS.length]} className="h-4 w-4 shrink-0" />
              </span>
              {item.label.replace(/^\*\s*/, "")}
            </span>
            <span className={`text-[0.8rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`} dangerouslySetInnerHTML={{ __html: item.value }} />
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const quoteCtaBanner = data.cta?.label ? (
    <a
      href="/quote"
      className="btn-cta relative flex items-center gap-4 overflow-hidden rounded-xl border p-5 text-white no-underline shadow-[0_12px_28px_var(--color-shadow)]"
      style={{ borderColor: "rgba(171,132,80,0.35)", backgroundColor: "#0a0a0a" }}
    >
      <div className="absolute inset-0">
        <Image src={ENGINE_IMAGE} alt="" fill className="object-cover object-right opacity-40" sizes="400px" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.75)_55%,transparent_100%)]" />
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 shadow-lg" style={{ backgroundColor: GOLD }}>
          <GenIcon name="arrow" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.95rem] font-bold leading-tight" style={{ color: GOLD }}>
            {data.cta.label}
          </p>
          <p className="mt-1 text-[0.78rem] leading-[1.4] text-white/80">Get quotes from trusted UK specialists in minutes.</p>
        </div>
      </div>
    </a>
  ) : null;

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 8)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel number={8} isDark={isDark} />
            <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Engine Codes
            </h2>
            {data.matchNote ? (
              <p className={`mt-3 text-[0.78rem] ${isDark ? "text-white/55" : "text-[var(--color-text-soft)]"}`} dangerouslySetInnerHTML={{ __html: data.matchNote }} />
            ) : null}

            <div className="mt-6 grid grid-cols-4 gap-1.5 md:hidden">
              {rows.map((row, index) => (
                <button
                  key={row.engineCode}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex min-w-0 flex-col items-center gap-0.5 rounded-md border px-1 py-2 text-center ${
                    activeIndex === index
                      ? "text-white"
                      : isDark
                        ? "border-white/10 bg-[var(--color-surface-raised)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
                  }`}
                  style={activeIndex === index ? { backgroundColor: GOLD, borderColor: GOLD } : undefined}
                >
                  <span className="truncate text-[0.7rem] font-bold leading-tight">{shortCode(row.engineCode)}</span>
                  <span className={`truncate text-[0.58rem] ${activeIndex === index ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>{row.years}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 md:hidden">{rows[activeIndex] ? <DetailCard row={rows[activeIndex]} isDark={isDark} /> : null}</div>

            <div className="mt-6 hidden overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-table-surface)] shadow-lg backdrop-blur md:block">
              <div
                className={`grid ${DESKTOP_COLS} gap-px px-2 py-2.5 text-[0.78rem] font-semibold text-white ${headerBg}`}
                style={isDark ? undefined : { backgroundColor: GOLD }}
              >
                {data.columns?.map((col, index) => (
                  <span key={col} className={`px-2 ${index > 0 ? `border-l ${headerDivider}` : ""}`}>
                    {col}
                  </span>
                ))}
              </div>
              <div className={bodyWrapperBg}>
                {rows.map((row) => (
                  <DesktopRow key={row.engineCode} row={row} isDark={isDark} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            {technicalSpecsCard}
            {quoteCtaBanner}
          </div>
        </div>
      </div>
    </section>
  );
}
