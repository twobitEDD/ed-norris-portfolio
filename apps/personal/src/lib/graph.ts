import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
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
  index: number;
};

export function buildFlowGraph(activeFilters: Discipline[] = [], selectedId?: string) {
  const nodes: Node<MapNodeData>[] = graphNodes.map((node, index) => {
    const dimmed =
      activeFilters.length > 0 &&
      !node.disciplines.some((d) => activeFilters.includes(d));
    const highlighted = selectedId
      ? isConnected(selectedId, node.id)
      : false;

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
        dimmed: selectedId ? !highlighted && selectedId !== node.id : dimmed,
        highlighted: selectedId === node.id || highlighted,
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
    const highlighted = selectedId
      ? edge.source === selectedId || edge.target === selectedId
      : false;

    const color = sourceNode?.disciplines[0]
      ? disciplineColors[sourceNode.disciplines[0]]
      : "#46c7d7";

    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      style: {
        stroke: color,
        strokeWidth: highlighted ? 2.5 : 1,
        opacity: edgeDimmed && !highlighted ? 0.15 : highlighted ? 0.9 : 0.45,
      },
      animated: highlighted,
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
  return [
    "person-ed",
    "practice-environment",
    "company-co2t",
    "project-carbon",
    "outcome-traceability",
    "practice-software",
    "project-ergo",
    "practice-games",
  ];
}
