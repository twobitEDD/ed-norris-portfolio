import { graphEdges } from "./relationships";

/**
 * Two-tier work map: employment overview (high-level) → detailed work graph (low-level).
 */

export type MapTier = "overview" | "detail";

/** Major employers / roles shown in homepage bento — games foundation arc includes all Wii/casino studios. */
export const employmentOverviewNodeIds = [
  "person-ed",
  "exp-node-ea",
  "exp-node-black-lantern",
  "exp-node-seamless",
  "exp-node-rocket",
  "exp-node-2bit",
  "exp-node-pps",
  "exp-node-adidas",
  "client-google",
  "exp-node-oibw",
  "exp-node-co2t",
  "project-ergo",
] as const;

export type EmploymentOverviewNodeId = (typeof employmentOverviewNodeIds)[number];

export const employmentOverviewNodeIdSet = new Set<string>(employmentOverviewNodeIds);

/** Chronological spine for the overview tier — readable career arc without theme hubs. */
export const employmentOverviewEdges = [
  { id: "ov-pe-ea", source: "person-ed", target: "exp-node-ea", connectionNote: "first industry exposure" },
  { id: "ov-ea-blacklantern", source: "exp-node-ea", target: "exp-node-black-lantern", connectionNote: "first credited ship" },
  { id: "ov-blacklantern-seamless", source: "exp-node-black-lantern", target: "exp-node-seamless", connectionNote: "Wii studio transfer" },
  { id: "ov-seamless-rocket", source: "exp-node-seamless", target: "exp-node-rocket", connectionNote: "licensed → casino" },
  { id: "ov-rocket-2bit", source: "exp-node-rocket", target: "exp-node-2bit", connectionNote: "studio founder" },
  { id: "ov-2bit-pps", source: "exp-node-2bit", target: "exp-node-pps", connectionNote: "education chapter" },
  { id: "ov-pps-adidas", source: "exp-node-pps", target: "exp-node-adidas", connectionNote: "brand innovation" },
  { id: "ov-adidas-google", source: "exp-node-adidas", target: "client-google", connectionNote: "agency contracts" },
  { id: "ov-google-oibw", source: "client-google", target: "exp-node-oibw", connectionNote: "environment pivot" },
  { id: "ov-oibw-co2t", source: "exp-node-oibw", target: "exp-node-co2t", connectionNote: "scaled operations" },
  { id: "ov-co2t-ergo", source: "exp-node-co2t", target: "project-ergo", connectionNote: "advisory & platforms" },
] as const;

/** URL slug → overview anchor node for drill-down into detail tier. */
export const employmentFocusSlugs: Record<string, EmploymentOverviewNodeId> = {
  ea: "exp-node-ea",
  "black-lantern": "exp-node-black-lantern",
  seamless: "exp-node-seamless",
  rocket: "exp-node-rocket",
  "2bit": "exp-node-2bit",
  pps: "exp-node-pps",
  adidas: "exp-node-adidas",
  google: "client-google",
  oibw: "exp-node-oibw",
  co2t: "exp-node-co2t",
  ergo: "project-ergo",
};

/** Reverse lookup: graph node id → focus slug (for linking). */
export const nodeIdToFocusSlug = Object.fromEntries(
  Object.entries(employmentFocusSlugs).map(([slug, nodeId]) => [nodeId, slug]),
) as Record<string, string>;

export function resolveFocusSlug(input?: string | null): string | null {
  if (!input) return null;
  const normalized = input.toLowerCase().trim();
  return employmentFocusSlugs[normalized] ? normalized : null;
}

export function focusSlugToNodeId(slug: string): EmploymentOverviewNodeId | null {
  return employmentFocusSlugs[slug.toLowerCase()] ?? null;
}

/**
 * Detail-tier subgraph for a focus slug — includes anchor, connected roles, themes, and projects.
 * Depth-2 BFS from anchor within the full relationship graph.
 */
export function getFocusClusterNodeIds(slug: string, depth = 2): Set<string> {
  const anchor = focusSlugToNodeId(slug);
  if (!anchor) return new Set(["person-ed"]);

  const connected = new Set<string>([anchor, "person-ed"]);

  for (let d = 0; d < depth; d++) {
    const next = new Set<string>();
    graphEdges.forEach((e) => {
      if (connected.has(e.source) && !connected.has(e.target)) next.add(e.target);
      if (connected.has(e.target) && !connected.has(e.source)) next.add(e.source);
    });
    next.forEach((id) => connected.add(id));
  }

  return connected;
}

export const employmentOverviewLabels: Record<EmploymentOverviewNodeId, string> = {
  "person-ed": "Edd Norris",
  "exp-node-ea": "EA",
  "exp-node-black-lantern": "Black Lantern",
  "exp-node-seamless": "Seamless",
  "exp-node-rocket": "Rocket",
  "exp-node-2bit": "2bit",
  "exp-node-pps": "PPS",
  "exp-node-adidas": "adidas",
  "client-google": "Google",
  "exp-node-oibw": "OIBW",
  "exp-node-co2t": "CO2T",
  "project-ergo": "ERGO",
};
