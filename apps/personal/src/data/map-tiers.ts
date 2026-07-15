import { graphEdges } from "./relationships";

/**
 * Two-tier work map: employment overview (high-level) → detailed work graph (low-level).
 */

export type MapTier = "overview" | "detail";

/** Major employers / roles shown in homepage bento — games foundation arc + agency-backed post-adidas path. */
export const employmentOverviewNodeIds = [
  "person-ed",
  "exp-node-ea",
  "exp-node-black-lantern",
  "exp-node-seamless",
  "exp-node-rocket",
  "exp-node-2bit-founder",
  "exp-node-pps",
  "exp-node-adidas",
  "exp-node-2bit",
  "exp-node-uncorked",
  "client-google",
  "exp-node-nice-touch",
  "client-dell",
  "client-wash-u",
  "exp-node-oibw",
  "exp-node-co2t",
  "project-ergo",
  "project-fish-fight",
  "project-ergnomes",
] as const;

export type EmploymentOverviewNodeId = (typeof employmentOverviewNodeIds)[number];

export const employmentOverviewNodeIdSet = new Set<string>(employmentOverviewNodeIds);

/** Chronological spine + agency branches — no false shortcuts (e.g. adidas→Google). */
export const employmentOverviewEdges = [
  { id: "ov-pe-ea", source: "person-ed", target: "exp-node-ea", connectionNote: "first industry exposure" },
  { id: "ov-ea-blacklantern", source: "exp-node-ea", target: "exp-node-black-lantern", connectionNote: "first credited ship" },
  { id: "ov-blacklantern-seamless", source: "exp-node-black-lantern", target: "exp-node-seamless", connectionNote: "Wii studio transfer" },
  { id: "ov-seamless-rocket", source: "exp-node-seamless", target: "exp-node-rocket", connectionNote: "licensed → casino" },
  { id: "ov-rocket-2bit-founder", source: "exp-node-rocket", target: "exp-node-2bit-founder", connectionNote: "studio founder" },
  { id: "ov-2bit-founder-pps", source: "exp-node-2bit-founder", target: "exp-node-pps", connectionNote: "education chapter" },
  { id: "ov-pps-adidas", source: "exp-node-pps", target: "exp-node-adidas", connectionNote: "brand innovation" },
  { id: "ov-adidas-2bit", source: "exp-node-adidas", target: "exp-node-2bit", connectionNote: "contract via 2bit" },
  { id: "ov-2bit-uncorked", source: "exp-node-2bit", target: "exp-node-uncorked", connectionNote: "agency contract" },
  { id: "ov-uncorked-google", source: "exp-node-uncorked", target: "client-google", connectionNote: "via Uncorked" },
  { id: "ov-google-oibw", source: "client-google", target: "exp-node-oibw", connectionNote: "environment pivot" },
  { id: "ov-oibw-co2t", source: "exp-node-oibw", target: "exp-node-co2t", connectionNote: "scaled operations" },
  { id: "ov-co2t-ergo", source: "exp-node-co2t", target: "project-ergo", connectionNote: "advisory & platforms" },
  // Agency branch — Nice Touch clients (not direct from adidas or 2bit→Google)
  { id: "ov-2bit-nice-touch", source: "exp-node-2bit", target: "exp-node-nice-touch", connectionNote: "agency contract" },
  { id: "ov-nice-touch-dell", source: "exp-node-nice-touch", target: "client-dell", connectionNote: "via Nice Touch" },
  { id: "ov-nice-touch-washu", source: "exp-node-nice-touch", target: "client-wash-u", connectionNote: "via Nice Touch" },
  // 2bit studio projects (Fish Fight, ERGnomes — detail also has ERGO.games on spine)
  { id: "ov-2bit-fish-fight", source: "exp-node-2bit", target: "project-fish-fight", connectionNote: "2bit game" },
  { id: "ov-2bit-ergnomes", source: "exp-node-2bit", target: "project-ergnomes", connectionNote: "2bit NFT design" },
] as const;

/** URL slug → overview anchor node for drill-down into detail tier. */
export const employmentFocusSlugs: Record<string, EmploymentOverviewNodeId> = {
  ea: "exp-node-ea",
  "black-lantern": "exp-node-black-lantern",
  seamless: "exp-node-seamless",
  rocket: "exp-node-rocket",
  "2bit-founder": "exp-node-2bit-founder",
  "2bit": "exp-node-2bit",
  pps: "exp-node-pps",
  adidas: "exp-node-adidas",
  uncorked: "exp-node-uncorked",
  google: "client-google",
  "nice-touch": "exp-node-nice-touch",
  dell: "client-dell",
  "wash-u": "client-wash-u",
  oibw: "exp-node-oibw",
  co2t: "exp-node-co2t",
  ergo: "project-ergo",
  "fish-fight": "project-fish-fight",
  ergnomes: "project-ergnomes",
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
  "exp-node-2bit-founder": "2bit '12",
  "exp-node-pps": "PPS",
  "exp-node-adidas": "adidas",
  "exp-node-2bit": "2bit '18+",
  "exp-node-uncorked": "Uncorked",
  "client-google": "Google",
  "exp-node-nice-touch": "Nice Touch",
  "client-dell": "Dell",
  "client-wash-u": "WashU",
  "exp-node-oibw": "OIBW",
  "exp-node-co2t": "CO2T",
  "project-ergo": "ERGO",
  "project-fish-fight": "Fish Fight",
  "project-ergnomes": "ERGnomes",
};
