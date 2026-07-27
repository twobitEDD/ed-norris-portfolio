"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { aboutTimeline, site } from "@/data/site";

export function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">About</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl">
            From field programs to{" "}
            <span className="text-technology">defensible impact.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-screen-muted">
            Nearly twenty years building software people use — from Nintendo Wii credits to VP Operations at
            CO2T.earth. We connect product vision, environmental accountability, and production craft so
            businesses can advance without outrunning their evidence.
          </p>

          <Paper variant="desk" className="mt-10 px-6 py-8 sm:px-10">
            <div className="grid gap-8 sm:grid-cols-3">
              {aboutTimeline.map((item) => (
                <div key={item.title} className="border-b border-ink/8 pb-6 last:border-0 sm:border-0 sm:pb-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-technology">{item.period}</p>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
              ))}
            </div>
            <Link
              href={site.caseStudyUrl}
              target="_blank"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-technology transition hover:brightness-110"
            >
              View CO2T case study on 2bitDEV
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Paper>
        </motion.div>
      </div>
    </section>
  );
}
