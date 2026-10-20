"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

function CodeList({ items, icon, isDark }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
          isDark ? "border-white/15 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
        }`}
      >
        <HomeIcon name={icon} isDark={isDark} gold className="h-4 w-4" />
      </span>
      <p className={`font-lora text-[0.85rem] font-medium leading-snug md:text-[0.95rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {(items || []).join(", ")}
      </p>
    </div>
  );
}

function EraRow({ row, isDark, columns = [] }) {
  return (
    <div
      className={`grid grid-cols-1 border-b last:border-b-0 md:grid-cols-[11rem_minmax(0,1.15fr)_minmax(0,1.15fr)_7.5rem] ${
        isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
      }`}
    >
      {/* Era — black strip on desktop */}
      <div
        className={`flex items-center gap-2.5 px-3.5 py-3 md:px-4 md:py-4 ${
          isDark ? "bg-black/40" : "bg-[#0a0a0a]"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <HomeIcon name={row.icon || "car"} isDark gold className="h-4 w-4" />
        </span>
        <span className="font-lora text-[0.88rem] font-medium leading-tight text-white md:text-[0.95rem]" style={{ color: GOLD }}>
          {row.era}
        </span>
      </div>

      {/* Engines */}
      <div className={`px-3.5 py-3 md:border-l md:px-4 md:py-4 ${isDark ? "md:border-white/10" : "md:border-[rgba(0,0,0,0.06)]"}`}>
        <p className={`mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] md:hidden ${isDark ? "text-white/50" : "text-[var(--color-text-muted)]"}`}>
          {columns[1] || "Key Engines"}
        </p>
        <CodeList items={row.engines} icon="engine" isDark={isDark} />
      </div>

      {/* Models */}
      <div className={`px-3.5 py-3 md:border-l md:px-4 md:py-4 ${isDark ? "md:border-white/10" : "md:border-[rgba(0,0,0,0.06)]"}`}>
        <p className={`mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] md:hidden ${isDark ? "text-white/50" : "text-[var(--color-text-muted)]"}`}>
          {columns[2] || "Iconic Models"}
        </p>
        <CodeList items={row.models} icon="car" isDark={isDark} />
      </div>

      {/* Visual */}
      <div className={`flex items-center justify-center px-3 py-3 md:border-l md:px-2 ${isDark ? "md:border-white/10" : "md:border-[rgba(0,0,0,0.06)]"}`}>
        <div className="relative h-14 w-full max-w-[120px] overflow-hidden md:h-16">
          <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.era} fill className="object-contain" sizes="120px" />
        </div>
      </div>
    </div>
  );
}

function TimelineTable({ data, isDark }) {
  const columns = data.columns || ["ERA", "KEY ENGINES", "ICONIC MODELS", "VISUAL"];
  const eras = data.eras || [];

  return (
    <div
      className={`mt-5 overflow-hidden rounded-xl border shadow-[0_6px_24px_rgba(10,26,43,0.05)] md:mt-6 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`}
    >
      <div
        className={`hidden border-b text-[0.62rem] font-semibold uppercase tracking-[0.06em] md:grid md:grid-cols-[11rem_minmax(0,1.15fr)_minmax(0,1.15fr)_7.5rem] ${
          isDark ? "border-white/10 bg-white/5 text-white/50" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
        }`}
      >
        {columns.map((col, i) => (
          <span
            key={col}
            className={`px-4 py-2.5 ${i > 0 ? (isDark ? "border-l border-white/10" : "border-l border-[rgba(0,0,0,0.06)]") : ""}`}
          >
            {col}
          </span>
        ))}
      </div>

      {eras.map((row) => (
        <EraRow key={row.era} row={row} isDark={isDark} columns={columns} />
      ))}
    </div>
  );
}

function KeyTakeaway({ data, isDark }) {
  if (!data) return null;

  return (
    <div className="relative mt-5 overflow-hidden rounded-xl md:mt-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="absolute inset-y-0 right-0 hidden w-[38%] md:block">
        <Image src={data.image?.src || "/right.webp"} alt="" fill className="object-cover object-center opacity-50" sizes="40vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.55)_55%,rgba(10,10,10,0.15)_100%)]" />
      </div>

      <div className="relative flex items-start gap-3 px-4 py-4 md:max-w-[62%] md:gap-4 md:px-5 md:py-5">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 md:h-12 md:w-12">
          <HomeIcon name={data.icon || "shield"} isDark gold className="h-5 w-5 md:h-6 md:w-6" />
        </span>
        <div className="min-w-0">
          <p className="font-lora text-[0.78rem] font-medium uppercase tracking-[0.08em] md:text-[0.85rem]" style={{ color: GOLD }}>
            {data.title || "KEY TAKEAWAY"}
          </p>
          <p className="mt-1.5 text-[0.82rem] font-light leading-[1.5] text-white/85 md:text-[0.92rem]">{data.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeSec11({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden px-3 py-7 md:px-4 md:py-8 ${homeSectionBg(isDark, 11)}`}>
      <div className="absolute inset-x-0 top-0 hidden h-[280px] md:block">
        <Image src={headerImage.src} alt="" fill className="object-cover object-right" sizes="100vw" />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#EFEEE9_0%,rgba(239,238,233,0.92)_40%,rgba(239,238,233,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl">
        <div className="max-w-[720px] pt-2 md:pt-6">
          <SectionLabel number={11} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Mercedes-Benz Engine History — Six Decades of Engineering
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

        <TimelineTable data={data} isDark={isDark} />
        <KeyTakeaway data={data.keyTakeaway} isDark={isDark} />
      </div>
    </section>
  );
}
