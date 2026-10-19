"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import { useTheme } from "@/components/shared/themeProvider";


function NumberStrip({ id }) {
  return (
    <div
      className="flex w-10 shrink-0 items-center justify-center self-stretch md:w-12"
      style={{
        background: "linear-gradient(180deg, #E8E4DC 0%, #F5F3EE 45%, #FFFFFF 100%)",
      }}
    >
      <span className="font-lora text-[1.35rem] font-medium leading-none text-black md:text-[1.55rem]">{id}</span>
    </div>
  );
}

function ComparisonRow({ item, isDark }) {
  const href = item.link?.href || "#";

  return (
    <Link
      href={href}
      className={`flex flex-col border-b no-underline last:border-b-0 hover:no-underline md:flex-row md:items-stretch ${
        isDark
          ? "border-white/10 hover:bg-white/5"
          : "border-[rgba(0,0,0,0.08)] hover:bg-[#F8F7F3]"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-stretch">
        <NumberStrip id={item.id} />

        {/* Comparison */}
        <div className="flex min-w-0 flex-[1.15] items-start gap-2.5 px-3 py-3 md:gap-3 md:px-4 md:py-3.5">
          <span
            className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
              isDark ? "border-white/20" : "border-[#E5E5E5]"
            }`}
          >
            <HomeIcon name={item.icon} isDark={isDark} gold className="h-7 w-7 md:h-8 md:w-8" />
          </span>
          <div className="min-w-0">
            <p className={`font-lora text-[0.95rem] font-medium leading-tight md:text-[1.08rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {item.title}
            </p>
            {item.detail ? (
              <p className={`mt-1 text-[0.72rem] font-light leading-[1.35] md:text-[0.78rem] ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                {item.detail}
              </p>
            ) : null}
          </div>
        </div>

        {/* Verdict preview — desktop */}
        <div
          className="hidden min-w-0 flex-[1.35] items-start gap-2.5 border-l px-3 py-3 md:flex md:px-4 md:py-3.5"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}
        >
          <span
            className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(171,132,80,0.16)" }}
          >
            <HomeIcon name={item.verdictIcon || "shield"} isDark={isDark} gold className="h-7 w-7 md:h-8 md:w-8" />
          </span>
          <p className="font-lora text-[0.78rem] font-medium leading-[1.4] md:text-[0.86rem]" style={{ color: GOLD }}>
            {item.verdictPreview}
          </p>
        </div>

        {/* Link */}
        <div className="flex shrink-0 items-center px-3 py-3 md:px-4">
          <span className="font-lora text-[0.78rem] font-medium whitespace-nowrap md:text-[0.88rem]" style={{ color: GOLD }}>
            {item.link?.label || "Read the verdict →"}
          </span>
        </div>
      </div>

      {/* Verdict preview — mobile */}
      <div className="flex items-start gap-2 border-t px-3 py-2.5 md:hidden" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}>
        <HomeIcon name={item.verdictIcon || "shield"} isDark={isDark} gold className="mt-0.5 h-6 w-6 shrink-0" />
        <p className="font-lora text-[0.72rem] font-medium leading-[1.4]" style={{ color: GOLD }}>
          {item.verdictPreview}
        </p>
      </div>
    </Link>
  );
}

export default function HomeSec5({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || data.headerImages?.[0] || { src: "/sec2-bg.webp", alt: "" };
  const comparisons = data.comparisons || [];
  const columns = data.columns || ["#", "COMPARISON", "VERDICT PREVIEW", "LINK"];

  return (
    <section className={`relative overflow-hidden px-3 py-7 md:px-4 md:py-8 ${homeSectionBg(isDark, 5)}`}>
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
        <div className="max-w-[720px] pt-1 md:pt-6">
          <SectionLabel number={5} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Comparison Hub — Head-to-Head Verdicts
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

        <TrustBadges items={data.trustStrip} isDark={isDark} />

        <div
          className={`mt-5 overflow-hidden rounded-lg border shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:mt-7 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
          }`}
        >
          {/* Desktop column headers */}
          <div
            className={`hidden grid-cols-[2.75rem_minmax(0,1.15fr)_minmax(0,1.35fr)_auto] items-center border-b px-0 text-[0.68rem] font-semibold uppercase tracking-[0.08em] md:grid ${
              isDark ? "border-white/10 text-white/55" : "border-[rgba(0,0,0,0.08)] text-[var(--color-text-muted)]"
            }`}
          >
            <span className="px-2 py-2.5 text-center">{columns[0]}</span>
            <span className="px-4 py-2.5">{columns[1]}</span>
            <span className="border-l px-4 py-2.5" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}>
              {columns[2]}
            </span>
            <span className="px-4 py-2.5 text-right">{columns[3]}</span>
          </div>

          {comparisons.map((item) => (
            <ComparisonRow key={item.id} item={item} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
