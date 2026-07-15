"use client";

import Link from "next/link";
import Image from "next/image";
import { experiences, projects } from "@/data";
import { getNodeImage } from "@/data/career-images";
import type { GraphNode } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import type { StoryStop } from "@/data/through-line";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function MapDetailPanel({
  node,
  storyStop,
  onClose,
  compact = false,
}: {
  node: GraphNode | null;
  storyStop?: StoryStop | null;
  onClose: () => void;
  /** Bottom docked panel for homepage map preview */
  compact?: boolean;
}) {
  if (!node) return null;
  const color = disciplineColors[node.disciplines[0]];
  const isTheme = node.type === "theme";
  const narrative = storyStop?.copy ?? node.connectionNarrative ?? node.description;
  const headline = storyStop?.headline ?? node.label;
  const brandImage = node.image
    ? { src: node.image, alt: node.imageAlt ?? node.label, objectPosition: undefined }
    : getNodeImage(node.id);

  const linkedExperience = node.experienceId
    ? experiences.find((e) => e.id === node.experienceId)
    : null;

  return (
    <GlassPanel
      strong
      className={
        compact
          ? "absolute bottom-2 left-2 right-2 z-10 max-h-[38%] overflow-y-auto p-3 sm:bottom-3 sm:left-3 sm:right-3 sm:max-h-[42%] sm:p-4"
          : "absolute bottom-2 left-2 right-2 z-10 max-h-[45%] overflow-y-auto p-4 sm:bottom-4 sm:left-auto sm:right-4 sm:max-h-none sm:w-80 sm:p-5"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {storyStop && (
            <p className="font-mono text-[9px] uppercase tracking-wider text-technology sm:text-[10px]">
              Story · {storyStop.headline}
            </p>
          )}
          {!storyStop && (
            <p className="font-mono text-[9px] uppercase tracking-wider text-screen-muted sm:text-[10px]">
              {isTheme ? "Through-line" : node.type}
            </p>
          )}
          <h3 className="mt-1 font-display text-base font-bold text-screen-text sm:text-lg">{headline}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[40px] min-w-[40px] shrink-0 rounded-lg border border-border text-sm text-text-secondary sm:min-h-[44px] sm:min-w-[44px]"
          aria-label="Close panel"
        >
          ×
        </button>
      </div>
      {brandImage && (
        <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={brandImage.src}
            alt={brandImage.alt}
            fill
            className="object-cover"
            style={{ objectPosition: brandImage.objectPosition ?? "center" }}
            sizes="320px"
          />
        </div>
      )}
      {node.period && <p className="mt-2 font-mono text-xs text-text-muted">{node.period}</p>}
      {narrative && (
        <p className="mt-2 text-xs leading-relaxed text-screen-muted sm:mt-3 sm:text-sm">
          {narrative}
        </p>
      )}
      {linkedExperience && linkedExperience.details.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-text-muted sm:mt-3">
          {linkedExperience.details.slice(0, 2).map((d) => (
            <li key={d} className="flex gap-2">
              <span style={{ color }}>·</span>
              {d}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
        {node.disciplines.map((d) => (
          <span
            key={d}
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase sm:text-[10px]"
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
            className="mt-3 inline-block text-xs font-semibold sm:mt-4 sm:text-sm"
            style={{ color }}
          >
            View project →
          </Link>
        );
      })()}
    </GlassPanel>
  );
}
