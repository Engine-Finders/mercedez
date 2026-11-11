"use client";

import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import OpenQuoteButton from "@/components/shared/OpenQuoteButton";
import { useTheme } from "@/components/shared/themeProvider";
import { generationCtaCopy } from "@/lib/ctaLabels";
import GenIcon from "./GenIcons";
import { chromeBg, iconTone, variantModelImage } from "@/components/variant/variantTheme";

const pointIcons = ["shield", "scale", "wrench"];

function TitleWithAccent({ title = "" }) {
  const markerIndex = title.indexOf("MercedesEngines.uk");
  if (markerIndex === -1) {
    const uk = title.indexOf(".uk");
    if (uk === -1) return <span dangerouslySetInnerHTML={{ __html: title }} />;
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: title.slice(0, uk) }} />
        <span style={{ color: GOLD }}>.uk</span>
      </>
    );
  }

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: title.slice(0, markerIndex) }} />
      <br />
      <span style={{ color: GOLD }}>MercedesEngines.uk</span>
    </>
  );
}

export default function TrustCta({ data, parent, slug = "" }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const modelImage = variantModelImage(parent);
  const bodyTextClass = isDark ? "text-white/75" : "text-[var(--color-text-muted)]";
  const finalCtaTextClass = isDark ? "text-white/90" : "text-[var(--color-text)]";
  const panelRgb = isDark ? "16,16,16" : "248,247,243";
  const cta = generationCtaCopy(parent, slug).trust;

  return (
    <section className={`py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 11)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-md border p-3.5 shadow-[0_10px_30px_var(--color-shadow)] md:p-5 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface-raised)]"
          }`}
        >
          {/* Full-bleed right image - fog covers any hard edge */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-[62%]">
              <Image src={modelImage} alt="" fill unoptimized className="object-cover object-[72%_center]" sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, rgba(${panelRgb},1) 0%, rgba(${panelRgb},1) 38%, rgba(${panelRgb},0.92) 48%, rgba(${panelRgb},0.55) 62%, rgba(${panelRgb},0.18) 78%, rgba(${panelRgb},0) 100%)`,
              }}
            />
          </div>

          <div className="relative z-10 max-w-[640px] lg:max-w-[52%]">
            <h2 className={`font-lora max-w-[650px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <TitleWithAccent title={data.h2} />
            </h2>
            <SectionLabel isDark={isDark} />

            <ul className="mt-5 flex flex-col">
              {data.trustPoints?.map((point, index) => (
                <li
                  key={point.title}
                  className={`flex items-start gap-3 border-b py-3.5 first:pt-0 last:border-b-0 last:pb-0 ${
                    isDark ? "border-white/10" : "border-[var(--color-border)]"
                  }`}
                >
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: iconTone(isDark), color: iconTone(isDark) }}
                  >
                    <GenIcon name={point.icon || pointIcons[index % pointIcons.length]} className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.95rem] font-semibold" style={{ color: GOLD }} dangerouslySetInnerHTML={{ __html: point.title }} />
                    <p className={`mt-0.5 text-[0.83rem] leading-[1.45] ${bodyTextClass}`} dangerouslySetInnerHTML={{ __html: point.text }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`relative z-10 mt-5 flex w-full flex-col items-start gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between md:gap-6 ${
              isDark ? "border-white/10 bg-[var(--color-page)]" : "border-[var(--color-border)] bg-white"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: iconTone(isDark), color: iconTone(isDark) }}>
                <GenIcon name="badge" className="h-4.5 w-4.5" />
              </span>
              <p className={`text-[0.88rem] leading-[1.45] md:text-[0.95rem] ${finalCtaTextClass}`}>
                {cta.support || data.finalCta || "Request a specialist quote based on your engine, vehicle details and replacement requirements."}
              </p>
            </div>
            <OpenQuoteButton
              className="btn-cta flex w-full shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-[0.8rem] font-bold tracking-wide text-white md:inline-flex md:w-auto md:whitespace-nowrap"
              style={{ backgroundColor: chromeBg(isDark) }}
            >
              <span>{cta.label}</span>
              <GenIcon name="chevron" className="h-4 w-4" />
            </OpenQuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
