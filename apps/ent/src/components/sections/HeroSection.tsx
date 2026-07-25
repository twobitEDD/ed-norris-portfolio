"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { clients, heroStats, site } from "@/data/site";
function ProductionCommandScreen() {
  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-5 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">Production Command</span>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-technology" />
          </div>
        </div>
        <div className="springboard-widget-grid mb-4" style={{ "--sb-cols": "2", "--sb-gap": "12px", "--sb-widget-rows": "1" } as React.CSSProperties}>
          {heroStats.map((stat) => (
            <div key={stat.label} className="springboard-widget flex flex-col justify-center px-3 py-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">{stat.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">Active clients</p>
          <p className="mt-1 text-sm text-white/90">{clients.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}

function PhoneAlertScreen() {
  return (
    <div className="ent-springboard-wallpaper relative flex h-full flex-col px-4 pb-8 pt-10">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-technology">Pipeline automated</p>
        <p className="mt-2 text-sm font-medium text-white">CO2True traceability sync complete</p>
        <p className="mt-1 text-xs text-white/55">18 hours reclaimed this week</p>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-amber">AI workflow</p>
        <p className="mt-2 text-sm text-white/85">Campaign assets generated &amp; approved</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
      <div className="ent-ambient-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <Paper variant="desk" torn className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">2bit Entertainment</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[2.65rem]">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-paper-cream transition hover:bg-ink/90"
              >
                Start a project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-ink transition hover:border-ink/30"
              >
                View our work
              </Link>
            </div>
            <p className="handwritten mt-6 text-lg text-ink-soft">same team, more output ✦</p>
          </Paper>
          <Polaroid
            caption="Shipped work"
            subtitle="CO2True · ERGO · Agency"
            gradient="linear-gradient(160deg, #1a2a3a, #4da4c9)"
            rotation={-6}
            className="absolute -bottom-8 -right-4 hidden sm:block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <DeviceViewer device="ipad" size="lg" glow="cyan" className="relative z-10">
            <ProductionCommandScreen />
          </DeviceViewer>
          <div className="absolute -bottom-6 -left-2 z-20 w-[38%] min-w-[140px] max-w-[200px] sm:-left-8">
            <DeviceViewer device="phone" size="md" glow="amber">
              <PhoneAlertScreen />
            </DeviceViewer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
