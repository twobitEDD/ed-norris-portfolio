"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BatteryMedium,
  Briefcase,
  ChevronLeft,
  ExternalLink,
  Fish,
  Gamepad2,
  GitBranch,
  History,
  Leaf,
  Mail,
  Palette,
  Wifi,
} from "lucide-react";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { ContactAppContent } from "@/components/contact/ContactPhoneApp";
import { WorkAppSlideshow } from "@/components/work/WorkAppSlideshow";
import { DisciplineAppSlideshow } from "@/components/work/DisciplineAppSlideshow";
import { MicrobeSvgGlyph } from "@/components/games/microbeDraw";
import { contactPolaroidImage } from "@/data/career-images";
import { projects } from "@/data/projects";
import { creativeSlides, environmentalSlides } from "@/data/discipline-slides";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { tabletAppCategories, tabletApps, type TabletApp, type TabletAppId } from "@/data/tablet-apps";
import { STUDIO_SPRINGBOARD_COMPACT_WIDTH } from "@/design/studio-language";
import { cn } from "@/lib/cn";
import { useElementWidth } from "@/lib/use-element-width";
import {
  parseStudioAppFromLocation,
  scrollToStudioApps,
  STUDIO_APP_NAV_EVENT,
} from "@/lib/studio-app-nav";

const GameTablet = dynamic(
  () => import("@/components/games/GameTablet").then((m) => m.GameTablet),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[200px] items-center justify-center bg-[#040a14]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loading game…</p>
      </div>
    ),
  },
);

const StudioWorkMap = dynamic(
  () => import("@/components/map/StudioWorkMap").then((m) => m.StudioWorkMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center bg-[#0c0e14]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loading map…</p>
      </div>
    ),
  },
);

type StudioPhoneAppsProps = {
  className?: string;
};

const LAUNCHABLE_APP_IDS = new Set<TabletAppId>(
  tabletApps.filter((a) => a.inDevice || a.isGame).map((a) => a.id),
);

function AppIcon({ app, large }: { app: TabletApp; large?: boolean }) {
  if (app.id === "ergo") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Gamepad2 className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "fishfight") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Fish className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "microbe") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <MicrobeSvgGlyph className="h-[52%] w-[52%]" />
      </div>
    );
  }

  if (app.id === "work-map") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <GitBranch className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "work-history") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <History className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "work") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Briefcase className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "reach") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Mail className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "environmental") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Leaf className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.id === "creative") {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Palette className="h-[44%] w-[44%]" style={{ color: app.iconAccent }} strokeWidth={1.75} />
      </div>
    );
  }

  if (app.imageSrc) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Image src={app.imageSrc} alt="" fill className="object-cover object-center" sizes={large ? "80px" : "56px"} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-[22%] p-1.5 shadow-inner"
      style={{ background: app.iconBg }}
    >
      <span className="font-display text-[9px] font-bold uppercase tracking-wide text-white">
        {app.name.slice(0, 4)}
      </span>
      <span className="mt-0.5 font-mono text-[6px] uppercase tracking-wider" style={{ color: app.iconAccent }}>
        {app.domain.split(".")[0]}
      </span>
    </div>
  );
}

function DeviceAppHeader({
  title,
  onBack,
  trailing,
}: {
  title: string;
  onBack: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-3 py-2">
      <button
        type="button"
        onClick={onBack}
        className="flex h-8 min-w-[32px] items-center gap-0.5 rounded-full pr-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        aria-label="Back to home screen"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="font-mono text-[9px] uppercase tracking-wider">Home</span>
      </button>
      <span className="font-editorial text-xs font-medium text-white/90">{title}</span>
      <div className="flex min-w-[56px] justify-end">{trailing}</div>
    </div>
  );
}

function SpringboardStatusBar({ timeStr, dateShortStr }: { timeStr: string; dateShortStr: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-6 sm:px-5 sm:pt-7">
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Norris Studio</p>
        <p className="mt-0.5">
          <span className="font-semibold text-[11px] text-white/90 sm:text-xs">{timeStr}</span>
          <span className="ml-2 hidden text-[10px] text-white/50 sm:inline">{dateShortStr}</span>
        </p>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden>
        <Wifi className="h-3 w-3 text-white/60" strokeWidth={2.5} />
        <span className="font-mono text-[9px] font-medium text-white/55">5G</span>
        <BatteryMedium className="h-3.5 w-4 text-white/60" strokeWidth={2} />
      </div>
    </div>
  );
}

