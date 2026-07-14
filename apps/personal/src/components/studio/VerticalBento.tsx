"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { profile, projects, resumePresets } from "@/data";
import type { Project } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { IntroPaper } from "@/components/hero/IntroPaper";
import { PracticeTablet } from "@/components/hero/PracticeTablet";
import { IdentityBadgeRow } from "@/components/hero/IdentityBadgeRow";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { MapTablet } from "@/components/map/MapTablet";
import { Notebook } from "@/components/physical-ui/Notebook";
import { Phone } from "@/components/physical-ui/Phone";
import { Paper } from "@/components/physical-ui/Paper";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { Tablet } from "@/components/physical-ui/Tablet";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { BentoCell } from "@/components/studio/BentoCell";
import { DeskCompass, DeskPatch, DeskPenCup, DeskPlant } from "@/components/studio/DeskProps";
import { StudioObject } from "@/components/studio/StudioObject";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  type ResumeConfig,
} from "@/lib/resume";

const focusItems = [
  "ERGO.games platform",
  "Carbon tracking infrastructure",
  "Sustainable agriculture systems",
  "Games that bring people together",
];

const projectPhotos: Record<string, string> = {
  "proj-ergo": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  "proj-co2t-platform":
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
  "proj-carbon-tracking":
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
  "proj-2bit-games":
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
};

