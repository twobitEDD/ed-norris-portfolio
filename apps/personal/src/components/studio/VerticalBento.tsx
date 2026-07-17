"use client";

import { STUDIO_SPACING, STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import { resumePresets } from "@/data";
import { ContactPhoneApp } from "@/components/contact/ContactPhoneApp";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { Notebook } from "@/components/physical-ui/Notebook";
import { ResumeBusinessCard } from "@/components/resume/ResumeBusinessCard";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { ContactPolaroidStack } from "@/components/contact/ContactPolaroidStack";
import { Tablet } from "@/components/physical-ui/Tablet";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { BentoCell } from "@/components/studio/BentoCell";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { StudioObject } from "@/components/studio/StudioObject";
import { cn } from "@/lib/cn";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  type ResumeConfig,
} from "@/lib/resume";
import { downloadBusinessCard } from "@/lib/resume/download-business-card";

const StudioPhoneApps = dynamic(
  () => import("@/components/studio/StudioPhoneApps").then((m) => m.StudioPhoneApps),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex min-h-[520px] w-full max-w-[min(100%,var(--studio-device-max,920px))] items-center justify-center rounded-[28px] border border-dashed border-paper-cream/10 bg-wood-dark/20">
        <p className="font-mono text-[9px] uppercase tracking-wider text-paper-cream/30">Loading studio…</p>
      </div>
    ),
  },
);

const focusItems = [
  "ERGO.games platform",
  "Carbon tracking infrastructure",
  "Sustainable agriculture systems",
  "Technology that brings people together",
];

export function VerticalBento() {
  const [config, setConfig] = useState<ResumeConfig>(getDefaultResumeConfig());
  const businessCardRef = useRef<HTMLElement>(null);
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

  const handleDownloadBusinessCard = useCallback(async () => {
    if (!businessCardRef.current) return;
    await downloadBusinessCard(businessCardRef.current);
  }, []);

  return (
    <section className={cn("vertical-bento", STUDIO_SPACING.bentoSection)}>
      <div className={STUDIO_SPACING.bentoGrid}>
        <BentoCell id="game" deferPaint className="bento-cell--game">
          <StudioObject rotate={-0.8} className="bento-cell--game-object relative flex flex-col items-center">
            <StudioPhoneApps />
          </StudioObject>
        </BentoCell>

        <BentoCell id="timeline" deferPaint className="bento-cell--timeline">
          <div className="timeline-desk-cluster">
            <div className="timeline-desk-cluster__paper">
              <StudioObject rotate={-1.8}>
                <TimelinePaper />
              </StudioObject>
            </div>

            <div className="timeline-desk-cluster__margin">
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
            </div>
          </div>
        </BentoCell>

        <BentoCell id="resume" span="wide" deferPaint className={STUDIO_SPACING.bentoCellResume}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-10">
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <StudioObject rotate={-2.2} className="flex w-full justify-center lg:justify-start">
                <ResumeBusinessCard
                  ref={businessCardRef}
                  name={resumeContent.name}
                  preset={activePreset}
                  targetRole={resumeContent.targetRole}
                  summary={resumeContent.summary}
                  accentColor={resumeContent.accentColor}
                  onDownload={handleDownloadBusinessCard}
                />
              </StudioObject>
              <ClientLogoStrip size="sm" variant="on-dark" className="max-w-[320px]" />
            </div>

            <div className="space-y-5">
              <Notebook title="Download My Resume">
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

              <Tablet glow="amber" className="resume-viewer-tablet w-full">
                <div className="resume-viewer-tablet__screen flex min-h-0 flex-1 flex-col overflow-hidden p-2 sm:p-3">
                  <ResumePreview
                    content={resumeContent}
                    className="!min-h-0 !flex-1 !border-0 !shadow-none overflow-y-auto"
                  />
                </div>
              </Tablet>
            </div>
          </div>
        </BentoCell>

        <BentoCell id="contact" span="wide" deferPaint className={STUDIO_SPACING.bentoCellContact}>
          <div className="contact-bento-layout flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
            <div className="contact-phone-bleed">
              <StudioObject rotate={-1.2} className="w-full">
                <ContactPhoneApp className="w-full" />
              </StudioObject>
            </div>

            <ContactPolaroidStack />
          </div>

          <StudioFooter />
        </BentoCell>
      </div>
    </section>
  );
}
