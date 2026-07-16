"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudioTheme } from "./StudioThemeProvider";

export function StudioThemeToggle() {
  const { mode, toggleMode } = useStudioTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 chrome-text-muted transition hover:border-white/20 hover:bg-white/[0.06] hover:chrome-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-technology"
      aria-label={mounted ? (mode === "day" ? "Switch to night mode" : "Switch to day mode") : "Toggle day or night mode"}
      title={mounted ? (mode === "day" ? "Night mode" : "Day mode") : "Theme"}
      suppressHydrationWarning
    >
      {!mounted ? <Moon className="h-4 w-4 opacity-50" /> : mode === "day" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
