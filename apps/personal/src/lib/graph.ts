import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
import { storyStops } from "@/data/through-line";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { getEdgeHandles, getNodePosition, type MapLayoutOptions } from "@/components/work-map/map-layout";

/** Homepage bento — minimal story spine (8 key stops). */
export const previewSpineNodeIds = [
  "theme-education",
  "theme-games",
  "theme-software",
  "theme-marketing",
  "practice-environment",
  "company-co2t",
  "project-ergo",
  "person-ed",
] as const;

/** Sequential story spine edges — preview only, not in graphEdges. */
const previewSpineEdges = [
  { id: "preview-spine-1", source: "theme-education", target: "theme-games" },
  { id: "preview-spine-2", source: "theme-games", target: "theme-software" },
  { id: "preview-spine-3", source: "theme-software", target: "theme-marketing" },
  { id: "preview-spine-4", source: "theme-marketing", target: "practice-environment" },
  { id: "preview-spine-5", source: "practice-environment", target: "company-co2t" },
  { id: "preview-spine-6", source: "company-co2t", target: "project-ergo" },
  { id: "preview-spine-7", source: "project-ergo", target: "person-ed" },
] as const;

export const previewNodeIds = new Set<string>(previewSpineNodeIds);

const themeHubIds = new Set(
  graphNodes.filter((n) => n.type === "theme").map((n) => n.id),
);

export type MapNodeData = {
  label: string;
  subtitle?: string;
  nodeType: GraphNode["type"];
  disciplines: Discipline[];
  description?: string;
  projectId?: string;
  dimmed?: boolean;
  highlighted?: boolean;
  isThemeHub?: boolean;
  onStoryPath?: boolean;
  isStoryFocus?: boolean;
  index: number;
  preview?: boolean;
};

export type MapEdgeData = {
  highlighted?: boolean;
  throughLine?: boolean;
  dimmed?: boolean;
};

