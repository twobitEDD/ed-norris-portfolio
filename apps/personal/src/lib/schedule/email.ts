import { CONTACT_EMAIL } from "@/lib/contact";
import { formatRequestDateTime } from "@/lib/schedule/slots";
import type { ScheduleRequest } from "@/lib/schedule/types";
import { buildScheduleIcs } from "@/lib/schedule/ics";

type SendScheduleEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

function getNotifyEmail(): string {
  return process.env.SCHEDULE_NOTIFY_EMAIL?.trim() || CONTACT_EMAIL;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
}

export async function sendScheduleRequestEmail(
  request: ScheduleRequest,
): Promise<SendScheduleEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const when = formatRequestDateTime(request.date, request.time, request.timezone);
  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/schedule/admin?token=${encodeURIComponent(process.env.SCHEDULE_ADMIN_SECRET ?? "")}`
    : null;

  const lines = [
    `New scheduling request from ${request.name}`,
    "",
    `When: ${when}`,
    `Visitor email: ${request.email}`,
    request.message ? `Message: ${request.message}` : null,
    "",
    `Request ID: ${request.id}`,
    adminUrl ? `Admin: ${adminUrl}` : null,
  ].filter(Boolean);

  const ics = buildScheduleIcs(request);

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: getFromEmail(),
    to: getNotifyEmail(),
    replyTo: request.email,
    subject: `Schedule request: ${request.name} — ${when}`,
    text: lines.join("\n"),
    attachments: [
      {
        filename: "meeting-request.ics",
        content: Buffer.from(ics, "utf-8"),
        contentType: "text/calendar",
      },
    ],
  });

  if (result.error) {
    return { ok: false, error: result.error.message };
  }

  return { ok: true, id: result.data?.id };
}
