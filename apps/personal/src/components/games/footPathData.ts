/**
 * Curved foot-path from co2trust-site `public/assets/images/multipage/footpath.svg`.
 * viewBox: 0 0 119 66 — primary trail stroke path.
 */
export const CO2TRUST_FOOTPATH_SOURCE =
  "co2trust-site/public/assets/images/multipage/footpath.svg";

export const FOOTPATH_VIEWBOX = { width: 119, height: 66 } as const;

/** Primary curved trail used by FootprintTrail on co2trust-site. */
export const FOOTPATH_MAIN_D =
  "M-6,78c2.374,-2.124 7.123,-6.373 10.5,-9.75c7.25,-7.25 24.125,-28.875 33,-33.75c6.061,-3.329 14.112,1.316 20.25,4.5c6.547,3.397 12.285,11.131 19.035,15.881c6.75,4.75 15.763,9.433 21.465,12.619c4.164,2.327 9.625,4.083 12.75,6.5c2.637,2.039 4.879,6.013 6,8";

export type PathPoint = { x: number; y: number; angle: number };

export function sampleSvgPath(
  pathD: string,
  viewBox: { width: number; height: number },
  targetWidth: number,
  targetHeight: number,
  sampleInterval = 8,
): PathPoint[] {
  if (typeof document === "undefined") return [];

  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${viewBox.width} ${viewBox.height}`);
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");

  const path = document.createElementNS(svgNs, "path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const length = path.getTotalLength();
  const points: PathPoint[] = [];

  for (let i = 0; i <= length; i += sampleInterval) {
    const p = path.getPointAtLength(i);
    const next = path.getPointAtLength(Math.min(i + sampleInterval, length));
    const angle = Math.atan2(next.y - p.y, next.x - p.x);
    points.push({
      x: (p.x / viewBox.width) * targetWidth,
      y: (p.y / viewBox.height) * targetHeight,
      angle,
    });
  }

  document.body.removeChild(svg);
  return points;
}
