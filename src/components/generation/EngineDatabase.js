"use client";

import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "./GenIcons";
import GenBadge from "./GenBadge";

const DESKTOP_COLS = "grid-cols-[0.95fr_0.6fr_1.05fr_0.8fr_0.9fr_1.15fr_1fr_1.05fr_1fr_1.05fr]";
const MOBILE_COLS = "grid-cols-[100px_70px_90px_110px_120px_110px_130px]";
const MOBILE_HEADERS = ["Engine Code", "Fuel", "Power", "Years", "Reliability", "Enquiries", "Avg. Recon Cost"];

function FuelIcon({ fuel = "", className }) {
  return <GenIcon name={fuel.toLowerCase().includes("diesel") ? "engine" : "car"} className={className} />;
}

function Stars({ value = "", className = "text-[1rem]" }) {
  return (
    <span className={`tracking-tight ${className}`} style={{ color: GOLD }}>
      {value}
    </span>
  );
}

function DesktopRow({ engine, isDark }) {
  const rowClass = isDark ? "bg-[var(--color-surface)] text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const softText = isDark ? "text-white/60" : "text-[var(--color-text-soft)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${DESKTOP_COLS} items-center gap-px ${rowClass} border-b px-4 py-2 text-[0.78rem] last:border-b-0 ${borderBottom}`}>
      <span className={`min-w-0 border-r px-2 font-semibold ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.engineCode }} />
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.family }} />
      <span className={`flex min-w-0 items-center gap-1.5 border-r px-2 ${mutedText} ${cellDivider}`}>
        <FuelIcon fuel={engine.fuel} className="h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0" dangerouslySetInnerHTML={{ __html: engine.fuel }} />
      </span>
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.displacement }} />
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.power }} />
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.years }} />
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.variants }} />
      <span className={`flex min-w-0 flex-col gap-0.5 border-r px-2 ${cellDivider}`}>
        <Stars value={engine.reliability} className="text-[0.85rem]" />
        <GenBadge tag={engine.reliabilityTag} isDark={isDark} />
        {engine.reliabilityDetail ? (
          <span className={`text-[0.64rem] leading-[1.2] ${softText}`} dangerouslySetInnerHTML={{ __html: engine.reliabilityDetail }} />
        ) : null}
      </span>
      <span className={`min-w-0 border-r px-2 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.enquiries }} />
      <span className="min-w-0 px-2 font-semibold" dangerouslySetInnerHTML={{ __html: engine.avgReconCost }} />
    </div>
  );
}

function MobileRow({ engine, isDark }) {
  const rowClass = isDark ? "bg-[var(--color-surface)] text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const softText = isDark ? "text-white/60" : "text-[var(--color-text-soft)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${MOBILE_COLS} items-center gap-px ${rowClass} border-b px-3 py-1.5 text-[0.68rem] leading-[1.25] last:border-b-0 ${borderBottom}`}>
      <span className={`border-r px-1.5 ${cellDivider}`}>
        <span className="block font-semibold" dangerouslySetInnerHTML={{ __html: engine.engineCode }} />
        <span className={`block text-[0.62rem] ${softText}`} dangerouslySetInnerHTML={{ __html: engine.family }} />
      </span>
      <span className={`flex items-center gap-1 border-r px-1.5 ${mutedText} ${cellDivider}`}>
        <FuelIcon fuel={engine.fuel} className="h-3.5 w-3.5 shrink-0" />
        <span dangerouslySetInnerHTML={{ __html: engine.fuel }} />
      </span>
      <span className={`border-r px-1.5 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.power }} />
      <span className={`border-r px-1.5 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.years }} />
      <span className={`flex flex-col items-start gap-1 border-r px-1.5 ${cellDivider}`}>
        <Stars value={engine.reliability} className="text-[0.72rem]" />
        <GenBadge tag={engine.reliabilityTag} isDark={isDark} />
      </span>
      <span className={`border-r px-1.5 ${mutedText} ${cellDivider}`} dangerouslySetInnerHTML={{ __html: engine.enquiries }} />
      <span className="flex items-center gap-1 px-1.5 font-semibold">
        <span dangerouslySetInnerHTML={{ __html: engine.avgReconCost }} />
        <span style={{ color: GOLD }}>
          <GenIcon name="chevron" className="h-3.5 w-3.5 shrink-0" />
        </span>
      </span>
    </div>
  );
}

