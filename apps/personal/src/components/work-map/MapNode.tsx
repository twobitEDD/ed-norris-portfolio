"use client";

import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import type { MapNodeData } from "@/lib/graph";
import { getMapNodeSurface } from "@/lib/map-colors";
import { cn } from "@/lib/cn";

type MapNodeType = Node<MapNodeData, "mapNode">;

const handleClass = "!h-2 !w-2 !border-0 !bg-transparent !opacity-0";

function MapNodeComponent({ data, selected }: NodeProps<MapNodeType>) {
  const discipline = data.disciplines[0] ?? "software";
  const isPerson = data.nodeType === "person";
  const isTheme = data.isThemeHub;
  const isExperience = data.nodeType === "experience";
  const isOverview = data.tier === "overview" || data.preview;
  const surface = getMapNodeSurface(discipline, data.nodeType, {
    highlighted: data.highlighted,
    selected,
  });

  return (
    <motion.div
      animate={
        data.dimmed || isOverview
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
        "rounded-2xl border text-center shadow-md transition-opacity duration-300 motion-reduce:animate-none",
        isOverview && isExperience && "min-h-[72px] min-w-[120px] max-w-[200px] px-4 py-3 sm:min-h-[76px] sm:min-w-[140px] sm:px-4 sm:py-3.5",
        isOverview && isPerson && "min-w-[130px] max-w-[180px] px-4 py-3 sm:min-w-[150px] sm:px-5 sm:py-4",
        isOverview && !isPerson && !isExperience && "min-w-[110px] max-w-[180px] px-3.5 py-2.5 sm:min-w-[130px] sm:px-4 sm:py-3",
        !isOverview && isPerson && "min-w-[140px] max-w-[200px] px-4 py-3.5 sm:min-w-[160px] sm:px-5 sm:py-4",
        !isOverview && isTheme && "min-w-[120px] max-w-[190px] px-3.5 py-3 sm:min-w-[140px] sm:px-4 sm:py-3.5",
        !isOverview && !isPerson && !isTheme && !isExperience && "min-w-[100px] max-w-[160px] px-3 py-2.5 sm:min-w-[120px] sm:px-4 sm:py-3",
        !isOverview && isExperience && "min-w-[110px] max-w-[170px] px-3 py-2 sm:min-w-[130px] sm:px-3.5 sm:py-2.5",
        data.dimmed && "pointer-events-none opacity-[0.12]",
        data.highlighted && "opacity-100",
      )}
      style={{
        borderColor: surface.borderColor,
        borderWidth: isTheme || isPerson ? 2 : 1,
        background: surface.background,
        boxShadow:
          data.highlighted || selected
            ? `0 0 28px ${surface.borderColor}55, 0 8px 24px rgba(0,0,0,0.35)`
            : "0 4px 16px rgba(0,0,0,0.28)",
      }}
      tabIndex={0}
      role="button"
      aria-label={`${data.label}${data.subtitle ? `, ${data.subtitle}` : ""}`}
    >
      <Handle id="target-top" type="target" position={Position.Top} className={handleClass} />
      <Handle id="target-right" type="target" position={Position.Right} className={handleClass} />
      <Handle id="target-bottom" type="target" position={Position.Bottom} className={handleClass} />
      <Handle id="target-left" type="target" position={Position.Left} className={handleClass} />
      <p
        className={cn(
          "line-clamp-2 font-display font-bold leading-snug",
          isOverview && "text-sm sm:text-[15px]",
          isOverview && isPerson && "text-[15px] sm:text-base",
          !isOverview && isPerson && "text-sm sm:text-base",
          !isOverview && isTheme && "text-xs sm:text-sm",
          !isOverview && !isPerson && !isTheme && "text-xs sm:text-sm",
        )}
        style={{ color: surface.labelColor }}
      >
        {data.label}
      </p>
      {data.subtitle && !isOverview && (
        <p
          className="mt-0.5 min-h-[1.1rem] line-clamp-1 font-mono text-[10px] uppercase leading-snug tracking-wider sm:mt-1 sm:min-h-[1.25rem] sm:text-[11px]"
          style={{ color: surface.subtitleColor }}
        >
          {data.subtitle}
        </p>
      )}
      {data.subtitle && isOverview && isExperience && (
        <p
          className="mt-1 min-h-[1.1rem] line-clamp-1 font-mono text-[10px] uppercase leading-snug tracking-wider sm:min-h-[1.25rem] sm:text-[11px]"
          style={{ color: surface.subtitleColor }}
        >
          {data.subtitle}
        </p>
      )}
      {data.subtitle && isOverview && !isExperience && !isPerson && (
        <p
          className="mt-0.5 min-h-[1.1rem] line-clamp-1 font-mono text-[9px] uppercase leading-snug tracking-wider sm:min-h-[1.2rem] sm:text-[10px]"
          style={{ color: surface.subtitleColor }}
        >
          {data.subtitle}
        </p>
      )}
      <Handle id="source-top" type="source" position={Position.Top} className={handleClass} />
      <Handle id="source-right" type="source" position={Position.Right} className={handleClass} />
      <Handle id="source-bottom" type="source" position={Position.Bottom} className={handleClass} />
      <Handle id="source-left" type="source" position={Position.Left} className={handleClass} />
    </motion.div>
  );
}

export const MapNode = memo(MapNodeComponent);
