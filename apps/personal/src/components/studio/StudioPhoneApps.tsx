"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { Phone } from "@/components/physical-ui/Phone";
import { MicrobeSvgGlyph } from "@/components/games/microbeDraw";
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

type StudioPhoneAppsProps = {
  className?: string;
};

function AppIcon({ app }: { app: TabletApp }) {
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

  if (app.imageSrc) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-[22%] shadow-inner"
        style={{ background: app.iconBg }}
      >
        <Image src={app.imageSrc} alt="" fill className="object-cover object-center" sizes="56px" />
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

export function StudioPhoneApps({ className }: StudioPhoneAppsProps) {
  const [activeApp, setActiveApp] = useState<TabletAppId | null>(null);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameFullscreen, setGameFullscreen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const selectedApp = activeApp ? tabletApps.find((a) => a.id === activeApp) : null;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openApp = useCallback((id: TabletAppId) => {
    const app = tabletApps.find((a) => a.id === id);
    if (!app) return;
    if (app.isGame) {
      setGameOpen(true);
      setGameFullscreen(false);
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
      <div className={cn(className)}>
        <Phone glow="cyan" mode="launcher">
          <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-[#0c0e14] to-[#12151c] pt-8">
            <div className="flex shrink-0 items-center justify-between px-4 pb-2">
              <span className="font-mono text-[9px] font-medium text-white/70">{timeStr}</span>
              <div className="flex items-center gap-1" aria-hidden>
                <span className="h-1.5 w-2.5 rounded-sm bg-white/35" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-3.5 rounded-sm border border-white/30" />
              </div>
            </div>

            {gameOpen && !gameFullscreen ? (
              <div className="relative flex min-h-0 flex-1 flex-col pb-6">
                <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-3 py-2">
                  <button
                    type="button"
                    onClick={closeGame}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                    aria-label="Back to home screen"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-editorial text-xs font-medium text-white/90">Microbe Explorer</span>
                  <button
                    type="button"
                    onClick={openFullscreenGame}
                    className="rounded-full border border-[#3b9eff]/35 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#7ec8ff] transition hover:bg-[#3b9eff]/15"
                  >
                    Expand
                  </button>
                </div>
                <div className="relative min-h-[160px] flex-1 overflow-hidden">
                  <GameTablet overlay className="h-full w-full" />
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col px-3 pb-8 pt-1">
                <p className="text-center font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
                  Norris Studio
                </p>
                <div className="mt-4 grid flex-1 grid-cols-2 gap-x-3 gap-y-4 content-start">
                  {tabletApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openApp(app.id)}
                      className="group flex flex-col items-center gap-1 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9eff]/50 rounded-lg p-0.5"
                      aria-label={`Open ${app.name}`}
                    >
                      <div className="aspect-square w-full max-w-[56px] transition group-hover:shadow-[0_4px_16px_rgba(59,158,255,0.22)]">
                        <AppIcon app={app} />
                      </div>
                      <span className="max-w-[64px] truncate text-center text-[8px] font-medium text-white/75">
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

      {selectedApp && !selectedApp.isGame && (
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
