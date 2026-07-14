"use client";

import { motion, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Experience } from "@/data/types";
import { disciplineColors, disciplineLabels } from "@/data/types";
import { cn } from "@/lib/cn";
import { useHydratedScroll } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { TimelineDetailDrawer } from "./TimelineDetailDrawer";

function TimelineEntryCard({
  experience,
  index,
  onSelect,
}: {
  experience: Experience;
  index: number;
  onSelect: (exp: Experience) => void;
}) {
  const primary = disciplineColors[experience.disciplines[0]];
  const isLeft = index % 2 === 0;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(experience)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-technology md:w-[44%]",
        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8",
      )}
    >
      <div
        className="absolute top-8 hidden h-3 w-3 rounded-full border-2 border-background md:block"
        style={{
          [isLeft ? "right" : "left"]: "-1.5rem",
          background: primary,
          boxShadow: `0 0 16px ${primary}88`,
        }}
      />
      <div className="rounded-2xl border border-border bg-panel p-5 transition-all duration-300 group-hover:border-border-active group-hover:shadow-[0_0_32px_rgba(70,199,215,0.08)] sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {experience.period.start} – {experience.period.end ?? "Present"}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-text-primary">{experience.title}</h3>
        <p className="text-sm text-text-muted">{experience.organization}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{experience.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.disciplines.map((d) => (
            <span
              key={d}
              className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase"
              style={{ color: disciplineColors[d], background: `${disciplineColors[d]}18` }}
            >
              {disciplineLabels[d]}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function CareerTimeline({ experiences }: { experiences: Experience[] }) {
  const [selected, setSelected] = useState<Experience | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useHydratedScroll(containerRef, {
    offset: ["start center", "end center"],
  });
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionShell id="timeline">
      <SectionHeading
        eyebrow="Career arc"
        title="A career told as connected decisions."
        description="Each chapter connects creative technology, software systems, and environmental practice into one through-line."
      />

      <div ref={containerRef} className="relative mt-16 md:mt-20">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-border md:left-1/2 md:-translate-x-px">
          <motion.div
            className="w-full origin-top bg-gradient-to-b from-technology via-environment to-games"
            style={{ height: spineHeight }}
          />
        </div>

        <div className="space-y-10 md:space-y-14">
          {experiences.map((exp, index) => (
            <TimelineEntryCard
              key={exp.id}
              experience={exp}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <TimelineDetailDrawer
        experience={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </SectionShell>
  );
}
