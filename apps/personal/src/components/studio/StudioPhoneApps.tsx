"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  BatteryMedium,
  Check,
  ChevronLeft,
  ExternalLink,
  Fish,
  Gamepad2,
  GitBranch,
  History,
  MapPin,
  Search,
  Wifi,
  X,
} from "lucide-react";
import { Phone } from "@/components/physical-ui/Phone";
import { MicrobeSvgGlyph } from "@/components/games/microbeDraw";
import { profile } from "@/data/profile";
import { TimelinePaper } from "@/components/timeline/TimelinePaper";
import { tabletApps, type TabletApp, type TabletAppId } from "@/data/tablet-apps";
import { cn } from "@/lib/cn";

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

const IN_DEVICE_APP_IDS = new Set<TabletAppId>(
  tabletApps.filter((a) => a.inDevice).map((a) => a.id),
);

const DOCK_APP_IDS: TabletAppId[] = ["ergo", "co2t", "work-map", "microbe"];

const PRIORITIES = [
  { label: "VP Engineering leadership", done: true },
  { label: "CO2T · ERGO · environmental work", done: true },
  { label: "Dad first. Then the maze.", done: false },
] as const;

const CAREER_ERAS = [
  { label: "Wii era", color: "#8c5cc7" },
  { label: "Casino", color: "#c68b38" },
  { label: "CO2T", color: "#3d9b6a" },
  { label: "VP Eng", color: "#4da4c9" },
] as const;

function parseAppParam(): TabletAppId | null {
  if (typeof window === "undefined") return null;

  const fromParams = (params: URLSearchParams) => {
    const app = params.get("app");
    if (app && tabletApps.some((a) => a.id === app)) return app as TabletAppId;
    return null;
  };

  const fromSearch = fromParams(new URLSearchParams(window.location.search));
  if (fromSearch) return fromSearch;

  const hash = window.location.hash;
  const queryStart = hash.indexOf("?");
  if (queryStart === -1) return null;
  return fromParams(new URLSearchParams(hash.slice(queryStart)));
}

function parseInitialApp(): TabletAppId | null {
  return parseAppParam();
}

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

