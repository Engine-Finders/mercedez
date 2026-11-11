"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import FloatingQuoteModal from "@/components/shared/FloatingQuoteModal";
import { useQuoteModal } from "@/components/shared/quoteModalContext";

export default function FreeQuoteSticky() {
  const pathname = usePathname();
  const titleId = useId();
  const closeRef = useRef(null);
  const hideOnQuotePage = pathname === "/quote";
  const { open, initialReg, session, openQuoteModal, closeQuoteModal, setOpen } = useQuoteModal();

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") closeQuoteModal();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeQuoteModal]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  if (hideOnQuotePage) return null;

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="btn-cta fixed bottom-5 right-5 z-50 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_var(--color-shadow)] hover:bg-[var(--color-primary-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Get a Free Quote
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-4" role="presentation">
          <button
            type="button"
            aria-label="Close quote form"
            className="absolute inset-0 bg-black/50"
            onClick={closeQuoteModal}
          />
          <FloatingQuoteModal
            key={`${session}-${initialReg || "blank"}`}
            titleId={titleId}
            closeRef={closeRef}
            onClose={closeQuoteModal}
            initialReg={initialReg}
          />
        </div>
      ) : null}
    </>
  );
}
