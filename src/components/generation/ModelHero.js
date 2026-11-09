"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import HeroRegLookup from "@/components/shared/HeroRegLookup";
import { generationCtaCopy } from "@/lib/ctaLabels";
import { variantModelImage } from "@/components/variant/variantTheme";

const TRUST_ICON_FALLBACKS = ["chart", "wrench", "book", "engine-finders"];

const EMOJI_ICON_MAP = {
  "📊": "chart",
  "🔧": "wrench",
  "📖": "book",
  "🏆": "engine-finders",
  "📘": "book",
  "🛠️": "wrench",
};

/** Desktop diagonal: image starts ~52% at top, ~38% at bottom */
const IMAGE_CLIP = "polygon(52% 0%, 100% 0%, 100% 100%, 38% 100%)";
const LEFT_CLIP = "polygon(0 0, 52.15% 0, 38.15% 100%, 0 100%)";

function resolveIcon(icon, index = 0) {
  if (!icon) return TRUST_ICON_FALLBACKS[index] || "chart";
  if (EMOJI_ICON_MAP[icon]) return EMOJI_ICON_MAP[icon];
  return icon;
}

function HeroTitle({ title, isDark }) {
  const guideIndex = String(title || "").indexOf("UK Guide");
  const textClass = isDark ? "text-white" : "text-[var(--color-text)]";

  if (guideIndex === -1) {
    return (
      <h1
        className={`font-lora max-w-[760px] text-[2rem] font-medium leading-[1.08] md:text-[2.85rem] md:leading-[1.05] ${textClass}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    );
  }

  return (
    <h1 className={`font-lora max-w-[760px] text-[2rem] font-medium leading-[1.08] md:text-[2.85rem] md:leading-[1.05] ${textClass}`}>
      <span dangerouslySetInnerHTML={{ __html: title.slice(0, guideIndex) }} />
      <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.slice(guideIndex) }} />
    </h1>
  );
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
      <HomeIcon name="car" isDark={isDark} className="h-4 w-4 shrink-0 object-contain" />
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="inline-flex shrink-0 items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className={isDark ? "text-white/35" : "text-[var(--color-text-soft)]"}>
              •
            </span>
          ) : null}
          <span
            className={index === 0 ? (isDark ? "font-medium text-white" : "font-medium text-[var(--color-text)]") : ""}
            dangerouslySetInnerHTML={{ __html: part }}
          />
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
        <HomeIcon name={iconKey} isDark={isDark} className="h-11 w-11 object-contain md:h-14 md:w-14" />
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

export default function ModelHero({ data, parent = "", slug = "" }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const heroSrc = variantModelImage(parent, data.tagPill);
  const ctaLabel = generationCtaCopy(parent, slug).hero;
  const trustStrip = data.trustStrip || [];
  const panelBg = isDark ? "#070706" : "#EFEEE9";

  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-[var(--color-text)] md:min-h-[620px] ${
        isDark ? "bg-[#070706]" : "bg-[#EFEEE9]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ backgroundColor: panelBg, clipPath: LEFT_CLIP }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-0 hidden md:block" style={{ clipPath: IMAGE_CLIP }} aria-hidden="true">
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover object-[70%_center]"
          sizes="100vw"
          priority
          unoptimized
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="52.1"
          y1="0"
          x2="38.1"
          y2="100"
          stroke={GOLD}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-col px-4 pb-5 pt-6 md:min-h-[620px] md:px-6 md:pb-7 md:pt-10 lg:px-8">
        <TagPill tagPill={data.tagPill} isDark={isDark} />

        <div className="mt-5 max-w-[560px] md:mt-6 md:max-w-[520px] lg:max-w-[560px]">
          <div className="flex flex-col gap-3 md:gap-3.5">
            <HeroTitle title={data.h1 || "Engines - The Complete UK Guide"} isDark={isDark} />
            <SectionFadeStrip isDark={isDark} />
          </div>

          <p
            className={`mt-3 max-w-[520px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}
            dangerouslySetInnerHTML={{ __html: data.subHeadline }}
          />
        </div>

        <div className="relative z-20 mt-4 hidden w-full md:mt-5 md:block md:max-w-[980px]">
          <HeroRegLookup
            ctaLabel={ctaLabel}
            className="!max-w-none w-full sm:justify-start sm:gap-3"
            plateClassName="w-full sm:w-[340px] sm:max-w-[340px] sm:shrink-0 sm:flex-none"
            buttonClassName="!bg-[#0a0a0a] hover:!bg-[#1a1a1a]"
          />
        </div>

        <div className="relative left-1/2 mt-5 aspect-[16/10] w-screen -translate-x-1/2 overflow-hidden md:hidden">
          <Image
            src={heroSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            unoptimized
          />
          <div
            className={
              isDark
                ? "pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(7,7,6,0.9)_0%,transparent_100%)]"
                : "pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(239,238,233,0.92)_0%,transparent_100%)]"
            }
            aria-hidden="true"
          />
          <div
            className={
              isDark
                ? "pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,rgba(7,7,6,0.92)_0%,transparent_100%)]"
                : "pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,rgba(239,238,233,0.95)_0%,transparent_100%)]"
            }
            aria-hidden="true"
          />
        </div>

        <div className="relative z-20 mt-4 w-full md:hidden">
          <HeroRegLookup
            ctaLabel={ctaLabel}
            className="!max-w-none w-full"
            plateClassName="w-full"
            buttonClassName="!bg-[#0a0a0a] hover:!bg-[#1a1a1a]"
          />
        </div>

        {trustStrip.length ? (
          <div className="mt-5 w-full md:mt-auto md:max-w-[980px] md:pt-1.5">
            <ul
              className={`grid w-full grid-cols-4 overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] md:rounded-2xl ${
                isDark
                  ? "border-[rgba(171,132,80,0.4)] bg-[rgba(10,10,10,0.92)]"
                  : "border-[var(--color-border)] bg-white"
              }`}
            >
              {trustStrip.map((item, index) => (
                <TrustStat key={item.label} item={item} index={index} isDark={isDark} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
