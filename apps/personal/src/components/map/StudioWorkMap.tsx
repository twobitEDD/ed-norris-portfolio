"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  employmentFocusSlugs,
  employmentOverviewLabels,
  focusSlugToNodeId,
  graphNodes,
  nodeIdToFocusSlug,
  themeFilterOptions,
} from "@/data";
import { mapGraphThesis } from "@/data/through-line";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import { buildFlowGraph, type MapNodeData } from "@/lib/graph";
import { useInViewport } from "@/lib/useInViewport";
import { cn } from "@/lib/cn";
import { MapNode } from "@/components/work-map/MapNode";
import { MapEdge } from "@/components/work-map/MapEdge";
import { MapDetailPanel } from "@/components/work-map/MapDetailPanel";
import { FilterPill } from "@/components/ui/FilterPill";

const nodeTypes = { mapNode: MapNode };
const edgeTypes = { mapEdge: MapEdge };

const legendDisciplines: Discipline[] = [
  "operations",
  "games",
  "software",
  "marketing",
  "environment",
];

export type MapMode = "overview" | "detail";

type StudioWorkMapProps = {
  eagerLoad?: boolean;
  fullPage?: boolean;
  /** Tier 1 employment overview for homepage bento */
  mode?: MapMode;
  /** @deprecated Use mode="overview" */
  preview?: boolean;
  /** Detail-tier cluster focus from URL (?focus=co2t) */
  initialFocus?: string | null;
};

