"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Download } from "lucide-react";
import { projects, resumePresets } from "@/data";
import type { Discipline } from "@/data/types";
import { disciplineLabels } from "@/data/types";
import {
  applyPreset,
  buildResumeContent,
  getDefaultResumeConfig,
  resumeToPlainText,
  type ResumeConfig,
} from "@/lib/resume";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { ResumePreview } from "./ResumePreview";

const allDisciplines: Discipline[] = [
  "environment",
  "software",
  "games",
  "marketing",
  "operations",
  "data",
];

export function ResumeBuilder() {
  const [config, setConfig] = useState<ResumeConfig>(getDefaultResumeConfig());

  const content = useMemo(() => buildResumeContent(config), [config]);

  const update = (partial: Partial<ResumeConfig>) => setConfig((c) => ({ ...c, ...partial }));

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

  const copyText = async () => {
    await navigator.clipboard.writeText(resumeToPlainText(content));
  };

  return (
    <SectionShell id="resume" grid>
      <TechnicalGrid className="opacity-30" />
      <SectionHeading
        eyebrow="Résumé studio"
        title="Résumé generator, not résumé maintenance."
        description="Build the version each opportunity needs — from the same structured data that powers the timeline and work map."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[380px_1fr]">
        <GlassPanel strong className="no-print h-fit p-6">
          <h3 className="font-display text-lg font-bold">Configuration</h3>

          <label className="mt-5 block text-sm text-text-secondary">
            Preset
            <select
              className="mt-2 w-full min-h-[44px] rounded-xl border border-border bg-background-raised px-3 text-text-primary"
              value={config.presetId}
              onChange={(e) => update(applyPreset(e.target.value))}
            >
              {resumePresets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm text-text-secondary">
            Target role
            <input
              className="mt-2 w-full min-h-[44px] rounded-xl border border-border bg-background-raised px-3 text-text-primary"
              value={config.targetRole}
              onChange={(e) => update({ targetRole: e.target.value })}
            />
          </label>

          <label className="mt-4 block text-sm text-text-secondary">
            Length
            <select
              className="mt-2 w-full min-h-[44px] rounded-xl border border-border bg-background-raised px-3 text-text-primary"
              value={config.pages}
              onChange={(e) => update({ pages: Number(e.target.value) as 1 | 2 | 3 })}
            >
              <option value={1}>One page</option>
              <option value={2}>Two pages</option>
              <option value={3}>Full career</option>
            </select>
          </label>

          <fieldset className="mt-5">
            <legend className="text-sm text-text-secondary">Disciplines</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {allDisciplines.map((d) => (
                <label key={d} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={config.disciplines.includes(d)}
                    onChange={(e) =>
                      update({
                        disciplines: e.target.checked
                          ? [...config.disciplines, d]
                          : config.disciplines.filter((x) => x !== d),
                      })
                    }
                  />
                  {disciplineLabels[d]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm text-text-secondary">Projects</legend>
            <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
              {projects.map((p) => (
                <label key={p.id} className="flex items-start gap-2 text-xs text-text-secondary">
                  <input
                    type="checkbox"
                    checked={config.selectedProjectIds.includes(p.id)}
                    onChange={(e) =>
                      update({
                        selectedProjectIds: e.target.checked
                          ? [...config.selectedProjectIds, p.id]
                          : config.selectedProjectIds.filter((id) => id !== p.id),
                      })
                    }
                  />
                  {p.title}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 space-y-2 text-sm">
            {[
              ["emphasizeLeadership", "Leadership emphasis"],
              ["emphasizeTechnical", "Technical depth"],
              ["includeSkills", "Include skills"],
              ["includeEducation", "Include education"],
              ["includeLinks", "Include links"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-text-secondary">
                <input
                  type="checkbox"
                  checked={config[key as keyof ResumeConfig] as boolean}
                  onChange={(e) => update({ [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <GlowButton onClick={exportPdf}>
              <Download className="h-4 w-4" />
              Export PDF
            </GlowButton>
            <GlowButton onClick={copyText} variant="ghost">
              <Copy className="h-4 w-4" />
              Copy text
            </GlowButton>
          </div>
        </GlassPanel>

        <AnimatePresence mode="wait">
          <motion.div
            key={config.presetId + config.targetRole + config.pages}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ResumePreview content={content} />
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
