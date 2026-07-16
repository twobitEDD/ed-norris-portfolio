import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "studio-black": "var(--studio-black)",
        "wood-dark": "var(--wood-dark)",
        "wood-mid": "var(--wood-mid)",
        "wood-light": "var(--wood-light)",
        // Hex CSS var — needs relative-color syntax so /opacity utilities generate valid rules
        "paper-cream": "rgb(from var(--paper-cream) r g b / <alpha-value>)",
        "paper-aged": "var(--paper-aged)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "screen-black": "var(--screen-black)",
        "screen-panel": "var(--screen-panel)",
        "screen-text": "var(--screen-text)",
        "screen-muted": "var(--screen-muted)",
        environment: "var(--environment)",
        technology: "var(--technology)",
        games: "var(--games)",
        marketing: "var(--marketing)",
        operations: "var(--operations)",
        data: "var(--data)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
        editorial: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
        handwritten: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      boxShadow: {
        paper: "var(--shadow-paper)",
        device: "var(--shadow-device)",
      },
      transitionTimingFunction: {
        studio: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
