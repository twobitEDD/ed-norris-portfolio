"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Paper } from "@/components/physical-ui/Paper";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { proofStats } from "@/data/site";

const pipelineStages = ["Intake", "Plan", "Create", "Review", "Deliver"];

function BeforeScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1418] to-[#0e0c10] p-4">
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-red-400/70">Before</p>
      <p className="mt-2 truncate font-mono text-[9px] text-white/40">Q2_Production_FINAL_v3.xlsx</p>
      <div className="mt-3 flex-1 space-y-1 overflow-hidden rounded-lg border border-white/5 bg-black/30 p-2">
        {["Asset review", "Client feedback", "Scope creep", "Manual QA", "Status meeting"].map((row, i) => (
          <div key={row} className="flex items-center justify-between gap-2 border-b border-white/5 py-1.5 text-[9px]">
            <span className="truncate text-white/60">{row}</span>
            <span className={`shrink-0 font-mono text-[7px] uppercase ${i % 2 === 0 ? "text-red-400/80" : "text-amber/80"}`}>
              {i % 2 === 0 ? "Blocked" : "In progress"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-red-400/20 bg-red-950/40 px-3 py-2">
        <p className="font-mono text-[7px] uppercase tracking-wider text-red-300/60">Team stress</p>
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
          AI Copilot active
        </span>
      </div>
      <p className="mt-2 font-mono text-[9px] text-white/50">Production Pipeline</p>
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
          <p className="font-display text-2xl font-bold text-white">18</p>
          <p className="font-mono text-[7px] uppercase text-technology/80">hrs / wk reclaimed</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
          <p className="font-mono text-[7px] uppercase text-white/45">Automations</p>
          <p className="mt-1 text-[10px] text-white/80">Brief → Shotlist ✓</p>
          <p className="text-[10px] text-white/80">Asset tagging ✓</p>
        </div>
      </div>
      <div className="mt-auto rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-3 py-2">
        <p className="font-mono text-[7px] uppercase text-emerald-400/80">Team workload</p>
        <p className="text-lg font-bold text-emerald-300">Balanced</p>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="process" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">How we work</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl lg:text-5xl">
            Not more tools.{" "}
            <span className="text-technology">Better flow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-screen-muted">
            We design AI-augmented systems that cut chaos, remove busywork, and multiply what your team
            ships — without replacing the people who make it great.
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
            <p className="handwritten text-center text-xl leading-snug text-ink">AI gives your team superpowers</p>
            <div className="mt-3 flex justify-center gap-1 text-ink-soft">
              <Minus className="h-4 w-4 rotate-45" />
              <span className="font-mono text-[8px] uppercase tracking-wider">2bitENT</span>
              <Minus className="h-4 w-4 -rotate-45" />
            </div>
          </Paper>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
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

        {/* Proof stats bar */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/5 pt-10 sm:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-2xl font-bold text-technology sm:text-3xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-screen-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
