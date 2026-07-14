"use client";

import Link from "next/link";
import { projects } from "@/data";
import type { GraphNode } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function MapDetailPanel({
  node,
  onClose,
}: {
  node: GraphNode | null;
  onClose: () => void;
}) {
  if (!node) return null;
  const color = disciplineColors[node.disciplines[0]];

  return (
    <GlassPanel strong className="absolute bottom-4 left-4 right-4 z-10 p-5 sm:left-auto sm:right-4 sm:w-80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{node.type}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-text-primary">{node.label}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] rounded-lg border border-border text-sm text-text-secondary"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>
      {node.period && <p className="mt-2 font-mono text-xs text-text-muted">{node.period}</p>}
      {node.description && <p className="mt-3 text-sm text-text-secondary">{node.description}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {node.disciplines.map((d) => (
          <span
            key={d}
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase"
            style={{ color: disciplineColors[d], background: `${disciplineColors[d]}18` }}
          >
            {disciplineLabels[d]}
          </span>
        ))}
      </div>
      {node.projectId && (() => {
        const project = projects.find((p) => p.id === node.projectId);
        if (!project) return null;
        return (
          <Link
            href={`/projects/${project.slug}`}
            className="mt-4 inline-block text-sm font-semibold"
            style={{ color }}
          >
            View project →
          </Link>
        );
      })()}
    </GlassPanel>
  );
}
