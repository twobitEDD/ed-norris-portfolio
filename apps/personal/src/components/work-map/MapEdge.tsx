"use client";

import { memo } from "react";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import type { MapEdgeData } from "@/lib/graph";

function MapEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  labelStyle,
  labelBgStyle,
  labelBgPadding,
  labelBgBorderRadius,
  style,
  markerEnd,
  data,
}: EdgeProps) {
  const edgeData = data as MapEdgeData | undefined;
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: edgeData?.highlighted ? 28 : 20,
    offset: edgeData?.highlighted ? 24 : 16,
  });

  const strokeWidth = (style?.strokeWidth as number) ?? 1.5;
  const opacity = (style?.opacity as number) ?? 0.4;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth,
          opacity,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        interactionWidth={edgeData?.highlighted ? 20 : 12}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none"
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontSize: labelStyle?.fontSize ?? 10,
              fontFamily: labelStyle?.fontFamily,
              color: labelStyle?.fill ?? "#e2e8f0",
              background: labelBgStyle?.fill ?? "rgba(12, 20, 36, 0.95)",
              padding: `${labelBgPadding?.[1] ?? 6}px ${labelBgPadding?.[0] ?? 8}px`,
              borderRadius: labelBgBorderRadius ?? 4,
              border: "1px solid rgba(148, 163, 184, 0.25)",
              maxWidth: 140,
              textAlign: "center",
              lineHeight: 1.35,
              fontWeight: 500,
              opacity: edgeData?.dimmed ? 0.35 : 1,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export const MapEdge = memo(MapEdgeComponent);
