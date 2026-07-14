import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
import { storyStops } from "@/data/through-line";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { getNodePosition } from "@/components/work-map/map-layout";

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
};

function getConnectedNodes(nodeId: string, depth = 1): Set<string> {
  const connected = new Set<string>([nodeId]);
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
) {
  const themeVisible = activeThemeId ? getConnectedNodes(activeThemeId, 2) : null;

  const nodes: Node<MapNodeData>[] = graphNodes.map((node, index) => {
    const disciplineDimmed =
      activeFilters.length > 0 &&
      !node.disciplines.some((d) => activeFilters.includes(d));
    const themeDimmed = themeVisible ? !themeVisible.has(node.id) : false;
    const highlighted = selectedId ? isConnected(selectedId, node.id) : false;
    const dimmed =
      selectedId
        ? !highlighted && selectedId !== node.id
        : disciplineDimmed || themeDimmed;

    return {
      id: node.id,
      type: "mapNode",
      position: getNodePosition(node.id, index),
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
      },
    };
  });

  const edges: Edge[] = graphEdges.map((edge) => {
    const sourceNode = graphNodes.find((n) => n.id === edge.source);
    const edgeDimmed =
      activeFilters.length > 0 &&
      sourceNode &&
      !sourceNode.disciplines.some((d) => activeFilters.includes(d));
    const themeDimmed =
      themeVisible && !(themeVisible.has(edge.source) && themeVisible.has(edge.target));
    const highlighted = selectedId
      ? edge.source === selectedId || edge.target === selectedId
      : false;

    const color = sourceNode?.disciplines[0]
      ? disciplineColors[sourceNode.disciplines[0]]
      : "#46c7d7";

    const showLabel = edge.throughLine || highlighted;

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: showLabel ? edge.connectionNote : undefined,
      labelStyle: {
        fill: "#94a3b8",
        fontSize: 9,
        fontFamily: "monospace",
      },
      labelBgStyle: {
        fill: "rgba(15,22,39,0.92)",
        fillOpacity: 0.92,
      },
      labelBgPadding: [4, 6] as [number, number],
      labelBgBorderRadius: 4,
      style: {
        stroke: edge.throughLine ? color : color,
        strokeWidth: edge.throughLine ? 2 : highlighted ? 2.5 : 1,
        opacity: (edgeDimmed || themeDimmed) && !highlighted ? 0.12 : highlighted ? 0.95 : edge.throughLine ? 0.7 : 0.4,
        strokeDasharray: edge.throughLine ? undefined : undefined,
      },
      animated: highlighted || edge.throughLine,
    };
  });

  return { nodes, edges };
}

function isConnected(selectedId: string, nodeId: string): boolean {
  if (selectedId === nodeId) return true;
  return graphEdges.some(
    (e) =>
      (e.source === selectedId && e.target === nodeId) ||
      (e.target === selectedId && e.source === nodeId),
  );
}

export function getStoryPath(): string[] {
  return storyStops.map((s) => s.nodeId);
}

export function getStoryStop(index: number) {
  const path = getStoryPath();
  const nodeId = path[index % path.length];
  return storyStops.find((s) => s.nodeId === nodeId) ?? storyStops[0];
}

export { storyStops };
