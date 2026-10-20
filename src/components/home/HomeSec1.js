"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/shared/themeProvider";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";

const CTA_COLOR = GOLD;

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

export default function HomeSec1({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const heroImageSrc = isDark ? "/Hero-dark.webp" : "/hero-day.webp";
  const trustStrip = data.trustStrip || [];
  const ctaHref = data.cta?.href || "/quote";
  const ctaLabel = (data.cta?.label || "START YOUR RESEARCH →").replace(/\s*→\s*$/, "");
  const eyebrow = data.eyebrow || "INDEPENDENT. DATA-DRIVEN. MERCEDES EXPERTISE.";

  return (
    <section className={`relative overflow-hidden text-[var(--color-text)] md:min-h-[640px] ${homeSectionBg(isDark, 1)}`}>
      {/* Mobile background */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={heroImageSrc}
          alt={data.image?.alt || "Mercedes-Benz"}
          fill
          className="object-cover object-[62%_center]"
          sizes="100vw"
          priority
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_28%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.9)_100%)]"
              : "absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_28%,rgba(255,255,255,0.15)_52%,rgba(255,255,255,0.92)_78%,#EFEEE9_100%)]"
          }
        />
      </div>

      {/* Desktop background */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={heroImageSrc}
          alt={data.image?.alt || "Mercedes-Benz"}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_34%,rgba(0,0,0,0.28)_62%,transparent_78%)]"
              : "absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_34%,rgba(255,255,255,0.28)_62%,transparent_78%)]"
          }
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-8xl flex-col px-4 pb-6 pt-7 md:min-h-[640px] md:justify-center md:px-6 md:py-10 lg:px-8">
        <div className="relative flex w-full max-w-[720px] flex-col gap-3.5 md:gap-4">
          {/* Eyebrow */}
          <div className="flex flex-col gap-2.5">
            <p
              className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] md:text-[0.72rem] md:tracking-[0.16em] ${
                isDark ? "text-white/60" : "text-[var(--color-text-muted)]"
              }`}
            >
              {eyebrow}
            </p>
            {/* Mobile: gold line · Desktop: black/white gradient line */}
            <span className="block h-[2px] w-14 md:hidden" style={{ backgroundColor: GOLD }} aria-hidden="true" />
            <span
              className="hidden h-[2px] w-14 md:block"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
                  : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* H1 */}
          <div className="flex flex-col gap-3 md:gap-3.5">
            <h1
              className={`font-lora max-w-[680px] text-[28px] font-medium leading-[1.08] tracking-normal md:text-[48px] md:leading-[1.05] ${
                isDark ? "text-white" : "text-[var(--color-text)]"
              }`}
            >
              The UK&apos;s Most Trusted Mercedes-Benz Ownership Guide
            </h1>
            {/* Mobile: gold strip · Desktop: black/white gradient */}
            <span className="block h-[2px] w-14 md:hidden" style={{ backgroundColor: GOLD }} aria-hidden="true" />
            <span
              className="hidden h-[2px] w-14 md:block"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.22) 100%)"
                  : "linear-gradient(90deg, #000000 0%, #000000 50%, rgba(0,0,0,0.18) 100%)",
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

          {/* Mobile CTA — black, below description (ref) */}
          <Link
            href={ctaHref}
            className="btn-cta mt-1 inline-flex w-fit items-center justify-center gap-3 rounded-md bg-[#0a0a0a] px-5 py-3 text-[0.84rem] font-bold tracking-[0.04em] text-white md:hidden"
            style={isDark ? { backgroundColor: CTA_COLOR } : undefined}
          >
            <span>{ctaLabel}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>

          {/* Desktop CTA — gold, unchanged */}
          <Link
            href={ctaHref}
            className="btn-cta mt-1 hidden w-fit items-center justify-center gap-3 rounded-md px-7 py-3.5 text-[0.9rem] font-bold tracking-[0.04em] text-white md:inline-flex"
            style={{ backgroundColor: CTA_COLOR }}
          >
            <span>{ctaLabel}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>

          {/* Mobile spacer so car stays visible above badges */}
          <div className="relative h-[200px] md:hidden" aria-hidden="true" />
        </div>

        {/* Mobile trust badges — stacked list (ref): metric row + label row */}
        <ul className={`mt-1 w-full md:hidden ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {trustStrip.map((item, index) => {
            const stat = splitStat(item.label);
            const iconKey = item.icon || trustStripIconKeys[index] || "real-inquiries";
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3.5 border-b py-3.5 first:border-t first:pt-3.5 last:border-b-0 ${
                  isDark ? "border-white/15" : "border-[rgba(0,0,0,0.1)]"
                }`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border ${
                    isDark ? "border-white/20 bg-white/5" : "border-[#EDE6D8] bg-white/80"
                  }`}
                >
                  <HomeIcon name={iconKey} isDark={isDark} gold className="h-9 w-9 object-contain" />
                </span>
                <span className="min-w-0">
                  {stat.value ? (
                    <strong className="font-lora block text-[1.05rem] font-medium leading-none">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`block text-[0.82rem] leading-[1.3] ${stat.value ? "mt-1" : ""} ${
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

        {/* Desktop trust strip — unchanged 4-col card */}
        <ul
          className={`mt-5 hidden w-full max-w-[880px] grid-cols-4 overflow-hidden rounded-2xl border shadow-[0_14px_32px_rgba(10,26,43,0.1)] backdrop-blur-xl md:grid ${
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
                className={`flex flex-row items-center justify-start gap-3 border-r px-4 py-4 text-left last:border-r-0 ${
                  isDark ? "border-white/12" : "border-[var(--color-border)]"
                }`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center">
                  <HomeIcon name={iconKey} isDark={isDark} gold className="h-14 w-14 object-contain" />
                </span>
                <span className={`min-w-0 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {stat.value ? (
                    <strong className="block text-[1.05rem] font-bold leading-none">{stat.value}</strong>
                  ) : null}
                  <span
                    className={`mt-0.5 block text-[0.78rem] leading-[1.3] ${
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
