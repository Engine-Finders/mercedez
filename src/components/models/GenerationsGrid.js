"use client";

import { useState } from "react";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionDescription, sectionTableText } from "@/components/models/sectionTypography";

const defaultCarImage = "/right.webp";

const carImages = {
  E21: defaultCarImage,
  E30: defaultCarImage,
  E36: defaultCarImage,
  E46: defaultCarImage,
  E90: defaultCarImage,
  F30: defaultCarImage,
  G20: defaultCarImage,
};

function cleanText(text = "") {
  return String(text)
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "\u2013")
    .replaceAll("â€“", "\u2013")
    .replaceAll("Ã¢â‚¬â€", "\u2014")
    .replaceAll("â€”", "\u2014")
    .replaceAll("Ã¢â‚¬Â¢", "\u2022")
    .replaceAll("â€¢", "\u2022")
    .replaceAll("Ã¢Ëœâ€¦", "\u2605")
    .replaceAll("â˜…", "\u2605")
    .replaceAll("Ã¢Ëœâ€ ", "\u2606")
    .replaceAll("â˜†", "\u2606")
    .replaceAll("Ã‚Â½", "\u00bd")
    .replaceAll("Â½", "\u00bd")
    .replaceAll("Ã°Å¸â€�Â¥", "\ud83d\udd25")
    .replaceAll("ðŸ”¥", "\ud83d\udd25")
    .replaceAll("Ã¢â€ â€™", "\u2192")
    .replaceAll("â†’", "\u2192")
    .replace(/\s+/g, " ")
    .trim();
}

