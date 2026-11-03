"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";
import ukRegionsTopo from "@/data/maps/uk-regions-topo.json";

const ITEM_ICONS = ["warning", "gauge", "dollar", "tag", "clock", "chart"];

const NAMED_REGIONS = ["London", "South East", "North West"];

function parseRegionalDemand(value = "") {
  const tagMatch = value.match(/\s*\[([^\]]+)\]\s*$/);
  const tag = tagMatch ? tagMatch[1] : "";
  const clean = tagMatch ? value.slice(0, tagMatch.index) : value;
  const regions = clean
    .split(",")
    .map((part) => {
      const match = part.trim().match(/^(.*?)\s*\(([^)]+)\)$/);
      return match ? { name: match[1].trim(), share: match[2].trim() } : { name: part.trim(), share: "" };
    })
    .filter((region) => region.name);
  return { regions, tag };
}

const BUBBLE_POSITION = {
  London: "right-[10%] top-[58%]",
  "South East": "right-0 top-[74%]",
  "North West": "left-0 top-[22%]",
  "Other Regions": "left-[6%] bottom-0",
};

const CONNECTOR_LINE = {
  London: { x1: 78, y1: 62, x2: 61, y2: 56 },
  "South East": { x1: 88, y1: 76, x2: 66, y2: 68 },
  "North West": { x1: 12, y1: 26, x2: 36, y2: 22 },
  "Other Regions": { x1: 18, y1: 92, x2: 42, y2: 78 },
};

function parseMetric(value = "") {
  const tagMatch = value.match(/\s*\[([^\]]+)\]\s*$/);
  const tag = tagMatch ? tagMatch[1] : "";
  const clean = (tagMatch ? value.slice(0, tagMatch.index) : value).trim();

  const numberLead = /^(?:approximately\s+)?(£[\d,.]+|[\d,.]+%|[\d,.]+)\s*(.*)$/i;

  const dashIndex = clean.indexOf(" - ");
  if (dashIndex !== -1) {
    const left = clean.slice(0, dashIndex).trim();
    const right = clean.slice(dashIndex + 3).trim();
    const rightMatch = right.match(numberLead);
    if (rightMatch) {
      return { title: left, stat: rightMatch[1], subtext: rightMatch[2].trim(), tag };
    }
    // Descriptive "Title - note" (no number) → title uses heading font; note is subtext
    return { title: left, stat: "", subtext: right, tag };
  }

  const leadMatch = clean.match(numberLead);
  if (leadMatch && /^[\d£]/.test(clean)) {
    return { title: "", stat: leadMatch[1], subtext: leadMatch[2].trim(), tag };
  }
  return { title: "", stat: clean, subtext: "", tag };
}

function regionShare(regions, name) {
  const match = regions.find((region) => region.name === name);
  if (!match) return 0;
  const num = parseFloat(match.share);
  return Number.isNaN(num) ? 0 : num;
}

function fillForRegionGeoName(geoName, regions) {
  const isNamed = NAMED_REGIONS.includes(geoName);
  const share = isNamed ? regionShare(regions, geoName) : regionShare(regions, "Other Regions") / 6;
  const intensity = Math.min(share / 25, 1);
  const alpha = 0.18 + intensity * 0.65;
  return `rgba(171, 132, 80, ${alpha.toFixed(2)})`;
}

