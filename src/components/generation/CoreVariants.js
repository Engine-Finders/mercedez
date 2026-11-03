"use client";

import Image from "next/image";
import Link from "next/link";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "./GenIcons";

function VariantPanel({ title, icon, variants, tone, isDark }) {
  if (!variants?.length) return null;
  const isDiesel = tone === "diesel";
  const labelToneClass = isDiesel ? "" : "text-[#189454]";
  const blockToneClass = isDiesel ? "" : "bg-[#189454]";
  const textClass = isDark ? "text-white" : "text-[var(--color-text)]";
  const separatorClass = isDark ? "text-white/50" : "text-[var(--color-text-soft)]";

  return (
    <div
      className={`flex items-stretch overflow-hidden rounded-md border ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
    >
      <span
        className={`flex w-16 shrink-0 items-center justify-center text-white ${isDiesel ? "" : blockToneClass}`}
        style={isDiesel ? { backgroundColor: GOLD, clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" } : { clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)" }}
      >
        <GenIcon name={icon} className="h-7 w-7" />
      </span>
      <div className="min-w-0 flex-1 py-4 pl-3 pr-4">
        <p
          className={`text-[0.76rem] font-semibold uppercase tracking-wide ${isDiesel ? "" : labelToneClass}`}
          style={isDiesel ? { color: GOLD } : undefined}
        >
          {title}
        </p>
        <p className={`mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.98rem] font-bold leading-snug ${textClass}`}>
          {variants.map((variant, index) => (
            <span key={variant.url || variant.name || index} className="inline-flex items-center">
              <Link
                href={variant.url || "#"}
                className={`cursor-pointer rounded-sm px-1 py-0.5 transition-colors duration-200 hover:opacity-80 focus-visible:outline-none ${textClass}`}
                style={{ color: "inherit" }}
                dangerouslySetInnerHTML={{ __html: variant.name }}
              />
              {index < variants.length - 1 ? (
                <span aria-hidden="true" className={separatorClass}>
                  •
                </span>
              ) : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function CoreVariants({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const scopeNoteTextClass = isDark ? "text-white/85" : "text-[var(--color-text-muted)]";
  const scopeNoteStrongClass = isDark ? "text-white" : "text-[var(--color-text)]";

  const scopeNoteBlock = data.scopeNote ? (
    <div
      className={`flex gap-3 rounded-md border p-4 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-white"
      }`}
    >
      <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
        <GenIcon name="info" className="h-5 w-5" />
      </span>
      <p className={`text-[0.82rem] leading-[1.5] ${scopeNoteTextClass}`}>
        <span className={`font-semibold ${scopeNoteStrongClass}`}>Scope note: </span>
        <span dangerouslySetInnerHTML={{ __html: data.scopeNote }} />
      </p>
    </div>
  ) : null;

  const variantPanels = (
    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <VariantPanel title="Diesel Variants" icon="drum" variants={data.dieselVariants} tone="diesel" isDark={isDark} />
      <VariantPanel title="Petrol Variants" icon="drum" variants={data.petrolVariants} tone="petrol" isDark={isDark} />
    </div>
  );

  return (
    <section className={`w-full py-8 text-[var(--color-text)] md:py-10 ${homeSectionBg(isDark, 8)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-center">
          <div>
            <SectionLabel number={8} isDark={isDark} />
            <h2 className={`font-lora text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Core Variants
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              {variantPanels}
              {scopeNoteBlock}
            </div>
          </div>

          <div className="relative hidden min-h-[300px] lg:block">
            <Image src="/right.webp" alt="" fill className="object-contain object-right" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
