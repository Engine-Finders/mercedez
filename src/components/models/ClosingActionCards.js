"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionButton, sectionDescription, sectionH2, sectionH4 } from "@/components/models/sectionTypography";

const cardThemes = [
  {
    accent: GOLD,
    border: "border-[rgba(171,132,80,0.35)]",
    bg: "bg-[linear-gradient(135deg,#FBF8F2_0%,#F5EAD4_100%)]",
    useHero: true,
    imageClass: "object-cover object-[68%_70%]",
    cta: "Explore Now",
    icon: "knowledge",
  },
  {
    accent: GOLD,
    border: "border-[rgba(171,132,80,0.35)]",
    bg: "bg-[linear-gradient(135deg,#FBF8F2_0%,#F0E6D4_100%)]",
    image: "/e90/engine.webp",
    imageClass: "object-contain object-right-bottom",
    cta: "Start Diagnosis",
    icon: "diagnosis",
  },
  {
    accent: GOLD,
    border: "border-[rgba(171,132,80,0.35)]",
    bg: "bg-[linear-gradient(135deg,#FBF8F2_0%,#F5EAD4_100%)]",
    cta: "Compare Specialists",
    icon: "vetted-specialist",
  },
];

function cleanText(text = "") {
  return text
    .replaceAll("â†’", "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "a Decision?";
  const index = clean.indexOf(marker);

  if (index === -1) return { before: clean, accent: "" };

  return {
    before: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function ArrowIcon({ className = "h-7 w-7" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function UkMapArt({ accent }) {
  const pins = [
    [56, 24],
    [66, 39],
    [58, 51],
    [72, 58],
    [50, 66],
    [64, 72],
    [76, 76],
  ];

  return (
    <svg aria-hidden="true" viewBox="0 0 180 220" className="absolute bottom-3 right-3 h-[82%] w-[48%] opacity-80 md:right-8 md:w-[44%]">
      <path
        d="M80 10 65 24l9 15-18 12 10 17-16 13 20 13-11 20 22 8-16 28 28 8 10 31 24-17 25 13-2-31 20-11-19-21 10-28-20-16 4-28-28-1-10-28-27 8Z"
        fill="#ead9bd"
      />
      <path d="M33 105 16 121l22 8 17-12-22-12ZM72 189l-34 13 31 9 31-13-28-9Z" fill="#ead9bd" opacity="0.72" />
      {pins.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
          <path d="M0-10c5.2 0 9 3.8 9 8.5C9 5-0 13-0 13S-9 5-9-1.5C-9-6.2-5.2-10 0-10Z" fill={accent} />
          <circle r="3" fill="white" />
        </g>
      ))}
    </svg>
  );
}

function ActionCard({ card, index, isDark, heroImage }) {
  const theme = cardThemes[index] || cardThemes[0];
  const titleParts = [
    { before: "Explore", accent: "Generations", after: "" },
    { before: "Diagnose", accent: "My Engine", after: "" },
    { before: "Compare", accent: "UK Specialists", after: "" },
  ][index] || { before: cleanText(card.title), accent: "", after: "" };
  const cardImage = theme.useHero ? heroImage?.src || "/model/Hero-bg-image.webp" : theme.image;

  return (
    <Link
      href={card.href || "#"}
      className={`group relative min-h-[250px] overflow-hidden rounded-md border ${theme.border} ${theme.bg} p-4 shadow-[0_10px_28px_rgba(10,26,43,0.10)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(10,26,43,0.16)] no-underline md:min-h-[270px] md:p-5 lg:min-h-[270px]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_34%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.08)_56%,transparent_100%)]" />
      {cardImage ? (
        <Image src={cardImage} alt="" fill unoptimized className={`opacity-45 mix-blend-multiply ${theme.imageClass}`} sizes="(min-width: 1024px) 31vw, 100vw" />
      ) : (
        <UkMapArt accent={theme.accent} />
      )}
      <div className="relative z-10 flex h-full max-w-[78%] flex-col items-start md:max-w-[82%]">
        <div className="flex items-center gap-3 md:gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/86 shadow-[0_12px_26px_rgba(10,26,43,0.10)] md:h-14 md:w-14">
            <HomeIcon name={theme.icon} isDark={isDark} className="h-8 w-8 object-contain md:h-9 md:w-9" />
          </span>
          <h3 className={`min-w-0 font-lora font-medium leading-tight text-black ${sectionH4}`}>
            <span dangerouslySetInnerHTML={{ __html: titleParts.before }} />
            {titleParts.accent ? (
              <>
                {" "}
                <span style={{ color: theme.accent }} dangerouslySetInnerHTML={{ __html: titleParts.accent }} />
              </>
            ) : null}
            {titleParts.after ? <> <span dangerouslySetInnerHTML={{ __html: titleParts.after }} /></> : null}
          </h3>
        </div>
        <span className="mt-4 block h-1 w-12 rounded-full" style={{ backgroundColor: theme.accent }} />
        <p className={`mt-4 max-w-[360px] text-[var(--color-text)] ${sectionBody}`} dangerouslySetInnerHTML={{ __html: cleanText(card.text) }} />
        <span className={`mt-auto inline-flex items-center gap-5 pt-6 font-bold ${sectionButton}`} style={{ color: theme.accent }}>
          {theme.cta}
          <ArrowIcon className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function ClosingActionCards({ data, heroImage }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const bgSrc = heroImage?.src || "/model/Hero-bg-image.webp";
  const bgAlt = heroImage?.alt || "";

  return (
    <section className={`relative overflow-hidden pt-2 pb-8 text-[var(--color-text)] ${homeSectionBg(isDark, 14)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-md ${isDark ? "bg-[#070706]" : "bg-white"}`}>
          <Image src={bgSrc} alt={bgAlt} fill unoptimized className="object-cover object-center opacity-90" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(90deg,rgba(7,7,6,0.7)_0%,rgba(7,7,6,0.32)_50%,transparent_82%)"
                : "linear-gradient(90deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.22)_50%,transparent_82%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[90%] max-w-[720px] md:w-[68%]"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 92% 130% at 16% 48%, rgba(7,7,6,0.97) 0%, rgba(7,7,6,0.84) 40%, rgba(7,7,6,0.28) 70%, transparent 100%)"
                : "radial-gradient(ellipse 92% 130% at 16% 48%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.35) 70%, transparent 100%)",
            }}
          />
          <div className="relative z-10 max-w-[620px] px-4 py-4 md:px-6 md:py-6">
            <h2 className={`font-lora max-w-[570px] font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
              <span dangerouslySetInnerHTML={{ __html: title.before }} />
              {title.accent ? (
                <>
                  <br />
                  <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
                </>
              ) : null}
            </h2>
            <div className="mt-4">
              <SectionFadeStrip isDark={isDark} />
            </div>
            <p className={`mt-4 max-w-[500px] text-[var(--color-text-muted)] ${sectionDescription}`}>
              Everything you need to choose with confidence.
              <br />
              Data. Honesty. Specialists. All in one place.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {(data.cards || []).map((card, index) => (
            <ActionCard key={card.title || card.href} card={card} index={index} isDark={isDark} heroImage={heroImage} />
          ))}
        </div>
      </div>
    </section>
  );
}
