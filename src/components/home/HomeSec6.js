"use client";

import {
  typeH1,
  typeH2,
  typeH3,
  typeH4,
  typeH5,
  typeH6,
  typeDesc,
  typeBody,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeButton,
  typeTable,
  typeEyebrow,
} from "@/components/shared/typography";



import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import SectionQuoteCta from "@/components/shared/SectionQuoteCta";
import { useTheme } from "@/components/shared/themeProvider";

const VERDICT_STYLE = {
  scrap: { bg: "#ed1c24", label: "Scrap threshold" },
  safe: { bg: "#20a84a", label: "Safe" },
  watch: { bg: "#f7a51b", label: "Watch" },
};

function VerdictGlyph({ type }) {
  if (type === "safe") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 8v5m0 4h.01M10 4.9 2.6 18a2 2 0 0 0 1.74 3h15.32A2 2 0 0 0 21.4 18L14 4.9a2 2 0 0 0-3.48 0Z" />
    </svg>
  );
}

const MATRIX_COLS =
  "grid-cols-[minmax(150px,1.2fr)_minmax(100px,0.85fr)_minmax(110px,0.9fr)_minmax(140px,1.15fr)]";

function VerdictCell({ verdict, isDark }) {
  const style = VERDICT_STYLE[verdict?.type] || VERDICT_STYLE.watch;

  return (
    <div className="min-w-0">
      <div className="mb-0.5 flex items-center gap-1 md:mb-1 md:gap-1.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white md:h-5 md:w-5" style={{ backgroundColor: style.bg }}>
          <VerdictGlyph type={verdict?.type} />
        </span>
        <span className={`font-lora text-[11px] font-semibold md:text-[15px]`} style={{ color: style.bg }}>
          {verdict?.label || style.label}
        </span>
      </div>
      <p className={`text-[11px] font-light leading-snug md:text-[15px] md:leading-[1.45] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
        {verdict?.text}
      </p>
    </div>
  );
}

function MatrixRow({ row, isDark }) {
  const href = row.href || "#";

  const body = (
    <>
      <div className="flex min-w-0 items-center gap-1.5 md:gap-2.5">
        <div className="relative h-8 w-12 shrink-0 overflow-hidden md:h-11 md:w-16">
          <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.model} fill unoptimized className="object-contain" sizes="64px" />
        </div>
        <div className="min-w-0">
          <p className={`font-lora text-[11px] font-semibold leading-tight md:text-[15px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {row.model}
          </p>
          {row.engine ? (
            <p className={`mt-0.5 font-lora text-[10px] md:text-[15px] ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>({row.engine})</p>
          ) : null}
        </div>
      </div>
      <div>
        <p className={`font-lora text-[11px] md:text-[15px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.vehicleValue}</p>
        <p className={`text-[9px] uppercase md:text-[13px] ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.vehicleSource}]</p>
      </div>
      <div>
        <p className={`font-lora text-[11px] md:text-[15px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.replacementCost}</p>
        <p className={`text-[9px] uppercase md:text-[13px] ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.replacementSource}]</p>
      </div>
      <VerdictCell verdict={row.verdict} isDark={isDark} />
    </>
  );

  const className = `grid ${MATRIX_COLS} items-center gap-2 border-b px-2.5 py-2 no-underline last:border-b-0 hover:no-underline md:gap-4 md:px-4 md:py-3 ${
    isDark ? "border-white/10 hover:bg-white/5" : "border-[rgba(0,0,0,0.06)] hover:bg-[#F8F7F3]"
  }`;

  if (href && href !== "#") {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }

  return <div className={className}>{body}</div>;
}

function DecisionMatrix({ matrix, isDark }) {
  const columns = matrix?.columns || [];
  const rows = matrix?.rows || [];

  return (
    <div className={`overflow-hidden rounded-lg border ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2.5 md:px-4 md:py-3 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <h3 className={`font-lora ${typeH5} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {matrix?.title || "The Decision Matrix"}
        </h3>
        <span className="h-[2px] w-10" style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.18) 100%)` }} />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div
            className={`grid ${MATRIX_COLS} gap-2 border-b px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.06em] md:gap-4 md:px-4 md:py-2.5 md:text-[15px] ${
              isDark ? "border-white/10 bg-white/5 text-white/55" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
            }`}
          >
            {columns.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>

          {rows.map((row) => (
            <MatrixRow key={row.model} row={row} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RuleCard({ data, isDark }) {
  return (
    <div className={`rounded-lg border p-4 md:p-5 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <h3 className={`font-lora ${typeH5} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data.title}
      </h3>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${GOLD} 0% 70%, ${isDark ? "rgba(255,255,255,0.12)" : "#EDE6D8"} 70% 100%)`,
          }}
        >
          <div className={`flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full px-1 ${isDark ? "bg-[var(--color-surface-raised)]" : "bg-white"}`}>
            <span className="font-lora text-[15px] font-semibold leading-none md:text-[16px]" style={{ color: GOLD }}>
              {data.percent}
            </span>
            <span className="mt-0.5 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide md:text-[10px]" style={{ color: GOLD }}>
              {data.percentLabel}
            </span>
          </div>
        </div>
        <p className={`${typeSmall} font-light ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
          {data.text}
        </p>
      </div>
    </div>
  );
}

function LinksCard({ data, isDark }) {
  const items = data?.items || [];

  return (
    <div className={`rounded-lg border p-4 md:p-5 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <h3 className={`mb-3 font-lora ${typeH5} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data?.title || "Deeper Analysis Links"}
      </h3>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href || "#"}
              className={`flex items-start gap-3 rounded-md px-1 py-2 no-underline hover:no-underline ${
                isDark ? "hover:bg-white/5" : "hover:bg-[#F8F7F3]"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${typeBadge} font-semibold`}
                style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}
              >
                {item.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block ${typeSmall} font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {item.label}
                </span>
                <span className={`mt-0.5 block ${typeBadge} font-light ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
                  {item.purpose}
                </span>
              </span>
              <span className={`mt-1 ${typeBody}`} style={{ color: GOLD }}>
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeSec6({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/Amg-gt.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 6)}`}>
      <SectionHeaderBand
        title="The Mercedes-Benz Ownership Economics Centre"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 6)}
        panelRgb={sectionPanelRgb(isDark, 6)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-6 pt-5 md:px-4 md:pb-8 md:pt-6">
        <TrustBadges items={data.trustStrip} isDark={isDark} mobileRow />

        <div
          className={`mt-5 md:mt-6 md:rounded-xl md:border md:p-5 md:shadow-[0_8px_28px_rgba(10,26,43,0.06)] ${
            isDark ? "md:border-white/10 md:bg-[var(--color-surface-raised)]" : "md:border-[#E5E5E5] md:bg-white"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.9fr)] md:items-start md:gap-5">
            <DecisionMatrix matrix={data.matrix} isDark={isDark} />
            <div className="grid gap-3 md:gap-4">
              <RuleCard data={data.ruleOfThumb} isDark={isDark} />
              <LinksCard data={data.deeperLinks} isDark={isDark} />
            </div>
          </div>

          {(data.footerNote || data.footerTrust?.length) ? (
            <div
              className={`mt-4 flex flex-col gap-3 border-t pt-4 md:flex-row md:items-center md:justify-between ${
                isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"
              }`}
            >
              {data.footerNote ? (
                <p className={`flex items-start gap-2 ${typeSmall} ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
                  <HomeIcon name="shield" isDark={isDark} gold className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{data.footerNote}</span>
                </p>
              ) : null}
              {data.footerTrust?.length ? (
                <ul className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto md:flex-wrap md:gap-x-4 md:gap-y-2">
                  {data.footerTrust.map((item) => (
                    <li
                      key={item.label}
                      className={`flex flex-col items-center gap-1 text-center ${typeBadge} leading-tight md:inline-flex md:flex-row md:items-center md:gap-1.5 md:text-left ${
                        isDark ? "text-white/70" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      <HomeIcon name={item.icon} isDark={isDark} gold className="h-6 w-6 md:h-4 md:w-4" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        <SectionQuoteCta
          label="Get a Mercedes-Benz Engine Quote"
          support="Compare replacement costs against your Mercedes-Benz's value before deciding on your next step."
        />
      </div>
    </section>
  );
}
