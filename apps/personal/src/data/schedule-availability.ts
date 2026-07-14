/** Weekly availability for on-site booking requests. Edit days/times here. */
export const SCHEDULE_TIMEZONE = "America/Los_Angeles";

export const SCHEDULE_CONFIG = {
  timezone: SCHEDULE_TIMEZONE,
  slotMinutes: 30,
  /** How far ahead visitors can book */
  bookingWindowWeeks: 8,
  /** dayOfWeek: 0=Sun … 6=Sat (evaluated in SCHEDULE_TIMEZONE) */
  windows: [
    { dayOfWeek: 2, start: "10:00", end: "16:00" },
    { dayOfWeek: 4, start: "10:00", end: "16:00" },
  ],
} as const;

export type ScheduleWindow = (typeof SCHEDULE_CONFIG.windows)[number];
