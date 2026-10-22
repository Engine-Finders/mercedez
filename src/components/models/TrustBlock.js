"use client";

import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";

function cleanText(text = "") {
  return text
    .replaceAll("Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "-")
    .replaceAll("Ã¢â‚¬â€", "-")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const markers = ["BMWEngines.uk", "mercedesengine.uk", "MercedesEngines.uk", "Mercedes Engines"];
  for (const marker of markers) {
    const index = clean.indexOf(marker);
    if (index !== -1) {
      return {
        before: clean.slice(0, index).trim(),
        accent: clean.slice(index).trim(),
      };
    }
  }
  return { before: clean, accent: "" };
}

function iconKey(item = {}) {
  const value = `${item.icon || ""} ${item.title || ""}`.toLowerCase();
  if (value.includes("heart") || value.includes("not to repair") || value.includes("💚")) return "repair";
  if (value.includes("wrench") || value.includes("specialist") || value.includes("🔧")) return "wrench";
  if (value.includes("part of") || value.includes("trophy") || value.includes("🏆")) return "engine-finders";
  return "chart";
}

function SignalIcon({ item, isDark }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center md:h-16 md:w-16">
      <HomeIcon name={iconKey(item)} isDark={isDark} gold className="h-9 w-9 object-contain md:h-10 md:w-10" />
    </span>
  );
}

export default function TrustBlock({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const signals = data.signals || [];

  return (
    <section className={`py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 12)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-3.5 shadow-[0_10px_30px_var(--color-shadow)] md:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-center">
            <div>
              <h2 className={`font-lora max-w-[650px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[45px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                <span dangerouslySetInnerHTML={{ __html: title.before }} />
                {title.accent ? (
                  <>
                    <br />
                    <span style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: title.accent }} />
                  </>
                ) : null}
              </h2>
              <div className="mt-2.5">
                <SectionFadeStrip isDark={isDark} />
              </div>

              <div className="mt-4">
                {signals.map((item) => (
                  <article key={item.title} className="flex gap-3.5 border-b border-[var(--color-border)] py-3.5 first:pt-0 last:border-b-0 last:pb-0 md:gap-4 md:py-3.5">
                    <SignalIcon item={item} isDark={isDark} />
                    <p className="text-[15px] leading-[1.42] text-[var(--color-text)] md:text-[16px]">
                      <strong className="font-bold" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: cleanText(item.title) }} />
                      {" - "}
                      <span dangerouslySetInnerHTML={{ __html: cleanText(item.text) }} />
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[340px] lg:block">
              <div className="absolute right-8 top-0 h-[230px] w-[390px] opacity-30" style={{ color: GOLD }}>
                <svg aria-hidden="true" viewBox="0 0 430 260" className="h-full w-full" fill="none">
                  <path d="M12 220h400" stroke="currentColor" strokeOpacity=".25" />
                  {[40, 85, 130, 175, 220, 265, 310, 355, 400].map((x) => (
                    <path key={x} d={`M${x} 30v190`} stroke="currentColor" strokeOpacity=".12" />
                  ))}
                  <path d="M22 180 70 178 120 150 165 115 210 82 260 100 315 55" stroke="currentColor" strokeWidth="3" />
                  {[22, 70, 120, 165, 210, 260, 315].map((x, index) => (
                    <circle key={x} cx={x} cy={[180, 178, 150, 115, 82, 100, 55][index]} r="6" fill="var(--color-surface)" stroke="currentColor" strokeWidth="3" />
                  ))}
                </svg>
              </div>
              <Image src="/model/Section 2-bg.webp" alt="" fill className="relative z-10 object-contain object-right-bottom" sizes="(min-width: 1024px) 48vw, 100vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
