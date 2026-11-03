"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD } from "@/components/home/sectionBg";
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

/** Desktop diagonal: image starts ~52% at top, ~38% at bottom */
const IMAGE_CLIP = "polygon(52% 0%, 100% 0%, 100% 100%, 38% 100%)";
const LEFT_CLIP = "polygon(0 0, 52.15% 0, 38.15% 100%, 0 100%)";

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function FadeStrip({ isDark, className = "w-14" }) {
  return (
    <span
      className={`block h-[2px] ${className}`}
      style={{
        background: isDark
          ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
          : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)",
      }}
      aria-hidden="true"
    />
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
        isDark ? "bg-white/5 text-white/85" : "bg-white text-[var(--color-text-muted)]"
      }`}
      style={{ borderColor: GOLD }}
    >
      <HomeIcon name="car" tone="gold" className="h-4 w-4 shrink-0 object-contain" />
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
            {showEngineIcon ? <HomeIcon name="engine" tone="gold" className="h-3.5 w-3.5 shrink-0 object-contain" /> : null}
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
      className={`flex min-w-0 flex-col items-center gap-1.5 border-r px-1.5 py-3 text-center last:border-r-0 sm:flex-row sm:items-center sm:gap-2.5 sm:px-3 sm:py-3.5 sm:text-left md:gap-3 md:px-4 md:py-4 ${
        isDark ? "border-white/12" : "border-[var(--color-border)]"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 md:h-12 md:w-12 ${
          isDark ? "bg-white/10" : "bg-[#1a1a1a]"
        }`}
      >
        <HomeIcon
          name={iconKey}
          tone={isDark ? "silver" : "gold"}
          className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8"
        />
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
  const headerImage = data.headerImage || { src: "/model/Hero-bg-image.webp", alt: "" };
  const ctaLabel = (data.primaryCta?.label || "Explore Engines →").replace(/\s*→\s*$/, "");
  const ctaHref = data.primaryCta?.href || "#";
  const trustStrip = data.trustStrip || [];
  const panelBg = isDark ? "#070706" : "#EFEEE9";

  return (
    <section
      className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-[var(--color-text)] md:min-h-[620px] ${
        isDark ? "bg-[#070706]" : "bg-[#EFEEE9]"
      }`}
    >
      {/* Desktop: solid left panel (clip) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ backgroundColor: panelBg, clipPath: LEFT_CLIP }}
        aria-hidden="true"
      />

      {/* Desktop: right image (clip) */}
      <div className="absolute inset-0 z-0 hidden md:block" style={{ clipPath: IMAGE_CLIP }} aria-hidden="true">
        <Image
          src={headerImage.src}
          alt=""
          fill
          className="object-cover object-[70%_center]"
          sizes="100vw"
          priority
          unoptimized
        />
      </div>

      {/* Desktop: gold diagonal border between panels */}
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
            <FadeStrip isDark={isDark} />
          </div>

          <p className={`mt-3 max-w-[520px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {renderWithPatternTag(data.subHeadline)}
          </p>

          {data.primaryCta ? (
            <Link
              href={ctaHref}
              className={`mt-4 inline-flex w-fit items-center justify-center gap-3 rounded-md px-5 py-3 text-[0.84rem] font-semibold tracking-[0.02em] no-underline hover:no-underline hover:opacity-95 md:mt-5 md:px-6 md:py-3.5 md:text-[0.9rem] ${
                isDark
                  ? "border border-white/25 bg-[linear-gradient(180deg,#ececec_0%,#c8c8c8_100%)] text-[#0a0a0a]"
                  : "bg-[#0a0a0a]"
              }`}
              style={isDark ? undefined : { color: GOLD }}
            >
              <span>{ctaLabel}</span>
              <ArrowIcon />
            </Link>
          ) : null}
        </div>

        {/* Mobile: image below CTA */}
        <div className="relative left-1/2 mt-5 aspect-[16/10] w-screen -translate-x-1/2 overflow-hidden md:hidden">
          <Image
            src={headerImage.src}
            alt={headerImage.alt || ""}
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

        {trustStrip.length ? (
          <ul
            className={`mt-5 grid w-full grid-cols-4 overflow-hidden rounded-xl border shadow-[0_14px_32px_rgba(10,26,43,0.08)] md:mt-auto md:max-w-[980px] md:rounded-2xl ${
              isDark
                ? "border-[rgba(171,132,80,0.4)] bg-[rgba(10,10,10,0.92)]"
                : "border-[var(--color-border)] bg-white"
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
