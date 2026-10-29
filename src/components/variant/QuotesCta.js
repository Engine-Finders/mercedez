"use client";

import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "../generation/GenIcons";

function splitHeadline(headline = "") {
  const cleaned = headline.replace(/\s*→\s*$/, "");
  const qIndex = cleaned.indexOf("? ");
  if (qIndex === -1) return { title: cleaned, subtitle: "" };
  return { title: cleaned.slice(0, qIndex + 1), subtitle: cleaned.slice(qIndex + 2) };
}

export default function QuotesCta({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  // Keep existing header images
  const image = isDark ? "/320d/compare_dark.webp" : "/320d/compare_light.webp";
  const { title, subtitle } = splitHeadline(data.headline);
  const headingClass = isDark ? "text-white" : "text-[var(--color-text)]";
  const bodyTextClass = isDark ? "text-white/80" : "text-[var(--color-text-muted)]";

  return (
    <section className={`w-full py-8 md:py-10 ${homeSectionBg(isDark, 5)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-8">
        <div
          className={`relative overflow-hidden rounded-xl border p-6 md:p-10 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"
          }`}
        >
          <div className="absolute inset-0 hidden md:block">
            <Image src={image} alt="" fill className="object-cover object-right" sizes="100vw" />
            {isDark ? (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,17,0.95)_0%,rgba(2,7,17,0.75)_45%,rgba(2,7,17,0.15)_85%)]" />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,247,243,0.96)_0%,rgba(248,247,243,0.78)_45%,rgba(248,247,243,0.12)_85%)]" />
            )}
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-col gap-3 md:max-w-[55%]">
              <SectionLabel number={5} isDark={isDark} />
              <div>
                <h2 className={`font-lora text-[29px] font-medium leading-[1.08] md:text-[36px] ${headingClass}`}>{title}</h2>
                {subtitle ? (
                  <p className="mt-1 flex items-center gap-1.5 text-[0.95rem] font-semibold leading-[1.3] md:text-[1.1rem]" style={{ color: GOLD }}>
                    {subtitle}
                    <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
                  </p>
                ) : null}
              </div>

              {data.supportingLine ? (
                <p className={`text-[0.88rem] leading-[1.5] ${bodyTextClass}`} dangerouslySetInnerHTML={{ __html: data.supportingLine }} />
              ) : null}

              {data.button ? (
                <a
                  href="/quote"
                  className="btn-cta mt-1 flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-center text-[0.76rem] font-bold text-white no-underline shadow-[0_12px_28px_rgba(0,0,0,0.35)] md:w-fit md:px-6 md:py-3.5 md:text-[0.85rem]"
                  style={{ backgroundColor: GOLD }}
                >
                  {data.button.label.replace(/\s*→\s*$/, "")}
                  <GenIcon name="arrow" className="h-4 w-4 shrink-0" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
