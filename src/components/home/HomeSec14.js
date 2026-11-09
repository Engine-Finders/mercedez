"use client";

import {
  typeH2,
  typeH4,
  typeH6,
  typeDesc,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeButton,
  typeEyebrow,
} from "@/components/shared/typography";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

/** Diagonal gold border - shifted a bit right */
const IMAGE_CLIP = "polygon(58% 0%, 100% 0%, 100% 100%, 44% 100%)";
const LEFT_CLIP = "polygon(0 0, 58.15% 0, 44.15% 100%, 0 100%)";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function StatItem({ item, isDark }) {
  const value = item.value || item.label || "";
  const text = item.text || "";
  const icon = item.icon || "shield";

  return (
    <li className="flex min-w-0 flex-col items-start gap-2">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border md:h-12 md:w-12 ${
          isDark ? "border-white/20 bg-white/5" : "border-[#E5E5E5] bg-transparent"
        }`}
      >
        <HomeIcon name={icon} isDark={isDark} className="h-6 w-6 md:h-7 md:w-7" />
      </span>
      <div className="min-w-0">
        <p className={`font-lora text-[15px] font-medium leading-tight md:text-[16px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {value}
        </p>
        {text ? (
          <p className={`mt-0.5 text-[12px] font-light leading-snug md:text-[13px] ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
            {text}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function GuidanceBar({ data, isDark }) {
  const guidance = data.guidance || {};
  const secondaryCta = data.secondaryCta || {};
  const review = data.review;

  return (
    <div className="rounded-xl px-4 py-5 md:px-6 md:py-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_1fr_1.05fr] md:items-center md:gap-0">
        <div className="min-w-0 md:pr-6">
          <p className={`font-lora ${typeEyebrow}`} style={{ color: GOLD }}>
            {guidance.eyebrow || "GET YOUR FREE GUIDANCE"}
          </p>
          <h3 className={`mt-2 font-lora ${typeH4} text-white`}>
            {guidance.title || "Ask a Mercedes-Benz engine specialist"}
          </h3>
          <span className="mt-3 block h-[2px] w-12" style={{ backgroundColor: GOLD }} aria-hidden="true" />
        </div>

        <div className={`md:border-x md:px-6 ${isDark ? "md:border-white/15" : "md:border-white/15"}`}>
          <Link
            href={secondaryCta.href || guidance.href || "/quote"}
            className="flex min-h-14 items-center gap-3 rounded-md border px-3.5 py-3 no-underline hover:no-underline hover:opacity-95"
            style={{ borderColor: GOLD }}
          >
            <span style={{ color: GOLD }}>
              <PhoneIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block ${typeButton} font-semibold uppercase tracking-wide text-white`}>
                {secondaryCta.label || "CALL A SPECIALIST"}
              </span>
              <span className={`mt-0.5 block ${typeSmall} text-white/70`}>{secondaryCta.subLabel}</span>
            </span>
            <span style={{ color: GOLD }}>
              <ArrowIcon />
            </span>
          </Link>
        </div>

        {review ? (
          <div className="flex min-w-0 flex-col gap-2 md:pl-6">
            <span className={`inline-flex items-center gap-1.5 ${typeHighlight} font-semibold text-white`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#00b67a]" fill="currentColor">
                <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9L12 2.8Z" />
              </svg>
              {review.brand}
            </span>
            <span className="flex gap-1">
              {Array.from({ length: review.stars || 5 }).map((_, index) => (
                <span key={index} className="text-[18px] leading-none" style={{ color: GOLD }}>
                  ★
                </span>
              ))}
            </span>
            <span className={`${typeSmall} text-white/75`}>{review.score}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function HomeSec14({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const stats = data.stats || [];
  const image = data.image || { src: "/model images/C-class.webp", alt: "Mercedes-Benz C-Class" };
  const panelBg = sectionPanelBg(isDark, 14);

  return (
    <section className={`relative overflow-hidden pb-7 pt-0 md:pb-8 ${homeSectionBg(isDark, 14)}`}>
      {/* Desktop: model-hero style diagonal gold split */}
      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 overflow-hidden md:block md:min-h-[420px] lg:min-h-[460px]">
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ backgroundColor: panelBg, clipPath: LEFT_CLIP }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-0" style={{ clipPath: IMAGE_CLIP }} aria-hidden="true">
          <Image
            src={image.src}
            alt=""
            fill
            unoptimized
            className="object-cover object-[70%_center]"
            sizes="100vw"
          />
        </div>

        <svg
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="58.1"
            y1="0"
            x2="44.1"
            y2="100"
            stroke={GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-8xl px-3 py-10 md:px-4 md:py-12 lg:py-14">
          <div className="max-w-[520px] lg:max-w-[560px]">
            <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Get the Right Answer. Not Just Any Answer.
            </h2>
            <SectionLabel isDark={isDark} />
            <p className={`mt-3 max-w-[480px] ${typeDesc} ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
              {data.subHeadline}
            </p>

            {stats.length ? (
              <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4 lg:gap-x-4">
                {stats.map((item, index) => (
                  <StatItem key={`desk-${item.icon}-${index}`} item={item} isDark={isDark} />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile: heading + image + stats */}
      <div className="mx-auto w-full max-w-8xl px-3 pt-5 md:hidden">
        <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          Get the Right Answer. <span style={{ color: GOLD }}>Not Just Any Answer.</span>
        </h2>
        <SectionLabel isDark={isDark} />
        <p className={`mt-2 ${typeDesc} ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
          {data.subHeadline}
        </p>

        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt || ""}
            fill
            unoptimized
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {stats.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
            {stats.map((item, index) => (
              <StatItem key={`mob-${item.icon}-${index}`} item={item} isDark={isDark} />
            ))}
          </ul>
        ) : null}
      </div>

      {/* Shared dark CTA bar */}
      <div className="relative mx-auto mt-5 w-full max-w-8xl px-3 md:mt-6 md:px-4">
        <GuidanceBar data={data} isDark={isDark} />
      </div>
    </section>
  );
}
