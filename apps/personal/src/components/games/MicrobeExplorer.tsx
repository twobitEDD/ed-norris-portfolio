"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useInViewport, useViewportCentered } from "@/lib/useInViewport";
import {
  drawMicrobeCollectible,
  drawMicrobeHero,
  drawWaterDot,
  type MicrobeKind,
} from "@/components/games/microbeDraw";
import {
  CHUNK_SIZE,
  TILE_SIZE,
  VIEW_RADIUS,
  type Collectible,
  type FruitKind,
  type GameSnapshot,
  useInfiniteMaze,
} from "./useInfiniteMaze";

const NAV_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  " ",
  "a",
  "A",
  "d",
  "D",
  "w",
  "W",
  "s",
  "S",
]);

const COLORS = {
  background: "#040a14",
  wall: "#0d2847",
  wallEdge: "#1e5a9e",
  hud: "rgba(180, 230, 255, 0.85)",
  lock: "rgba(59, 158, 255, 0.9)",
};

const GAME_WIDTH = 320;
const GAME_HEIGHT = 240;
const MAX_BUFFER_WIDTH = 640;
const MAX_BUFFER_HEIGHT = 480;
const MAX_DPR = 2;

function fruitToMicrobe(kind: FruitKind): MicrobeKind {
  return kind;
}

function drawMaze(
  ctx: CanvasRenderingContext2D,
  snap: GameSnapshot,
  width: number,
  height: number,
  animatePulse: boolean,
) {
  const { player, chunks } = snap;
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(TILE_SIZE, TILE_SIZE);
  ctx.translate(-player.x, -player.y);

  const minCx = Math.floor(player.x / CHUNK_SIZE) - VIEW_RADIUS;
  const maxCx = Math.floor(player.x / CHUNK_SIZE) + VIEW_RADIUS;
  const minCy = Math.floor(player.y / CHUNK_SIZE) - VIEW_RADIUS;
  const maxCy = Math.floor(player.y / CHUNK_SIZE) + VIEW_RADIUS;

  for (let cy = minCy; cy <= maxCy; cy += 1) {
    for (let cx = minCx; cx <= maxCx; cx += 1) {
      const chunk = chunks.get(`${cx},${cy}`);
      if (!chunk) continue;
      const baseX = cx * CHUNK_SIZE;
      const baseY = cy * CHUNK_SIZE;

      for (let ly = 0; ly < CHUNK_SIZE; ly += 1) {
        for (let lx = 0; lx < CHUNK_SIZE; lx += 1) {
          if (!chunk.walls[ly][lx]) continue;
          const x = baseX + lx;
          const y = baseY + ly;
          ctx.fillStyle = COLORS.wall;
          ctx.fillRect(x, y, 1.02, 1.02);
          ctx.strokeStyle = COLORS.wallEdge;
          ctx.lineWidth = 0.04;
          ctx.strokeRect(x + 0.02, y + 0.02, 0.96, 0.96);
        }
      }
    }
  }

  for (let cy = minCy; cy <= maxCy; cy += 1) {
    for (let cx = minCx; cx <= maxCx; cx += 1) {
      const chunk = chunks.get(`${cx},${cy}`);
      if (!chunk) continue;
      for (const item of chunk.collectibles) {
        drawCollectible(ctx, item);
      }
    }
  }

  const pulse = animatePulse && player.eating ? Math.sin(player.mouth * 2) * 0.5 + 0.5 : 0;
  drawMicrobeHero(ctx, {
    x: player.x,
    y: player.y,
    radius: 0.42,
    dirX: player.dirX,
    dirY: player.dirY,
    pulse,
  });
  ctx.restore();
}

function drawCollectible(ctx: CanvasRenderingContext2D, item: Collectible) {
  const cx = item.wx + 0.5;
  const cy = item.wy + 0.5;

  if (item.kind === "dot") {
    drawWaterDot(ctx, cx, cy, 0.1);
    return;
  }

  drawMicrobeCollectible(ctx, cx, cy, fruitToMicrobe(item.kind), 0.22);
}

type MicrobeExplorerProps = {
  className?: string;
  arcadeMode?: boolean;
  autoLock?: boolean;
};

const ARCADE_VIEW_WIDTH = 640;
const ARCADE_VIEW_HEIGHT = 480;

