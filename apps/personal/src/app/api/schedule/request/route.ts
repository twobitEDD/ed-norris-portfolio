import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { SCHEDULE_CONFIG } from "@/data/schedule-availability";
import { sendScheduleRequestEmail } from "@/lib/schedule/email";
import { isValidBookableSlot } from "@/lib/schedule/slots";
import { isSlotBooked, saveScheduleRequest } from "@/lib/schedule/store";
import type { ScheduleRequest } from "@/lib/schedule/types";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().max(2000).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, message, date, time } = parsed.data;

  if (!isValidBookableSlot(date, time)) {
    return NextResponse.json({ error: "That time is no longer available." }, { status: 409 });
  }

  if (await isSlotBooked(date, time)) {
    return NextResponse.json({ error: "That time was just booked. Please pick another slot." }, { status: 409 });
  }

  const scheduleRequest: ScheduleRequest = {
    id: randomUUID(),
    name,
    email,
    message,
    date,
    time,
    timezone: SCHEDULE_CONFIG.timezone,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveScheduleRequest(scheduleRequest);

  const emailResult = await sendScheduleRequestEmail(scheduleRequest);
  if (!emailResult.ok) {
    return NextResponse.json(
      {
        error:
          "Your request was received but email notification failed. Please email Edd directly if you do not hear back.",
        emailError: emailResult.error,
        requestId: scheduleRequest.id,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    requestId: scheduleRequest.id,
    message: "Request sent. Edd will confirm by email.",
  });
}
