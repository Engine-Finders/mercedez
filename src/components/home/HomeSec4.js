"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

const VERDICT_TONE = {
  best: { color: GOLD },
  safe: { color: "#2f9e5b" },
  avoid: { color: "#d62828" },
  watch: { color: "#d97517" },
};

function VerdictBadge({ verdict, isDark }) {
  const tone = VERDICT_TONE[verdict?.type] || VERDICT_TONE.best;
  const words = String(verdict?.text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (
    <span className="inline-flex shrink-0 flex-col items-center gap-0.5 self-start text-center md:flex-row md:items-center md:gap-1.5 md:text-left">
      <HomeIcon name={verdict?.icon || "trophy"} isDark={isDark} gold className="h-4 w-4 shrink-0 md:h-6 md:w-6" />
      {/* Mobile: each word stacked · Desktop: single line */}
      <span className="flex flex-col items-center md:hidden" style={{ color: tone.color }}>
        {words.map((word) => (
          <span key={word} className="text-[0.62rem] font-medium leading-tight">
            {word}
          </span>
        ))}
      </span>
      <span className="hidden text-[0.88rem] font-medium leading-tight md:inline" style={{ color: tone.color }}>
        {verdict?.text}
      </span>
    </span>
  );
}

function RankingCard({ row, cardImage, isDark }) {
  const href = row.href || "#";
  const content = (
    <>
      {/* Full-height gold numbering strip - matches ref */}
      <div
        className="flex w-10 shrink-0 items-center justify-center self-stretch md:w-12"
        style={{
          background: "linear-gradient(180deg, #D4B896 0%, #C4A574 35%, #AB8450 70%, #8F6B3D 100%)",
        }}
      >
        <span className="font-lora text-[1.35rem] font-medium leading-none text-black md:text-[1.6rem]">
          {row.rank}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Row 1: image + titles/verdict */}
        <div className="flex min-w-0 items-center gap-2 py-2 pr-2.5 md:gap-0 md:py-2.5 md:pr-3">
          <div className="relative my-0.5 h-[64px] w-[32%] shrink-0 overflow-hidden md:my-0 md:h-[80px] md:w-[32%]">
            <Image
              src={cardImage.src}
              alt={cardImage.alt || row.ranking}
              fill
              className="object-contain object-center"
              sizes="(max-width:768px) 32vw, 180px"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-start gap-2">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isDark ? "border-white/20" : "border-[#E5E5E5]"}`}>
                <HomeIcon name={row.icon} isDark={isDark} gold className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className={`font-lora text-[0.98rem] font-medium leading-tight no-underline md:text-[1.1rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {row.ranking}
                </p>
                <p className="mt-0.5 font-lora text-[0.88rem] font-medium leading-tight no-underline md:text-[0.95rem]" style={{ color: GOLD }}>
                  {row.winner}
                </p>
              </div>
              <VerdictBadge verdict={row.verdict} isDark={isDark} />
            </div>
            {/* Desktop: description stays under titles */}
            <p className={`hidden text-[0.78rem] font-light leading-[1.35] no-underline md:block ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
              {row.why}
            </p>
          </div>
        </div>

        {/* Mobile: description on full-width second row */}
        <p
          className={`border-t px-2.5 pb-2.5 pt-2 text-[0.72rem] font-light leading-[1.35] no-underline md:hidden ${
            isDark ? "border-white/10 text-white/70" : "border-[rgba(0,0,0,0.06)] text-[var(--color-text-muted)]"
          }`}
        >
          {row.why}
        </p>
      </div>
    </>
  );

  const className = `flex items-stretch overflow-hidden rounded-lg border no-underline shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition hover:no-underline hover:opacity-95 ${
    isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
  }`;

  if (href && href !== "#") {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function HomeSec4({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };
  const cardImage = data.cardImage || { src: "/right.webp", alt: "Mercedes-Benz" };
  const rankings = data.rankings || [];

  return (
    <section className={`relative overflow-hidden px-3 py-6 md:px-4 md:py-8 ${homeSectionBg(isDark, 4)}`}>
      <div className="absolute inset-x-0 top-0 hidden h-[280px] md:block">
        <Image src={headerImage.src} alt="" fill className="object-cover object-right" sizes="100vw" />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#F8F7F3_0%,rgba(248,247,243,0.92)_40%,rgba(248,247,243,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#F8F7F3_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl">
        <div className="max-w-[720px] pt-2 md:pt-6">
          <SectionLabel number={4} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[3rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Mercedes-Benz Ownership Rankings
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5 md:mt-7 md:grid-cols-2 md:gap-3">
          {rankings.map((row) => (
            <RankingCard key={row.ranking} row={row} cardImage={cardImage} isDark={isDark} />
          ))}
        </div>

        {data.dataNote ? (
          <div
            className={`mt-5 flex items-start gap-3 rounded-md px-3 py-3 md:mt-6 md:px-4 md:py-3.5 ${
              isDark ? "bg-[var(--color-surface-raised)]" : "bg-[#EDE6D8]"
            }`}
          >
            <HomeIcon name="info" isDark={isDark} gold className="mt-0.5 h-5 w-5 shrink-0" />
            <p className={`text-[0.78rem] font-light leading-[1.4] md:text-[0.86rem] ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
              <span className="font-medium">Data Note: </span>
              {data.dataNote}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
