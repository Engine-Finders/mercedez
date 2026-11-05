"use client";

import { useMemo, useState } from "react";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import {
  sectionBody,
  sectionDescription,
  sectionH2,
  sectionH3,
  sectionH4,
  sectionH6,
  sectionSmall,
  sectionTableText,
} from "@/components/models/sectionTypography";

const TRUST_ICON_MAP = { pound: "pound", gear: "engine", wrench: "wrench", shield: "shield" };
const NOTE_ICON_MAP = { note: "note", info: "info", crown: "crown", chartShield: "chart" };

const FALLBACK_CAR = "/model/Hero-bg-image.webp";

const trustItems = [
  { title: "Transparent", text: "Real UK Prices", icon: "pound" },
  { title: "Quality Assured", text: "Tested Engines", icon: "gear" },
  { title: "Fitted by Experts", text: "Trusted Garages", icon: "wrench" },
  { title: "12 Months", text: "Warranty", icon: "shield" },
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

function Icon({ type, isDark, gold = false, className = "h-10 w-10" }) {
  const name = TRUST_ICON_MAP[type] || NOTE_ICON_MAP[type] || "info";
  return <HomeIcon name={name} isDark={isDark} gold={gold} className={`${className} object-contain`} />;
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const [main, accent = ""] = clean.split(/\s+(?:\u2014|-)\s+By\s+/);
  return { main, accent: accent ? `By ${accent}` : "" };
}

function tableLabel(title = "") {
  const clean = cleanText(title);
  const years = clean.match(/\(([^)]+)\)/)?.[1] || "";
  const label = clean.replace(/\s*\([^)]+\)\s*$/, "").replace(" - 3 Series", "");
  return { label, years };
}

function tableImage(table) {
  return table?.image?.src || FALLBACK_CAR;
}

function normalizeTables(tables = []) {
  return (tables || []).filter((table) => table?.rows?.length);
}

function splitFiguresNote(note = "") {
  const clean = cleanText(note);
  const [labour = "", rule = ""] = clean.split(" The 3 Series rule ");
  return {
    important: "N47D20C, B47D20A, N57D30, B58B30 figures [BMW-QUOTE]; older engines [PLACEHOLDER - confirm vs cost sheet].",
    labour: labour.replace(/^Labour estimate:\s*/i, ""),
    rule: rule ? `The 3 Series rule ${rule}` : "",
  };
}

