import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "ent-black": "var(--ent-black)",
        "ent-slate": "var(--ent-slate)",
        "ent-slate-mid": "var(--ent-slate-mid)",
        "paper-cream": "rgb(from var(--paper-cream) r g b / <alpha-value>)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "screen-black": "var(--screen-black)",
        "screen-panel": "var(--screen-panel)",
        "screen-text": "var(--screen-text)",
        "screen-muted": "var(--screen-muted)",
        technology: "var(--technology)",
        amber: "var(--ent-amber)",
        software: "var(--software)",
        branding: "var(--branding)",
        campaigns: "var(--campaigns)",
        interactive: "var(--interactive)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
        handwritten: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      boxShadow: {
        paper: "var(--shadow-paper)",
        device: "var(--shadow-device)",
      },
      transitionTimingFunction: {
        ent: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
