"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg, SectionFadeStrip } from "@/components/home/sectionBg";
import { useTheme } from "@/components/shared/themeProvider";
import { sectionBody, sectionButton, sectionDescription } from "@/components/models/sectionTypography";

const ICON_MAP = {
  calculator: "calculator",
  engineSearch: "engine",
  documentSearch: "clipboard",
  engineQuestion: "bulb",
  check: "check",
  chart: "chart",
  shield: "shield",
  info: "info",
  target: "insight",
};

function cleanText(text = "") {
  return text
    .replaceAll("Ãƒâ€šÃ‚Â£", "\u00a3")
    .replaceAll("Ã‚Â£", "\u00a3")
    .replaceAll("Ã¢â‚¬â€œ", "-")
    .replaceAll("Ã¢â‚¬â€", "-")
    .replaceAll("Ã¢â€ â€™", "->")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function modelNameFromTitle(title = "") {
  const clean = cleanText(title);
  const match = clean.match(/My\s+(.+?)\s+Engine/i);
  return match ? match[1] : "Mercedes";
}

function splitTitle(title = "") {
  const clean = cleanText(title);
  const marker = "or Should I Replace It?";
  const index = clean.indexOf(marker);

  if (index === -1) {
    return { before: clean, accent: "" };
  }

  return {
    before: clean.slice(0, index).trim(),
    accent: marker,
  };
}

function introParts(intro = "") {
  const clean = cleanText(intro);
  const marker = " On the ";
  const markerIndex = clean.indexOf(marker);

  if (markerIndex !== -1) {
    return {
      first: clean.slice(0, markerIndex).trim(),
      second: clean.slice(markerIndex + 1).trim(),
    };
  }

  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];

  return {
    first: sentences[0]?.trim() || clean,
    second: sentences.slice(1).join(" ").trim(),
  };
}

function Icon({ name, isDark, className = "h-8 w-8" }) {
  return <HomeIcon name={ICON_MAP[name] || "calculator"} isDark={isDark} gold className={`${className} object-contain`} />;
}

