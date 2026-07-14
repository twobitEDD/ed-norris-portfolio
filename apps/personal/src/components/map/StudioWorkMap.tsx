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
import { buildFlowGraph, getStoryPath, type MapNodeData } from "@/lib/graph";
import { MapNode } from "@/components/work-map/MapNode";
import { MapDetailPanel } from "@/components/work-map/MapDetailPanel";
import { FilterPill } from "@/components/ui/FilterPill";

const nodeTypes = { mapNode: MapNode };

const filterOptions: { id: string; label: string; disciplines: Discipline[] }[] = [
  { id: "all", label: "All", disciplines: [] },
  { id: "environment", label: "Environmental", disciplines: ["environment"] },
  { id: "games", label: "Games", disciplines: ["games"] },
  { id: "software", label: "Software", disciplines: ["software"] },
];

export function StudioWorkMap() {
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
    setSelectedNode(graphNodes.find((n) => n.id === node.id) ?? null);
  }, []);

  const tellStory = () => {
    const path = getStoryPath();
    const next = (storyIndex + 1) % path.length;
    setStoryIndex(next);
    setSelectedNode(graphNodes.find((n) => n.id === path[next]) ?? null);
  };

  return (
    <div className="relative flex h-full min-h-[320px] flex-col">
      <div className="flex flex-wrap gap-1.5 p-3">
        {filterOptions.map((f) => (
          <FilterPill
            key={f.id}
            active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
            className="!min-h-[32px] !px-2 !py-1 !text-[10px]"
          >
            {f.label}
          </FilterPill>
        ))}
      </div>
      <div className="relative min-h-[260px] flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.35}
          maxZoom={1.2}
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
        >
          <Background color="rgba(143,163,155,0.06)" gap={20} />
          <Controls className="!scale-75 !border-white/10 !bg-screen-panel [&>button]:!bg-screen-panel [&>button]:!text-screen-text" />
        </ReactFlow>
        <MapDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
      <div className="flex gap-2 border-t border-white/10 p-2">
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
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
          Tell me a story
        </button>
      </div>
    </div>
  );
}
