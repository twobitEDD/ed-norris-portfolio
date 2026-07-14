"use client";

import { useCallback, useRef, useState } from "react";

export const TILE_SIZE = 28;
export const CHUNK_SIZE = 16;
export const VIEW_RADIUS = 4;
export const PLAYER_SPEED = 4.2;
const ALIGN_THRESHOLD = 0.12;
const HALF_TILE = 0.5;

export type FruitKind = "cherry" | "orange" | "grape";

export type Collectible = {
  kind: "dot" | FruitKind;
  wx: number;
  wy: number;
};

export type PlayerState = {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  mouth: number;
};

export type ChunkData = {
  walls: boolean[][];
  collectibles: Collectible[];
};

export type GameSnapshot = {
  player: PlayerState;
  score: number;
  chunks: Map<string, ChunkData>;
};

function chunkKey(cx: number, cy: number) {
  return `${cx},${cy}`;
}

function worldToChunk(wx: number, wy: number) {
  const cx = Math.floor(wx / CHUNK_SIZE);
  const cy = Math.floor(wy / CHUNK_SIZE);
  const lx = ((wx % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
  const ly = ((wy % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
  return { cx, cy, lx, ly };
}

function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function chunkSeed(cx: number, cy: number) {
  return (cx * 73856093) ^ (cy * 19349663) ^ 0x9e3779b9;
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateChunk(cx: number, cy: number): ChunkData {
  const walls: boolean[][] = Array.from({ length: CHUNK_SIZE }, () =>
    Array.from({ length: CHUNK_SIZE }, () => true),
  );
  const rand = mulberry32(chunkSeed(cx, cy));
  const mid = Math.floor(CHUNK_SIZE / 2);

  for (let y = 1; y < CHUNK_SIZE - 1; y += 2) {
    for (let x = 1; x < CHUNK_SIZE - 1; x += 2) {
      walls[y][x] = false;

      const dirs = shuffle(
        [
          { dx: 2, dy: 0 },
          { dx: -2, dy: 0 },
          { dx: 0, dy: 2 },
          { dx: 0, dy: -2 },
        ],
        rand,
      );

      for (const dir of dirs.slice(0, 1 + Math.floor(rand() * 2))) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        if (nx > 0 && nx < CHUNK_SIZE - 1 && ny > 0 && ny < CHUNK_SIZE - 1) {
          walls[y + dir.dy / 2][x + dir.dx / 2] = false;
          walls[ny][nx] = false;
        }
      }
    }
  }

  walls[0][mid] = false;
  walls[CHUNK_SIZE - 1][mid] = false;
  walls[mid][0] = false;
  walls[mid][CHUNK_SIZE - 1] = false;

  for (let i = 1; i < CHUNK_SIZE - 1; i += 1) {
    if (rand() > 0.72) walls[i][mid] = false;
    if (rand() > 0.72) walls[mid][i] = false;
  }

  const collectibles: Collectible[] = [];
  for (let ly = 0; ly < CHUNK_SIZE; ly += 1) {
    for (let lx = 0; lx < CHUNK_SIZE; lx += 1) {
      if (walls[ly][lx]) continue;
      const wx = cx * CHUNK_SIZE + lx;
      const wy = cy * CHUNK_SIZE + ly;
      const tileRand = mulberry32(chunkSeed(wx, wy))();
      if (tileRand < 0.55) {
        collectibles.push({ kind: "dot", wx, wy });
      } else if (tileRand > 0.97) {
        const fruits: FruitKind[] = ["cherry", "orange", "grape"];
        collectibles.push({
          kind: fruits[Math.floor(tileRand * 10) % fruits.length],
          wx,
          wy,
        });
      }
    }
  }

  return { walls, collectibles };
}

export function createInitialSnapshot(): GameSnapshot {
  const chunks = new Map<string, ChunkData>();
  for (let cy = -1; cy <= 1; cy += 1) {
    for (let cx = -1; cx <= 1; cx += 1) {
      chunks.set(chunkKey(cx, cy), generateChunk(cx, cy));
    }
  }

  const spawn = findWalkableSpawn(chunks, 8, 8);

  return {
    player: { x: spawn.x + 0.5, y: spawn.y + 0.5, dirX: 1, dirY: 0, mouth: 0 },
    score: 0,
    chunks,
  };
}

function findWalkableSpawn(chunks: Map<string, ChunkData>, wx: number, wy: number) {
  for (let r = 0; r < 24; r += 1) {
    for (let dy = -r; dy <= r; dy += 1) {
      for (let dx = -r; dx <= r; dx += 1) {
        const x = wx + dx;
        const y = wy + dy;
        if (!isWall(chunks, x, y)) return { x, y };
      }
    }
  }
  return { x: wx, y: wy };
}

function ensureChunks(chunks: Map<string, ChunkData>, px: number, py: number) {
  const { cx, cy } = worldToChunk(px, py);
  for (let oy = -2; oy <= 2; oy += 1) {
    for (let ox = -2; ox <= 2; ox += 1) {
      const key = chunkKey(cx + ox, cy + oy);
      if (!chunks.has(key)) {
        chunks.set(key, generateChunk(cx + ox, cy + oy));
      }
    }
  }
}

function isWall(chunks: Map<string, ChunkData>, wx: number, wy: number) {
  const { cx, cy, lx, ly } = worldToChunk(wx, wy);
  const chunk = chunks.get(chunkKey(cx, cy));
  if (!chunk) return true;
  return chunk.walls[ly][lx];
}

function collectAtTile(chunks: Map<string, ChunkData>, wx: number, wy: number) {
  const { cx, cy } = worldToChunk(wx, wy);
  const key = chunkKey(cx, cy);
  const chunk = chunks.get(key);
  if (!chunk) return null;

  const index = chunk.collectibles.findIndex((c) => c.wx === wx && c.wy === wy);
  if (index === -1) return null;

  const [item] = chunk.collectibles.splice(index, 1);
  return item;
}

function scoreFor(item: Collectible) {
  if (item.kind === "dot") return 10;
  if (item.kind === "cherry") return 50;
  if (item.kind === "orange") return 80;
  return 100;
}

function nearestCenter(v: number) {
  return Math.round(v - HALF_TILE) + HALF_TILE;
}

function isAlignedToCenter(v: number) {
  return Math.abs(v - nearestCenter(v)) <= ALIGN_THRESHOLD;
}

function getCardinalInput(inputX: number, inputY: number) {
  if (inputX === 0 && inputY === 0) return null;
  if (Math.abs(inputX) >= Math.abs(inputY)) {
    return { x: Math.sign(inputX), y: 0 };
  }
  return { x: 0, y: Math.sign(inputY) };
}

function canEnterTile(chunks: Map<string, ChunkData>, tx: number, ty: number) {
  return !isWall(chunks, tx, ty);
}

function trySetDirection(
  player: PlayerState,
  chunks: Map<string, ChunkData>,
  dirX: number,
  dirY: number,
) {
  const tileX = Math.floor(player.x);
  const tileY = Math.floor(player.y);
  const targetX = tileX + dirX;
  const targetY = tileY + dirY;

  if (!canEnterTile(chunks, targetX, targetY)) return;

  const horizontalTurn = dirX !== 0 && player.dirY === 0;
  const verticalTurn = dirY !== 0 && player.dirX === 0;
  const stopped = player.dirX === 0 && player.dirY === 0;
  const atIntersection = isAlignedToCenter(player.x) && isAlignedToCenter(player.y);

  if (stopped || atIntersection) {
    player.dirX = dirX;
    player.dirY = dirY;
    return;
  }

  if (horizontalTurn && isAlignedToCenter(player.y)) {
    player.dirX = dirX;
    player.dirY = 0;
    player.y = nearestCenter(player.y);
    return;
  }

  if (verticalTurn && isAlignedToCenter(player.x)) {
    player.dirX = 0;
    player.dirY = dirY;
    player.x = nearestCenter(player.x);
  }
}

function moveAlongAxis(
  player: PlayerState,
  chunks: Map<string, ChunkData>,
  axis: "x" | "y",
  delta: number,
) {
  const dir = axis === "x" ? player.dirX : player.dirY;
  if (dir === 0) return;

  const otherAxis = axis === "x" ? "y" : "x";
  const center = nearestCenter(player[otherAxis]);
  const offset = center - player[otherAxis];

  if (Math.abs(offset) > ALIGN_THRESHOLD) {
    const nudge = Math.sign(offset) * Math.min(Math.abs(delta), Math.abs(offset));
    player[otherAxis] += nudge;
    return;
  }

  player[otherAxis] = center;

  const next = player[axis] + delta;
  const tileRow = Math.floor(player[otherAxis]);
  const enteringTile =
    axis === "x"
      ? Math.floor(next + (dir > 0 ? HALF_TILE : -HALF_TILE))
      : Math.floor(next + (dir > 0 ? HALF_TILE : -HALF_TILE));
  const checkX = axis === "x" ? enteringTile : Math.floor(player.x);
  const checkY = axis === "y" ? enteringTile : tileRow;

  if (!canEnterTile(chunks, checkX, checkY)) {
    player[axis] = enteringTile - dir * HALF_TILE;
    return;
  }

  player[axis] = next;
}

export function useInfiniteMaze() {
  const snapshotRef = useRef<GameSnapshot>(createInitialSnapshot());
  const [, bump] = useState(0);

  const getSnapshot = useCallback(() => snapshotRef.current, []);

  const step = useCallback((dt: number, inputX: number, inputY: number) => {
    const snap = snapshotRef.current;
    const player = snap.player;
    const desired = getCardinalInput(inputX, inputY);

    if (desired) {
      trySetDirection(player, snap.chunks, desired.x, desired.y);
    }

    const speed = PLAYER_SPEED * dt;

    if (player.dirX !== 0) {
      moveAlongAxis(player, snap.chunks, "x", player.dirX * speed);
    } else if (player.dirY !== 0) {
      moveAlongAxis(player, snap.chunks, "y", player.dirY * speed);
    }

    player.mouth = (player.mouth + dt * 9) % (Math.PI * 2);

    ensureChunks(snap.chunks, player.x, player.y);

    const tileX = Math.floor(player.x);
    const tileY = Math.floor(player.y);
    const collected = collectAtTile(snap.chunks, tileX, tileY);
    if (collected) {
      snap.score += scoreFor(collected);
    }

    bump((n) => n + 1);
  }, []);

  const reset = useCallback(() => {
    snapshotRef.current = createInitialSnapshot();
    bump((n) => n + 1);
  }, []);

  return { getSnapshot, step, reset };
}

export function isWalkable(chunks: Map<string, ChunkData>, wx: number, wy: number) {
  return !isWall(chunks, wx, wy);
}
