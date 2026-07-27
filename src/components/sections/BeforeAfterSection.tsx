"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { ProductStrip } from "@/components/ui/ProductStrip";
import { practiceProof } from "@/data/site";

const pipelineStages = ["Field data", "Product sale", "Impact report", "Credit workflow", "Public trust"];

function BeforeScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1418] to-[#0e0c10] p-4">
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-red-400/70">Before</p>
      <p className="mt-2 truncate font-mono text-[9px] text-white/40">Sustainability_Claims_FINAL.xlsx</p>
      <div className="mt-3 flex-1 space-y-1 overflow-hidden rounded-lg border border-white/5 bg-black/30 p-2">
        {[
          "Marketing claims ahead of data",
          "Disconnected field records",
          "No audit trail for credits",
          "Manual spreadsheet reporting",
          "Stakeholder trust at risk",
        ].map((row, i) => (
          <div key={row} className="flex items-center justify-between gap-2 border-b border-white/5 py-1.5 text-[9px]">
            <span className="truncate text-white/60">{row}</span>
            <span className={`shrink-0 font-mono text-[7px] uppercase ${i % 2 === 0 ? "text-red-400/80" : "text-amber/80"}`}>
              {i % 2 === 0 ? "Exposed" : "At risk"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-red-400/20 bg-red-950/40 px-3 py-2">
        <p className="font-mono text-[7px] uppercase tracking-wider text-red-300/60">Greenwashing risk</p>
        <p className="text-lg font-bold text-red-300">HIGH</p>
      </div>
    </div>
  );
}

function AfterScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0c1418] to-[#081018] p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-technology">With 2bitENT</p>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[7px] uppercase text-emerald-400">
          Auditable
        </span>
      </div>
      <p className="mt-2 font-mono text-[9px] text-white/50">Impact traceability</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {pipelineStages.map((stage) => (
          <span
            key={stage}
            className="flex items-center gap-0.5 rounded-md border border-technology/20 bg-technology/10 px-1.5 py-1 font-mono text-[7px] text-technology"
          >
            <Check className="h-2.5 w-2.5" />
            {stage}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-technology/25 bg-technology/10 px-3 py-2">
          <p className="font-display text-sm font-bold text-white">Field → customer</p>
          <p className="font-mono text-[7px] uppercase text-technology/80">connected data</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
          <p className="font-mono text-[7px] uppercase text-white/45">Reporting</p>
          <p className="mt-1 text-[10px] text-white/80">Biochar programs ✓</p>
          <p className="text-[10px] text-white/80">Credit issuance ✓</p>
        </div>
      </div>
      <div className="mt-auto rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-3 py-2">
        <p className="font-mono text-[7px] uppercase text-emerald-400/80">Public communication</p>
        <p className="text-lg font-bold text-emerald-300">Defensible</p>
      </div>
    </div>
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

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">Before</p>
            <DeviceViewer device="ipad" size="md" glow="none">
              <BeforeScreen />
            </DeviceViewer>
          </motion.div>

          <Paper compact className="mx-auto max-w-[200px] rotate-[-2deg]" pinned>
            <p className="handwritten text-center text-xl leading-snug text-ink">Understand impact before you market it</p>
            <div className="mt-3 flex justify-center gap-1 text-ink-soft">
              <Minus className="h-4 w-4 rotate-45" />
              <span className="font-mono text-[8px] uppercase tracking-wider">2bitENT</span>
              <Minus className="h-4 w-4 -rotate-45" />
            </div>
          </Paper>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-technology">
              With 2bitENT
            </p>
            <DeviceViewer device="ipad" size="md" glow="cyan">
              <AfterScreen />
            </DeviceViewer>
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
