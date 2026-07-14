"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const GameTablet = dynamic(
  () => import("@/components/games/GameTablet").then((m) => m.GameTablet),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center bg-[#050812]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">Loading maze…</p>
      </div>
    ),
  },
);

const DOT_SPACING = 36;
const PAC_SIZE = 28;
const PAC_SPEED = 120;

type PacManEasterEggProps = {
  className?: string;
};

function PacManGlyph({ mouth, className }: { mouth: number; className?: string }) {
  const open = 0.25 + Math.abs(Math.sin(mouth)) * 0.3;
  return (
    <svg viewBox="-1 -1 2 2" className={className} aria-hidden>
      <path
        d={`M 0 0 L ${Math.cos(open)} ${Math.sin(open)} A 1 1 0 1 1 ${Math.cos(-open)} ${Math.sin(-open)} Z`}
        fill="#ffde00"
      />
    </svg>
  );
}

function ScrollPacAnimation({
  reducedMotion,
  onActivate,
}: {
  reducedMotion: boolean;
  onActivate: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouthRef = useRef(0);
  const eatenRef = useRef<Set<number>>(new Set());
  const progressRef = useRef(0);
  const frameRef = useRef(0);

  const dotCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(PAC_SIZE * 2.5 * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotCount.current = Math.max(4, Math.floor((window.innerWidth - 80) / DOT_SPACING));
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) return () => window.removeEventListener("resize", resize);

    let last = 0;
    const loop = (time: number) => {
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      mouthRef.current += dt * 10;
      progressRef.current += PAC_SPEED * dt;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const w = window.innerWidth;
        const h = PAC_SIZE * 2.5;
        ctx.clearRect(0, 0, w, h);

        const y = h * 0.55;
        const totalWidth = dotCount.current * DOT_SPACING;
        const startX = (w - totalWidth) / 2;

        for (let i = 0; i <= dotCount.current; i += 1) {
          if (eatenRef.current.has(i)) continue;
          const dx = startX + i * DOT_SPACING;
          ctx.fillStyle = "#f8f4d8";
          ctx.beginPath();
          ctx.arc(dx, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        const pacX = startX + Math.min(progressRef.current, totalWidth);
        for (let i = 0; i <= dotCount.current; i += 1) {
          const dx = startX + i * DOT_SPACING;
          if (Math.abs(pacX - dx) < 14) eatenRef.current.add(i);
        }

        if (progressRef.current > totalWidth + 80) {
          progressRef.current = -40;
          eatenRef.current.clear();
        }

        const open = 0.25 + Math.abs(Math.sin(mouthRef.current)) * 0.3;
        ctx.fillStyle = "#ffde00";
        ctx.beginPath();
        ctx.moveTo(pacX, y);
        ctx.arc(pacX, y, PAC_SIZE / 2, open, -open, true);
        ctx.closePath();
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <button
        type="button"
        onClick={onActivate}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-games/35 bg-wood-dark/40 px-4 py-5 transition hover:border-games/60 hover:bg-games/10"
        aria-label="Open Dot Explorer game"
      >
        <PacManGlyph mouth={0.4} className="h-7 w-7" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-cream/70 group-hover:text-paper-cream">
          Tap to play Dot Explorer
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      className="group relative w-full overflow-hidden rounded-2xl border border-games/25 bg-gradient-to-r from-wood-dark/50 via-wood-dark/30 to-wood-dark/50 py-2 transition hover:border-games/50 hover:shadow-[0_0_24px_rgba(152,92,255,0.15)]"
      aria-label="Click Pac-Man to open Dot Explorer"
    >
      <canvas ref={canvasRef} className="block h-[70px] w-full" />
      <span className="pointer-events-none absolute inset-x-0 bottom-1 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-paper-cream/45 group-hover:text-paper-cream/70">
        Click Pac-Man to play
      </span>
    </button>
  );
}

export function PacManEasterEgg({ className }: PacManEasterEggProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          setRevealed(true);
        }
      },
      { threshold: [0, 0.2, 0.5] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openGame = useCallback(() => {
    setClosing(false);
    setGameOpen(true);
  }, []);

  const closeGame = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setGameOpen(false);
      setClosing(false);
    }, 320);
  }, []);

  useEffect(() => {
    if (!gameOpen) return;

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
  }, [closeGame, gameOpen]);

  return (
    <>
      <div ref={placeholderRef} className={cn("relative", className)}>
        {!revealed && (
          <div
            className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-paper-cream/10 bg-wood-dark/20 sm:min-h-[140px]"
            aria-hidden
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper-cream/25">
              Scroll to discover
            </p>
          </div>
        )}

        {revealed && !gameOpen && (
          <ScrollPacAnimation reducedMotion={reducedMotion} onActivate={openGame} />
        )}
      </div>

      {gameOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Dot Explorer game"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            aria-label="Close game"
            onClick={closeGame}
          />

          <div
            className={cn(
              "relative z-10 mx-4 mb-6 w-full max-w-[640px] sm:mb-0",
              reducedMotion
                ? closing
                  ? "opacity-0"
                  : "opacity-100"
                : closing
                  ? "animate-[tablet-slide-out_0.32s_ease-in_forwards]"
                  : "animate-[tablet-slide-in_0.38s_ease-out]",
            )}
          >
            <div className="relative">
              <button
                type="button"
                onClick={closeGame}
                className="absolute -right-1 -top-1 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-paper-cream/20 bg-ink/90 font-mono text-sm text-paper-cream/80 shadow-lg transition hover:bg-ink hover:text-paper-cream sm:-right-3 sm:-top-3"
                aria-label="Close game"
              >
                ×
              </button>
              <GameTablet overlay className="w-full shadow-[0_24px_80px_rgba(0,0,0,0.55)]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
