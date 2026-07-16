/**
 * Norris Studio design language — repeatable tokens for the creator-desk metaphor.
 * Visual concepts are documented in `src/app/globals.css` (header comment block).
 */

/** Five core concepts that govern every surface on the site. */
export const STUDIO_CONCEPTS = [
  {
    id: "desk",
    title: "The Desk",
    description:
      "Dark wood ambient surface (studio-black, wood-dark). Body copy on the desk uses screen-text; navigation and footer use paper-cream on dark.",
  },
  {
    id: "paper-ink",
    title: "Paper & Ink",
    description:
      "Warm cream stock for human content. Ink stays fixed (#1b211e) in day and night — scoped via paper-content, business-card, or screen-surface--warm.",
  },
  {
    id: "devices",
    title: "Devices as Portals",
    description:
      "Phone and tablet bezels frame digital screens. Device screens use screen-text / screen-muted; warm screens hold contact and card content.",
  },
  {
    id: "handwritten",
    title: "Handwritten Margins",
    description:
      "Caveat accents for personal voice — intros, sticky notes, polaroid captions. Never for UI chrome or navigation.",
  },
  {
    id: "studio-light",
    title: "Studio Light",
    description:
      "Day/night toggles ambient desk glow and screen panels. Paper dims slightly at night; ink on paper does not invert.",
  },
] as const;

export type DeviceKind = "phone" | "tablet" | "ipad";
export type DeviceSize = "sm" | "md" | "lg";

/** Width / aspect targets per device family and size tier. */
export const DEVICE_SIZE_MATRIX: Record<
  DeviceKind,
  Record<DeviceSize, { maxWidth: string; aspectRatio?: string }>
> = {
  phone: {
    sm: { maxWidth: "220px", aspectRatio: "9/19" },
    md: { maxWidth: "var(--studio-device-max, 920px)", aspectRatio: "19/9" },
    lg: { maxWidth: "var(--studio-device-max, 920px)", aspectRatio: "3/4" },
  },
  tablet: {
    sm: { maxWidth: "480px", aspectRatio: "4/3" },
    md: { maxWidth: "640px", aspectRatio: "4/3" },
    lg: { maxWidth: "var(--studio-device-max, 920px)", aspectRatio: "4/3" },
  },
  ipad: {
    sm: { maxWidth: "400px", aspectRatio: "3/4" },
    md: { maxWidth: "640px", aspectRatio: "3/4" },
    lg: { maxWidth: "var(--studio-device-max, 920px)", aspectRatio: "3/4" },
  },
} as const;

/** Below this width (container or viewport), springboard uses phone chrome and compact layout. */
export const STUDIO_SPRINGBOARD_COMPACT_WIDTH = 768;

/** At or above this width, springboard uses iPad chrome and the widest icon grid. */
export const STUDIO_SPRINGBOARD_IPAD_WIDTH = 1024;

export type SpringboardDeviceTier = "phone" | "tablet" | "ipad";

/** Resolve springboard device tier from the effective layout width. */
export function resolveSpringboardDeviceTier(layoutWidth: number | null): SpringboardDeviceTier {
  if (layoutWidth === null || layoutWidth >= STUDIO_SPRINGBOARD_IPAD_WIDTH) return "ipad";
  if (layoutWidth < STUDIO_SPRINGBOARD_COMPACT_WIDTH) return "phone";
  return "tablet";
}

/**
 * Touch-device springboard grid per tier — tuned to iOS home-screen proportions.
 * Uniform row/column gutters, generous edge insets on phone, icons fill column tracks.
 * Grid tracks use repeat(cols, minmax(0, 1fr)) — partial rows stay left-aligned like iOS.
 */
