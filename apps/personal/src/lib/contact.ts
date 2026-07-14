export const CONTACT_EMAIL = "EddNorris@2bitdev.com";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const SCHEDULE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's schedule a chat")}`;

/** On-site booking page (used when no external scheduler is configured). */
export const SCHEDULE_PATH = "/schedule";

/** External scheduling URL (Calendly, etc.). Falls back to on-site `/schedule` when unset. */
export function getSchedulingUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SCHEDULING_URL?.trim();
  return url || null;
}

export function getSchedulingHref(): string {
  return getSchedulingUrl() ?? SCHEDULE_PATH;
}

export function isExternalScheduling(): boolean {
  return getSchedulingUrl() !== null;
}
