"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";

const TRUST_ICON_FALLBACKS = ["chart", "wrench", "book", "engine-finders"];

const EMOJI_ICON_MAP = {
  "📊": "chart",
  "🔧": "wrench",
  "📖": "book",
  "🏆": "engine-finders",
  "📘": "book",
  "🛠️": "wrench",
};

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function FadeStrip({ isDark, className = "w-14" }) {
  return (
    <>
      <span className={`block h-[2px] md:hidden ${className}`} style={{ backgroundColor: GOLD }} aria-hidden="true" />
      <span
        className={`hidden h-[2px] md:block ${className}`}
        style={{
          background: isDark
            ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
            : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

function resolveIcon(icon, index = 0) {
  if (!icon) return TRUST_ICON_FALLBACKS[index] || "chart";
  if (EMOJI_ICON_MAP[icon]) return EMOJI_ICON_MAP[icon];
  return icon;
}

function renderWithPatternTag(text = "") {
  const parts = String(text).split(/(\[PATTERN DATA\])/g);
  return parts.map((part, i) =>
    part === "[PATTERN DATA]" ? (
      <span key={i} className="font-medium" style={{ color: GOLD }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function TagPill({ tagPill, isDark }) {
  const parts = String(tagPill || "")
    .split(" • ")
    .map((p) => p.trim())
    .filter(Boolean);
  const firstEngineIndex = parts.findIndex((part) => /^(M|OM)\d/i.test(part));

  return (
    <div
      className={`inline-flex w-fit max-w-full flex-nowrap items-center gap-x-2 self-start overflow-x-auto rounded-md border px-3 py-2 text-[0.72rem] leading-[1.35] whitespace-nowrap md:px-3.5 md:py-2.5 md:text-[0.8rem] ${
        isDark ? "border-white/20 bg-white/5 text-white/85" : "border-[#E5E5E5] bg-white/80 text-[var(--color-text-muted)]"
      }`}
    >
      <HomeIcon name="car" isDark={isDark} gold className="h-4 w-4 shrink-0 object-contain" />
      {parts.map((part, index) => {
        const isEngine = /^(M|OM)\d/i.test(part);
        const showEngineIcon = isEngine && index === firstEngineIndex;
        return (
          <span key={`${part}-${index}`} className="inline-flex shrink-0 items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className={isDark ? "text-white/35" : "text-[var(--color-text-soft)]"}>
                •
              </span>
            ) : null}
            {showEngineIcon ? <HomeIcon name="engine" isDark={isDark} gold className="h-3.5 w-3.5 shrink-0 object-contain" /> : null}
            <span className={index <= 1 ? (isDark ? "font-medium text-white" : "font-medium text-[var(--color-text)]") : ""}>{part}</span>
          </span>
        );
      })}
    </div>
  );
}

function HeroTitle({ title, isDark }) {
  const guideIndex = String(title || "").indexOf("UK Guide");

  if (guideIndex === -1) {
    return (
      <h1 className={`font-lora max-w-[720px] text-[2rem] font-medium leading-[1.08] md:text-[2.85rem] md:leading-[1.05] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {title}
      </h1>
    );
  }

  return (
    <h1 className={`font-lora max-w-[760px] text-[2rem] font-medium leading-[1.08] md:text-[2.85rem] md:leading-[1.05] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
      {title.slice(0, guideIndex)}
      <span style={{ color: GOLD }}>{title.slice(guideIndex)}</span>
    </h1>
  );
}

function TrustStat({ item, index, isDark }) {
  const label = item.label || "";
  const tag = item.tag;
  const iconKey = resolveIcon(item.icon, index);

  return (
    <li
      className={`flex items-center gap-3 border-r px-3 py-3.5 last:border-r-0 md:px-4 md:py-4 ${
        isDark ? "border-white/12" : "border-[var(--color-border)]"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14">
        <HomeIcon name={iconKey} isDark={isDark} gold className="h-10 w-10 object-contain md:h-14 md:w-14" />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[0.82rem] font-semibold leading-tight md:text-[0.9rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {label}
        </strong>
        {tag ? (
          <span className="mt-0.5 block text-[0.68rem] font-medium" style={{ color: GOLD }}>
            [{tag}]
          </span>
        ) : null}
      </span>
    </li>
  );
}

export default function ModelHero({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/model/Hero-bg-image.webp", alt: "" };
  const ctaLabel = (data.primaryCta?.label || "Explore Engines →").replace(/\s*→\s*$/, "");
  const ctaHref = data.primaryCta?.href || "#";
  const trustStrip = data.trustStrip || [];

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-[var(--color-text)] md:min-h-[620px] ${homeSectionBg(isDark, 1)}`}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={headerImage.src}
          alt={headerImage.alt || ""}
          fill
          className="object-cover object-[70%_center] md:object-center"
          sizes="100vw"
          priority
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(105deg,rgba(2,7,11,0.98)_0%,rgba(2,7,11,0.95)_42%,rgba(2,7,11,0.72)_58%,rgba(2,7,11,0.28)_78%,rgba(2,7,11,0.08)_100%)]"
              : "absolute inset-0 bg-[linear-gradient(105deg,#EFEEE9_0%,rgba(239,238,233,0.98)_42%,rgba(239,238,233,0.88)_56%,rgba(239,238,233,0.4)_74%,rgba(239,238,233,0.06)_100%)]"
          }
        />
        {/* Diagonal strip — black faded (homepage style), not gold */}
        <div
          className="absolute inset-y-0 left-[46%] hidden w-[3px] -skew-x-[18deg] md:block"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)] md:h-36"
              : "absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)] md:h-36"
          }
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-8xl flex-col px-4 pb-5 pt-6 md:min-h-[620px] md:px-6 md:pb-7 md:pt-10 lg:px-8">
        {/* Tag row — full content width, sits over image side */}
        <TagPill tagPill={data.tagPill} isDark={isDark} />

        <div className="mt-5 max-w-[640px] md:mt-6">
          <div className="flex flex-col gap-3 md:gap-3.5">
            <HeroTitle title={data.h1 || "Engines — The Complete UK Guide"} isDark={isDark} />
            <FadeStrip isDark={isDark} />
          </div>

          <p className={`mt-3 max-w-[600px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {renderWithPatternTag(data.subHeadline)}
          </p>

          {data.primaryCta ? (
            <Link
              href={ctaHref}
              className="btn-cta mt-4 inline-flex w-fit items-center justify-center gap-3 rounded-md bg-[#0a0a0a] px-5 py-3 text-[0.84rem] font-semibold tracking-[0.02em] no-underline hover:no-underline hover:opacity-95 md:mt-5 md:px-6 md:py-3.5 md:text-[0.9rem]"
              style={{ color: GOLD }}
            >
              <span>{ctaLabel}</span>
              <ArrowIcon />
            </Link>
          ) : null}
        </div>

        {trustStrip.length ? (
          <ul
            className={`mt-8 grid w-full grid-cols-2 overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] backdrop-blur-xl md:mt-auto md:max-w-[880px] md:grid-cols-4 md:rounded-2xl ${
              isDark
                ? "border-[rgba(171,132,80,0.35)] bg-[rgba(10,10,10,0.55)]"
                : "border-[var(--color-border)] bg-[rgba(255,255,255,0.85)]"
            }`}
          >
            {trustStrip.map((item, index) => (
              <TrustStat key={item.label} item={item} index={index} isDark={isDark} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
