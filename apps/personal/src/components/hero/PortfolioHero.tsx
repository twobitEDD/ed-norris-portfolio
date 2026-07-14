"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Profile } from "@/data/types";
import { GlowButton } from "@/components/ui/GlowButton";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { fadeUp, stagger } from "@/lib/motion";
import { IdentityBadges } from "./IdentityBadges";
import { SplitWorldVisual } from "./SplitWorldVisual";

export function PortfolioHero({ profile }: { profile: Profile }) {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
      <TechnicalGrid className="opacity-40" />
      <div className="mx-auto grid max-w-[1480px] items-center gap-12 px-5 py-12 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[52%_48%] lg:gap-8 lg:px-8 lg:py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            {profile.tagline}
          </motion.p>
          <motion.h1 variants={fadeUp} className="hero-title mt-5 font-display font-bold text-text-primary">
            {profile.headline}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            {profile.summary}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <GlowButton href="/work#environmental">Explore environmental work</GlowButton>
            <GlowButton href="/work#creative" variant="ghost">
              Explore creative work
            </GlowButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10">
            <IdentityBadges badges={profile.badges} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative lg:justify-self-end"
        >
          <SplitWorldVisual />
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to work section"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-text-muted motion-reduce:hidden"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
