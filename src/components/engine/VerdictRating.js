"use client";

import Image from "next/image";
import { useTheme } from "@/components/shared/themeProvider";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { iconColor } from "@/components/engine/iconTone";
import {
  sectionBadge,
  sectionBody,
  sectionH2,
  sectionHighlight,
  sectionSmall,
} from "@/components/models/sectionTypography";

const dimensionIcons = {
  Reliability: (
    <path d="M12 3 5 6v6c0 5 3.3 8.8 7 9 3.7-.2 7-4 7-9V6l-7-3Zm-2 9 1.6 1.6L15 10" />
  ),
  "Repair Cost": <path d="M12 3v18m3-14H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H8" />,
  Repairability: (
    <path d="m14.7 6.3 3-3a4 4 0 0 1 0 5.7l-1.4 1.4-2.7-2.7L7 14.3V17H4.3l6.6-6.6-2.7-2.7 1.4-1.4a4 4 0 0 1 5.1 0Z" />
  ),
  "Parts Supply": (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 12 4.2 7.5M12 12v9m0-9 7.8-4.5" />
    </>
  ),
  "Replacement Economics": <path d="M5 19V9m5 10V5m5 14v-7m5 7H3" />,
};

function cleanText(text = "") {
  return String(text)
    .replace(/\u00c2\u00a3|\u00a3/g, "\u00a3")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u201c|\u00c3\u00a2\u00e2\u20ac\u201d|\u00e2\u20ac\u201c|\u00e2\u20ac\u201d|\u2013|\u2014/g, "\u2013")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u02dc|\u00e2\u20ac\u2018|\u2011/g, "-")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u00a2|\u00e2\u20ac\u00a2|\u2022/g, "\u2022")
    .replace(/\s+/g, " ")
    .trim();
}

function cardClass(isDark) {
  return isDark
    ? "border-[var(--color-border)] bg-[var(--color-surface)]"
    : "border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_10px_28px_var(--color-shadow)]";
}

function parseStarRating(value = "") {
  const clean = cleanText(value);
  const halfMatch = clean.match(/(\d+)\s*[½]/);
  if (halfMatch) {
    return { display: `${halfMatch[1]}\u00bd`, numeric: Number(halfMatch[1]) + 0.5 };
  }

  const decimalMatch = clean.match(/(\d+(?:\.\d+)?)/);
  if (!decimalMatch) return { display: clean, numeric: 0 };

  const numeric = Number(decimalMatch[1]);
  const display = Number.isInteger(numeric) ? String(numeric) : String(numeric);
  return { display, numeric };
}

function parseScoreCell(score = "") {
  const clean = cleanText(score);
  const totalMatch = clean.match(/^(\d+)\s*\/\s*(\d+)\s*(?:\((.+)\))?$/);
  if (totalMatch) {
    return {
      points: Number(totalMatch[1]),
      outOf: Number(totalMatch[2]),
      detail: totalMatch[3] || "",
      isTotal: true,
    };
  }

  const match = clean.match(/^(\d+)\s*(?:\((.+)\))?$/);
  if (!match) return { points: 0, outOf: 20, detail: clean, isTotal: false };

  return {
    points: Number(match[1]),
    outOf: 20,
    detail: match[2] || "",
    isTotal: false,
  };
}

function parseVerdict(value = "") {
  const clean = cleanText(value);
  const match = clean.match(/^["“]?(.+?)["”]?\s*(\(Clause[\s\S]*)?$/i);

  if (!match) {
    return { quote: clean, meta: "" };
  }

  return {
    quote: match[1].replace(/^["“]|["”]$/g, "").trim(),
    meta: (match[2] || "").trim(),
  };
}

function renderTaggedText(text = "") {
  const parts = cleanText(text).split(/(\[[^\]]+\])/g);

  return parts.map((part, index) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span key={`${part}-${index}`} className="font-semibold text-[#AB8450]">
          {part}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function StarRating({ value }) {
  const clamped = Math.max(0, Math.min(5, Number(value) || 0));

  return (
    <div className="flex items-center gap-0.5 text-[#AB8450]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, clamped - index));

        if (fill >= 0.99) {
          return (
            <span key={index} className="font-lora text-[16px] leading-none md:text-[20px]">
              ★
            </span>
          );
        }

        if (fill >= 0.25) {
          return (
            <span
              key={index}
              className="relative inline-block font-lora text-[16px] leading-none text-[var(--color-border-strong)] md:text-[20px]"
            >
              ★
              <span
                className="absolute inset-y-0 left-0 overflow-hidden text-[#AB8450]"
                style={{ width: `${Math.round(fill * 100)}%` }}
              >
                ★
              </span>
            </span>
          );
        }

        return (
          <span key={index} className="font-lora text-[16px] leading-none text-[var(--color-border-strong)] md:text-[20px]">
            ★
          </span>
        );
      })}
    </div>
  );
}

