/**
 * Manual sector layout — overview tier (employment arc) vs detail tier (full relationship graph).
 * Coordinates are tuned for full-page /map; `scale` multiplies spread further.
 */

/** Tier 1 — employment overview: major employers/roles in chronological arc. */
const employmentOverviewPositions: Record<string, { x: number; y: number }> = {
  "person-ed": { x: 0, y: 150 },

  "exp-node-ea": { x: -640, y: -10 },
  "exp-node-black-lantern": { x: -540, y: -25 },
  "exp-node-seamless": { x: -450, y: -40 },
  "exp-node-rocket": { x: -370, y: -55 },
  "exp-node-2bit": { x: -290, y: -70 },
  "exp-node-pps": { x: -80, y: -50 },
  "exp-node-adidas": { x: 120, y: -90 },
  "client-google": { x: 320, y: -50 },
  "exp-node-oibw": { x: 480, y: 10 },
  "exp-node-co2t": { x: 620, y: 50 },
  "project-ergo": { x: 760, y: 10 },
};

const positions: Record<string, { x: number; y: number }> = {
  // Center anchor
  "person-ed": { x: 0, y: 0 },

  // Theme ring — wide hex around center (focus areas that connect the arc)
  "theme-education": { x: -520, y: -260 },
  "theme-games": { x: 520, y: -260 },
  "theme-software": { x: 0, y: -460 },
  "theme-marketing": { x: -560, y: 120 },
  "theme-product": { x: 560, y: 120 },
  "theme-production": { x: 0, y: 460 },

  // Environment practice (southwest)
  "practice-environment": { x: -380, y: 340 },

  // Education cluster (northwest)
  "exp-node-pps": { x: -780, y: -60 },
  "exp-node-innovation": { x: -780, y: 80 },
  "edu-node-full-sail": { x: -900, y: -280 },
  "exp-node-id-tech": { x: -900, y: 200 },

  // Games chronology (northeast) — vertical spine with breathing room
  "exp-node-ea": { x: 780, y: -560 },
  "exp-node-bridge-2007": { x: 820, y: -500 },
  "exp-node-black-lantern": { x: 860, y: -440 },
  "exp-node-seamless": { x: 860, y: -360 },
  "exp-node-bridge-2009": { x: 820, y: -300 },
  "exp-node-rocket": { x: 860, y: -220 },
  "exp-node-2bit-founder": { x: 780, y: -140 },
  "exp-node-hatalom": { x: 980, y: -80 },
  "exp-node-2bit-pause": { x: 780, y: -60 },
  "exp-node-2bit": { x: 780, y: 40 },
  "company-2bit": { x: 640, y: 200 },
  "project-planets-core": { x: 920, y: -100 },

  // Software / marketing crossover (east) — fan out from 2bit hub
  "exp-node-adidas": { x: 340, y: -360 },
  "exp-node-uncorked": { x: 520, y: -220 },
  "exp-node-fresh": { x: 620, y: -60 },
  "exp-node-opus": { x: 580, y: 100 },
  "exp-node-nice-touch": { x: 480, y: 260 },
  "exp-node-trustless": { x: 720, y: -40 },
  "exp-node-ergnomes": { x: 720, y: 180 },
  "client-google": { x: 280, y: -80 },
  "client-dell": { x: 200, y: 120 },
  "client-wash-u": { x: 120, y: 300 },

  // Environmental arc (southwest)
  "exp-node-oibw": { x: -620, y: 480 },
  "exp-node-co2t": { x: -480, y: 600 },
  "company-co2t": { x: -320, y: 720 },

  // Projects (southeast)
  "project-ergo": { x: 420, y: 420 },
  "project-carbon": { x: 160, y: 580 },
  "project-web": { x: 560, y: 300 },
};

export type MapTier = "overview" | "detail";

export type MapLayoutOptions = {
  /** @deprecated Use `tier` — kept for compatibility */
  preview?: boolean;
  tier?: MapTier;
  /** Spread multiplier for full-page /map layout */
  scale?: number;
};

function resolveTier(options?: MapLayoutOptions): MapTier {
  if (options?.tier) return options.tier;
  if (options?.preview) return "overview";
  return "detail";
}

/** All layout positions (scaled) — used for smart edge handle routing. */
export function getLayoutPositions(options?: MapLayoutOptions): Record<string, { x: number; y: number }> {
  const tier = resolveTier(options);
  const table = tier === "overview" ? employmentOverviewPositions : positions;
  const scale = tier === "overview" ? 1 : (options?.scale ?? 1);
  const out: Record<string, { x: number; y: number }> = {};
  for (const [id, pos] of Object.entries(table)) {
    out[id] = { x: pos.x * scale, y: pos.y * scale };
  }
  return out;
}

export function getNodePosition(nodeId: string, _index: number, options?: MapLayoutOptions) {
  const positionsMap = getLayoutPositions(options);
  return positionsMap[nodeId] ?? { x: 0, y: 0 };
}

/** Pick source/target handles so edges route around the graph instead of through center. */
export function getEdgeHandles(
  sourceId: string,
  targetId: string,
  options?: MapLayoutOptions,
): { sourceHandle: string; targetHandle: string } {
  const positionsMap = getLayoutPositions(options);
  const source = positionsMap[sourceId] ?? { x: 0, y: 0 };
  const target = positionsMap[targetId] ?? { x: 0, y: 0 };
  const dx = target.x - source.x;
  const dy = target.y - source.y;

  if (Math.abs(dx) > Math.abs(dy) * 0.85) {
    return dx > 0
      ? { sourceHandle: "source-right", targetHandle: "target-left" }
      : { sourceHandle: "source-left", targetHandle: "target-right" };
  }
  return dy > 0
    ? { sourceHandle: "source-bottom", targetHandle: "target-top" }
    : { sourceHandle: "source-top", targetHandle: "target-bottom" };
}