function RegionalDemandMap({ regions, isDark }) {
  const otherShare = regionShare(regions, "Other Regions");
  const bubbleRegions = [
    ...regions.filter((region) => NAMED_REGIONS.includes(region.name)),
    ...(otherShare ? [{ name: "Other Regions", share: `${otherShare}%` }] : []),
  ];

  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-4 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
    >
      <p className={`text-[0.85rem] font-bold uppercase tracking-wide ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        Regional Demand Breakdown
      </p>
      <div className="relative mt-4 min-h-[320px] w-full flex-1">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-1.8, 52.7], scale: 3200 }}
          className="absolute inset-0 h-full w-full"
        >
          <Geographies geography={ukRegionsTopo}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.EER13NM;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillForRegionGeoName(name, regions)}
                    stroke={isDark ? "rgba(2,7,17,0.9)" : "#F8F7F3"}
                    strokeWidth={0.75}
                    style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
          {bubbleRegions.map((region) => {
            const line = CONNECTOR_LINE[region.name];
            if (!line) return null;
            const midX = (line.x1 + line.x2) / 2;
            const midY = Math.min(line.y1, line.y2) - 6;
            return (
              <path
                key={region.name}
                d={`M ${line.x1} ${line.y1} Q ${midX} ${midY} ${line.x2} ${line.y2}`}
                fill="none"
                stroke={GOLD}
                strokeWidth="0.6"
                strokeLinecap="round"
                opacity="0.55"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {bubbleRegions.map((region) => (
          <div
            key={region.name}
            className={`absolute flex aspect-square h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border bg-[var(--color-surface)] p-1 text-center shadow-[0_8px_20px_var(--color-shadow)] md:h-20 md:w-20 md:p-1.5 ${BUBBLE_POSITION[region.name] || ""}`}
            style={{ borderColor: GOLD }}
          >
            <span className="text-[0.68rem] font-bold leading-none md:text-[0.95rem]" style={{ color: GOLD }}>
              {region.share}
            </span>
            <span className={`mt-1 text-[0.48rem] leading-[1.1] md:text-[0.6rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
              {region.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketIntelligence({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const items = data.items || [];
  const regionalItem = items.find((item) => item.label === "Regional Demand");
  const { regions, tag } = regionalItem ? parseRegionalDemand(regionalItem.value) : { regions: [], tag: "" };

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 9)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel number={9} isDark={isDark} />
            <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Market Intelligence
            </h2>

            {items.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
                {items.map((item, index) => {
                  if (item.label === "Regional Demand") {
                    return (
                      <div
                        key={item.label}
                        className={`flex flex-col gap-2 rounded-md border p-4 ${
                          isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}
                          >
                            <GenIcon name="chart" className="h-4.5 w-4.5" />
                          </span>
                          <p className="text-[0.72rem] font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
                            {item.label}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          {regions.map((region) => (
                            <div
                              key={region.name}
                              className={`flex items-center justify-between border-t py-1.5 first:border-t-0 first:pt-0 ${
                                isDark ? "border-white/10" : "border-[var(--color-border)]"
                              }`}
                            >
                              <span className={`text-[0.78rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{region.name}</span>
                              <span className={`text-[0.8rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{region.share}</span>
                            </div>
                          ))}
                        </div>
                        {tag ? <p className={`text-[0.62rem] font-semibold uppercase tracking-wide ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>{tag}</p> : null}
                      </div>
                    );
                  }
                  const { title, stat, subtext, tag: metricTag } = parseMetric(item.value);
                  return (
                    <div
                      key={item.label}
                      className={`flex flex-col justify-between rounded-xl border p-5 shadow-sm ${
                        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                          <GenIcon name={ITEM_ICONS[index % ITEM_ICONS.length]} className="h-5 w-5" />
                        </span>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className={`text-[0.7rem] font-medium ${isDark ? "text-white/55" : "text-[var(--color-text-soft)]"}`}>{item.label}</p>
                          {title ? (
                            <p className={`font-lora text-[0.95rem] font-medium leading-[1.2] tracking-normal md:text-[1.05rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                              {title}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      {stat ? (
                        <p
                          className={`mt-4 font-lora text-[16px] leading-tight md:text-[18px] ${title ? "font-extrabold" : "font-medium"}`}
                          style={{ color: GOLD }}
                        >
                          {stat}
                        </p>
                      ) : null}

                      <div className={`flex flex-col gap-1 ${stat || title ? "mt-2" : "mt-4"}`}>
                        {subtext ? <p className={`text-[0.72rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>{subtext}</p> : null}
                        {metricTag ? (
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
                            [{metricTag}]
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {regions.length > 0 ? (
            <div className="lg:col-span-4 lg:h-full">
              <RegionalDemandMap regions={regions} isDark={isDark} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