function SpringboardMiniWidgets({
  timeStr,
  dateShortStr,
  compact = false,
}: {
  timeStr: string;
  dateShortStr: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-3 space-y-2.5">
        <div className="flex aspect-[2.2/1] flex-col justify-center rounded-[18px] border border-white/[0.07] bg-black/20 px-3 py-2.5">
          <p className="font-editorial text-[1.35rem] font-semibold leading-none text-white/95">{timeStr}</p>
          <p className="mt-1 text-[10px] text-white/50">{dateShortStr}</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative aspect-square overflow-hidden rounded-[18px] border border-white/[0.07]">
            <Image
              src={contactPolaroidImage.src}
              alt={contactPolaroidImage.alt}
              fill
              className="object-cover object-center"
              sizes="96px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <p className="absolute bottom-2 left-2 font-mono text-[7px] uppercase tracking-[0.14em] text-white/70">
              Oregon
            </p>
          </div>
          <div className="flex aspect-square flex-col justify-end rounded-[18px] border border-white/[0.07] bg-white/[0.04] px-2.5 py-2.5">
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/40">Studio</p>
            <p className="mt-0.5 font-editorial text-lg font-semibold leading-none text-white/90">
              {tabletApps.length}
            </p>
            <p className="mt-0.5 text-[9px] text-white/45">apps</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 grid grid-cols-4 gap-3 sm:mb-5 sm:gap-3.5">
      <div className="col-span-2 flex aspect-[2/1] flex-col justify-center rounded-[20px] border border-white/[0.07] bg-black/20 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <p className="font-editorial text-[1.5rem] font-semibold leading-none text-white/95 sm:text-[1.75rem]">
          {timeStr}
        </p>
        <p className="mt-1 text-[11px] text-white/50 sm:text-xs">{dateShortStr}</p>
      </div>
      <div className="relative col-span-1 col-start-3 aspect-square overflow-hidden rounded-[20px] border border-white/[0.07]">
        <Image
          src={contactPolaroidImage.src}
          alt={contactPolaroidImage.alt}
          fill
          className="object-cover object-center"
          sizes="120px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <p className="absolute bottom-2 left-2 font-mono text-[7px] uppercase tracking-[0.14em] text-white/70 sm:left-2.5 sm:text-[8px]">
          Oregon
        </p>
      </div>
      <div className="col-span-1 col-start-4 flex aspect-square flex-col justify-end rounded-[20px] border border-white/[0.07] bg-white/[0.04] px-2.5 py-2.5 sm:px-3 sm:py-3">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/40 sm:text-[8px]">Studio</p>
        <p className="mt-0.5 font-editorial text-lg font-semibold leading-none text-white/90 sm:text-xl">
          {tabletApps.length}
        </p>
        <p className="mt-0.5 text-[9px] text-white/45 sm:text-[10px]">apps</p>
      </div>
    </div>
  );
}

