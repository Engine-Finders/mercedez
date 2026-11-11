"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const QuoteModalContext = createContext(null);

export function QuoteModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [initialReg, setInitialReg] = useState("");
  const [session, setSession] = useState(0);

  const openQuoteModal = useCallback((opts = {}) => {
    const reg = String(opts.reg || "")
      .replace(/\s+/g, "")
      .toUpperCase();
    setInitialReg(reg);
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      initialReg,
      session,
      openQuoteModal,
      closeQuoteModal,
      setOpen,
    }),
    [open, initialReg, session, openQuoteModal, closeQuoteModal],
  );

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return ctx;
}
