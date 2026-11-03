"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
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

function VerdictCell({ verdict, isDark }) {
  const style = VERDICT_STYLE[verdict?.type] || VERDICT_STYLE.watch;

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: style.bg }}>
          <VerdictGlyph type={verdict?.type} />
        </span>
        <span className="text-[0.78rem] font-semibold" style={{ color: style.bg }}>
          {verdict?.label || style.label}
        </span>
      </div>
      <p className={`text-[0.7rem] font-light leading-[1.35] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
        {verdict?.text}
      </p>
    </div>
  );
}

function MatrixRow({ row, isDark, variant = "desktop" }) {
  const href = row.href || "#";
  const isMobile = variant === "mobile";

  const body = isMobile ? (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="relative h-[92px] w-[36%] shrink-0 overflow-hidden">
          <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.model} fill className="object-contain object-left" sizes="40vw" />
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-3 gap-y-2 pt-0.5">
          <div className="min-w-0">
            <p className={`font-lora text-[0.9rem] font-medium leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {row.model}
            </p>
            {row.engine ? (
              <p className={`mt-1 text-[0.7rem] leading-snug ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
                ({row.engine})
              </p>
            ) : null}
            <p className={`mt-2 text-[0.82rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.vehicleValue}</p>
            <p className={`mt-0.5 text-[0.62rem] uppercase ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.vehicleSource}]</p>
          </div>
          <div className="min-w-0 pt-[2.1rem]">
            <p className={`text-[0.82rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.replacementCost}</p>
            <p className={`mt-0.5 text-[0.62rem] uppercase ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.replacementSource}]</p>
          </div>
        </div>
      </div>
      <div className={`border-t pt-2.5 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
        <VerdictCell verdict={row.verdict} isDark={isDark} />
      </div>
    </div>
  ) : (
    <>
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative h-11 w-16 shrink-0 overflow-hidden">
          <Image src={row.image?.src || "/right.webp"} alt={row.image?.alt || row.model} fill className="object-contain" sizes="64px" />
        </div>
        <div className="min-w-0">
          <p className={`text-[0.9rem] font-semibold leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {row.model}
          </p>
          {row.engine ? (
            <p className={`mt-0.5 text-[0.68rem] ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>({row.engine})</p>
          ) : null}
        </div>
      </div>
      <div>
        <p className={`text-[0.8rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.vehicleValue}</p>
        <p className={`text-[0.62rem] uppercase ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.vehicleSource}]</p>
      </div>
      <div>
        <p className={`text-[0.8rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.replacementCost}</p>
        <p className={`text-[0.62rem] uppercase ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>[{row.replacementSource}]</p>
      </div>
      <VerdictCell verdict={row.verdict} isDark={isDark} />
    </>
  );

  const className = isMobile
    ? `rounded-xl border px-3.5 py-3.5 no-underline shadow-[0_4px_16px_rgba(10,26,43,0.05)] hover:no-underline ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`
    : `grid grid-cols-[minmax(180px,1.2fr)_minmax(120px,0.85fr)_minmax(130px,0.9fr)_minmax(160px,1.15fr)] items-center gap-4 border-b px-4 py-3 no-underline last:border-b-0 hover:no-underline ${
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
    <div>
      <div className="mb-3 flex items-center gap-2 px-0.5 md:hidden">
        <h3 className={`font-lora text-[1.05rem] font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {matrix?.title || "The Decision Matrix"}
        </h3>
        <span className="h-[2px] w-10" style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.18) 100%)` }} />
      </div>

      {/* Mobile: separate cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <MatrixRow key={row.model} row={row} isDark={isDark} variant="mobile" />
        ))}
      </div>

      {/* Desktop: single table box */}
      <div className={`hidden overflow-hidden rounded-lg border md:block ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
        <div className={`flex items-center gap-2 border-b px-4 py-3 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
          <h3 className={`font-lora text-[1.15rem] font-medium ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {matrix?.title || "The Decision Matrix"}
          </h3>
          <span className="h-[2px] w-10" style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.18) 100%)` }} />
        </div>

        <div
          className={`border-b px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] grid grid-cols-[minmax(180px,1.2fr)_minmax(120px,0.85fr)_minmax(130px,0.9fr)_minmax(160px,1.15fr)] gap-4 ${
            isDark ? "border-white/10 bg-white/5 text-white/55" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
          }`}
        >
          {columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>

        {rows.map((row) => (
          <MatrixRow key={row.model} row={row} isDark={isDark} variant="desktop" />
        ))}
      </div>
    </div>
  );
}

function RuleCard({ data, isDark }) {
  return (
    <div className={`rounded-lg border p-4 md:p-5 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <h3 className={`font-lora text-[1rem] font-medium md:text-[1.08rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data.title}
      </h3>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${GOLD} 0% 70%, ${isDark ? "rgba(255,255,255,0.12)" : "#EDE6D8"} 70% 100%)`,
          }}
        >
          <div className={`flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full ${isDark ? "bg-[var(--color-surface-raised)]" : "bg-white"}`}>
            <span className="font-lora text-[1.35rem] font-semibold leading-none" style={{ color: GOLD }}>
              {data.percent}
            </span>
            <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
              {data.percentLabel}
            </span>
          </div>
        </div>
        <p className={`text-[0.75rem] font-light leading-[1.4] md:text-[0.8rem] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
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
      <h3 className={`mb-3 font-lora text-[1rem] font-medium md:text-[1.08rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
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
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-semibold"
                style={{ backgroundColor: "rgba(171,132,80,0.18)", color: GOLD }}
              >
                {item.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-[0.82rem] font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {item.label}
                </span>
                <span className={`mt-0.5 block text-[0.68rem] font-light leading-[1.3] ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
                  {item.purpose}
                </span>
              </span>
              <span className="mt-1 text-[0.9rem]" style={{ color: GOLD }}>
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
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };

  return (
    <section className={`relative overflow-hidden px-3 py-6 md:px-4 md:py-8 ${homeSectionBg(isDark, 6)}`}>
      <div className="absolute inset-x-0 top-0 hidden h-[280px] md:block">
        <Image src={headerImage.src} alt="" fill className="object-cover object-right" sizes="100vw" />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#F8F7F3_0%,rgba(248,247,243,0.92)_40%,rgba(248,247,243,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#F8F7F3_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl">
        <div className="max-w-[720px] pt-2 md:pt-6">
          <SectionLabel number={6} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            The Mercedes-Benz Ownership Economics Centre
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

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
                <p className={`flex items-start gap-2 text-[0.72rem] md:text-[0.78rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
                  <HomeIcon name="shield" isDark={isDark} gold className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{data.footerNote}</span>
                </p>
              ) : null}
              {data.footerTrust?.length ? (
                <ul className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto md:flex-wrap md:gap-x-4 md:gap-y-2">
                  {data.footerTrust.map((item) => (
                    <li
                      key={item.label}
                      className={`flex flex-col items-center gap-1 text-center text-[0.58rem] leading-tight md:inline-flex md:flex-row md:items-center md:gap-1.5 md:text-left md:text-[0.7rem] ${
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
      </div>
    </section>
  );
}
