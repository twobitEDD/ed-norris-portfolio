import {
  careerGraphEdges,
  careerGraphNodes,
  overviewBranchEdges,
  overviewEdgeNotes,
  PERSON_NODE_ID,
} from "./career-graph";
import type { CareerGraphEdge, CareerGraphNode, OverviewEdge } from "./types";

const nodeById = new Map(careerGraphNodes.map((n) => [n.id, n]));

const SPINE_EDGE_TYPES = new Set<CareerGraphEdge["type"]>([
  "employment_sequence",
  "employment_at",
  "agency_to_client",
  "project_at",
]);

function spineAdjacency(): Map<string, CareerGraphEdge[]> {
  const adj = new Map<string, CareerGraphEdge[]>();
  for (const edge of careerGraphEdges) {
    if (!SPINE_EDGE_TYPES.has(edge.type)) continue;
    const list = adj.get(edge.source) ?? [];
    list.push(edge);
    adj.set(edge.source, list);
  }
  return adj;
}

/** Nodes flagged for the homepage overview tier, in chronological order (spine only). */
export function getOverviewSpineNodes(): CareerGraphNode[] {
  return careerGraphNodes
    .filter((n) => n.showInOverview && !n.overviewBranchOnly)
    .sort((a, b) => (a.overviewOrder ?? 0) - (b.overviewOrder ?? 0));
}

/** All overview-visible nodes — spine milestones + branch nodes. */
export function getOverviewNodes(): CareerGraphNode[] {
  return careerGraphNodes.filter((n) => n.showInOverview);
}

export function getOverviewNodeIds(): string[] {
  return getOverviewNodes().map((n) => n.id);
}

/** BFS shortest path on the employment spine (sequence + agency + project edges). */
export function findSpinePath(fromId: string, toId: string): string[] | null {
  if (fromId === toId) return [fromId];
  const adj = spineAdjacency();
  const queue: string[] = [fromId];
  const prev = new Map<string, string | null>([[fromId, null]]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of adj.get(current) ?? []) {
      if (prev.has(edge.target)) continue;
      prev.set(edge.target, current);
      if (edge.target === toId) {
        const path: string[] = [];
        let cursor: string | null = toId;
        while (cursor) {
          path.unshift(cursor);
          cursor = prev.get(cursor) ?? null;
        }
        return path;
      }
      queue.push(edge.target);
    }
  }
  return null;
}

function isSkippable(nodeId: string): boolean {
  return nodeById.get(nodeId)?.skippableInOverview === true;
}

function connectionNoteForOverviewEdge(source: string, target: string): string | undefined {
  const key = `${source}|${target}`;
  if (overviewEdgeNotes[key]) return overviewEdgeNotes[key];
  const direct = careerGraphEdges.find(
    (e) => e.source === source && e.target === target && SPINE_EDGE_TYPES.has(e.type),
  );
  return direct?.connectionNote;
}

/**
 * Derive overview-tier edges from the canonical graph.
 * Consecutive overview milestones must be connected on the spine; only
 * `skippableInOverview` nodes may lie between them.
 */
export function deriveOverviewEdges(): OverviewEdge[] {
  const overviewNodes = getOverviewSpineNodes();
  const edges: OverviewEdge[] = [];

  for (let i = 0; i < overviewNodes.length - 1; i++) {
    const source = overviewNodes[i]!.id;
    const target = overviewNodes[i + 1]!.id;
    const path = findSpinePath(source, target);
    if (!path) continue;

    const intermediates = path.slice(1, -1);
    const illegal = intermediates.filter((id) => !isSkippable(id));
    if (illegal.length > 0) {
      // Still emit edge — validation will catch this
    }

    edges.push({
      id: `ov-${source}-to-${target}`,
      source,
      target,
      connectionNote: connectionNoteForOverviewEdge(source, target),
    });
  }

  return [...edges, ...overviewBranchEdges];
}

export function getEmploymentFocusSlugs(): Record<string, string> {
  const slugs: Record<string, string> = {};
  for (const node of careerGraphNodes) {
    if (node.focusSlug) slugs[node.focusSlug] = node.id;
  }
  return slugs;
}

export function getOverviewLabels(): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const node of getOverviewNodes()) {
    labels[node.id] = node.overviewLabel ?? node.label;
  }
  return labels;
}

export function getNodeByExperienceId(experienceId: string): CareerGraphNode | undefined {
  return careerGraphNodes.find((n) => n.experienceId === experienceId);
}

export function getTimelineEmployerIndex(): Map<string, string> {
  const index = new Map<string, string>();
  for (const node of careerGraphNodes) {
    for (const alias of node.timelineEmployerAliases ?? []) {
      index.set(alias.toLowerCase().trim(), node.id);
    }
  }
  return index;
}

export { PERSON_NODE_ID };
