"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ExternalLink, GitBranch, History, X } from "lucide-react";
import { Phone } from "@/components/physical-ui/Phone";
import { MicrobeSvgGlyph } from "@/components/games/microbeDraw";
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

function parseInitialApp(): TabletAppId | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const app = params.get("app");
  if (app && tabletApps.some((a) => a.id === app)) return app as TabletAppId;
  return null;
}

function AppIcon({ app, large }: { app: TabletApp; large?: boolean }) {
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goHome = useCallback(() => {
    setScreen("home");
    setGameOpen(false);
    if (typeof window !== "undefined" && window.location.search.includes("app=")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("app");
      window.history.replaceState({}, "", url.pathname + url.hash);
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

  return (
    <>
      <div className={cn("w-full", className)}>
        <Phone glow="cyan" mode="launcher" size="large" className="w-full">
          <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-[#0c0e14] to-[#12151c] pt-8">
            <div className="flex shrink-0 items-center justify-between px-4 pb-2 sm:px-5">
              <span className="font-mono text-[9px] font-medium text-white/70 sm:text-[10px]">{timeStr}</span>
              <div className="flex items-center gap-1" aria-hidden>
                <span className="h-1.5 w-2.5 rounded-sm bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-3.5 rounded-sm border border-white/30" />
              </div>
            </div>

            {screen === "work-map" ? (
              <WorkMapInDevice onBack={goHome} />
            ) : screen === "work-history" ? (
              <WorkHistoryInDevice onBack={goHome} />
            ) : gameOpen && !gameFullscreen ? (
              <div className="relative flex min-h-0 flex-1 flex-col pb-6">
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
              <div className="flex flex-1 flex-col px-5 pb-8 pt-1 sm:px-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:text-[10px]">
                  Norris Studio
                </p>
                <div className="mt-5 grid flex-1 grid-cols-3 gap-x-5 gap-y-6 content-start sm:mt-6 sm:gap-x-8 sm:gap-y-8">
                  {tabletApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openApp(app.id)}
                      className="group flex flex-col items-center gap-2 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff]/50 rounded-lg p-0.5"
                      aria-label={`Open ${app.name}`}
                    >
                      <div className="aspect-square w-[min(100%,72px)] transition group-hover:shadow-[0_4px_16px_rgba(59,158,255,0.22)] sm:w-[min(100%,80px)]">
                        <AppIcon app={app} large />
                      </div>
                      <span className="max-w-[96px] truncate text-center text-[10px] font-medium leading-tight text-white/80 sm:text-[11px]">
                        {app.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
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
