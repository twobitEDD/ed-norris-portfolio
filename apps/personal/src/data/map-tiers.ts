import { graphEdges } from "./relationships";
import {
  deriveOverviewEdges,
  getEmploymentFocusSlugs,
  getOverviewLabels,
  getOverviewNodeIds,
} from "./career";

/**
 * Two-tier work map: employment overview (high-level) → detailed work graph (low-level).
 *
 * Overview nodes and edges are **derived** from career-graph.ts — do not hand-edit lists here.
 */

export type MapTier = "overview" | "detail";

/** Major employers / roles shown in homepage bento — derived from career-graph `showInOverview`. */
export const employmentOverviewNodeIds = getOverviewNodeIds() as readonly string[];

export type EmploymentOverviewNodeId = (typeof employmentOverviewNodeIds)[number];

export const employmentOverviewNodeIdSet = new Set<string>(employmentOverviewNodeIds);

/** Chronological spine for the overview tier — derived from canonical career graph. */
export const employmentOverviewEdges = deriveOverviewEdges();

/** URL slug → overview anchor node for drill-down into detail tier. */
export const employmentFocusSlugs = getEmploymentFocusSlugs() as Record<
  string,
  EmploymentOverviewNodeId
>;

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
  return (employmentFocusSlugs[slug.toLowerCase()] as EmploymentOverviewNodeId) ?? null;
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

export const employmentOverviewLabels = getOverviewLabels() as Record<
  EmploymentOverviewNodeId,
  string
>;
