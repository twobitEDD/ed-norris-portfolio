import { NextResponse } from "next/server";
import { SCHEDULE_CONFIG } from "@/data/schedule-availability";
import { formatSlotLabel, getSlotsForDate } from "@/lib/schedule/slots";
import { getBookedTimesForDate } from "@/lib/schedule/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date")?.trim();

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "A valid date query param is required (YYYY-MM-DD)." }, { status: 400 });
  }

  const bookedTimes = await getBookedTimesForDate(date);
  const times = getSlotsForDate(date, bookedTimes);

  return NextResponse.json({
    date,
    timezone: SCHEDULE_CONFIG.timezone,
    slots: times.map((time) => ({
      time,
      label: formatSlotLabel(time, SCHEDULE_CONFIG.timezone),
    })),
  });
}