function CircleIcon({ children, className = "", isDark = false }) {
  const tone = iconColor(isDark);
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border bg-[rgba(171,132,80,0.12)] ${className}`}
      style={{ borderColor: tone, color: tone }}
    >
      {children}
    </span>
  );
}

function DimensionIcon({ dimension, isDark }) {
  return (
    <CircleIcon className="h-8 w-8 md:h-10 md:w-10" isDark={isDark}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="1.85">
        {dimensionIcons[dimension] || dimensionIcons.Reliability}
      </svg>
    </CircleIcon>
  );
}

function RatingCard({ starRating, confidence, isDark }) {
  const rating = parseStarRating(starRating);

  return (
    <article className={`rounded-xl border px-3.5 py-3.5 md:px-5 md:py-5 ${cardClass(isDark)}`}>
      <p className={`font-medium ${sectionBadge} ${isDark ? "text-[var(--color-text)]" : "text-[var(--color-text-soft)]"}`}>Rating:</p>

      <div className="mt-1.5 flex flex-wrap items-end gap-x-2.5 gap-y-1 md:mt-2 md:gap-x-3">
        <p className={`font-lora font-medium leading-none ${sectionH2}`} style={{ color: GOLD }}>{rating.display}</p>
        <div className="mb-0.5 flex items-center gap-1.5 md:mb-1 md:gap-2">
          <StarRating value={rating.numeric} />
          <span className={`font-lora font-medium text-[var(--color-text-soft)] ${sectionSmall}`}>out of 5</span>
        </div>
      </div>

      <div className="mt-3 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-start gap-2.5">
          <CircleIcon className="mt-0.5 h-7 w-7 md:h-8 md:w-8" isDark={isDark}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M12 3 5 6v6c0 5 3.3 8.8 7 9 3.7-.2 7-4 7-9V6l-7-3Zm-2 9 1.6 1.6L15 10" />
            </svg>
          </CircleIcon>
          <p className={`min-w-0 text-[var(--color-text-muted)] ${sectionSmall}`}>
            {renderTaggedText(confidence)}
          </p>
        </div>
      </div>
    </article>
  );
}

function VerdictQuote({ oneLineVerdict, isDark }) {
  const { quote, meta } = parseVerdict(oneLineVerdict);

  return (
    <article className={`relative overflow-hidden rounded-xl border px-3.5 py-3.5 md:px-5 md:py-5 ${cardClass(isDark)}`}>
      <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1 text-[36px] font-bold leading-none text-[#AB8450] opacity-70 md:left-4 md:top-2 md:text-[48px] md:opacity-80">
        “
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-2.5 text-[36px] font-bold leading-none text-[#AB8450] opacity-70 md:bottom-6 md:right-4 md:text-[48px] md:opacity-80">
        ”
      </span>

      <p className={`relative z-[1] px-4 pt-4 font-medium text-[var(--color-text)] md:px-6 md:pt-5 ${sectionBody}`}>
        {quote}
      </p>
      {meta ? (
        <p className="relative z-[1] mt-2.5 px-1 text-[10px] leading-[1.35] text-[var(--color-text-soft)] md:mt-3 md:text-[11px]">
          {meta}
        </p>
      ) : null}
    </article>
  );
}

function AdviceCards({ bestFor, avoidIf, isDark }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:gap-3">
      <article
        className={`rounded-xl border px-3.5 py-3 md:px-4 md:py-3.5 ${
          isDark
            ? "border-[var(--color-accent-green)] bg-[var(--color-accent-green-soft)]"
            : "border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_8px_22px_var(--color-shadow)]"
        }`}
      >
        <div className="flex items-center gap-2 text-[var(--color-accent-green)]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent-green)] bg-[var(--color-accent-green-soft)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="m6 12 4 4 8-8" />
            </svg>
          </span>
          <p className="text-[13px] font-semibold md:text-[14px]">Best for:</p>
        </div>
        <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-text)] md:text-[13px]">{cleanText(bestFor)}</p>
      </article>

      <article
        className={`rounded-xl border px-3.5 py-3 md:px-4 md:py-3.5 ${
          isDark
            ? "border-[var(--color-accent-red)] bg-[var(--color-accent-red-soft)]"
            : "border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_8px_22px_var(--color-shadow)]"
        }`}
      >
        <div className="flex items-center gap-2 text-[var(--color-accent-red)]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent-red)] bg-[var(--color-accent-red-soft)]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M10.3 4.9 2.7 18a2 2 0 0 0 1.75 3h15.1A2 2 0 0 0 21.3 18L13.7 4.9a2 2 0 0 0-3.4 0Z" />
            </svg>
          </span>
          <p className="text-[13px] font-semibold md:text-[14px]">Avoid if:</p>
        </div>
        <p className="mt-2 text-[12px] leading-[1.4] text-[var(--color-text)] md:text-[13px]">{cleanText(avoidIf)}</p>
      </article>
    </div>
  );
}

function ScoreBreakdown({ scoreNote, scoreBreakdown, isDark }) {
  const columns = scoreBreakdown?.columns || ["Dimension", "Score (of 20)"];
  const rawRows = scoreBreakdown?.rows || [];

  const parsedRows = rawRows
    .map((row) => ({
      dimension: cleanText(row.dimension),
      ...parseScoreCell(row.score),
    }))
    .filter((row) => row.dimension);

  const bodyRows = parsedRows
    .filter((row) => !row.isTotal && row.dimension.toLowerCase() !== "total")
    .map((row) => ({
      ...row,
      points: Math.min(Number(row.points) || 0, 20),
      outOf: 20,
    }));

  /** Always sum the 5 dimensions; scale max is 100 (5 × 20). */
  const totalPoints = bodyRows.reduce((sum, row) => sum + row.points, 0);
  const totalOutOf = 100;

  return (
    <article className={`overflow-hidden rounded-xl border ${cardClass(isDark)}`}>
      <div className="px-3.5 pt-3.5 md:px-5 md:pt-5">
        <p className="font-lora text-[13px] font-medium text-[var(--color-text)] md:text-[15px]">{cleanText(scoreNote)}</p>
      </div>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-[rgba(171,132,80,0.12)] px-3.5 py-2 text-[11px] font-semibold text-[var(--color-text)] md:mt-3 md:gap-3 md:px-5 md:py-2.5 md:text-[13px]">
        <span>{columns[0] || "Dimension"}</span>
        <span className="text-right">{columns[1] || "Score (of 20)"}</span>
      </div>

      <div>
        {bodyRows.map((row) => (
          <div
            key={row.dimension}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border-b border-[var(--color-border)] px-3 py-2.5 md:gap-4 md:px-5 md:py-3.5"
          >
            <div className="flex min-w-0 items-start gap-2 md:gap-3">
              <DimensionIcon dimension={row.dimension} isDark={isDark} />
              <div className="min-w-0">
                <p className={`font-lora font-medium leading-tight text-[var(--color-text)] ${sectionBadge}`}>{row.dimension}</p>
                {row.detail ? (
                  <p className={`mt-0.5 leading-[1.35] text-[var(--color-text-soft)] md:mt-1 ${sectionSmall}`}>{row.detail}</p>
                ) : null}
              </div>
            </div>
            <p className="shrink-0 pt-0.5 text-right leading-none">
              <span className={`font-bold ${sectionHighlight}`} style={{ color: GOLD }}>{row.points}</span>
              <span className={`text-[11px] font-medium md:text-[13px] ${isDark ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}> /20</span>
            </p>
          </div>
        ))}
      </div>

      <div
        className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3.5 py-3 md:gap-3 md:px-5 md:py-4 ${
          isDark ? "bg-[var(--color-page-soft)]" : "bg-[rgba(171,132,80,0.12)]"
        }`}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--color-text)] md:text-[13px]">
          Total Engine Score
        </p>
        <p className="text-right leading-none">
          <span className="text-[26px] font-bold text-[#AB8450] md:text-[34px]">{totalPoints}</span>
          <span className={`text-[12px] font-medium md:text-[14px] ${isDark ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}> / {totalOutOf}</span>
        </p>
      </div>
    </article>
  );
}

