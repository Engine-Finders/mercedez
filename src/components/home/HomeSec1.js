"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/themeProvider";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";

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

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

const HERO_CAR_SRC =
  "/cars/amg gt-c190-gt-coupé-2014–2016-new-iridium silver metallic-original amg gt body-amg gt c190 gt (5)-45-angle-front-view.webp";

export default function HomeSec1({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgImageSrc = isDark ? "/Dark.webp" : "/Light.webp";
  const carImageSrc = data.image?.src || HERO_CAR_SRC;
  const trustStrip = data.trustStrip || [];
  const ctaHref = data.cta?.href || "/quote";
  const ctaLabel = (data.cta?.label || "START YOUR RESEARCH →").replace(/\s*→\s*$/, "");
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

      <div className="relative mx-auto flex w-full max-w-8xl flex-col px-4 pb-0 pt-5 md:min-h-[560px] md:justify-center md:px-6 md:pb-1 md:pt-6 lg:px-8">
        <div className="relative grid w-full items-center gap-0 md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] md:gap-4 lg:gap-5">
          <div className="relative flex w-full max-w-[720px] flex-col gap-2.5 md:gap-3">
            {/* Eyebrow */}
            <div className="flex flex-col gap-2 md:gap-2">
              <p
                className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] md:text-[0.72rem] md:tracking-[0.16em] ${
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
                className={`font-lora max-w-[680px] text-[28px] font-medium leading-[1.08] tracking-normal md:text-[48px] md:leading-[1.05] ${
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
              className={`max-w-[620px] text-[0.88rem] leading-[1.45] md:text-[1.05rem] md:leading-[1.5] ${
                isDark ? "text-white/86" : "text-[var(--color-text-muted)]"
              }`}
              dangerouslySetInnerHTML={{ __html: data.subHeadline }}
            />

            {/* Light: black fill + white text · Dark: white border + white text */}
            <Link
              href={ctaHref}
              className={`btn-cta mt-1 inline-flex w-fit items-center justify-center gap-3 rounded-md px-5 py-3 text-[0.84rem] font-bold tracking-[0.04em] md:px-7 md:py-3.5 md:text-[0.9rem] ${
                isDark
                  ? "border border-white bg-transparent text-white"
                  : "border border-transparent bg-[#0a0a0a] text-white"
              }`}
            >
              <span>{ctaLabel}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
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

        {/* Mobile trust badges — gold circle border, black icons */}
        <ul className={`mt-1 w-full md:hidden ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {trustStrip.map((item, index) => {
            const stat = splitStat(item.label);
            const iconKey = item.icon || trustStripIconKeys[index] || "real-inquiries";
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 border-b py-3 first:border-t first:pt-3 last:border-b-0 ${
                  isDark ? "border-white/15" : "border-[rgba(0,0,0,0.1)]"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                    isDark ? "bg-white/5" : "bg-white/80"
                  }`}
                  style={{ borderColor: GOLD }}
                >
                  <HomeIcon name={iconKey} tone="black" className="h-6 w-6 object-contain" />
                </span>
                <span className="min-w-0">
                  {stat.value ? (
                    <strong className="font-lora block text-[0.95rem] font-medium leading-none">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`block text-[0.78rem] leading-[1.3] ${stat.value ? "mt-1" : ""} ${
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

        {/* Desktop trust strip — smaller badges; black (light) / silver (dark) */}
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
                  <HomeIcon name={iconKey} isDark={isDark} className="h-10 w-10 object-contain" />
                </span>
                <span className={`min-w-0 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {stat.value ? (
                    <strong className="block text-[0.95rem] font-bold leading-none">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`mt-0.5 block text-[0.72rem] leading-[1.3] ${
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
