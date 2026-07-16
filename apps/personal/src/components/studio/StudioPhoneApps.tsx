"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { tabletApps, type TabletApp, type TabletAppId } from "@/data/tablet-apps";
import {
  resolveSpringboardDeviceTier,
  SPRINGBOARD_ICON_GRID,
  springboardIconGridStyleProps,
  type SpringboardDeviceTier,
} from "@/design/studio-language";
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

function AppIcon({ app, imageSizes = "56px" }: { app: TabletApp; imageSizes?: string }) {
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
        <Image src={app.imageSrc} alt="" fill className="object-cover object-center" sizes={imageSizes} />
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

function SpringboardStatusBar({
  timeStr,
  compact = false,
}: {
  timeStr: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative z-[2] flex shrink-0 items-center justify-between",
        compact ? "px-[22px] pb-0.5 pt-11" : "px-5 pb-1 pt-12 sm:px-6 sm:pt-[3.25rem]",
      )}
    >
      <p
        className={cn(
          "font-semibold tabular-nums text-white",
          compact ? "text-[13px]" : "text-sm sm:text-[15px]",
        )}
      >
        {timeStr}
      </p>
      <div className="flex items-center gap-1" aria-hidden>
        <Wifi className={cn("text-white", compact ? "h-3 w-3" : "h-3.5 w-3.5")} strokeWidth={2.5} />
        <span className={cn("font-semibold text-white", compact ? "text-[10px]" : "text-[11px]")}>
          5G
        </span>
        <BatteryMedium
          className={cn("text-white", compact ? "h-3.5 w-4" : "h-4 w-4.5")}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

function SpringboardMiniWidgets({
  timeStr,
  dateShortStr,
  tier,
  compact = false,
}: {
  timeStr: string;
  dateShortStr: string;
  tier: SpringboardDeviceTier;
  compact?: boolean;
}) {
  const grid = SPRINGBOARD_ICON_GRID[tier];
  const gridStyle = springboardIconGridStyleProps(tier);

  return (
    <div className="springboard-widget-grid" style={gridStyle}>
      <div
        className={cn(
          "springboard-widget flex flex-col justify-center",
          compact && "springboard-widget--compact",
        )}
        style={{ gridColumn: `span ${grid.widgetClockSpan}` }}
      >
        <div className={cn("flex flex-col justify-center", compact ? "px-2.5 py-2" : "px-4 py-3.5 sm:px-5 sm:py-4")}>
          <p
            className={cn(
              "font-semibold tabular-nums leading-none text-white",
              compact ? "text-[1.35rem]" : "text-[2rem] sm:text-[2.25rem]",
            )}
          >
            {timeStr}
          </p>
          <p className={cn("mt-0.5 text-white/55", compact ? "text-[9px]" : "text-[11px] sm:text-xs")}>
            {dateShortStr}
          </p>
        </div>
      </div>
      <div
        className={cn("springboard-widget relative aspect-square", compact && "springboard-widget--compact")}
        style={{ gridColumn: `span ${grid.widgetPhotoSpan}` }}
      >
        <Image
          src={contactPolaroidImage.src}
          alt={contactPolaroidImage.alt}
          fill
          className="object-cover object-center"
          sizes={compact ? "52px" : "140px"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <p
          className={cn(
            "absolute bottom-1.5 left-2 font-medium text-white/80",
            compact ? "text-[7px]" : "text-[9px] sm:text-[10px]",
          )}
        >
          Oregon
        </p>
      </div>
      <div
        className={cn(
          "springboard-widget flex aspect-square flex-col justify-end",
          compact && "springboard-widget--compact",
        )}
        style={{ gridColumn: `span ${grid.widgetStudioSpan}` }}
      >
        <div className={cn(compact ? "px-2 py-2" : "px-3 py-3 sm:px-3.5 sm:py-3.5")}>
          <p className={cn("font-medium text-white/45", compact ? "text-[7px]" : "text-[9px] sm:text-[10px]")}>
            Norris Studio
          </p>
          <p
            className={cn(
              "font-semibold tabular-nums leading-none text-white",
              compact ? "text-lg" : "text-2xl sm:text-[1.65rem]",
            )}
          >
            {tabletApps.length}
          </p>
          <p className={cn("text-white/45", compact ? "text-[7px]" : "text-[9px] sm:text-[10px]")}>apps</p>
        </div>
      </div>
    </div>
  );
}

function AppIconGrid({
  onOpenApp,
  tier,
}: {
  onOpenApp: (id: TabletAppId) => void;
  tier: SpringboardDeviceTier;
}) {
  const grid = SPRINGBOARD_ICON_GRID[tier];
  const gridStyle = springboardIconGridStyleProps(tier);

  return (
    <div className={cn("w-full", grid.containerClass)}>
      <div className="springboard-icon-grid" style={gridStyle}>
        {tabletApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpenApp(app.id)}
            className="springboard-icon-button group rounded-lg p-0 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={`Open ${app.name}`}
          >
            <div className="springboard-icon-tile shadow-[0_2px_8px_rgba(0,0,0,0.35)] group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
              <AppIcon app={app} imageSizes={`${grid.maxIconPx}px`} />
            </div>
            <span className={cn("springboard-icon-label w-full truncate text-center font-medium", grid.labelClass)}>
              {app.name}
            </span>
          </button>
        ))}
      </div>
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
            <AppIcon app={app} imageSizes="80px" />
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

/** Scale springboard content down when it would overflow the fixed device screen. */
function useSpringboardFitScale(
  screenRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!enabled) {
      setScale(1);
      return;
    }

    const screen = screenRef.current;
    const content = contentRef.current;
    if (!screen || !content) return;

    const fit = () => {
      const available = screen.clientHeight;
      const needed = content.scrollHeight;
      if (available > 0 && needed > available) {
        setScale(Math.max(0.82, available / needed));
      } else {
        setScale(1);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(screen);
    observer.observe(content);
    return () => observer.disconnect();
  }, [contentRef, enabled, screenRef]);

  return scale;
}

