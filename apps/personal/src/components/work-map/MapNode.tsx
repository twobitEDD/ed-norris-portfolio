"use client";

import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import type { MapNodeData } from "@/lib/graph";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";

type MapNodeType = Node<MapNodeData, "mapNode">;

function MapNodeComponent({ data, selected }: NodeProps<MapNodeType>) {
  const color = disciplineColors[data.disciplines[0]] ?? "#46c7d7";
  const isPerson = data.nodeType === "person";

  return (
    <motion.div
      animate={
        data.dimmed
          ? undefined
          : {
              x: [0, 1.5, -1, 0],
              y: [0, -1, 1.5, 0],
            }
      }
      transition={{
        duration: 8 + data.index * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "min-w-[120px] max-w-[180px] rounded-2xl border px-4 py-3 text-center transition-opacity duration-300 motion-reduce:animate-none",
        isPerson ? "min-w-[160px] px-6 py-5" : "",
        data.dimmed && "opacity-25",
        data.highlighted && "opacity-100",
      )}
      style={{
        borderColor: data.highlighted || selected ? color : "rgba(148,163,184,0.2)",
        background: isPerson ? "rgba(17,25,45,0.95)" : "rgba(15,22,39,0.88)",
        boxShadow: data.highlighted || selected ? `0 0 24px ${color}44` : undefined,
      }}
      tabIndex={0}
      role="button"
      aria-label={`${data.label}${data.subtitle ? `, ${data.subtitle}` : ""}`}
    >
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <p
        className={cn("font-display font-bold text-text-primary", isPerson ? "text-lg" : "text-sm")}
        style={{ color: isPerson ? color : undefined }}
      >
        {data.label}
      </p>
      {data.subtitle && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {data.subtitle}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </motion.div>
  );
}

export const MapNode = memo(MapNodeComponent);
