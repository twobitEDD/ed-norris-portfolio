/** Shared Pac-Man drawing — closed mouth is a full yellow circle. */

export const PAC_COLOR = "#ffde00";

export type PacManDrawOptions = {
  x: number;
  y: number;
  radius: number;
  /** Facing angle in radians (0 = right). */
  angle?: number;
  /** 0 = closed circle; >0 animates a mouth wedge while eating. */
  mouthOpen?: number;
};

export function drawPacMan(ctx: CanvasRenderingContext2D, options: PacManDrawOptions) {
  const { x, y, radius, angle = 0, mouthOpen = 0 } = options;

  ctx.fillStyle = PAC_COLOR;
  ctx.beginPath();

  if (mouthOpen <= 0.02) {
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.arc(x, y, radius, angle + mouthOpen, angle - mouthOpen, true);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
}

export function pacManMouthFromPhase(phase: number, eating: boolean) {
  if (!eating) return 0;
  return 0.12 + Math.abs(Math.sin(phase)) * 0.42;
}

export function PacManSvgGlyph({
  mouthOpen = 0,
  className,
}: {
  mouthOpen?: number;
  className?: string;
}) {
  if (mouthOpen <= 0.02) {
    return (
      <svg viewBox="-1 -1 2 2" className={className} aria-hidden>
        <circle cx="0" cy="0" r="1" fill={PAC_COLOR} />
      </svg>
    );
  }

  const open = mouthOpen;
  return (
    <svg viewBox="-1 -1 2 2" className={className} aria-hidden>
      <path
        d={`M 0 0 L ${Math.cos(open)} ${Math.sin(open)} A 1 1 0 1 1 ${Math.cos(-open)} ${Math.sin(-open)} Z`}
        fill={PAC_COLOR}
      />
    </svg>
  );
}
