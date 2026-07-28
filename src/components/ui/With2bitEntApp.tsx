"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { Paper } from "@/components/physical-ui/Paper";

const pipelineSteps = [
  { label: "Field log", value: "Batch #847", status: "Imported" },
  { label: "Sale", value: "Order #1204", status: "Linked" },
  { label: "Impact", value: "2.4 tCO₂e", status: "Calculated" },
  { label: "Report", value: "Q3 summary", status: "Ready" },
] as const;

const activityFeed = [
  { time: "Just now", event: "Stakeholder dashboard updated" },
  { time: "2m ago", event: "Credit workflow queued automatically" },
  { time: "5m ago", event: "Field batch matched to product sale" },
] as const;

function TraceRunScreen() {
  return (
    <div className="trace-run-app ent-springboard-wallpaper relative overflow-hidden rounded-2xl border border-white/10">
      <div className="relative px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br from-emerald-700 to-emerald-500 text-sm shadow-lg">
              🌱
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white sm:text-base">FarmProof</p>
              <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">Field → sale → report</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-1 font-mono text-[7px] uppercase tracking-wider text-emerald-300">
            <span className="trace-run-app__pulse h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Live sync
          </span>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-lg border border-red-400/20 bg-red-950/40 px-2.5 py-2">
            <p className="font-mono text-[6px] uppercase tracking-wider text-red-300/80">Was</p>
            <p className="mt-0.5 text-[10px] leading-snug text-red-100/90 line-through decoration-red-300/60">
              Claims_FINAL_v4.xlsx — reconciling by hand
            </p>
          </div>
          <ArrowRight className="mx-auto hidden h-3.5 w-3.5 text-technology sm:block" aria-hidden />
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-2">
            <p className="font-mono text-[6px] uppercase tracking-wider text-emerald-300/90">Now</p>
            <p className="mt-0.5 text-[10px] font-medium leading-snug text-emerald-50">
              Pipeline runs automatically
            </p>
          </div>
        </div>

        <div className="mt-3.5 rounded-xl border border-white/8 bg-black/25 p-2.5 sm:p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">Auto pipeline</p>
            <span className="inline-flex items-center gap-1 font-mono text-[7px] uppercase tracking-wider text-technology">
              <RefreshCw className="h-2.5 w-2.5" strokeWidth={2.5} />
              No manual step
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="relative"
              >
                <div className="rounded-lg border border-technology/20 bg-technology/10 px-1.5 py-2 text-center">
                  <div className="mx-auto mb-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/25">
                    <Check className="h-2.5 w-2.5 text-emerald-300" strokeWidth={3} />
                  </div>
                  <p className="font-mono text-[6px] uppercase tracking-wide text-white/50">{step.label}</p>
                  <p className="mt-0.5 text-[9px] font-semibold leading-tight text-white">{step.value}</p>
                  <p className="text-[7px] text-technology">{step.status}</p>
                </div>
                {index < pipelineSteps.length - 1 && (
                  <span
                    className="absolute -right-1 top-1/2 z-10 hidden h-px w-2 -translate-y-1/2 bg-technology/40 sm:block"
                    aria-hidden
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <p className="font-mono text-[7px] uppercase tracking-wider text-white/40">Activity</p>
          {activityFeed.map((item, index) => (
            <div
              key={item.event}
              className="flex items-start justify-between gap-2 rounded-lg border border-white/5 bg-black/20 px-2.5 py-1.5"
            >
              <p className="text-[10px] leading-snug text-white/85">{item.event}</p>
              <span className="shrink-0 font-mono text-[6px] uppercase tracking-wider text-white/35">
                {index === 0 ? item.time : item.time}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.14em] text-white/35">
          Custom app · built for how your team actually works
        </p>
      </div>
    </div>
  );
}

export function With2bitEntApp() {
  return (
    <Paper variant="desk" className="with-2bitent-panel relative overflow-hidden border border-technology/20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-technology/6 via-transparent to-emerald-500/5" aria-hidden />
      <div className="relative">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-technology">With 2bitENT</p>
        <p className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">
          We turn the annoying part into an app
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Field data, sales, and reporting — connected and automatic. No more spreadsheet reconciliation.
        </p>
        <div className="mt-4">
          <TraceRunScreen />
        </div>
      </div>
    </Paper>
  );
}
