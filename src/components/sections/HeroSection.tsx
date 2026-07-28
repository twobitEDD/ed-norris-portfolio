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
import { heroBusinessApps, site } from "@/data/site";
import { cn } from "@/lib/cn";

function BusinessAppsScreen() {
  const gridStyle = springboardIconGridStyleProps(3, 12, 58);

  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4 pt-3">
        <p className="mb-0.5 text-sm font-medium text-white/90">Your business.</p>
        <p className="font-display text-base font-bold text-white sm:text-lg">Your software.</p>
        <p className="mb-4 mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/45">
          Custom apps — easier than you thought
        </p>
        <div className="springboard-icon-grid flex-1 content-start" style={gridStyle}>
          {heroBusinessApps.map((app) => (
            <div key={app.id} className="springboard-icon-button">
              <div
                className="springboard-icon-tile flex items-center justify-center rounded-[22%] text-lg shadow-lg"
                style={{ background: app.gradient }}
                title={app.detail}
              >
                <span className="text-white drop-shadow-sm">{app.glyph}</span>
              </div>
              <span className="springboard-icon-label text-center text-[8px] font-semibold leading-tight">
                {app.name}
              </span>
              <span className="text-center text-[6px] leading-tight text-white/50">{app.tagline}</span>
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

/** Tablet + desk note on lg+; tablet only on mobile. Same slot, simple swap. */
function HeroDevices() {
  return (
    <div className="hero-device-float relative mx-auto w-full max-w-[520px] lg:max-w-none">
      <div className="hidden lg:block">
        <DeviceViewer device="ipad" size="md" glow="cyan" className="rotate-[-2deg]">
          <BusinessAppsScreen />
        </DeviceViewer>
        <div className="absolute -bottom-4 -left-4 z-20 w-[38%] min-w-[140px] max-w-[200px] sm:-left-10">
          <HeroPitchNote />
        </div>
      </div>
      <div className="lg:hidden">
        <DeviceViewer device="ipad" size="sm" glow="cyan" className="mx-auto max-w-[300px] rotate-[-1deg]">
          <BusinessAppsScreen />
        </DeviceViewer>
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
