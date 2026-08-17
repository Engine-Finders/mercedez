"use client";

import Image from "next/image";
import Link from "next/link";
import MStripe from "@/components/reusableComponents/MStripe";
import { useTheme } from "@/components/shared/themeProvider";

export default function HomeSec3({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`relative overflow-hidden px-3 py-7 md:px-6 md:py-8 ${isDark ? "bg-[var(--color-page)]" : "bg-white"}`}>
      <div className="mx-auto w-full max-w-8xl">
        <div className="mb-3 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className={`text-[2.15rem] font-bold leading-[1.08] tracking-normal md:text-[3rem] ${isDark ? "text-white" : "text-[var(--color-text)]"}`}>
              Diagnose Your Mercedes-Benz Engine Problem
            </h2>
            <div className="mt-3">
              <MStripe />
            </div>
            <div
              className={`mt-3 text-sm md:text-base ${isDark ? "text-white/78" : "text-[var(--color-text-muted)]"}`}
              dangerouslySetInnerHTML={{ __html: data.subHeadline }}
            />
          </div>

          {data.headerImage ? (
            <div className="relative h-20 w-28 shrink-0 md:h-32 md:w-56">
              <Image
                src={data.headerImage.src}
                alt={data.headerImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 224px"
              />
            </div>
          ) : null}
        </div>

        {data.trustStrip?.length > 0 ? (
          <ul className={`mb-3 grid grid-cols-2 gap-1 overflow-hidden rounded-md border p-2 md:grid-cols-4 md:gap-3 ${isDark ? "border-[var(--color-border)] bg-[var(--color-surface-raised)]" : "border-[#d7dde6] bg-[#f7f9fb]"}`}>
            {data.trustStrip.map((item) => (
              <li
                key={item.label}
                className={`flex items-center gap-2 text-xs md:flex-1 ${isDark ? "text-white" : "text-black"}`}
              >
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          {/* How It Works */}
          <div className="w-full md:w-[22%]">
            <h3 className="mb-1 text-sm font-bold uppercase text-blue-700">How It Works</h3>
            <ul className="flex flex-col gap-1">
              {data.howItWorks?.steps?.map((step) => (
                <li
                  key={step.step}
                  className={`flex items-start gap-2 border p-2 ${isDark ? "border-[var(--color-border)]" : "border-gray-200"}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs text-white">
                    {step.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"}`} dangerouslySetInnerHTML={{ __html: step.title }} />
                    <div className={`text-xs ${isDark ? "text-white/72" : "text-gray-600"}`} dangerouslySetInnerHTML={{ __html: step.text }} />
                  </div>
                  <span className="text-gray-400">›</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
          <div className={`w-full border p-2 md:w-[56%] ${isDark ? "border-[var(--color-border)]" : "border-gray-200"}`}>
            {data.calculator ? (
              <>
                <p className="text-xs font-semibold text-blue-700" dangerouslySetInnerHTML={{ __html: data.calculator.stepLabel }} />
                <p className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`} dangerouslySetInnerHTML={{ __html: data.calculator.title }} />
                <div className={`mb-2 text-xs ${isDark ? "text-white/72" : "text-gray-600"}`} dangerouslySetInnerHTML={{ __html: data.calculator.instruction }} />

                {data.calculator.symptoms?.length > 0 ? (
                  <div className="mb-2 grid grid-cols-2 gap-1 md:grid-cols-5">
                    {data.calculator.symptoms.map((symptom) => (
                      <Link
                        key={symptom.label}
                        href={symptom.href}
                        className={`flex flex-col items-center gap-1 border p-2 text-center hover:bg-[var(--color-page-soft)] ${isDark ? "border-[var(--color-border)] text-white" : "border-gray-200 text-black"}`}
                      >
                        <span className="text-lg" dangerouslySetInnerHTML={{ __html: symptom.icon }} />
                        <span className="text-xs" dangerouslySetInnerHTML={{ __html: symptom.label }} />
                        <span className="text-xs text-blue-700">›</span>
                      </Link>
                    ))}
                  </div>
                ) : null}

                {data.calculator.cta ? (
                  <Link
                    href={data.calculator.cta.href}
                    className="block bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white"
                    dangerouslySetInnerHTML={{ __html: data.calculator.cta.label }}
                  />
                ) : null}
              </>
            ) : null}
          </div>

          {/* Why Trust */}
          <div className="w-full md:w-[22%]">
            <h3 className="mb-1 text-sm font-bold uppercase text-blue-700">Why Trust This Diagnosis?</h3>
            <ul className="flex flex-col gap-1">
              {data.whyTrust?.signals?.map((signal) => (
                <li
                  key={signal.title}
                  className={`flex items-start gap-2 border p-2 ${isDark ? "border-[var(--color-border)]" : "border-gray-200"}`}
                >
                  <span className="text-lg" dangerouslySetInnerHTML={{ __html: signal.icon }} />
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"}`} dangerouslySetInnerHTML={{ __html: signal.title }} />
                    <div className={`text-xs ${isDark ? "text-white/72" : "text-gray-600"}`} dangerouslySetInnerHTML={{ __html: signal.text }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: example result + bottom CTA */}
        <div className="mt-3 flex flex-col gap-2 md:hidden">
          {data.exampleResult ? (
            <div className={`border p-2 ${isDark ? "border-[var(--color-border)]" : "border-gray-200"}`}>
              <p className="mb-1 text-xs font-semibold text-blue-700" dangerouslySetInnerHTML={{ __html: data.exampleResult.badge }} />
              <p className={`mb-1 text-sm font-bold ${isDark ? "text-white" : "text-black"}`} dangerouslySetInnerHTML={{ __html: data.exampleResult.title }} />

              <div className={`border p-2 ${isDark ? "border-[var(--color-border)] bg-[var(--color-surface)]" : "border-gray-100 bg-gray-50"}`}>
                <div className="mb-1 flex flex-wrap items-center gap-1">
                  <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"}`} dangerouslySetInnerHTML={{ __html: data.exampleResult.fault }} />
                  <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-800" dangerouslySetInnerHTML={{ __html: data.exampleResult.likelihood }} />
                </div>

                <p className={`text-xs ${isDark ? "text-white/72" : "text-gray-600"}`} dangerouslySetInnerHTML={{ __html: `Common on: ${data.exampleResult.commonOn}` }} />
                <p className={`mb-1 text-xs ${isDark ? "text-white/72" : "text-gray-600"}`} dangerouslySetInnerHTML={{ __html: `Symptoms Match: ${data.exampleResult.symptomsMatch}` }} />

                <div className="flex gap-3 text-sm font-semibold">
                  <span className="text-blue-700" dangerouslySetInnerHTML={{ __html: `Repair ${data.exampleResult.repairCost}` }} />
                  <span className={isDark ? "text-white" : "text-black"} dangerouslySetInnerHTML={{ __html: `vs Replace ${data.exampleResult.replaceCost}` }} />
                </div>

                <div className="mt-1 text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: data.exampleResult.footer }} />
              </div>
            </div>
          ) : null}

          {data.bottomCta ? (
            <div className="border border-blue-200 bg-blue-50 p-2">
              <p className="text-sm font-semibold text-black" dangerouslySetInnerHTML={{ __html: data.bottomCta.title }} />
              <div className="mb-2 text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: data.bottomCta.text }} />
              <Link
                href={data.bottomCta.href}
                className="mb-1 block bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white"
                dangerouslySetInnerHTML={{ __html: `${data.bottomCta.buttonLabel} →` }}
              />
              <div className="text-center text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: data.bottomCta.trustLine }} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
