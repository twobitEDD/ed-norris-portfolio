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
        "flex flex-col items-center justify-center rounded-2xl border text-center shadow-md transition-opacity duration-300 motion-reduce:animate-none",
        isOverview && "h-[84px] w-[168px] max-w-[220px] px-4 py-3 sm:h-[88px] sm:w-[188px]",
        isOverview && isPerson && "h-[88px] w-[172px] sm:h-[92px] sm:w-[192px]",
        !isOverview && isPerson && "h-[92px] w-[180px] sm:h-[96px] sm:w-[200px] px-4 py-3.5",
        !isOverview && isTheme && "h-[84px] w-[168px] sm:h-[88px] sm:w-[188px] px-3.5 py-3",
        !isOverview && !isPerson && !isTheme && "h-[78px] w-[152px] sm:h-[82px] sm:w-[168px] px-3 py-2.5",
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
          "w-full line-clamp-2 font-display font-bold leading-snug",
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
      {data.subtitle && (
        <p
          className={cn(
            "mt-0.5 w-full min-h-[1.1rem] line-clamp-1 font-mono uppercase leading-snug tracking-wider sm:mt-1 sm:min-h-[1.25rem]",
            isOverview ? "text-[10px] sm:text-[11px]" : "text-[10px] sm:text-[11px]",
          )}
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
