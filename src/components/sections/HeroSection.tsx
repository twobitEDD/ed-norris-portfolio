"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { ClientLogoBar } from "@/components/ui/ClientLogoBar";
import { DeskProps } from "@/components/ui/DeskProps";
import { springboardIconGridStyleProps } from "@/design/ent-language";
import { heroBusinessApps, heroHighlights, site } from "@/data/site";
import { cn } from "@/lib/cn";

function ClockWidget() {
  return (
    <div className="springboard-widget flex flex-col items-center justify-center px-2 py-2.5 sm:px-3 sm:py-4">
      <div className="relative h-10 w-10 rounded-full border-2 border-white/25 sm:h-12 sm:w-12">
        <div className="absolute left-1/2 top-1/2 h-4 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-white/90 sm:h-5" />
        <div className="absolute left-1/2 top-1/2 h-3 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rotate-[55deg] rounded-full bg-technology sm:h-3.5" />
      </div>
      <p className="mt-1.5 font-mono text-[6px] uppercase tracking-wider text-white/45 sm:mt-2 sm:text-[7px]">
        Focus time
      </p>
    </div>
  );
}

function HeroStatWidget({ label, value }: { label: string; value: string }) {
  return (
    <div className="springboard-widget flex flex-col justify-center px-2 py-2 sm:px-2.5 sm:py-2">
      <p className="font-mono text-[6px] uppercase tracking-wider text-white/45 sm:text-[7px]">{label}</p>
      <p className="font-display text-base font-bold text-white sm:text-lg">{value}</p>
    </div>
  );
}

function OwnerAppsWidget() {
  return (
    <div className="springboard-widget col-span-3 flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-technology/20 text-sm sm:h-10 sm:w-10 sm:text-lg">
        ✦
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[6px] uppercase tracking-wider text-white/45 sm:text-[7px]">Built for you</p>
        <p className="font-display text-xs font-bold text-white sm:text-sm">Custom apps, not cookie-cutter SaaS</p>
        <p className="text-[9px] text-technology sm:text-[10px]">Your workflow · Your data · Your brand</p>
      </div>
    </div>
  );
}

function BusinessAppsScreen() {
  const gridStyle = springboardIconGridStyleProps(3, 10, 52);

  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
        <p className="mb-0.5 text-xs font-medium text-white/90 sm:text-sm">Your business.</p>
        <p className="font-display text-sm font-bold text-white sm:text-lg">Your software.</p>
        <p className="mb-2.5 mt-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-white/45 sm:mb-3 sm:mt-1 sm:text-[7px]">
          Custom apps — easier than you thought
        </p>

        <div
          className="springboard-widget-grid mb-2.5 sm:mb-3"
          style={{ "--sb-cols": "3", "--sb-gap": "6px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <ClockWidget />
          {heroHighlights.slice(0, 2).map((stat) => (
            <HeroStatWidget key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div
          className="springboard-widget-grid mb-2.5 sm:mb-3"
          style={{ "--sb-cols": "3", "--sb-gap": "6px", "--sb-widget-rows": "1" } as React.CSSProperties}
        >
          <OwnerAppsWidget />
        </div>

        <div className="springboard-icon-grid min-h-0 flex-1 content-start" style={gridStyle}>
          {heroBusinessApps.map((app) => (
            <div key={app.id} className="springboard-icon-button">
              <div
                className="springboard-icon-tile flex items-center justify-center rounded-[22%] text-base shadow-lg sm:text-lg"
                style={{ background: app.gradient }}
                title={app.detail}
              >
                <span className="text-white drop-shadow-sm">{app.glyph}</span>
              </div>
              <span className="springboard-icon-label text-center text-[7px] font-semibold leading-tight sm:text-[8px]">
                {app.name}
              </span>
              <span className="hidden text-center text-[6px] leading-tight text-white/50 sm:block">
                {app.tagline}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroPitchNote({ className }: { className?: string }) {
  return (
    <Paper variant="desk" torn compact className={cn("rotate-[6deg]", className)}>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">For owners</p>
      <p className="mt-2 font-display text-sm font-semibold leading-snug text-ink">
        Software shaped around your workflow — not another subscription you bend around.
      </p>
      <p className="handwritten mt-2.5 text-lg leading-snug text-technology">Easier than you knew was possible.</p>
    </Paper>
  );
}

/** Tablet + desk note on lg+; stacked note below on smaller screens. */
function HeroDevices() {
  return (
    <div className="hero-device-float relative mx-auto w-full max-w-[min(100%,420px)] sm:max-w-[480px] md:max-w-[540px] lg:max-w-none">
      <div className="hidden lg:block">
        <DeviceViewer device="ipad" size="md" glow="cyan" className="rotate-[-2deg]">
          <BusinessAppsScreen />
        </DeviceViewer>
        <div className="absolute -bottom-4 -left-4 z-20 w-[38%] min-w-[140px] max-w-[200px] sm:-left-10">
          <HeroPitchNote />
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 lg:hidden">
        <DeviceViewer device="ipad" size="sm" glow="cyan" className="w-full rotate-[-1deg]">
          <BusinessAppsScreen />
        </DeviceViewer>
        <div className="w-full max-w-[min(100%,300px)] sm:max-w-[340px]">
          <HeroPitchNote className="rotate-[-1deg]" />
        </div>
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
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
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
            className="relative mx-auto w-full"
          >
            <HeroDevices />
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
