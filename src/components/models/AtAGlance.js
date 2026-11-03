"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionDescription, sectionH2, sectionTableText } from "@/components/models/sectionTypography";

const metricIcons = {
  Generations: "generations",
  "Years Produced": "timeline",
  "Engine Codes Tracked": "database",
  "Fuel Types": "fuel",
  "Most Enquired Engine (2025)": "most-enquired",
  "Most Reliable": "shield",
  "Highest-Risk": "alert",
  "Typical Replacement Cost": "pound",
  "Typical Host Value": "value",
  "Overall Rating": "star",
};

function cleanText(text = "") {
  return text
    .replaceAll("Â£", "\u00a3")
    .replaceAll("â€“", "\u2013")
    .replaceAll("â€”", "\u2014")
    .replaceAll("â€¢", "\u2022")
    .replaceAll("â˜…", "\u2605")
    .replaceAll("â˜†", "\u2606")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "at a Glance";
  const index = clean.indexOf(marker);

  if (index === -1) {
    return { before: clean, accent: "" };
  }

  return {
    before: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function badgeParts(value = "") {
  const parts = [];
  let text = cleanText(value);
  const tokens = ["[BMW-VERIFIED]", "[BMW-QUOTE]", "[MB-VERIFIED]", "[MB-QUOTE]", "[PATTERN DATA]", "[THIRD-PARTY]", "[PLACEHOLDER - confirm vs cost sheet]"];

  for (const token of tokens) {
    if (text.includes(token)) {
      text = text.replace(token, "").trim();
      parts.push(token.replace("[", "").replace("]", ""));
    }
  }

  return { text, parts };
}

function IconBox({ metric, isDark }) {
  const icon = metricIcons[metric] || "generations";

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center md:h-10 md:w-10">
      <HomeIcon name={icon} isDark={isDark} gold className="h-7 w-7 object-contain md:h-8 md:w-8" />
    </span>
  );
}

function ValueWithBadges({ value, isDark }) {
  const { text, parts } = badgeParts(value);
  const isRating = text.includes("\u2605") || text.includes("★");

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className={isRating ? "text-[1.7rem] leading-none" : ""} style={isRating ? { color: GOLD } : undefined} dangerouslySetInnerHTML={{ __html: text }} />
      {parts.map((part) => (
        <span
          key={part}
          className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[15px] font-medium ${
            isDark ? "border-[rgba(171,132,80,0.35)] bg-white/5" : "border-[rgba(171,132,80,0.28)] bg-[#F5EAD4]"
          }`}
          style={{ color: GOLD }}
        >
          <HomeIcon name="shield" isDark={isDark} gold className="h-4 w-4 object-contain" />
          <span dangerouslySetInnerHTML={{ __html: part }} />
        </span>
      ))}
    </span>
  );
}

function DesktopTable({ rows, isDark }) {
  return (
    <div
      className={`hidden overflow-hidden rounded-md border shadow-[0_14px_36px_var(--color-shadow)] backdrop-blur md:block ${
        isDark ? "border-white/16 bg-[rgba(2,13,25,0.72)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.84)]"
      }`}
    >
      <div
        className={`grid grid-cols-[68px_0.95fr_1.7fr] border-b px-5 py-3 font-semibold md:grid-cols-[72px_0.95fr_1.7fr] md:px-5 md:py-3 ${sectionTableText} ${
          isDark ? "text-white" : "text-[var(--color-text)]"
        }`}
        style={{ borderColor: `${GOLD}55`, backgroundColor: isDark ? "rgba(171,132,80,0.12)" : "rgba(171,132,80,0.1)" }}
      >
        <span />
        <span>Metric</span>
        <span>Value</span>
      </div>
      {rows.map((row) => (
        <div key={row.metric} className="grid grid-cols-[68px_0.95fr_1.7fr] items-center border-b border-[var(--color-border)] px-5 py-2.5 last:border-b-0 md:grid-cols-[72px_0.95fr_1.7fr] md:px-5 md:py-2.5">
          <IconBox metric={row.metric} isDark={isDark} />
          <span className={`border-r border-[var(--color-border)] pr-5 font-semibold text-[var(--color-text)] md:pr-5 ${sectionTableText}`} dangerouslySetInnerHTML={{ __html: row.metric }} />
          <span className={`pl-5 text-[var(--color-text-muted)] md:pl-6 ${sectionTableText}`}>
            <ValueWithBadges value={row.value} isDark={isDark} />
          </span>
        </div>
      ))}
    </div>
  );
}

function MobileCard({ row, wide = false, isDark }) {
  return (
    <li className={`${wide ? "col-span-2" : ""} border-b border-[var(--color-border)] p-3.5 last:border-b-0 md:p-5`}>
      <div className="flex items-center gap-2.5 md:gap-3">
        <IconBox metric={row.metric} isDark={isDark} />
        <p className={`min-w-0 font-semibold leading-tight text-[var(--color-text)] ${sectionTableText}`} dangerouslySetInnerHTML={{ __html: row.metric }} />
      </div>
      <p className={`mt-2.5 font-medium leading-[1.35] text-[var(--color-text)] md:mt-3 ${sectionBody}`}>
        <ValueWithBadges value={row.value} isDark={isDark} />
      </p>
    </li>
  );
}

function MobileCards({ rows, isDark }) {
  const withoutRating = rows.filter((row) => row.metric !== "Overall Rating");

  return (
    <ul
      className={`grid grid-cols-2 overflow-hidden rounded-md border shadow-[0_14px_36px_var(--color-shadow)] backdrop-blur md:hidden ${
        isDark ? "border-white/16 bg-[rgba(2,13,25,0.76)]" : "border-[var(--color-border)] bg-[rgba(255,255,255,0.88)]"
      }`}
    >
      {withoutRating.map((row) => (
        <MobileCard key={row.metric} row={row} wide={row.metric === "Most Enquired Engine (2025)"} isDark={isDark} />
      ))}
    </ul>
  );
}

function RatingCard({ row, isDark }) {
  if (!row) return null;

  return (
    <div className={`mt-5 rounded-md p-5 md:hidden ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#0a0a0a] text-white"}`}>
      <div className="flex items-center gap-5">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center">
          <HomeIcon name="star" isDark gold className="h-[4.5rem] w-[4.5rem] object-contain" />
        </span>
        <div className="min-w-0">
          <p className="text-[18px] font-bold">Overall Rating</p>
          <p className="mt-2 text-[40px] leading-none md:text-[50px]" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: cleanText(row.value).replace(" 3.9/5", "") }} />
          <p className="mt-2 text-[18px] font-bold" style={{ color: GOLD }}>
            3.9/5
          </p>
        </div>
      </div>
      <p className="mt-3 text-[15px] leading-[1.35] text-white/82">A perfect blend of performance, engineering excellence, and drivability.</p>
    </div>
  );
}

export default function AtAGlance({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const rows = data.rows || [];
  const ratingRow = rows.find((row) => row.metric === "Overall Rating");

  return (
    <section className={`relative overflow-hidden px-3 py-8 text-[var(--color-text)] md:px-4 md:py-10 ${homeSectionBg(isDark, 3)}`}>
      {/* Header image only - same asset as before, not full-section BG */}
      <div className="absolute inset-x-0 top-0 h-[220px] md:h-[280px]">
        <Image
          src="/model/Section 3-bg.webp"
          alt=""
          fill
          className="object-cover object-[64%_top] md:object-right"
          sizes="100vw"
        />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#EFEEE9_0%,rgba(239,238,233,0.92)_40%,rgba(239,238,233,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl px-1 md:px-4">
        <div className="max-w-[510px] pt-2 md:pt-6">
          <h2 className={`font-lora font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
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
          <p className={`mt-5 max-w-[430px] text-[var(--color-text-muted)] ${sectionDescription}`} dangerouslySetInnerHTML={{ __html: data.subHeadline }} />
        </div>

        <div className="mt-6 md:mt-7">
          <DesktopTable rows={rows} isDark={isDark} />
          <MobileCards rows={rows} isDark={isDark} />
          <RatingCard row={ratingRow} isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
