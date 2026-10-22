"use client";

import { useState } from "react";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionDescription, sectionTableText } from "@/components/models/sectionTypography";

const STAT_ICON_MAP = {
  shieldPound: "shield",
  gear: "engine",
  chart: "chart",
  award: "trophy",
  engine: "engine",
  why: "refresh",
  info: "info",
  file: "note",
};

const carImages = ["/right.webp", "/right.webp", "/right.webp", "/right.webp", "/right.webp", "/right.webp"];

const statItems = [
  { title: "7 Generations", text: "1975 to Present", icon: "shieldPound" },
  { title: "25+ Engine Families", text: "From M10 to B58", icon: "gear" },
  { title: "50 Years of Engineering", text: "Performance & Innovation", icon: "chart" },
  { title: "Built for Drivers", text: "Reliability + Dynamics", icon: "award" },
];

function cleanText(text = "") {
  return String(text)
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "\u2013")
    .replaceAll("â€“", "\u2013")
    .replaceAll("Ã¢â‚¬â€", "\u2014")
    .replaceAll("â€”", "\u2014")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const match = clean.match(/^(.*?)(\d{4}\s+to\s+Today)$/);
  return {
    main: match ? match[1].trim() : clean,
    accent: match ? match[2] : "",
  };
}

function eraParts(era = "") {
  const clean = cleanText(era);
  const [lead, detail = ""] = clean.split(/\s+\u2014\s+/);
  return { lead, detail };
}

function engineList(value = "") {
  return cleanText(value).split(",").map((item) => item.trim()).filter(Boolean);
}

function Icon({ type, isDark, className = "h-10 w-10" }) {
  if (type === "chevron" || type === "chevronUp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d={type === "chevronUp" ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
      </svg>
    );
  }
  return <HomeIcon name={STAT_ICON_MAP[type] || "info"} isDark={isDark} gold className={`${className} object-contain`} />;
}

