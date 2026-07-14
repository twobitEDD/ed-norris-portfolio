"use client";

import { motion } from "framer-motion";
import { IntroPaper } from "./IntroPaper";
import { PracticeTablet } from "./PracticeTablet";
import { IdentityBadgeRow } from "./IdentityBadgeRow";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { fadeUp, stagger } from "@/lib/motion";

export function NorthStarHeroScene() {
  return (
    <section id="hero" className="relative z-[1] min-h-[115svh] scroll-mt-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55%] bg-gradient-to-b from-transparent via-wood-dark/55 to-wood-dark/95" />

      <motion.div
        className="relative z-[1] mx-auto flex min-h-[115svh] max-w-[1600px] flex-col justify-end px-4 pb-20 pt-28 sm:px-8"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <motion.div variants={fadeUp}>
            <IntroPaper />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:-mt-16">
            <PracticeTablet />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-8 flex justify-end lg:absolute lg:bottom-24 lg:right-8">
          <StickyNote color="green" className="max-w-[210px]">
            <p className="handwritten text-base leading-snug text-ink">Open to collaboration.</p>
            <p className="handwritten text-sm text-ink-soft">Building what&apos;s next.</p>
          </StickyNote>
        </motion.div>
      </motion.div>

      <IdentityBadgeRow className="relative z-[2] bg-gradient-to-b from-transparent to-wood-dark/80 pb-10" />

      <motion.div
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-paper-cream/70">
          Scroll the studio ↓
        </span>
      </motion.div>
    </section>
  );
}
