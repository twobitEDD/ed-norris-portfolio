"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";

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

function FarmProofScreen() {
  return (
    <div className="trace-run-app ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5 sm:pt-3">
        <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-technology/90">With 2bitENT</p>

        <div className="mt-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br from-emerald-700 to-emerald-500 text-sm shadow-lg">
              🌱
            </div>
            <div>
              <p className="font-display text-sm font-bold text-white">FarmProof</p>
              <p className="font-mono text-[6px] uppercase tracking-wider text-white/45">Field → sale → report</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-wider text-emerald-300">
            <span className="trace-run-app__pulse h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Live
          </span>
        </div>

        <div className="mt-2.5 grid gap-1.5">
          <div className="rounded-lg border border-red-400/20 bg-red-950/40 px-2 py-1.5">
            <p className="font-mono text-[6px] uppercase tracking-wider text-red-300/80">Was</p>
            <p className="mt-0.5 text-[9px] leading-snug text-red-100/90 line-through decoration-red-300/60">
              Claims_FINAL_v4.xlsx — reconciling by hand
            </p>
          </div>
          <div className="flex items-center justify-center" aria-hidden>
            <ArrowRight className="h-3 w-3 rotate-90 text-technology" />
          </div>
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-2 py-1.5">
            <p className="font-mono text-[6px] uppercase tracking-wider text-emerald-300/90">Now</p>
            <p className="mt-0.5 text-[9px] font-medium leading-snug text-emerald-50">Pipeline runs automatically</p>
          </div>
        </div>

        <div className="mt-2.5 rounded-xl border border-white/8 bg-black/25 p-2">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p className="font-mono text-[6px] uppercase tracking-wider text-white/45">Auto pipeline</p>
            <span className="inline-flex items-center gap-0.5 font-mono text-[6px] uppercase tracking-wider text-technology">
              <RefreshCw className="h-2 w-2" strokeWidth={2.5} />
              No manual step
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className="rounded-lg border border-technology/20 bg-technology/10 px-1.5 py-1.5 text-center">
                  <div className="mx-auto mb-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/25">
                    <Check className="h-2 w-2 text-emerald-300" strokeWidth={3} />
                  </div>
                  <p className="font-mono text-[5px] uppercase tracking-wide text-white/50">{step.label}</p>
                  <p className="text-[8px] font-semibold leading-tight text-white">{step.value}</p>
                  <p className="text-[6px] text-technology">{step.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 space-y-1">
          <p className="font-mono text-[6px] uppercase tracking-wider text-white/40">Activity</p>
          {activityFeed.map((item) => (
            <div
              key={item.event}
              className="flex items-start justify-between gap-2 rounded-lg border border-white/5 bg-black/20 px-2 py-1"
            >
              <p className="text-[9px] leading-snug text-white/85">{item.event}</p>
              <span className="shrink-0 font-mono text-[5px] uppercase tracking-wider text-white/35">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function With2bitEntApp() {
  return (
    <div className="with-2bitent-device mx-auto w-full max-w-[min(100%,300px)] sm:max-w-[min(100%,360px)] lg:max-w-[min(100%,400px)]">
      <DeviceViewer device="ipad" size="sm" glow="cyan" className="rotate-[2deg]">
        <FarmProofScreen />
      </DeviceViewer>
    </div>
  );
}