function Stats({ isDark }) {
  return (
    <div className="grid grid-cols-4 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_8px_24px_var(--color-shadow)]">
      {statItems.map((item) => (
        <div key={item.title} className="flex flex-col items-center justify-center border-r border-[var(--color-border)] px-1.5 py-3 text-center last:border-r-0 md:px-4 md:py-3.5">
          <Icon type={item.icon} isDark={isDark} className="h-8 w-8 md:h-9 md:w-9" />
          <strong className="mt-1.5 text-[13px] leading-tight text-[var(--color-text)] md:text-[15px]">{item.title}</strong>
          <span className="mt-0.5 text-[12px] leading-tight text-[var(--color-text-muted)] md:text-[13px]">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function EngineBadges({ engines }) {
  const items = engineList(engines);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
      {items.map((engine) => (
        <strong key={engine} className="text-[13px] leading-[1.3] text-[var(--color-text)] md:text-[14px]" dangerouslySetInnerHTML={{ __html: engine }} />
      ))}
    </div>
  );
}

function DesktopTable({ eras, columns, isDark }) {
  return (
    <div className="hidden overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_8px_24px_var(--color-shadow)] md:block">
      <div className="grid grid-cols-[19%_10%_26%_22%_23%] text-[14px] font-bold text-white md:text-[15px]" style={{ backgroundColor: GOLD }}>
        {(columns || []).map((column) => (
          <div key={column} className="border-r border-white/20 px-4 py-2.5 last:border-r-0 md:px-5 md:py-3">
            {column}
          </div>
        ))}
      </div>
      {eras.map((era, index) => {
        const title = eraParts(era.era);

        return (
          <div key={era.era} className="grid grid-cols-[19%_10%_26%_22%_23%] border-t border-[var(--color-border)] text-[var(--color-text)]">
            <div className="border-r border-[var(--color-border)] px-4 py-3 md:px-5 md:py-4">
              <h3 className="font-lora text-[17px] font-medium leading-tight md:text-[19px]" style={{ color: GOLD }}>
                <span dangerouslySetInnerHTML={{ __html: title.lead }} />
                {title.detail ? (
                  <>
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: title.detail }} />
                  </>
                ) : null}
              </h3>
              <img src={carImages[index] || carImages[0]} alt="" className="mt-2 h-[66px] w-full object-cover object-center md:h-[78px]" loading="lazy" />
            </div>
            <div className={`flex items-center justify-center border-r border-[var(--color-border)] px-3 py-3.5 ${sectionTableText} font-bold md:px-4 md:py-4`}>{cleanText(era.years)}</div>
            <div className="flex items-center justify-center border-r border-[var(--color-border)] px-3 py-3.5 md:px-4 md:py-4">
              <EngineBadges engines={era.keyEngines} />
            </div>
            <p className={`border-r border-[var(--color-border)] px-4 py-4 ${sectionTableText} leading-[1.45] text-[var(--color-text)] md:px-6 md:py-5`} dangerouslySetInnerHTML={{ __html: cleanText(era.whyBmwChanged) }} />
            <p className={`px-4 py-4 ${sectionTableText} leading-[1.45] text-[var(--color-text)] md:px-6 md:py-5`} dangerouslySetInnerHTML={{ __html: cleanText(era.worthKnowing) }} />
          </div>
        );
      })}
    </div>
  );
}

function MobileAccordion({ eras, isDark }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3 md:hidden">
      {eras.map((era, index) => {
        const open = index === openIndex;
        const title = eraParts(era.era);

        return (
          <article key={era.era} className="rounded-md border bg-[var(--color-surface-raised)]" style={open ? { borderColor: GOLD } : undefined}>
            <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-center gap-4 p-4 text-left">
              <img src={carImages[index] || carImages[0]} alt="" className="h-[60px] w-[94px] shrink-0 object-cover object-center" loading="lazy" />
              <span className="min-w-0 flex-1">
                <strong className="font-lora block text-[18px] font-medium leading-tight md:text-[20px]" style={{ color: GOLD }}>
                  {title.lead}
                  {title.detail ? ` - ${title.detail}` : ""}
                </strong>
                <span className={`mt-1 block ${sectionTableText} text-[var(--color-text-muted)]`} dangerouslySetInnerHTML={{ __html: cleanText(era.years) }} />
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${open ? "text-white" : "bg-[#F5EAD4]"}`}
                style={open ? { backgroundColor: GOLD, color: "#fff" } : { color: GOLD }}
              >
                <Icon type={open ? "chevronUp" : "chevron"} className="h-6 w-6" />
              </span>
            </button>

            {open ? (
              <div className="mx-4 mb-4 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="grid grid-cols-[36%_64%] border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3 border-r border-[var(--color-border)] p-4 font-bold">
                    <Icon type="engine" isDark={isDark} className="h-8 w-8" />
                    Key Engines
                  </div>
                  <div className={`p-4 ${sectionTableText} text-[var(--color-text)]`} dangerouslySetInnerHTML={{ __html: cleanText(era.keyEngines) }} />
                </div>
                <div className="grid grid-cols-[36%_64%] border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3 border-r border-[var(--color-border)] p-4 font-bold">
                    <Icon type="why" isDark={isDark} className="h-8 w-8" />
                    Why It Changed
                  </div>
                  <div className={`p-4 ${sectionTableText} leading-[1.45] text-[var(--color-text)]`} dangerouslySetInnerHTML={{ __html: cleanText(era.whyBmwChanged) }} />
                </div>
                <div className="grid grid-cols-[36%_64%]">
                  <div className="flex items-center gap-3 border-r border-[var(--color-border)] p-4 font-bold">
                    <Icon type="info" isDark={isDark} className="h-8 w-8" />
                    Worth Knowing
                  </div>
                  <div className={`p-4 ${sectionTableText} leading-[1.45] text-[var(--color-text)]`} dangerouslySetInnerHTML={{ __html: cleanText(era.worthKnowing) }} />
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default function EngineEvolution({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const eras = data.eras || [];

  return (
    <section className={`py-6 text-[var(--color-text)] ${homeSectionBg(isDark, 9)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_600px] md:items-start">
          <div>
            <h2 className={`font-lora max-w-[760px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[45px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <span dangerouslySetInnerHTML={{ __html: title.main }} />
              {title.accent ? <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} /> : null}
            </h2>
            <div className="mt-3">
              <SectionFadeStrip isDark={isDark} />
            </div>
            <p className={`mt-3 max-w-[660px] ${sectionDescription} text-[var(--color-text-muted)]`}>
              {cleanText(data.subHeadline) ||
                "From early petrol and diesel families through to modern powertrains — how engineering, emissions and performance shaped every generation."}
            </p>
          </div>
          <Stats isDark={isDark} />
        </div>

        <div className="mt-6">
          <DesktopTable eras={eras} columns={data.columns} isDark={isDark} />
          <MobileAccordion eras={eras} isDark={isDark} />
        </div>

        <div className="mt-3 flex max-w-[780px] items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-2.5 text-[14px] text-[var(--color-text-muted)] md:px-5 md:py-3 md:text-[15px]">
          <Icon type="file" isDark={isDark} className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
          <p>
            All engine reliability insights and failure patterns are based on verified UK enquiries in 2025.{" "}
            <span style={{ color: GOLD }}>[MB-VERIFIED]</span>
          </p>
        </div>
      </div>
    </section>
  );
}
