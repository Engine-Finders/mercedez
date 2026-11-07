"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { useTheme } from "@/components/shared/themeProvider";
import HeroRegLookup from "@/components/shared/HeroRegLookup";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { iconBgClass, iconBorderClass } from "@/components/engine/iconTone";
import {
  sectionDescription,
  sectionH1,
  sectionSmall,
  sectionHighlight,
} from "@/components/models/sectionTypography";

const STAT_ICON_KEYS = ["chart", "wrench", "shield", "trophy"];

function normalizeText(value = "") {
  return value
    .replace(/\u00c3\u00a2\u00e2\u20ac\u00a2|\u00e2\u20ac\u00a2|\u2022/g, " \u2022 ")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u00a0\u00e2\u201e\u00a2|\u00e2\u2020\u2019|\u2192/g, "\u2192")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u201c|\u00c3\u00a2\u00e2\u20ac\u201d|\u00e2\u20ac\u201c|\u00e2\u20ac\u201d|\u2013|\u2014/g, "\u2013")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u02dc|\u00e2\u20ac\u2018|\u2011/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTagPill(tagPill = "") {
  return normalizeText(tagPill)
    .split(" \u2022 ")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitStatLabel(label = "") {
  const clean = normalizeText(label);
  const match = clean.match(/^([0-9,/+.]+)\s+(.+)$/);

  if (!match) {
    return { value: "", lines: [clean] };
  }

  const [, value, rest] = match;
  return {
    value,
    lines: rest.split(" ").reduce(
      (acc, word) => {
        if (acc[0].length <= acc[1].length) {
          acc[0] = acc[0] ? `${acc[0]} ${word}` : word;
        } else {
          acc[1] = acc[1] ? `${acc[1]} ${word}` : word;
        }

        return acc;
      },
      ["", ""],
    ),
  };
}

function StatIcon({ index, isDark }) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border md:h-14 md:w-14 ${iconBorderClass(isDark, "hero")} ${iconBgClass(isDark, "hero")}`}
    >
      <HomeIcon
        name={STAT_ICON_KEYS[index] || "chart"}
        tone={isDark ? "silver" : "black"}
        className="h-7 w-7 object-contain md:h-8 md:w-8"
      />
    </span>
  );
}

function MetaPill({ items, isDark }) {
  if (items.length === 0) return null;

  return (
    <div
      className={`inline-flex max-w-full items-center gap-0 overflow-x-auto whitespace-nowrap rounded-full border px-2.5 py-2.5 text-[13px] leading-[1.2] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-x-4 md:gap-y-2 md:px-6 md:py-3.5 md:text-[16px] ${
        isDark
          ? "border-[rgba(171,132,80,0.9)] bg-[rgba(10,10,10,0.7)] text-white"
          : "border-[rgba(171,132,80,0.58)] bg-[rgba(255,255,255,0.52)] text-[var(--color-text)]"
      }`}
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex shrink-0 items-center md:gap-4">
          {index > 0 ? <span aria-hidden="true" className="px-[1px] text-white/80 md:px-0">{"\u2022"}</span> : null}
          <span className={index === 1 ? "font-semibold text-[#AB8450]" : ""}>{item}</span>
        </span>
      ))}
    </div>
  );
}

function HeroTitle({ title, isDark, accentText }) {
  const cleanTitle = normalizeText(title);
  const accent = accentText && cleanTitle.includes(accentText) ? accentText : "Replacement Cost";
  const accentIndex = cleanTitle.indexOf(accent);
  const textClass = isDark ? "text-white" : "text-[var(--color-text)]";

  if (accentIndex === -1) {
    return <h1 className={`font-lora max-w-[700px] ${sectionH1} ${textClass}`}>{cleanTitle}</h1>;
  }

  return (
    <h1 className={`font-lora max-w-[700px] ${sectionH1} ${textClass}`}>
      {cleanTitle.slice(0, accentIndex)}
      <span style={{ color: GOLD }}>{accent}</span>
      {cleanTitle.slice(accentIndex + accent.length)}
    </h1>
  );
}

function StatCard({ item, index, isDark }) {
  const stat = splitStatLabel(item.label);

  return (
    <li
      className={`flex min-h-[108px] items-center gap-2 rounded-2xl border px-3 py-0 shadow-[0_20px_48px_rgba(0,0,0,0.22)] md:min-h-[82px] md:rounded-none md:border-0 md:border-r md:bg-transparent md:px-3 md:py-1.5 md:last:border-r-0 md:shadow-none ${
        isDark
          ? "border-white/14 bg-[linear-gradient(180deg,rgba(18,18,18,0.92)_0%,rgba(10,10,10,0.96)_100%)] md:border-white/14"
          : "border-[rgba(171,132,80,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(248,247,243,0.96)_100%)] md:border-[rgba(171,132,80,0.16)]"
      }`}
    >
      <StatIcon index={index} isDark={isDark} />
      <div className="min-w-0">
        {stat.value ? (
          <p className={`font-bold leading-none ${sectionHighlight} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{stat.value}</p>
        ) : null}
        <div className={`${stat.value ? "mt-0.5" : ""} space-y-0`}>
          {stat.lines.filter(Boolean).map((line) => (
            <p key={line} className={`font-medium uppercase leading-[1.02] ${sectionSmall} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function EngineHero({ data }) {
  const { theme } = useTheme();

  if (!data) return null;

  const isDark = theme === "dark";
  const metaItems = splitTagPill(data.tagPill);
  const accentToken = metaItems[1] || "";
  const description = normalizeText(data.subHeadline);
  const ctaLabel = data.primaryCta?.label
    ? normalizeText(data.primaryCta.label)
    : "Get Instant Quote →";

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-[var(--color-text)] ${homeSectionBg(isDark, 1)}`}>
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(180deg,#0a0a0a_0%,#111111_58%,#0a0a0a_100%)]"
              : "bg-[radial-gradient(circle_at_78%_64%,rgba(171,132,80,0.1)_0%,rgba(171,132,80,0)_24%),linear-gradient(180deg,#EFEEE9_0%,#F3F1EB_24%,#F8F7F3_100%)]"
          }`}
        />
        <div className="absolute inset-0 bg-[url('/Hero-dark.webp')] bg-cover bg-[center_right] opacity-25 mix-blend-screen md:opacity-35" />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.92)_36%,rgba(10,10,10,0.62)_58%,rgba(10,10,10,0.2)_74%,rgba(10,10,10,0.06)_100%)]"
              : "bg-[linear-gradient(90deg,rgba(239,238,233,0.98)_0%,rgba(239,238,233,0.94)_36%,rgba(239,238,233,0.72)_58%,rgba(239,238,233,0.26)_74%,rgba(239,238,233,0.08)_100%)]"
          }`}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-8xl flex-col px-3 pb-[6px] pt-0 md:px-6 md:pb-[12px] md:pt-1">
        <div className="grid items-start md:grid-cols-[minmax(0,1.02fr)_minmax(400px,0.98fr)] md:gap-2">
          <div className="order-1 min-w-0 max-w-[760px] pt-1 md:order-none md:self-start md:pt-2">
            <MetaPill items={metaItems} isDark={isDark} />

            <div className="mt-3 md:mt-3">
              <HeroTitle title={data.h1} isDark={isDark} accentText={accentToken} />
            </div>
            <div className="mt-3">
              <SectionFadeStrip isDark={isDark} />
            </div>

            <p className={`mt-3 max-w-full break-words px-0 ${sectionDescription} ${isDark ? "text-white/88" : "text-[var(--color-text-muted)]"}`}>
              {description.split("[BMW-VERIFIED]").map((part, index, array) => (
                <span key={`${part}-${index}`}>
                  {part}
                  {index < array.length - 1 ? <span className="text-[#AB8450]">[BMW-VERIFIED]</span> : null}
                </span>
              ))}
            </p>

            <HeroRegLookup ctaLabel={ctaLabel} className="mt-4 hidden md:flex" />
          </div>

          <div className="relative order-2 flex min-h-[240px] items-end justify-center md:min-h-[500px] md:justify-end">
            <div className="absolute inset-x-0 bottom-[8%] mx-auto h-[150px] w-[92%] rounded-[50%] border border-[rgba(171,132,80,0.28)] md:bottom-[3%] md:h-[220px] md:w-[86%]" />
            <div className="absolute inset-x-0 bottom-[11%] mx-auto h-[104px] w-[72%] rounded-[50%] border border-[rgba(171,132,80,0.18)] md:bottom-[7%] md:h-[152px] md:w-[64%]" />
            <Image
              src="/e90/engine.webp"
              alt={normalizeText(data.h1)}
              width={522}
              height={608}
              priority
              className="relative z-10 mx-auto h-auto w-[64%] max-w-[270px] object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.5)] md:ml-auto md:w-full md:max-w-[522px]"
            />
          </div>
        </div>

        <HeroRegLookup ctaLabel={ctaLabel} className="relative z-10 mt-4 md:hidden" />

        {data.trustStrip?.length > 0 ? (
          <ul
            className={`relative z-10 mt-3 grid grid-cols-2 gap-2.5 md:mt-[4px] md:grid-cols-4 md:gap-0 md:overflow-hidden md:rounded-2xl md:border md:shadow-[0_22px_56px_rgba(0,0,0,0.24)] ${
              isDark
                ? "md:border-white/14 md:bg-[linear-gradient(180deg,rgba(18,18,18,0.85)_0%,rgba(10,10,10,0.92)_100%)]"
                : "md:border-[rgba(171,132,80,0.16)] md:bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(248,247,243,0.94)_100%)]"
            }`}
          >
            {data.trustStrip.map((item, index) => (
              <StatCard key={`${item.label}-${index}`} item={item} index={index} isDark={isDark} />
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
