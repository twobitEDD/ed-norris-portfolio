"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { clients, heroStats, site } from "@/data/site";

function ClockWidget() {
  return (
    <div className="springboard-widget flex flex-col items-center justify-center px-3 py-4">
      <div className="relative h-14 w-14 rounded-full border-2 border-white/25">
        <div className="absolute left-1/2 top-1/2 h-5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-white/90" />
        <div className="absolute left-1/2 top-1/2 h-3.5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[55deg] rounded-full bg-technology" />
      </div>
      <p className="mt-2 font-mono text-[7px] uppercase tracking-wider text-white/45">Focus time</p>
    </div>
  );
}

function AiStudioWidget() {
  return (
    <div className="springboard-widget col-span-2 flex items-center gap-3 px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-technology/20 text-lg">✦</div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">AI Studio</p>
        <p className="font-display text-2xl font-bold text-white">2.4×</p>
        <p className="text-[10px] text-technology">↑ 24% effective hours</p>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <p className="mb-1 text-sm font-medium text-white/90">Good morning, Team.</p>
        <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">Production Command</p>
        <div
          className="springboard-widget-grid mb-3"
          style={{ "--sb-cols": "3", "--sb-gap": "8px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <ClockWidget />
          {heroStats.slice(0, 2).map((stat) => (
            <div key={stat.label} className="springboard-widget flex flex-col justify-center px-2 py-2">
              <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">{stat.label}</p>
              <p className="font-display text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        <div
          className="springboard-widget-grid flex-1"
          style={{ "--sb-cols": "2", "--sb-gap": "8px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <AiStudioWidget />
        </div>
      </div>
    </div>
  );
}

function PhoneAlertScreen() {
  return (
    <div className="ent-springboard-wallpaper relative flex h-full flex-col px-3 pb-6 pt-8">
      <p className="text-center font-display text-lg font-semibold text-white">9:41</p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-md">
        <p className="font-mono text-[7px] uppercase tracking-wider text-technology">Pipeline automated</p>
        <p className="mt-1.5 text-xs font-medium text-white">CO2True sync complete</p>
        <p className="mt-0.5 text-[10px] text-white/55">18 hrs reclaimed this week</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <div className="ent-ambient-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="ent-studio-floor pointer-events-none absolute inset-x-0 bottom-0 h-1/3" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          {/* Copy — direct, on dark surface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-technology">
              AI-driven production · Human-led impact
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-screen-text sm:text-5xl lg:text-[3.25rem]">
              {site.headline.split("intelligent systems.")[0]}
              <span className="text-technology">intelligent systems.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-screen-muted sm:text-lg">{site.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#process"
                className="inline-flex items-center gap-2 rounded-full bg-technology px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-ent-black transition hover:brightness-110"
              >
                See how it works
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-screen-text transition hover:border-white/30"
              >
                View our work
              </Link>
            </div>

            {/* Project brief paper — tactile accent */}
            <div className="relative mt-10 max-w-md">
              <Paper variant="desk" torn className="rotate-[-1deg]">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Project brief</p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                  Build software people love. Ship on time. Make impact.
                </p>
                <p className="handwritten mt-3 text-xl text-technology">{site.tagline}</p>
              </Paper>
              <Polaroid
                caption="Ideas. Code. Impact."
                gradient="linear-gradient(160deg, #1a2a3a, #4da4c9)"
                rotation={8}
                size="sm"
                className="absolute -right-6 -top-4 hidden w-[140px] sm:block"
              />
            </div>
          </motion.div>

          {/* Floating devices — overlapping composition */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <div className="hero-device-float relative">
              <DeviceViewer device="ipad" size="md" glow="cyan" className="rotate-[-2deg]">
                <DashboardScreen />
              </DeviceViewer>
              <div className="absolute -bottom-4 -left-4 z-20 w-[34%] min-w-[120px] max-w-[170px] sm:-left-10">
                <DeviceViewer device="phone" size="sm" glow="amber" className="rotate-[6deg]">
                  <PhoneAlertScreen />
                </DeviceViewer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Client trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 border-t border-white/5 pt-8"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">
            Trusted by innovative teams
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            {clients.map((client) => (
              <span key={client} className="font-display text-sm font-semibold tracking-wide text-white/35">
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
