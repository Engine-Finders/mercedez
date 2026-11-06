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



import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, sectionPanelBg, sectionPanelRgb } from "@/components/home/sectionBg";
import SectionHeaderBand from "@/components/reusableComponents/SectionHeaderBand";
import TrustBadges from "@/components/reusableComponents/TrustBadges";
import { useTheme } from "@/components/shared/themeProvider";

function CentreCard({ item, isDark }) {
  const num = String(item.id).padStart(2, "0");

  return (
    <Link
      href={item.link?.href || "#"}
      className={`relative flex flex-col gap-3 rounded-lg border p-4 no-underline shadow-[0_4px_16px_rgba(10,26,43,0.05)] transition hover:no-underline hover:opacity-95 md:p-5 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`}
    >
      <span className={`absolute right-3 top-3 ${typeSmall} font-medium tabular-nums ${isDark ? "text-white/35" : "text-[var(--color-text-soft)]"}`}>
        {num}
      </span>

      <div className="flex flex-col gap-2.5 pr-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border md:h-14 md:w-14 ${
              isDark ? "border-[rgba(171,132,80,0.45)] bg-[rgba(171,132,80,0.12)]" : "border-[#EDE6D8] bg-[#F5EAD4]"
            }`}
          >
            <HomeIcon name={item.icon} isDark={isDark} className="h-7 w-7 md:h-8 md:w-8" />
          </span>
          <h3
            className={`font-lora min-w-0 text-[18px] font-medium leading-tight md:text-[22px] ${
              isDark ? "text-white" : "text-[var(--color-text)]"
            }`}
          >
            {item.title}
          </h3>
        </div>
        <p className={`${typeSmall} font-light ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
          {item.description}
        </p>
        {item.meta ? (
          <p className={`${typeBadge} ${isDark ? "text-white/50" : "text-[var(--color-text-soft)]"}`}>{item.meta}</p>
        ) : null}
        <span className={`font-lora ${typeHighlight} font-medium`} style={{ color: GOLD }}>
          {item.link?.label || "Explore →"}
        </span>
      </div>
    </Link>
  );
}

function BottomBar({ data, isDark }) {
  if (!data) return null;

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-xl px-4 py-4 md:mt-6 md:flex-row md:items-center md:justify-between md:px-5 md:py-4" style={{ backgroundColor: "#0a0a0a" }}>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {(data.items || []).map((item) => (
          <li key={item.label} className={`inline-flex items-center gap-2 ${typeSmall} text-white/85`}>
            <HomeIcon name={item.icon} tone="silver" className="h-5 w-5" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <Link
        href={data.cta?.href || "/quote"}
        className={`inline-flex shrink-0 items-center justify-center rounded-md border px-5 py-2.5 ${typeButton} font-semibold uppercase tracking-wide no-underline`}
        style={{ borderColor: GOLD, color: GOLD }}
      >
        {data.cta?.label || "GET EXPERT ADVICE →"}
      </Link>
    </div>
  );
}

export default function HomeSec8({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };
  const centres = data.centres || [];

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 8)}`}>
      <SectionHeaderBand
        title="Mercedes-Benz Knowledge Centres"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 8)}
        panelRgb={sectionPanelRgb(isDark, 8)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <TrustBadges items={data.trustStrip} isDark={isDark} mobileRow />

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-6 md:grid-cols-4 md:gap-3.5">
          {centres.map((item) => (
            <CentreCard key={item.id} item={item} isDark={isDark} />
          ))}
        </div>

        <BottomBar data={data.bottomBar} isDark={isDark} />
      </div>
    </section>
  );
}
