"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import { useTheme } from "@/components/shared/themeProvider";

const VERDICT_STYLE = {
  watch: { bg: "#f7a51b", label: "Watch" },
  safe: { bg: "#20a84a", label: "Safe" },
  best: { bg: GOLD, label: "Best" },
};

function VerdictGlyph({ type }) {
  if (type === "safe") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }
  if (type === "best") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H4v2a3 3 0 0 0 4 2.8M16 6h4v2a3 3 0 0 1-4 2.8M12 12v5m-3 3h6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 8v5m0 4h.01M10 4.9 2.6 18a2 2 0 0 0 1.74 3h15.32A2 2 0 0 0 21.4 18L14 4.9a2 2 0 0 0-3.48 0Z" />
    </svg>
  );
}

function EngineRow({ row, isDark }) {
  const style = VERDICT_STYLE[row.verdict?.type] || VERDICT_STYLE.watch;
  const href = row.href || "#";
  const isDiesel = /diesel/i.test(row.fuel || "");

  const body = (
    <>
      <div className="flex min-w-0 items-center gap-2">
        <HomeIcon name="engine" isDark={isDark} gold className="h-5 w-5 shrink-0" />
        <span className={`font-lora text-[0.95rem] font-medium md:text-[1.05rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.code}</span>
      </div>

      <div className="flex min-w-0 items-center gap-1.5">
        <HomeIcon name={isDiesel ? "droplet" : "fuel"} isDark={isDark} gold className="h-4 w-4 shrink-0" />
        <span className={`text-[0.78rem] font-normal ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>{row.fuel}</span>
      </div>

      <span className={`text-[0.78rem] font-normal ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>{row.years}</span>

      <div>
        <p className={`text-[0.78rem] font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>{row.enquiries}</p>
        <p className={`text-[0.62rem] ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>{row.sourceTag}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: style.bg }}>
          <VerdictGlyph type={row.verdict?.type} />
        </span>
        <span className="text-[0.78rem] font-semibold" style={{ color: style.bg }}>
          {row.verdict?.label || style.label}
        </span>
      </div>

      <p className={`text-[0.72rem] font-light leading-[1.35] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
        {row.take}
      </p>
    </>
  );

  const className = `grid grid-cols-[minmax(110px,0.9fr)_minmax(120px,1fr)_minmax(90px,0.75fr)_minmax(110px,0.95fr)_minmax(90px,0.7fr)_minmax(180px,1.4fr)] items-center gap-3 border-b px-3 py-3 no-underline last:border-b-0 hover:no-underline md:px-4 md:py-3.5 ${
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

function FooterCta({ data, isDark }) {
  if (!data) return null;

  return (
    <div
      className={`mt-4 flex flex-col gap-3 rounded-xl border px-3 py-3.5 md:mt-6 md:flex-row md:items-center md:gap-5 md:p-5 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        <HomeIcon name="shield" isDark={isDark} gold className="mt-0.5 h-7 w-7 shrink-0 md:h-8 md:w-8" />
        <p className={`text-[0.75rem] leading-[1.4] md:text-[0.85rem] ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
          {data.left}
        </p>
      </div>

      <div className="flex min-w-0 flex-1 items-start gap-2.5 md:border-l md:pl-5" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
        <HomeIcon name="star" isDark={isDark} gold className="mt-0.5 h-5 w-5 shrink-0 md:h-6 md:w-6" />
        <p className={`text-[0.75rem] leading-[1.4] md:text-[0.85rem] ${isDark ? "text-white/80" : "text-[var(--color-text)]"}`}>
          {data.center}
        </p>
      </div>

      <Link
        href={data.href || "/quote"}
        className="btn-cta inline-flex w-full shrink-0 items-center justify-center rounded-md px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-wide text-white no-underline md:w-auto md:px-5 md:py-3 md:text-[0.82rem]"
        style={{ backgroundColor: "#0a0a0a", color: GOLD }}
      >
        {data.buttonLabel || "GET EXPERT ADVICE →"}
      </Link>
    </div>
  );
}

export default function HomeSec7({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };
  const engines = data.engines || [];
  const columns = data.columns || [];

  return (
    <section className={`relative overflow-hidden px-3 py-7 md:px-4 md:py-8 ${homeSectionBg(isDark, 7)}`}>
      <div className="absolute inset-x-0 top-0 hidden h-[280px] md:block">
        <Image src={headerImage.src} alt="" fill className="object-cover object-right" sizes="100vw" />
        <div
          className={
            isDark
              ? "absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,11,0.96)_0%,rgba(2,7,11,0.78)_42%,rgba(2,7,11,0.28)_78%)]"
              : "absolute inset-0 bg-[linear-gradient(90deg,#EFEEE9_0%,rgba(239,238,233,0.92)_40%,rgba(239,238,233,0.2)_78%)]"
          }
        />
        <div
          className={
            isDark
              ? "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
              : "absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)]"
          }
        />
      </div>

      <div className="relative mx-auto w-full max-w-8xl">
        <div className="max-w-[720px] pt-2 md:pt-6">
          <SectionLabel number={7} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Mercedes-Benz Engine Families — The Pillars
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

        <TrustBadges items={data.trustStrip} isDark={isDark} mobileRow />

        <div
          className={`mt-4 overflow-hidden rounded-xl border shadow-[0_8px_28px_rgba(10,26,43,0.05)] md:mt-6 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div
                className={`grid grid-cols-[minmax(110px,0.9fr)_minmax(120px,1fr)_minmax(90px,0.75fr)_minmax(110px,0.95fr)_minmax(90px,0.7fr)_minmax(180px,1.4fr)] gap-3 border-b px-3 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] md:px-4 ${
                  isDark ? "border-white/10 bg-white/5 text-white/55" : "border-[rgba(0,0,0,0.06)] bg-[#F8F7F3] text-[var(--color-text-muted)]"
                }`}
              >
                {columns.map((col) => (
                  <span key={col}>{col}</span>
                ))}
              </div>

              {engines.map((row) => (
                <EngineRow key={row.code} row={row} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>

        <FooterCta data={data.footerCta} isDark={isDark} />
      </div>
    </section>
  );
}
