"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { MessagePaperStack } from "@/components/ui/MessagePaperStack";
import { ProductStrip } from "@/components/ui/ProductStrip";
import { practiceProof } from "@/data/site";

const pipelineStages = ["Field data", "Product sale", "Impact report", "Credit workflow", "Public trust"];

function With2bitEntPanel() {
  return (
    <Paper variant="desk" className="with-2bitent-panel relative overflow-hidden border border-technology/20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-technology/8 via-transparent to-emerald-500/5" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-technology">With 2bitENT</p>
            <p className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Impact traceability</p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-emerald-700">
            Auditable
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {pipelineStages.map((stage) => (
            <span
              key={stage}
              className="inline-flex items-center gap-1 rounded-md border border-technology/25 bg-technology/10 px-2 py-1 font-mono text-[8px] uppercase tracking-wide text-ink"
            >
              <Check className="h-3 w-3 text-technology" strokeWidth={2.5} />
              {stage}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-technology/20 bg-technology/10 px-4 py-3">
            <p className="font-display text-base font-bold text-ink">Field → customer</p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-wider text-ink-soft">Connected, auditable data</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white/40 px-4 py-3">
            <p className="font-mono text-[8px] uppercase tracking-wider text-ink-soft">Reporting</p>
            <p className="mt-2 text-sm text-ink">Biochar programs ✓</p>
            <p className="text-sm text-ink">Credit issuance ✓</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3">
          <p className="font-mono text-[8px] uppercase tracking-wider text-emerald-800">Public communication</p>
          <p className="mt-1 font-display text-lg font-bold text-emerald-900">Defensible</p>
          <p className="mt-1 text-sm text-ink-soft">Grow with evidence stakeholders can trust.</p>
        </div>
      </div>
    </Paper>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="process" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">How we advise</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl lg:text-5xl">
            Not more tools.{" "}
            <span className="text-technology">Better flow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-screen-muted">
            We help businesses connect field operations, product sales, and environmental reporting — so
            growth doesn&apos;t outpace accountability.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1.15fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">Before</p>
            <MessagePaperStack />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col items-center gap-3"
          >
            <ArrowRight className="hidden h-5 w-5 text-technology lg:block" aria-hidden />
            <Paper compact className="max-w-[220px] rotate-[-2deg]" pinned>
              <p className="handwritten text-center text-xl leading-snug text-ink">
                Understand impact before you market it
              </p>
              <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                2bitENT advisory
              </p>
            </Paper>
            <ArrowRight className="hidden h-5 w-5 rotate-180 text-technology lg:block" aria-hidden />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <With2bitEntPanel />
          </motion.div>
        </div>

        <ProductStrip />

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {practiceProof.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className="group rounded-xl border border-white/5 bg-ent-slate/30 p-4 transition hover:border-technology/25"
            >
              <p className="font-display text-sm font-semibold text-screen-text group-hover:text-technology">
                {item.label}
              </p>
              <p className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-screen-muted">
                {item.detail}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
