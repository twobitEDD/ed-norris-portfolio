"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  FOOTPATH_MAIN_D,
  FOOTPATH_VIEWBOX,
  sampleSvgPath,
  type PathPoint,
} from "@/components/games/footPathData";
import { drawPacMan, pacManMouthFromPhase, PacManSvgGlyph } from "@/components/games/pacManDraw";

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

const PAC_SIZE = 22;
const PAC_SPEED = 95;
const DOT_SPACING = 22;
const REVEAL_THRESHOLD = 0.05;
const CANVAS_HEIGHT = 120;

type PacManEasterEggProps = {
  className?: string;
};

function ScrollPacAnimation({
  reducedMotion,
  onActivate,
  animationKey,
}: {
  reducedMotion: boolean;
  onActivate: () => void;
  animationKey: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<PathPoint[]>([]);
  const progressRef = useRef(0);
  const mouthPhaseRef = useRef(0);
  const eatingRef = useRef(false);
  const eatenRef = useRef<Set<number>>(new Set());
  const frameRef = useRef(0);

  useEffect(() => {
    progressRef.current = 0;
    eatenRef.current.clear();
    mouthPhaseRef.current = 0;
    eatingRef.current = false;
  }, [animationKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rebuildPath = () => {
      const w = window.innerWidth;
      const h = CANVAS_HEIGHT;
      const padX = 48;
      pathRef.current = sampleSvgPath(
        FOOTPATH_MAIN_D,
        FOOTPATH_VIEWBOX,
        w - padX * 2,
        h - 24,
        7,
      ).map((p) => ({ ...p, x: p.x + padX, y: p.y + 12 }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(CANVAS_HEIGHT * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildPath();
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) return () => window.removeEventListener("resize", resize);

    let last = 0;
    const loop = (time: number) => {
      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;

      const ctx = canvas.getContext("2d");
      const points = pathRef.current;
      if (ctx && points.length > 1) {
        const w = window.innerWidth;
        const h = CANVAS_HEIGHT;
        ctx.clearRect(0, 0, w, h);

        const totalLen = (points.length - 1) * DOT_SPACING;
        progressRef.current += PAC_SPEED * dt;
        if (progressRef.current > totalLen + 60) {
          progressRef.current = 0;
          eatenRef.current.clear();
        }

        ctx.strokeStyle = "rgba(248, 244, 216, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i += 1) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        for (let i = 0; i < points.length; i += 1) {
          if (eatenRef.current.has(i)) continue;
          const p = points[i];
          ctx.fillStyle = "#f8f4d8";
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        const dist = progressRef.current;
        const segFloat = dist / DOT_SPACING;
        const segIdx = Math.min(Math.floor(segFloat), points.length - 2);
        const segT = segFloat - segIdx;
        const a = points[segIdx];
        const b = points[segIdx + 1];
        const pacX = a.x + (b.x - a.x) * segT;
        const pacY = a.y + (b.y - a.y) * segT;
        const angle = Math.atan2(b.y - a.y, b.x - a.x);

        let eating = false;
        for (let i = 0; i < points.length; i += 1) {
          const p = points[i];
          if (Math.hypot(pacX - p.x, pacY - p.y) < 12) {
            eatenRef.current.add(i);
            eating = true;
          }
        }

        eatingRef.current = eating;
        if (eating) mouthPhaseRef.current += dt * 12;
        else mouthPhaseRef.current = 0;

        drawPacMan(ctx, {
          x: pacX,
          y: pacY,
          radius: PAC_SIZE / 2,
          angle,
          mouthOpen: pacManMouthFromPhase(mouthPhaseRef.current, eating),
        });
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animationKey, reducedMotion]);

  if (reducedMotion) {
    return (
      <button
        type="button"
        onClick={onActivate}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-games/35 bg-wood-dark/25 px-4 py-5 transition hover:border-games/60 hover:bg-games/10"
        aria-label="Open Dot Explorer game"
      >
        <PacManSvgGlyph className="h-7 w-7" />
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
      className="group relative w-full overflow-hidden rounded-2xl border border-games/25 bg-wood-dark/20 py-1 shadow-[inset_0_0_40px_rgba(140,92,199,0.06)] transition hover:border-games/50 hover:bg-games/5 hover:shadow-[0_0_28px_rgba(152,92,255,0.18)]"
      aria-label="Click Pac-Man or path to open Dot Explorer"
    >
      <canvas ref={canvasRef} className="block h-[120px] w-full opacity-90" />
      <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-paper-cream/50 group-hover:text-paper-cream/80">
        Click to play Dot Explorer
      </span>
    </button>
  );
}

function isElementRevealed(el: HTMLElement, threshold: number) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  if (visibleHeight <= 0) return false;
  return visibleHeight / Math.max(rect.height, 1) >= threshold;
}

export function PacManEasterEgg({ className }: PacManEasterEggProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [revealCount, setRevealCount] = useState(0);
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

    let wasVisible = false;

    const handleVisibility = (visible: boolean) => {
      if (!visible) {
        wasVisible = false;
        return;
      }
      if (wasVisible) return;
      wasVisible = true;
      setRevealed(true);
      setRevealCount((count) => count + 1);
    };

    if (isElementRevealed(el, REVEAL_THRESHOLD)) {
      handleVisibility(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibility(
          entry.isIntersecting && entry.intersectionRatio >= REVEAL_THRESHOLD,
        );
      },
      { threshold: [0, REVEAL_THRESHOLD, 0.25, 0.5], rootMargin: "0px 0px -5% 0px" },
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
            className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-games/30 bg-gradient-to-b from-wood-dark/20 to-transparent px-4 sm:min-h-[140px]"
            aria-hidden
          >
            <PacManSvgGlyph className="h-8 w-8 animate-pulse opacity-70" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-cream/50">
              Scroll down — something&apos;s hiding
            </p>
          </div>
        )}

        {revealed && !gameOpen && (
          <ScrollPacAnimation
            key={revealCount}
            animationKey={revealCount}
            reducedMotion={reducedMotion}
            onActivate={openGame}
          />
        )}
      </div>

      {gameOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Dot Explorer arcade game"
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
