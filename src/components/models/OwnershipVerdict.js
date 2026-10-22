"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionDescription, sectionH2, sectionTableText } from "@/components/models/sectionTypography";

const metricIcons = {
  "Overall Ownership Rating": "star",
  "Replacement Economics": "scales",
  Reliability: "shield",
  "Most Reliable Engine": "trophy",
  "Highest-Risk Engine": "alert",
  "Best Used Buy": "cart",
  "Best Petrol Buy": "fuel",
  "Average Engine Replacement": "pound",
  "Most Common Failure Enquiry": "chart",
  "BMW Ranking": "crown",
  "Mercedes Ranking": "crown",
};

const statIconKeys = {
  chart: "chart",
  shield: "shield",
  gear: "engine",
  book: "book",
  trophy: "trophy",
};

function cleanText(text = "") {
  return text
    .replaceAll("Â£", "\u00a3")
    .replaceAll("â€“", "\u2013")
    .replaceAll("â€”", "\u2014")
    .replaceAll("â€¢", "\u2022")
    .replaceAll("â˜…", "\u2605")
    .replaceAll("â˜†", "\u2606")
    .replaceAll("âšï¸", "")
    .replaceAll("ðŸ¥‡", "")
    .replaceAll(" -", " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "The Ownership Verdict";
  const index = clean.indexOf(marker);

  if (index === -1) {
    return { before: clean, accent: "" };
  }

  return {
    before: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function MetricIcon({ metric, isDark }) {
  const icon = metricIcons[metric] || "shield";

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center">
      <HomeIcon name={icon} isDark={isDark} gold className="h-8 w-8 object-contain md:h-9 md:w-9" />
    </span>
  );
}

function StatIcon({ iconKey, isDark }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center">
      <HomeIcon name={statIconKeys[iconKey] || iconKey || "chart"} isDark={isDark} gold className="h-10 w-10 object-contain" />
    </span>
  );
}

function VerdictTable({ metrics, isDark }) {
  return (
    <div
      className={`overflow-hidden rounded-md border shadow-[0_14px_36px_var(--color-shadow)] backdrop-blur ${
        isDark ? "border-white/20 bg-[rgba(2,13,25,0.74)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.84)]"
      }`}
    >
      <div
        className={`grid grid-cols-[40%_60%] border-b px-3 py-2 font-semibold md:grid-cols-[42%_58%] md:px-3 md:py-2.5 ${sectionTableText} text-[13px]`}
        style={{ borderColor: `${GOLD}55`, backgroundColor: isDark ? "rgba(171,132,80,0.12)" : "rgba(171,132,80,0.1)" }}
      >
        <span>Verdict Metric</span>
        <span>Our Call</span>
      </div>
      {metrics.map((row) => (
        <div key={row.metric} className="grid grid-cols-[40%_60%] border-b border-[var(--color-border)] last:border-b-0 md:grid-cols-[42%_58%]">
          <div className="flex items-center gap-2 border-r border-[var(--color-border)] px-3 py-2 md:px-3 md:py-2.5">
            <MetricIcon metric={row.metric} isDark={isDark} />
            <span className={`font-medium leading-[1.25] ${sectionTableText} text-[13px]`} dangerouslySetInnerHTML={{ __html: cleanText(row.metric) }} />
          </div>
          <p className={`px-3 py-2 text-[var(--color-text-muted)] md:px-3 md:py-2.5 ${sectionTableText} text-[13px]`} dangerouslySetInnerHTML={{ __html: cleanText(row.ourCall) }} />
        </div>
      ))}
    </div>
  );
}

function OneLineVerdict({ text, isDark }) {
  return (
    <div
      className={`flex gap-4 rounded-md border p-4 shadow-[0_14px_36px_var(--color-shadow)] backdrop-blur md:items-center md:p-5 ${
        isDark ? "border-white/20 bg-[rgba(2,13,25,0.72)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.86)]"
      }`}
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center md:h-20 md:w-20">
        <HomeIcon name="shield" isDark={isDark} gold className="h-12 w-12 object-contain md:h-14 md:w-14" />
      </span>
      <div className="min-w-0">
        <p className="font-bold" style={{ color: GOLD }}>
          One-line verdict:
        </p>
        <p className={`mt-1 text-[var(--color-text-muted)] ${sectionBody}`} dangerouslySetInnerHTML={{ __html: cleanText(text) }} />
      </div>
      <span className="ml-auto hidden text-4xl font-bold md:block" style={{ color: GOLD }}>
        &quot;
      </span>
    </div>
  );
}

export default function OwnershipVerdict({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const stats = data.summaryStats || [];

  return (
    <section className={`relative overflow-hidden py-7 text-[var(--color-text)] md:py-9 ${homeSectionBg(isDark, 2)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div>
            <h2 className={`font-lora max-w-[640px] font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
              <span dangerouslySetInnerHTML={{ __html: title.before }} />
              {title.accent ? (
                <>
                  <br />
                  <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
                </>
              ) : null}
            </h2>
            <div className="mt-3">
              <SectionFadeStrip isDark={isDark} />
            </div>
            <div className="relative mt-4 overflow-hidden rounded-md border border-[var(--color-border)] bg-[rgba(255,255,255,0.18)] shadow-[0_10px_24px_var(--color-shadow)] md:mt-5 md:h-[260px]">
              <Image
                src="/model/Section 2-bg.webp"
                alt=""
                fill
                className="object-cover object-[35%_center] md:object-center"
                sizes="(min-width: 768px) 640px, 100vw"
              />
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? "bg-[linear-gradient(180deg,rgba(2,13,25,0.05)_0%,rgba(2,13,25,0.35)_100%)]"
                    : "bg-[linear-gradient(180deg,rgba(239,238,233,0.05)_0%,rgba(239,238,233,0.2)_100%)]"
                }`}
              />
            </div>
            <p className={`mt-5 max-w-[470px] text-[var(--color-text-muted)] ${sectionDescription}`} dangerouslySetInnerHTML={{ __html: cleanText(data.subHeadline) }} />

            {data.oneLineVerdict ? (
              <div className="mt-5 hidden md:block">
                <OneLineVerdict text={data.oneLineVerdict} isDark={isDark} />
              </div>
            ) : null}
          </div>

          <VerdictTable metrics={data.metrics || []} isDark={isDark} />
        </div>

        {data.oneLineVerdict ? (
          <div className="mt-5 md:hidden">
            <OneLineVerdict text={data.oneLineVerdict} isDark={isDark} />
          </div>
        ) : null}

        {stats.length > 0 ? (
          <ul
            className={`mt-5 hidden grid-cols-5 overflow-hidden rounded-md border shadow-[0_14px_36px_var(--color-shadow)] backdrop-blur md:grid ${
              isDark ? "border-white/14 bg-[rgba(2,13,25,0.74)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.86)]"
            }`}
          >
            {stats.map((stat) => (
              <li key={`${stat.value}-${stat.label}`} className="flex items-center gap-4 border-r border-[var(--color-border)] px-7 py-5 last:border-r-0">
                <StatIcon iconKey={stat.iconKey} isDark={isDark} />
                <p className={`text-[var(--color-text)] ${sectionTableText}`}>
                  {stat.value ? (
                    <strong className="mr-1 text-[1.45rem] leading-none" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: stat.value }} />
                  ) : null}
                  <span dangerouslySetInnerHTML={{ __html: stat.label }} />
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