function TrustStrip({ isDark }) {
  return (
    <div className="grid grid-cols-4 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_8px_24px_var(--color-shadow)]">
      {trustItems.map((item) => (
        <div key={item.title} className="flex flex-col items-center justify-center border-r border-[var(--color-border)] px-1.5 py-3 text-center last:border-r-0 md:px-4 md:py-3.5">
          <Icon type={item.icon} isDark={isDark} gold className="h-8 w-8 md:h-9 md:w-9" />
          <strong className={`mt-1.5 leading-[1.1] text-[var(--color-text)] ${sectionTableText}`}>{item.title}</strong>
          <span className={`mt-0.5 leading-[1.1] text-[var(--color-text-muted)] ${sectionSmall}`}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function CostTable({ table }) {
  if (!table) return null;

  const columns = table.columns || [];

  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
      <table className={`w-full border-collapse text-left text-[var(--color-text)] ${sectionTableText}`}>
        <thead>
          <tr className="text-white" style={{ backgroundColor: GOLD }}>
            {columns.map((column) => (
              <th key={column} className="border-r border-white/20 px-2 py-2 text-left font-bold last:border-r-0 md:px-4 md:py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(table.rows || []).map((row) => (
            <tr key={`${row.model}-${row.engineCode}`}>
              <td className="border-r border-t border-[var(--color-border)] px-2 py-2 font-bold md:px-4 md:py-2">{cleanText(row.model)}</td>
              <td className="border-r border-t border-[var(--color-border)] px-2 py-2 md:px-4 md:py-2">{cleanText(row.engineCode)}</td>
              <td className="border-r border-t border-[var(--color-border)] px-2 py-2 md:px-4 md:py-2" style={{ color: GOLD }}>{cleanText(row.usedSupply)}</td>
              <td className="border-r border-t border-[var(--color-border)] px-2 py-2 md:px-4 md:py-2" style={{ color: GOLD }}>{cleanText(row.reconditionedSupply)}</td>
              <td className="border-r border-t border-[var(--color-border)] px-2 py-2 md:px-4 md:py-2" style={{ color: GOLD }}>{cleanText(row.rebuiltSupply)}</td>
              <td className="border-t border-[var(--color-border)] px-2 py-2 text-center md:px-4 md:py-2">{cleanText(row.labourHours)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DesktopGenerationRow({ table }) {
  const { label, years } = tableLabel(table.title);
  const src = tableImage(table);

  return (
    <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
      <div className="border border-r-0 border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3.5 md:rounded-l-md md:p-4">
        <h3 className={`font-lora font-medium leading-[1.08] ${sectionH6}`} style={{ color: GOLD }}>{label}</h3>
        <p className={`mt-1 ${sectionTableText}`}>{years}</p>
        <div className="mt-2 h-[82px] overflow-hidden rounded-md md:h-[96px]">
          <img src={src} alt={table.image?.alt || label} className="h-full w-full object-cover object-center" loading="lazy" />
        </div>
      </div>
      <CostTable table={table} />
    </div>
  );
}

function MobileTabs({ tables, isDark }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTable = tables[activeIndex] || tables[0];
  if (!activeTable) return null;

  const active = tableLabel(activeTable?.title);
  const activeSrc = tableImage(activeTable);

  return (
    <div className="md:hidden">
      <div className="overflow-hidden rounded-t-md border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex overflow-x-auto">
          {tables.map((table, index) => {
            const label = tableLabel(table.title);
            const selected = index === activeIndex;

            return (
              <button
                key={table.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`min-w-[150px] border-r border-[var(--color-border)] px-3 py-3.5 text-center last:border-r-0 transition-all duration-200 ${
                  selected ? "text-white" : "bg-[var(--color-surface)] text-[var(--color-text)]"
                }`}
                style={selected ? { backgroundColor: GOLD } : undefined}
              >
                <span className={`block font-bold leading-tight ${sectionTableText}`}>{label.label}</span>
                <span className={`mt-1 block leading-tight ${sectionSmall}`}>{label.years}</span>
              </button>
            );
          })}
        </div>
      </div>

      <article className="rounded-b-md border border-t-0 border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
        <h3 className={`font-lora font-medium leading-tight text-[var(--color-text)] ${sectionH3}`}>
          <span dangerouslySetInnerHTML={{ __html: active.label }} />{" "}
          <span style={{ color: GOLD }}>
            (<span dangerouslySetInnerHTML={{ __html: active.years }} />)
          </span>
        </h3>
        <div className="mt-3 h-[190px]">
          <img src={activeSrc} alt={activeTable.image?.alt || active.label} className="h-full w-full object-contain" loading="lazy" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[720px]">
            <CostTable table={activeTable} />
          </div>
        </div>
        <div className={`mt-4 flex items-center gap-3 rounded-md bg-[var(--color-page-soft)] px-4 py-3 text-[var(--color-text)] ${sectionBody}`}>
          <Icon type="info" isDark={isDark} className="h-7 w-7 shrink-0" />
          Prices are supply only. Labour and ancillary parts extra.
        </div>
      </article>
    </div>
  );
}

function Notes({ parts, isDark }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 md:grid-cols-2">
        <div className="flex flex-col gap-2.5 border-[var(--color-border)] md:border-r md:pr-6">
          <div className="flex items-center justify-start gap-3">
            <Icon type="note" isDark={isDark} className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
            <h3 className="font-bold leading-none" style={{ color: GOLD }}>
              Important Notes
            </h3>
          </div>
          <p className={`text-[var(--color-text)] ${sectionBody}`} dangerouslySetInnerHTML={{ __html: parts.important }} />
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-start gap-3">
            <Icon type="info" isDark={isDark} className="h-10 w-10 shrink-0" />
            <h3 className="font-bold leading-none" style={{ color: GOLD }}>
              Labour Estimate
            </h3>
          </div>
          <p className={`text-[var(--color-text)] ${sectionBody}`} dangerouslySetInnerHTML={{ __html: parts.labour }} />
        </div>
      </div>

      <div className="inline-flex w-fit max-w-[620px] flex-row gap-4 self-start rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-4 text-[var(--color-text)] md:p-5">
        <span className="hidden shrink-0 md:block">
          <Icon type="crown" isDark={isDark} className="h-12 w-12 md:h-16 md:w-16" />
        </span>
        <div className="max-w-[540px]">
          <h3 className={`font-lora font-medium leading-[1.12] ${sectionH4}`} style={{ color: GOLD }}>
            The ownership rule - generation is everything:
          </h3>
          <p className={`mt-2 ${sectionTableText}`} dangerouslySetInnerHTML={{ __html: parts.rule.replace(/^The 3 Series rule - generation is everything:\s*/i, "") }} />
          <p className="mt-2 font-bold">Value the car first; the engine decision follows.</p>
        </div>
      </div>
    </div>
  );
}

export default function ReplacementCosts({ data }) {
  const { theme } = useTheme();
  const tables = useMemo(() => normalizeTables(data?.tables || []), [data]);
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const notes = splitFiguresNote(data.figuresNote || data.labourEstimate);

  return (
    <section className={`py-6 text-[var(--color-text)] ${homeSectionBg(isDark, 8)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:grid md:grid-cols-[minmax(0,1fr)_560px] md:items-start">
          <div>
            <h2 className={`font-lora max-w-[620px] font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
              <span dangerouslySetInnerHTML={{ __html: title.main }} />
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
            {data.subHeadline ? <p className={`mt-3 max-w-[520px] ${sectionDescription} text-[var(--color-text-muted)]`}>{cleanText(data.subHeadline)}</p> : null}
          </div>

          <div className="hidden md:block">
            <TrustStrip isDark={isDark} />
          </div>

          <div className="mt-1 w-full overflow-hidden rounded-md md:hidden">
            <img src={tableImage(tables[0])} alt={tables[0]?.image?.alt || ""} className="h-[170px] w-full object-cover object-center" loading="lazy" />
          </div>

          <div className="md:hidden">
            <TrustStrip isDark={isDark} />
          </div>
        </div>

        {tables.length > 0 ? (
          <>
            <div className="mt-6 hidden space-y-3 md:block">
              {tables.map((table) => (
                <DesktopGenerationRow key={table.title} table={table} />
              ))}
            </div>

            <div className="mt-6">
              <MobileTabs tables={tables} isDark={isDark} />
            </div>
          </>
        ) : null}

        <div className="mt-5">
          <Notes parts={notes} isDark={isDark} />
        </div>

        <p className={`mt-5 text-center text-[var(--color-text-soft)] md:hidden ${sectionDescription}`}>
          All prices in GBP (£) &nbsp; • &nbsp; Supply only &nbsp; • &nbsp; Subject to availability and condition
        </p>
      </div>
    </section>
  );
}
