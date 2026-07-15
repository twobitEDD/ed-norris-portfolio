"use client";

import { useCallback, useRef, useState } from "react";

export const TILE_SIZE = 28;
export const CHUNK_SIZE = 16;
export const VIEW_RADIUS = 4;
export const PLAYER_SPEED = 4.2;
const ALIGN_THRESHOLD = 0.08;
const HALF_TILE = 0.5;
const TILE_EPS = 1e-6;

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
  eating: boolean;
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

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function worldToChunk(wx: number, wy: number) {
  const cx = Math.floor(wx / CHUNK_SIZE);
  const cy = Math.floor(wy / CHUNK_SIZE);
  const lx = mod(wx, CHUNK_SIZE);
  const ly = mod(wy, CHUNK_SIZE);
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

function tileSeed(wx: number, wy: number) {
  return (wx * 374761393) ^ (wy * 668265263) ^ 0x9e3779b9;
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function tileIndex(v: number) {
  return Math.floor(v + TILE_EPS);
}

function tileCenter(tile: number) {
  return tile + HALF_TILE;
}

function snapToCorridorCenter(player: PlayerState, axis: "x" | "y") {
  const tile = tileIndex(player[axis]);
  player[axis] = tileCenter(tile);
}

/** Deterministic border passages shared across adjacent chunks (world coords only). */
function borderWalkable(wx: number, wy: number) {
  const mid = Math.floor(CHUNK_SIZE / 2);
  const lx = mod(wx, CHUNK_SIZE);
  const ly = mod(wy, CHUNK_SIZE);
  const onBorder = lx === 0 || lx === CHUNK_SIZE - 1 || ly === 0 || ly === CHUNK_SIZE - 1;
  if (!onBorder) return false;

  if (lx === mid || ly === mid) return true;

  const rand = mulberry32(tileSeed(wx, wy))();
  if (lx % 2 === 1 && ly % 2 === 1) return rand > 0.25;
  return rand > 0.62;
}

function carveExtraLoops(walls: boolean[][], rand: () => number) {
  const candidates: { x: number; y: number }[] = [];
  for (let y = 1; y < CHUNK_SIZE - 1; y += 1) {
    for (let x = 1; x < CHUNK_SIZE - 1; x += 1) {
      if (walls[y][x]) continue;
      if (!walls[y][x - 1] && !walls[y][x + 1] && walls[y - 1][x] && walls[y + 1][x]) {
        candidates.push({ x, y: y - 1 });
      }
      if (!walls[y][x - 1] && !walls[y][x + 1] && walls[y + 1][x] && !walls[y - 1][x]) {
        candidates.push({ x, y: y + 1 });
      }
      if (!walls[y - 1][x] && !walls[y + 1][x] && walls[y][x - 1] && walls[y][x + 1]) {
        candidates.push({ x: x - 1, y });
      }
      if (!walls[y - 1][x] && !walls[y + 1][x] && walls[y][x + 1] && !walls[y][x - 1]) {
        candidates.push({ x: x + 1, y });
      }
    }
  }

  for (const cell of shuffle(candidates, rand).slice(0, 4 + Math.floor(rand() * 4))) {
    walls[cell.y][cell.x] = false;
  }
}

export function generateChunk(cx: number, cy: number): ChunkData {
  const walls: boolean[][] = Array.from({ length: CHUNK_SIZE }, () =>
    Array.from({ length: CHUNK_SIZE }, () => true),
  );
  const rand = mulberry32(chunkSeed(cx, cy));
  const visited: boolean[][] = Array.from({ length: CHUNK_SIZE }, () =>
    Array.from({ length: CHUNK_SIZE }, () => false),
  );

  const stack: { x: number; y: number }[] = [{ x: 1, y: 1 }];
  walls[1][1] = false;
  visited[1][1] = true;

  const dirs = [
    { dx: 0, dy: -2 },
    { dx: 2, dy: 0 },
    { dx: 0, dy: 2 },
    { dx: -2, dy: 0 },
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = shuffle(dirs, rand).filter(({ dx, dy }) => {
      const nx = current.x + dx;
      const ny = current.y + dy;
      return nx > 0 && nx < CHUNK_SIZE - 1 && ny > 0 && ny < CHUNK_SIZE - 1 && !visited[ny][nx];
    });

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const pickCount = 1 + (rand() > 0.55 ? 1 : 0);
    for (const { dx, dy } of neighbors.slice(0, pickCount)) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      walls[current.y + dy / 2][current.x + dx / 2] = false;
      walls[ny][nx] = false;
      visited[ny][nx] = true;
      stack.push({ x: nx, y: ny });
    }
  }

  carveExtraLoops(walls, rand);

  for (let ly = 0; ly < CHUNK_SIZE; ly += 1) {
    for (let lx = 0; lx < CHUNK_SIZE; lx += 1) {
      const wx = cx * CHUNK_SIZE + lx;
      const wy = cy * CHUNK_SIZE + ly;
      if (!borderWalkable(wx, wy)) continue;
      walls[ly][lx] = false;
    }
  }

  for (let ly = 0; ly < CHUNK_SIZE; ly += 1) {
    for (let lx = 0; lx < CHUNK_SIZE; lx += 1) {
      if (!walls[ly][lx]) continue;
      const neighbors = [
        [lx - 1, ly],
        [lx + 1, ly],
        [lx, ly - 1],
        [lx, ly + 1],
      ];
      for (const [nx, ny] of neighbors) {
        if (nx < 0 || nx >= CHUNK_SIZE || ny < 0 || ny >= CHUNK_SIZE) continue;
        if (!walls[ny][nx]) {
          walls[ly][lx] = false;
          break;
        }
      }
    }
  }

  const collectibles: Collectible[] = [];
  for (let ly = 0; ly < CHUNK_SIZE; ly += 1) {
    for (let lx = 0; lx < CHUNK_SIZE; lx += 1) {
      if (walls[ly][lx]) continue;
      const wx = cx * CHUNK_SIZE + lx;
      const wy = cy * CHUNK_SIZE + ly;
      const tileRand = mulberry32(tileSeed(wx, wy))();
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
    player: { x: tileCenter(spawn.x), y: tileCenter(spawn.y), dirX: 1, dirY: 0, mouth: 0, eating: false },
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

function isAlignedToCenter(v: number) {
  const tile = tileIndex(v);
  return Math.abs(v - tileCenter(tile)) <= ALIGN_THRESHOLD;
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

function stopAxis(player: PlayerState, axis: "x" | "y") {
  const tile = tileIndex(player[axis]);
  player[axis] = tileCenter(tile);
  if (axis === "x") player.dirX = 0;
  else player.dirY = 0;
}

function trySetDirection(
  player: PlayerState,
  chunks: Map<string, ChunkData>,
  dirX: number,
  dirY: number,
) {
  const tileX = tileIndex(player.x);
  const tileY = tileIndex(player.y);
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
    snapToCorridorCenter(player, "y");
    return;
  }

  if (verticalTurn && isAlignedToCenter(player.x)) {
    player.dirX = 0;
    player.dirY = dirY;
    snapToCorridorCenter(player, "x");
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
  const otherCenter = tileCenter(tileIndex(player[otherAxis]));
  const otherOffset = otherCenter - player[otherAxis];

  if (Math.abs(otherOffset) > ALIGN_THRESHOLD) {
    const nudge = Math.sign(otherOffset) * Math.min(Math.abs(delta), Math.abs(otherOffset));
    player[otherAxis] += nudge;
    return;
  }

  player[otherAxis] = otherCenter;

  const currentTile = tileIndex(player[axis]);
  const aheadTile = currentTile + dir;
  const crossX = axis === "x" ? aheadTile : tileIndex(player.x);
  const crossY = axis === "y" ? aheadTile : tileIndex(player.y);

  if (!canEnterTile(chunks, crossX, crossY)) {
    stopAxis(player, axis);
    return;
  }

  const next = player[axis] + delta;
  const corridorLimit = tileCenter(aheadTile);

  if (dir > 0) {
    player[axis] = Math.min(next, corridorLimit);
  } else {
    player[axis] = Math.max(next, corridorLimit);
  }

  if (Math.abs(player[axis] - corridorLimit) < ALIGN_THRESHOLD) {
    player[axis] = corridorLimit;
  }
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

    const tileX = tileIndex(player.x);
    const tileY = tileIndex(player.y);
    if (isWall(snap.chunks, tileX, tileY)) {
      const spawn = findWalkableSpawn(snap.chunks, tileX, tileY);
      player.x = tileCenter(spawn.x);
      player.y = tileCenter(spawn.y);
      player.dirX = 0;
      player.dirY = 0;
    }

    ensureChunks(snap.chunks, player.x, player.y);

    const collected = collectAtTile(snap.chunks, tileX, tileY);
    if (collected) {
      snap.score += scoreFor(collected);
      player.eating = true;
      player.mouth = (player.mouth + dt * 9) % (Math.PI * 2);
    } else {
      player.eating = false;
      player.mouth = 0;
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
