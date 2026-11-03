"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const BADGE_ICON_BY_EMOJI = {
  "🔧": "wrench",
  "✅": "check",
  "🚚": "truck",
  "👥": "users",
};

function parseBadge(badge = "") {
  const [emoji, ...rest] = badge.split(" ");
  return { icon: BADGE_ICON_BY_EMOJI[emoji] || "check", label: rest.join(" ") };
}

function splitPriceAnchor(priceAnchor = "") {
  const [headline, ...rest] = priceAnchor.split(" · ");
  return { headline, note: rest.join(" · ") };
}

function splitTagPill(tagPill = "") {
  const parts = tagPill.split(" • ");
  return { model: parts[0] || "", body: parts[1] || "", years: parts[2] || "" };
}

// Renders the trailing "Compare ... " action phrase after a dash in the H1
// as the blue accent color, matching the hero mockup.
function HeroHeadline({ h1 = "" }) {
  const dashIndex = h1.indexOf(" - ");
  if (dashIndex === -1) return <span dangerouslySetInnerHTML={{ __html: h1 }} />;

  const lead = h1.slice(0, dashIndex);
  const accent = h1.slice(dashIndex + 3);
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: `${lead} - ` }} />
      <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: accent }} />
    </>
  );
}

// Inline UK flag - emoji regional-indicator flags don't render as a flag glyph
// on Windows (shows "GB" letter tiles instead), so use a real vector icon.
function UkFlagIcon({ className = "h-4 w-5" }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}