export const SPRINGBOARD_ICON_GRID = {
  phone: {
    columns: 4,
    gapPx: 22,
    edgePaddingPx: 22,
    maxIconPx: 80,
    labelGapPx: 5,
    labelClass: "text-[10px] leading-[1.15]",
    containerClass: "",
    edgePaddingClass: "px-[22px]",
  },
  tablet: {
    columns: 5,
    gapPx: 20,
    edgePaddingPx: 24,
    maxIconPx: 88,
    labelGapPx: 5,
    labelClass: "text-[10px] leading-[1.15] sm:text-[11px]",
    containerClass: "",
    edgePaddingClass: "px-6",
  },
  ipad: {
    columns: 6,
    gapPx: 22,
    edgePaddingPx: 28,
    maxIconPx: 96,
    labelGapPx: 6,
    labelClass: "text-[11px] leading-[1.15]",
    containerClass: "min-h-0 flex-1",
    edgePaddingClass: "px-7",
  },
} as const satisfies Record<
  SpringboardDeviceTier,
  {
    columns: number;
    gapPx: number;
    edgePaddingPx: number;
    maxIconPx: number;
    labelGapPx: number;
    labelClass: string;
    containerClass: string;
    edgePaddingClass: string;
  }
>;

/** Widget row always uses four columns so each 1×1 tile ≈ ¼ content width. */
export const SPRINGBOARD_WIDGET_COLUMNS = 4;

/** Minimum rendered icon edge (px) so labels stay legible on very narrow containers. */
export const SPRINGBOARD_ICON_MIN_PX = 32;

/** Scale gutters with springboard content width — ~3.2% of width, clamped for phone/tablet. */
export function computeSpringboardGapPx(
  contentWidthPx: number,
  tier: SpringboardDeviceTier,
): number {
  const base = SPRINGBOARD_ICON_GRID[tier].gapPx;
  if (contentWidthPx <= 0) return base;
  return Math.round(Math.min(28, Math.max(14, contentWidthPx * 0.032, base * 0.75)));
}

/**
 * iconSize = floor((contentWidth − (columns − 1) × gapPx) ÷ columns)), optionally capped.
 * Clamped to SPRINGBOARD_ICON_MIN_PX.
 */
export function computeSpringboardIconPx(
  contentWidthPx: number,
  columns: number,
  gapPx: number,
  maxIconPx?: number,
): number {
  const fallback = maxIconPx ?? SPRINGBOARD_ICON_GRID.ipad.maxIconPx;
  if (contentWidthPx <= 0 || columns <= 0) return fallback;
  const trackTotal = contentWidthPx - (columns - 1) * gapPx;
  const raw = Math.floor(trackTotal / columns);
  const sized = Math.max(SPRINGBOARD_ICON_MIN_PX, raw);
  return maxIconPx !== undefined ? Math.min(maxIconPx, sized) : sized;
}

/** One widget grid cell width — ~¼ of content width minus gutters. */
export function computeSpringboardWidgetCellPx(contentWidthPx: number, gapPx: number): number {
  if (contentWidthPx <= 0) return 80;
  const trackTotal = contentWidthPx - (SPRINGBOARD_WIDGET_COLUMNS - 1) * gapPx;
  return Math.max(48, Math.floor(trackTotal / SPRINGBOARD_WIDGET_COLUMNS));
}

function resolveSpringboardGapPx(
  tier: SpringboardDeviceTier,
  contentWidthPx?: number | null,
): number {
  const base = SPRINGBOARD_ICON_GRID[tier].gapPx;
  if (contentWidthPx == null || contentWidthPx <= 0) return base;
  return computeSpringboardGapPx(contentWidthPx, tier);
}

/** CSS custom properties consumed by the icon grid in globals.css. */
export function springboardIconGridStyleProps(
  tier: SpringboardDeviceTier,
  contentWidthPx?: number | null,
): Record<string, string> {
  const { columns, labelGapPx } = SPRINGBOARD_ICON_GRID[tier];
  const gapPx = resolveSpringboardGapPx(tier, contentWidthPx);
  const iconMaxPx =
    contentWidthPx != null && contentWidthPx > 0
      ? computeSpringboardIconPx(contentWidthPx, columns, gapPx)
      : SPRINGBOARD_ICON_GRID[tier].maxIconPx;

  return {
    "--sb-cols": String(columns),
    "--sb-gap": `${gapPx}px`,
    "--sb-icon-max": `${iconMaxPx}px`,
    "--sb-label-gap": `${labelGapPx}px`,
    "--sb-widget-mb": `${gapPx}px`,
  };
}

