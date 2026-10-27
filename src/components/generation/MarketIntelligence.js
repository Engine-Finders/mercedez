"use client";

import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "./GenIcons";

function splitVehicle(vehicle = "") {
  const match = vehicle.match(/^(.*?)\s((?:E|F|G|W|C|X|R)\d{2,3}\b.*)$/i);
  if (!match) return { model: vehicle, chassis: "" };
  return { model: match[1], chassis: match[2] };
}

function splitEnquiries(enquiries = "") {
  const [count, ...rest] = enquiries.split(" ");
  return { count, label: rest.join(" ") };
}

function StatCard({ icon, title, children, isDark }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-md border p-3 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}
        >
          <GenIcon name={icon} className="h-4 w-4" />
        </span>
        <p className="text-[0.68rem] font-semibold uppercase leading-[1.25] tracking-wide" style={{ color: GOLD }}>
          {title}
        </p>
      </div>
      {children}
    </div>
  );
}

function RankedList({ items, isDark }) {
  return (
    <ol className="flex flex-col gap-1">
      {items?.map((item, index) => (
        <li key={item} className={`flex gap-1.5 text-[0.74rem] leading-[1.3] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          <span className="font-semibold" style={{ color: GOLD }}>
            {index + 1}.
          </span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  );
}

export default function MarketIntelligence({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const feedBg = isDark ? "bg-black" : "bg-[var(--color-table-surface)]";
  const feedBorder = isDark ? "border-white/10" : "border-[var(--color-border)]";
  const feedText = isDark ? "text-white" : "text-[var(--color-text)]";
  const feedMuted = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const feedSoft = isDark ? "text-white/50" : "text-[var(--color-text-soft)]";
  const feedHeaderBg = isDark ? "bg-white/[0.03]" : "bg-[var(--color-page-soft)]";
  const feedImageBg = isDark ? "bg-white/5" : "bg-[var(--color-page-soft)]";

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 9)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <SectionLabel number={9} isDark={isDark} />
            <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Market Intelligence
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard icon="chart" title="Most Requested Engines" isDark={isDark}>
                <RankedList items={data.mostRequestedEngines} isDark={isDark} />
              </StatCard>
              <StatCard icon="car" title="Most Requested Variants" isDark={isDark}>
                <RankedList items={data.mostRequestedVariants} isDark={isDark} />
              </StatCard>
              <StatCard icon="dollar" title="Average Replacement Cost" isDark={isDark}>
                <p className={`text-[1.5rem] font-bold ${isDark ? "text-white" : "text-[var(--color-text)]"}`} dangerouslySetInnerHTML={{ __html: data.averageReplacementCost }} />
                {data.averageReplacementCostNote ? (
                  <p className={`text-[0.68rem] leading-[1.3] ${feedSoft}`} dangerouslySetInnerHTML={{ __html: data.averageReplacementCostNote }} />
                ) : null}
              </StatCard>
              <StatCard icon="warning" title="Most Common Failures" isDark={isDark}>
                <RankedList items={data.mostCommonFailures} isDark={isDark} />
              </StatCard>
            </div>
          </div>

          {data.liveFeed?.length > 0 ? (
            <div className={`overflow-hidden rounded-md border shadow-[0_14px_40px_var(--color-shadow)] backdrop-blur ${feedBorder} ${feedBg}`}>
              <div className={`flex items-center gap-2 border-b px-4 py-3 text-[0.85rem] font-semibold uppercase tracking-wide ${feedBorder} ${feedText}`}>
                <span style={{ color: GOLD }}>
                  <GenIcon name="gauge" className="h-4 w-4" />
                </span>
                <span style={{ color: GOLD }}>Live Feed</span>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[560px] md:min-w-0">
                  <div className={`grid grid-cols-[1.3fr_0.9fr_1fr_0.7fr] gap-2 border-b px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-wide ${feedBorder} ${feedHeaderBg} ${feedSoft}`}>
                    <span>Vehicle</span>
                    <span>Location</span>
                    <span>Issue</span>
                    <span>Enquiries</span>
                  </div>

                  {data.liveFeed.map((row, index) => {
                    const { model, chassis } = splitVehicle(row.vehicle);
                    const { count, label } = splitEnquiries(row.enquiries);
                    return (
                      <div
                        key={`${row.vehicle}-${row.location}`}
                        className={`grid grid-cols-[1.3fr_0.9fr_1fr_0.7fr] items-center gap-2 px-4 py-3 text-[0.8rem] ${feedText} ${
                          index === data.liveFeed.length - 1 ? "" : `border-b ${feedBorder}`
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`relative h-8 w-11 shrink-0 overflow-hidden rounded ${feedImageBg}`}>
                            <Image src="/right.webp" alt={model} fill className="object-cover" sizes="44px" />
                          </span>
                          <div className="min-w-0">
                            <p className={`truncate font-semibold ${feedText}`} dangerouslySetInnerHTML={{ __html: model }} />
                            {chassis ? <p className={`truncate text-[0.7rem] ${feedSoft}`} dangerouslySetInnerHTML={{ __html: chassis }} /> : null}
                          </div>
                        </div>

                        <div className={`flex items-center gap-1.5 ${feedMuted}`}>
                          <span style={{ color: GOLD }}>
                            <GenIcon name="pin" className="h-3.5 w-3.5 shrink-0" />
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: row.location }} />
                        </div>

                        <div className={`flex items-center gap-1.5 ${feedMuted}`}>
                          <span style={{ color: GOLD }}>
                            <GenIcon name="warning" className="h-3.5 w-3.5 shrink-0" />
                          </span>
                          <span dangerouslySetInnerHTML={{ __html: row.issue }} />
                        </div>

                        <div className="leading-[1.25]">
                          <p className={`font-semibold ${feedText}`} dangerouslySetInnerHTML={{ __html: count }} />
                          {label ? <p className={`text-[0.7rem] ${feedSoft}`} dangerouslySetInnerHTML={{ __html: label }} /> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {data.liveFeed[0]?.updated ? (
                <div className={`flex items-center justify-end gap-1.5 border-t px-4 py-2.5 text-[0.72rem] ${feedBorder} ${feedSoft}`}>
                  <span style={{ color: GOLD }}>
                    <GenIcon name="refresh" className="h-3.5 w-3.5 shrink-0" />
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: data.liveFeed[0].updated }} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
