"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Paper } from "@/components/physical-ui/Paper";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
const beforeItems = [
  "Manual handoffs between teams",
  "Spreadsheets tracking production",
  "Overloaded calendars, missed deadlines",
  "Same headcount, shrinking output",
];

const afterItems = [
  "AI-augmented production pipelines",
  "Automated QA and asset generation",
  "Hours reclaimed every week",
  "Same team — 2.4× effective output",
];

function BeforeScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1418] to-[#0e0c10] p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-red-400/80">Before</p>
      <div className="mt-4 space-y-2">
        {beforeItems.map((item) => (
          <div key={item} className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2">
            <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/70" />
            <span className="text-xs text-white/70">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-xl border border-red-400/20 bg-red-950/30 px-4 py-3">
        <p className="font-mono text-[8px] uppercase tracking-wider text-red-300/70">Team capacity</p>
        <p className="mt-1 text-2xl font-bold text-red-300">Overloaded</p>
      </div>
    </div>
  );
}

function AfterScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0c1418] to-[#081018] p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-technology">With 2bitENT</p>
      <div className="mt-4 space-y-2">
        {afterItems.map((item) => (
          <div key={item} className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-technology" />
            <span className="text-xs text-white/85">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-xl border border-technology/30 bg-technology/10 px-4 py-3">
        <p className="font-mono text-[8px] uppercase tracking-wider text-technology/80">Hours reclaimed</p>
        <p className="mt-1 text-2xl font-bold text-white">18 / week</p>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  return (
    <section id="approach" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">How we work</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl">
            AI gives your team superpowers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-screen-muted">
            We don&apos;t replace your people — we multiply what they can ship. Practical AI integration
            and production expertise that turns the same hours into more effective work.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <DeviceViewer device="ipad" size="md" glow="none">
              <BeforeScreen />
            </DeviceViewer>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-screen-muted">
              Traditional workflow
            </p>
          </motion.div>

          <Paper compact className="mx-auto max-w-xs lg:max-w-[200px]" pinned>
            <p className="handwritten text-center text-xl leading-snug text-ink">
              AI gives your team superpowers
            </p>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
              2bitENT production studio
            </p>
          </Paper>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <DeviceViewer device="ipad" size="md" glow="cyan">
              <AfterScreen />
            </DeviceViewer>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-technology">
              With 2bitENT
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