function getConnectedNodes(nodeId: string, depth = 1): Set<string> {
  const connected = new Set<string>([nodeId, "person-ed"]);
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

function getStoryPathSet(preview: boolean, storyIndex: number): Set<string> {
  const path = getStoryPath(preview);
  if (storyIndex < 0) return new Set();
  const ids = new Set<string>(["person-ed"]);

  const start = Math.max(0, storyIndex - 1);
  const end = Math.min(path.length - 1, storyIndex + 1);
  for (let i = start; i <= end; i++) ids.add(path[i]);

  const focusId = path[storyIndex];
  getRelatedThemes(focusId).forEach((t) => ids.add(t.id));

  // Keep focus-area hubs visible so the arc stays readable during story mode
  if (!preview) {
    graphNodes.filter((n) => n.type === "theme").forEach((t) => ids.add(t.id));
    if (focusId.startsWith("practice-") || focusId.startsWith("company-co2t")) {
      ids.add("practice-environment");
      ids.add("company-co2t");
    }
  }

  return ids;
}

function getStoryEdgeIds(preview: boolean, storyIndex: number): Set<string> {
  const path = getStoryPath(preview);
  const ids = new Set<string>();
  if (storyIndex < 0) return ids;

  const focusId = path[storyIndex];
  const prevId = storyIndex > 0 ? path[storyIndex - 1] : null;
  const nextId = storyIndex < path.length - 1 ? path[storyIndex + 1] : null;
  const edgeList = preview ? previewSpineEdges : graphEdges;

  for (const e of edgeList) {
    if (prevId && e.source === prevId && e.target === focusId) ids.add(e.id);
    if (nextId && e.source === focusId && e.target === nextId) ids.add(e.id);
    if ("throughLine" in e && e.throughLine) ids.add(e.id);
    if (e.source === focusId || e.target === focusId) {
      const other = e.source === focusId ? e.target : e.source;
      if (path.includes(other) || themeHubIds.has(other)) ids.add(e.id);
    }
  }

  return ids;
}

export function getRelatedThemes(nodeId: string): GraphNode[] {
  const themeIds = new Set<string>();
  graphEdges.forEach((e) => {
    if (e.source === nodeId && themeHubIds.has(e.target)) themeIds.add(e.target);
    if (e.target === nodeId && themeHubIds.has(e.source)) themeIds.add(e.source);
  });
  return graphNodes.filter((n) => themeIds.has(n.id));
}

export function getConnectionNotes(nodeId: string): { note: string; peerLabel: string }[] {
  return graphEdges
    .filter((e) => (e.source === nodeId || e.target === nodeId) && e.connectionNote)
    .map((e) => {
      const peerId = e.source === nodeId ? e.target : e.source;
      const peer = graphNodes.find((n) => n.id === peerId);
      return {
        note: e.connectionNote!,
        peerLabel: peer?.label ?? peerId,
      };
    })
    .slice(0, 5);
}

export function buildFlowGraph(
  activeFilters: Discipline[] = [],
  selectedId?: string,
  activeThemeId?: string | null,
  layoutOptions?: MapLayoutOptions,
  storyIndex = -1,
) {
  const preview = layoutOptions?.preview ?? false;
  const storyActive = storyIndex >= 0;
  const storyPathNodes = getStoryPathSet(preview, storyIndex);
  const storyPathEdges = getStoryEdgeIds(preview, storyIndex);
  const themeVisible = !preview && activeThemeId ? getConnectedNodes(activeThemeId, 2) : null;

  let visibleNodes = preview
    ? graphNodes.filter((n) => previewNodeIds.has(n.id))
    : graphNodes;

  if (themeVisible) {
    visibleNodes = visibleNodes.filter((n) => themeVisible.has(n.id));
  }

  const visibleIds = new Set(visibleNodes.map((n) => n.id));

  const nodes: Node<MapNodeData>[] = visibleNodes.map((node, index) => {
    const disciplineDimmed =
      activeFilters.length > 0 &&
      !node.disciplines.some((d) => activeFilters.includes(d));
    const connected = selectedId ? isConnected(selectedId, node.id, visibleIds) : false;
    const onStoryPath = storyPathNodes.has(node.id);
    const isStoryFocus = storyActive && getStoryPath(preview)[storyIndex] === node.id;

    const dimmed = preview
      ? false
      : storyActive
        ? !onStoryPath && !isStoryFocus
        : selectedId
          ? !connected && selectedId !== node.id
          : disciplineDimmed;

    return {
      id: node.id,
      type: "mapNode",
      position: getNodePosition(node.id, index, layoutOptions),
      data: {
        label: node.label,
        subtitle: node.subtitle,
        nodeType: node.type,
        disciplines: node.disciplines,
        description: node.description,
        projectId: node.projectId,
        dimmed,
        highlighted: selectedId === node.id || connected,
        isThemeHub: node.type === "theme",
        onStoryPath,
        isStoryFocus,
        index,
        preview,
      },
    };
  });

  const edgeSource = preview
    ? previewSpineEdges.map((e) => ({ ...e, throughLine: true, connectionNote: undefined }))
    : graphEdges.filter(
        (edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target),
      );

  const edges: Edge[] = edgeSource.map((edge) => {
      const sourceNode = graphNodes.find((n) => n.id === edge.source);
      const edgeDimmed =
        !preview &&
        activeFilters.length > 0 &&
        sourceNode &&
        !sourceNode.disciplines.some((d) => activeFilters.includes(d));
      const selectedHighlight = selectedId
        ? edge.source === selectedId || edge.target === selectedId
        : false;
      const throughLine = "throughLine" in edge && edge.throughLine;
      const onStoryPath = storyPathEdges.has(edge.id);
      const highlighted = selectedHighlight || onStoryPath;

      const color = sourceNode?.disciplines[0]
        ? disciplineColors[sourceNode.disciplines[0]]
        : "#46c7d7";

      const showThroughLineLabel = !preview && throughLine;
      const showSelectedLabel =
        !preview && selectedHighlight && "connectionNote" in edge && edge.connectionNote;
      const label = showThroughLineLabel || showSelectedLabel
        ? ("connectionNote" in edge ? edge.connectionNote : undefined)
        : undefined;

      const handles = getEdgeHandles(edge.source, edge.target, layoutOptions);

      const storyDimmed = storyActive && !throughLine && !onStoryPath;
      const baseOpacity = preview ? 0.85 : throughLine ? 0.9 : highlighted ? 0.95 : 0.22;
      const opacity =
        edgeDimmed && !highlighted ? 0.08 : storyDimmed ? 0.1 : baseOpacity;

      return {
        id: edge.id,
        type: "mapEdge",
        source: edge.source,
        target: edge.target,
        sourceHandle: handles.sourceHandle,
        targetHandle: handles.targetHandle,
        label,
        labelStyle: {
          fill: "#e2e8f0",
          fontSize: 10,
          fontFamily: "var(--font-ibm-plex-mono), monospace",
        },
        data: {
          highlighted,
          throughLine: !!throughLine,
          dimmed: storyDimmed || (edgeDimmed && !highlighted),
        },
        style: {
          stroke: color,
          strokeWidth: preview ? 2.5 : throughLine ? 3 : highlighted ? 2.5 : 1.5,
          opacity,
        },
        animated: highlighted || (!preview && throughLine),
        zIndex: throughLine ? 10 : highlighted ? 5 : 0,
      };
    });

  return { nodes, edges };
}

function isConnected(selectedId: string, nodeId: string, visibleIds?: Set<string>): boolean {
  if (selectedId === nodeId) return true;
  return graphEdges.some(
    (e) => {
      if (visibleIds && (!visibleIds.has(e.source) || !visibleIds.has(e.target))) return false;
      return (
        (e.source === selectedId && e.target === nodeId) ||
        (e.target === selectedId && e.source === nodeId)
      );
    },
  );
}

export function getStoryPath(preview = false): string[] {
  if (preview) {
    return [...previewSpineNodeIds];
  }
  return storyStops.map((s) => s.nodeId);
}

export function getStoryStop(index: number, preview = false) {
  const path = getStoryPath(preview);
  const nodeId = path[index % path.length];
  const stop = storyStops.find((s) => s.nodeId === nodeId);
  if (stop) return stop;
  const node = graphNodes.find((n) => n.id === nodeId);
  return {
    nodeId,
    headline: node?.label ?? nodeId,
    copy: node?.connectionNarrative ?? node?.description ?? "",
  };
}

export { storyStops };