function StudioWorkMapInner({
  eagerLoad = false,
  fullPage = false,
  mode,
  preview = false,
  initialFocus = null,
}: StudioWorkMapProps) {
  const router = useRouter();
  const tier: MapMode = mode ?? (preview ? "overview" : "detail");
  const isOverview = tier === "overview";

  const { fitView } = useReactFlow();
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(mapAreaRef, { threshold: 0.1, rootMargin: "120px 0px" });
  const mapVisible = eagerLoad || inViewport;
  const [activeFilter, setActiveFilter] = useState("all");
  const [focusSlug, setFocusSlug] = useState<string | null>(initialFocus);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    setFocusSlug(initialFocus);
  }, [initialFocus]);

  const activeThemeId = useMemo(() => {
    if (isOverview || focusSlug) return null;
    const f = themeFilterOptions.find((o) => o.id === activeFilter);
    return f?.themeId ?? null;
  }, [activeFilter, isOverview, focusSlug]);

  const layoutOptions = useMemo(
    () => ({
      tier,
      preview: isOverview,
      scale: fullPage && !isOverview ? 1 : 1,
    }),
    [tier, isOverview, fullPage],
  );

  const graph = useMemo(
    () =>
      buildFlowGraph(
        [],
        selectedNode?.id,
        activeThemeId,
        layoutOptions,
        focusSlug,
        hoveredNodeId,
      ),
    [activeThemeId, selectedNode?.id, layoutOptions, focusSlug, hoveredNodeId],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [graph, setNodes, setEdges]);

  const focusNode = useCallback(
    (nodeId: string) => {
      window.requestAnimationFrame(() => {
        fitView({
          nodes: [{ id: nodeId }],
          padding: isOverview ? 0.38 : 0.45,
          duration: 450,
          maxZoom: isOverview ? 1 : 0.95,
        });
      });
    },
    [fitView, isOverview],
  );

  const drillToDetail = useCallback(
    (slug: string) => {
      router.push(`/map?focus=${slug}`);
    },
    [router],
  );

  const onNodeMouseEnter: NodeMouseHandler<Node<MapNodeData>> = useCallback((_, node) => {
    setHoveredNodeId(node.id);
  }, []);

  const onNodeMouseLeave: NodeMouseHandler<Node<MapNodeData>> = useCallback(() => {
    setHoveredNodeId(null);
  }, []);

  const onNodeClick: NodeMouseHandler<Node<MapNodeData>> = useCallback(
    (_, node) => {
      const graphNode = graphNodes.find((n) => n.id === node.id) ?? null;
      setSelectedNode(graphNode);
      focusNode(node.id);

      if (isOverview && graphNode) {
        const slug = nodeIdToFocusSlug[node.id];
        if (slug) drillToDetail(slug);
      }
    },
    [focusNode, isOverview, drillToDetail],
  );

  const clearFocus = useCallback(() => {
    setFocusSlug(null);
    setSelectedNode(null);
    if (fullPage) {
      router.push("/map");
    }
    fitView({ padding: isOverview ? 0.36 : 0.28, duration: 400 });
  }, [fitView, fullPage, isOverview, router]);

  const rootMinH = fullPage
    ? "min-h-[min(80vh,720px)]"
    : isOverview
      ? "min-h-[460px] sm:min-h-[500px]"
      : "min-h-[300px] sm:min-h-[320px]";
  const canvasMinH = fullPage
    ? "min-h-[min(60vh,560px)]"
    : isOverview
      ? "min-h-[360px] sm:min-h-[400px]"
      : "min-h-[220px] sm:min-h-[260px]";

  const focusLabel = focusSlug
    ? employmentOverviewLabels[focusSlugToNodeId(focusSlug)!]
    : null;

  return (
    <div className={cn("relative flex h-full flex-col", rootMinH)}>
      {!isOverview && (
        <div className="space-y-2 border-b border-white/10 p-2 sm:p-3">
          <div className="flex flex-wrap items-center gap-2">
            {fullPage && (
              <Link
                href="/#map"
                className="rounded px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-screen-muted transition hover:text-screen-text sm:text-[11px]"
              >
                ← Employment overview
              </Link>
            )}
            <p className="max-w-3xl text-[11px] leading-relaxed text-screen-muted sm:text-xs">
              {focusSlug
                ? `Detailed connections around ${focusLabel ?? focusSlug} — projects, agencies, clients, and disciplines.`
                : mapGraphThesis}
            </p>
          </div>
          {fullPage && (
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <FilterPill
                active={!focusSlug}
                onClick={clearFocus}
                className="!min-h-[28px] !px-1.5 !py-0.5 !text-[10px] sm:!min-h-[32px] sm:!px-2 sm:!py-1 sm:!text-[11px]"
              >
                All work
              </FilterPill>
              {Object.entries(employmentFocusSlugs).map(([slug, nodeId]) => (
                <FilterPill
                  key={slug}
                  active={focusSlug === slug}
                  onClick={() => {
                    setFocusSlug(slug);
                    setSelectedNode(null);
                    router.push(`/map?focus=${slug}`);
                  }}
                  className="!min-h-[28px] !px-1.5 !py-0.5 !text-[10px] sm:!min-h-[32px] sm:!px-2 sm:!py-1 sm:!text-[11px]"
                >
                  {employmentOverviewLabels[nodeId]}
                </FilterPill>
              ))}
            </div>
          )}
          {!fullPage && (
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              {themeFilterOptions.map((f) => (
                <FilterPill
                  key={f.id}
                  active={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="!min-h-[28px] !px-1.5 !py-0.5 !text-[10px] sm:!min-h-[32px] sm:!px-2 sm:!py-1 sm:!text-[11px]"
                >
                  {f.label}
                </FilterPill>
              ))}
            </div>
          )}
        </div>
      )}
      {isOverview && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-screen-muted sm:text-xs">
            Employment overview · major roles
          </p>
          <Link
            href="/map"
            className="font-mono text-[11px] uppercase tracking-wider text-technology hover:text-screen-text sm:text-xs"
          >
            Unfold detailed work map →
          </Link>
        </div>
      )}
      <div ref={mapAreaRef} className={cn("relative flex-1", canvasMinH)}>
        {mapVisible ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={!isOverview}
            nodesConnectable={false}
            elementsSelectable
            snapToGrid={!isOverview}
            snapGrid={[20, 20]}
            onlyRenderVisibleElements
            fitView
            fitViewOptions={{ padding: isOverview ? 0.28 : fullPage ? 0.32 : 0.26 }}
            minZoom={isOverview ? 0.25 : 0.15}
            maxZoom={isOverview ? 1 : 1.15}
            proOptions={{ hideAttribution: true }}
            className="work-map-flow bg-transparent"
          >
            <Background color="rgba(143,163,155,0.06)" gap={24} />
            <Controls className="!scale-[0.65] !border-white/10 !bg-screen-panel sm:!scale-75 [&>button]:!bg-screen-panel [&>button]:!text-screen-text" />
            {fullPage && !isOverview && (
              <MiniMap
                className="!rounded-lg !border !border-white/10 !bg-screen-panel/90"
                maskColor="rgba(8, 14, 24, 0.75)"
                nodeColor={(node) => {
                  const d = (node.data as MapNodeData)?.disciplines?.[0];
                  return d ? disciplineColors[d] : "#46c7d7";
                }}
                pannable
                zoomable
              />
            )}
          </ReactFlow>
        ) : (
          <div className={cn("flex h-full items-center justify-center", canvasMinH)}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">
              Map loads on scroll
            </p>
          </div>
        )}
        {fullPage && !isOverview && activeFilter !== "all" && !focusSlug && (
          <p className="pointer-events-none absolute left-3 top-2 z-10 max-w-[240px] font-mono text-[9px] uppercase leading-relaxed tracking-wider text-screen-muted sm:text-[10px]">
            Showing {themeFilterOptions.find((f) => f.id === activeFilter)?.label} and connected roles
          </p>
        )}
        {fullPage && !isOverview && (
          <div className="pointer-events-none absolute right-3 top-2 z-10 hidden rounded-lg border border-screen-border bg-screen-panel/90 px-2.5 py-2 sm:block">
            <p className="font-mono text-[9px] uppercase tracking-wider text-screen-muted">Disciplines</p>
            <ul className="mt-1.5 space-y-1">
              {legendDisciplines.map((d) => (
                <li key={d} className="flex items-center gap-2 font-mono text-[9px] uppercase text-screen-text">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: disciplineColors[d] }}
                  />
                  {disciplineLabels[d]}
                </li>
              ))}
            </ul>
          </div>
        )}
        <MapDetailPanel
          node={selectedNode}
          compact={isOverview}
          onClose={() => setSelectedNode(null)}
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
            setActiveFilter("all");
            if (focusSlug) clearFocus();
            else fitView({ padding: isOverview ? 0.32 : 0.28, duration: 400 });
          }}
          className="rounded px-2 py-1 font-mono text-[10px] uppercase text-screen-muted hover:text-screen-text sm:text-[11px]"
        >
          Reset view
        </button>
        {isOverview ? (
          <p className="font-mono text-[10px] uppercase text-screen-muted sm:text-[11px]">
            Tap a role to unfold details
          </p>
        ) : (
          <p className="font-mono text-[10px] uppercase text-screen-muted sm:text-[11px]">
            Tap nodes to explore connections
          </p>
        )}
      </div>
    </div>
  );
}

export function StudioWorkMap(props: StudioWorkMapProps) {
  return (
    <ReactFlowProvider>
      <StudioWorkMapInner {...props} />
    </ReactFlowProvider>
  );
}
