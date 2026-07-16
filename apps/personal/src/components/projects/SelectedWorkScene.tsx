"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data";
import { getProjectImage } from "@/data/career-images";
import type { Project } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Tablet } from "@/components/physical-ui/Tablet";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";

const fallbackPhotos: Record<string, string> = {};

const rotations = [-6, 4, -3, 5, -4];
const offsets = [0, 28, 10, 36, 16];
const zIndexes = [1, 2, 3, 4, 5];

function ProjectDevice({ project, index }: { project: Project; index: number }) {
  const accent = disciplineColors[project.disciplines[0]];
  const brandImage = getProjectImage(project.id);
  const photo = brandImage?.src ?? fallbackPhotos[project.id];

  return (
    <StudioObject rotate={rotations[index % rotations.length]}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block w-[152px] transition-all duration-300 ease-studio hover:-translate-y-2 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-technology sm:w-[185px]"
        style={{
          marginTop: offsets[index % offsets.length],
          zIndex: zIndexes[index % zIndexes.length],
        }}
      >
        <Tablet glow="none" orientation="portrait" className="w-full transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          <div className="relative flex min-h-[240px] flex-col justify-end overflow-hidden p-3 transition group-hover:brightness-110">
            {photo && (
              <Image
                src={photo}
                alt={brandImage?.alt ?? ""}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                style={{ objectPosition: brandImage?.objectPosition ?? "center" }}
                sizes="190px"
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 15%, ${accent}dd 100%)`,
              }}
            />
            <div className="relative">
              <p className="font-mono text-[8px] uppercase tracking-wider text-white/70">
                {project.disciplines[0]}
              </p>
              <h3 className="mt-1 font-display text-xs font-bold leading-tight text-white">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-[9px] text-white/85">{project.summary}</p>
              <span className="mt-2 inline-block text-[9px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                Open case study →
              </span>
            </div>
          </div>
        </Tablet>
      </Link>
    </StudioObject>
  );
}

export function SelectedWorkScene() {
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <StudioScene id="work" className="!py-10 sm:!py-16">
      <StudioReveal>
        <StudioObject rotate={0.8}>
          <Paper torn className="mb-8 max-w-xl">
            <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
              Work that solves real problems.
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              A few highlights from the journey — environmental systems, game platforms, and infrastructure.
            </p>
          </Paper>
        </StudioObject>

        <div className="relative flex min-h-[340px] items-end justify-center overflow-x-auto pb-8 pl-4 pr-10 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((project, index) => (
            <div key={project.id} className="-ml-6 first:ml-0" style={{ zIndex: index + 1 }}>
              <ProjectDevice project={project} index={index} />
            </div>
          ))}
        </div>
      </StudioReveal>
    </StudioScene>
  );
}
