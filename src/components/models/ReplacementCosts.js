"use client";

import { useMemo, useState } from "react";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionDescription, sectionH2, sectionTableText } from "@/components/models/sectionTypography";

const TRUST_ICON_MAP = { pound: "pound", gear: "engine", wrench: "wrench", shield: "shield" };
const NOTE_ICON_MAP = { note: "note", info: "info", crown: "crown", chartShield: "chart" };

const carImages = {
  classic: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=760&q=85",
  e46: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=760&q=85",
  e90: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=760&q=85",
  f30: "https://images.unsplash.com/photo-1617814076668-cccd5e772c97?auto=format&fit=crop&w=760&q=85",
  g20: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=760&q=85",
};

const f30Fallback = {
  title: "F30/F31 - 3 Series (2012–2019)",
  columns: ["Variant", "Engine Code", "Used (Supply)", "Reconditioned (Supply)", "Rebuilt (Supply)", "Labour Hours"],
  rows: [
    {
      model: "316d–320d (N47 pre-2016)",
      engineCode: "N47D20C",
      usedSupply: "£1,800–£3,200",
      reconditionedSupply: "£3,200–£5,500",
      rebuiltSupply: "£4,500–£6,500",
      labourHours: "10–14 hrs",
    },
    {
      model: "316d–320d (B47 2016+)",
      engineCode: "B47D20A",
      usedSupply: "£1,500–£2,800",
      reconditionedSupply: "£2,800–£4,500",
      rebuiltSupply: "£3,800–£5,800",
      labourHours: "8–12 hrs",
    },
    {
      model: "325d–330d (N57)",
      engineCode: "N57D30",
      usedSupply: "£2,500–£4,500",
      reconditionedSupply: "£4,500–£7,000",
      rebuiltSupply: "£6,000–£9,000",
      labourHours: "12–16 hrs",
    },
    {
      model: "330i (B48)",
      engineCode: "B48B20",
      usedSupply: "£1,500–£2,800",
      reconditionedSupply: "£3,000–£5,000",
      rebuiltSupply: "£4,200–£6,500",
      labourHours: "10–14 hrs",
    },
    {
      model: "335i/340i (N55/B58)",
      engineCode: "N55B30 / B58B30",
      usedSupply: "£2,000–£4,000",
      reconditionedSupply: "£3,800–£6,000",
      rebuiltSupply: "£5,000–£8,000",
      labourHours: "10–16 hrs",
    },
  ],
};

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

function Icon({ type, isDark, className = "h-10 w-10" }) {
  const name = TRUST_ICON_MAP[type] || NOTE_ICON_MAP[type] || "info";
  return <HomeIcon name={name} isDark={isDark} gold className={`${className} object-contain`} />;
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const [main, accent = ""] = clean.split(/\s+(?:\u2014|-)\s+By\s+/);
  return { main, accent: accent ? `By ${accent}` : "" };
}

function tableKey(title = "") {
  const clean = cleanText(title).toLowerCase();
  if (clean.includes("classic")) return "classic";
  if (clean.includes("e46")) return "e46";
  if (clean.includes("e90")) return "e90";
  if (clean.includes("f30")) return "f30";
  if (clean.includes("g20")) return "g20";
  return "classic";
}

function tableLabel(title = "") {
  const clean = cleanText(title);
  const years = clean.match(/\(([^)]+)\)/)?.[1] || "";
  const label = clean.replace(/\s*\([^)]+\)\s*$/, "").replace(" - 3 Series", "");
  return { label, years };
}

