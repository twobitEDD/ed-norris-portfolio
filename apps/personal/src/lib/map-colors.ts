import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function mixRgb(a: string, b: string, weight: number) {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  const r = Math.round(c1.r * (1 - weight) + c2.r * weight);
  const g = Math.round(c1.g * (1 - weight) + c2.g * weight);
  const blue = Math.round(c1.b * (1 - weight) + c2.b * weight);
  return `rgb(${r}, ${g}, ${blue})`;
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Pick a readable accent on dark node surfaces (WCAG-friendly). */
function readableAccentOnDark(accent: string): string {
  const lum = relativeLuminance(accent);
  if (lum < 0.52) {
    return mixRgb(accent, "#ffffff", 0.5);
  }
  if (lum < 0.62) {
    return mixRgb(accent, "#ffffff", 0.28);
  }
  return accent;
}

const SURFACE_BASE = "#0c1424";
const SURFACE_PANEL = "#121c30";
const TEXT_ON_DARK = "#f4f7fb";
const TEXT_MUTED_ON_DARK = "#c5d0de";

export type MapNodeSurface = {
  background: string;
  labelColor: string;
  subtitleColor: string;
  borderColor: string;
};

export function getMapNodeSurface(
  discipline: Discipline,
  nodeType: GraphNode["type"],
  options?: { highlighted?: boolean; selected?: boolean },
): MapNodeSurface {
  const rawAccent = disciplineColors[discipline] ?? "#46c7d7";
  const accent = readableAccentOnDark(rawAccent);
  const emphasis = options?.highlighted || options?.selected;

  if (nodeType === "person") {
    return {
      background: mixRgb(SURFACE_BASE, accent, 0.14),
      labelColor: accent,
      subtitleColor: TEXT_MUTED_ON_DARK,
      borderColor: emphasis ? accent : `${accent}aa`,
    };
  }

  if (nodeType === "theme") {
    return {
      background: `linear-gradient(155deg, ${mixRgb(accent, SURFACE_PANEL, 0.28)}, ${SURFACE_BASE})`,
      labelColor: TEXT_ON_DARK,
      subtitleColor: mixRgb(accent, TEXT_MUTED_ON_DARK, 0.25),
      borderColor: emphasis ? accent : `${accent}99`,
    };
  }

  return {
    background: mixRgb(accent, SURFACE_PANEL, 0.12),
    labelColor: TEXT_ON_DARK,
    subtitleColor: mixRgb(accent, TEXT_MUTED_ON_DARK, 0.35),
    borderColor: emphasis ? accent : `${accent}77`,
  };
}
