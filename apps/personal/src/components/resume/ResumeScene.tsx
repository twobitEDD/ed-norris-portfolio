"use client";

import { useMemo, useState } from "react";
import { resumePresets } from "@/data";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  type ResumeConfig,
} from "@/lib/resume";
import { Paper } from "@/components/physical-ui/Paper";
import { Notebook } from "@/components/physical-ui/Notebook";
import { Phone } from "@/components/physical-ui/Phone";
import { Tablet } from "@/components/physical-ui/Tablet";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";
import { ResumePreview } from "@/components/resume/ResumePreview";

export function ResumeScene() {
  const [config, setConfig] = useState<ResumeConfig>(getDefaultResumeConfig());
  const content = useMemo(() => buildResumeContent(config), [config]);

  const exportPdf = async () => {
    const res = await fetch("/api/resume/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
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
    <StudioScene id="resume" className="!py-10 sm:!py-16">
      <StudioReveal>
        <div className="grid gap-8 xl:grid-cols-[280px_1fr_190px] xl:items-start xl:gap-6">
          <StudioObject rotate={-1.5}>
            <Paper torn pinned className="mb-6 xl:mb-0">
              <h2 className="font-editorial text-xl font-semibold text-ink sm:text-2xl">
                Résumé generator, not résumé maintenance.
              </h2>
            </Paper>
            <Notebook title="Download My Resume" className="mt-4">
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
                Customize & Download →
              </button>
            </Notebook>
          </StudioObject>

          <StudioObject parallax={0.02} rotate={0.5}>
            <Tablet glow="amber" className="w-full">
              <div className="max-h-[70vh] overflow-y-auto p-2">
                <ResumePreview content={content} className="!min-h-0 !border-0 !shadow-none" />
              </div>
            </Tablet>
          </StudioObject>

          <StudioObject rotate={2.5} className="hidden xl:block">
            <StickyNote color="yellow">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-soft">Presets</p>
              <ul className="mt-2 space-y-1 text-xs text-ink">
                {resumePresets.map((p) => (
                  <li key={p.id}>{p.label}</li>
                ))}
              </ul>
            </StickyNote>
            <Phone className="mt-8">
              <p className="font-mono text-[8px] uppercase text-screen-muted">Quick preview</p>
              <p className="mt-2 font-display text-sm font-bold text-screen-text">{content.name}</p>
              <p className="text-[10px] text-screen-muted">{content.targetRole}</p>
              <p className="mt-2 line-clamp-6 text-[9px] leading-relaxed text-screen-muted">
                {content.summary}
              </p>
            </Phone>
          </StudioObject>
        </div>
      </StudioReveal>
    </StudioScene>
  );
}
