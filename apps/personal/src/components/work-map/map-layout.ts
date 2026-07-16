/**
 * Work-map layout — overview tier (employment timeline) vs detail tier (full graph).
 * Positions are **center-anchored** — pair with React Flow `nodeOrigin={[0.5, 0.5]}`.
 */

import { overviewBranchEdges, PERSON_NODE_ID } from "@/data/career/career-graph";
import { getOverviewSpineNodes } from "@/data/career/derive";
import {
  estimateNodeBoundsById,
  resolvePositionCollisions,
} from "@/components/work-map/map-node-bounds";

/** Horizontal gap between overview spine node centers (px). */
const OVERVIEW_X_GAP = 300;
/** Vertical drop for branch nodes below the spine (px). */
const OVERVIEW_BRANCH_Y_GAP = 160;
/** Horizontal offset between sibling branch nodes (px). */
const OVERVIEW_BRANCH_X_OFFSET = 200;

/** Detail-tier column / row spacing between node centers (px). */
const DETAIL_COL_GAP = 300;
const DETAIL_ROW_GAP = 170;

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

/**
 * Detail layout — era clusters as (column, row) grid slots.
 * Columns/rows are spaced for ~160–200px cards with center anchoring.
 */
const detailSlots: Record<string, { col: number; row: number }> = {
  // Center anchor + theme ring
  "person-ed": { col: 0, row: 0 },
  "theme-software": { col: 0, row: -4 },
  "theme-education": { col: -3, row: -2 },
  "theme-games": { col: 3, row: -2 },
  "theme-marketing": { col: -3, row: 2 },
  "theme-product": { col: 3, row: 2 },
  "theme-production": { col: 0, row: 4 },
  "practice-environment": { col: -2, row: 5 },

  // Education cluster (west)
  "edu-node-full-sail": { col: -6, row: -3 },
  "exp-node-pps": { col: -6, row: -1 },
  "exp-node-innovation": { col: -6, row: 0 },
  "exp-node-id-tech": { col: -6, row: 1 },

  // Games chronology (northeast column)
  "exp-node-ea": { col: 6, row: -6 },
  "exp-node-bridge-2007": { col: 5, row: -5 },
  "exp-node-black-lantern": { col: 7, row: -5 },
  "exp-node-seamless": { col: 7, row: -4 },
  "exp-node-bridge-2009": { col: 5, row: -4 },
  "exp-node-rocket": { col: 7, row: -3 },
  "exp-node-2bit-founder": { col: 6, row: -2 },
  "exp-node-hatalom": { col: 8, row: -2 },
  "exp-node-2bit-pause": { col: 5, row: -1 },
  "exp-node-2bit": { col: 7, row: -1 },
  "company-2bit": { col: 7, row: 0 },
  "project-planets-core": { col: 9, row: -3 },

  // Agency / marketing crossover (east) — staggered columns
  "exp-node-adidas": { col: 4, row: -3 },
  "client-google": { col: 3, row: -2 },
  "exp-node-uncorked": { col: 8, row: 0 },
  "exp-node-trustless": { col: 9, row: 0 },
  "exp-node-fresh": { col: 10, row: 0 },
  "exp-node-opus": { col: 10, row: 1 },
  "exp-node-nice-touch": { col: 8, row: 2 },
  "exp-node-ergnomes": { col: 10, row: 2 },

  // Clients (east, below agencies)
  "client-dell": { col: 9, row: 3 },
  "client-wash-u": { col: 10, row: 3 },

  // Environmental arc (southwest)
  "exp-node-oibw": { col: -5, row: 5 },
  "exp-node-co2t": { col: -4, row: 6 },
  "company-co2t": { col: -3, row: 7 },

  // Projects (southeast)
  "project-ergo": { col: 4, row: 5 },
  "project-fish-fight": { col: 5, row: 6 },
  "project-ergnomes": { col: 6, row: 6 },
  "project-carbon": { col: 3, row: 6 },
  "project-web": { col: 5, row: 4 },
};

function buildOverviewPositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  OVERVIEW_SPINE_IDS.forEach((id, index) => {
    positions[id] = { x: index * OVERVIEW_X_GAP, y: 0 };
  });

  for (const [nodeId, { anchorId, branchIndex }] of Object.entries(OVERVIEW_BRANCH_ANCHORS)) {
    const anchor = positions[anchorId];
    if (!anchor) continue;
    const row = Math.floor(branchIndex / 2) + 1;
    const colOffset = branchIndex % 2 === 0 ? -1 : 1;
    positions[nodeId] = {
      x: anchor.x + colOffset * OVERVIEW_BRANCH_X_OFFSET,
      y: anchor.y + row * OVERVIEW_BRANCH_Y_GAP,
    };
  }

  const spineMidX = ((OVERVIEW_SPINE_IDS.length - 1) * OVERVIEW_X_GAP) / 2;
  const personBounds = estimateNodeBoundsById("person-ed");
  positions["person-ed"] = {
    x: spineMidX,
    y: OVERVIEW_BRANCH_Y_GAP * 2.4 + personBounds.height / 2,
  };

  const allIds = Object.keys(positions);
  return resolvePositionCollisions(positions, allIds, 56);
}

function buildDetailPositions(scale: number): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  for (const [id, slot] of Object.entries(detailSlots)) {
    positions[id] = {
      x: slot.col * DETAIL_COL_GAP * scale,
      y: slot.row * DETAIL_ROW_GAP * scale,
    };
  }
  return resolvePositionCollisions(positions, Object.keys(positions), 60);
}

const employmentOverviewPositions = buildOverviewPositions();
const detailPositions = buildDetailPositions(1);

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
  if (scale === 1) return { ...detailPositions };

  const scaled: Record<string, { x: number; y: number }> = {};
  for (const [id, pos] of Object.entries(detailPositions)) {
    scaled[id] = { x: pos.x * scale, y: pos.y * scale };
  }
  return scaled;
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

  if (tier === "overview" && Math.abs(dy) < 60) {
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