function normalizeTables(tables = []) {
  const output = [];
  let insertedF30 = false;

  tables.forEach((table) => {
    const key = tableKey(table.title);

    if (key === "f30") {
      if (!insertedF30) {
        output.push(table.rows?.length ? table : f30Fallback);
        insertedF30 = true;
      }
      return;
    }

    if (table.rows?.length) output.push(table);
  });

  return output;
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
          <Icon type={item.icon} isDark={isDark} className="h-8 w-8 md:h-9 md:w-9" />
          <strong className="mt-1.5 text-[13px] leading-[1.1] text-[var(--color-text)] md:text-[15px]">{item.title}</strong>
          <span className="mt-0.5 text-[12px] leading-[1.1] text-[var(--color-text-muted)] md:text-[13px]">{item.text}</span>
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
      <table className="w-full border-collapse text-left text-[14px] text-[var(--color-text)] md:text-[15px]">
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
  const key = tableKey(table.title);
  const { label, years } = tableLabel(table.title);

  return (
    <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
      <div className="border border-r-0 border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3.5 md:rounded-l-md md:p-4">
        <h3 className="font-lora text-[17px] font-medium leading-[1.08] md:text-[19px]" style={{ color: GOLD }}>{label}</h3>
        <p className={`mt-1 ${sectionTableText}`}>{years}</p>
        <div className="mt-2 h-[82px] overflow-hidden rounded-md md:h-[96px]">
          <img src={carImages[key]} alt="" className="h-full w-full object-cover object-center" loading="lazy" />
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

  const key = tableKey(activeTable?.title);
  const active = tableLabel(activeTable?.title);

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
                <span className="block text-[0.95rem] font-bold leading-tight">{label.label}</span>
                <span className="mt-1 block text-[14px] leading-tight">{label.years}</span>
              </button>
            );
          })}
        </div>
      </div>

      <article className="rounded-b-md border border-t-0 border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
        <h3 className="font-lora text-[28px] font-medium leading-tight text-[var(--color-text)] md:text-[40px]">
          <span dangerouslySetInnerHTML={{ __html: active.label }} />{" "}
          <span style={{ color: GOLD }}>
            (<span dangerouslySetInnerHTML={{ __html: active.years }} />)
          </span>
        </h3>
        <div className="mt-3 h-[190px]">
          <img src={carImages[key]} alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[720px]">
            <CostTable table={activeTable} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-md bg-[var(--color-page-soft)] px-4 py-3 text-[15px] text-[var(--color-text)]">
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
        <div className="flex flex-col gap-3 border-[var(--color-border)] md:border-r md:pr-6">
          <div className="flex items-start gap-4">
            <Icon type="note" isDark={isDark} className="h-12 w-12 shrink-0" />
            <h3 className="font-bold" style={{ color: GOLD }}>
              Important Notes
            </h3>
          </div>
          <p className="pl-16 text-[15px] leading-[1.5] text-[var(--color-text)] md:pl-0" dangerouslySetInnerHTML={{ __html: parts.important }} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-4">
            <Icon type="info" isDark={isDark} className="h-10 w-10 shrink-0" />
            <h3 className="font-bold" style={{ color: GOLD }}>
              Labour Estimate
            </h3>
          </div>
          <p className="pl-14 text-[15px] leading-[1.5] text-[var(--color-text)] md:pl-0" dangerouslySetInnerHTML={{ __html: parts.labour }} />
        </div>
      </div>

      <div className="inline-flex w-fit max-w-[620px] flex-row gap-4 self-start rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-4 text-[var(--color-text)] md:p-5">
        <span className="hidden shrink-0 md:block">
          <Icon type="crown" isDark={isDark} className="h-12 w-12 md:h-16 md:w-16" />
        </span>
        <div className="max-w-[540px]">
          <h3 className="font-lora text-[22px] font-medium leading-[1.12] md:text-[28px]" style={{ color: GOLD }}>
            The ownership rule — generation is everything:
          </h3>
          <p className="mt-2 text-[14px] leading-[1.5] md:text-[15px]" dangerouslySetInnerHTML={{ __html: parts.rule.replace(/^The 3 Series rule - generation is everything:\s*/i, "") }} />
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
            <img src={carImages.classic} alt="" className="h-[170px] w-full object-cover object-center" loading="lazy" />
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

        <p className="mt-5 text-center text-[15px] text-[var(--color-text-soft)] md:hidden">
          All prices in GBP (£) &nbsp; • &nbsp; Supply only &nbsp; • &nbsp; Subject to availability and condition
        </p>
      </div>
    </section>
  );
}
