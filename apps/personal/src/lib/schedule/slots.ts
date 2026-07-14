import { SCHEDULE_CONFIG } from "@/data/schedule-availability";

const WEEKDAY_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getTodayInTimezone(timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

export function getDayOfWeekInTimezone(dateStr: string, timeZone: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  const noonUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(noonUtc);
  return WEEKDAY_TO_INDEX[weekday] ?? 0;
}

export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatSlotLabel(time: string, timeZone: string): string {
  const slotDate = parseSlotDateTime("1970-01-01", time, timeZone);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(slotDate);
}

export function parseSlotDateTime(dateStr: string, timeStr: string, timeZone: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  let timestamp = Date.UTC(year, month - 1, day, hour, minute);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(timestamp)).map((part) => [part.type, part.value]),
    );

    let parsedHour = Number(parts.hour);
    if (parsedHour === 24) parsedHour = 0;

    const actual = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      parsedHour,
      Number(parts.minute),
    );
    const desired = Date.UTC(year, month - 1, day, hour, minute);
    timestamp += desired - actual;
  }

  return new Date(timestamp);
}

function addDaysToDateString(dateStr: string, days: number): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day + days));
  return utc.toISOString().slice(0, 10);
}

export function getAvailableDates(): string[] {
  const { timezone, bookingWindowWeeks, windows } = SCHEDULE_CONFIG;
  const today = getTodayInTimezone(timezone);
  const allowedDays = new Set<number>(windows.map((window) => window.dayOfWeek));
  const totalDays = bookingWindowWeeks * 7;
  const dates: string[] = [];

  for (let offset = 0; offset <= totalDays; offset += 1) {
    const date = addDaysToDateString(today, offset);
    if (allowedDays.has(getDayOfWeekInTimezone(date, timezone))) {
      dates.push(date);
    }
  }

  return dates;
}

export function getSlotsForDate(dateStr: string, bookedTimes: Set<string> = new Set()): string[] {
  const { timezone, slotMinutes, windows } = SCHEDULE_CONFIG;
  const dayOfWeek = getDayOfWeekInTimezone(dateStr, timezone);
  const window = windows.find((entry) => entry.dayOfWeek === dayOfWeek);
  if (!window) return [];

  const startMinutes = parseTimeToMinutes(window.start);
  const endMinutes = parseTimeToMinutes(window.end);
  const now = new Date();
  const slots: string[] = [];

  for (let minutes = startMinutes; minutes + slotMinutes <= endMinutes; minutes += slotMinutes) {
    const time = minutesToTime(minutes);
    const slotStart = parseSlotDateTime(dateStr, time, timezone);
    if (slotStart <= now) continue;
    if (bookedTimes.has(time)) continue;
    slots.push(time);
  }

  return slots;
}

export function isValidBookableSlot(dateStr: string, timeStr: string): boolean {
  const { timezone } = SCHEDULE_CONFIG;
  const available = getSlotsForDate(dateStr);
  if (!available.includes(timeStr)) return false;
  return parseSlotDateTime(dateStr, timeStr, timezone) > new Date();
}

export function formatRequestDateTime(dateStr: string, timeStr: string, timeZone: string): string {
  const instant = parseSlotDateTime(dateStr, timeStr, timeZone);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(instant);
}
