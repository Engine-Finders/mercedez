"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

const themes = {
  light: {
    "--color-page": "#f7f5f1",
    "--color-page-soft": "#efebe4",
    "--color-surface": "#ffffff",
    "--color-surface-raised": "rgba(255, 255, 255, 0.95)",
    "--color-surface-glass": "rgba(255, 253, 249, 0.82)",
    "--color-table-surface": "rgba(255, 255, 255, 0.97)",
    "--color-text": "#171511",
    "--color-text-muted": "#514b42",
    "--color-text-soft": "#7b7368",
    "--color-border": "#ded8ce",
    "--color-border-strong": "#b9aa94",
    "--color-primary": "#b07526",
    "--color-primary-strong": "#8a5518",
    "--color-primary-soft": "#f5ead4",
    "--color-on-primary": "#ffffff",
    "--color-chrome": "#0a0a09",
    "--color-accent": "#c48a36",
    "--color-accent-soft": "#f7eddd",
    "--color-accent-red": "#a3272e",
    "--color-accent-red-soft": "#f7e8e8",
    "--color-accent-green": "#397553",
    "--color-accent-green-soft": "#e7f1eb",
    "--color-shadow": "rgba(37, 28, 17, 0.14)",
    "--color-hero-overlay": "rgba(248, 246, 242, 0.74)",
    "--color-hero-fade": "rgba(248, 246, 242, 0.98)",
    "--color-navbar": "rgba(255, 255, 255, 0.97)",
    "--color-glass-border": "rgba(176, 117, 38, 0.18)",
    "--color-glass-shadow": "rgba(37, 28, 17, 0.1)",
    "--color-btn-hover": "rgba(34, 20, 6, 0.22)",
    "--color-btn-hover-text": "#ffffff",
  },
  dark: {
    "--color-page": "#070706",
    "--color-page-soft": "#0e0d0b",
    "--color-surface": "#13110e",
    "--color-surface-raised": "rgba(24, 21, 17, 0.95)",
    "--color-surface-glass": "rgba(20, 18, 15, 0.82)",
    "--color-table-surface": "rgba(24, 21, 17, 0.97)",
    "--color-text": "#f5f1e9",
    "--color-text-muted": "#d2c9ba",
    "--color-text-soft": "#a79d8e",
    "--color-border": "#3b352d",
    "--color-border-strong": "#665845",
    "--color-primary": "#c08632",
    "--color-primary-strong": "#d4a04c",
    "--color-primary-soft": "rgba(204, 148, 58, 0.17)",
    "--color-on-primary": "#ffffff",
    "--color-chrome": "#050504",
    "--color-accent": "#d4a04c",
    "--color-accent-soft": "rgba(212, 160, 76, 0.15)",
    "--color-accent-red": "#d66a70",
    "--color-accent-red-soft": "rgba(163, 39, 46, 0.22)",
    "--color-accent-green": "#79a78b",
    "--color-accent-green-soft": "rgba(57, 117, 83, 0.2)",
    "--color-shadow": "rgba(0, 0, 0, 0.64)",
    "--color-hero-overlay": "rgba(7, 7, 6, 0.76)",
    "--color-hero-fade": "rgba(7, 7, 6, 0.98)",
    "--color-navbar": "rgba(3, 3, 3, 0.98)",
    "--color-glass-border": "rgba(212, 160, 76, 0.24)",
    "--color-glass-shadow": "rgba(0, 0, 0, 0.54)",
    "--color-btn-hover": "rgba(0, 0, 0, 0.24)",
    "--color-btn-hover-text": "#ffffff",
  },
};

const ThemeContext = createContext(null);

function getStoredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("site-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToThemeChange(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("site-theme-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("site-theme-change", callback);
  };
}

function saveTheme(theme) {
  window.localStorage.setItem("site-theme", theme);
  window.dispatchEvent(new Event("site-theme-change"));
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribeToThemeChange, getStoredTheme, () => "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: saveTheme,
      toggleTheme: () => saveTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme],
  );

  return (
      <ThemeContext.Provider value={value}>
      <div className="flex min-h-full flex-1 flex-col" style={themes[theme]}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
