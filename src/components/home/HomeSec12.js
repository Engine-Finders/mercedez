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
import { useTheme } from "@/components/shared/themeProvider";

function TrustCard({ item, isDark }) {
  const description = item.description || "";
  const link = item.link;
  let body = description;

  if (link?.label && description.includes(link.label)) {
    const [before, after] = description.split(link.label);
    body = (
      <>
        {before}
        <Link href={link.href || "#"} className="font-medium underline-offset-2 hover:underline" style={{ color: GOLD }}>
          {link.label}
        </Link>
        {after}
      </>
    );
  }

  return (
    <article
      className={`flex flex-col items-center rounded-xl border px-2.5 py-4 text-center shadow-[0_6px_24px_rgba(10,26,43,0.05)] md:px-5 md:py-6 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border md:h-16 md:w-16 ${
          isDark ? "border-white/15 bg-white/5" : "border-[#EDE6D8] bg-[#F5EAD4]"
        }`}
      >
        <HomeIcon name={item.icon || "chart"} isDark={isDark} gold className="h-6 w-6 md:h-8 md:w-8" />
      </span>
      <span className="mt-2.5 h-px w-8 md:mt-3 md:w-10" style={{ backgroundColor: GOLD }} />
      <h3 className={`mt-2.5 font-lora ${typeH6} font-medium leading-tight md:mt-3 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {item.title}
      </h3>
      <p className={`mt-1.5 ${typeSmall} font-light md:mt-2 ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
        {body}
      </p>
    </article>
  );
}

export default function HomeSec12({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const headerImage = data.headerImage || { src: "/sec2-bg.webp", alt: "" };
  const signals = data.signals || [];

  return (
    <section className={`relative overflow-hidden ${homeSectionBg(isDark, 12)}`}>
      <SectionHeaderBand
        title="Why Mercedes-Benz Owners Trust This Site"
        subHeadline={data.subHeadline}
        image={headerImage}
        isDark={isDark}
        panelBg={sectionPanelBg(isDark, 12)}
        panelRgb={sectionPanelRgb(isDark, 12)}
        titleClassName="max-w-[720px]"
      />

      <div className="relative mx-auto w-full max-w-8xl px-3 pb-7 pt-5 md:px-4 md:pb-8 md:pt-6">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {signals.map((item) => (
            <TrustCard key={item.id} item={item} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
