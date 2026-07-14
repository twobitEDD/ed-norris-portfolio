import { parseSlotDateTime } from "@/lib/schedule/slots";
import type { ScheduleRequest } from "@/lib/schedule/types";

function formatIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,");
}

export function buildScheduleIcs(request: ScheduleRequest): string {
  const start = parseSlotDateTime(request.date, request.time, request.timezone);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const now = new Date();
  const uid = `${request.id}@edd-norris-schedule`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Edd Norris Portfolio//Schedule Request//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtc(now)}`,
    `DTSTART:${formatIcsUtc(start)}`,
    `DTEND:${formatIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(`Chat with ${request.name}`)}`,
    `DESCRIPTION:${escapeIcsText(request.message || "Portfolio scheduling request")}`,
    `ORGANIZER;CN=Edd Norris:mailto:${process.env.SCHEDULE_NOTIFY_EMAIL || "EddNorris@2bitdev.com"}`,
    `ATTENDEE;CN=${escapeIcsText(request.name)};RSVP=TRUE:mailto:${request.email}`,
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
