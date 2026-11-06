"use client";

import {
  typeH4,
  typeH6,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeTable,
} from "@/components/shared/typography";

import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
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
      <HomeIcon name={verdict?.icon || "trophy"} tone={tableIconTone(isDark)} className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
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

function RankingCard({ row, isDark }) {
  const href = row.href || "#";
  const content = (
    <>
      <div
        className="flex w-10 shrink-0 items-center justify-center self-stretch md:w-12"
        style={{
          background: "linear-gradient(180deg, #D4B896 0%, #C4A574 35%, #AB8450 70%, #8F6B3D 100%)",
        }}
      >
        <span className={`font-lora leading-none text-black ${typeH4}`}>{row.rank}</span>
      </div>

      <div className="flex min-w-0 flex-1 items-stretch gap-3 px-3 py-3 md:gap-4 md:px-4 md:py-3.5">
        <span className="flex shrink-0 items-center self-center">
          <HomeIcon
            name={row.icon || "engine"}
            tone={tableIconTone(isDark)}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start gap-2">
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
          <p className={`mt-1.5 hidden ${typeSmall} font-light no-underline md:block ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
            {row.why}
          </p>
          <p
            className={`mt-2 border-t pt-2 ${typeSmall} font-light no-underline md:hidden ${
              isDark ? "border-white/10 text-white/70" : "border-[rgba(0,0,0,0.06)] text-[var(--color-text-muted)]"
            }`}
          >
            {row.why}
          </p>
        </div>
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
  const rankings = data.rankings || [];

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 4)}`}>
      <SectionHeaderBand
        title="Mercedes-Benz Ownership Rankings"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 4)}
        panelRgb={sectionPanelRgb(isDark, 4)}
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-6 pt-5 md:px-4 md:pb-8 md:pt-6">
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
          {rankings.map((row) => (
            <RankingCard key={row.ranking} row={row} isDark={isDark} />
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
