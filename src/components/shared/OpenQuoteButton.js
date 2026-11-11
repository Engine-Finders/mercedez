"use client";

import { useQuoteModal } from "@/components/shared/quoteModalContext";

/**
 * Drop-in replacement for <a href="/quote"> / Link to quote —
 * opens the sticky quote modal instead of navigating.
 */
export default function OpenQuoteButton({
  children,
  className = "",
  style,
  reg = "",
  type = "button",
  onClick,
  ...rest
}) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        openQuoteModal({ reg });
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