function AppPromptModal({
  app,
  onClose,
  onPlayGame,
}: {
  app: TabletApp;
  onClose: () => void;
  onPlayGame: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} — project overview`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md animate-[arcade-slide-in_0.28s_ease-out] rounded-2xl border border-screen-border bg-screen-panel p-5 shadow-2xl sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-screen-border text-screen-muted transition hover:bg-screen-border/30 hover:text-screen-text"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0">
            <AppIcon app={app} />
          </div>
          <div className="min-w-0 pr-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">{app.domain}</p>
            <h3 className="mt-1 font-editorial text-lg font-semibold text-screen-text">{app.name}</h3>
            <p className="mt-0.5 text-xs font-medium text-screen-muted">{app.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-screen-text/90">{app.description}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {app.isGame ? (
            <button
              type="button"
              onClick={onPlayGame}
              className="min-h-[44px] rounded-full border border-[#3b9eff]/40 bg-[#3b9eff]/15 px-5 text-sm font-semibold text-[#7ec8ff] transition hover:bg-[#3b9eff]/25"
            >
              Play Microbe Explorer
            </button>
          ) : app.href ? (
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-environment/40 bg-environment/10 px-5 text-sm font-semibold text-environment transition hover:bg-environment/20"
            >
              Visit {app.domain}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-full border border-screen-border px-5 text-sm text-screen-muted transition hover:text-screen-text"
          >
            Close
          </button>
        </div>
      </div>
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

type GlassWidgetProps = {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 4;
  rowSpan?: 1 | 2;
};

function GlassWidget({ children, className, colSpan = 2, rowSpan = 1 }: GlassWidgetProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[22px] bg-white/[0.10] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:p-3.5",
        colSpan === 4 ? "col-span-4" : colSpan === 2 ? "col-span-2" : "col-span-1",
        rowSpan === 2 && "row-span-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

function GlassPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-white/[0.12] px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function AnalogClockFace({ now }: { now: Date }) {
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + Math.sin(angle) * 38;
        const y1 = 50 - Math.cos(angle) * 38;
        const x2 = 50 + Math.sin(angle) * 42;
        const y2 = 50 - Math.cos(angle) * 42;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1="50"
        y1="50"
        x2={50 + Math.sin((hourAngle * Math.PI) / 180) * 22}
        y2={50 - Math.cos((hourAngle * Math.PI) / 180) * 22}
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2={50 + Math.sin((minuteAngle * Math.PI) / 180) * 30}
        y2={50 - Math.cos((minuteAngle * Math.PI) / 180) * 30}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="2.5" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

function SpringboardStatusBar({ timeStr, dateShortStr }: { timeStr: string; dateShortStr: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-1 pt-7 sm:px-5 sm:pt-8">
      <div className="min-w-0">
        <span className="font-semibold text-[11px] text-white/90 sm:text-xs">{timeStr}</span>
        <span className="ml-2 hidden text-[10px] text-white/50 sm:inline">{dateShortStr}</span>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden>
        <Wifi className="h-3 w-3 text-white/60" strokeWidth={2.5} />
        <span className="font-mono text-[9px] font-medium text-white/55">5G</span>
        <BatteryMedium className="h-3.5 w-4 text-white/60" strokeWidth={2} />
      </div>
    </div>
  );
}

function TodayWidget({ dateStr }: { dateStr: string }) {
  return (
    <GlassWidget colSpan={2} rowSpan={2} className="flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wide text-white/45">Today</p>
            <p className="mt-1 font-editorial text-lg font-semibold leading-tight text-white sm:text-xl">
              {profile.name}
            </p>
            <p className="mt-0.5 text-[11px] font-medium leading-snug text-white/70 sm:text-xs">
              {profile.tagline}
            </p>
          </div>
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4da4c9] to-[#1a5c3a] text-sm font-bold text-white shadow-lg sm:h-11 sm:w-11"
            aria-hidden
          >
            EN
          </div>
        </div>
      </div>
      <div className="mt-2 border-t border-white/[0.08] pt-2">
        <p className="text-[11px] font-medium text-white/85">{dateStr}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/50">
          <MapPin className="h-2.5 w-2.5 shrink-0" />
          {profile.location}
        </p>
        <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Norris Studio</p>
      </div>
    </GlassWidget>
  );
}

function EnvironmentalWidget() {
  return (
    <GlassWidget
      colSpan={2}
      rowSpan={2}
      className="relative flex flex-col justify-between overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(45,143,212,0.35) 0%, rgba(26,92,58,0.25) 55%, rgba(13,40,24,0.4) 100%)",
        }}
      />
      <div className="relative">
        <p className="text-[10px] font-medium uppercase tracking-wide text-white/50">Environmental</p>
        <p className="mt-0.5 font-mono text-[9px] text-white/40">CO2T.earth</p>
      </div>
      <div className="relative flex items-end justify-between">
        <div>
          <p className="font-editorial text-4xl font-light leading-none text-white sm:text-5xl">CO₂</p>
          <p className="mt-1 text-[11px] font-medium text-white/70">Carbon credit platform</p>
        </div>
        <div className="text-right">
          <p className="font-editorial text-2xl font-semibold text-white/95">412</p>
          <p className="text-[9px] uppercase tracking-wider text-white/45">ppm tracked</p>
        </div>
      </div>
      <div className="relative mt-1 flex gap-0.5" aria-hidden>
        {["#2d8fd4", "#3d9b6a", "#5ecf8a", "#7ee8a8", "#a8f0c0"].map((c, i) => (
          <div key={i} className="h-1 flex-1 rounded-full opacity-70" style={{ background: c }} />
        ))}
      </div>
    </GlassWidget>
  );
}

function StatusPillRow() {
  return (
    <>
      <div className="col-span-2 flex items-center">
        <GlassPill className="w-full justify-center">
          <MapPin className="h-3 w-3 text-[#7ee8a8]" strokeWidth={2.5} />
          <span className="text-[10px] font-medium text-white/80">Oregon</span>
        </GlassPill>
      </div>
      <div className="col-span-2 flex items-center">
        <GlassPill className="w-full justify-center">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5ecf8a] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5ecf8a]" />
          </span>
          <span className="text-[10px] font-medium text-white/80">Studio active</span>
        </GlassPill>
      </div>
    </>
  );
}

function ClockWidget({ now }: { now: Date }) {
  return (
    <GlassWidget colSpan={2} rowSpan={2} className="flex flex-col">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white/45">Clock</p>
      <div className="flex flex-1 items-center justify-center px-2">
        <AnalogClockFace now={now} />
      </div>
    </GlassWidget>
  );
}

function PrioritiesWidget() {
  return (
    <GlassWidget colSpan={2} rowSpan={2}>
      <p className="text-[10px] font-medium uppercase tracking-wide text-white/45">Reminders</p>
      <ul className="mt-2 space-y-2">
        {PRIORITIES.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                item.done ? "bg-[#5ecf8a]/30" : "border border-white/25 bg-white/5",
              )}
            >
              {item.done && <Check className="h-2.5 w-2.5 text-[#7ee8a8]" strokeWidth={3} />}
            </span>
            <span
              className={cn(
                "text-[11px] leading-snug sm:text-xs",
                item.done ? "text-white/75 line-through decoration-white/30" : "font-medium text-white/90",
              )}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </GlassWidget>
  );
}

function CareerStripWidget() {
  const now = new Date();
  const month = now.toLocaleDateString([], { month: "long" });
  const year = now.getFullYear();

  return (
    <GlassWidget colSpan={4} className="!py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="shrink-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/45">Career</p>
          <p className="font-editorial text-sm font-semibold text-white/90">
            {month} {year}
          </p>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {CAREER_ERAS.map((era, i) => (
            <div key={era.label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className="h-1.5 w-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${era.color}88, ${era.color})` }}
              />
              <span className="truncate text-[8px] font-medium text-white/50">{era.label}</span>
              {i < CAREER_ERAS.length - 1 && (
                <span className="sr-only">then</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </GlassWidget>
  );
}

