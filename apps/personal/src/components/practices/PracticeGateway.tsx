"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Practice } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

const accentMap = {
  environmental: { primary: disciplineColors.environment, secondary: disciplineColors.data },
  creative: { primary: disciplineColors.games, secondary: disciplineColors.marketing },
};

export function PracticeCard({
  practice,
  useAnchors = false,
}: {
  practice: Practice;
  useAnchors?: boolean;
}) {
  const accent =
    practice.id === "environmental" ? accentMap.environmental : accentMap.creative;

  return (
    <motion.article
      id={practice.id}
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative min-h-[420px] scroll-mt-28 overflow-hidden rounded-3xl border border-border",
        practice.offset && "lg:mt-12",
      )}
    >
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accent.primary}33, transparent 55%), radial-gradient(ellipse at 80% 80%, ${accent.secondary}22, transparent 50%), linear-gradient(160deg, #0b1020, #11192d)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accent.primary}55, 0 24px 80px ${accent.primary}18` }}
      />
      <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
        <div>
          <p className="font-mono text-sm text-text-muted">{practice.number}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: accent.primary }}>
            {practice.label}
          </p>
          <h3 className="mt-4 max-w-sm font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
            {practice.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">{practice.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {practice.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                style={{ borderColor: `${accent.primary}44`, color: accent.primary }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={useAnchors ? `#${practice.id}` : practice.href}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-semibold text-text-primary transition-colors group-hover:text-white"
        >
          Explore practice
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export function PracticeGateway({
  practices,
  useAnchors = false,
}: {
  practices: Practice[];
  useAnchors?: boolean;
}) {
  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
      {practices.map((practice) => (
        <PracticeCard key={practice.id} practice={practice} useAnchors={useAnchors} />
      ))}
    </div>
  );
}
