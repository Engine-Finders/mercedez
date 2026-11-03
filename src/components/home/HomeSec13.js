"use client";

import { useState } from "react";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function HomeSec13({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const items = data.items || [];
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <section className={`px-3 py-7 md:px-4 md:py-8 ${homeSectionBg(isDark, 13)}`}>
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-6">
          <div className="shrink-0">
            <SectionLabel number={13} isDark={isDark} />
            <h2 className={`font-lora text-[2rem] font-medium leading-[1.05] md:text-[2.85rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mb-2 hidden h-px flex-1 md:block" style={{ backgroundColor: GOLD }} />
        </div>

        <div
          className={`mt-5 overflow-hidden rounded-xl border md:mt-6 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"
          }`}
        >
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`border-b last:border-b-0 ${isDark ? "border-white/10" : "border-[rgba(0,0,0,0.06)]"}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3.5 text-left md:items-center md:gap-4 md:px-5 md:py-4 ${
                    isDark ? "text-white hover:bg-white/5" : "text-[var(--color-text)] hover:bg-[#F8F7F3]"
                  }`}
                >
                  <span className="font-lora text-[0.9rem] font-medium tabular-nums md:text-[1rem]" style={{ color: GOLD }}>
                    Q{item.id}
                  </span>
                  <span className="min-w-0 flex-1 font-lora text-[0.92rem] font-medium leading-snug md:text-[1.05rem]">
                    {item.question}
                  </span>
                  <span className={`${isDark ? "text-white/50" : "text-[var(--color-text-muted)]"} ${isOpen ? "rotate-180" : ""} transition-transform`}>
                    <Chevron />
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-4 pb-4 md:px-5" style={{ borderLeft: `3px solid ${GOLD}` }}>
                    <p
                      className={`pl-3 text-[0.82rem] font-light leading-[1.5] md:pl-[3.25rem] md:text-[0.9rem] ${
                        isDark ? "text-white/75" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