export default function EngineDatabase({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const headerDivider = "border-white/25";
  const bodyWrapperBg = isDark ? "bg-[var(--color-surface)]" : "bg-[var(--color-table-surface)]";

  return (
    <section className={`relative overflow-hidden py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 2)}`}>
      {/* Header image */}
      <div className="absolute inset-x-0 top-0 h-[220px] md:h-[280px]">
        <Image
          src="/sec2-bg.webp"
          alt=""
          fill
          className="object-cover object-[64%_top] md:object-right"
          sizes="100vw"
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#F8F7F3_0%,rgba(248,247,243,0.92)_40%,rgba(248,247,243,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#F8F7F3_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="max-w-[760px] pt-2 md:pt-6">
          <SectionLabel number={2} isDark={isDark} />
          <h2
            className={`font-lora max-w-[760px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}
            dangerouslySetInnerHTML={{ __html: data.h2 }}
          />
          {data.subHeadline ? (
            <p
              className="mt-4 max-w-[920px] text-[0.88rem] leading-[1.4] text-[var(--color-text-muted)] md:mt-5 md:text-[1.02rem] md:leading-[1.42]"
              dangerouslySetInnerHTML={{ __html: data.subHeadline }}
            />
          ) : null}
        </div>

        <div className="mt-6 hidden overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-table-surface)] shadow-[0_14px_40px_var(--color-shadow)] backdrop-blur md:block">
          <div className={`grid ${DESKTOP_COLS} gap-px rounded-t-md px-4 py-2 text-[0.72rem] font-semibold leading-[1.2] text-white`} style={{ backgroundColor: GOLD }}>
            {data.columns?.map((col) => (
              <span key={col} className={`min-w-0 border-r px-2 last:border-r-0 ${headerDivider}`}>
                {col}
              </span>
            ))}
          </div>
          <div className={bodyWrapperBg}>
            {data.engines?.map((engine) => (
              <DesktopRow key={engine.engineCode} engine={engine} isDark={isDark} />
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-md border border-[var(--color-border)] bg-[var(--color-table-surface)] shadow-[0_14px_40px_var(--color-shadow)] backdrop-blur md:hidden">
          <div className="min-w-[730px]">
            <div className={`grid ${MOBILE_COLS} gap-px px-3 py-2 text-[0.68rem] font-semibold leading-[1.2] text-white`} style={{ backgroundColor: GOLD }}>
              {MOBILE_HEADERS.map((col) => (
                <span key={col} className={`border-r px-1.5 last:border-r-0 ${headerDivider}`}>
                  {col}
                </span>
              ))}
            </div>
            <div className={bodyWrapperBg}>
              {data.engines?.map((engine) => (
                <MobileRow key={engine.engineCode} engine={engine} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>

        {data.confidenceScore?.items?.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 items-center gap-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:grid-cols-[72px_1fr_1fr_1fr_1.4fr] md:items-start md:gap-0 md:divide-x md:divide-[var(--color-border)]">
            <div className="flex items-start justify-start md:pr-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-white" style={{ backgroundColor: GOLD }}>
                <GenIcon name="shield" className="h-8 w-8" />
              </span>
            </div>
            {data.confidenceScore.items.map((item, index) => {
              const iconTone = item.iconColor === "success" ? "text-[#13884a]" : "";
              const labelTone = item.iconColor === "success" ? "text-[#13884a]" : "";
              const padding = index === 0 ? "md:pl-4 md:pr-4" : "md:px-4";
              return (
                <div key={`${item.label}-${index}`} className={`flex flex-col gap-1.5 ${padding}`}>
                  <p className={`flex items-center gap-2 text-[0.82rem] font-semibold leading-[1.3] ${labelTone || ""}`} style={labelTone ? undefined : { color: GOLD }}>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center ${iconTone}`} style={iconTone ? undefined : { color: GOLD }}>
                      <GenIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: item.label }} />
                  </p>
                  <p className="text-[0.8rem] leading-[1.45] text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
