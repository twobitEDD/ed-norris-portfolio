/**
 * Work-map layout — overview tier (employment network) vs detail tier (full graph).
 * Positions are **center-anchored** — pair with React Flow `nodeOrigin={[0.5, 0.5]}`.
 *
 * Overview uses a **relationship-cluster layout**: nodes group by career arc and
 * spread in 2D so the pane fills width and height instead of a single horizontal spine.
 */

import { overviewBranchEdges, PERSON_NODE_ID } from "@/data/career/career-graph";
import { getOverviewSpineNodes } from "@/data/career/derive";
import {
  estimateNodeBoundsById,
  resolvePositionCollisions,
} from "@/components/work-map/map-node-bounds";

/** Detail-tier column / row spacing between node centers (px). */
const DETAIL_COL_GAP = 360;
const DETAIL_ROW_GAP = 200;

/** Target bounding box for overview layout before fitView (px). */
const OVERVIEW_TARGET_WIDTH = 1080;
const OVERVIEW_TARGET_HEIGHT = 960;

/** Chronological spine for overview — derived from career graph (person anchor excluded). */
const OVERVIEW_SPINE_IDS = getOverviewSpineNodes()
  .filter((n) => n.id !== PERSON_NODE_ID)
  .map((n) => n.id);

/**
 * Overview clusters — semantic groupings placed on a 2D lattice.
 * `chain` lists node ids in left-to-right (or top-to-bottom) order within the cluster.
 */
type OverviewCluster = {
  id: string;
  /** Cluster anchor (center of the chain). */
  origin: { x: number; y: number };
  chain: readonly string[];
  /** Direction the chain extends from origin. */
  axis: "horizontal" | "vertical";
  gap: number;
};

const OVERVIEW_CLUSTERS: OverviewCluster[] = [
  {
    id: "games-foundation",
    origin: { x: -340, y: -300 },
    chain: [
      "exp-node-ea",
      "exp-node-black-lantern",
      "exp-node-seamless",
      "exp-node-rocket",
      "exp-node-2bit-founder",
    ],
    axis: "horizontal",
    gap: 155,
  },
  {
    id: "education",
    origin: { x: -420, y: 40 },
    chain: ["exp-node-pps"],
    axis: "horizontal",
    gap: 0,
  },
  {
    id: "brand",
    origin: { x: -120, y: -150 },
    chain: ["exp-node-adidas"],
    axis: "horizontal",
    gap: 0,
  },
  {
    id: "studio-hub",
    origin: { x: 180, y: -40 },
    chain: ["exp-node-2bit"],
    axis: "horizontal",
    gap: 0,
  },
  {
    id: "agency-east",
    origin: { x: 400, y: -110 },
    chain: ["exp-node-uncorked", "client-google"],
    axis: "horizontal",
    gap: 165,
  },
  {
    id: "agency-south",
    origin: { x: 180, y: 110 },
    chain: ["exp-node-nice-touch"],
    axis: "horizontal",
    gap: 0,
  },
  {
    id: "clients",
    origin: { x: 120, y: 250 },
    chain: ["client-dell", "client-wash-u"],
    axis: "horizontal",
    gap: 175,
  },
  {
    id: "2bit-projects",
    origin: { x: 60, y: 50 },
    chain: ["project-fish-fight", "project-ergnomes"],
    axis: "horizontal",
    gap: 175,
  },
  {
    id: "environment",
    origin: { x: 380, y: 200 },
    chain: ["exp-node-oibw", "exp-node-co2t", "project-ergo"],
    axis: "vertical",
    gap: 155,
  },
];

const overviewBranchEdgeIds = new Set(overviewBranchEdges.map((e) => e.id));

function layoutClusterChain(cluster: OverviewCluster): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const { origin, chain, axis, gap } = cluster;
  const count = chain.length;
  if (count === 0) return positions;

  const span = (count - 1) * gap;
  const startOffset = -span / 2;

  chain.forEach((nodeId, index) => {
    const offset = startOffset + index * gap;
    positions[nodeId] =
      axis === "horizontal"
        ? { x: origin.x + offset, y: origin.y }
        : { x: origin.x, y: origin.y + offset };
  });

  return positions;
}

