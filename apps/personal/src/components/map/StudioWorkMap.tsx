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
};

export function StudioWorkMap({ eagerLoad = false, fullPage = false }: StudioWorkMapProps) {
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(mapAreaRef, { threshold: 0.1, rootMargin: "120px 0px" });
  const mapVisible = eagerLoad || inViewport;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [storyIndex, setStoryIndex] = useState(-1);

  const activeThemeId = useMemo(() => {
    const f = themeFilterOptions.find((o) => o.id === activeFilter);
    return f?.themeId ?? null;
  }, [activeFilter]);

  const graph = useMemo(
    () => buildFlowGraph([], selectedNode?.id, activeThemeId),
    [activeThemeId, selectedNode?.id],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [graph, setNodes, setEdges]);

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

  const rootMinH = fullPage ? "min-h-[min(80vh,720px)]" : "min-h-[300px] sm:min-h-[320px]";
  const canvasMinH = fullPage ? "min-h-[min(60vh,560px)]" : "min-h-[220px] sm:min-h-[260px]";

  return (
    <div className={cn("relative flex h-full flex-col", rootMinH)}>
      <div className="flex flex-wrap gap-1 p-2 sm:gap-1.5 sm:p-3">
        {themeFilterOptions.map((f) => (
          <FilterPill
            key={f.id}
            active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
            className="!min-h-[28px] !px-1.5 !py-0.5 !text-[9px] sm:!min-h-[32px] sm:!px-2 sm:!py-1 sm:!text-[10px]"
          >
            {f.label}
          </FilterPill>
        ))}
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
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.25}
            maxZoom={1.2}
            proOptions={{ hideAttribution: true }}
            className="bg-transparent"
          >
            <Background color="rgba(143,163,155,0.06)" gap={20} />
            <Controls className="!scale-[0.65] !border-white/10 !bg-screen-panel sm:!scale-75 [&>button]:!bg-screen-panel [&>button]:!text-screen-text" />
          </ReactFlow>
        ) : (
          <div className={cn("flex h-full items-center justify-center", canvasMinH)}>
            <p className="font-mono text-[9px] uppercase tracking-wider text-screen-muted">Map loads on scroll</p>
          </div>
        )}
        <MapDetailPanel
          node={selectedNode}
          storyStop={storyStop}
          onClose={() => {
            setSelectedNode(null);
            setStoryIndex(-1);
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
            setStoryIndex(-1);
            setActiveFilter("all");
          }}
          className="rounded px-2 py-1 font-mono text-[9px] uppercase text-screen-muted hover:text-screen-text"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={tellStory}
          className="rounded px-2 py-1 font-mono text-[9px] uppercase text-technology hover:text-screen-text"
        >
          {storyIndex < 0 ? "Tell me a story" : `Story ${storyIndex + 1}/${getStoryPath().length} →`}
        </button>
      </div>
    </div>
  );
}
