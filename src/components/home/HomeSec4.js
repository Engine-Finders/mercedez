"use client";

import {
  typeH1,
  typeH2,
  typeH3,
  typeH4,
  typeH5,
  typeH6,
  typeDesc,
  typeBody,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeButton,
  typeTable,
  typeEyebrow,
} from "@/components/shared/typography";



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

function tableIconTone(isDark) {
  return isDark ? "silver" : "black";
}

function VerdictBadge({ verdict, isDark }) {
  const tone = VERDICT_TONE[verdict?.type] || VERDICT_TONE.best;
  const words = String(verdict?.text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (
    <span className="inline-flex shrink-0 flex-col items-center gap-0.5 self-start text-center md:flex-row md:items-center md:gap-1.5 md:text-left">
      <HomeIcon name={verdict?.icon || "trophy"} tone={tableIconTone(isDark)} className="h-4 w-4 shrink-0 md:h-6 md:w-6" />
      {/* Mobile: each word stacked · Desktop: single line */}
      <span className="flex flex-col items-center md:hidden" style={{ color: tone.color }}>
        {words.map((word) => (
          <span key={word} className={`${typeBadge} font-medium leading-tight`}>
            {word}
          </span>
        ))}
      </span>
      <span className={`hidden ${typeTable} font-medium leading-tight md:inline`} style={{ color: tone.color }}>
        {verdict?.text}
      </span>
    </span>
  );
}

function RankingCard({ row, cardImage, isDark }) {
  const href = row.href || "#";
  const image = row.image || cardImage;
  const content = (
    <>
      {/* Full-height gold numbering strip — flush against image */}
      <div
        className="flex w-10 shrink-0 items-center justify-center self-stretch md:w-12"
        style={{
          background: "linear-gradient(180deg, #D4B896 0%, #C4A574 35%, #AB8450 70%, #8F6B3D 100%)",
        }}
      >
        <span className="font-lora ${typeH4} leading-none text-black">
          {row.rank}
        </span>
      </div>

      <div className="relative h-[72px] w-[28%] shrink-0 self-center overflow-hidden sm:w-[30%] md:h-[88px] md:w-[160px]">
        <Image
          src={image.src}
          alt={image.alt || row.ranking}
          fill
          unoptimized
          className="object-contain object-left"
          sizes="(max-width:768px) 28vw, 160px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-w-0 flex-col gap-1 py-2 pr-2.5 md:py-2.5 md:pr-3">
          <div className="flex items-start gap-2">
            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isDark ? "border-white/20" : "border-[#E5E5E5]"}`}>
              <HomeIcon name={row.icon} tone={tableIconTone(isDark)} className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className={`font-lora ${typeH6} font-medium leading-tight no-underline ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {row.ranking}
              </p>
              <p className={`mt-0.5 font-lora ${typeHighlight} font-medium leading-tight no-underline`} style={{ color: GOLD }}>
                {row.winner}
              </p>
            </div>
            <VerdictBadge verdict={row.verdict} isDark={isDark} />
          </div>
          <p className={`hidden ${typeSmall} font-light no-underline md:block ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
            {row.why}
          </p>
        </div>

        <p
          className={`border-t px-2.5 pb-2.5 pt-2 ${typeSmall} font-light no-underline md:hidden ${
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
          <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Mercedes-Benz Ownership Rankings
          </h2>
          <SectionLabel isDark={isDark} />
          <p className={`mt-3 max-w-[640px] ${typeDesc} ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
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
            <p className={`${typeSmall} ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
              <span className="font-medium">Data Note: </span>
              {data.dataNote}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
