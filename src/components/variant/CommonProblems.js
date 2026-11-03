"use client";

import { useState } from "react";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

const ACCENT_BY_INDEX = ["#e03232", "#da7a12", GOLD];
const URGENCY_TONE = {
  "🔴": { light: "text-[#db2e2e] bg-[#fff0f0]", dark: "text-[#ff8b90] bg-[rgba(255,45,53,0.15)]" },
  "🟠": { light: "text-[#da7a12] bg-[#fff5ea]", dark: "text-[#ffb66a] bg-[rgba(218,122,18,0.15)]" },
  "🟡": { light: "text-[#a3860f] bg-[#fffbe6]", dark: "text-[#e6c94d] bg-[rgba(214,180,20,0.15)]" },
};

function shortTitle(title = "") {
  const beforeParen = title.split(" (")[0];
  return beforeParen.replace(/^N47 Rear |^BMW /, "");
}

function ProblemDetail({ problem, index, isDark }) {
  const accent = ACCENT_BY_INDEX[index % ACCENT_BY_INDEX.length];
  const urgencyTone = URGENCY_TONE[problem.urgency?.icon] || URGENCY_TONE["🟠"];
  const urgencyClass = isDark ? urgencyTone.dark : urgencyTone.light;

  return (
    <div
      className={`flex h-full flex-col gap-3 overflow-hidden rounded-md border p-4 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <div className="flex items-start gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
          <GenIcon name="warning" className="h-4 w-4" />
        </span>
        <h3 className={`min-w-0 text-[0.95rem] font-bold leading-tight ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          {index + 1}. {problem.title}
        </h3>
      </div>

      <div className={`flex flex-col gap-2 text-[0.8rem] leading-[1.4] ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`}>
        {problem.symptoms ? (
          <p className="flex items-start gap-1.5">
            <span className="mt-0.5" style={{ color: GOLD }}>
              <GenIcon name="info" className="h-3.5 w-3.5 shrink-0" />
            </span>
            <span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Symptoms: </span>
              <span dangerouslySetInnerHTML={{ __html: problem.symptoms }} />
            </span>
          </p>
        ) : null}
        {problem.typicalMileage ? (
          <p className="flex items-start gap-1.5">
            <span className="mt-0.5" style={{ color: GOLD }}>
              <GenIcon name="gauge" className="h-3.5 w-3.5 shrink-0" />
            </span>
            <span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Typical mileage: </span>
              {problem.typicalMileage}
            </span>
          </p>
        ) : null}
        {problem.repairCost ? (
          <p className="flex items-start gap-1.5">
            <span className="mt-0.5" style={{ color: GOLD }}>
              <GenIcon name="wrench" className="h-3.5 w-3.5 shrink-0" />
            </span>
            <span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Repair cost: </span>
              {problem.repairCost}
            </span>
          </p>
        ) : null}
        {problem.replacementCost ? (
          <p className="flex items-start gap-1.5">
            <span className="mt-0.5" style={{ color: GOLD }}>
              <GenIcon name="engine" className="h-3.5 w-3.5 shrink-0" />
            </span>
            <span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Replacement cost: </span>
              {problem.replacementCost}
            </span>
          </p>
        ) : null}
        {problem.urgency ? (
          <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${urgencyClass}`}>
            {problem.urgency.icon} {problem.urgency.label} - <span dangerouslySetInnerHTML={{ __html: problem.urgency.text }} />
          </span>
        ) : null}
      </div>

      {problem.recommendation ? (
        <div className={`border-t pt-2.5 text-[0.8rem] leading-[1.45] ${isDark ? "border-white/10" : "border-[var(--color-border)]"}`}>
          <p className={`font-semibold ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>Our recommendation:</p>
          <p className={`mt-1 ${isDark ? "text-white/75" : "text-[var(--color-text-muted)]"}`} dangerouslySetInnerHTML={{ __html: problem.recommendation }} />
        </div>
      ) : null}

      {problem.failureLink ? (
        <a href={problem.failureLink.href} className="mt-auto flex items-center gap-1.5 text-[0.78rem] font-semibold no-underline" style={{ color: GOLD }}>
          {problem.failureLink.label}
          <GenIcon name="arrow" className="h-3.5 w-3.5 shrink-0" />
        </a>
      ) : null}
    </div>
  );
}

export default function CommonProblems({ data }) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  if (!data) return null;

  const isDark = theme === "dark";
  const problems = data.problems || [];

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 4)}`}>
      <div className="relative mx-auto w-full max-w-8xl px-4 md:px-8">
        <SectionLabel number={4} isDark={isDark} />
        <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
          Common Problems
        </h2>

        <div
          className={`mt-6 flex gap-2 overflow-x-auto rounded-md border p-1.5 md:hidden ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
          }`}
        >
          {problems.map((problem, index) => {
            const accent = ACCENT_BY_INDEX[index % ACCENT_BY_INDEX.length];
            const isActive = activeIndex === index;
            return (
              <button
                key={problem.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex flex-1 shrink-0 items-center gap-2 rounded-md px-2.5 py-2 text-[0.76rem] font-semibold"
                style={isActive ? { color: accent, boxShadow: `inset 0 -2px 0 ${accent}` } : { color: "var(--color-text-muted)" }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent }}>
                  <GenIcon name="warning" className="h-3 w-3" />
                </span>
                <span className="truncate">{shortTitle(problem.title)}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 md:hidden">
          {problems[activeIndex] ? <ProblemDetail problem={problems[activeIndex]} index={activeIndex} isDark={isDark} /> : null}
        </div>

        <div className="mt-6 hidden gap-4 md:grid md:grid-cols-3">
          {problems.map((problem, index) => (
            <ProblemDetail key={problem.id} problem={problem} index={index} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
