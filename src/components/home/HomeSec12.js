"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
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
      <h3 className={`mt-2.5 font-lora text-[0.85rem] font-medium leading-tight md:mt-3 md:text-[1.08rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {item.title}
      </h3>
      <p className={`mt-1.5 text-[0.68rem] font-light leading-[1.4] md:mt-2 md:text-[0.82rem] ${isDark ? "text-white/70" : "text-[var(--color-text-muted)]"}`}>
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
    <section className={`relative overflow-hidden px-3 py-7 md:px-4 md:py-8 ${homeSectionBg(isDark, 12)}`}>
      <div className="absolute inset-x-0 top-0 hidden h-[260px] md:block">
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
          <SectionLabel number={12} isDark={isDark} />
          <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Why Mercedes-Benz Owners Trust This Site
          </h2>
          <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/80" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-6 md:grid-cols-4 md:gap-4">
          {signals.map((item) => (
            <TrustCard key={item.id} item={item} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
