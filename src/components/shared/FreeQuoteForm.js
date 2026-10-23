"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import FloatingQuoteModal from "@/components/shared/FloatingQuoteModal";

export default function FreeQuoteSticky() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef(null);
  const hideOnQuotePage = pathname === "/quote";

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (hideOnQuotePage) return null;

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
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
            onClick={() => setOpen(false)}
          />
          <FloatingQuoteModal titleId={titleId} closeRef={closeRef} onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </>
  );
}
