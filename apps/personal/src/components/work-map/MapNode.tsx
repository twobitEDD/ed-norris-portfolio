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
  const isTheme = data.isThemeHub;
  const isExperience = data.nodeType === "experience";

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
        "rounded-2xl border text-center transition-opacity duration-300 motion-reduce:animate-none",
        isPerson && "min-w-[150px] max-w-[200px] px-5 py-4 sm:min-w-[160px] sm:px-6 sm:py-5",
        isTheme && "min-w-[130px] max-w-[190px] px-4 py-3.5 sm:min-w-[150px] sm:px-5 sm:py-4",
        !isPerson && !isTheme && !isExperience && "min-w-[100px] max-w-[160px] px-3 py-2.5 sm:min-w-[120px] sm:px-4 sm:py-3",
        isExperience && "min-w-[110px] max-w-[170px] px-3 py-2 sm:min-w-[130px] sm:px-3.5 sm:py-2.5",
        data.dimmed && "opacity-25",
        data.highlighted && "opacity-100",
      )}
      style={{
        borderColor: data.highlighted || selected ? color : "rgba(148,163,184,0.2)",
        borderWidth: isTheme ? 2 : 1,
        background: isPerson
          ? "rgba(17,25,45,0.95)"
          : isTheme
            ? `linear-gradient(160deg, ${color}18, rgba(15,22,39,0.92))`
            : "rgba(15,22,39,0.88)",
        boxShadow: data.highlighted || selected ? `0 0 24px ${color}44` : isTheme ? `0 0 12px ${color}22` : undefined,
      }}
      tabIndex={0}
      role="button"
      aria-label={`${data.label}${data.subtitle ? `, ${data.subtitle}` : ""}`}
    >
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <p
        className={cn(
          "font-display font-bold text-text-primary leading-tight",
          isPerson && "text-base sm:text-lg",
          isTheme && "text-xs sm:text-sm",
          !isPerson && !isTheme && "text-[11px] sm:text-sm",
        )}
        style={{ color: isPerson || isTheme ? color : undefined }}
      >
        {data.label}
      </p>
      {data.subtitle && (
        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-text-muted sm:mt-1 sm:text-[10px]">
          {data.subtitle}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </motion.div>
  );
}

export const MapNode = memo(MapNodeComponent);