export function StudioPhoneApps({ className }: StudioPhoneAppsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const springboardScreenRef = useRef<HTMLDivElement>(null);
  const springboardContentRef = useRef<HTMLDivElement>(null);
  const containerWidth = useElementWidth(containerRef);
  const [viewportWidth, setViewportWidth] = useState<number | null>(() =>
    typeof window !== "undefined" ? window.innerWidth : null,
  );
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

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  const layoutWidth = useMemo(() => {
    const widths = [containerWidth, viewportWidth].filter((w): w is number => w !== null);
    if (widths.length === 0) return null;
    return Math.min(...widths);
  }, [containerWidth, viewportWidth]);

  const springboardTier = resolveSpringboardDeviceTier(layoutWidth);
  const isPhoneTier = springboardTier === "phone";
  const springboardScale = useSpringboardFitScale(
    springboardScreenRef,
    springboardContentRef,
    !isAppOpen,
  );

  return (
    <>
      <div ref={containerRef} className={cn("w-full", className)}>
        <DeviceViewer
          device={springboardTier}
          size="lg"
          glow="cyan"
          mode="launcher"
          className={cn(
            "studio-springboard-device w-full transition-[max-width] duration-300 ease-out",
            isPhoneTier && "studio-springboard-device--compact",
          )}
        >
          <div
            ref={springboardScreenRef}
            className="studio-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden"
          >
            {inDeviceContent ? (
              <div
                className={cn(
                  "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden pb-5",
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
                <SpringboardStatusBar timeStr={timeStr} compact={isPhoneTier} />

                <div
                  className={cn(
                    "relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden pb-5",
                    SPRINGBOARD_ICON_GRID[springboardTier].edgePaddingClass,
                    isPhoneTier ? "pt-0" : "pt-1",
                  )}
                >
                  <div
                    ref={springboardContentRef}
                    className="flex origin-top flex-col"
                    style={{
                      transform: springboardScale < 1 ? `scale(${springboardScale})` : undefined,
                      width: springboardScale < 1 ? `${100 / springboardScale}%` : undefined,
                    }}
                  >
                    <SpringboardMiniWidgets
                      timeStr={timeStr}
                      dateShortStr={dateShortStr}
                      tier={springboardTier}
                      compact={isPhoneTier}
                    />
                    <AppIconGrid onOpenApp={openApp} tier={springboardTier} />
                  </div>
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
