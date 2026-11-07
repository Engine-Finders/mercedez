"use client";

import {
  typeH1,
  typeDesc,
  typeEyebrow,
} from "@/components/shared/typography";

import Image from "next/image";
import { useTheme } from "@/components/shared/themeProvider";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import HeroRegLookup from "@/components/shared/HeroRegLookup";

const trustStripIconKeys = [
  "real-inquiries",
  "vetted-specialist",
  "generation-honest-rated",
  "engine-finders",
];

function splitStat(label = "") {
  const [first, ...rest] = label.split(" ");
  const hasMetric = /[0-9+]/.test(first);

  return {
    value: hasMetric ? first : "",
    text: hasMetric ? rest.join(" ") : label,
  };
}

function TrustLabel({ label }) {
  if (label === "Every Generation, Honestly Rated") {
    return (
      <>
        <span className="block">Every Generation,</span>
        <span className="block">Honestly Rated</span>
      </>
    );
  }

  if (label === "Part of Engine Finders") {
    return (
      <>
        <span className="block">Part of</span>
        <span className="block">Engine Finders</span>
      </>
    );
  }

  if (label === "Vetted Mercedes-Benz Specialists") {
    return (
      <>
        <span className="block">Vetted Mercedes-Benz</span>
        <span className="block">Specialists</span>
      </>
    );
  }

  if (label === "Real Enquiries") {
    return <span className="block">Real Enquiries</span>;
  }

  return label;
}

const HERO_CAR_SRC =
  "/cars/amg gt-c190-gt-coupé-2014–2016-new-iridium silver metallic-original amg gt body-amg gt c190 gt (5)-45-angle-front-view.webp";