function CircleIcon({ name, isDark, large = false, className = "" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${large ? "h-28 w-28 md:h-36 md:w-36" : "h-12 w-12"} ${className}`}>
      <Icon name={name} isDark={isDark} className={large ? "h-16 w-16 md:h-20 md:w-20" : "h-7 w-7"} />
    </span>
  );
}

function Feature({ icon, title, text, isDark }) {
  return (
    <li className="flex min-w-0 items-start gap-2.5 pr-3 last:pr-0 md:gap-3 md:pr-4">
      <span className="mt-0.5 shrink-0">
        <Icon name={icon} isDark={isDark} className="h-7 w-7 md:h-8 md:w-8" />
      </span>
      <span className="min-w-0">
        <strong className="block text-[13px] leading-tight text-[var(--color-text)] md:text-[14px]" dangerouslySetInnerHTML={{ __html: title }} />
        <span className="mt-0.5 block text-[12px] leading-[1.2] text-[var(--color-text-muted)] md:text-[13px]">{text}</span>
      </span>
    </li>
  );
}

function ArrowIcon({ className = "h-7 w-7" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function PrimaryPath({ path, modelName, isDark }) {
  return (
    <article className="rounded-md bg-[var(--color-surface-raised)] p-3.5 shadow-[0_10px_28px_var(--color-shadow)] md:p-4">
      <span className="inline-flex rounded px-2 py-1 text-[12px] font-bold uppercase leading-none text-white md:px-2.5 md:py-1 md:text-[13px]" style={{ backgroundColor: GOLD }}>
        Path 1
      </span>
      <div className="mt-3.5 grid grid-cols-[auto_1fr] items-center gap-3.5 md:grid-cols-[1fr_auto] md:items-start">
        <div className="order-2 md:order-1">
          <h3 className="font-lora text-[30px] font-medium leading-[1.06] text-[var(--color-text)] md:text-[42px]">
            <span style={{ color: GOLD }}>Know</span> your engine?
          </h3>
          <p className={`mt-2 max-w-[420px] text-[var(--color-text-muted)] ${sectionDescription}`}>
            Launch the diagnostic calculator with <span dangerouslySetInnerHTML={{ __html: modelName }} /> pre-selected.
          </p>
        </div>
        <CircleIcon name="engineSearch" isDark={isDark} large className="order-1 md:order-2" />
      </div>

      <Link
        href={path?.href || "/fault-diagnostic-calculator"}
        className={`mt-3.5 flex min-h-12 items-center justify-between gap-2.5 rounded-md px-3.5 py-2.5 font-bold text-white no-underline shadow-[0_12px_28px_var(--color-shadow)] transition-all duration-200 hover:opacity-90 ${sectionButton}`}
        style={{ backgroundColor: GOLD }}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon name="calculator" isDark className="h-8 w-8 shrink-0" />
          <span className="min-w-0">
            <span className="block leading-tight">Launch Diagnostic Calculator</span>
            <span className="mt-0.5 block text-[12px] font-normal leading-tight md:text-[13px]">
              <span dangerouslySetInnerHTML={{ __html: modelName }} /> pre-selected
            </span>
          </span>
        </span>
        <ArrowIcon className="h-5 w-5 shrink-0" />
      </Link>

      <ul className="mt-4 grid grid-cols-3 gap-2.5">
        <Feature icon="check" title={`${modelName} pre-selected`} text="All generations covered" isDark={isDark} />
        <Feature icon="chart" title="Real UK cost data" text="Used, recon & rebuilt" isDark={isDark} />
        <Feature icon="shield" title="Instant verdict" text="Repair vs replace" isDark={isDark} />
      </ul>
    </article>
  );
}

function SecondaryPath({ path, isDark }) {
  const note = "Identification is the first step inside the tool.";

  return (
    <article className="rounded-md bg-[var(--color-surface-raised)] p-3.5 shadow-[0_10px_28px_var(--color-shadow)] md:p-4">
      <span className="inline-flex rounded px-2 py-1 text-[12px] font-bold uppercase leading-none text-white md:px-2.5 md:py-1 md:text-[13px]" style={{ backgroundColor: GOLD }}>
        Path 2
      </span>
      <div className="mt-3.5 grid grid-cols-[auto_1fr] items-center gap-3.5 md:grid-cols-[1fr_auto] md:items-start">
        <div className="order-2 md:order-1">
          <h3 className="font-lora max-w-[420px] text-[30px] font-medium leading-[1.06] text-[var(--color-text)] md:text-[42px]">
            <span style={{ color: GOLD }}>Not sure</span> which engine you have?
          </h3>
          <p className={`mt-2 text-[var(--color-text-muted)] ${sectionDescription}`}>We&apos;ll identify it first.</p>
        </div>
        <CircleIcon name="documentSearch" isDark={isDark} large className="order-1 md:order-2" />
      </div>

      <Link
        href={path?.href || "#"}
        className={`mt-3.5 flex min-h-12 items-center justify-between gap-2.5 rounded-md border px-3.5 py-2.5 font-bold no-underline transition-all duration-200 hover:opacity-90 ${sectionButton}`}
        style={{ borderColor: GOLD, color: GOLD }}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon name="engineQuestion" isDark={isDark} className="h-8 w-8 shrink-0" />
          <span className="min-w-0">
            <span className="block leading-tight">Identify My Engine First</span>
            <span className="mt-0.5 block text-[12px] font-normal leading-tight text-[var(--color-text-muted)] md:text-[13px]">Then launch the diagnostic calculator</span>
          </span>
        </span>
        <ArrowIcon className="h-5 w-5 shrink-0" />
      </Link>

      <div className="mt-4 flex gap-3 rounded-md bg-[var(--color-page-soft)] p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
          <Icon name="info" isDark className="h-5 w-5" />
        </span>
        <p className={`text-[var(--color-text)] ${sectionBody}`}>
          <strong className="font-bold" dangerouslySetInnerHTML={{ __html: note }} />
          <br />
          <span className="text-[var(--color-text-muted)]">We&apos;ll pinpoint your exact engine code before running the diagnostics.</span>
        </p>
      </div>
    </article>
  );
}

function SmartDecision({ isDark }) {
  return (
    <div className="flex max-w-[620px] gap-3.5 rounded-md bg-[var(--color-page-soft)] p-3.5 shadow-[0_8px_22px_var(--color-shadow)] md:p-4">
      <Icon name="calculator" isDark={isDark} className="h-9 w-9 shrink-0 md:h-11 md:w-11" />
      <p className={`text-[var(--color-text)] ${sectionBody} md:text-[17px]`}>
        <strong className="font-bold" style={{ color: GOLD }}>
          The smarter way to decide:
        </strong>{" "}
        Get a personalised repair-vs-replace verdict using real UK cost data.
      </p>
    </div>
  );
}

export default function CalculatorCTA({ data }) {
  const { theme } = useTheme();
  if (!data) return null;

  const isDark = theme === "dark";
  const title = splitTitle(data.h2);
  const intro = introParts(data.intro);
  const modelName = modelNameFromTitle(data.h2);
  const paths = data.paths || [];

  return (
    <section className={`relative overflow-hidden py-6 text-[var(--color-text)] md:py-8 ${homeSectionBg(isDark, 11)}`}>
      <div className="mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-md bg-[var(--color-surface-raised)]">
          <Image src="/model/Hero-bg-image.webp" alt="" fill className="object-cover object-center" sizes="100vw" priority={false} />
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(90deg,rgba(7,7,6,0.97)_0%,rgba(7,7,6,0.88)_40%,rgba(7,7,6,0.35)_72%,transparent_100%)"
                : "linear-gradient(90deg,#EFEEE9_0%,rgba(239,238,233,0.95)_40%,rgba(239,238,233,0.35)_72%,transparent_100%)",
            }}
          />
          <div className="relative z-10 px-4 py-5 lg:px-6 lg:py-6">
            <div className="max-w-[820px]">
              <h2 className={`font-lora max-w-[820px] text-[29px] font-medium leading-[1.08] tracking-normal md:text-[45px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
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
              {data.intro ? (
                <div className={`mt-3 max-w-[700px] text-[var(--color-text-muted)] ${sectionDescription}`}>
                  <p dangerouslySetInnerHTML={{ __html: intro.first }} />
                  {intro.second ? <p className="mt-1.5" dangerouslySetInnerHTML={{ __html: intro.second }} /> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 lg:hidden">
          <SmartDecision isDark={isDark} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <PrimaryPath path={paths[0]} modelName={modelName} isDark={isDark} />
          <SecondaryPath path={paths[1]} isDark={isDark} />
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-md bg-[#0a0a0a] p-4 text-white shadow-[0_12px_32px_var(--color-shadow)] md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center">
              <Icon name="target" isDark className="h-12 w-12" />
            </span>
            <div className="max-w-[700px]">
              <h3 className="font-lora text-[20px] font-medium leading-tight md:text-[22px]">Stop guessing. Get the right answer.</h3>
              <p className={`mt-2 text-white/90 ${sectionDescription}`}>
                Our calculator compares real repair and replacement costs against your car&apos;s value - so you know the financially smarter move.
              </p>
            </div>
          </div>
          <Link
            href={paths[0]?.href || "/fault-diagnostic-calculator"}
            className={`inline-flex min-h-14 shrink-0 items-center justify-center gap-4 rounded-md px-5 py-3.5 font-bold text-white no-underline shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition-all duration-200 hover:opacity-90 md:min-w-[360px] ${sectionButton}`}
            style={{ backgroundColor: GOLD }}
          >
            Start Your Verdict Now
            <ArrowIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
