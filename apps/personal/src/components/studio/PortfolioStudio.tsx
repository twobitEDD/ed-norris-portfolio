"use client";

import { StudioThemeProvider } from "./StudioThemeProvider";

export function PortfolioStudio({ children }: { children: React.ReactNode }) {
  return (
    <StudioThemeProvider>
      <div className="relative min-h-screen bg-studio-black">
        <a
          href="#studio-main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-wood-mid focus:px-4 focus:py-2 focus:text-screen-text"
        >
          Skip to content
        </a>
        <div className="studio-surface studio-ambient relative">
          <main id="studio-main" className="relative z-[1]">
            {children}
          </main>
        </div>
      </div>
    </StudioThemeProvider>
  );
}
