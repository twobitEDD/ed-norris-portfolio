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
import { buildFlowGraph, type MapNodeData } from "@/lib/graph";
import { FilterPill } from "@/components/ui/FilterPill";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { mapGraphThesis } from "@/data/through-line";
import { MapDetailPanel } from "./MapDetailPanel";
import { MapNode } from "./MapNode";
import { useInViewport } from "@/lib/useInViewport";

const nodeTypes = { mapNode: MapNode };

export function LivingWorkMap() {
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const mapVisible = useInViewport(mapAreaRef, { threshold: 0.1, rootMargin: "80px 0px" });
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

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
    const found = graphNodes.find((n) => n.id === node.id) ?? null;
    setSelectedNode(found);
  }, []);

  const resetMap = () => {
    setSelectedNode(null);
    setActiveFilter("all");
  };

  return (
    <SectionShell id="map" grid>
      <SectionHeading
        eyebrow="Knowledge graph"
        title="The living work map."
        description={mapGraphThesis}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {themeFilterOptions.map((f) => (
          <FilterPill
            key={f.id}
            active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </FilterPill>
        ))}
      </div>

      <div
        ref={mapAreaRef}
        className="relative mt-6 h-[min(70vh,640px)] overflow-hidden rounded-3xl border border-border bg-background-raised"
      >
        <TechnicalGrid className="opacity-50" />
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
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={1.4}
            proOptions={{ hideAttribution: true }}
            className="bg-transparent"
          >
            <Background color="rgba(148,163,184,0.08)" gap={24} />
            <Controls className="!border-border !bg-panel !shadow-none [&>button]:!border-border [&>button]:!bg-panel-strong [&>button]:!text-text-primary" />
          </ReactFlow>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Loading map…</p>
          </div>
        )}
        <MapDetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <GlowButton onClick={resetMap} variant="ghost">
          Reset map
        </GlowButton>
      </div>
    </SectionShell>
  );
}
