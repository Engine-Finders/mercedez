"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import {
  sectionButton,
  sectionEyebrow,
  sectionH2,
  sectionH4,
  sectionH5,
  sectionHighlight,
  sectionSmall,
  sectionTableText,
} from "@/components/models/sectionTypography";

function cleanText(text = "") {
  return text
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "\u2013")
    .replaceAll("Ã¢â‚¬â€", "\u2014")
    .replaceAll("Ã¢â‚¬Â¢", "\u2022")
    .replaceAll("â€”", "\u2014")
    .replaceAll("â€“", "\u2013")
    .replaceAll("â†’", "\u2192")
    .replaceAll("â¬†", "\u2191")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const [before, after = ""] = clean.split(/\s*-\s*/);

  return {
    before: before || clean,
    accent: after,
    after: "",
  };
}

function metricFromTitle(title = "") {
  const match = cleanText(title).match(/What\s+([0-9,+]+)/i);
  return match ? `${match[1]}+` : "826+";
}

function splitBadges(text = "") {
  const clean = cleanText(text);
  const pieces = clean.split(/(\[[^\]]+\])/g).filter(Boolean);

  return pieces.map((piece) => ({
    text: piece.replace("[", "").replace("]", ""),
    isBadge: piece.startsWith("[") && piece.endsWith("]"),
  }));
}

function trendParts(text = "") {
  const clean = cleanText(text);
  const trend = clean.startsWith("⬆") || clean.startsWith("\u2191") ? "rising" : clean.startsWith("➡") || clean.startsWith("\u2192") ? "stable" : "neutral";
  const withoutArrow = clean.replace(/^[⬆➡↑→]\s*/, "");
  const [label = "", ...rest] = withoutArrow.split(/\s+(?=\[)/);

  return {
    trend,
    label: label.trim(),
    note: rest.join(" ").trim(),
  };
}

function TrendIcon({ trend }) {
  const path =
    trend === "stable" ? (
      <path d="M4 12h15m-5-5 5 5-5 5" />
    ) : (
      <path d="m4 16 5-5 3 3 7-7m-5 0h5v5" />
    );

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 md:h-8 md:w-8" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ color: GOLD }}>
      {path}
    </svg>
  );
}

function CircleIcon({ name, isDark, small = false }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${small ? "h-10 w-10 md:h-11 md:w-11" : "h-14 w-14 md:h-16 md:w-16"}`}>
      <HomeIcon name={name} isDark={isDark} className={small ? "h-7 w-7 object-contain" : "h-10 w-10 object-contain md:h-12 md:w-12"} />
    </span>
  );
}

function RichText({ value, strongFirst = false }) {
  const parts = splitBadges(value);
  const firstColonIndex = strongFirst ? parts.findIndex((part) => !part.isBadge && part.text.includes(":")) : -1;

  return (
    <>
      {parts.map((part, index) => {
        if (part.isBadge) {
          return (
            <span key={`${part.text}-${index}`} className="mx-1 inline-flex font-medium" style={{ color: GOLD }}>
              [{part.text}]
            </span>
          );
        }

        if (index === firstColonIndex) {
          const [lead, ...rest] = part.text.split(":");
          return (
            <span key={`${part.text}-${index}`}>
              <strong className="font-bold text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: `${lead}:` }} />
              <span dangerouslySetInnerHTML={{ __html: rest.join(":") }} />
            </span>
          );
        }

        return <span key={`${part.text}-${index}`} dangerouslySetInnerHTML={{ __html: part.text }} />;
      })}
    </>
  );
}

function SignalTable({ rows, isDark }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_10px_30px_var(--color-shadow)]">
      <div className={`grid grid-cols-[34%_30%_36%] font-bold text-white md:grid-cols-[32%_33%_35%] ${sectionTableText}`} style={{ backgroundColor: GOLD }}>
        <div className="px-2 py-2 md:px-5 md:py-3">Signal</div>
        <div className="border-l border-white/28 px-2 py-2 md:px-3 md:py-2">2025 Data</div>
        <div className="border-l border-white/28 px-2 py-2 md:px-3 md:py-2">Demand Trend</div>
      </div>

      {rows.map((row, index) => {
        const trend = trendParts(row.demandTrend);
        const isEngine = row.signal?.includes("(");

        return (
          <div key={`${row.signal}-${index}`} className="grid grid-cols-[34%_30%_36%] border-t border-[var(--color-border)] text-[var(--color-text)] md:grid-cols-[32%_33%_35%]">
            <div className="flex min-w-0 items-center gap-2 px-2 py-3 md:gap-4 md:px-3 md:py-3">
              <CircleIcon name={isEngine ? "engine" : "car"} isDark={isDark} small />
              <p className={`min-w-0 break-words font-bold leading-[1.25] ${sectionTableText}`} dangerouslySetInnerHTML={{ __html: cleanText(row.signal) }} />
            </div>
            <div className={`border-l border-[var(--color-border)] px-2 py-3 md:px-3 ${sectionTableText}`}>
              <RichText value={row.data} />
            </div>
            <div className={`flex min-w-0 items-start gap-2 border-l border-[var(--color-border)] px-2 py-3 md:items-center md:gap-4 md:px-3 ${sectionTableText}`}>
              <TrendIcon trend={trend.trend} />
              <p className="min-w-0 break-words hyphens-auto whitespace-normal">
                <strong className="font-bold text-[var(--color-text)]">{trend.label.split(" ")[0]}</strong>
                {trend.label.includes(" ") ? ` ${trend.label.split(" ").slice(1).join(" ")}` : ""}
                {trend.note ? (
                  <span className="ml-1" style={{ color: GOLD }}>
                    {trend.note}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const INSIGHT_ICONS = ["insight", "shield", "star"];

function InsightsPanel({ insights, isDark }) {
  if (!insights?.length) return null;

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3 shadow-[0_10px_30px_var(--color-shadow)] md:col-span-3 md:p-3.5">
      <div className="mb-4 flex items-center gap-3" style={{ color: GOLD }}>
        <HomeIcon name="chart" isDark={isDark} className="h-5 w-5 object-contain" />
        <h3 className={`font-bold ${sectionH5}`}>Insights from the data:</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:gap-0">
        {insights.map((insight, index) => (
          <article key={insight} className="border-[var(--color-border)] md:border-l md:px-3 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
            <p className={`text-[var(--color-text)] ${sectionTableText}`}>
              <span className="float-left mr-3 mb-1">
                <CircleIcon name={INSIGHT_ICONS[index] || "insight"} isDark={isDark} />
              </span>
              <RichText value={insight} strongFirst />
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function LiveFeed({ note }) {
  if (!note) return null;

  const displayNote = /module embeds here/i.test(note) ? "Real-time enquiry activity across the UK." : cleanText(note);

  return (
    <aside className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 shadow-[0_10px_30px_var(--color-shadow)] md:p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className={`font-bold text-[var(--color-text)] ${sectionH5}`}>Live Enquiry Feed</h3>
        <span className={`inline-flex items-center gap-2 text-[var(--color-text-muted)] ${sectionSmall}`}>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          Live
        </span>
      </div>
      <svg aria-hidden="true" viewBox="0 0 260 90" className="mt-5 h-20 w-full" fill="none" style={{ color: GOLD }}>
        <path d="M4 56c16 24 25-8 39 8s23-50 43-24 25 4 38-9 22-8 33 6 19-3 27-12 16 14 28 1 19 12 44-1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M4 56c16 24 25-8 39 8s23-50 43-24 25 4 38-9 22-8 33 6 19-3 27-12 16 14 28 1 19 12 44-1" stroke="currentColor" strokeWidth="12" strokeOpacity=".12" strokeLinecap="round" />
        {[43, 86, 157, 212, 256].map((x, index) => (
          <circle key={x} cx={x} cy={[64, 40, 37, 26, 25][index]} r="4" fill="var(--color-surface)" stroke="currentColor" strokeWidth="3" />
        ))}
      </svg>
      <p className={`mt-3 text-[var(--color-text-muted)] ${sectionSmall}`}>{displayNote}</p>
      <Link
        href="#"
        className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-md border px-5 py-3 font-bold no-underline transition-all duration-200 hover:opacity-90 ${sectionButton}`}
        style={{ borderColor: GOLD, color: GOLD }}
      >
        View Live Feed
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </Link>
    </aside>
  );
}

