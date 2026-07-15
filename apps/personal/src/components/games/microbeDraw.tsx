/** Microbe Explorer sprites — black explorer, water dots, colored microbes. */

export type MicrobeDrawOptions = {
  x: number;
  y: number;
  radius: number;
  dirX: number;
  dirY: number;
  pulse?: number;
};

export function drawMicrobeHero(ctx: CanvasRenderingContext2D, options: MicrobeDrawOptions) {
  const { x, y, radius, dirX, dirY, pulse = 0 } = options;
  const angle = Math.atan2(dirY || 0.01, dirX || 1);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const r = radius * (1 + pulse * 0.04);
  ctx.fillStyle = "#0a0a0f";
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(120, 200, 255, 0.35)";
  ctx.lineWidth = radius * 0.08;
  ctx.stroke();

  const eyeOffset = radius * 0.28;
  const eyeR = radius * 0.22;
  for (const side of [-1, 1]) {
    ctx.fillStyle = "#f4f8ff";
    ctx.beginPath();
    ctx.arc(eyeOffset, side * eyeOffset * 0.55, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0a0f";
    ctx.beginPath();
    ctx.arc(eyeOffset + eyeR * 0.25, side * eyeOffset * 0.55, eyeR * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export function drawWaterDot(ctx: CanvasRenderingContext2D, cx: number, cy: number, size = 0.1) {
  ctx.fillStyle = "#3b9eff";
  ctx.beginPath();
  ctx.arc(cx, cy, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(180, 230, 255, 0.55)";
  ctx.beginPath();
  ctx.arc(cx - size * 0.25, cy - size * 0.25, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
}

const MICROBE_COLORS = {
  cherry: { body: "#ff5c8a", glow: "#ffb3cc" },
  orange: { body: "#ff9f43", glow: "#ffd9a8" },
  grape: { body: "#9b59f5", glow: "#d4b8ff" },
} as const;

export type MicrobeKind = keyof typeof MICROBE_COLORS;

export function drawMicrobeCollectible(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  kind: MicrobeKind,
  size = 0.22,
) {
  const colors = MICROBE_COLORS[kind];
  ctx.fillStyle = colors.glow;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 1.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.body;
  ctx.beginPath();
  ctx.arc(cx, cy, size, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 4; i += 1) {
    const a = (i / 4) * Math.PI * 2;
    const px = cx + Math.cos(a) * size * 0.85;
    const py = cy + Math.sin(a) * size * 0.85;
    ctx.fillStyle = colors.body;
    ctx.beginPath();
    ctx.arc(px, py, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function MicrobeSvgGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#0a0a0f" stroke="rgba(120,200,255,0.4)" strokeWidth="1.5" />
      <circle cx="20" cy="12" r="3.5" fill="#f4f8ff" />
      <circle cx="21" cy="12" r="1.5" fill="#0a0a0f" />
      <circle cx="20" cy="20" r="3.5" fill="#f4f8ff" />
      <circle cx="21" cy="20" r="1.5" fill="#0a0a0f" />
      <circle cx="8" cy="8" r="2" fill="#3b9eff" opacity="0.8" />
      <circle cx="26" cy="24" r="2.5" fill="#9b59f5" opacity="0.85" />
    </svg>
  );
}
