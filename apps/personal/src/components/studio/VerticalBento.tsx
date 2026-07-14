"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { profile, projects, resumePresets } from "@/data";
import { getProjectImage } from "@/data/career-images";
import type { Project } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { ContactCTAs } from "@/components/contact/ContactCTAs";
import { IdentityBadgeRow } from "@/components/hero/IdentityBadgeRow";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { Notebook } from "@/components/physical-ui/Notebook";
import { Phone } from "@/components/physical-ui/Phone";
import { Paper } from "@/components/physical-ui/Paper";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { Tablet } from "@/components/physical-ui/Tablet";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { BentoCell } from "@/components/studio/BentoCell";
import { LazyMount } from "@/components/studio/LazyMount";
import { StudioObject } from "@/components/studio/StudioObject";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  type ResumeConfig,
} from "@/lib/resume";

const PacManEasterEgg = dynamic(
  () => import("@/components/games/PacManEasterEgg").then((m) => m.PacManEasterEgg),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-paper-cream/10 bg-wood-dark/20">
        <p className="font-mono text-[9px] uppercase tracking-wider text-paper-cream/30">Loading…</p>
      </div>
    ),
  },
);

const MapTablet = dynamic(
  () => import("@/components/map/MapTablet").then((m) => m.MapTablet),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-screen-border bg-screen-panel">
        <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">Loading map…</p>
      </div>
    ),
  },
);

const focusItems = [
  "ERGO.games platform",
  "Carbon tracking infrastructure",
  "Sustainable agriculture systems",
  "Games that bring people together",
];

const fallbackPhotos: Record<string, string> = {
  "proj-ergo": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  "proj-2bit-games":
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
};

function ProjectCard({ project }: { project: Project }) {
  const accent = disciplineColors[project.disciplines[0]];
  const brandImage = getProjectImage(project.id);
  const photo = brandImage?.src ?? fallbackPhotos[project.id];

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
              alt={brandImage?.alt ?? ""}
              fill
              loading="lazy"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              style={{ objectPosition: brandImage?.objectPosition ?? "center" }}
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
    <section className="vertical-bento relative z-[2] px-4 pb-24 pt-10 sm:px-8 sm:pt-12 lg:pt-14">
      <div className="vertical-bento__grid mx-auto max-w-[920px]">
        <BentoCell span="full" deferPaint className="bento-cell--badges">
          <IdentityBadgeRow className="pb-2 sm:pb-4" />
        </BentoCell>

        <BentoCell id="game" deferPaint className="bento-cell--game">
          <StudioObject rotate={-1.2} className="bento-cell--game-object">
            <LazyMount minHeight="140px">
              <PacManEasterEgg className="w-full" />
            </LazyMount>
          </StudioObject>
        </BentoCell>

        <BentoCell id="map" span="tall" deferPaint className="bento-cell--map">
          <StudioObject rotate={0.6}>
            <div className="relative pt-1 sm:pt-2">
              <StickyNote color="pink" className="pointer-events-none absolute -right-2 -top-3 z-10 hidden max-w-[160px] sm:block">
                <p className="handwritten text-sm leading-snug text-ink">One arc, not six careers.</p>
              </StickyNote>
              <LazyMount minHeight="380px">
                <MapTablet className="w-full" />
              </LazyMount>
            </div>
          </StudioObject>
        </BentoCell>

        <BentoCell id="timeline" deferPaint>
          <StudioObject rotate={-1.8}>
            <TimelinePaper />
          </StudioObject>
        </BentoCell>

        <BentoCell deferPaint className="bento-cell--notebook">
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
                <p className="handwritten text-base leading-snug text-ink">Seeking opportunities.</p>
                <p className="handwritten text-sm text-ink-soft">Building what&apos;s next.</p>
              </StickyNote>
              <StickyNote color="yellow" className="max-w-[210px]">
                <p className="handwritten text-base leading-snug text-ink">Systems that scale.</p>
                <p className="handwritten text-sm text-ink-soft">Impact that lasts.</p>
              </StickyNote>
            </div>
          </div>
        </BentoCell>

        <BentoCell id="resume" span="wide" deferPaint className="bento-cell--resume">
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

        <BentoCell id="work" deferPaint className="bento-cell--work">
          <StudioObject rotate={0.5}>
            <Paper className="mb-6">
              <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                Work that solves real problems.
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Highlights from environmental systems, game platforms, and infrastructure.
              </p>
            </Paper>
          </StudioObject>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {featured.map((project) => (
              <StudioObject key={project.id} rotate={project.id.endsWith("ergo") ? -2 : 2}>
                <ProjectCard project={project} />
              </StudioObject>
            ))}
          </div>
        </BentoCell>

        <BentoCell id="contact" span="wide" deferPaint className="bento-cell--contact">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <StudioObject rotate={-1}>
              <Paper>
                <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                  Let&apos;s build something useful.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{profile.availability}</p>
                <ContactCTAs variant="desk" className="mt-6" />
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
