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

const SURFACE_BASE = "#0c1424";
const SURFACE_PANEL = "#121c30";
const TEXT_ON_DARK = "#f2f6fa";
const TEXT_MUTED_ON_DARK = "#b8c4d4";

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
  const accent = disciplineColors[discipline] ?? "#46c7d7";
  const emphasis = options?.highlighted || options?.selected;

  if (nodeType === "person") {
    return {
      background: mixRgb(SURFACE_BASE, accent, 0.12),
      labelColor: accent,
      subtitleColor: TEXT_MUTED_ON_DARK,
      borderColor: emphasis ? accent : `${accent}99`,
    };
  }

  if (nodeType === "theme") {
    return {
      background: `linear-gradient(155deg, ${mixRgb(accent, SURFACE_PANEL, 0.32)}, ${SURFACE_BASE})`,
      labelColor: TEXT_ON_DARK,
      subtitleColor: mixRgb(accent, TEXT_MUTED_ON_DARK, 0.35),
      borderColor: emphasis ? accent : `${accent}88`,
    };
  }

  return {
    background: mixRgb(accent, SURFACE_PANEL, 0.14),
    labelColor: TEXT_ON_DARK,
    subtitleColor: TEXT_MUTED_ON_DARK,
    borderColor: emphasis ? accent : `${accent}55`,
  };
}
