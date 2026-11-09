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



import { useState } from "react";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import { useTheme } from "@/components/shared/themeProvider";

function NumberStrip({ id }) {
  return (
    <div
      className="flex w-10 shrink-0 items-center justify-center self-stretch md:w-auto md:min-w-0"
      style={{
        background: "linear-gradient(180deg, #E8E4DC 0%, #F5F3EE 45%, #FFFFFF 100%)",
      }}
    >
      <span className={`font-lora leading-none text-black ${typeH4}`}>{id}</span>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Shared desktop table columns - header + rows must use the same template. */
const TABLE_COLS = "md:grid md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1.35fr)_11.5rem]";
const COL_DIVIDER = (isDark) => (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)");

/** Light: comparison col = black; verdict col alternates gold/black. Dark: silver. */
function tableTone(isDark, goldOnLight = false) {
  if (isDark) return "silver";
  return goldOnLight ? "gold" : "black";
}

function ComparisonRow({ item, isDark, open, onToggle }) {
  const href = item.link?.href || "#";
  const verdictGold = item.id % 2 === 1; // 1,3,5 gold · 2,4,6 black (ref)
  const comparisonTone = tableTone(isDark, false);
  const verdictTone = tableTone(isDark, verdictGold);

  return (
    <div
      className={`border-b last:border-b-0 ${
        isDark ? "border-white/10" : "border-[rgba(0,0,0,0.08)]"
      }`}
    >
      {/* Mobile accordion header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-stretch text-left md:hidden ${
          isDark ? "hover:bg-white/5" : "hover:bg-[#F8F7F3]"
        }`}
      >
        <NumberStrip id={item.id} />
        <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
              isDark ? "border-white/20" : "border-[#E5E5E5]"
            }`}
          >
            <HomeIcon name={item.icon} tone={comparisonTone} className="h-6 w-6" />
          </span>
          <p className={`min-w-0 flex-1 font-lora ${typeH6} font-medium leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {item.title}
          </p>
          <span className={isDark ? "text-white/50" : "text-[var(--color-text-muted)]"}>
            <Chevron open={open} />
          </span>
        </div>
      </button>

      {/* Mobile accordion body - detail + verdict preview */}
      {open ? (
        <div className="md:hidden">
          {item.detail ? (
            <p
              className={`border-t px-3 py-2.5 pl-[3.75rem] ${typeTable} font-light ${
                isDark ? "border-white/10 text-white/65" : "border-[rgba(0,0,0,0.06)] text-[var(--color-text-muted)]"
              }`}
            >
              {item.detail}
            </p>
          ) : null}
          <div
            className={`flex items-start gap-2 border-t px-3 py-2.5 pl-[3.75rem] ${
              isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
            }`}
          >
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: !isDark && verdictGold ? "rgba(171,132,80,0.16)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
            >
              <HomeIcon name={item.verdictIcon || "shield"} tone={verdictTone} className="h-5 w-5" />
            </span>
            <p className={`font-lora ${typeTable} font-medium`} style={{ color: GOLD }}>
              {item.verdictPreview}
            </p>
          </div>
          <div className={`border-t px-3 py-2.5 pl-[3.75rem] ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
            <Link href={href} className={`font-lora ${typeTable} font-medium no-underline hover:underline`} style={{ color: GOLD }}>
              {item.link?.label || "Read the verdict →"}
            </Link>
          </div>
        </div>
      ) : null}

      {/* Desktop row - same grid as header */}
      <Link
        href={href}
        className={`hidden border-0 no-underline hover:no-underline ${TABLE_COLS} ${
          isDark ? "hover:bg-white/5" : "hover:bg-[#F8F7F3]"
        }`}
      >
        <NumberStrip id={item.id} />

        <div className="flex min-w-0 items-start gap-3 px-4 py-3.5">
          <span
            className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
              isDark ? "border-white/20" : "border-[#E5E5E5]"
            }`}
          >
            <HomeIcon name={item.icon} tone={comparisonTone} className="h-8 w-8" />
          </span>
          <div className="min-w-0">
            <p className={`font-lora ${typeH6} font-medium leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {item.title}
            </p>
            {item.detail ? (
              <p className={`mt-1 ${typeTable} font-light ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                {item.detail}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-2.5 border-l px-4 py-3.5" style={{ borderColor: COL_DIVIDER(isDark) }}>
          <span
            className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: !isDark && verdictGold ? "rgba(171,132,80,0.16)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            }}
          >
            <HomeIcon name={item.verdictIcon || "shield"} tone={verdictTone} className="h-8 w-8" />
          </span>
          <p className={`font-lora ${typeTable} font-medium`} style={{ color: GOLD }}>
            {item.verdictPreview}
          </p>
        </div>

        <div className="flex items-center px-4">
          <span className={`font-lora ${typeTable} font-medium whitespace-nowrap`} style={{ color: GOLD }}>
            {item.link?.label || "Read the verdict →"}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function HomeSec5({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || data.headerImages?.[0] || { src: "/Amg-gt.webp", alt: "" };
  const comparisons = data.comparisons || [];
  const columns = data.columns || ["#", "COMPARISON", "VERDICT PREVIEW", "LINK"];
  const [openId, setOpenId] = useState(null);

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 5)}`}>
      <SectionHeaderBand
        title="Comparison Hub - Head-to-Head Verdicts"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 5)}
        panelRgb={sectionPanelRgb(isDark, 5)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <TrustBadges items={data.trustStrip} isDark={isDark} mobileRow softDividers />

        <div
          className={`mt-5 overflow-hidden rounded-lg border shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:mt-7 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
          }`}
        >
          <div
            className={`hidden items-stretch border-b ${TABLE_COLS} ${typeTable} font-semibold uppercase tracking-[0.08em] ${
              isDark ? "border-white/10 text-white/55" : "border-[rgba(0,0,0,0.08)] text-[var(--color-text-muted)]"
            }`}
          >
            <div className="flex items-center justify-center py-2.5">{columns[0]}</div>
            {/* Match row: px-4 + 48px icon + gap-3 → label lines up with title text */}
            <div className="flex items-center gap-3 px-4 py-2.5">
              <span className="h-12 w-12 shrink-0" aria-hidden="true" />
              <span>{columns[1]}</span>
            </div>
            <div className="flex items-center gap-2.5 border-l px-4 py-2.5" style={{ borderColor: COL_DIVIDER(isDark) }}>
              <span className="h-12 w-12 shrink-0" aria-hidden="true" />
              <span>{columns[2]}</span>
            </div>
            <div className="flex items-center px-4 py-2.5 whitespace-nowrap">{columns[3]}</div>
          </div>

          {comparisons.map((item) => (
            <ComparisonRow
              key={item.id}
              item={item}
              isDark={isDark}
              open={openId === item.id}
              onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