function ProjectCard({ project }: { project: Project }) {
  const accent = disciplineColors[project.disciplines[0]];
  const photo = projectPhotos[project.id];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full transition duration-300 ease-studio hover:-translate-y-1"
    >
      <Tablet glow="none" orientation="portrait" className="h-full w-full">
        <div className="relative flex min-h-[220px] flex-col justify-end overflow-hidden p-3 sm:min-h-[260px]">
          {photo && (
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 280px"
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
            <h3 className="mt-1 font-display text-sm font-bold leading-tight text-white">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-[10px] text-white/85">{project.summary}</p>
            <span className="mt-2 inline-block text-[10px] font-semibold text-white/90 opacity-80 transition group-hover:opacity-100">
              Open case study →
            </span>
          </div>
        </div>
      </Tablet>
    </Link>
  );
}

export function VerticalBento() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const [config, setConfig] = useState<ResumeConfig>(getDefaultResumeConfig());
  const resumeContent = useMemo(() => buildResumeContent(config), [config]);
  const resumeSnippet = useMemo(() => buildResumeContent(getDefaultResumeConfig()), []);

  const exportPdf = async () => {
    const res = await fetch("/api/resume/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resumeContent),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edd-norris-resume.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="vertical-bento relative z-[2] -mt-[8svh] px-4 pb-24 pt-6 sm:-mt-[12svh] sm:px-8 sm:pt-8 lg:-mt-[15svh]">
      <DeskPlant className="pointer-events-none absolute left-2 top-8 z-10 hidden lg:block" />
      <DeskPatch className="pointer-events-none absolute left-[8%] top-[28%] z-10 hidden md:flex" />
      <DeskPenCup className="pointer-events-none absolute right-[6%] top-[12%] z-10 hidden xl:block" />
      <DeskCompass className="pointer-events-none absolute bottom-[18%] left-3 z-10 hidden lg:block" />

      <div className="vertical-bento__grid mx-auto max-w-[920px]">
        <BentoCell id="intro" span="wide" className="bento-cell--intro">
          <StudioObject rotate={-1.2}>
            <IntroPaper />
          </StudioObject>
        </BentoCell>

        <BentoCell id="work" span="wide" delay={0.04}>
          <StudioObject rotate={1}>
            <div className="mx-auto max-w-[480px] lg:max-w-none">
              <PracticeTablet />
            </div>
          </StudioObject>
        </BentoCell>

        <BentoCell span="full" delay={0.06}>
          <IdentityBadgeRow className="!px-0 !py-4" />
        </BentoCell>

        <BentoCell id="timeline" delay={0.08}>
          <StudioObject rotate={-1.8}>
            <TimelinePaper />
          </StudioObject>
        </BentoCell>

        <BentoCell id="map" span="tall" delay={0.1}>
          <StudioObject rotate={0.6}>
            <MapTablet className="w-full" />
          </StudioObject>
        </BentoCell>

        <BentoCell delay={0.12} className="bento-cell--notebook">
          <div className="flex flex-col gap-5">
            <StudioObject rotate={2}>
              <Notebook title="Current focus">
                <ul className="mt-3 space-y-2">
                  {focusItems.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-soft">
                      <span className="font-mono text-xs text-environment">☑</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Notebook>
            </StudioObject>

            <div className="flex flex-wrap gap-4">
              <StickyNote color="green" className="max-w-[210px]">
                <p className="handwritten text-base leading-snug text-ink">Open to collaboration.</p>
                <p className="handwritten text-sm text-ink-soft">Building what&apos;s next.</p>
              </StickyNote>
              <StickyNote color="yellow" className="max-w-[210px]">
                <p className="handwritten text-base leading-snug text-ink">Systems that scale.</p>
                <p className="handwritten text-sm text-ink-soft">Impact that lasts.</p>
              </StickyNote>
            </div>
          </div>
        </BentoCell>

        <BentoCell id="resume" span="wide" delay={0.14} className="bento-cell--resume">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
            <StudioObject rotate={-2.5} className="flex justify-center lg:justify-start">
              <Phone>
                <p className="font-mono text-[8px] uppercase tracking-wider text-screen-muted">
                  Résumé generator
                </p>
                <h3 className="mt-2 font-display text-sm font-bold text-screen-text">{resumeSnippet.name}</h3>
                <p className="text-[10px] text-screen-muted">{resumeSnippet.targetRole}</p>
                <p className="mt-2 line-clamp-4 text-[9px] leading-relaxed text-screen-muted">
                  {resumeSnippet.summary}
                </p>
                <button
                  type="button"
                  onClick={exportPdf}
                  className="mt-3 text-[10px] font-semibold text-technology hover:text-screen-text"
                >
                  Customize & download →
                </button>
              </Phone>
            </StudioObject>

            <div className="space-y-4">
              <Notebook title="Build your résumé">
                <label className="mt-3 block text-xs text-ink-soft">
                  Preset
                  <select
                    className="mt-1 w-full rounded border border-ink/20 bg-white/50 px-2 py-2 text-sm text-ink"
                    value={config.presetId}
                    onChange={(e) => setConfig(applyPreset(e.target.value))}
                  >
                    {resumePresets.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="mt-3 block text-xs text-ink-soft">
                  Target role
                  <input
                    className="mt-1 w-full rounded border border-ink/20 bg-white/50 px-2 py-2 text-sm text-ink"
                    value={config.targetRole}
                    onChange={(e) => setConfig((c) => ({ ...c, targetRole: e.target.value }))}
                  />
                </label>
                <button
                  type="button"
                  onClick={exportPdf}
                  className="mt-4 w-full min-h-[44px] rounded border border-ink/30 bg-ink py-2 text-sm font-semibold text-paper-cream"
                >
                  Download PDF →
                </button>
              </Notebook>

              <Tablet glow="amber" className="w-full">
                <div className="max-h-[50vh] overflow-y-auto p-2">
                  <ResumePreview content={resumeContent} className="!min-h-0 !border-0 !shadow-none" />
                </div>
              </Tablet>
            </div>
          </div>
        </BentoCell>

        <BentoCell delay={0.16} className="bento-cell--work">
          <StudioObject rotate={0.5}>
            <Paper torn className="mb-6">
              <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                Work that solves real problems.
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Highlights from environmental systems, game platforms, and infrastructure.
              </p>
            </Paper>
          </StudioObject>

          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((project) => (
              <StudioObject key={project.id} rotate={project.id.endsWith("ergo") ? -2 : 2}>
                <ProjectCard project={project} />
              </StudioObject>
            ))}
          </div>
        </BentoCell>

        <BentoCell id="contact" span="wide" delay={0.18} className="bento-cell--contact">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <StudioObject rotate={-1}>
              <Paper torn>
                <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                  Let&apos;s build something useful.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{profile.availability}</p>
              </Paper>

              <Notebook title="Contact" className="mt-6">
                <div className="mt-3 space-y-3 text-sm text-ink">
                  {profile.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="block font-medium underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">{profile.location}</p>
                </div>
              </Notebook>
            </StudioObject>

            <StudioObject rotate={1.2}>
              <Tablet glow="green" className="w-full">
                <div
                  className="flex min-h-[260px] flex-col items-center justify-end p-8 text-center"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 15%, rgba(0,0,0,0.78) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80') center/cover",
                  }}
                >
                  <p className="font-editorial text-xl font-semibold text-white sm:text-2xl">
                    Human-centered systems for consequential work.
                  </p>
                </div>
              </Tablet>
            </StudioObject>
          </div>

          <footer className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper-cream/50">
            {profile.name} · {new Date().getFullYear()}
          </footer>
        </BentoCell>
      </div>
    </section>
  );
}
