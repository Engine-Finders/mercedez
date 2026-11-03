"use client";

import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionButton, sectionH2 } from "@/components/models/sectionTypography";

function cleanText(text = "") {
  return text
    .replaceAll("Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "-")
    .replaceAll("Ã¢â‚¬â€", "-")
    .replaceAll("Ã¢â€ â€™", "->")
    .replaceAll("✅", "")
    .replaceAll("❌", "")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "Frequently Asked Questions";
  const index = clean.indexOf(marker);

  if (index === -1) return { before: clean, accent: "" };

  return {
    before: clean.slice(0, index).trim(),
    accent: clean.slice(index).trim(),
  };
}

function FaqItem({ item, index }) {
  return (
    <details className="group overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[0_6px_16px_var(--color-shadow)]">
      <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3.5 marker:hidden md:px-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[14px] font-bold leading-none text-white" style={{ backgroundColor: GOLD }}>
          {item.id || index + 1}
        </span>
        <h3 className="font-lora text-[15px] font-medium leading-[1.15] text-[var(--color-text)] md:text-[17px]">{cleanText(item.question)}</h3>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className={`border-t border-[var(--color-border)] px-4 pb-4 pt-2.5 text-[var(--color-text-muted)] md:px-4 ${sectionBody}`}>{cleanText(item.answer)}</div>
    </details>
  );
}

export default function FAQAccordion({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const items = data.items || [];
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <section className={`py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 13)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 shadow-[0_10px_30px_var(--color-shadow)] md:p-6">
          <h2 className={`font-lora max-w-[980px] font-medium tracking-normal ${isDark ? "text-white" : "text-[var(--color-text)]"} ${sectionH2}`}>
            <span dangerouslySetInnerHTML={{ __html: title.before }} />
            {title.accent ? (
              <>
                {" "}
                <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
              </>
            ) : null}
          </h2>
          <div className="mt-3">
            <SectionFadeStrip isDark={isDark} />
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:gap-x-6">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="grid gap-3">
                {column.map((item, index) => (
                  <FaqItem key={item.id || item.question} item={item} index={columnIndex * midpoint + index} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-md bg-[var(--color-page-soft)] p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16">
                <HomeIcon name="note" isDark={isDark} gold className="h-9 w-9 object-contain md:h-10 md:w-10" />
              </span>
              <div>
                <h3 className="font-lora text-[18px] font-medium leading-tight text-[var(--color-text)] md:text-[20px]">Need a head-to-head comparison?</h3>
                <p className={`mt-1 max-w-[620px] text-[var(--color-text-muted)] ${sectionBody} md:text-[16px]`}>
                  Read our in-depth Mercedes reliability comparison guides.
                </p>
              </div>
            </div>
            <Link
              href="#"
              className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-md px-5 py-3 font-bold text-white no-underline shadow-[0_12px_28px_var(--color-shadow)] transition-all duration-200 hover:opacity-90 md:min-w-[300px] ${sectionButton}`}
              style={{ backgroundColor: GOLD }}
            >
              Read the Full Head-to-Head
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