function buildOverviewClusterPositions(): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};

  for (const cluster of OVERVIEW_CLUSTERS) {
    Object.assign(positions, layoutClusterChain(cluster));
  }

  const personBounds = estimateNodeBoundsById("person-ed");
  positions["person-ed"] = { x: 0, y: 320 + personBounds.height * 0.15 };

  return positions;
}

/**
 * Scale positions so the graph bounding box matches the target aspect ratio,
 * helping fitView fill a tall tablet pane instead of letterboxing vertically.
 */
function normalizeLayoutBounds(
  positions: Record<string, { x: number; y: number }>,
  nodeIds: string[],
  targetWidth: number,
  targetHeight: number,
): Record<string, { x: number; y: number }> {
  if (nodeIds.length === 0) return positions;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const id of nodeIds) {
    const pos = positions[id];
    if (!pos) continue;
    const { width, height } = estimateNodeBoundsById(id);
    minX = Math.min(minX, pos.x - width / 2);
    maxX = Math.max(maxX, pos.x + width / 2);
    minY = Math.min(minY, pos.y - height / 2);
    maxY = Math.max(maxY, pos.y + height / 2);
  }

  const width = maxX - minX || 1;
  const height = maxY - minY || 1;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const scale = Math.min(targetWidth / width, targetHeight / height);
  const targetCenterX = 0;
  const targetCenterY = 0;

  const normalized: Record<string, { x: number; y: number }> = {};
  for (const id of nodeIds) {
    const pos = positions[id];
    if (!pos) continue;
    normalized[id] = {
      x: (pos.x - centerX) * scale + targetCenterX,
      y: (pos.y - centerY) * scale + targetCenterY,
    };
  }

  return normalized;
}

function buildOverviewPositions(): Record<string, { x: number; y: number }> {
  const raw = buildOverviewClusterPositions();
  const allIds = [...new Set([...Object.keys(raw), PERSON_NODE_ID])];
  const normalized = normalizeLayoutBounds(raw, allIds, OVERVIEW_TARGET_WIDTH, OVERVIEW_TARGET_HEIGHT);
  return resolvePositionCollisions(normalized, allIds, 72);
}

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
  "exp-node-black-lantern": { col: 7, row: -5 },
  "exp-node-seamless": { col: 7, row: -4 },
  "exp-node-rocket": { col: 7, row: -3 },
  "exp-node-2bit-founder": { col: 6, row: -2 },
  "exp-node-hatalom": { col: 8, row: -2 },
  "exp-node-2bit-pause": { col: 5, row: -1 },
  "exp-node-2bit": { col: 7, row: -1 },
  "company-2bit": { col: 7, row: 0 },
  "project-planets-core": { col: 9, row: -3 },

  // Agency / marketing crossover (east) — staggered columns with breathing room
  "exp-node-adidas": { col: 4, row: -3 },
  "client-google": { col: 2, row: -2 },
  "exp-node-uncorked": { col: 9, row: -1 },
  "exp-node-trustless": { col: 11, row: 0 },
  "exp-node-fresh": { col: 11, row: 1 },
  "exp-node-opus": { col: 12, row: 1 },
  "exp-node-nice-touch": { col: 8, row: 3 },
  "exp-node-ergnomes": { col: 11, row: 3 },

  // Clients (east, below agencies)
  "client-dell": { col: 7, row: 4 },
  "client-wash-u": { col: 9, row: 4 },

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

function buildDetailPositions(scale: number): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  for (const [id, slot] of Object.entries(detailSlots)) {
    positions[id] = {
      x: slot.col * DETAIL_COL_GAP * scale,
      y: slot.row * DETAIL_ROW_GAP * scale,
    };
  }
  return resolvePositionCollisions(positions, Object.keys(positions), 76);
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

  if (Math.abs(dx) > Math.abs(dy) * 0.85) {
    return dx > 0
      ? { sourceHandle: "source-right", targetHandle: "target-left" }
      : { sourceHandle: "source-left", targetHandle: "target-right" };
  }
  return dy > 0
    ? { sourceHandle: "source-bottom", targetHandle: "target-top" }
    : { sourceHandle: "source-top", targetHandle: "target-bottom" };
}

/** @internal Exported for tests — overview cluster ids in layout order. */
export const overviewClusterIds = OVERVIEW_CLUSTERS.map((c) => c.id);

/** @internal Exported for tests — spine node ids (chronological, excl. person). */
export { OVERVIEW_SPINE_IDS };
