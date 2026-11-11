"use client";

import { useId, useState } from "react";
import UkPlate from "@/components/shared/UkPlate";
import { useQuoteModal } from "@/components/shared/quoteModalContext";

/**
 * Hero registration lookup — yellow GB plate + CTA.
 * Opens sticky quote modal and auto-fetches vehicle when a reg is entered.
 */
export default function HeroRegLookup({
  ctaLabel = "Get Instant Quote →",
  className = "",
  buttonClassName = "",
  plateClassName = "",
}) {
  const { openQuoteModal } = useQuoteModal();
  const uid = useId();
  const [regInput, setRegInput] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const cleaned = regInput.replace(/\s+/g, "").toUpperCase();
    openQuoteModal({ reg: cleaned });
  }

  const label = String(ctaLabel || "Get Instant Quote →").replace(/\s*→\s*$/, "");

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full max-w-2xl flex-col gap-2.5 sm:flex-row sm:items-stretch ${className}`}
    >
      <UkPlate
        size="hero"
        value={regInput}
        editable
        inputId={`${uid}-hero-reg`}
        className={plateClassName}
        onChange={(event) =>
          setRegInput(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8))
        }
      />
      <button
        type="submit"
        className={`btn-cta inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 text-base font-bold text-white hover:bg-[var(--color-primary-strong)] sm:min-h-14 sm:px-6 sm:text-lg ${buttonClassName}`}
      >
        <span>{label}</span>
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
