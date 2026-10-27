"use client";

import Image from "next/image";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import GenIcon from "./GenIcons";

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

export default function TrustCta({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const bodyTextClass = isDark ? "text-white/75" : "text-[var(--color-text-muted)]";
  const finalCtaTextClass = isDark ? "text-white/90" : "text-[var(--color-text)]";

  return (
    <section className={`py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 11)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div
          className={`overflow-hidden rounded-md border p-3.5 shadow-[0_10px_30px_var(--color-shadow)] md:p-5 ${
            isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[var(--color-border)] bg-[var(--color-surface-raised)]"
          }`}
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-center">
            <div>
              <SectionLabel number={11} isDark={isDark} />
              <h2 className={`font-lora max-w-[650px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[42px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                <TitleWithAccent title={data.h2} />
              </h2>

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
                      style={{ borderColor: GOLD, color: GOLD }}
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

            <div className="relative hidden min-h-[340px] lg:block">
              <Image src="/right.webp" alt="" fill className="object-contain object-right-bottom" sizes="(min-width: 1024px) 48vw, 100vw" />
            </div>
          </div>

          {/* Full-width CTA bar below content + image */}
          {data.finalCta || data.ctaButton ? (
            <div
              className={`mt-5 flex w-full flex-col items-start gap-4 rounded-md border p-4 md:flex-row md:items-center md:justify-between md:gap-6 ${
                isDark ? "border-white/10 bg-[var(--color-page)]" : "border-[var(--color-border)] bg-white"
              }`}
            >
              {data.finalCta ? (
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: GOLD, color: GOLD }}>
                    <GenIcon name="badge" className="h-4.5 w-4.5" />
                  </span>
                  <p className={`text-[0.88rem] leading-[1.45] md:text-[0.95rem] ${finalCtaTextClass}`} dangerouslySetInnerHTML={{ __html: data.finalCta }} />
                </div>
              ) : null}
              {data.ctaButton ? (
                <a
                  href="/quote"
                  className="btn-cta flex w-full shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-center text-[0.8rem] font-bold uppercase tracking-wide text-white md:inline-flex md:w-auto md:whitespace-nowrap"
                  style={{ backgroundColor: GOLD }}
                >
                  <span dangerouslySetInnerHTML={{ __html: data.ctaButton.label.replace(/\s*→\s*$/, "") }} />
                  <GenIcon name="chevron" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
