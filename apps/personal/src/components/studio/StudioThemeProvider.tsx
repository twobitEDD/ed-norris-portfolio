"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type StudioMode = "day" | "night";

type StudioThemeContextValue = {
  mode: StudioMode;
  setMode: (mode: StudioMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "ed-norris-studio-mode";

const StudioThemeContext = createContext<StudioThemeContextValue | null>(null);

function getInitialMode(): StudioMode {
  if (typeof window === "undefined") return "day";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "day" || stored === "night") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

export function StudioThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<StudioMode>("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setModeState(getInitialMode());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-studio-mode", mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, mounted]);

  const setMode = useCallback((next: StudioMode) => setModeState(next), []);

  const toggleMode = useCallback(() => {
    setModeState((current) => (current === "day" ? "night" : "day"));
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode],
  );

  return (
    <StudioThemeContext.Provider value={value}>{children}</StudioThemeContext.Provider>
  );
}

export function useStudioTheme() {
  const context = useContext(StudioThemeContext);
  if (!context) {
    throw new Error("useStudioTheme must be used within StudioThemeProvider");
  }
  return context;
}
