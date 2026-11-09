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
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import { useTheme } from "@/components/shared/themeProvider";

function CodeList({ items, icon, isDark }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span
        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border md:h-11 md:w-11 ${
          isDark ? "border-white/15 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
        }`}
      >
        <HomeIcon name={icon} isDark={isDark} className="h-5 w-5 md:h-6 md:w-6" />
      </span>
      <p className={`font-lora ${typeTable} font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {(items || []).join(", ")}
      </p>
    </div>
  );
}

function EraRow({ row, isDark }) {
  return (
    <div
      className={`grid grid-cols-[11rem_minmax(0,1.15fr)_minmax(0,1.15fr)_7.5rem] border-b last:border-b-0 ${
        isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
      }`}
    >
      <div className={`flex items-center gap-2.5 px-4 py-4 ${isDark ? "bg-black/40" : "bg-[#0a0a0a]"}`}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 md:h-12 md:w-12">
          <HomeIcon name={row.icon || "car"} tone="silver" className="h-6 w-6 md:h-7 md:w-7" />
        </span>
        <span className={`font-lora ${typeHighlight} font-medium leading-tight`} style={{ color: GOLD }}>
          {row.era}
        </span>
      </div>

      <div className={`border-l px-4 py-4 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <CodeList items={row.engines} icon="engine" isDark={isDark} />
      </div>

      <div className={`border-l px-4 py-4 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <CodeList items={row.models} icon="car" isDark={isDark} />
      </div>

      <div className={`flex items-center justify-center border-l px-2 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <div className="relative h-16 w-full max-w-[120px] overflow-hidden">
          <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.era} fill unoptimized className="object-contain" sizes="120px" />
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
      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div
            className={`grid grid-cols-[11rem_minmax(0,1.15fr)_minmax(0,1.15fr)_7.5rem] border-b ${typeTable} font-semibold uppercase tracking-[0.06em] ${
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
            <EraRow key={row.era} row={row} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function KeyTakeaway({ data }) {
  if (!data) return null;

  return (
    <div className="relative mt-5 overflow-hidden rounded-xl md:mt-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="absolute inset-y-0 right-0 hidden w-[38%] md:block">
        <Image src={data.image?.src || "/right.webp"} alt="" fill unoptimized className="object-contain object-center opacity-50" sizes="40vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,0.55)_55%,rgba(10,10,10,0.15)_100%)]" />
      </div>

      <div className="relative flex items-start gap-3 px-4 py-4 md:max-w-[62%] md:gap-4 md:px-5 md:py-5">
        <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 md:h-14 md:w-14">
          <HomeIcon name={data.icon || "shield"} tone="silver" className="h-7 w-7 md:h-8 md:w-8" />
        </span>
        <div className="min-w-0">
          <p className={`font-lora ${typeEyebrow}`} style={{ color: GOLD }}>
            {data.title || "KEY TAKEAWAY"}
          </p>
          <p className={`mt-1.5 ${typeDesc} font-light text-white/85`}>{data.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomeSec11({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/Amg-gt.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 11)}`}>
      <SectionHeaderBand
        title="Mercedes-Benz Engine History - Six Decades of Engineering"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 11)}
        panelRgb={sectionPanelRgb(isDark, 11)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <TimelineTable data={data} isDark={isDark} />
        <KeyTakeaway data={data.keyTakeaway} />
      </div>
    </section>
  );
}