/** CSS custom properties for the widget row — fixed four columns, device-relative cell size. */
export function springboardWidgetGridStyleProps(
  tier: SpringboardDeviceTier,
  contentWidthPx?: number | null,
): Record<string, string> {
  const gapPx = resolveSpringboardGapPx(tier, contentWidthPx);
  const widgetCellPx =
    contentWidthPx != null && contentWidthPx > 0
      ? computeSpringboardWidgetCellPx(contentWidthPx, gapPx)
      : 80;

  return {
    "--sb-cols": String(SPRINGBOARD_WIDGET_COLUMNS),
    "--sb-gap": `${gapPx}px`,
    "--sb-widget-cell": `${widgetCellPx}px`,
    "--sb-widget-mb": `${gapPx}px`,
  };
}

/** Shared device chrome — scales via --studio-device-max in globals.css at 2xl+. */
export const STUDIO_DEVICE = {
  largeMaxWidth: "var(--studio-device-max, 920px)",
  phoneLandscapeMaxWidth: "var(--studio-device-max, 920px)",
  phonePortraitDefault: "248px",
  phonePortraitCompact: "220px",
  phoneLauncherWidth: "220px",
  classes: {
    frame: "device-frame device-bezel",
    framePhone: "device-frame device-bezel device-frame--phone",
    phoneLandscape: "device-frame--phone-landscape",
    phoneLarge: "device-frame--phone-large w-full",
    frameTabletFork: "device-frame device-bezel device-frame--tablet-fork",
    frameTabletLauncher: "device-frame device-bezel device-frame--tablet-launcher",
    tabletLarge: "device-frame--tablet-large w-full",
    screen: "screen-surface relative flex flex-col overflow-hidden",
    screenWarm: "screen-surface--warm",
    screenContent: "screen-content",
    phoneScreenContent: "phone-screen-content",
  },
} as const;

/** Layout rhythm for bento grid and section shells. */
export const STUDIO_SPACING = {
  bentoMaxWidth: "var(--studio-bento-max, 1200px)",
  bentoSection: "relative px-4 pb-28 pt-2 sm:px-8 sm:pb-32 sm:pt-4",
  bentoGrid: "vertical-bento__grid w-full min-w-0",
  bentoCellResume: "bento-cell--resume",
  bentoCellWork: "bento-cell--work",
  bentoCellContact: "bento-cell--contact",
} as const;

/**
 * Typography roles — three voices on the desk:
 * editorial (headlines), mono (labels), handwritten (personal).
 */
export const STUDIO_TYPOGRAPHY = {
  /** Mono uppercase label on paper or warm screens */
  label: "font-mono text-[10px] uppercase tracking-[0.18em]",
  labelSmall: "font-mono text-[9px] uppercase tracking-[0.18em]",
  /** Mono label on dark desk / ambient surfaces */
  ambientLabel: "font-mono text-[10px] uppercase tracking-[0.18em] chrome-text-faint",
  ambientLabelMuted: "font-mono text-[10px] uppercase tracking-[0.2em] chrome-text-faint",
  /** Navigation on wood header */
  navLink:
    "shrink-0 whitespace-nowrap min-h-[44px] content-center font-mono text-[11px] uppercase tracking-wider transition",
  navBrand: "font-display text-xs font-bold tracking-[0.12em] chrome-text sm:text-sm",
  navTagline: "font-mono text-[9px] uppercase tracking-[0.18em] chrome-text-tagline",
  editorialHeading: "font-editorial font-semibold text-ink",
  handwritten: "handwritten text-ink",
} as const;

/** Surface class names — prefer these over one-off backgrounds. */
export const STUDIO_SURFACES = {
  paper: "paper-surface",
  paperDesk: "paper-surface paper-surface--desk",
  paperContent: "paper-content",
  notebook: "notebook-surface",
  notebookPage: "notebook-surface__page",
  stickyNote: "sticky-note",
  screen: "screen-surface",
  screenWarm: "screen-surface screen-surface--warm",
  screenContent: "screen-content",
  contactApp: "contact-phone-app",
  businessCard: "business-card",
} as const;

/** Fixed ink on paper — mirrors CSS custom properties in globals.css */
export const STUDIO_INK = {
  paper: "#1b211e",
  paperSoft: "#4e5148",
  paperMuted: "#5c5f56",
  paperFaint: "#6a6d64",
} as const;

/** Practice-area accent colors (CSS var names) */
export const STUDIO_ACCENTS = {
  environment: "environment",
  technology: "technology",
  games: "games",
  marketing: "marketing",
  operations: "operations",
  data: "data",
} as const;
