/**
 * 2bitENT production studio design language.
 * Charcoal studio surface + cream paper + device portals — distinct from 2bitDEV's warm wood desk.
 */

export type DeviceKind = "phone" | "ipad";
export type DeviceSize = "sm" | "md" | "lg";

export const DEVICE_SIZE_MATRIX: Record<
  DeviceKind,
  Record<DeviceSize, { maxWidth: string; aspectRatio?: string }>
> = {
  phone: {
    sm: { maxWidth: "220px", aspectRatio: "9/19" },
    md: { maxWidth: "360px", aspectRatio: "9/19" },
    lg: { maxWidth: "var(--ent-device-max, 420px)", aspectRatio: "9/19" },
  },
  ipad: {
    sm: { maxWidth: "400px", aspectRatio: "3/4" },
    md: { maxWidth: "640px", aspectRatio: "3/4" },
    lg: { maxWidth: "var(--ent-device-max, 920px)", aspectRatio: "3/4" },
  },
};

export const ENT_DEVICE = {
  largeMaxWidth: "var(--ent-device-max, 920px)",
  classes: {
    framePhone: "device-frame device-bezel device-frame--phone",
    phoneLarge: "device-frame--phone-large w-full",
    frameTabletLauncher: "device-frame device-bezel device-frame--tablet-launcher",
    tabletLarge: "device-frame--tablet-large w-full",
    screen: "screen-surface relative flex flex-col overflow-hidden",
    phoneScreenContent: "phone-screen-content",
  },
} as const;

export const ENT_SURFACES = {
  paper: "paper-surface",
  paperDesk: "paper-surface paper-surface--desk",
  paperContent: "paper-content",
} as const;

export const ENT_TYPOGRAPHY = {
  label: "font-mono text-[10px] uppercase tracking-[0.18em]",
  navBrand: "font-display text-sm font-bold tracking-[0.14em]",
  navLink: "font-mono text-[11px] uppercase tracking-wider transition",
} as const;

export const SPRINGBOARD_ICON_GRID = {
  phone: { columns: 4, gapPx: 18, maxIconPx: 72, labelGapPx: 5 },
  ipad: { columns: 4, gapPx: 22, maxIconPx: 88, labelGapPx: 6 },
} as const;

export const SPRINGBOARD_WIDGET_COLUMNS = 4;

export function springboardIconGridStyleProps(columns: number, gapPx: number, iconMaxPx: number) {
  return {
    "--sb-cols": String(columns),
    "--sb-gap": `${gapPx}px`,
    "--sb-icon-max": `${iconMaxPx}px`,
    "--sb-label-gap": "5px",
    "--sb-widget-mb": `${gapPx}px`,
  } as Record<string, string>;
}

export function springboardWidgetGridStyleProps(gapPx: number, rows = 2) {
  return {
    "--sb-cols": String(SPRINGBOARD_WIDGET_COLUMNS),
    "--sb-gap": `${gapPx}px`,
    "--sb-widget-rows": String(rows),
    "--sb-widget-mb": `${gapPx}px`,
  } as Record<string, string>;
}
