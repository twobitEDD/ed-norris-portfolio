import { graphNodes } from "@/data/relationships";
import type { GraphNode } from "@/data/types";

/** Estimated card size for layout collision checks (center-anchored positions). */
export type NodeBounds = { width: number; height: number };

export function estimateNodeBounds(node: Pick<GraphNode, "type" | "subtitle" | "label">): NodeBounds {
  const labelLen = node.label.length;
  const hasSubtitle = Boolean(node.subtitle);

  if (node.type === "person") {
    return { width: Math.min(210, 150 + labelLen * 2), height: hasSubtitle ? 96 : 84 };
  }
  if (node.type === "theme") {
    return { width: Math.min(200, 140 + labelLen * 1.8), height: hasSubtitle ? 88 : 76 };
  }
  if (node.type === "company" || node.type === "project") {
    return { width: Math.min(175, 130 + labelLen * 1.6), height: hasSubtitle ? 80 : 72 };
  }
  return { width: Math.min(170, 125 + labelLen * 1.5), height: hasSubtitle ? 82 : 70 };
}

export function estimateNodeBoundsById(nodeId: string): NodeBounds {
  const node = graphNodes.find((n) => n.id === nodeId);
  if (!node) return { width: 150, height: 76 };
  return estimateNodeBounds(node);
}

export function resolvePositionCollisions(
  positions: Record<string, { x: number; y: number }>,
  nodeIds: string[],
  padding = 52,
  iterations = 96,
): Record<string, { x: number; y: number }> {
  type Box = { id: string; x: number; y: number; width: number; height: number };

  const boxes: Box[] = nodeIds.map((id) => {
    const pos = positions[id] ?? { x: 0, y: 0 };
    const { width, height } = estimateNodeBoundsById(id);
    return { id, x: pos.x, y: pos.y, width, height };
  });

  for (let iter = 0; iter < iterations; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const minDx = (a.width + b.width) / 2 + padding;
        const minDy = (a.height + b.height) / 2 + padding;
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        if (Math.abs(dx) >= minDx || Math.abs(dy) >= minDy) continue;

        const overlapX = minDx - Math.abs(dx);
        const overlapY = minDy - Math.abs(dy);

        if (overlapX <= overlapY) {
          const push = overlapX / 2;
          const sign = dx === 0 ? (j % 2 === 0 ? 1 : -1) : Math.sign(dx);
          a.x -= push * sign;
          b.x += push * sign;
        } else {
          const push = overlapY / 2;
          const sign = dy === 0 ? (j % 2 === 0 ? 1 : -1) : Math.sign(dy);
          a.y -= push * sign;
          b.y += push * sign;
        }
        moved = true;
      }
    }
    if (!moved) break;
  }

  const resolved = { ...positions };
  for (const box of boxes) {
    resolved[box.id] = { x: box.x, y: box.y };
  }
  return resolved;
}
