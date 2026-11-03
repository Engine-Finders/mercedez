"use client";

import { useState } from "react";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "@/components/generation/GenIcons";
import { sectionDescription } from "@/components/models/sectionTypography";

function cleanText(text = "") {
  return String(text)
    .replace(/\u00c2\u00a3|\u00a3/g, "\u00a3")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u201c|\u00c3\u00a2\u00e2\u20ac\u201d|\u00e2\u20ac\u201c|\u00e2\u20ac\u201d|\u2013|\u2014/g, "\u2013")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u02dc|\u00e2\u20ac\u2018|\u2011/g, "-")
    .replace(/\u00c3\u00a2\u00e2\u20ac\u00a2|\u00e2\u20ac\u00a2|\u2022/g, "\u2022")
    .replace(/\s+/g, " ")
    .trim();
}

function shortEngineName(engineLabel = "") {
  return cleanText(engineLabel).replace(/^Mercedes(?:-Benz|-AMG)?\s+/i, "").replace(/^BMW\s+/i, "") || "Engine";
}

function parseQuestion(question = "") {
  const clean = cleanText(question);
  const match = clean.match(/^(.+?)\s*[-–-]\s*[“"']?(.+?)[”"']?\s*$/);
  if (!match) return { topic: "", title: clean };
  return {
    topic: match[1].trim(),
    title: match[2].replace(/^["“']|["”']$/g, "").trim(),
  };
}

function renderTaggedText(text = "") {
  return cleanText(text).split(/(\[[^\]]+\])/g).map((part, index) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span key={`${part}-${index}`} className="font-semibold text-[#AB8450]">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function FaqItem({ item, open, onToggle, isLast, isDark }) {
  const { topic, title } = parseQuestion(item.question);

  return (
    <div className={!isLast ? "border-b border-[var(--color-border)]" : ""}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left md:gap-3.5 md:px-5 md:py-4"
        aria-expanded={open}
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[13px] font-bold text-white" style={{ backgroundColor: GOLD }}>
          {item.id}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block font-lora text-[14px] font-medium leading-[1.3] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            {topic ? (
              <>
                {topic} – “{title}”
              </>
            ) : (
              title
            )}
          </span>
          {open ? (
            <span className={`mt-1.5 block text-[13px] leading-[1.45] ${isDark ? "text-white/78" : "text-[var(--color-text-muted)]"}`}>
              {renderTaggedText(item.answer)}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className={`mt-1 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: GOLD }}
        >
          <GenIcon name="chevronDown" className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

export default function FAQAccordion({ data, engineLabel = "BMW Engine" }) {
  const { theme } = useTheme();
  const items = data?.items || [];
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  if (!data) return null;

  const isDark = theme === "dark";
  const engineCode = shortEngineName(engineLabel);

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-6 text-[var(--color-text)] md:py-9 ${homeSectionBg(isDark, 6)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="grid items-start gap-5 md:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.35fr)] md:gap-8 lg:gap-10">
          <div className="min-w-0 max-w-[480px]">
            <SectionLabel number={6} isDark={isDark} />
            <div className="flex flex-col gap-3">
<h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                Frequently Asked Questions
              </h2>
</div>
            <p className={`mt-4 ${sectionDescription} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Expert answers to the most common Mercedes{" "}
              <span className="font-semibold" style={{ color: GOLD }}>{engineCode}</span> engine questions.
            </p>
          </div>

          <div
            className={`overflow-hidden rounded-xl border backdrop-blur-[2px] ${
              isDark
                ? "border-[var(--color-border)] bg-[var(--color-surface)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_14px_36px_var(--color-shadow)]"
            }`}
          >
            {items.map((item, index) => (
              <FaqItem
                key={item.id}
                item={item}
                isDark={isDark}
                isLast={index === items.length - 1}
                open={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
