import { CONTACT_EMAIL } from "@/lib/contact";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type SendContactMessageResult = { ok: true; id?: string } | { ok: false; error: string };

function getNotifyEmail(): string {
  return process.env.CONTACT_NOTIFY_EMAIL?.trim() || process.env.SCHEDULE_NOTIFY_EMAIL?.trim() || CONTACT_EMAIL;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
}

export async function sendContactMessageEmail(
  message: ContactMessage,
): Promise<SendContactMessageResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const lines = [
    `New site message from ${message.name}`,
    "",
    `Email: ${message.email}`,
    "",
    message.message,
    "",
    `Message ID: ${message.id}`,
    `Received: ${message.createdAt}`,
  ];

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: getFromEmail(),
    to: getNotifyEmail(),
    replyTo: message.email,
    subject: `Site message: ${message.name}`,
    text: lines.join("\n"),
  });

  if (result.error) {
    return { ok: false, error: result.error.message };
  }

  return { ok: true, id: result.data?.id };
}
