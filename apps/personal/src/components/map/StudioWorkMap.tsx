"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { graphNodes, themeFilterOptions } from "@/data";
import type { GraphNode } from "@/data/types";
import { buildFlowGraph, getStoryPath, getStoryStop, type MapNodeData } from "@/lib/graph";
import { useInViewport } from "@/lib/useInViewport";
import { cn } from "@/lib/cn";
import { MapNode } from "@/components/work-map/MapNode";
import { MapDetailPanel } from "@/components/work-map/MapDetailPanel";
import { FilterPill } from "@/components/ui/FilterPill";

const nodeTypes = { mapNode: MapNode };

type StudioWorkMapProps = {
  /** Skip viewport gate — use on dedicated /map page */
  eagerLoad?: boolean;
  /** Taller map canvas for full-page layout */
  fullPage?: boolean;
  /** Story-path subset for homepage bento — fewer nodes, through-line edges only */
  preview?: boolean;
};

export function StudioWorkMap({
  eagerLoad = false,
  fullPage = false,
  preview = false,
}: StudioWorkMapProps) {
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(mapAreaRef, { threshold: 0.1, rootMargin: "120px 0px" });
  const mapVisible = eagerLoad || inViewport;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [storyIndex, setStoryIndex] = useState(preview ? 0 : -1);

  const activeThemeId = useMemo(() => {
    if (preview) return null;
    const f = themeFilterOptions.find((o) => o.id === activeFilter);
    return f?.themeId ?? null;
  }, [activeFilter, preview]);

  const layoutOptions = useMemo(
    () => ({
      preview,
      scale: fullPage && !preview ? 1.28 : 1,
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

  useEffect(() => {
    if (!preview || storyIndex < 0) return;
    const path = getStoryPath();
    setSelectedNode(graphNodes.find((n) => n.id === path[storyIndex]) ?? null);
  }, [preview, storyIndex]);

  const onNodeClick: NodeMouseHandler<Node<MapNodeData>> = useCallback((_, node) => {
    setStoryIndex(-1);
    setSelectedNode(graphNodes.find((n) => n.id === node.id) ?? null);
  }, []);

  const tellStory = () => {
    const path = getStoryPath();
    const next = (storyIndex + 1) % path.length;
    setStoryIndex(next);
    setSelectedNode(graphNodes.find((n) => n.id === path[next]) ?? null);
  };

  const storyStop = storyIndex >= 0 ? getStoryStop(storyIndex) : null;

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

  const filterOptions = preview
    ? themeFilterOptions.filter((f) => f.id === "all")
    : themeFilterOptions;

  return (
    <div className={cn("relative flex h-full flex-col", rootMinH)}>
      <div className="flex flex-wrap items-center gap-1 p-2 sm:gap-1.5 sm:p-3">
        {filterOptions.map((f) => (
          <FilterPill
            key={f.id}
            active={activeFilter === f.id}
            onClick={() => !preview && setActiveFilter(f.id)}
            className="!min-h-[28px] !px-1.5 !py-0.5 !text-[10px] sm:!min-h-[32px] sm:!px-2 sm:!py-1 sm:!text-[11px]"
          >
            {preview ? "Story path" : f.label}
          </FilterPill>
        ))}
        {preview && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-screen-muted">
            Key stops · open /map for full graph
          </span>
        )}
      </div>
      <div ref={mapAreaRef} className={cn("relative flex-1", canvasMinH)}>
        {mapVisible ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onlyRenderVisibleElements
            fitView
            fitViewOptions={{ padding: preview ? 0.28 : fullPage ? 0.22 : 0.2 }}
            minZoom={preview ? 0.35 : 0.25}
            maxZoom={preview ? 1 : 1.2}
            proOptions={{ hideAttribution: true }}
            className="bg-transparent"
          >
            <Background color="rgba(143,163,155,0.06)" gap={20} />
            <Controls className="!scale-[0.65] !border-white/10 !bg-screen-panel sm:!scale-75 [&>button]:!bg-screen-panel [&>button]:!text-screen-text" />
          </ReactFlow>
        ) : (
          <div className={cn("flex h-full items-center justify-center", canvasMinH)}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">
              Map loads on scroll
            </p>
          </div>
        )}
        <MapDetailPanel
          node={selectedNode}
          storyStop={storyStop}
          compact={preview}
          onClose={() => {
            setSelectedNode(null);
            setStoryIndex(preview ? 0 : -1);
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
            setStoryIndex(preview ? 0 : -1);
            setActiveFilter("all");
          }}
          className="rounded px-2 py-1 font-mono text-[10px] uppercase text-screen-muted hover:text-screen-text"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={tellStory}
          className="rounded px-2 py-1 font-mono text-[10px] uppercase text-technology hover:text-screen-text"
        >
          {storyIndex < 0 ? "Tell me a story" : `Story ${storyIndex + 1}/${getStoryPath().length} →`}
        </button>
      </div>
    </div>
  );
}
