"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
const STAT_ICON_MAP = {
  cube: "database",
  shield: "shield",
  chart: "chart",
  pound: "pound",
  database: "database",
  search: "insight",
  file: "note",
  droplet: "fuel",
  arrow: "trend",
  reset: "refresh",
};

const defaultFilters = {
  query: "",
  fuel: "",
  displacement: "",
  generation: "",
  sort: "enquiries",
};

function cleanText(text = "") {
  return String(text)
    .replaceAll("ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Â£", "\u00a3")
    .replaceAll("ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ", "\u2013")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“", "\u2013")
    .replaceAll("Ã¢â‚¬â€œ", "\u2013")
    .replaceAll("â€“", "\u2013")
    .replaceAll("ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â", "\u2014")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â", "\u2014")
    .replaceAll("Ã¢â‚¬â€", "\u2014")
    .replaceAll("â€”", "\u2014")
    .replaceAll("ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢", "\u2022")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢", "\u2022")
    .replaceAll("Ã¢â‚¬Â¢", "\u2022")
    .replaceAll("â€¢", "\u2022")
    .replaceAll("ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦", "\u2605")
    .replaceAll("ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â¦", "\u2605")
    .replaceAll("Ã¢Ëœâ€¦", "\u2605")
    .replaceAll("â˜…", "\u2605")
    .replaceAll("ÃƒÆ’Ã‚Â¢Ãƒâ€¹Ã…â€œÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ", "\u2606")
    .replaceAll("ÃƒÂ¢Ã‹Å“Ã¢â‚¬Â ", "\u2606")
    .replaceAll("Ã¢Ëœâ€ ", "\u2606")
    .replaceAll("â˜†", "\u2606")
    .replaceAll("ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½", "\u00bd")
    .replaceAll("Ãƒâ€šÃ‚Â½", "\u00bd")
    .replaceAll("Ã‚Â½", "\u00bd")
    .replaceAll("Â½", "\u00bd")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "The Complete Database";
  const index = clean.indexOf(marker);

  if (index === -1) return { main: clean, accent: "" };

  return {
    main: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function shortTitle(title = "") {
  return cleanText(title)
    .replace(/^BMW\s+/i, "")
    .replace("The Complete Database", "The Database");
}

function StatIcon({ type, isDark, className = "h-5 w-5" }) {
  return <HomeIcon name={STAT_ICON_MAP[type] || "database"} isDark={isDark} gold className={`${className} object-contain`} />;
}

function StatCard({ icon, value, label, isDark }) {
  return (
    <div className="min-h-[98px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_22px_var(--color-shadow)]">
      <div className="flex items-center gap-4">
        <span className="shrink-0">
          <StatIcon type={icon} isDark={isDark} className="h-6 w-6" />
        </span>
        <strong className="text-[1.05rem] leading-none text-[var(--color-text)]">{cleanText(value)}</strong>
      </div>
      <p className="mt-3 text-[13px] leading-[1.45] text-[var(--color-text)]" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

function Rating({ value }) {
  const rating = cleanText(value);
  const stars = Array.from({ length: 5 }, (_, index) => {
    const char = rating[index] || "\u2606";
    return char === "\u2605" || char === "\u00bd" ? "filled" : "empty";
  });

  if (rating.includes("\u00bd")) stars[3] = "half";

  return (
    <span className="inline-flex gap-0.5 text-[15px] leading-none">
      {stars.map((state, index) => (
        <span key={index} className={state === "empty" ? "text-[#cfd5dd]" : ""} style={state !== "empty" ? { color: GOLD } : undefined}>
          {state === "half" ? "\u00bd" : "\u2605"}
        </span>
      ))}
    </span>
  );
}

function cleanCost(value = "") {
  return cleanText(value)
    .replace(/\s*\[PLACEHOLDER.*?\]/, "")
    .replace(/\s*\[BMW-QUOTE\]/, "");
}

function enquiryNumber(value = "") {
  const clean = cleanText(value);
  if (!/^\d/.test(clean)) return 0;
  const match = clean.match(/^\d[\d,]*/);
  return match ? Number(match[0].replaceAll(",", "")) : 0;
}

function uniqueOptions(values) {
  return [...new Set(values.map(cleanText).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function engineMatchesQuery(engine, query) {
  if (!query.trim()) return true;
  const haystack = [
    engine.engineCode,
    engine.family,
    engine.fuel,
    engine.displacement,
    engine.power,
    engine.years,
    engine.model,
    engine.enquiries,
    engine.avgRebuildCost,
  ].map(cleanText).join(" ").toLowerCase();

  return haystack.includes(query.trim().toLowerCase());
}

function filterAndSortEngines(engines, filters) {
  const filtered = engines.filter((engine) => {
    const generation = cleanText(engine.model);

    return (
      engineMatchesQuery(engine, filters.query) &&
      (!filters.fuel || cleanText(engine.fuel) === filters.fuel) &&
      (!filters.displacement || cleanText(engine.displacement) === filters.displacement) &&
      (!filters.generation || generation.split(",").map((item) => item.trim()).includes(filters.generation))
    );
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "code") return cleanText(a.engineCode).localeCompare(cleanText(b.engineCode));
    if (filters.sort === "family") return cleanText(a.family).localeCompare(cleanText(b.family));

    const enquiryDelta = enquiryNumber(b.enquiries) - enquiryNumber(a.enquiries);
    return enquiryDelta || cleanText(a.engineCode).localeCompare(cleanText(b.engineCode));
  });
}

function filterOptions(engines) {
  const generations = engines.flatMap((engine) => cleanText(engine.model).split(",").map((item) => item.trim()).filter(Boolean));

  return {
    fuels: uniqueOptions(engines.map((engine) => engine.fuel)),
    displacements: uniqueOptions(engines.map((engine) => engine.displacement)),
    generations: uniqueOptions(generations),
  };
}

function applyNativeMobileFilters(section) {
  const query = section.querySelector('[data-filter="query"]')?.value.trim().toLowerCase() || "";
  const fuel = section.querySelector('[data-filter="fuel"]')?.value || "";
  const displacement = section.querySelector('[data-filter="displacement"]')?.value || "";
  const generation = section.querySelector('[data-filter="generation"]')?.value || "";
  const sort = section.querySelector('[data-filter="sort"]')?.value || "enquiries";
  const rows = [...section.querySelectorAll("[data-engine-row]")];
  let visibleCount = 0;

  rows
    .sort((a, b) => {
      if (sort === "code") return a.dataset.code.localeCompare(b.dataset.code);
      if (sort === "family") return a.dataset.family.localeCompare(b.dataset.family);
      return Number(b.dataset.enquiries) - Number(a.dataset.enquiries) || a.dataset.code.localeCompare(b.dataset.code);
    })
    .forEach((row, index) => {
      row.style.order = String(index);
      const matches =
        (!query || row.dataset.search.includes(query)) &&
        (!fuel || row.dataset.fuel === fuel) &&
        (!displacement || row.dataset.displacement === displacement) &&
        (!generation || row.dataset.generations.split("|").includes(generation));

      row.hidden = !matches || visibleCount >= 9;
      if (matches) visibleCount += 1;
    });

  const empty = section.querySelector("[data-engine-empty]");
  if (empty) empty.hidden = visibleCount > 0;
}

function DesktopTable({ engines }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
      <table className="w-full border-collapse text-left text-[13px] text-[var(--color-text)]">
        <thead>
          <tr style={{ backgroundColor: "rgba(171,132,80,0.14)" }}>
            {["Engine Code", "Family", "Fuel", "Disp.", "Power", "Years", "Gen.", "Reliability", "2025 Enquiries", "Avg. Recon Cost"].map((column) => (
              <th key={column} className="border-b border-r border-[var(--color-border)] px-3 py-3 text-center text-[13px] font-bold last:border-r-0">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {engines.slice(0, 10).map((row) => (
            <tr key={row.engineCode}>
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 font-bold" dangerouslySetInnerHTML={{ __html: cleanText(row.engineCode) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.family) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.fuel) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.displacement) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.power) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.years) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.model) }} />
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center"><Rating value={row.reliability} /></td>
              <td className="border-r border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanText(row.enquiries) }} />
              <td className="border-t border-[var(--color-border)] px-3 py-2.5 text-center" dangerouslySetInnerHTML={{ __html: cleanCost(row.avgRebuildCost) }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileControls({ filters, options, onChange, onReset, isDark }) {
  const selectClass =
    "min-h-11 w-full appearance-none rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-3 pr-10 text-[14px] text-[var(--color-text)]";
  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%237b7368' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "12px 12px",
  };
  const updateQuery = (event) => onChange({ query: event.currentTarget.value });

  return (
    <div className="space-y-2.5">
      <label className="flex min-h-12 items-center gap-2.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[14px] text-[var(--color-text-soft)]">
        <StatIcon type="search" isDark={isDark} />
        <input
          type="search"
          data-filter="query"
          value={filters.query}
          onInput={updateQuery}
          onChange={updateQuery}
          placeholder="Search engine code, family or notes..."
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--color-text-soft)]"
        />
      </label>
      <div className="grid grid-cols-2 gap-2.5">
        <select data-filter="fuel" className={selectClass} style={selectStyle} value={filters.fuel} onChange={(event) => onChange({ fuel: event.target.value })}>
          <option value="">Fuel Type</option>
          {options.fuels.map((fuel) => <option key={fuel} value={fuel}>{fuel}</option>)}
        </select>
        <select data-filter="displacement" className={selectClass} style={selectStyle} value={filters.displacement} onChange={(event) => onChange({ displacement: event.target.value })}>
          <option value="">Displacement</option>
          {options.displacements.map((displacement) => <option key={displacement} value={displacement}>{displacement}</option>)}
        </select>
        <select data-filter="generation" className={selectClass} style={selectStyle} value={filters.generation} onChange={(event) => onChange({ generation: event.target.value })}>
          <option value="">Generations</option>
          {options.generations.map((generation) => <option key={generation} value={generation}>{generation}</option>)}
        </select>
        <select data-filter="sort" className={selectClass} style={selectStyle} value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
          <option value="enquiries">Sort by Enquiries</option>
          <option value="code">Sort by Engine Code</option>
          <option value="family">Sort by Family</option>
        </select>
      </div>
      <button type="button" data-filter-reset onClick={onReset} className="flex min-h-11 w-full items-center justify-center gap-2.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] text-[var(--color-text)]">
        <StatIcon type="reset" isDark={isDark} />
        Reset filters
      </button>
    </div>
  );
}

function MobileTable({ engines, isDark }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[13px]">
      <div className="grid grid-cols-[1.15fr_0.85fr_1fr_36px] gap-x-1 px-2.5 py-2.5 text-[11px] font-bold uppercase leading-tight text-white" style={{ backgroundColor: GOLD }}>
        <span>Engine Code</span>
        <span>Fuel</span>
        <span>2025 Enquiries</span>
        <span className="text-center">View</span>
      </div>
      <div className="flex flex-col">
      {engines.map((row, index) => {
        const enquiries = enquiryNumber(row.enquiries);
        const generations = cleanText(row.model).split(",").map((item) => item.trim()).filter(Boolean);
        const search = [
          row.engineCode,
          row.family,
          row.fuel,
          row.displacement,
          row.power,
          row.years,
          row.model,
          row.enquiries,
          row.avgRebuildCost,
        ].map(cleanText).join(" ").toLowerCase();

        return (
          <div
            key={row.engineCode}
            data-engine-row
            data-search={search}
            data-fuel={cleanText(row.fuel)}
            data-displacement={cleanText(row.displacement)}
            data-generations={generations.join("|")}
            data-enquiries={enquiries}
            data-code={cleanText(row.engineCode)}
            data-family={cleanText(row.family)}
            hidden={index >= 9}
            className="grid grid-cols-[1.15fr_0.85fr_1fr_36px] items-center gap-x-1 border-t border-[var(--color-border)] px-2.5 py-2.5"
          >
            <span className="min-w-0 break-words font-bold" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: cleanText(row.engineCode) }} />
            <span className="flex min-w-0 items-center gap-1.5">
              <StatIcon type="droplet" isDark={isDark} className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0 truncate" dangerouslySetInnerHTML={{ __html: cleanText(row.fuel) }} />
            </span>
            <span className="font-bold" style={{ color: GOLD }}>{enquiries ? enquiries.toLocaleString("en-GB") : "-"}</span>
            <Link href="#" className="flex justify-center" style={{ color: GOLD }}><StatIcon type="arrow" isDark={isDark} className="h-3.5 w-3.5" /></Link>
          </div>
        );
      })}
      </div>
      <div data-engine-empty hidden className="border-t border-[var(--color-border)] px-3 py-4 text-center text-[14px] text-[var(--color-text-muted)]">
        No engine codes match these filters.
      </div>
      {engines.length === 0 ? (
        <div className="border-t border-[var(--color-border)] px-3 py-4 text-center text-[14px] text-[var(--color-text-muted)]">
          No engine codes match these filters.
        </div>
      ) : null}
    </div>
  );
}

export default function EngineDatabase({ data }) {
  const { theme } = useTheme();
  const [filters, setFilters] = useState(defaultFilters);
  const engines = useMemo(() => data?.engines || [], [data]);
  const mobileOptions = useMemo(() => filterOptions(engines), [engines]);
  const mobileEngines = useMemo(() => filterAndSortEngines(engines, filters), [engines, filters]);

  useEffect(() => {
    const section = document.querySelector("[data-engine-database]");
    if (!section) return undefined;

    const apply = () => applyNativeMobileFilters(section);
    const controls = [...section.querySelectorAll("[data-filter]")];
    const reset = section.querySelector("[data-filter-reset]");

    controls.forEach((control) => {
      control.addEventListener("input", apply);
      control.addEventListener("change", apply);
    });

    reset?.addEventListener("click", () => {
      controls.forEach((control) => {
        control.value = control.dataset.filter === "sort" ? "enquiries" : "";
      });
      apply();
    });

    section.dataset.filtersReady = "true";
    apply();

    return () => {
      controls.forEach((control) => {
        control.removeEventListener("input", apply);
        control.removeEventListener("change", apply);
      });
    };
  }, [engines]);

  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const shownDesktopCount = Math.min(10, engines.length);
  const totalEngineCount = engines.length;

  function updateFilters(next) {
    setFilters((current) => ({ ...current, ...next }));
  }

  return (
    <section id="engine-database" data-engine-database data-theme-mode={theme} className={`py-6 text-[var(--color-text)] ${homeSectionBg(isDark, 5)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="hidden md:block">
          <div>
            <h2 className={`font-lora max-w-[650px] text-[27px] font-medium tracking-normal md:text-[39px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <span dangerouslySetInnerHTML={{ __html: title.main }} />
              {title.accent ? (
                <>
                  <br />
                  <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
                </>
              ) : null}
            </h2>
            <div className="mt-2">
              <SectionFadeStrip isDark={isDark} />
            </div>
            {data.subHeadline ? (
              <p className="mt-2 max-w-[610px] text-[14px] leading-[1.45] text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: cleanText(data.subHeadline) }} />
            ) : null}
          </div>

          <div className="mt-5">
            <DesktopTable engines={engines} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <button
              type="button"
              className="flex min-h-11 min-w-[280px] items-center justify-between rounded-md border border-[var(--color-border)] px-5 text-[14px] font-medium transition-all duration-200 hover:opacity-90"
              style={{ color: GOLD }}
            >
              <span className="flex items-center gap-3">
                <StatIcon type="file" isDark={isDark} /> View all {totalEngineCount} engine codes
              </span>
              <span>v</span>
            </button>
            <p className="mr-auto border-l border-[var(--color-border)] pl-7 text-[12px] text-[var(--color-text-muted)]">
              Showing {shownDesktopCount} of {totalEngineCount} engine codes
            </p>
            <div className="flex items-center gap-5 rounded-md border border-[var(--color-border)] px-5 py-3 text-[13px]">
              <span>
                <Rating value="★☆☆☆☆" /> Poor
              </span>
              <span>
                <Rating value="★★★☆☆" /> Average
              </span>
              <span>
                <Rating value="★★★★☆" /> Good
              </span>
              <span>
                <Rating value="★★★★★" /> Excellent
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[12px] text-[var(--color-text-muted)]">
            <p className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5EAD4] font-bold" style={{ color: GOLD }}>
                i
              </span>
              All enquiries are from 2025 (to date) and verified via our internal system. Recon costs are supply only and exclude fitting.
            </p>
            <Link href="#" className="flex items-center gap-2 font-bold transition-all duration-200 hover:opacity-90" style={{ color: GOLD }}>
              How we collect engine data <StatIcon type="arrow" isDark={isDark} className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <h2 className={`font-lora text-[1.75rem] font-medium leading-[1.08] tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            <span dangerouslySetInnerHTML={{ __html: shortTitle(data.h2).replace("Engine Codes - The Database", "Engine Codes -") }} />
            <br />
            <span style={{ color: GOLD }}>The Database</span>
          </h2>
          <div className="mt-2.5">
            <SectionFadeStrip isDark={isDark} />
          </div>
          <p className={`mt-3 text-[0.9rem] leading-[1.45] text-[var(--color-text-muted)]`}>
            {cleanText(data.subHeadline) || "The complete engine-code database with real UK enquiry data, fitted models, and replacement cost insights."}
          </p>

          <div className="mt-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#F5EAD4]">
                <StatIcon type="database" isDark={isDark} className="h-6 w-6" />
              </span>
              <h3 className="min-w-0 flex-1 text-left text-[1.35rem] font-bold leading-[1.15]">Proprietary UK Data</h3>
            </div>
            <p className="mt-2.5 text-left text-[13px] leading-[1.45] text-[var(--color-text-muted)]">
              Every figure below is powered by real UK owner enquiries in 2025. This is data you won&apos;t find anywhere else.
            </p>
          </div>

          <div className="mt-4">
            <MobileControls filters={filters} options={mobileOptions} onChange={updateFilters} onReset={() => setFilters(defaultFilters)} isDark={isDark} />
          </div>

          <div className="mt-4">
            <MobileTable engines={mobileEngines} isDark={isDark} />
          </div>

          <div className="mt-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-[13px] leading-[1.5]">
            <h3 className="font-bold uppercase" style={{ color: GOLD }}>
              Data sources:
            </h3>
            <div className="mt-3 space-y-3">
              <p className="flex items-start gap-2.5">
                <StatIcon type="chart" isDark={isDark} className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <strong>Enquiry volumes:</strong>
                  <br />
                  EM_Proprietary_Data_2025.txt [EM-VERIFIED]
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <StatIcon type="pound" isDark={isDark} className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <strong>Costs:</strong>
                  <br />
                  Table A - Engine Replacement Economics [EM-QUOTE]
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <StatIcon type="file" isDark={isDark} className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0">
                  <strong>Engine codes:</strong>
                  <br />
                  Cross-referenced from your existing data
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