export default function HomeSec1({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgImageSrc = isDark ? "/Dark.webp" : "/Light.webp";
  const carImageSrc = data.image?.src || HERO_CAR_SRC;
  const trustStrip = data.trustStrip || [];
  const ctaLabel = data.cta?.label || "Get Instant Quote →";
  const eyebrow = data.eyebrow || "INDEPENDENT. DATA-DRIVEN. MERCEDES EXPERTISE.";

  return (
    <section className={`relative overflow-hidden text-[var(--color-text)] md:min-h-[560px] ${homeSectionBg(isDark, 1)}`}>
      {/* Theme background (Light / Dark) */}
      <div className="absolute inset-0">
        <Image
          src={bgImageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_36%,rgba(0,0,0,0.35)_62%,rgba(0,0,0,0.55)_100%)] md:bg-[linear-gradient(105deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_34%,rgba(0,0,0,0.22)_62%,transparent_82%)]"
              : "absolute inset-0 bg-[linear-gradient(105deg,rgba(239,238,233,0.94)_0%,rgba(239,238,233,0.82)_36%,rgba(239,238,233,0.28)_62%,rgba(239,238,233,0.7)_100%)] md:bg-[linear-gradient(105deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_34%,rgba(255,255,255,0.22)_62%,transparent_82%)]"
          }
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-8xl flex-col pl-[10px] pr-3 pb-0 pt-5 md:min-h-[560px] md:justify-center md:pl-[14px] md:pr-4 md:pb-1 md:pt-6">
        <div className="relative grid w-full items-center gap-0 md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] md:gap-4 lg:gap-5">
          <div className="relative flex w-full max-w-[720px] flex-col gap-2.5 md:gap-3">
            {/* Eyebrow */}
            <div className="flex flex-col gap-2 md:gap-2">
              <p
                className={`${typeEyebrow} ${
                  isDark ? "text-white/60" : "text-[var(--color-text-muted)]"
                }`}
              >
                {eyebrow}
              </p>
              <span
                className="block h-[2px] w-14"
                style={{
                  background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.22) 100%)`,
                }}
                aria-hidden="true"
              />
            </div>

            {/* H1 */}
            <div className="flex flex-col gap-3 md:gap-2.5">
              <h1
                className={`font-lora max-w-[680px] ${typeH1} ${
                  isDark ? "text-white" : "text-[var(--color-text)]"
                }`}
              >
                The UK&apos;s Most Trusted Mercedes-Benz Ownership Guide
              </h1>
              <span
                className="block h-[2px] w-14 md:w-16"
                style={{
                  background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.22) 100%)`,
                }}
                aria-hidden="true"
              />
            </div>

            <p
              className={`max-w-[620px] ${typeDesc} ${
                isDark ? "text-white/86" : "text-[var(--color-text-muted)]"
              }`}
              dangerouslySetInnerHTML={{ __html: data.subHeadline }}
            />

            <HeroRegLookup ctaLabel={ctaLabel} className="mt-1" />
          </div>

          {/* Car — pushed down to sit on BG floor */}
          <div className="relative mx-auto -mt-3 mb-0 flex w-full max-w-[520px] items-end justify-center md:mx-0 md:mt-0 md:max-w-none md:justify-end">
            <div className="relative h-[210px] w-full translate-y-14 md:h-auto md:aspect-[5/4] md:min-h-[320px] md:translate-y-20 lg:translate-y-24">
              <Image
                src={carImageSrc}
                alt={data.image?.alt || "Mercedes-AMG GT"}
                fill
                unoptimized
                className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                sizes="(max-width: 768px) 100vw, 46vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile trust badges — 2×2; black icons (light) / silver (dark) */}
        <ul
          className={`mt-3 mb-1 grid w-full grid-cols-2 overflow-hidden rounded-xl border md:hidden ${
            isDark
              ? "border-[rgba(162,118,68,0.45)] bg-[rgba(10,10,10,0.55)] text-white"
              : "border-[var(--color-border)] bg-[rgba(255,255,255,0.85)] text-[var(--color-text)]"
          }`}
        >
          {trustStrip.map((item, index) => {
            const stat = splitStat(item.label);
            const iconKey = item.icon || trustStripIconKeys[index] || "real-inquiries";
            return (
              <li
                key={item.label}
                className={`flex items-center gap-2 px-2.5 py-3 ${
                  index % 2 === 0 ? "border-r" : ""
                } ${index < 2 ? "border-b" : ""} ${
                  isDark ? "border-white/12" : "border-[var(--color-border)]"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    isDark ? "bg-white/5" : "bg-white/80"
                  }`}
                  style={{ borderColor: GOLD }}
                >
                  <HomeIcon
                    name={iconKey}
                    tone={isDark ? "silver" : "black"}
                    className="h-5 w-5 object-contain"
                  />
                </span>
                <span className="min-w-0">
                  {stat.value ? (
                    <strong className="font-lora block text-[14px] font-medium leading-none md:text-[15px]">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`block text-[11px] leading-[1.25] md:text-[12px] ${stat.value ? "mt-0.5" : ""} ${
                      isDark ? "text-white/75" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    <TrustLabel label={stat.text} />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* Desktop trust strip — black (light) / silver (dark) */}
        <ul
          className={`relative z-10 mt-0 mb-2 hidden w-full max-w-[920px] grid-cols-4 overflow-hidden rounded-2xl border shadow-[0_14px_32px_rgba(10,26,43,0.1)] backdrop-blur-xl md:grid ${
            isDark
              ? "border-[rgba(162,118,68,0.45)] bg-[rgba(10,10,10,0.55)] shadow-black/40"
              : "border-[var(--color-border)] bg-[rgba(255,255,255,0.72)] shadow-[var(--color-shadow)]"
          }`}
        >
          {trustStrip.map((item, index) => {
            const stat = splitStat(item.label);
            const iconKey = item.icon || trustStripIconKeys[index] || "real-inquiries";

            return (
              <li
                key={item.label}
                className={`flex flex-row items-center justify-start gap-2.5 border-r px-3 py-2.5 text-left last:border-r-0 ${
                  isDark ? "border-white/12" : "border-[var(--color-border)]"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <HomeIcon
                    name={iconKey}
                    tone={isDark ? "silver" : "black"}
                    className="h-10 w-10 object-contain"
                  />
                </span>
                <span className={`min-w-0 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {stat.value ? (
                    <strong className="block text-[15px] font-bold leading-none md:text-[16px]">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`mt-0.5 block text-[12px] leading-[1.3] md:text-[13px] ${
                      isDark ? "text-white/75" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    <TrustLabel label={stat.text} />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
