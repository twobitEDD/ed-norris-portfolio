import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
import { storyStops } from "@/data/through-line";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { getNodePosition, type MapLayoutOptions } from "@/components/work-map/map-layout";

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
  index: number;
  preview?: boolean;
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

export function buildFlowGraph(
  activeFilters: Discipline[] = [],
  selectedId?: string,
  activeThemeId?: string | null,
  layoutOptions?: MapLayoutOptions,
) {
  const preview = layoutOptions?.preview ?? false;
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
    const highlighted = selectedId ? isConnected(selectedId, node.id, visibleIds) : false;
    const dimmed =
      preview
        ? false
        : selectedId
          ? !highlighted && selectedId !== node.id
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
        highlighted: selectedId === node.id || highlighted,
        isThemeHub: node.type === "theme",
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
      const highlighted = selectedId
        ? edge.source === selectedId || edge.target === selectedId
        : false;

      const color = sourceNode?.disciplines[0]
        ? disciplineColors[sourceNode.disciplines[0]]
        : "#46c7d7";

      const showLabel = !preview && ("throughLine" in edge && edge.throughLine) && highlighted;

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: showLabel && "connectionNote" in edge ? edge.connectionNote : undefined,
        labelStyle: {
          fill: "#e2e8f0",
          fontSize: 10,
          fontFamily: "var(--font-ibm-plex-mono), monospace",
        },
        labelBgStyle: {
          fill: "#0c1424",
          fillOpacity: 0.95,
        },
        labelBgPadding: [5, 7] as [number, number],
        labelBgBorderRadius: 4,
        style: {
          stroke: color,
          strokeWidth: preview ? 2.5 : ("throughLine" in edge && edge.throughLine) ? 2.5 : highlighted ? 2.5 : 1.25,
          opacity: edgeDimmed && !highlighted ? 0.15 : highlighted ? 1 : preview ? 0.8 : ("throughLine" in edge && edge.throughLine) ? 0.75 : 0.35,
        },
        animated: highlighted || (!preview && "throughLine" in edge && edge.throughLine),
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