function generationCode(title = "") {
  return cleanText(title).split(" ").at(-1) || "";
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "Find Your Vehicle";
  const index = clean.indexOf(marker);

  if (index === -1) return { main: clean, accent: "" };

  return {
    main: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function splitCardTitle(title = "") {
  const clean = cleanText(title);
  const code = generationCode(clean);

  return {
    series: clean.replace(code, "").trim(),
    code,
  };
}

function GenerationCode({ children }) {
  return (
    <>
      <span className="text-[17px] font-bold leading-[1.1] md:hidden">{children}</span>
      <span className="hidden font-bold leading-[1.05] md:inline" style={{ fontSize: "17px" }}>
        {children}
      </span>
    </>
  );
}

function splitMeta(meta = "") {
  const [years = "", engines = ""] = cleanText(meta).split(" \u2022 ");
  return { years, engines };
}

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ChevronIcon({ open = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d={open ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
    </svg>
  );
}

function TableIcon({ type = "calendar", isDark }) {
  const name = type === "fuel" ? "fuel" : type === "star" ? "star" : type === "scale" ? "scales" : type === "spark" ? "insight" : "timeline";
  return <HomeIcon name={name} isDark={isDark} gold className="h-5 w-5 shrink-0 object-contain" />;
}

function Rating({ value, compact = false }) {
  const rating = cleanText(value);
  const stars = Array.from({ length: 5 }, (_, index) => {
    const char = rating[index] || "\u2606";
    return char === "\u2605" || char === "\u00bd" ? "filled" : char === "\u2606" ? "empty" : "filled";
  });

  if (rating.includes("\u00bd")) stars[3] = "half";

  return (
    <div className={`flex ${compact ? "gap-0.5 text-[15px]" : "gap-1 text-[18px]"} leading-none`}>
      {stars.map((state, index) => (
        <span key={index} className={state === "empty" ? "text-[#cfd5dd]" : ""} style={state !== "empty" ? { color: GOLD, opacity: state === "half" ? 0.8 : 1 } : undefined}>
          ★
        </span>
      ))}
    </div>
  );
}

function GenerationImage() {
  return (
    <div className="relative flex h-[120px] w-full items-center justify-center overflow-hidden md:h-[110px]">
      <img
        src="/right.webp"
        alt=""
        loading="lazy"
        className="max-h-full max-w-[90%] object-contain"
      />
    </div>
  );
}

function GenerationCard({ card, index, open = false, onToggle }) {
  const title = splitCardTitle(card.title);
  const meta = splitMeta(card.meta);
  const badge = cleanText(card.badge);
  const label = cleanText(card.cta?.label || `Explore ${title.code}`).replace(/^Explore the\s+/i, "Explore ").replace(/\s*\u2192\s*$/, "");
  const href = card.cta?.href || "#";
  const displayTitle = [title.series, title.code].filter(Boolean).join(" ");

  return (
    <article
      className="flex h-fit flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3 text-[var(--color-text)]"
      style={open ? { borderColor: `${GOLD}B3` } : undefined}
    >
      {/* Header — toggle */}
      <button type="button" onClick={onToggle} className="flex w-full items-start gap-2.5 text-left">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[0.8rem] font-bold text-white" style={{ backgroundColor: GOLD }}>
          {index + 1}
        </span>
        <h3 className="min-w-0 flex-1 text-[15px] font-bold leading-[1.25] md:text-[16px]" dangerouslySetInnerHTML={{ __html: displayTitle || cleanText(card.title) }} />
        <span className="mt-1 shrink-0" style={{ color: GOLD }}>
          <ChevronIcon open={open} />
        </span>
      </button>

      {/* Always visible body */}
      <div className="mt-2">
        <GenerationImage />
      </div>

      {badge ? (
        <p className="mt-2 text-[13px] font-semibold leading-[1.3]" dangerouslySetInnerHTML={{ __html: badge }} />
      ) : null}

      {meta.years ? (
        <p className="mt-1.5 text-[13px] leading-[1.35] text-[var(--color-text-muted)] md:text-[14px]" dangerouslySetInnerHTML={{ __html: meta.years }} />
      ) : null}

      {meta.engines ? (
        <p className="mt-0.5 text-[12px] leading-[1.35] text-[var(--color-text-muted)] md:text-[13px]">
          • <span dangerouslySetInnerHTML={{ __html: meta.engines }} />
        </p>
      ) : null}

      <div className="mt-2">
        <Rating value={card.rating} compact />
      </div>

      <Link
        href={href}
        className="mt-2.5 flex min-h-9 w-full items-center justify-center gap-2 rounded-md border px-3 text-[15px] font-bold no-underline transition hover:opacity-90 md:min-h-10 md:text-[16px]"
        style={{ borderColor: `${GOLD}B3`, color: GOLD }}
      >
        <span>{label}</span>
        <ArrowIcon className="h-3.5 w-3.5" />
      </Link>

      {/* Accordion: Our Verdict only when open — below CTA */}
      {open && card.verdict ? (
        <div className="mt-2.5 text-[14px] leading-[1.45]">
          <p className="font-bold">Our Verdict:</p>
          <p className="mt-1 text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: cleanText(card.verdict) }} />
        </div>
      ) : null}
    </article>
  );
}

function ComparisonTable({ rangeTable, isDark }) {
  const rows = rangeTable?.rows || [];
  if (!rows.length) return null;

  const diesel = {
    pre: cleanText(rows[0]?.power),
    middle: cleanText(rows[1]?.model),
    post: cleanText(rows[1]?.engineCode),
  };
  const petrol = {
    pre: cleanText(rows[2]?.model),
    middle: cleanText(rows[2]?.engineCode),
    post: cleanText(rows[2]?.power),
  };
  const recommendation = cleanText(rows[4]?.model || "The 3 Series we recommend for daily ownership");

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3 shadow-[0_8px_22px_var(--color-shadow)]">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F5EAD4]">
          <TableIcon type="scale" isDark={isDark} />
        </span>
        <h3 className={`${sectionTableText} font-bold text-[var(--color-text)] md:text-[18px]`} dangerouslySetInnerHTML={{ __html: cleanText(rangeTable.title) }} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse overflow-hidden rounded-md text-left text-[15px] text-[var(--color-text)] md:min-w-0">
          <thead>
            <tr>
              <th className="w-[15%] border border-[var(--color-border)] bg-[var(--color-page-soft)] p-3" />
              <th className="w-[22%] border border-[var(--color-border)] bg-[var(--color-page-soft)] p-3 font-bold">
                <span className="flex items-start gap-2">
                  <TableIcon isDark={isDark} />
                  Pre-2013
                  <br />
                  <span className="font-normal">(E90/F30 early)</span>
                </span>
              </th>
              <th className="w-[22%] border border-[var(--color-border)] bg-[var(--color-page-soft)] p-3 font-bold">
                <span className="flex items-start gap-2">
                  <TableIcon isDark={isDark} />
                  2013-2015
                  <br />
                  <span className="font-normal">(F30 pre-LCI)</span>
                </span>
              </th>
              <th className="w-[22%] border border-[var(--color-border)] bg-[var(--color-page-soft)] p-3 font-bold">
                <span className="flex items-start gap-2">
                  <TableIcon isDark={isDark} />
                  2016+
                  <br />
                  <span className="font-normal">(F30 LCI / G20)</span>
                </span>
              </th>
              <th className="w-[19%] border p-3 font-bold" style={{ borderColor: `${GOLD}55`, backgroundColor: "rgba(171,132,80,0.12)", color: GOLD }}>
                <span className="flex items-center gap-2">
                  <TableIcon type="star" isDark={isDark} />
                  Our position
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-[var(--color-border)] p-3 font-bold">
                <span className="flex items-center gap-2">
                  <TableIcon type="fuel" isDark={isDark} />
                  Core diesel
                </span>
              </th>
              <td className="border border-[var(--color-border)] p-3">
                <strong className="text-red-600" dangerouslySetInnerHTML={{ __html: diesel.pre.split(" ")[0] }} />
                <span dangerouslySetInnerHTML={{ __html: diesel.pre.replace(diesel.pre.split(" ")[0], "") }} />
              </td>
              <td className="border border-[var(--color-border)] p-3">
                <strong className="text-red-600" dangerouslySetInnerHTML={{ __html: diesel.middle.split(" ")[0] }} />
                <span dangerouslySetInnerHTML={{ __html: diesel.middle.replace(diesel.middle.split(" ")[0], "") }} />
              </td>
              <td className="border border-[var(--color-border)] p-3">
                <strong style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: diesel.post.split(" ")[0] }} />
                <span dangerouslySetInnerHTML={{ __html: diesel.post.replace(diesel.post.split(" ")[0], "") }} />
              </td>
              <td rowSpan={2} className="border p-3 text-[15px] font-bold leading-[1.35]" style={{ borderColor: `${GOLD}55`, backgroundColor: "rgba(171,132,80,0.1)", color: GOLD }} dangerouslySetInnerHTML={{ __html: recommendation }} />
            </tr>
            <tr>
              <th className="border border-[var(--color-border)] p-3 font-bold">
                <span className="flex items-center gap-2">
                  <TableIcon type="fuel" isDark={isDark} />
                  Core petrol
                </span>
              </th>
              <td className="border border-[var(--color-border)] p-3" dangerouslySetInnerHTML={{ __html: petrol.pre }} />
              <td className="border border-[var(--color-border)] p-3" dangerouslySetInnerHTML={{ __html: petrol.middle }} />
              <td className="border border-[var(--color-border)] p-3">
                <strong style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: petrol.post.split(" ")[0] }} />
                <span dangerouslySetInnerHTML={{ __html: petrol.post.replace(petrol.post.split(" ")[0], "") }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GenerationsGrid({ data }) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(-1);
  const [desktopSlide, setDesktopSlide] = useState(0);
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const cards = data.cards || [];
  const desktopSlides = [];

  for (let index = 0; index < cards.length; index += 4) {
    desktopSlides.push(cards.slice(index, index + 4));
  }

  const hasRangeTable = Boolean(data.rangeTable?.rows?.length);
  const hasComparisonLink = Boolean(data.comparisonLink?.label);

  return (
    <section data-theme-mode={theme} className={`py-5 text-[var(--color-text)] md:py-6 ${homeSectionBg(isDark, 4)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div>
          <h2 className={`font-lora max-w-[640px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[45px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            <span dangerouslySetInnerHTML={{ __html: title.main }} />
            {title.accent ? (
              <>
                <br />
                <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
              </>
            ) : null}
          </h2>
          <div className="mt-3">
            <SectionFadeStrip isDark={isDark} />
          </div>
          {data.subHeadline ? (
            <p className={`mt-3 max-w-[640px] ${sectionDescription} text-[var(--color-text-muted)]`} dangerouslySetInnerHTML={{ __html: cleanText(data.subHeadline) }} />
          ) : null}
        </div>

        <div className="mt-6 hidden md:block">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${desktopSlide * 100}%)` }}>
              {desktopSlides.map((slide, slideIndex) => (
                <div key={slideIndex} className="grid w-full shrink-0 grid-cols-4 items-start gap-3">
                  {slide.map((card, cardIndex) => {
                    const absoluteIndex = slideIndex * 4 + cardIndex;
                    return (
                      <GenerationCard
                        key={card.title}
                        card={card}
                        index={absoluteIndex}
                        open={openIndex === absoluteIndex}
                        onToggle={() => setOpenIndex(openIndex === absoluteIndex ? -1 : absoluteIndex)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {cards.length > 4 ? (
            <div className="mt-4 flex justify-center gap-2">
              {desktopSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show generation cards ${index + 1}`}
                  onClick={() => setDesktopSlide(index)}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: desktopSlide === index ? GOLD : "var(--color-border-strong)" }}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-5 space-y-2 md:hidden">
          {cards.map((card, index) => (
            <GenerationCard
              key={card.title}
              card={card}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {hasRangeTable ? (
          <div className="mt-5">
            <ComparisonTable rangeTable={data.rangeTable} isDark={isDark} />
          </div>
        ) : null}

        {hasComparisonLink ? (
          <p className="mt-4 flex items-center gap-3 pl-2 text-[15px]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F5EAD4]">
              <TableIcon type="spark" isDark={isDark} />
            </span>
            <span>Read the full comparison:</span>
            <Link href={data.comparisonLink.href} className="font-bold transition-all duration-200 hover:opacity-80" style={{ color: GOLD }}>
              <span dangerouslySetInnerHTML={{ __html: cleanText(data.comparisonLink.label).replace("Read the full comparison:", "").replace(/\s*\u2192\s*$/, "") }} />
            </Link>
            <ArrowIcon />
          </p>
        ) : null}
      </div>
    </section>
  );
}
