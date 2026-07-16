import type { Node, Edge } from "@xyflow/react";
import { graphEdges, graphNodes } from "@/data";
import {
  detailHubNodeIdSet,
  employmentOverviewEdges,
  employmentOverviewLabels,
  employmentOverviewNodeIdSet,
  getFocusClusterNodeIds,
} from "@/data/map-tiers";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { estimateNodeBounds } from "@/components/work-map/map-node-bounds";
import {
  getEdgeHandles,
  getNodePosition,
  isOverviewBranchEdge,
  type MapLayoutOptions,
} from "@/components/work-map/map-layout";

/** @deprecated Use employmentOverviewNodeIds from map-tiers */
export const previewGraphNodeIds = [
  "person-ed",
  "exp-node-ea",
  "exp-node-2bit",
  "exp-node-pps",
  "exp-node-adidas",
  "client-google",
  "exp-node-oibw",
  "exp-node-co2t",
  "project-ergo",
] as const;

/** @deprecated Use employmentOverviewNodeIdSet */
export const previewNodeIds = employmentOverviewNodeIdSet;

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
  tier?: "overview" | "detail";
  /** @deprecated Use tier === "overview" */
  preview?: boolean;
  focusSlug?: string | null;
};

export type MapEdgeData = {
  highlighted?: boolean;
  dimmed?: boolean;
  showLabel?: boolean;
  /** Overview branch edge (agency→client, 2bit→project) — rendered dashed */
  isBranch?: boolean;
  /** Overview spine edge — thicker, optionally animated */
  isSpine?: boolean;
};

function resolveTier(layoutOptions?: MapLayoutOptions): "overview" | "detail" {
  if (layoutOptions?.tier) return layoutOptions.tier;
  if (layoutOptions?.preview) return "overview";
  return "detail";
}

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

function getOverviewEdges() {
  return employmentOverviewEdges.map((e) => ({
    ...e,
    relationship: "led-to" as const,
  }));
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
  focusSlug?: string | null,
  hoveredId?: string | null,
) {
  const tier = resolveTier(layoutOptions);
  const isOverview = tier === "overview";
  const themeVisible = !isOverview && activeThemeId ? getConnectedNodes(activeThemeId, 2) : null;
  const focusVisible =
    !isOverview && focusSlug ? getFocusClusterNodeIds(focusSlug, 2) : null;

  let visibleNodes = isOverview
    ? graphNodes.filter((n) => employmentOverviewNodeIdSet.has(n.id))
    : graphNodes;

  if (themeVisible) {
    visibleNodes = visibleNodes.filter((n) => themeVisible.has(n.id));
  } else if (focusVisible) {
    visibleNodes = visibleNodes.filter((n) => focusVisible.has(n.id));
  } else if (!isOverview) {
    visibleNodes = visibleNodes.filter((n) => detailHubNodeIdSet.has(n.id));
  }

  const visibleIds = new Set(visibleNodes.map((n) => n.id));

  const highlightId = selectedId ?? hoveredId ?? undefined;

  const nodes: Node<MapNodeData>[] = visibleNodes.map((node, index) => {
    const disciplineDimmed =
      activeFilters.length > 0 &&
      !node.disciplines.some((d) => activeFilters.includes(d));
    const connected = highlightId ? isConnected(highlightId, node.id, visibleIds, isOverview) : false;

    const dimmed = isOverview
      ? highlightId
        ? !connected && highlightId !== node.id
        : false
      : highlightId
        ? !connected && highlightId !== node.id
        : disciplineDimmed;

    const bounds = estimateNodeBounds(node);

    const overviewLabel = isOverview ? employmentOverviewLabels[node.id] : undefined;

    return {
      id: node.id,
      type: "mapNode",
      position: getNodePosition(node.id, index, layoutOptions),
      width: bounds.width,
      height: bounds.height,
      data: {
        label: overviewLabel ?? node.label,
        subtitle: isOverview ? undefined : node.subtitle,
        nodeType: node.type,
        disciplines: node.disciplines,
        description: node.description,
        projectId: node.projectId,
        dimmed,
        highlighted: highlightId === node.id || connected,
        isThemeHub: node.type === "theme",
        index,
        tier,
        preview: isOverview,
        focusSlug,
      },
    };
  });

  const edgeSource = isOverview
    ? getOverviewEdges()
    : graphEdges.filter(
        (edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target),
      );

  const edges: Edge[] = edgeSource.map((edge) => {
      const sourceNode = graphNodes.find((n) => n.id === edge.source);
      const edgeDimmed =
        !isOverview &&
        activeFilters.length > 0 &&
        sourceNode &&
        !sourceNode.disciplines.some((d) => activeFilters.includes(d));
      const isBranch = isOverview && isOverviewBranchEdge(edge.id);
      const isSpine = isOverview && !isBranch;
      const highlighted = highlightId
        ? edge.source === highlightId || edge.target === highlightId
        : false;

      const color = sourceNode?.disciplines[0]
        ? disciplineColors[sourceNode.disciplines[0]]
        : "#46c7d7";

      const showLabel = !isOverview && highlighted && !!edge.connectionNote;
      const handles = getEdgeHandles(edge.source, edge.target, layoutOptions);

      const baseOpacity = isOverview ? (isBranch ? 0.55 : 0.85) : 0.28;
      const dimmedOpacity = isOverview ? 0.12 : 0.08;
      const opacity =
        highlightId && !highlighted
          ? dimmedOpacity
          : highlighted
            ? 0.95
            : edgeDimmed
              ? dimmedOpacity
              : baseOpacity;

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
          fontSize: 11,
          fontFamily: "var(--font-ibm-plex-mono), monospace",
        },
        data: {
          highlighted,
          dimmed: (edgeDimmed || (highlightId && !highlighted)) && !highlighted,
          showLabel,
          isBranch,
          isSpine,
        },
        markerEnd: {
          type: "arrowclosed" as const,
          width: isOverview ? 18 : 14,
          height: isOverview ? 18 : 14,
          color,
        },
        style: {
          stroke: color,
          strokeWidth: isSpine ? 2.75 : isBranch ? 1.75 : highlighted ? 2.5 : 1.5,
          opacity,
          strokeDasharray: isBranch ? "6 4" : undefined,
        },
        animated: isSpine || (highlighted && !isOverview),
        zIndex: highlighted ? 5 : isSpine ? 2 : 0,
      };
    });

  return { nodes, edges };
}

function isConnected(
  selectedId: string,
  nodeId: string,
  visibleIds?: Set<string>,
  isOverview?: boolean,
): boolean {
  if (selectedId === nodeId) return true;

  const edgeList = isOverview
    ? employmentOverviewEdges.map((e) => ({ source: e.source, target: e.target }))
    : graphEdges;

  return edgeList.some((e) => {
    if (visibleIds && (!visibleIds.has(e.source) || !visibleIds.has(e.target))) return false;
    return (
      (e.source === selectedId && e.target === nodeId) ||
      (e.target === selectedId && e.source === nodeId)
    );
  });
}
