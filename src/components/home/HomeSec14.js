"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

function StarBox({ faded = false }) {
  return (
    <span className={`flex h-5 w-5 items-center justify-center text-white md:h-6 md:w-6 ${faded ? "bg-[#9ed9c0]" : "bg-[#00b67a]"}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9L12 2.8Z" />
      </svg>
    </span>
  );
}

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
  const label = typeof item === "string" ? item : item.label;
  const icon = typeof item === "string" ? "check" : item.icon || "shield";

  return (
    <li className={`flex items-center gap-2.5 ${isDark ? "text-white/85" : "text-[var(--color-text)]"}`}>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border md:h-9 md:w-9 ${
          isDark ? "border-white/20 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
        }`}
      >
        <HomeIcon name={icon} isDark={isDark} gold className="h-5 w-5" />
      </span>
      <span className="hidden h-8 w-px shrink-0 md:block" style={{ backgroundColor: GOLD }} />
      <span className="min-w-0 text-[0.78rem] leading-snug md:text-[0.85rem]">{label}</span>
    </li>
  );
}

export default function HomeSec14({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const stats = data.stats || [];
  const review = data.review || null;
  const image = data.image || { src: "/right.webp", alt: "" };
  const primaryCta = data.primaryCta || {};
  const secondaryCta = data.secondaryCta || {};
  const guidance = data.guidance || {
    eyebrow: primaryCta.label,
    title: primaryCta.subLabel,
    href: primaryCta.href,
  };

  return (
    <section className={`px-3 pb-7 pt-2 md:px-4 md:pb-8 ${homeSectionBg(isDark, 14)}`}>
      {/* Mobile layout — matches ref */}
      <div className="mx-auto w-full max-w-8xl md:hidden">
        <SectionLabel number={14} isDark={isDark} />
        <h2 className={`font-lora text-[1.85rem] font-medium leading-[1.1] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          Get the Right Answer. <span style={{ color: GOLD }}>Not Just Any Answer.</span>
        </h2>
        <p className={`mt-2 text-[0.88rem] leading-snug ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
          {data.subHeadline}
        </p>

        {stats.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
            {stats.map((item) => (
              <StatItem key={typeof item === "string" ? item : item.label} item={item} isDark={isDark} />
            ))}
          </ul>
        ) : null}

        <div className="mt-5 rounded-xl border px-4 py-5" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(171,132,80,0.35)" }}>
          <p className="font-lora text-[0.72rem] font-medium uppercase tracking-[0.1em]" style={{ color: GOLD }}>
            {guidance.eyebrow || "GET YOUR FREE GUIDANCE"}
          </p>
          <h3 className="mt-2 font-lora text-[1.45rem] font-medium leading-[1.15] text-white">
            {guidance.title || "Ask a Mercedes-Benz engine specialist"}
          </h3>

          <Link
            href={secondaryCta.href || guidance.href || "/quote"}
            className="mt-4 flex min-h-14 items-center gap-3 rounded-md border px-3.5 py-3 no-underline hover:no-underline"
            style={{ borderColor: GOLD }}
          >
            <span style={{ color: GOLD }}>
              <PhoneIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.82rem] font-semibold uppercase tracking-wide text-white">{secondaryCta.label}</span>
              <span className="mt-0.5 block text-[0.7rem] text-white/70">{secondaryCta.subLabel}</span>
            </span>
            <span style={{ color: GOLD }}>
              <ArrowIcon />
            </span>
          </Link>

          {review ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-white">
              <span className="inline-flex items-center gap-1 text-[0.88rem] font-semibold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#00b67a]" fill="currentColor">
                  <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.6-4.5 6.4-.9L12 2.8Z" />
                </svg>
                {review.brand}
              </span>
              <span className="flex gap-0.5">
                {Array.from({ length: review.stars || 5 }).map((_, index) => (
                  <span key={index} className="text-[0.85rem]" style={{ color: GOLD }}>
                    ★
                  </span>
                ))}
              </span>
              <span className="text-[0.75rem] text-white/75">{review.score}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Desktop layout — unchanged structure */}
      <div
        className={`relative mx-auto hidden w-full max-w-8xl overflow-hidden rounded-xl border shadow-[0_6px_24px_rgba(10,26,43,0.05)] md:block ${
          isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
        }`}
      >
        <div className="absolute inset-y-0 right-0 w-[40%]">
          <Image src={image.src} alt="" fill className="object-cover object-center" sizes="40vw" />
          <div
            className={
              isDark
                ? "absolute inset-0 bg-[linear-gradient(90deg,var(--color-surface-raised)_0%,rgba(10,10,10,0.35)_22%,rgba(10,10,10,0.08)_55%,transparent_100%)]"
                : "absolute inset-0 bg-[linear-gradient(90deg,white_0%,rgba(255,255,255,0.35)_22%,rgba(255,255,255,0.08)_55%,transparent_100%)]"
            }
          />
        </div>

        <div className="relative max-w-[58%] px-8 py-7">
          <SectionLabel number={14} isDark={isDark} />
          <h2 className={`font-lora text-[2.35rem] font-medium leading-[1.1] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Get the Right Answer. Not Just Any Answer.
          </h2>
          <p className={`mt-2 text-[1.05rem] leading-snug ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>

          {stats.length ? (
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <StatItem key={typeof item === "string" ? item : item.label} item={item} isDark={isDark} />
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={primaryCta.href || "/quote"}
              className="inline-flex min-h-14 items-center gap-3 rounded-lg px-5 py-3 no-underline hover:no-underline hover:opacity-95"
              style={{ backgroundColor: GOLD, color: "#fff" }}
            >
              <HomeIcon name="quote" isDark gold className="h-7 w-7" />
              <span className="min-w-0">
                <span className="block text-[0.82rem] font-semibold leading-tight uppercase tracking-wide">{primaryCta.label}</span>
                <span className="mt-0.5 block text-[0.72rem] leading-tight text-white/85">{primaryCta.subLabel}</span>
              </span>
            </Link>

            <Link
              href={secondaryCta.href || "#"}
              className={`inline-flex min-h-14 items-center gap-3 rounded-lg border px-5 py-3 no-underline hover:no-underline ${
                isDark ? "border-white/20 bg-white/5 text-white" : "border-[#E5E5E5] bg-white text-[var(--color-text)]"
              }`}
            >
              <HomeIcon name="users" isDark={isDark} gold className="h-6 w-6" />
              <span className="min-w-0">
                <span className="block text-[0.82rem] font-semibold leading-tight uppercase tracking-wide">{secondaryCta.label}</span>
                <span className={`mt-0.5 block text-[0.72rem] leading-tight ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                  {secondaryCta.subLabel}
                </span>
              </span>
            </Link>

            {review ? (
              <div className={`flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                <span className="text-[0.88rem] font-semibold">{review.brand}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: review.stars || 5 }).map((_, index) => (
                    <StarBox key={index} faded={index === (review.stars || 5) - 1} />
                  ))}
                </span>
                <span className={`text-[0.78rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{review.score}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