function AppIconGrid({
  onOpenApp,
  compact = false,
}: {
  onOpenApp: (id: TabletAppId) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col justify-start",
        compact ? "space-y-4" : "space-y-5 sm:space-y-6",
      )}
    >
      {tabletAppCategories.map((category) => {
        const apps = tabletApps.filter((app) => app.category === category.id);
        if (apps.length === 0) return null;

        return (
          <div key={category.id}>
            <p
              className={cn(
                "mb-2.5 px-0.5 font-mono uppercase tracking-[0.2em] text-white/35",
                compact ? "text-[7px]" : "mb-3 text-[8px] sm:text-[9px]",
              )}
            >
              {category.label}
            </p>
            <div
              className={cn(
                "grid",
                compact
                  ? "grid-cols-3 gap-x-3 gap-y-4"
                  : "grid-cols-4 gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6",
              )}
            >
              {apps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onOpenApp(app.id)}
                  className="group flex flex-col items-center gap-1.5 rounded-xl p-0.5 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:gap-2"
                  aria-label={`Open ${app.name}`}
                >
                  <div
                    className={cn(
                      "aspect-square shadow-[0_3px_10px_rgba(0,0,0,0.4)] transition group-hover:shadow-[0_5px_16px_rgba(0,0,0,0.5)]",
                      compact ? "w-[min(100%,68px)]" : "w-[min(100%,84px)] sm:w-[min(100%,92px)]",
                    )}
                  >
                    <AppIcon app={app} large={!compact} />
                  </div>
                  <span
                    className={cn(
                      "truncate text-center font-medium leading-tight text-white/90",
                      compact
                        ? "max-w-[72px] text-[9px]"
                        : "max-w-[92px] text-[10px] sm:max-w-[100px] sm:text-[11px]",
                    )}
                  >
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppShowcaseInDevice({ app, onBack }: { app: TabletApp; onBack: () => void }) {
  const project = app.projectSlug ? projects.find((p) => p.slug === app.projectSlug) : null;
  const heroImage = project?.images?.[0] ?? (app.imageSrc ? { src: app.imageSrc, alt: app.name } : null);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title={app.name} onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <div className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
            <AppIcon app={app} large />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">{app.domain}</p>
            <h2 className="mt-0.5 font-editorial text-lg font-semibold text-white">{app.name}</h2>
            <p className="mt-0.5 text-sm font-medium text-white/65">{app.tagline}</p>
          </div>
        </div>

        {heroImage && (
          <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
            <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover" sizes="400px" />
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed text-white/85">{app.description}</p>

        {project?.challenge && (
          <div className="mt-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Challenge</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{project.challenge}</p>
          </div>
        )}

        {project?.outcomes && project.outcomes.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Outcomes</p>
            <ul className="mt-2 space-y-1.5">
              {project.outcomes.slice(0, 4).map((outcome) => (
                <li key={outcome} className="flex gap-2 text-sm leading-snug text-white/75">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project?.metrics && project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <p className="font-mono text-[8px] uppercase tracking-wider text-white/40">{metric.label}</p>
                <p className="mt-0.5 font-editorial text-sm font-semibold text-white/90">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {app.href && (
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              {app.isGame ? "Play" : "Visit"} {app.domain}
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          )}
          {app.projectSlug && (
            <Link
              href={`/projects/${app.projectSlug}`}
              className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 px-4 text-sm text-white/70 transition hover:border-white/20 hover:text-white/90"
            >
              Case study →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkMapInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title="Work Map" onBack={onBack} />
      <div className="shrink-0 border-b border-white/6 px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="handwritten text-sm leading-snug text-[#d4b0ff]/90">One arc, not six careers.</p>
        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">Employment overview</p>
        <h3 className="mt-0.5 font-editorial text-sm font-medium text-white/90">Where I&apos;ve worked.</h3>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <StudioWorkMap mode="overview" />
      </div>
      <p className="shrink-0 px-4 pt-2 text-center">
        <Link
          href="/map"
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white/80"
        >
          Unfold detailed work map →
        </Link>
      </p>
    </div>
  );
}

function WorkHistoryInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title="Work History" onBack={onBack} />
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <TimelinePaper compact />
      </div>
      <p className="shrink-0 px-4 pt-2 text-center">
        <Link
          href="/timeline"
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white/80"
        >
          Full timeline page →
        </Link>
      </p>
    </div>
  );
}

function EnvironmentalInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title="Environmental" onBack={onBack} />
      <div className="shrink-0 border-b border-white/6 px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="handwritten text-sm leading-snug text-[#7ee8a8]/90">Built from Nature. Backed by Science.</p>
        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">Environmental practice</p>
        <h3 className="mt-0.5 font-editorial text-sm font-medium text-white/90">
          Carbon, soil stewardship &amp; field ops.
        </h3>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <DisciplineAppSlideshow slides={environmentalSlides} ariaLabel="Environmental practice highlights" />
      </div>
      <p className="shrink-0 px-4 pt-2 text-center">
        <Link
          href="/work#environmental"
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white/80"
        >
          Full environmental work →
        </Link>
      </p>
    </div>
  );
}

function CreativeInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title="Creative" onBack={onBack} />
      <div className="shrink-0 border-b border-white/6 px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="handwritten text-sm leading-snug text-[#c9a0ff]/90">Games, interactive media &amp; storytelling.</p>
        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">Creative practice</p>
        <h3 className="mt-0.5 font-editorial text-sm font-medium text-white/90">
          Platforms, brands &amp; participation.
        </h3>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <DisciplineAppSlideshow slides={creativeSlides} ariaLabel="Creative practice highlights" />
      </div>
      <p className="shrink-0 px-4 pt-2 text-center">
        <Link
          href="/work#creative"
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white/80"
        >
          Full creative work →
        </Link>
      </p>
    </div>
  );
}

function WorkInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col pb-6">
      <DeviceAppHeader title="Work" onBack={onBack} />
      <div className="shrink-0 border-b border-white/6 px-4 py-2 sm:px-5 sm:py-2.5">
        <p className="handwritten text-sm leading-snug text-[#9ecfff]/90">Work that solves real problems.</p>
        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">Portfolio highlights</p>
        <h3 className="mt-0.5 font-editorial text-sm font-medium text-white/90">
          Environmental, games &amp; infrastructure.
        </h3>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <WorkAppSlideshow />
      </div>
      <p className="shrink-0 px-4 pt-2 text-center">
        <Link
          href="/work"
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition hover:text-white/80"
        >
          View all work →
        </Link>
      </p>
    </div>
  );
}

function ReachInDevice({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f5f0e4]">
      <div className="min-h-0 flex-1 overflow-hidden px-3 pb-4 pt-2 sm:px-4 sm:pb-5 sm:pt-3">
        <ContactAppContent layout="tablet" onExit={onBack} />
      </div>
    </div>
  );
}

function renderInDeviceScreen(
  screen: TabletAppId,
  handlers: { onBack: () => void; onExpandGame: () => void },
) {
  if (screen === "work-map") {
    return <WorkMapInDevice onBack={handlers.onBack} />;
  }

  if (screen === "work-history") {
    return <WorkHistoryInDevice onBack={handlers.onBack} />;
  }

  if (screen === "work") {
    return <WorkInDevice onBack={handlers.onBack} />;
  }

  if (screen === "environmental") {
    return <EnvironmentalInDevice onBack={handlers.onBack} />;
  }

  if (screen === "creative") {
    return <CreativeInDevice onBack={handlers.onBack} />;
  }

  if (screen === "reach") {
    return <ReachInDevice onBack={handlers.onBack} />;
  }

  if (screen === "microbe") {
    return (
      <>
        <DeviceAppHeader
          title="Microbe Explorer"
          onBack={handlers.onBack}
          trailing={
            <button
              type="button"
              onClick={handlers.onExpandGame}
              className="rounded-full border border-[#3b9eff]/35 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#7ec8ff] transition hover:bg-[#3b9eff]/15"
            >
              Expand
            </button>
          }
        />
        <div className="relative min-h-[200px] flex-1 overflow-hidden">
          <GameTablet overlay className="h-full w-full" />
        </div>
      </>
    );
  }

  const app = tabletApps.find((a) => a.id === screen);
  if (app?.inDevice) {
    return <AppShowcaseInDevice app={app} onBack={handlers.onBack} />;
  }

  return null;
}

export function StudioPhoneApps({ className }: StudioPhoneAppsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useElementWidth(containerRef);
  const [screen, setScreen] = useState<"home" | TabletAppId>("home");
  const [gameOpen, setGameOpen] = useState(false);
  const [gameFullscreen, setGameFullscreen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const syncFromLocation = (scrollToSection = false) => {
      const app = parseStudioAppFromLocation();
      if (app && LAUNCHABLE_APP_IDS.has(app)) {
        setScreen(app);
        setGameOpen(app === "microbe");
        setGameFullscreen(false);
        if (scrollToSection) scrollToStudioApps();
      }
    };

    const hasGameHash = window.location.hash.startsWith("#game");
    syncFromLocation(hasGameHash);

    const onNavigate = () => syncFromLocation(false);
    window.addEventListener("hashchange", onNavigate);
    window.addEventListener(STUDIO_APP_NAV_EVENT, onNavigate);
    return () => {
      window.removeEventListener("hashchange", onNavigate);
      window.removeEventListener(STUDIO_APP_NAV_EVENT, onNavigate);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goHome = useCallback(() => {
    setScreen("home");
    setGameOpen(false);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    let changed = false;
    if (url.searchParams.has("app")) {
      url.searchParams.delete("app");
      changed = true;
    }
    if (url.hash.includes("?")) {
      const [hashPath, hashQuery] = url.hash.split("?");
      const hashParams = new URLSearchParams(hashQuery ?? "");
      if (hashParams.has("app")) {
        hashParams.delete("app");
        const nextQuery = hashParams.toString();
        url.hash = nextQuery ? `${hashPath}?${nextQuery}` : hashPath;
        changed = true;
      }
    }
    if (changed) {
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  }, []);

  const openApp = useCallback((id: TabletAppId) => {
    const app = tabletApps.find((a) => a.id === id);
    if (!app) return;
    setScreen(id);
    setGameOpen(Boolean(app.isGame));
    setGameFullscreen(false);
  }, []);

  const openFullscreenGame = useCallback(() => {
    setGameFullscreen(true);
    setGameOpen(true);
    setClosing(false);
  }, []);

  const closeGame = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setGameOpen(false);
      setGameFullscreen(false);
      setScreen("home");
      setClosing(false);
    }, 320);
  }, []);

  useEffect(() => {
    if (!gameOpen || !gameFullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGame();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeGame, gameFullscreen, gameOpen]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const dateShortStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  const isAppOpen = screen !== "home";
  const inDeviceContent =
    isAppOpen &&
    renderInDeviceScreen(screen, { onBack: goHome, onExpandGame: openFullscreenGame });

  const isCompactDevice =
    containerWidth !== null
      ? containerWidth < STUDIO_SPRINGBOARD_COMPACT_WIDTH
      : typeof window !== "undefined" && window.innerWidth < STUDIO_SPRINGBOARD_COMPACT_WIDTH;

  return (
    <>
      <div ref={containerRef} className={cn("w-full", className)}>
        <DeviceViewer
          device={isCompactDevice ? "phone" : "ipad"}
          size="lg"
          glow="cyan"
          mode="launcher"
          className="studio-springboard-device w-full transition-[max-width] duration-300 ease-out"
        >
          <div className="studio-springboard-wallpaper relative flex h-full min-h-0 flex-col">
            {inDeviceContent ? (
              <div
                className={cn(
                  "relative z-10 flex min-h-0 flex-1 flex-col pb-5",
                  screen === "microbe"
                    ? "bg-[#040a14]/95"
                    : screen === "reach"
                      ? "bg-[#f5f0e4]"
                      : "bg-[#0c0e14]/95",
                )}
              >
                {inDeviceContent}
              </div>
            ) : (
              <>
                <SpringboardStatusBar timeStr={timeStr} dateShortStr={dateShortStr} />

                <div
                  className={cn(
                    "relative z-[1] flex min-h-0 flex-1 flex-col justify-start overflow-y-auto pb-6 pt-2",
                    isCompactDevice ? "px-3 pb-5 pt-1.5" : "px-4 pb-6 pt-2 sm:px-6 sm:pb-7 sm:pt-3",
                  )}
                >
                  <SpringboardMiniWidgets
                    timeStr={timeStr}
                    dateShortStr={dateShortStr}
                    compact={isCompactDevice}
                  />
                  <AppIconGrid onOpenApp={openApp} compact={isCompactDevice} />
                </div>
              </>
            )}
          </div>
        </DeviceViewer>
      </div>

      {gameOpen && gameFullscreen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Microbe Explorer arcade game"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            aria-label="Close game"
            onClick={closeGame}
          />
          <div className="relative z-10 w-full max-w-[min(96vw,920px)]">
            <GameTablet
              arcade
              onClose={closeGame}
              closing={closing}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      )}
    </>
  );
}

/** @deprecated Use StudioPhoneApps */
export const StudioTabletApps = StudioPhoneApps;
