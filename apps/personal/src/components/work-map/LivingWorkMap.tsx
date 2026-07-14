"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { graphNodes } from "@/data";
import type { Discipline, GraphNode } from "@/data/types";
import { disciplineLabels } from "@/data/types";
import { buildFlowGraph, getStoryPath, type MapNodeData } from "@/lib/graph";
import { FilterPill } from "@/components/ui/FilterPill";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { MapDetailPanel } from "./MapDetailPanel";
import { MapNode } from "./MapNode";

const nodeTypes = { mapNode: MapNode };

const filterOptions: { id: string; label: string; disciplines: Discipline[] }[] = [
  { id: "all", label: "All", disciplines: [] },
  { id: "environment", label: "Environmental", disciplines: ["environment"] },
  { id: "games", label: "Games", disciplines: ["games"] },
  { id: "software", label: "Software", disciplines: ["software"] },
  { id: "marketing", label: "Marketing", disciplines: ["marketing"] },
  { id: "operations", label: "Operations", disciplines: ["operations"] },
  { id: "data", label: "Data", disciplines: ["data"] },
];

export function LivingWorkMap() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [storyIndex, setStoryIndex] = useState(-1);

  const activeDisciplines = useMemo(() => {
    const f = filterOptions.find((o) => o.id === activeFilter);
    return f?.disciplines ?? [];
  }, [activeFilter]);

  const graph = useMemo(
    () => buildFlowGraph(activeDisciplines, selectedNode?.id),
    [activeDisciplines, selectedNode?.id],
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
    setStoryIndex(-1);
    setActiveFilter("all");
  };

  const tellStory = () => {
    const path = getStoryPath();
    const next = (storyIndex + 1) % path.length;
    setStoryIndex(next);
    const found = graphNodes.find((n) => n.id === path[next]) ?? null;
    setSelectedNode(found);
  };

  return (
    <SectionShell id="map" grid>
      <SectionHeading
        eyebrow="Knowledge graph"
        title="The living work map."
        description="Explore how disciplines, projects, and outcomes connect — filter by focus or follow a guided story path."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filterOptions.map((f) => (
          <FilterPill
            key={f.id}
            active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </FilterPill>
        ))}
      </div>

      <div className="relative mt-6 h-[min(70vh,640px)] overflow-hidden rounded-3xl border border-border bg-background-raised">
        <TechnicalGrid className="opacity-50" />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.4}
          maxZoom={1.4}
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
        >
          <Background color="rgba(148,163,184,0.08)" gap={24} />
          <Controls className="!border-border !bg-panel !shadow-none [&>button]:!border-border [&>button]:!bg-panel-strong [&>button]:!text-text-primary" />
        </ReactFlow>
        <MapDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <GlowButton onClick={resetMap} variant="ghost">
          Reset map
        </GlowButton>
        <GlowButton onClick={tellStory}>Tell me a story</GlowButton>
      </div>
    </SectionShell>
  );
}