function PullQuote({ data, heroImage }) {
  if (!data) return null;
  const imageSrc = data.image?.src || heroImage?.src || "/model/Hero-bg-image.webp";
  const imageAlt = data.image?.alt || heroImage?.alt || "";

  return (
    <div className="grid overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_10px_30px_var(--color-shadow)] md:grid-cols-[minmax(0,1.46fr)_minmax(290px,0.7fr)]">
      <div className="p-3 md:p-3.5">
        <div className="flex">
          <div>
            <p className={`font-bold ${sectionEyebrow}`} style={{ color: GOLD }}>
              Editorial Pull-Quote
            </p>
            <h3 className={`mt-1.5 max-w-[560px] font-bold text-[var(--color-text)] ${sectionH4}`} dangerouslySetInnerHTML={{ __html: cleanText(data.title) }} />
            <blockquote className={`mt-2 max-w-[760px] text-[var(--color-text)] ${sectionTableText}`}>
              &ldquo;<span dangerouslySetInnerHTML={{ __html: cleanText(data.quote) }} />&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
      <div className="relative min-h-[140px] md:min-h-full">
        <Image src={imageSrc} alt={imageAlt} fill unoptimized className="object-cover object-center" sizes="(min-width: 768px) 35vw, 100vw" />
      </div>
    </div>
  );
}

export default function MarketIntelligence({ data, quoteData, heroImage }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);

  return (
    <section className={`relative overflow-hidden py-5 text-[var(--color-text)] md:py-6 ${homeSectionBg(isDark, 7)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className={`font-lora max-w-[960px] font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
              <span dangerouslySetInnerHTML={{ __html: title.before }} />
              {title.accent ? (
                <>
                  {" "}
                  <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: `- ${title.accent}` }} />
                </>
              ) : null}
              {title.after}
            </h2>
            <div className="mt-2">
              <SectionFadeStrip isDark={isDark} />
            </div>
          </div>
          <div className="flex min-w-[210px] items-center gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 shadow-[0_8px_22px_var(--color-shadow)] md:p-5">
            <CircleIcon name="users" isDark={isDark} />
            <div>
              <p className={`font-bold leading-none text-[var(--color-text)] ${sectionHighlight}`} dangerouslySetInnerHTML={{ __html: metricFromTitle(data.h2) }} />
              <p className={`mt-2 text-[var(--color-text-muted)] ${sectionSmall}`}>Total Enquiries in 2025</p>
              <p className={`mt-1 font-medium ${sectionSmall}`} style={{ color: GOLD }}>
                [MB-VERIFIED]
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SignalTable rows={data.signals || []} isDark={isDark} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_1fr_260px]">
          <InsightsPanel insights={data.insights || []} isDark={isDark} />
          <LiveFeed note={data.liveEnquiryFeedNote} />
        </div>

        <div className="mt-4">
          <PullQuote data={quoteData} heroImage={heroImage} />
        </div>
      </div>
    </section>
  );
}
