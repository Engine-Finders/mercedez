"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
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

function resolveIcon(icon, index = 0) {
  if (!icon) return TRUST_ICON_FALLBACKS[index] || "chart";
  if (EMOJI_ICON_MAP[icon]) return EMOJI_ICON_MAP[icon];
  return icon;
}

function TagPill({ tagPill, isDark }) {
  const parts = String(tagPill || "")
    .split(" • ")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      className={`inline-flex w-fit max-w-full flex-nowrap items-center gap-x-2 self-start overflow-x-auto rounded-md border px-3 py-2 text-[0.72rem] leading-[1.35] whitespace-nowrap md:px-3.5 md:py-2.5 md:text-[0.8rem] ${
        isDark ? "border-white/20 bg-white/5 text-white/85" : "border-[#E5E5E5] bg-white/80 text-[var(--color-text-muted)]"
      }`}
    >
      <HomeIcon name="car" isDark={isDark} gold className="h-4 w-4 shrink-0 object-contain" />
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="inline-flex shrink-0 items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className={isDark ? "text-white/35" : "text-[var(--color-text-soft)]"}>
              •
            </span>
          ) : null}
          <span className={index === 0 ? (isDark ? "font-medium text-white" : "font-medium text-[var(--color-text)]") : ""} dangerouslySetInnerHTML={{ __html: part }} />
        </span>
      ))}
    </div>
  );
}

function TrustStat({ item, index, isDark }) {
  const label = (item.label || "").replace(/\s*\[[^\]]+\]\s*$/, "").trim();
  const tagMatch = String(item.label || "").match(/\[([^\]]+)\]\s*$/);
  const tag = item.tag || tagMatch?.[1] || "";
  const iconKey = resolveIcon(item.icon, index);

  return (
    <li
      className={`flex min-w-0 flex-col items-center gap-1.5 border-r px-1.5 py-3 text-center last:border-r-0 sm:flex-row sm:items-center sm:gap-2.5 sm:px-3 sm:py-3.5 sm:text-left md:gap-3 md:px-4 md:py-4 ${
        isDark ? "border-white/12" : "border-[var(--color-border)]"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14">
        <HomeIcon name={iconKey} isDark={isDark} gold className="h-11 w-11 object-contain md:h-14 md:w-14" />
      </span>
      <span className="min-w-0">
        <strong className={`block text-[0.62rem] font-semibold leading-tight sm:text-[0.82rem] md:text-[0.9rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {label}
        </strong>
        {tag ? (
          <span className="mt-0.5 block text-[0.55rem] font-medium sm:text-[0.68rem]" style={{ color: GOLD }}>
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
  const headerImage = data.headerImage || data.image || { src: "/model/Hero-bg-image.webp", alt: "" };
  const imageSrc = headerImage.src || headerImage.light || headerImage.dark || "/model/Hero-bg-image.webp";
  const ctaLabel = (data.primaryCta?.label || "Explore Engines →").replace(/\s*→\s*$/, "");
  const ctaHref = data.primaryCta?.href || "/quote";
  const trustStrip = data.trustStrip || [];

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-[var(--color-text)] ${homeSectionBg(isDark, 1)}`}>
      {/* Desktop background image only */}
      <div className="absolute inset-0 hidden md:block">
        <Image src={imageSrc} alt={headerImage.alt || ""} fill className="object-cover object-center" sizes="100vw" priority />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(105deg,rgba(2,7,11,0.98)_0%,rgba(2,7,11,0.95)_42%,rgba(2,7,11,0.72)_58%,rgba(2,7,11,0.28)_78%,rgba(2,7,11,0.08)_100%)]"
              : "absolute inset-0 bg-[linear-gradient(105deg,#EFEEE9_0%,rgba(239,238,233,0.98)_42%,rgba(239,238,233,0.88)_56%,rgba(239,238,233,0.4)_74%,rgba(239,238,233,0.06)_100%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)] md:h-20"
              : "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)] md:h-20"
          }
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-8xl flex-col px-4 pb-5 pt-6 md:px-6 md:pb-6 md:pt-8 lg:px-8">
        <TagPill tagPill={data.tagPill} isDark={isDark} />

        <div className="mt-4 max-w-[640px] md:mt-5">
          {/* H1 with strip above and below */}
          <div className="flex flex-col gap-3 md:gap-3.5">
            <SectionFadeStrip isDark={isDark} />
            <h1
              className={`font-lora max-w-[760px] text-[2rem] font-medium leading-[1.08] md:text-[2.85rem] md:leading-[1.05] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}
              dangerouslySetInnerHTML={{ __html: data.h1 }}
            />
            <SectionFadeStrip isDark={isDark} />
          </div>

          <p
            className={`mt-3 max-w-[600px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}
            dangerouslySetInnerHTML={{ __html: data.subHeadline }}
          />

          {/* Desktop CTA */}
          {data.primaryCta ? (
            <Link
              href={ctaHref}
              className="btn-cta mt-3 hidden w-fit items-center justify-center gap-3 rounded-md bg-[#0a0a0a] px-5 py-3 text-[0.84rem] font-semibold tracking-[0.02em] no-underline hover:no-underline hover:opacity-95 md:mt-4 md:inline-flex md:px-6 md:py-3.5 md:text-[0.9rem]"
              style={{ color: GOLD }}
            >
              <span dangerouslySetInnerHTML={{ __html: ctaLabel }} />
              <ArrowIcon />
            </Link>
          ) : null}
        </div>

        {/* Mobile: image with top/bottom fade, then CTA below */}
        <div className="relative left-1/2 mt-5 aspect-[16/10] w-screen -translate-x-1/2 overflow-hidden md:hidden">
          <Image src={imageSrc} alt={headerImage.alt || ""} fill className="object-cover object-center" sizes="100vw" priority />
          <div
            className={
              isDark
                ? "absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,var(--color-page)_0%,transparent_100%)]"
                : "absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,#EFEEE9_0%,transparent_100%)]"
            }
            aria-hidden="true"
          />
          <div
            className={
              isDark
                ? "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
                : "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)]"
            }
            aria-hidden="true"
          />
        </div>

        {/* Mobile CTA below image */}
        {data.primaryCta ? (
          <Link
            href={ctaHref}
            className="btn-cta mt-4 inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#0a0a0a] px-5 py-3 text-[0.84rem] font-semibold tracking-[0.02em] no-underline hover:no-underline hover:opacity-95 md:hidden"
            style={{ color: GOLD }}
          >
            <span dangerouslySetInnerHTML={{ __html: ctaLabel }} />
            <ArrowIcon />
          </Link>
        ) : null}

        {trustStrip.length ? (
          <ul
            className={`mt-3 grid w-full grid-cols-4 overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] backdrop-blur-xl md:mt-4 md:max-w-[880px] md:rounded-2xl ${
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