function PhoneHomeWidgets({ dateStr, now }: { dateStr: string; now: Date }) {
  return (
    <div className="grid grid-cols-4 auto-rows-[minmax(68px,auto)] gap-2 sm:auto-rows-[minmax(76px,auto)] sm:gap-2.5">
      <TodayWidget dateStr={dateStr} />
      <EnvironmentalWidget />
      <StatusPillRow />
      <ClockWidget now={now} />
      <PrioritiesWidget />
      <CareerStripWidget />
    </div>
  );
}

function SpringboardPageDots() {
  return (
    <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      <span className="h-1.5 w-4 rounded-full bg-white/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    </div>
  );
}

function SpringboardSearchPill() {
  return (
    <div className="mt-3 flex justify-center px-4" aria-hidden>
      <div className="flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-full bg-white/[0.12] py-1.5 backdrop-blur-xl">
        <Search className="h-3 w-3 text-white/45" strokeWidth={2.5} />
        <span className="text-[11px] text-white/45">Search</span>
      </div>
    </div>
  );
}

function SpringboardDock({
  onOpenApp,
}: {
  onOpenApp: (id: TabletAppId) => void;
}) {
  const dockApps = DOCK_APP_IDS.map((id) => tabletApps.find((a) => a.id === id)!).filter(Boolean);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-3 sm:px-5 sm:pb-4">
      <div className="pointer-events-auto flex items-center gap-4 rounded-[28px] bg-white/[0.15] px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl sm:gap-5 sm:px-5">
        {dockApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpenApp(app.id)}
            className="group transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-[22%]"
            aria-label={`Open ${app.name}`}
          >
            <div className="aspect-square w-[48px] transition group-hover:shadow-[0_4px_16px_rgba(255,255,255,0.15)] sm:w-[52px]">
              <AppIcon app={app} large />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AppIconGrid({ onOpenApp }: { onOpenApp: (id: TabletAppId) => void }) {
  return (
    <div className="relative mt-4 grid grid-cols-4 gap-x-2 gap-y-5 sm:mt-5 sm:gap-x-3 sm:gap-y-6">
      {tabletApps.map((app, index) => (
        <button
          key={app.id}
          type="button"
          onClick={() => onOpenApp(app.id)}
          className={cn(
            "group flex flex-col items-center gap-1.5 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl p-0.5",
            index === 4 && "col-start-2",
            index === 5 && "col-start-3",
          )}
          aria-label={`Open ${app.name}`}
        >
          <div className="aspect-square w-[min(100%,60px)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] sm:w-[min(100%,68px)]">
            <AppIcon app={app} large />
          </div>
          <span className="max-w-[72px] truncate text-center text-[9px] font-medium leading-tight text-white/85 sm:max-w-[80px] sm:text-[10px]">
            {app.name}
          </span>
        </button>
      ))}
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

export function StudioPhoneApps({ className }: StudioPhoneAppsProps) {
  const [screen, setScreen] = useState<"home" | TabletAppId>("home");
  const [activeApp, setActiveApp] = useState<TabletAppId | null>(null);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameFullscreen, setGameFullscreen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const selectedApp = activeApp ? tabletApps.find((a) => a.id === activeApp) : null;

  useEffect(() => {
    const initial = parseInitialApp();
    if (initial && IN_DEVICE_APP_IDS.has(initial)) {
      setScreen(initial);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const app = parseAppParam();
      if (app && IN_DEVICE_APP_IDS.has(app)) {
        setScreen(app);
        setGameOpen(false);
        setActiveApp(null);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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
    if (app.isGame) {
      setScreen(id);
      setGameOpen(true);
      setGameFullscreen(false);
      return;
    }
    if (app.inDevice) {
      setScreen(id);
      return;
    }
    setActiveApp(id);
  }, []);

  const closePrompt = useCallback(() => setActiveApp(null), []);

  const openFullscreenGame = useCallback(() => {
    setActiveApp(null);
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
  const dateStr = now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
  const dateShortStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <>
      <div className={cn("w-full", className)}>
        <Phone glow="cyan" mode="launcher" size="large" className="w-full">
          <div className="studio-springboard-wallpaper relative flex h-full min-h-0 flex-col">
            <div className="studio-springboard-glow pointer-events-none absolute inset-0" aria-hidden />

            {screen === "work-map" ? (
              <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#0c0e14]/95">
                <WorkMapInDevice onBack={goHome} />
              </div>
            ) : screen === "work-history" ? (
              <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#0c0e14]/95">
                <WorkHistoryInDevice onBack={goHome} />
              </div>
            ) : gameOpen && !gameFullscreen ? (
              <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#040a14]/95 pb-6">
                <DeviceAppHeader
                  title="Microbe Explorer"
                  onBack={goHome}
                  trailing={
                    <button
                      type="button"
                      onClick={openFullscreenGame}
                      className="rounded-full border border-[#3b9eff]/35 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#7ec8ff] transition hover:bg-[#3b9eff]/15"
                    >
                      Expand
                    </button>
                  }
                />
                <div className="relative min-h-[200px] flex-1 overflow-hidden">
                  <GameTablet overlay className="h-full w-full" />
                </div>
              </div>
            ) : (
              <>
                <SpringboardStatusBar timeStr={timeStr} dateShortStr={dateShortStr} />

                <div className="relative z-[1] flex flex-1 flex-col overflow-y-auto px-4 pb-[88px] pt-0.5 sm:px-5 sm:pb-[96px]">
                  <PhoneHomeWidgets dateStr={dateStr} now={now} />
                  <AppIconGrid onOpenApp={openApp} />
                  <SpringboardPageDots />
                  <SpringboardSearchPill />
                </div>

                <SpringboardDock onOpenApp={openApp} />
              </>
            )}
          </div>
        </Phone>
      </div>

      {selectedApp && !selectedApp.isGame && !selectedApp.inDevice && (
        <AppPromptModal app={selectedApp} onClose={closePrompt} onPlayGame={openFullscreenGame} />
      )}

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
