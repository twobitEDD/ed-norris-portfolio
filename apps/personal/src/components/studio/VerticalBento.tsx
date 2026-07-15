"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { profile, resumePresets } from "@/data";
import { ContactPhoneApp } from "@/components/contact/ContactPhoneApp";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { Notebook } from "@/components/physical-ui/Notebook";
import { ResumeBusinessCard } from "@/components/resume/ResumeBusinessCard";
import { Paper } from "@/components/physical-ui/Paper";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { Tablet } from "@/components/physical-ui/Tablet";
import { contactPolaroidImage } from "@/data/career-images";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { BentoCell } from "@/components/studio/BentoCell";
import { StudioObject } from "@/components/studio/StudioObject";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  type ResumeConfig,
} from "@/lib/resume";

const StudioPhoneApps = dynamic(
  () => import("@/components/studio/StudioPhoneApps").then((m) => m.StudioPhoneApps),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex min-h-[520px] w-full max-w-[920px] items-center justify-center rounded-[28px] border border-dashed border-paper-cream/10 bg-wood-dark/20">
        <p className="font-mono text-[9px] uppercase tracking-wider text-paper-cream/30">Loading studio…</p>
      </div>
    ),
  },
);

const ExpertiseTabletSlideshow = dynamic(
  () => import("@/components/work/ExpertiseTabletSlideshow").then((m) => m.ExpertiseTabletSlideshow),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-screen-border bg-screen-panel">
        <p className="font-mono text-[10px] uppercase tracking-wider text-screen-muted">Loading work…</p>
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

export function VerticalBento() {
  const [config, setConfig] = useState<ResumeConfig>(getDefaultResumeConfig());
  const resumeContent = useMemo(() => buildResumeContent(config), [config]);
  const activePreset = useMemo(
    () => resumePresets.find((p) => p.id === config.presetId) ?? resumePresets[0],
    [config.presetId],
  );

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
    <section className="vertical-bento relative px-4 pb-28 pt-2 sm:px-8 sm:pb-32 sm:pt-4">
      <div className="vertical-bento__grid mx-auto max-w-[920px]">
        <BentoCell id="game" deferPaint className="bento-cell--game">
          <StudioObject rotate={-0.8} className="bento-cell--game-object relative flex flex-col items-center">
            <StudioPhoneApps />
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

            <div className="flex flex-wrap gap-5 pt-1">
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-10">
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <StudioObject rotate={-2.2} className="flex w-full justify-center lg:justify-start">
                <ResumeBusinessCard
                  name={resumeContent.name}
                  preset={activePreset}
                  targetRole={resumeContent.targetRole}
                  summary={resumeContent.summary}
                  accentColor={resumeContent.accentColor}
                  onDownload={exportPdf}
                />
              </StudioObject>
              <ClientLogoStrip size="sm" variant="on-dark" className="max-w-[320px]" />
            </div>

            <div className="space-y-5">
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
            <Paper variant="desk" className="mb-8">
              <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                Work that solves real problems.
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Highlights from environmental systems, game platforms, and infrastructure.
              </p>
            </Paper>
          </StudioObject>

          <StudioObject rotate={0.8}>
            <ExpertiseTabletSlideshow />
          </StudioObject>

          <p className="mt-6 text-center">
            <Link
              href="/work"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-cream/60 transition hover:text-paper-cream"
            >
              View all work →
            </Link>
          </p>
        </BentoCell>

        <BentoCell id="contact" span="wide" deferPaint className="bento-cell--contact">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
            <StudioObject rotate={-1.2} className="w-full">
              <ContactPhoneApp className="mx-auto w-full" />
            </StudioObject>

            <StudioObject rotate={0.8}>
              <Polaroid
                size="lg"
                rotation={0}
                image={contactPolaroidImage}
                caption="Human-centered systems for consequential work."
                subtitle="Oregon, USA · Edd Norris"
                className="mx-auto lg:ml-auto"
              />
            </StudioObject>
          </div>

          <footer className="mt-16 border-t border-paper-cream/10 pt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper-cream/50 sm:mt-20">
            {profile.name} · {new Date().getFullYear()}
          </footer>
        </BentoCell>
      </div>
    </section>
  );
}