export default function VariantHero({ data }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [regNumber, setRegNumber] = useState("");

  if (!data) return null;

  function goToQuoteWithReg(event) {
    event.preventDefault();
    const cleaned = regNumber.replace(/\s+/g, "").toUpperCase();
    if (!cleaned) {
      router.push("/quote");
      return;
    }
    router.push(`/quote?reg=${encodeURIComponent(cleaned)}`);
  }

  const isDark = theme === "dark";
  const heroImage = isDark ? "/320d/hero_dark.webp" : "/320d/hero_light.webp";
  const heroImageMobile = isDark ? "/320d/hero_mobile_dark1.webp" : "/320d/hero_mobile_light1.webp";
  const price = splitPriceAnchor(data.priceAnchor);
  const pill = splitTagPill(data.tagPill);
  const tickerItems = (data.ticker || "").replace(/^●\s*/, "").split(" · ").filter(Boolean);

  const headingClass = isDark ? "text-white" : "text-[var(--color-text)]";
  const bodyTextClass = isDark ? "text-white/85" : "text-[var(--color-text-muted)]";
  const cardBorderClass = isDark ? "border-white/20" : "border-[var(--color-border)]";
  const cardBgClass = isDark ? "bg-[rgba(10,10,10,0.55)]" : "bg-[rgba(255,255,255,0.7)]";
  const innerBgClass = isDark ? "bg-[rgba(10,10,10,0.6)]" : "bg-[rgba(255,255,255,0.85)]";
  const tagPillClass = isDark ? "border-white/30 bg-[rgba(10,10,10,0.55)] text-white" : "border-[rgba(171,132,80,0.45)] bg-[rgba(255,255,255,0.75)] text-[var(--color-text)]";
  // Stronger contrast than the plain --color-border token, since these sit on
  // a translucent card over a busy photo background rather than a solid surface.
  const dividerClass = isDark ? "bg-white/35" : "bg-[rgba(7,24,39,0.25)]";
  const dividerBorderClass = isDark ? "border-white/35" : "border-[rgba(7,24,39,0.25)]";
  const badgeTextClass = isDark ? "text-white/85" : "text-[var(--color-text)]";

  // Desktop: single row over the hero image, floating vertical dividers between every item.
  // Self-hides on mobile so it can stay embedded in the hero section for both breakpoints.
  const desktopTrustBadges = data.trustBadges?.length > 0 ? (
    <div className={`hidden rounded-md border ${cardBorderClass} ${cardBgClass} p-4 backdrop-blur-sm md:block`}>
      <div className="flex items-stretch py-1.5">
        {data.trustBadges.map((badge, index) => {
          const { icon, label } = parseBadge(badge);
          return (
            <div key={badge} className="flex flex-1 items-stretch">
              {index > 0 ? (
                <span aria-hidden="true" className={`mx-4 my-1 w-px shrink-0 self-center ${dividerClass}`} style={{ height: "70%" }} />
              ) : null}
              <div className="flex w-full items-center gap-2.5 text-left">
                <span style={{ color: GOLD }}>
                  <GenIcon name={icon} className="h-7 w-7 shrink-0" />
                </span>
                <span className={`text-[0.88rem] leading-[1.3] ${badgeTextClass}`}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  // Mobile: single-row 4-column icon-on-top grid, rendered below the hero image
  // (not overlapping the car) in normal page flow.
  const mobileTrustBadges = data.trustBadges?.length > 0 ? (
    <div className={`rounded-md border ${cardBorderClass} ${cardBgClass} p-2 backdrop-blur-sm md:hidden`}>
      <div className="grid grid-cols-4 gap-x-1 text-center">
        {data.trustBadges.map((badge, index) => {
          const { icon, label } = parseBadge(badge);
          return (
            <div
              key={badge}
              className={`flex flex-col items-center gap-1 px-0.5 ${index > 0 ? `border-l ${dividerBorderClass}` : ""}`}
            >
              <span style={{ color: GOLD }}>
                <GenIcon name={icon} className="h-5 w-5 shrink-0" />
              </span>
              <span className={`text-[0.58rem] leading-tight ${badgeTextClass}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  // Price/code row, shared by the mobile "engine summary" card and the
  // desktop combined card.
  const priceRow = data.priceAnchor ? (
    <div className="flex flex-wrap items-center gap-2 text-[0.74rem] md:text-[0.92rem]">
      <span style={{ color: GOLD }}>
        <GenIcon name="tag" className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
      </span>
      <span className={`font-semibold ${headingClass}`}>{price.headline}</span>
      <span className={`hidden md:inline ${bodyTextClass}`}>{price.note ? `· ${price.note}` : ""}</span>
    </div>
  ) : null;

  // Registration row → redirects to /quote with ?reg=… (lookup stays on quote page).
  // Spec's "top split" row (country + input) holds on every breakpoint;
  // only the full-width submit button drops to its own row.
  const registrationRow = data.registrationInput ? (
    <form
      onSubmit={goToQuoteWithReg}
      className="flex w-full flex-col gap-1.5 md:flex-row md:items-center md:gap-3"
    >
      <div className="flex w-full items-center gap-1.5 md:flex-1 md:gap-3">
        <span className={`flex shrink-0 items-center gap-1.5 rounded-md border ${cardBorderClass} ${innerBgClass} px-2.5 py-2 text-[0.8rem] font-semibold md:py-3 md:text-[0.92rem] ${headingClass}`}>
          <UkFlagIcon />
          GB
        </span>
        <input
          type="text"
          name="reg"
          value={regNumber}
          onChange={(event) => setRegNumber(event.target.value.toUpperCase())}
          placeholder={data.registrationInput.placeholder}
          autoComplete="off"
          className={`min-w-0 flex-1 rounded-md border ${cardBorderClass} ${innerBgClass} px-2.5 py-2 text-[0.8rem] uppercase focus:outline-none md:py-3 md:text-[0.92rem] ${headingClass} ${isDark ? "placeholder:text-white/50" : "placeholder:text-[var(--color-text-soft)]"}`}
        />
      </div>
      {data.registrationInput.cta ? (
        <button
          type="submit"
          className="flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#0a0a0a] px-2 py-2 text-center text-[0.68rem] font-bold shadow-[0_12px_28px_var(--color-shadow)] md:w-auto md:px-6 md:py-3 md:text-[0.9rem]"
          style={{ color: GOLD }}
        >
          {data.registrationInput.cta.label.replace(/\s*→\s*$/, "")}
          <GenIcon name="arrow" className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
        </button>
      ) : null}
    </form>
  ) : null;

  // Mobile: two distinct stacked cards (engine summary, then the reg/quote form).
  // Icon sits left, vertically centered against both text lines.
  const mobileEngineSummaryCard = data.priceAnchor ? (
    <div className={`mt-1.5 flex w-full items-center gap-3 rounded-md border ${cardBorderClass} ${cardBgClass} p-2.5 backdrop-blur-sm md:hidden`}>
      <span style={{ color: GOLD }}>
        <GenIcon name="tag" className="h-4 w-4 shrink-0" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={`text-[0.74rem] font-semibold ${headingClass}`}>{price.headline}</span>
        {price.note ? <span className={`text-[0.7rem] ${bodyTextClass}`}>{price.note}</span> : null}
      </div>
    </div>
  ) : null;

  const mobileQuoteWidget = data.registrationInput ? (
    <div className={`mt-1.5 flex w-full flex-col gap-2 rounded-md border ${cardBorderClass} ${cardBgClass} p-2.5 backdrop-blur-sm md:hidden`}>
      {registrationRow}
    </div>
  ) : null;

  // Desktop: single combined card (price/codes row over the reg/quote row),
  // matching the original design.
  const desktopQuoteWidget = data.priceAnchor || data.registrationInput ? (
    <div className={`hidden w-full flex-col gap-4 rounded-md border ${cardBorderClass} ${cardBgClass} p-5 backdrop-blur-sm md:flex`}>
      {priceRow}
      {registrationRow}
    </div>
  ) : null;

  const tagPill = (
    <span className={`inline-flex w-fit max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-md border px-3 py-2 text-[0.82rem] leading-[1.35] md:px-2.5 md:py-1.5 md:text-[0.78rem] ${tagPillClass}`}>
      <span style={{ color: GOLD }}>
        <GenIcon name="car" className="h-3.5 w-3.5 shrink-0" />
      </span>
      <strong className="font-semibold" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: pill.model }} />
      {pill.body ? (
        <>
          <span aria-hidden="true" className="opacity-50">
            •
          </span>
          <span dangerouslySetInnerHTML={{ __html: pill.body }} />
        </>
      ) : null}
      {pill.years ? (
        <>
          <span aria-hidden="true" className="opacity-50">
            •
          </span>
          <span dangerouslySetInnerHTML={{ __html: pill.years }} />
        </>
      ) : null}
    </span>
  );

  return (
    <>
      {/* MOBILE: generation-style flow — copy → faded image → CTA/widgets */}
      <section className={`relative w-full overflow-hidden md:hidden ${headingClass} ${homeSectionBg(isDark, 1)}`}>
        <div className="relative mx-auto flex w-full max-w-8xl flex-col px-4 pb-5 pt-6">
          {tagPill}

          <div className="mt-5 flex max-w-[640px] flex-col gap-3">
            <SectionFadeStrip isDark={isDark} />
            <h1 className={`font-lora text-[2rem] font-medium leading-[1.08] tracking-normal ${headingClass}`}>
              <HeroHeadline h1={data.h1} />
            </h1>
            <SectionFadeStrip isDark={isDark} />
          </div>

          <p className={`mt-3 max-w-[600px] text-[0.88rem] leading-[1.45] ${bodyTextClass}`} dangerouslySetInnerHTML={{ __html: data.subHeadline }} />

          {/* Wall-to-wall image with top/bottom fade */}
          <div className="relative left-1/2 mt-5 aspect-[16/10] w-screen -translate-x-1/2 overflow-hidden">
            <Image src={heroImageMobile} alt="" fill className="object-cover object-center" sizes="100vw" priority />
            <div
              className={
                isDark
                  ? "absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,var(--color-page)_0%,transparent_100%)]"
                  : "absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,#EFEEE9_0%,transparent_100%)]"
              }
              aria-hidden="true"
            />
            <div
              className={
                isDark
                  ? "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,var(--color-page)_0%,transparent_100%)]"
                  : "absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,#EFEEE9_0%,transparent_100%)]"
              }
              aria-hidden="true"
            />
          </div>

          <div className="mt-2 flex w-full flex-col gap-1.5">
            {mobileTrustBadges}
            {mobileEngineSummaryCard}
            {mobileQuoteWidget}

            {tickerItems.length > 0 ? (
              <div className={`mt-1.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-md border ${cardBorderClass} ${isDark ? "bg-black/70" : "bg-white/85"} p-2.5 text-[0.65rem] ${bodyTextClass}`}>
                {tickerItems.map((item, index) => (
                  <span key={item} className="flex shrink-0 items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-[#189454]" : isDark ? "bg-white/40" : "bg-[var(--color-border-strong)]"}`}
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* DESKTOP: content-sized overlay hero (no fixed viewport height) */}
      <section className={`relative hidden w-full overflow-hidden md:block ${headingClass} ${homeSectionBg(isDark, 1)}`}>
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover object-[68%_center]" sizes="100vw" priority />
          {isDark ? (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.2)_75%)]" />
          ) : null}
        </div>

        <div className="relative mx-auto flex w-full max-w-8xl flex-col px-8 pb-6 pt-5">
          <div className="flex w-full max-w-[640px] flex-col gap-2">
            {tagPill}
            <SectionFadeStrip isDark={isDark} />
            <h1 className={`font-lora text-[2.6rem] font-medium leading-[1.08] tracking-normal ${headingClass}`}>
              <HeroHeadline h1={data.h1} />
            </h1>
            <SectionFadeStrip isDark={isDark} />
            <p className={`max-w-[560px] text-[0.92rem] leading-[1.35] ${bodyTextClass}`} dangerouslySetInnerHTML={{ __html: data.subHeadline }} />
          </div>

          <div className="mt-4 flex w-full max-w-[820px] flex-col gap-2">
            {desktopTrustBadges}
            {desktopQuoteWidget}
          </div>
        </div>
      </section>

      {tickerItems.length > 0 ? (
        <div className="hidden w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:block md:px-8">
          <div className="mx-auto flex w-full max-w-8xl flex-wrap items-center justify-between gap-x-2 gap-y-1.5 text-[0.72rem] text-[var(--color-text-muted)] md:text-[0.8rem]">
            {tickerItems.map((item, index) => (
              <span key={item} className="flex shrink-0 items-center gap-1.5">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${index === 0 ? "bg-[#189454]" : isDark ? "bg-white/40" : "bg-[var(--color-border-strong)]"}`}
                  aria-hidden="true"
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
