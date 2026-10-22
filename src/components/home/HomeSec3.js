"use client";

import { useState } from "react";
import Image from "next/image";
import HomeIcon from "@/components/home/homeIcons";
import { GOLD, homeSectionBg } from "@/components/home/sectionBg";
import SectionLabel from "@/components/reusableComponents/SectionLabel";
import { useTheme } from "@/components/shared/themeProvider";

function TrustStrip({ items, isDark }) {
  if (!items?.length) return null;

  return (
    <ul
      className={`mt-4 grid grid-cols-4 gap-1.5 rounded-lg border px-2 py-3 md:mt-5 md:flex md:flex-wrap md:gap-x-8 md:gap-y-2 md:px-4 md:py-2.5 ${
        isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[rgba(0,0,0,0.06)] bg-white/80"
      }`}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className={`flex flex-col items-center gap-1.5 text-center text-[0.58rem] leading-[1.25] md:inline-flex md:flex-row md:items-center md:gap-2 md:text-left md:text-[0.8rem] ${
            isDark ? "text-white/88" : "text-[var(--color-text)]"
          }`}
        >
          <HomeIcon name={item.icon} isDark={isDark} gold className="h-7 w-7 shrink-0 md:h-5 md:w-5" />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function HowItWorks({ data, activeStep, started, isDark }) {
  const steps = data?.steps || [];

  return (
    <div className={`rounded-lg border p-3 md:p-4 ${isDark ? "border-white/10 bg-[var(--color-surface-raised)]" : "border-[#E5E5E5] bg-white"}`}>
      <h3 className={`mb-3 font-lora text-[1.05rem] font-medium md:text-[1.15rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data?.title || "How It Works"}
      </h3>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2 md:grid-cols-1">
        {steps.map((step) => {
          const isActive = started && activeStep === step.step;
          return (
            <li
              key={step.step}
              className={`relative flex flex-col items-start gap-1.5 rounded-md p-2 transition ${
                isActive ? (isDark ? "bg-white/8" : "bg-[#F5EAD4]") : ""
              }`}
            >
              {/* Mobile: number + icon + title in one row · md+: number+icon, then title below */}
              <div className="flex w-full items-center gap-2.5">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold text-white md:h-6 md:w-6 md:text-[0.7rem]"
                  style={{ backgroundColor: GOLD }}
                >
                  {step.step}
                </span>
                <HomeIcon name={step.icon} isDark={isDark} gold className="h-7 w-7 shrink-0 md:h-5 md:w-5" />
                <p className={`min-w-0 flex-1 text-[0.88rem] font-medium leading-snug md:hidden ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                  {step.title}
                </p>
              </div>
              <p className={`hidden text-[0.82rem] font-medium leading-snug md:block ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {step.title}
              </p>
              <p className={`text-[0.7rem] leading-[1.35] ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
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
      <h3 className={`mb-3 font-lora text-[1.05rem] font-medium md:text-[1.15rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
        {data?.title || "Why Trust This Diagnosis?"}
      </h3>
      <ul className="flex flex-col gap-3">
        {signals.map((signal) => (
          <li key={signal.title} className="flex items-start gap-2.5">
            <span className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:h-9 md:w-9 ${isDark ? "bg-white/10" : "bg-[#F5EAD4]"}`}>
              <HomeIcon name={signal.icon} isDark={isDark} gold className="h-6 w-6 md:h-5 md:w-5" />
            </span>
            <div className="min-w-0">
              <p className={`text-[0.85rem] font-medium leading-snug ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
                {signal.title}
              </p>
              <p className={`mt-0.5 text-[0.72rem] font-light leading-[1.35] ${isDark ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>
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
      className={`w-full appearance-none rounded-md border bg-transparent px-3 py-2.5 text-[0.85rem] outline-none ${
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
          <h3 className="font-lora text-[1.25rem] font-medium md:text-[1.4rem]">{calc.idleTitle || "Start Your Diagnosis"}</h3>
          <div className="mt-4 flex flex-col gap-2.5">
            <SelectField value={model} onChange={setModel} placeholder="Select Your Model" options={calc.modelOptions || []} darkCard />
            <SelectField value={engine} onChange={setEngine} placeholder="Select Engine Code" options={calc.engineOptions || []} darkCard />
            <SelectField value={category} onChange={setCategory} placeholder="Select Failure Category" options={calc.categoryOptions || []} darkCard />
          </div>
          <button
            type="button"
            onClick={start}
            className="btn-cta mt-4 flex w-full items-center justify-center rounded-md px-4 py-3 text-[0.85rem] font-semibold uppercase tracking-wide text-white"
            style={{ backgroundColor: GOLD }}
          >
            {calc.startLabel || "START DIAGNOSIS →"}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-white/70">
            <span aria-hidden="true">🔒</span>
            {calc.secureLine || "Secure • Private • No Obligation"}
          </p>
        </>
      ) : (
        <>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white/55">
            Step {activeStep} of 3
          </p>
          <h3 className="mt-1 font-lora text-[1.2rem] font-medium md:text-[1.35rem]">{current.title}</h3>
          <p className="mt-1.5 text-[0.8rem] leading-[1.4] text-white/70">{current.text}</p>

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
                    <HomeIcon name={item.icon} isDark gold className="h-7 w-7 md:h-5 md:w-5" />
                    <span className="text-[0.68rem] leading-snug text-white/90">{item.label}</span>
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
                className="w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 text-[0.85rem] text-white outline-none placeholder:text-white/45"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Estimated value (£)"
                className="w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 text-[0.85rem] text-white outline-none placeholder:text-white/45"
              />
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Approx. mileage"
                className="w-full rounded-md border border-white/70 bg-transparent px-3 py-2.5 text-[0.85rem] text-white outline-none placeholder:text-white/45"
              />
            </div>
          ) : null}

          {activeStep === 3 && exampleResult ? (
            <div className="mt-4 rounded-md border border-white/20 bg-white/5 p-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-wide text-white/55">{exampleResult.badge}</p>
              <p className="mt-1 text-[0.95rem] font-medium">{exampleResult.fault}</p>
              <p className="mt-1 text-[0.72rem] text-white/65">Common on: {exampleResult.commonOn}</p>
              <p className="mt-0.5 text-[0.72rem] text-white/65">Symptoms: {exampleResult.symptomsMatch}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-[0.82rem] font-medium">
                <span style={{ color: GOLD }}>Repair {exampleResult.repairCost}</span>
                <span className="text-white/80">vs Replace {exampleResult.replaceCost}</span>
              </div>
              <p className="mt-2 text-[0.68rem] text-white/50">{exampleResult.footer}</p>
            </div>
          ) : null}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={back}
              className="rounded-md border border-white/30 px-3 py-2.5 text-[0.78rem] font-medium text-white/85 hover:border-white/55"
            >
              {calc.backLabel || "← BACK"}
            </button>
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={next}
                className="btn-cta flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide text-white"
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
                className="btn-cta flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: GOLD }}
              >
                START OVER
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function BottomStats({ items, isDark }) {
  if (!items?.length) return null;

  return (
    <ul className={`mt-5 grid grid-cols-4 gap-2 border-t pt-5 md:mt-6 md:gap-0 md:divide-x md:pt-6 ${isDark ? "border-white/10 md:divide-white/10" : "border-[rgba(0,0,0,0.08)] md:divide-[rgba(0,0,0,0.08)]"}`}>
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-1.5 text-center md:flex-row md:items-start md:gap-2.5 md:px-4 md:text-left first:md:pl-0 last:md:pr-0">
          <HomeIcon name={item.icon} isDark={isDark} gold className="h-8 w-8 shrink-0 md:mt-0.5 md:h-6 md:w-6" />
          <div className="min-w-0">
            <p className={`text-[0.72rem] font-semibold leading-tight md:text-[1.05rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              <span className="block md:inline">{item.value}</span>
              <span className="mt-0.5 block md:mt-0 md:inline"> {item.label}</span>
            </p>
            <p className={`mt-0.5 hidden text-[0.72rem] md:block ${isDark ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>{item.sub}</p>
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
      <div className="mx-auto w-full max-w-8xl">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <SectionLabel number={3} isDark={isDark} />
            <h2 className={`font-lora max-w-[720px] text-[1.85rem] font-medium leading-[1.08] md:text-[2.75rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Diagnose Your Mercedes-Benz Engine Problem
            </h2>
            <p className={`mt-3 max-w-[640px] text-[0.88rem] leading-[1.45] md:text-[1.02rem] ${isDark ? "text-white/78" : "text-[var(--color-text-muted)]"}`}>
              {data.subHeadline}
            </p>
            <TrustStrip items={data.trustStrip} isDark={isDark} />
          </div>

          {data.headerImage ? (
            <div className="relative mt-2 hidden h-36 w-48 shrink-0 md:block md:h-44 md:w-64 lg:h-52 lg:w-80">
              <Image
                src={data.headerImage.src}
                alt={data.headerImage.alt}
                fill
                className="object-contain object-right"
                sizes="320px"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-[1.1fr_1.15fr_1fr] md:gap-3.5">
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
