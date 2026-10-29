"use client";

import { Fragment } from "react";
import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const DESKTOP_COLS = "grid-cols-[1.6fr_0.9fr_1fr_1.7fr]";
const MOBILE_COLS = "grid-cols-[220px_110px_140px_240px]";

const TRUST_TICKER = [
  { icon: "shield", label: "20+ Vetted Specialists UK Network" },
  { icon: "check", label: "12-Month Warranty as Standard" },
  { icon: "truck", label: "Nationwide Delivery & Collection" },
  { icon: "dollar", label: "Transparent Pricing, No Hidden Fees" },
  { icon: "users", label: "Thousands of Owners Helped" },
];

function repairableTone(repairable = "") {
  if (repairable.includes("✅")) return "text-[#13884a]";
  if (repairable.includes("❌")) return "text-[#db2e2e]";
  return "text-[#da7a12]";
}

function Table({ columns, rows, cols, headerBg, headerDivider, isDark, goldHeader }) {
  const rowClass = isDark ? "bg-black text-white" : "bg-[var(--color-table-surface)] text-[var(--color-text)]";
  const cellDivider = isDark ? "border-white/15" : "border-[var(--color-border)]";
  const mutedText = isDark ? "text-white/70" : "text-[var(--color-text-muted)]";
  const borderBottom = isDark ? "border-white/15" : "border-[var(--color-border)]";

  return (
    <div className={`grid ${cols} gap-px`}>
      {columns?.map((col, index) => (
        <span
          key={col}
          className={`${headerBg} px-4 py-2.5 text-[0.72rem] font-semibold text-white ${index > 0 ? `border-l ${headerDivider}` : ""}`}
          style={goldHeader ? { backgroundColor: GOLD } : undefined}
        >
          {col}
        </span>
      ))}

      {rows?.map((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;
        const cellBorderBottom = isLastRow ? "" : `border-b ${borderBottom}`;
        return (
          <Fragment key={row.problem}>
            <span className={`${rowClass} px-4 py-2 text-[0.8rem] font-semibold ${cellBorderBottom}`} dangerouslySetInnerHTML={{ __html: row.problem }} />
            <span className={`${rowClass} border-l ${cellDivider} px-4 py-2 text-[0.8rem] font-semibold ${cellBorderBottom} ${repairableTone(row.repairable)}`}>
              {row.repairable}
            </span>
            <span className={`${rowClass} border-l ${cellDivider} px-4 py-2 text-[0.8rem] ${cellBorderBottom} ${mutedText}`}>{row.typicalCost}</span>
            <span
              className={`${rowClass} border-l ${cellDivider} px-4 py-2 text-[0.8rem] ${cellBorderBottom} ${mutedText}`}
              dangerouslySetInnerHTML={{ __html: row.whenItMakesSense }}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

function CheckList({ title, items, icon, tone, toneBorder, toneBg }) {
  if (!items?.length) return null;
  return (
    <div className={`flex h-full flex-1 flex-col rounded-md border ${toneBorder} ${toneBg}`}>
      <p className={`flex items-center gap-2 border-b ${toneBorder} p-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide ${tone}`}>
        <GenIcon name={icon} className="h-4 w-4" />
        {title}
      </p>
      <ul className="flex flex-1 flex-col">
        {items.map((item, index) => (
          <li
            key={item}
            className={`flex items-start gap-2 px-4 py-2 text-[0.82rem] leading-[1.4] text-[var(--color-text-muted)] ${
              index > 0 ? `border-t ${toneBorder}` : ""
            }`}
          >
            <GenIcon name={icon} className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tone}`} />
            <span dangerouslySetInnerHTML={{ __html: item.replace(/^\*\s*/, "") }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RepairBuyOrReplace({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  // Keep existing header images
  const image = isDark ? "/320d/repair_dark.webp" : "/320d/repair_light.webp";
  const imageMobile = isDark ? "/320d/repair_mobile_dark.webp" : "/320d/repair_mobile_light.webp";
  const headerBg = isDark ? "bg-[var(--color-chrome)]" : "";
  const headerDivider = isDark ? "border-white/20" : "border-white/25";
  const headingClass = isDark ? "text-white" : "text-[var(--color-text)]";
  const bodyTextClass = isDark ? "text-white/80" : "text-[var(--color-text-muted)]";

  return (
    <section className={`w-full text-[var(--color-text)] ${homeSectionBg(isDark, 6)}`}>
      {/* Mobile header image kept */}
      <div className="relative w-full overflow-hidden md:hidden">
        <div className="relative h-[220px] w-full">
          <Image src={imageMobile} alt="" fill className="object-contain" sizes="100vw" priority />
          <div
            className={
              isDark
                ? "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
                : "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,#F8F7F3_0%,transparent_100%)]"
            }
          />
        </div>

        <div className="mx-auto w-full max-w-8xl px-4 pb-8">
          <SectionLabel number={6} isDark={isDark} />
          <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal ${headingClass}`}>{data.h2}</h2>
          <p className={`mt-4 max-w-[560px] text-[0.88rem] leading-[1.45] ${bodyTextClass}`}>
            Every engine has a story. Make the right call with clear data, real-world costs, and honest guidance from UK specialists.
          </p>
        </div>
      </div>

      {/* Desktop header image kept */}
      <div className="relative hidden w-full overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={image} alt="" fill className="object-cover object-right" sizes="100vw" />
          {isDark ? (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,17,0.95)_0%,rgba(2,7,17,0.75)_45%,rgba(2,7,17,0.15)_85%)]" />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,247,243,0.96)_0%,rgba(248,247,243,0.78)_45%,rgba(248,247,243,0.12)_85%)]" />
          )}
        </div>

        <div className="relative mx-auto w-full max-w-8xl px-4 py-8 md:px-8 md:py-10">
          <SectionLabel number={6} isDark={isDark} />
          <h2 className={`font-lora max-w-[600px] text-[42px] font-medium leading-[1.08] tracking-normal ${headingClass}`}>{data.h2}</h2>
          <p className={`mt-4 max-w-[560px] text-[0.88rem] leading-[1.45] md:text-[1rem] ${bodyTextClass}`}>
            Every engine has a story. Make the right call with clear data, real-world costs, and honest guidance from UK specialists.
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-8xl px-4 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data.canItBeRepaired ? (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg md:border-0 md:bg-transparent md:p-0 md:shadow-none">
              <p className="flex items-center gap-2 text-[0.95rem] font-bold uppercase tracking-wide text-[var(--color-text)]">
                <span style={{ color: GOLD }}>
                  <GenIcon name="wrench" className="h-4.5 w-4.5" />
                </span>
                {data.canItBeRepaired.title}
              </p>
              <div className="mt-3 overflow-x-auto rounded-md border border-[var(--color-border)] shadow-[0_14px_40px_var(--color-shadow)]">
                <div className="min-w-[650px] lg:min-w-0">
                  <div className="hidden lg:block">
                    <Table
                      columns={data.canItBeRepaired.columns}
                      rows={data.canItBeRepaired.rows}
                      cols={DESKTOP_COLS}
                      headerBg={headerBg}
                      headerDivider={headerDivider}
                      isDark={isDark}
                      goldHeader={!isDark}
                    />
                  </div>
                  <div className="lg:hidden">
                    <Table
                      columns={data.canItBeRepaired.columns}
                      rows={data.canItBeRepaired.rows}
                      cols={MOBILE_COLS}
                      headerBg={headerBg}
                      headerDivider={headerDivider}
                      isDark={isDark}
                      goldHeader={!isDark}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {data.buyingChecks ? (
            <div className="flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg md:border-0 md:bg-transparent md:p-0 md:shadow-none">
              <p className="flex items-center gap-2 text-[0.95rem] font-bold uppercase tracking-wide text-[var(--color-text)]">
                <span style={{ color: GOLD }}>
                  <GenIcon name="cart" className="h-4.5 w-4.5" />
                </span>
                {data.buyingChecks.title}
              </p>
              <div className="mt-3 grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                <CheckList
                  title="Buy If"
                  items={data.buyingChecks.buyIf}
                  icon="check"
                  tone="text-[#13884a]"
                  toneBorder="border-[#189454]/40"
                  toneBg="bg-[rgba(16,163,74,0.08)]"
                />
                <CheckList
                  title="Avoid If"
                  items={data.buyingChecks.avoidIf}
                  icon="warning"
                  tone="text-[#db2e2e]"
                  toneBorder="border-[#db2e2e]/40"
                  toneBg="bg-[rgba(219,46,46,0.08)]"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.closingVerdict ? (
            <div
              className={`flex flex-col gap-2 rounded-md border p-4 ${
                isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                  <GenIcon name="shield" className="h-4.5 w-4.5" />
                </span>
                <p className="text-[0.72rem] font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
                  Closing Verdict
                </p>
              </div>
              <p className={`w-full text-[0.85rem] leading-[1.5] ${isDark ? "text-white" : "text-[var(--color-text)]"}`} dangerouslySetInnerHTML={{ __html: data.closingVerdict }} />
            </div>
          ) : null}

          {data.cta?.label ? (
            <div
              className={`relative hidden flex-col gap-3 overflow-hidden rounded-md border p-4 md:flex ${
                isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
              }`}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-2/3">
                <Image src="/320d/engine.webp" alt="" fill className="object-contain object-right opacity-15" sizes="300px" />
              </div>

              <div className="relative z-10 flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}
                >
                  <GenIcon name="dollar" className="h-4.5 w-4.5" />
                </span>
                <p className={`text-[0.9rem] font-semibold leading-[1.4] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  <span className="block">Don&apos;t guess.</span>
                  <span className="block">Get the right engine at the right price.</span>
                </p>
              </div>
              <a
                href="/quote"
                className="btn-cta relative z-10 flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-3.5 text-center text-[0.7rem] font-bold uppercase tracking-wide text-white no-underline shadow-[0_12px_28px_var(--color-shadow)]"
                style={{ backgroundColor: GOLD }}
              >
                <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
                {data.cta.label}
              </a>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {data.cta?.label ? (
            <div
              className={`flex flex-row items-center gap-4 rounded-xl border p-5 shadow-sm ${
                isDark ? "border-white/15 bg-[var(--color-surface-raised)]" : "border-[rgba(171,132,80,0.25)] bg-[#EDE6D8]"
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                    <GenIcon name="tag" className="h-4.5 w-4.5" />
                  </span>
                  <h3 className={`text-[1rem] font-bold leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Don&apos;t Guess. Compare.</h3>
                </div>
                <p className={`text-[0.8rem] leading-[1.45] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
                  Get real quotes from vetted UK specialists and make the right call.
                </p>
                <a
                  href="/quote"
                  className="btn-cta flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-[0.78rem] font-bold text-white no-underline shadow-md"
                  style={{ backgroundColor: GOLD }}
                >
                  {data.cta.label}
                  <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
                </a>
              </div>

              <div className="relative h-[110px] w-[110px] shrink-0">
                <Image src="/320d/engine.webp" alt="" fill className="object-contain" sizes="110px" />
              </div>
            </div>
          ) : null}

          <div
            className={`flex items-stretch rounded-xl border p-3 shadow-sm ${
              isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }`}
          >
            {TRUST_TICKER.map((item, index) => (
              <div key={item.label} className="flex flex-1 items-stretch">
                {index > 0 ? (
                  <span aria-hidden="true" className="mx-1.5 my-1 w-px shrink-0 self-center bg-[var(--color-border)]" style={{ height: "70%" }} />
                ) : null}
                <div className="flex w-full flex-col items-center gap-1 text-center">
                  <span style={{ color: GOLD }}>
                    <GenIcon name={item.icon} className="h-4 w-4 shrink-0" />
                  </span>
                  <span className={`text-[0.56rem] font-semibold leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
