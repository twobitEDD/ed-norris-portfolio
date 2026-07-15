import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { getEdgeHandles, getNodePosition, type MapLayoutOptions } from "@/components/work-map/map-layout";

/**
 * Homepage bento preview — relationship graph subset (companies, roles, clients, projects).
 * Uses real edges from relationships.ts, not the career through-line story path.
 */
export const previewGraphNodeIds = [
  "person-ed",
  "exp-node-adidas",
  "exp-node-2bit",
  "company-2bit",
  "client-google",
  "client-dell",
  "project-ergo",
  "exp-node-oibw",
  "exp-node-co2t",
  "company-co2t",
  "project-carbon",
] as const;

/** Bridge edges so person-ed connects to the preview subgraph (full graph routes via theme hubs). */
const previewPersonBridgeEdges = [
  {
    id: "preview-pe-2bit",
    source: "person-ed",
    target: "exp-node-2bit",
    relationship: "created" as const,
    connectionNote: "studio founder",
  },
  {
    id: "preview-pe-co2t",
    source: "person-ed",
    target: "exp-node-co2t",
    relationship: "managed" as const,
    connectionNote: "VP Operations",
  },
];

export const previewNodeIds = new Set<string>(previewGraphNodeIds);

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
  index: number;
  preview?: boolean;
};

export type MapEdgeData = {
  highlighted?: boolean;
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

function getPreviewEdges() {
  const ids = previewNodeIds;
  const fromGraph = graphEdges.filter((e) => ids.has(e.source) && ids.has(e.target));
  const bridge = previewPersonBridgeEdges.filter(
    (e) => ids.has(e.source) && ids.has(e.target),
  );
  return [...fromGraph, ...bridge];
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
    const connected = selectedId ? isConnected(selectedId, node.id, visibleIds) : false;

    const dimmed = preview
      ? false
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
        index,
        preview,
      },
    };
  });

  const edgeSource = preview
    ? getPreviewEdges()
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

      const showLabel = !preview && highlighted && edge.connectionNote;
      const handles = getEdgeHandles(edge.source, edge.target, layoutOptions);
      const opacity = edgeDimmed && !highlighted ? 0.08 : highlighted ? 0.95 : preview ? 0.75 : 0.28;

      return {
        id: edge.id,
        type: "mapEdge",
        source: edge.source,
        target: edge.target,
        sourceHandle: handles.sourceHandle,
        targetHandle: handles.targetHandle,
        label: showLabel ? edge.connectionNote : undefined,
        labelStyle: {
          fill: "#e2e8f0",
          fontSize: 10,
          fontFamily: "var(--font-ibm-plex-mono), monospace",
        },
        data: {
          highlighted,
          dimmed: edgeDimmed && !highlighted,
        },
        style: {
          stroke: color,
          strokeWidth: preview ? 2 : highlighted ? 2.5 : 1.5,
          opacity,
        },
        animated: highlighted,
        zIndex: highlighted ? 5 : 0,
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
