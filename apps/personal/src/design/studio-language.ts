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
    md: { maxWidth: "720px", aspectRatio: "19/9" },
    lg: { maxWidth: "920px", aspectRatio: "3/4" },
  },
  tablet: {
    sm: { maxWidth: "480px", aspectRatio: "4/3" },
    md: { maxWidth: "640px", aspectRatio: "4/3" },
    lg: { maxWidth: "920px", aspectRatio: "4/3" },
  },
  ipad: {
    sm: { maxWidth: "400px", aspectRatio: "3/4" },
    md: { maxWidth: "640px", aspectRatio: "3/4" },
    lg: { maxWidth: "920px", aspectRatio: "3/4" },
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

/** Horizontal gap between springboard icon cells (px) — shared across tiers. */
export const SPRINGBOARD_ICON_GAP_PX = 12;

/**
 * Touch-device springboard grid per tier.
 * Icon size is computed at render time: min(maxIconPx, (contentWidth − (cols − 1) × gap) ÷ cols).
 * Grid tracks use repeat(cols, minmax(0, 1fr)) so the row always fills the content box width.
 */
export const SPRINGBOARD_ICON_GRID = {
  phone: {
    columns: 4,
    gapPx: SPRINGBOARD_ICON_GAP_PX,
    maxIconPx: 56,
    labelClass: "text-[7px]",
    categoryLabelClass: "mb-1 text-[6px]",
    containerClass: "gap-3",
    buttonGapClass: "gap-0.5",
    rowGapClass: "",
  },
  tablet: {
    columns: 5,
    gapPx: SPRINGBOARD_ICON_GAP_PX,
    maxIconPx: 64,
    labelClass: "text-[8px]",
    categoryLabelClass: "mb-2 text-[7px]",
    containerClass: "gap-4",
    buttonGapClass: "gap-1",
    rowGapClass: "",
  },
  ipad: {
    columns: 6,
    gapPx: SPRINGBOARD_ICON_GAP_PX,
    maxIconPx: 72,
    labelClass: "text-[9px] sm:text-[10px]",
    categoryLabelClass: "mb-2.5 text-[8px] sm:mb-3 sm:text-[9px]",
    containerClass: "min-h-0 flex-1 justify-start space-y-4 sm:space-y-5",
    buttonGapClass: "gap-1.5",
    rowGapClass: "gap-y-4",
  },
} as const satisfies Record<
  SpringboardDeviceTier,
  {
    columns: number;
    gapPx: number;
    maxIconPx: number;
    labelClass: string;
    categoryLabelClass: string;
    containerClass: string;
    buttonGapClass: string;
    rowGapClass: string;
  }
>;

/** Minimum rendered icon edge (px) so labels stay legible on very narrow containers. */
export const SPRINGBOARD_ICON_MIN_PX = 32;

/**
 * iconSize = min(maxIconPx, floor((contentWidth − (columns − 1) × gapPx) ÷ columns))
 * Clamped to SPRINGBOARD_ICON_MIN_PX.
 */
export function computeSpringboardIconPx(
  contentWidthPx: number,
  columns: number,
  gapPx: number,
  maxIconPx: number,
): number {
  if (contentWidthPx <= 0 || columns <= 0) return maxIconPx;
  const trackTotal = contentWidthPx - (columns - 1) * gapPx;
  const raw = trackTotal / columns;
  return Math.min(maxIconPx, Math.max(SPRINGBOARD_ICON_MIN_PX, Math.floor(raw)));
}

/**
 * 1-based grid-column indices that spread `itemCount` icons across `columns` fractional tracks.
 * Partial rows (e.g. Practice=3 on a 6-col iPad grid) land at evenly spaced columns instead of clustering left.
 */
export function spreadSpringboardGridColumns(itemCount: number, columns: number): number[] {
  if (itemCount <= 0) return [];
  if (itemCount === 1) return [Math.ceil(columns / 2)];
  if (itemCount >= columns) {
    return Array.from({ length: itemCount }, (_, i) => (i % columns) + 1);
  }
  return Array.from({ length: itemCount }, (_, i) =>
    Math.round(1 + (i * (columns - 1)) / (itemCount - 1)),
  );
}

/** CSS custom properties consumed by `.springboard-icon-grid` in globals.css. */
export function springboardIconGridStyleProps(tier: SpringboardDeviceTier): Record<string, string> {
  const { columns, gapPx, maxIconPx } = SPRINGBOARD_ICON_GRID[tier];
  return {
    "--sb-cols": String(columns),
    "--sb-gap": `${gapPx}px`,
    "--sb-icon-max": `${maxIconPx}px`,
  };
}

/** Shared device chrome — one large studio width, consistent bezels. */
export const STUDIO_DEVICE = {
  largeMaxWidth: "920px",
  phoneLandscapeMaxWidth: "720px",
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
  bentoMaxWidth: "1200px",
  bentoSection: "relative px-4 pb-28 pt-2 sm:px-8 sm:pb-32 sm:pt-4",
  bentoGrid: "vertical-bento__grid mx-auto w-full min-w-0 max-w-[1200px]",
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
