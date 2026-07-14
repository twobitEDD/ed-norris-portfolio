"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const color = disciplineColors[project.disciplines[0]];

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        "group relative min-h-[360px] overflow-hidden rounded-3xl border border-border",
        index % 2 === 1 && "lg:mt-10",
      )}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(160deg, ${color}22, #0b1020 55%), radial-gradient(circle at 70% 20%, ${color}33, transparent 50%)`,
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-7">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color }}>
            {project.disciplines.join(" · ")}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.summary}</p>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex min-h-[44px] items-center font-semibold text-text-primary"
          style={{ color }}
        >
          View case study →
        </Link>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <SectionShell id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Work that solves real problems."
        description="Flagship projects across environmental systems, software platforms, and interactive products."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionShell>
  );
}
