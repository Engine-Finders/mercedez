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

export default function HomeSec14({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const stats = data.stats || [];
  const review = data.review || null;
  const image = data.image || { src: "/right.webp", alt: "" };
  const primaryCta = data.primaryCta || {};
  const secondaryCta = data.secondaryCta || {};

  return (
    <section className={`px-3 pb-7 pt-2 md:px-4 md:pb-8 ${homeSectionBg(isDark, 14)}`}>
      <div
        className={`relative mx-auto w-full max-w-8xl overflow-hidden rounded-xl border shadow-[0_6px_24px_rgba(10,26,43,0.05)] ${
          isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
        }`}
      >
        <div className="absolute inset-y-0 right-0 hidden w-[40%] md:block">
          <Image src={image.src} alt="" fill className="object-cover object-center" sizes="40vw" />
          <div
            className={
              isDark
                ? "absolute inset-0 bg-[linear-gradient(90deg,var(--color-surface-raised)_0%,rgba(10,10,10,0.35)_22%,rgba(10,10,10,0.08)_55%,transparent_100%)]"
                : "absolute inset-0 bg-[linear-gradient(90deg,white_0%,rgba(255,255,255,0.35)_22%,rgba(255,255,255,0.08)_55%,transparent_100%)]"
            }
          />
        </div>

        <div className="relative px-4 py-5 md:max-w-[58%] md:px-8 md:py-7">
          <SectionLabel number={14} isDark={isDark} />
          <h2 className={`font-lora text-[1.85rem] font-medium leading-[1.1] md:text-[2.35rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Get the Right Answer. Not Just Any Answer.
          </h2>
          <p className={`mt-2 text-[0.9rem] leading-snug md:text-[1.05rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>

          {stats.length ? (
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-5">
              {stats.map((stat) => (
                <li key={stat} className={`flex items-center gap-2 text-[0.8rem] md:text-[0.85rem] ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <span>{stat}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:flex-wrap md:items-center">
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
              <div className={`flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 md:ml-1 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
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
