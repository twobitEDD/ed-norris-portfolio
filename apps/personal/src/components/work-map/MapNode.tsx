"use client";

import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import type { MapNodeData } from "@/lib/graph";
import { getMapNodeSurface } from "@/lib/map-colors";
import { cn } from "@/lib/cn";

type MapNodeType = Node<MapNodeData, "mapNode">;

function MapNodeComponent({ data, selected }: NodeProps<MapNodeType>) {
  const discipline = data.disciplines[0] ?? "software";
  const isPerson = data.nodeType === "person";
  const isTheme = data.isThemeHub;
  const isExperience = data.nodeType === "experience";
  const surface = getMapNodeSurface(discipline, data.nodeType, {
    highlighted: data.highlighted,
    selected,
  });

  return (
    <motion.div
      animate={
        data.dimmed || data.preview
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
        isPerson && "min-w-[140px] max-w-[200px] px-4 py-3.5 sm:min-w-[160px] sm:px-5 sm:py-4",
        isTheme && "min-w-[120px] max-w-[190px] px-3.5 py-3 sm:min-w-[140px] sm:px-4 sm:py-3.5",
        !isPerson && !isTheme && !isExperience && "min-w-[100px] max-w-[160px] px-3 py-2.5 sm:min-w-[120px] sm:px-4 sm:py-3",
        isExperience && "min-w-[110px] max-w-[170px] px-3 py-2 sm:min-w-[130px] sm:px-3.5 sm:py-2.5",
        data.preview && isTheme && "min-w-[130px] sm:min-w-[150px]",
        data.dimmed && "pointer-events-none opacity-20",
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
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <p
        className={cn(
          "font-display font-bold leading-tight",
          data.preview && "text-[13px] sm:text-sm",
          !data.preview && isPerson && "text-base sm:text-lg",
          !data.preview && isTheme && "text-xs sm:text-sm",
          !data.preview && !isPerson && !isTheme && "text-[11px] sm:text-sm",
          data.preview && isPerson && "text-sm sm:text-base",
          data.preview && isTheme && "text-[13px] sm:text-sm",
        )}
        style={{ color: surface.labelColor }}
      >
        {data.label}
      </p>
      {data.subtitle && (
        <p
          className={cn(
            "mt-0.5 font-mono uppercase tracking-wider sm:mt-1",
            data.preview ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]",
          )}
          style={{ color: surface.subtitleColor }}
        >
          {data.subtitle}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </motion.div>
  );
}

export const MapNode = memo(MapNodeComponent);
