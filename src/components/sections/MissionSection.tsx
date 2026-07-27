"use client";

import { motion } from "framer-motion";
import { Paper } from "@/components/physical-ui/Paper";
import { missionPoints, site } from "@/data/site";

export function MissionSection() {
  return (
    <section className="relative -mt-4 px-4 pb-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative"
        >
          <div className="absolute -left-2 top-6 z-10 hidden h-8 w-8 rotate-[-12deg] rounded-sm border-2 border-zinc-400/60 bg-zinc-300/20 sm:block" aria-hidden />
          <Paper torn className="mission-paper mx-auto max-w-4xl px-6 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="handwritten text-lg text-ink-soft">Advisors who build, not just recommend.</p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-ink sm:text-4xl">
                  Whatever your business needs to{" "}
                  <span className="relative inline-block">
                    grow responsibly
                    <svg
                      className="absolute -bottom-1 left-0 w-full text-technology"
                      viewBox="0 0 160 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4 12 C 40 4, 70 14, 156 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="handwritten mt-4 text-lg text-technology/90">{site.secondaryTagline}</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                  With nonprofit and for-profit organizations, we build software and systems that make a
                  sustainable future possible — from carbon traceability at CO2True to brand and production
                  work for Google, adidas, and Dell.
                </p>
                <ul className="mt-8 space-y-4">
                  {missionPoints.map((point) => (
                    <li key={point.title} className="flex gap-3 border-b border-ink/5 pb-4 last:border-0 last:pb-0">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-technology" />
                      <p className="text-sm text-ink">
                        <span className="font-semibold">{point.title}</span>{" "}
                        <span className="text-ink-soft">{point.detail}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Paper>
        </motion.div>
      </div>
    </section>
  );
}
