"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { graphNodes, themeFilterOptions } from "@/data";
import { mapGraphThesis } from "@/data/through-line";
import type { GraphNode } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import type { Discipline } from "@/data/types";
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

type StudioWorkMapProps = {
  eagerLoad?: boolean;
  fullPage?: boolean;
  /** Relationship-graph subset for homepage bento preview */
  preview?: boolean;
};

function StudioWorkMapInner({
  eagerLoad = false,
  fullPage = false,
  preview = false,
}: StudioWorkMapProps) {
  const { fitView } = useReactFlow();
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(mapAreaRef, { threshold: 0.1, rootMargin: "120px 0px" });
  const mapVisible = eagerLoad || inViewport;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const activeThemeId = useMemo(() => {
    if (preview) return null;
    const f = themeFilterOptions.find((o) => o.id === activeFilter);
    return f?.themeId ?? null;
  }, [activeFilter, preview]);

  const layoutOptions = useMemo(
    () => ({
      preview,
      scale: fullPage && !preview ? 1 : 1,
    }),
    [preview, fullPage],
  );

  const graph = useMemo(
    () => buildFlowGraph([], selectedNode?.id, activeThemeId, layoutOptions),
    [activeThemeId, selectedNode?.id, layoutOptions],
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
          padding: preview ? 0.35 : 0.45,
          duration: 450,
          maxZoom: preview ? 1 : 0.95,
        });
      });
    },
    [fitView, preview],
  );

  const onNodeClick: NodeMouseHandler<Node<MapNodeData>> = useCallback((_, node) => {
    setSelectedNode(graphNodes.find((n) => n.id === node.id) ?? null);
    focusNode(node.id);
  }, [focusNode]);

  const rootMinH = fullPage
    ? "min-h-[min(80vh,720px)]"
    : preview
      ? "min-h-[420px] sm:min-h-[460px]"
      : "min-h-[300px] sm:min-h-[320px]";
  const canvasMinH = fullPage
    ? "min-h-[min(60vh,560px)]"
    : preview
      ? "min-h-[320px] sm:min-h-[360px]"
      : "min-h-[220px] sm:min-h-[260px]";

  return (
    <div className={cn("relative flex h-full flex-col", rootMinH)}>
      {!preview && (
        <div className="space-y-2 border-b border-white/10 p-2 sm:p-3">
          <p className="max-w-3xl text-[11px] leading-relaxed text-screen-muted sm:text-xs">
            {mapGraphThesis}
          </p>
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
        </div>
      )}
      {preview && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted sm:text-[11px]">
            Relationship graph · roles & clients
          </p>
          <Link
            href="/map"
            className="font-mono text-[10px] uppercase tracking-wider text-technology hover:text-screen-text sm:text-[11px]"
          >
            Full map →
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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onlyRenderVisibleElements
            fitView
            fitViewOptions={{ padding: preview ? 0.34 : fullPage ? 0.28 : 0.24 }}
            minZoom={preview ? 0.35 : 0.18}
            maxZoom={preview ? 1 : 1.1}
            proOptions={{ hideAttribution: true }}
            className="work-map-flow bg-transparent"
          >
            <Background color="rgba(143,163,155,0.06)" gap={24} />
            <Controls className="!scale-[0.65] !border-white/10 !bg-screen-panel sm:!scale-75 [&>button]:!bg-screen-panel [&>button]:!text-screen-text" />
          </ReactFlow>
        ) : (
          <div className={cn("flex h-full items-center justify-center", canvasMinH)}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">
              Map loads on scroll
            </p>
          </div>
        )}
        {fullPage && !preview && activeFilter !== "all" && (
          <p className="pointer-events-none absolute left-3 top-2 z-10 max-w-[240px] font-mono text-[9px] uppercase leading-relaxed tracking-wider text-screen-muted sm:text-[10px]">
            Showing {themeFilterOptions.find((f) => f.id === activeFilter)?.label} and connected roles
          </p>
        )}
        {fullPage && !preview && (
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
          compact={preview}
          onClose={() => setSelectedNode(null)}
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
            setActiveFilter("all");
            fitView({ padding: preview ? 0.34 : 0.28, duration: 400 });
          }}
          className="rounded px-2 py-1 font-mono text-[10px] uppercase text-screen-muted hover:text-screen-text"
        >
          Reset view
        </button>
        {!preview && (
          <p className="font-mono text-[10px] uppercase text-screen-muted">
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
