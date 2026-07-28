"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { ClientLogoBar } from "@/components/ui/ClientLogoBar";
import { DeskProps } from "@/components/ui/DeskProps";
import { HeroDashboardPaperFacts, HeroPhonePaperFacts } from "@/components/ui/HeroDeviceFacts";
import { ResponsiveDevicePaper } from "@/components/ui/ResponsiveDevicePaper";
import { heroHighlights, site } from "@/data/site";

function ClockWidget() {
  return (
    <div className="springboard-widget flex flex-col items-center justify-center px-3 py-4">
      <div className="relative h-14 w-14 rounded-full border-2 border-white/25">
        <div className="absolute left-1/2 top-1/2 h-5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-white/90" />
        <div className="absolute left-1/2 top-1/2 h-3.5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[55deg] rounded-full bg-technology" />
      </div>
      <p className="mt-2 font-mono text-[7px] uppercase tracking-wider text-white/45">Field ops</p>
    </div>
  );
}

function CalendarWidget() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="springboard-widget flex flex-col px-2 py-2">
      <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">May 2026</p>
      <div className="mt-1 grid grid-cols-7 gap-0.5">
        {days.map((d) => (
          <span key={d} className="text-center font-mono text-[6px] text-white/35">
            {d}
          </span>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`text-center font-mono text-[6px] ${i === 9 ? "rounded bg-technology/30 text-technology" : "text-white/50"}`}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

function TraceabilityWidget() {
  return (
    <div className="springboard-widget col-span-2 flex items-center gap-3 px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-technology/20 text-lg">✦</div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">CO2True</p>
        <p className="font-display text-sm font-bold text-white">Traceability live</p>
        <p className="text-[10px] text-technology">Field → sale → credit</p>
      </div>
    </div>
  );
}

function PipelineWidget() {
  const stages = ["Intake", "Verify", "Report", "Credit"];
  return (
    <div className="springboard-widget col-span-2 px-3 py-2">
      <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">Active pipeline</p>
      <div className="mt-2 flex gap-1">
        {stages.map((stage, i) => (
          <div key={stage} className="flex-1">
            <div
              className="h-1 rounded-full"
              style={{ background: i < 3 ? "var(--color-technology)" : "rgba(255,255,255,0.15)" }}
            />
            <p className="mt-1 truncate font-mono text-[6px] text-white/45">{stage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <p className="mb-1 text-sm font-medium text-white/90">CO2T Operations</p>
        <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">Impact Command</p>
        <div
          className="springboard-widget-grid mb-2"
          style={{ "--sb-cols": "3", "--sb-gap": "8px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <ClockWidget />
          {heroHighlights.slice(0, 2).map((stat) => (
            <div key={stat.label} className="springboard-widget flex flex-col justify-center px-2 py-2">
              <p className="font-mono text-[7px] uppercase tracking-wider text-white/45">{stat.label}</p>
              <p className="font-display text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        <div
          className="springboard-widget-grid mb-2"
          style={{ "--sb-cols": "2", "--sb-gap": "8px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <CalendarWidget />
          <TraceabilityWidget />
        </div>
        <div
          className="springboard-widget-grid flex-1"
          style={{ "--sb-cols": "2", "--sb-gap": "8px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <PipelineWidget />
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
        <p className="font-mono text-[7px] uppercase tracking-wider text-technology">CO2True pipeline</p>
        <p className="mt-1.5 text-xs font-medium text-white">Field batch verified</p>
        <p className="mt-0.5 text-[10px] text-white/55">Ready for credit issuance</p>
      </div>
      <div className="mt-4 space-y-2 px-1">
        {heroHighlights.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/8 bg-black/25 px-3 py-2">
            <p className="font-mono text-[7px] uppercase text-white/45">{item.label}</p>
            <p className="font-display text-sm font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <div className="ent-ambient-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="ent-studio-floor pointer-events-none absolute inset-x-0 bottom-0 h-1/3" aria-hidden />
      <DeskProps />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-technology">
              Sustainability technology · Production studio
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-screen-text sm:text-5xl lg:text-[3.4rem]">
              {site.headline}{" "}
              <span className="text-technology">{site.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-screen-muted sm:text-lg">{site.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#process"
                className="inline-flex items-center gap-2 rounded-full bg-technology px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-ent-black transition hover:brightness-110"
              >
                See how we advise
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-screen-text transition hover:border-white/30"
              >
                View our work
              </Link>
              <Link
                href={site.caseStudyUrl}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-wider text-screen-muted transition hover:border-technology/30 hover:text-technology"
              >
                CO2T case study
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            <div className="relative mt-10 max-w-md">
              <Paper variant="desk" torn className="rotate-[-1deg]">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Advisory brief</p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                  Understand your impact. Build systems you can audit. Communicate without greenwashing risk.
                </p>
                <p className="handwritten mt-3 text-xl text-technology">{site.tagline}</p>
                <p className="handwritten mt-1 text-base text-ink-soft">{site.secondaryTagline}</p>
              </Paper>
              <Polaroid
                caption="Evidence. Impact. Trust."
                imageSrc="/images/technology-advisory.jpg"
                rotation={8}
                size="sm"
                className="absolute -right-6 -top-4 hidden w-[140px] sm:block"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="hero-device-float relative z-10"
          >
            <ResponsiveDevicePaper
              desktop={{
                device: "ipad",
                size: "md",
                glow: "cyan",
                className: "rotate-[-2deg]",
                children: <DashboardScreen />,
              }}
              mobile={{
                device: "phone",
                size: "md",
                glow: "amber",
                className: "mx-auto max-w-[280px]",
                children: <PhoneAlertScreen />,
              }}
              desktopPaper={<HeroPhonePaperFacts />}
              mobilePaper={<HeroDashboardPaperFacts />}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 border-t border-white/5 pt-8"
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">
            Contract & program experience
          </p>
          <div className="mt-4">
            <ClientLogoBar />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
