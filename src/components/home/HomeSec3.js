"use client";

import {
  typeH1,
  typeH2,
  typeH3,
  typeH4,
  typeH5,
  typeH6,
  typeDesc,
  typeBody,
  typeHighlight,
  typeBadge,
  typeSmall,
  typeButton,
  typeTable,
  typeEyebrow,
} from "@/components/shared/typography";



import { useState } from "react";
import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

function GoldH3Strip({ className = "w-12" }) {
  return (
    <span
      className={`mt-1.5 mb-3 block h-[2px] ${className}`}
      style={{
        background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 50%, rgba(171,132,80,0.22) 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

function splitBadgeLabel(label = "") {
  const powered = label.match(/^Powered by\s+([0-9,+%]+)\s+(.*)$/i);
  if (powered) return { value: powered[1], text: powered[2] };
  const leading = label.match(/^([0-9,+%]+)\s+(.*)$/);
  if (leading) return { value: leading[1], text: leading[2] };
  return { value: "", text: label };
}

function TrustStrip({ items, isDark }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`mt-4 grid w-full max-w-[980px] grid-cols-4 gap-0 overflow-hidden rounded-xl border shadow-[0_10px_28px_rgba(10,26,43,0.08)] md:mt-5 ${
        isDark
          ? "border-[rgba(171,132,80,0.35)] bg-[rgba(10,10,10,0.55)]"
          : "border-[var(--color-border)] bg-white"
      }`}
    >
      {items.map((item, index) => {
        const { value, text } = splitBadgeLabel(item.label);
        return (
          <li
            key={item.label}
            className={`flex min-w-0 flex-col items-center gap-1 px-2 py-2.5 text-center md:flex-row md:items-start md:gap-3 md:px-5 md:py-3.5 md:text-left ${
              index < items.length - 1 ? (isDark ? "border-r border-white/10" : "border-r border-[var(--color-border)]") : ""
            }`}
          >
            <HomeIcon name={item.icon} tone={isDark ? "silver" : "gold"} className="h-7 w-7 shrink-0 object-contain md:mt-0.5 md:h-8 md:w-8" />
            <div className="min-w-0">
              {value ? (
                <p className={`text-[15px] font-bold leading-none md:text-[17px]`} style={{ color: GOLD }}>
                  {value}
                </p>
              ) : null}
              <p
                className={`text-[11px] font-medium leading-snug md:text-[13px] ${value ? "mt-0.5 md:mt-1" : ""} ${
                  isDark ? "text-white" : "text-[var(--color-text)]"
                }`}
              >
                {text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function HowItWorks({ data, activeStep, started, isDark }) {
  const steps = data?.steps || [];

  return (
    <div className={`rounded-lg border p-3 md:p-4 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-[#F8F7F3]"}`}>
      <h3 className={`font-lora ${typeH5} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data?.title || "How It Works"}
      </h3>
      <GoldH3Strip />
      <ol className="grid grid-cols-3 gap-0">
        {steps.map((step, index) => {
          const isActive = started && activeStep === step.step;
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.step}
              className={`relative flex flex-col items-center px-1 py-1 text-center sm:px-2 md:px-3 ${
                isActive ? (isDark ? "bg-white/8" : "bg-[#F5EAD4]/40") : ""
              }`}
            >
              {!isLast ? (
                <>
                  <span
                    className={`pointer-events-none absolute top-2 right-0 h-[calc(100%-1rem)] w-px sm:top-3 sm:h-[calc(100%-1.5rem)] ${
                      isDark ? "bg-white/15" : "bg-[rgba(0,0,0,0.12)]"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`pointer-events-none absolute top-1/2 right-[-0.3rem] z-[1] -translate-y-1/2 ${typeBadge} sm:right-[-0.35rem] ${
                      isDark ? "text-white/35" : "text-[rgba(0,0,0,0.28)]"
                    }`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </>
              ) : null}

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${typeBadge} font-bold sm:h-7 sm:w-7`}
                style={{ backgroundColor: "rgba(171,132,80,0.35)", color: isDark ? "#fff" : "#0a0a0a" }}
              >
                {step.step}
              </span>

              <HomeIcon name={step.icon} isDark={isDark} className="mt-2 h-8 w-8 object-contain sm:mt-3 sm:h-12 sm:w-12 md:h-14 md:w-14" />

              <p className={`font-lora mt-2 ${typeSmall} font-medium leading-snug sm:mt-3 ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {step.title}
              </p>
              <p className={`mt-1 max-w-[11.5rem] ${typeBadge} leading-[1.35] sm:mt-1.5 ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function WhyTrust({ data, isDark }) {
  const signals = data?.signals || [];

  return (
    <div className={`rounded-lg border p-3 md:p-4 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <h3 className={`font-lora ${typeH5} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data?.title || "Why Trust This Diagnosis?"}
      </h3>
      <GoldH3Strip />
      <ul className="flex flex-col gap-3.5 md:gap-4">
        {signals.map((signal) => (
          <li key={signal.title} className="flex items-start gap-3 md:gap-3.5">
            <span
              className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border md:h-14 md:w-14"
              style={{ borderColor: GOLD, backgroundColor: "rgba(171,132,80,0.12)" }}
            >
              <HomeIcon name={signal.icon} isDark={isDark} className="h-6 w-6 object-contain md:h-7 md:w-7" />
            </span>
            <div className="min-w-0">
              <p className={`${typeHighlight} font-medium leading-snug`} style={{ color: GOLD }}>
                {signal.title}
              </p>
              <p className={`mt-0.5 ${typeSmall} font-light ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
                {signal.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectField({ value, onChange, placeholder, options, isDark, darkCard }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full appearance-none rounded-md border bg-transparent px-3 py-2.5 ${typeBody} outline-none ${
        darkCard
          ? "border-white/70 text-white [&>option]:text-black"
          : isDark
            ? "border-white/20 text-white [&>option]:text-black"
            : "border-[var(--color-border)] text-[var(--color-text)]"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function CalculatorPanel({ data, steps = [], started, setStarted, activeStep, setActiveStep, exampleResult }) {
  const calc = data || {};
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [category, setCategory] = useState("");
  const [symptom, setSymptom] = useState("");
  const [age, setAge] = useState("");
  const [value, setValue] = useState("");
  const [mileage, setMileage] = useState("");

  const current = steps[activeStep - 1] || steps[0] || { title: "", text: "" };

  function start() {
    setStarted(true);
    setActiveStep(1);
  }

  function next() {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  }

  function back() {
    if (activeStep > 1) setActiveStep(activeStep - 1);
    else setStarted(false);
  }

  return (
    <div className="rounded-lg bg-[#0a0a0a] p-4 text-white md:p-5">
      {!started ? (
        <>
          <h3 className="font-lora ${typeH4}" style={{ color: GOLD }}>
            {calc.idleTitle || "Start Your Diagnosis"}
          </h3>
          <GoldH3Strip className="w-14" />
          <div className="mt-1 flex flex-col gap-2.5">
            <SelectField value={model} onChange={setModel} placeholder="Select Your Model" options={calc.modelOptions || []} darkCard />
            <SelectField value={engine} onChange={setEngine} placeholder="Select Engine Code" options={calc.engineOptions || []} darkCard />
            <SelectField value={category} onChange={setCategory} placeholder="Select Failure Category" options={calc.categoryOptions || []} darkCard />
          </div>
          <button
            type="button"
            onClick={start}
            className={`btn-cta ${typeButton} mt-4 flex w-full items-center justify-center rounded-md px-4 py-3 font-semibold uppercase tracking-wide text-white`}
            style={{ backgroundColor: GOLD }}
          >
            {calc.startLabel || "START DIAGNOSIS →"}
          </button>
          <p className={`mt-3 flex items-center justify-center gap-1.5 text-center ${typeSmall} text-white/70`}>
            <span aria-hidden="true">🔒</span>
            {calc.secureLine || "Secure • Private • No Obligation"}
          </p>
        </>
      ) : (
        <>
          <p className={`${typeBadge} font-medium uppercase tracking-[0.12em] text-white/55`}>
            Step {activeStep} of 3
          </p>
          <h3 className="mt-1 font-lora ${typeH4}">{current.title}</h3>
          <GoldH3Strip className="w-14" />
          <p className={`${typeSmall} text-white/70`}>{current.text}</p>

          {activeStep === 1 ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(calc.symptoms || []).map((item) => {
                const selected = symptom === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSymptom(item.label)}
                    className={`flex flex-col items-center gap-1.5 rounded-md border px-2 py-2.5 text-center transition ${
                      selected ? "border-[var(--color-primary)] bg-white/10" : "border-white/25 hover:border-white/50"
                    }`}
                  >
                    <HomeIcon name={item.icon} tone="gold" className="h-7 w-7 md:h-5 md:w-5" />
                    <span className={`${typeBadge} leading-snug text-white/90`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ) : null}

          {activeStep === 2 ? (
            <div className="mt-4 flex flex-col gap-2.5">
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Vehicle age (years)"
                className={`w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 ${typeBody} text-white outline-none placeholder:text-white/45`}
              />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Estimated value (£)"
                className={`w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 ${typeBody} text-white outline-none placeholder:text-white/45`}
              />
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Approx. mileage"
                className={`w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 ${typeBody} text-white outline-none placeholder:text-white/45`}
              />
            </div>
          ) : null}

          {activeStep === 3 && exampleResult ? (
            <div className="mt-4 rounded-md border border-white/20 bg-white/5 p-3">
              <p className={`${typeBadge} font-medium uppercase tracking-wide text-white/55`}>{exampleResult.badge}</p>
              <p className={`mt-1 ${typeHighlight} font-medium`}>{exampleResult.fault}</p>
              <p className={`mt-1 ${typeSmall} text-white/65`}>Common on: {exampleResult.commonOn}</p>
              <p className={`mt-0.5 ${typeSmall} text-white/65`}>Symptoms: {exampleResult.symptomsMatch}</p>
              <div className={`mt-2 flex flex-wrap gap-3 ${typeSmall} font-medium`}>
                <span style={{ color: GOLD }}>Repair {exampleResult.repairCost}</span>
                <span className="text-white/80">vs Replace {exampleResult.replaceCost}</span>
              </div>
              <p className={`mt-2 ${typeBadge} text-white/50`}>{exampleResult.footer}</p>
            </div>
          ) : null}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={back}
              className={`rounded-md border border-white/30 px-3 py-2.5 ${typeSmall} font-medium text-white/85 hover:border-white/55`}
            >
              {calc.backLabel || "← BACK"}
            </button>
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={next}
                className={`btn-cta ${typeButton} flex flex-1 items-center justify-center rounded-md px-4 py-2.5 font-semibold uppercase tracking-wide text-white`}
                style={{ backgroundColor: GOLD }}
              >
                {calc.continueLabel || "CONTINUE →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStarted(false);
                  setActiveStep(1);
                }}
                className={`btn-cta ${typeButton} flex flex-1 items-center justify-center rounded-md px-4 py-2.5 font-semibold uppercase tracking-wide text-white`}
                style={{ backgroundColor: GOLD }}
              >
                START OVER
              </button>
            )}
          </div>

          {activeStep === 3 ? (
            <div className="mt-4 border-t border-white/15 pt-4">
              <p className={`${typeSmall} text-white/70`}>
                Understand the likely engine fault, repair costs and whether replacement may be necessary.
              </p>
              <a
                href="/quote"
                className={`btn-cta ${typeButton} mt-2.5 flex w-full items-center justify-center rounded-md px-4 py-2.5 font-semibold text-white no-underline`}
                style={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Get Mercedes-Benz Specialist Advice →
              </a>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function BottomStats({ items, isDark }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`mt-5 grid w-full grid-cols-4 gap-0 overflow-hidden rounded-xl border shadow-[0_10px_28px_rgba(10,26,43,0.08)] md:mt-6 ${
        isDark
          ? "border-[rgba(171,132,80,0.35)] bg-[rgba(10,10,10,0.55)]"
          : "border-[var(--color-border)] bg-white"
      }`}
    >
      {items.map((item, index) => (
        <li
          key={item.label}
          className={`flex min-w-0 flex-col items-center gap-1.5 px-2 py-3 text-center sm:px-3 sm:py-4 md:flex-row md:items-start md:gap-3.5 md:px-6 md:py-4 md:text-left ${
            index < items.length - 1 ? (isDark ? "border-r border-white/10" : "border-r border-[var(--color-border)]") : ""
          }`}
        >
          <HomeIcon
            name={item.icon}
            tone={isDark ? "silver" : "gold"}
            className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8 md:mt-0.5 md:h-9 md:w-9"
          />
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-none md:text-[17px]" style={{ color: GOLD }}>
              {item.value}
            </p>
            <p className={`mt-1 text-[11px] font-medium leading-snug md:text-[13px] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              {item.label}
            </p>
            <p className={`mt-0.5 hidden text-[11px] leading-snug md:block md:text-[12px] ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
              {item.sub}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function HomeSec3({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [started, setStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className={`relative overflow-hidden px-3 py-7 md:px-6 md:py-8 ${homeSectionBg(isDark, 3)}`}>
      {data.headerImage ? (
        <div className="pointer-events-none absolute top-0 right-[-1%] z-0 hidden w-[52%] md:block lg:right-[2%] lg:w-[48%] xl:right-[4%] xl:w-[44%]">
          <div className="relative h-[340px] w-full max-w-[680px] lg:h-[400px] xl:h-[440px]">
            <Image
              src={data.headerImage.src}
              alt={data.headerImage.alt || ""}
              fill
              unoptimized
              priority={false}
              className="object-contain object-top drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 48vw, 0px"
            />
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <div className="max-w-[620px] md:max-w-[58%] lg:max-w-[54%]">
          <h2 className={`font-lora ${typeH2} ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
            Diagnose Your Mercedes-Benz Engine Problem
          </h2>
          <SectionLabel isDark={isDark} />
          <p className={`mt-3 max-w-[560px] ${typeDesc} ${isDark ? "text-white/78" : "text-[var(--color-text-muted)]"}`}>
            {data.subHeadline}
          </p>
          <TrustStrip items={data.trustStrip} isDark={isDark} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-[1.28fr_0.88fr_1.28fr] md:gap-4 lg:grid-cols-[1.32fr_0.82fr_1.32fr]">
          <HowItWorks data={data.howItWorks} activeStep={activeStep} started={started} isDark={isDark} />
          <CalculatorPanel
            data={data.calculator}
            steps={data.howItWorks?.steps || []}
            started={started}
            setStarted={setStarted}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            exampleResult={data.exampleResult}
          />
          <WhyTrust data={data.whyTrust} isDark={isDark} />
        </div>

        <BottomStats items={data.bottomStats} isDark={isDark} />
      </div>
    </section>
  );
}