export default function VerdictRating({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-6 text-[var(--color-text)] md:py-9 ${homeSectionBg(isDark, 3)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="text-left">
          <h2 className={`font-lora ${sectionH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Verdict <span style={{ color: GOLD }}>& Rating</span>
          </h2>
          <div className="mt-3">
            <SectionLabel isDark={isDark} />
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-5 hidden gap-4 md:grid md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="grid gap-3">
            <RatingCard starRating={data.starRating} confidence={data.confidence} isDark={isDark} />
            <VerdictQuote oneLineVerdict={data.oneLineVerdict} isDark={isDark} />
            <AdviceCards bestFor={data.bestFor} avoidIf={data.avoidIf} isDark={isDark} />
            <div className="relative aspect-[21/6] w-full overflow-hidden rounded-xl">
              <Image
                src="/e90/engine.webp"
                alt=""
                fill
                unoptimized
                className="scale-[1.35] object-cover object-center"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </div>
          <ScoreBreakdown scoreNote={data.scoreNote} scoreBreakdown={data.scoreBreakdown} isDark={isDark} />
        </div>

        {/* Mobile */}
        <div className="mt-4 grid gap-2.5 md:hidden">
          <RatingCard starRating={data.starRating} confidence={data.confidence} isDark={isDark} />
          <VerdictQuote oneLineVerdict={data.oneLineVerdict} isDark={isDark} />
          <ScoreBreakdown scoreNote={data.scoreNote} scoreBreakdown={data.scoreBreakdown} isDark={isDark} />
          <AdviceCards bestFor={data.bestFor} avoidIf={data.avoidIf} isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