export function MicrobeExplorer({
  className,
  arcadeMode = false,
  autoLock = false,
}: MicrobeExplorerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const displaySizeRef = useRef({ width: GAME_WIDTH, height: GAME_HEIGHT });
  const scoreRef = useRef(0);
  const { getSnapshot, step, reset } = useInfiniteMaze();
  const inputRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const [score, setScore] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualLock, setManualLock] = useState(false);
  const [lockSuppressed, setLockSuppressed] = useState(false);
  const inViewport = useInViewport(containerRef, { threshold: 0.15 });
  const viewportCentered = useViewportCentered(containerRef, { minRatio: 0.5 });
  const locked = !lockSuppressed && (autoLock || manualLock || viewportCentered);

  useEffect(() => {
    if (!autoLock) return;
    const id = window.requestAnimationFrame(() => {
      containerRef.current?.focus();
      setManualLock(true);
      setLockSuppressed(false);
    });
    return () => cancelAnimationFrame(id);
  }, [autoLock]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!inViewport) {
      setManualLock(false);
      setLockSuppressed(false);
      inputRef.current = { x: 0, y: 0 };
    }
  }, [inViewport]);

  const syncScore = useCallback((nextScore: number) => {
    if (scoreRef.current === nextScore) return;
    scoreRef.current = nextScore;
    setScore(nextScore);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let rawWidth = container.clientWidth;
    let rawHeight = container.clientHeight;

    if (arcadeMode) {
      rawWidth = ARCADE_VIEW_WIDTH;
      rawHeight = ARCADE_VIEW_HEIGHT;
    } else if (rawWidth < 1 || rawHeight < 1) {
      rawWidth = GAME_WIDTH;
      rawHeight = GAME_HEIGHT;
    }

    if (rawWidth < 1 || rawHeight < 1) return;

    const width = arcadeMode ? ARCADE_VIEW_WIDTH : Math.min(rawWidth, MAX_BUFFER_WIDTH);
    const height = arcadeMode ? ARCADE_VIEW_HEIGHT : Math.min(rawHeight, MAX_BUFFER_HEIGHT);
    const prev = displaySizeRef.current;
    if (prev.width === width && prev.height === height && canvas.width > 0) return;

    displaySizeRef.current = { width, height };

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const snap = getSnapshot();
    drawMaze(ctx, snap, width, height, !reducedMotion);
    syncScore(snap.score);
  }, [arcadeMode, getSnapshot, reducedMotion, syncScore]);

  useEffect(() => {
    let debounceId: ReturnType<typeof setTimeout> | null = null;
    let rafId: number | null = null;

    const scheduleResize = () => {
      if (debounceId) clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        rafId = requestAnimationFrame(resizeCanvas);
      }, 32);
    };

    resizeCanvas();
    const observer = new ResizeObserver(scheduleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (debounceId) clearTimeout(debounceId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (reducedMotion || !inViewport) {
      if (inViewport) resizeCanvas();
      return;
    }

    const loop = (time: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0;
      lastTimeRef.current = time;

      step(dt, inputRef.current.x, inputRef.current.y);

      const { width, height } = displaySizeRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const snap = getSnapshot();
        drawMaze(ctx, snap, width, height, true);
        syncScore(snap.score);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = 0;
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [getSnapshot, inViewport, reducedMotion, resizeCanvas, step, syncScore]);

  useEffect(() => {
    const applyInput = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        inputRef.current = { x: -1, y: 0 };
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        inputRef.current = { x: 1, y: 0 };
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        inputRef.current = { x: 0, y: -1 };
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        inputRef.current = { x: 0, y: 1 };
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!locked) return;

      if (NAV_KEYS.has(e.key)) {
        e.preventDefault();
      }

      if (e.key === "Escape" && !autoLock) {
        setLockSuppressed(true);
        setManualLock(false);
        inputRef.current = { x: 0, y: 0 };
        containerRef.current?.blur();
        return;
      }

      applyInput(e);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!locked) return;
      if (!NAV_KEYS.has(e.key)) return;
      inputRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [autoLock, locked]);

  const handlePointerDown = () => {
    setLockSuppressed(false);
    setManualLock(true);
    containerRef.current?.focus();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handlePointerDown();
    const touch = e.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchRef.current.x;
    const dy = touch.clientY - touchRef.current.y;
    const len = Math.hypot(dx, dy);
    if (len < 12) return;
    if (Math.abs(dx) >= Math.abs(dy)) {
      inputRef.current = { x: dx > 0 ? 1 : -1, y: 0 };
    } else {
      inputRef.current = { x: 0, y: dy > 0 ? 1 : -1 };
    }
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
    inputRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden outline-none transition-shadow duration-300",
        arcadeMode && "mx-auto aspect-[4/3] w-full max-w-[640px]",
        locked && "ring-2 ring-[#3b9eff]/45 ring-inset",
        className,
      )}
      tabIndex={0}
      role="application"
      aria-label="Microbe Explorer mini game. Use arrow keys or WASD to swim the maze."
      onPointerDown={handlePointerDown}
      onFocus={() => {
        setLockSuppressed(false);
        setManualLock(true);
      }}
      onBlur={() => {
        setManualLock(false);
        inputRef.current = { x: 0, y: 0 };
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="absolute inset-0 block h-full w-full touch-none outline-none"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <div className="rounded bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">
          Score {score}
        </div>
        {locked && (
          <span
            className="rounded px-2 py-1 font-mono text-[9px] uppercase tracking-wider"
            style={{ background: "rgba(59,158,255,0.15)", color: COLORS.lock }}
          >
            Locked — arrows to swim
          </span>
        )}
        {reducedMotion && (
          <span className="rounded bg-black/50 px-2 py-1 text-[9px] text-white/60">Paused</span>
        )}
      </div>
      {!locked && !reducedMotion && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center">
          <span className="rounded bg-black/45 px-2 py-1 text-[9px] text-white/55">
            Tap or click to play · Arrow keys / WASD · Esc to unlock
          </span>
        </div>
      )}
      {locked && (
        <button
          type="button"
          className="absolute bottom-3 right-3 rounded bg-black/55 px-2 py-1 text-[9px] text-white/70 transition hover:bg-black/70 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            reset();
            resizeCanvas();
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
