"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

const MOBILE_MODEL_LIMIT = 5;

const VERDICT_ICON = {
  warning: "check-watch",
  success: "safe-buy",
  trophy: "top-choice",
  diamond: "niche-style",
  crown: "crown",
  fire: "fire",
  commercial: "commercial",
};

function VerdictBadge({ verdict, isDark }) {
  const icon = VERDICT_ICON[verdict?.type] || "safe-buy";

  return (
    <span className={`inline-flex items-start gap-1.5 text-left text-[0.7rem] font-light leading-[1.25] no-underline md:text-[0.78rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
      <HomeIcon name={icon} isDark={isDark} gold className="mt-0.5 h-5 w-5 shrink-0" />
      <span className="font-light no-underline">{verdict?.text}</span>
    </span>
  );
}

function ModelCard({ item, isDark }) {
  const href = item.href || "#";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg border px-3 py-1.5 no-underline shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition hover:no-underline hover:opacity-95 md:gap-4 md:px-4 md:py-1.5 ${
        isDark
          ? "border-white/10 bg-[var(--color-surface-raised)]"
          : "border-[#E5E5E5] bg-white"
      }`}
    >
      <div className="relative h-[72px] w-[42%] shrink-0 overflow-hidden md:h-[88px]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-contain object-center"
          sizes="(max-width:768px) 40vw, 180px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 no-underline">
        <p className={`font-lora text-[1.15rem] font-semibold leading-none no-underline md:text-[1.35rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {item.model}
        </p>
        <p className={`text-[0.72rem] leading-[1.3] no-underline md:text-[0.8rem] ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
          {item.generations}
        </p>
        {item.note ? (
          <p className={`text-[0.62rem] leading-snug no-underline ${isDark ? "text-white/45" : "text-[var(--color-text-soft)]"}`}>
            {item.note}
          </p>
        ) : null}
        <div className="mt-0.5 no-underline">
          <VerdictBadge verdict={item.verdict} isDark={isDark} />
        </div>
      </div>
    </Link>
  );
}

export default function HomeSec2({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const models = data.models || [];
  const legend = data.legend || [];
  const dataNote = data.dataNote || "";
  const cta = data.cta || { label: "START YOUR RESEARCH →", href: "/quote" };
  const [showAllMobile, setShowAllMobile] = useState(false);
  const mobileModels = showAllMobile ? models : models.slice(0, MOBILE_MODEL_LIMIT);
  const hasMoreMobile = models.length > MOBILE_MODEL_LIMIT;

  return (
    <section className={`find-your-vehicle relative overflow-hidden px-3 py-6 md:px-4 md:py-8 ${homeSectionBg(isDark, 2)}`}>
      <div className="relative mx-auto w-full max-w-8xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <SectionLabel number={2} isDark={isDark} />
            <h2 className={`font-lora text-[2.2rem] font-medium leading-[1.05] md:text-[3.1rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Find Your Vehicle
            </h2>
            <p className={`mt-2 max-w-[520px] text-[0.92rem] leading-[1.4] md:text-[1.05rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
              {data.subHeadline}
            </p>
          </div>

          {legend.length > 0 ? (
            <ul className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
              {legend.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-2 text-[0.88rem] font-medium md:text-[1rem]" style={{ color: GOLD }}>
                  <HomeIcon name={item.icon} isDark={isDark} gold className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Mobile: 1 per row, first 5 (+ expand) */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 md:hidden">
          {mobileModels.map((item) => (
            <ModelCard key={item.model} item={item} isDark={isDark} />
          ))}
        </div>

        {hasMoreMobile ? (
          <div className="mt-3 md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((prev) => !prev)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0a0a0a] px-5 py-3.5 text-[0.9rem] font-semibold text-white"
            >
              <span>{showAllMobile ? "Show fewer models" : "Show more models"}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={`h-4 w-4 shrink-0 transition-transform ${showAllMobile ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        ) : null}

        {/* Desktop: all models, 4-col - unchanged */}
        <div className="mt-6 hidden grid-cols-4 gap-3 md:grid">
          {models.map((item) => (
            <ModelCard key={item.model} item={item} isDark={isDark} />
          ))}
        </div>

        {dataNote ? (
          <div
            className={`mt-5 flex items-start gap-3 rounded-md px-3 py-3 md:mt-6 md:px-4 md:py-3.5 ${
              isDark ? "bg-[var(--color-surface-raised)]" : "bg-[#EDE6D8]"
            }`}
          >
            <HomeIcon name="info" isDark={isDark} gold className="mt-0.5 h-5 w-5 shrink-0" />
            <p className={`text-[0.78rem] leading-[1.4] md:text-[0.86rem] ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
              <span className="font-semibold">Data Note: </span>
              {dataNote}
            </p>
          </div>
        ) : null}

        <div className="mt-4 md:hidden">
          <Link
            href={cta.href || "/quote"}
            className="btn-cta flex w-full items-center justify-center rounded-md px-5 py-3.5 text-[0.9rem] font-semibold text-white"
            style={{ backgroundColor: GOLD }}
          >
            {cta.label || "START YOUR RESEARCH →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
