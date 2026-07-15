/**
 * Work-map layout — overview tier (employment timeline) vs detail tier (full graph).
 * Overview uses a programmatic left-to-right spine with branch drops.
 * Detail uses era-cluster columns with ≥140px spacing.
 */

import { overviewBranchEdges, PERSON_NODE_ID } from "@/data/career/career-graph";
import { getOverviewSpineNodes } from "@/data/career/derive";

/** Horizontal gap between overview spine nodes (px). */
const OVERVIEW_X_GAP = 200;
/** Vertical drop for branch nodes below the spine (px). */
const OVERVIEW_BRANCH_Y_GAP = 110;
/** Horizontal offset between sibling branch nodes (px). */
const OVERVIEW_BRANCH_X_OFFSET = 90;

/** Detail-tier column / row spacing (px). */
const DETAIL_COL_GAP = 160;
const DETAIL_ROW_GAP = 100;

/** Chronological spine for overview — derived from career graph (person anchor excluded). */
const OVERVIEW_SPINE_IDS = getOverviewSpineNodes()
  .filter((n) => n.id !== PERSON_NODE_ID)
  .map((n) => n.id);

/** Branch nodes anchored to a parent on the spine / branch tree. */
const OVERVIEW_BRANCH_ANCHORS: Record<string, { anchorId: string; branchIndex: number }> = {
  "exp-node-nice-touch": { anchorId: "exp-node-2bit", branchIndex: 0 },
  "client-dell": { anchorId: "exp-node-nice-touch", branchIndex: 0 },
  "client-wash-u": { anchorId: "exp-node-nice-touch", branchIndex: 1 },
  "project-fish-fight": { anchorId: "exp-node-2bit", branchIndex: 2 },
  "project-ergnomes": { anchorId: "exp-node-2bit", branchIndex: 3 },
};

const overviewBranchEdgeIds = new Set(overviewBranchEdges.map((e) => e.id));

/** Detail layout — era clusters as (column, row) grid slots. */
const detailSlots: Record<string, { col: number; row: number }> = {
  // Center anchor + theme ring
  "person-ed": { col: 0, row: 0 },
  "theme-software": { col: 0, row: -3 },
  "theme-education": { col: -2, row: -2 },
  "theme-games": { col: 2, row: -2 },
  "theme-marketing": { col: -2, row: 2 },
  "theme-product": { col: 2, row: 2 },
  "theme-production": { col: 0, row: 3 },
  "practice-environment": { col: -2, row: 4 },

  // Education cluster (west)
  "edu-node-full-sail": { col: -5, row: -2 },
  "exp-node-pps": { col: -5, row: 0 },
  "exp-node-innovation": { col: -5, row: 1 },
  "exp-node-id-tech": { col: -5, row: 2 },

  // Games chronology (northeast column)
  "exp-node-ea": { col: 4, row: -5 },
  "exp-node-bridge-2007": { col: 4, row: -4 },
  "exp-node-black-lantern": { col: 5, row: -4 },
  "exp-node-seamless": { col: 5, row: -3 },
  "exp-node-bridge-2009": { col: 4, row: -3 },
  "exp-node-rocket": { col: 5, row: -2 },
  "exp-node-2bit-founder": { col: 4, row: -1 },
  "exp-node-hatalom": { col: 6, row: -1 },
  "exp-node-2bit-pause": { col: 4, row: 0 },
  "exp-node-2bit": { col: 5, row: 0 },
  "company-2bit": { col: 5, row: 1 },
  "project-planets-core": { col: 6, row: -2 },

  // Agency / marketing crossover (east)
  "exp-node-adidas": { col: 3, row: -2 },
  "exp-node-uncorked": { col: 6, row: 0 },
  "exp-node-fresh": { col: 7, row: 0 },
  "exp-node-opus": { col: 7, row: 1 },
  "exp-node-nice-touch": { col: 6, row: 2 },
  "exp-node-trustless": { col: 7, row: -1 },
  "exp-node-ergnomes": { col: 7, row: 2 },

  // Clients (east, below agencies)
  "client-google": { col: 3, row: -1 },
  "client-dell": { col: 6, row: 3 },
  "client-wash-u": { col: 7, row: 3 },

  // Environmental arc (southwest)
  "exp-node-oibw": { col: -4, row: 4 },
  "exp-node-co2t": { col: -3, row: 5 },
  "company-co2t": { col: -2, row: 5 },

  // Projects (southeast)
  "project-ergo": { col: 3, row: 4 },
  "project-fish-fight": { col: 4, row: 5 },
  "project-ergnomes": { col: 5, row: 5 },
  "project-carbon": { col: 2, row: 5 },
  "project-web": { col: 4, row: 3 },
};

function buildOverviewPositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  // Spine — single horizontal lane, left → right
  OVERVIEW_SPINE_IDS.forEach((id, index) => {
    positions[id] = { x: index * OVERVIEW_X_GAP, y: 0 };
  });

  // Branch nodes drop below their anchor
  for (const [nodeId, { anchorId, branchIndex }] of Object.entries(OVERVIEW_BRANCH_ANCHORS)) {
    const anchor = positions[anchorId];
    if (!anchor) continue;
    const row = Math.floor(branchIndex / 2) + 1;
    const colOffset = branchIndex % 2;
    positions[nodeId] = {
      x: anchor.x + colOffset * OVERVIEW_BRANCH_X_OFFSET,
      y: anchor.y + row * OVERVIEW_BRANCH_Y_GAP,
    };
  }

  // Person anchor — centered below spine midpoint
  const spineMidX = ((OVERVIEW_SPINE_IDS.length - 1) * OVERVIEW_X_GAP) / 2;
  positions["person-ed"] = { x: spineMidX, y: OVERVIEW_BRANCH_Y_GAP * 2.2 };

  return positions;
}

function buildDetailPositions(scale: number): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  for (const [id, slot] of Object.entries(detailSlots)) {
    positions[id] = {
      x: slot.col * DETAIL_COL_GAP * scale,
      y: slot.row * DETAIL_ROW_GAP * scale,
    };
  }
  return positions;
}

const employmentOverviewPositions = buildOverviewPositions();

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
  if (tier === "overview") return { ...employmentOverviewPositions };

  const scale = options?.scale ?? 1;
  return buildDetailPositions(scale);
}

export function getNodePosition(nodeId: string, _index: number, options?: MapLayoutOptions) {
  const positionsMap = getLayoutPositions(options);
  return positionsMap[nodeId] ?? { x: 0, y: 0 };
}

/** True when an overview-tier edge is a branch (agency/client/project), not spine. */
export function isOverviewBranchEdge(edgeId: string): boolean {
  return overviewBranchEdgeIds.has(edgeId);
}

/** Pick source/target handles so edges route cleanly between nodes. */
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

  const tier = resolveTier(options);

  // Overview spine: prefer horizontal routing along the timeline
  if (tier === "overview" && Math.abs(dy) < 40) {
    return dx >= 0
      ? { sourceHandle: "source-right", targetHandle: "target-left" }
      : { sourceHandle: "source-left", targetHandle: "target-right" };
  }

  if (Math.abs(dx) > Math.abs(dy) * 0.85) {
    return dx > 0
      ? { sourceHandle: "source-right", targetHandle: "target-left" }
      : { sourceHandle: "source-left", targetHandle: "target-right" };
  }
  return dy > 0
    ? { sourceHandle: "source-bottom", targetHandle: "target-top" }
    : { sourceHandle: "source-top", targetHandle: "target-bottom" };
}
