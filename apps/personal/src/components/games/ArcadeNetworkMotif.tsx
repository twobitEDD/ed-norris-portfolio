"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Console-network + portfolio map palette for arcade frame texture. */
const MOTIF = {
  nodes: ["#4da4c9", "#8c5cc7", "#7ea66a", "#c68b38", "#bd5878"],
  edges: "rgba(77, 164, 201, 0.22)",
  glow: "rgba(140, 92, 199, 0.14)",
  rail: "rgba(126, 95, 62, 0.16)",
} as const;

type ArcadeNetworkMotifProps = {
  className?: string;
};

export function ArcadeNetworkMotif({ className }: ArcadeNetworkMotifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w < 1 || h < 1) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = Math.max(4, Math.floor(w / 72));
      const rows = Math.max(3, Math.floor(h / 64));
      const nodes: { x: number; y: number; c: string }[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const jitterX = ((row * 17 + col * 31) % 11) - 5;
          const jitterY = ((row * 23 + col * 13) % 9) - 4;
          nodes.push({
            x: (col + 0.5) * (w / cols) + jitterX,
            y: (row + 0.5) * (h / rows) + jitterY,
            c: MOTIF.nodes[(row + col) % MOTIF.nodes.length],
          });
        }
      }

      ctx.strokeStyle = MOTIF.edges;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > w / cols + 28) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = MOTIF.glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = node.c;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.strokeStyle = MOTIF.rail;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas.parentElement!);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 opacity-70", className)}
      aria-hidden
    />
  );
}
