import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactMessageEmail, type ContactMessage } from "@/lib/contact/message-email";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const contactMessage: ContactMessage = {
    id: randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  const emailResult = await sendContactMessageEmail(contactMessage);
  if (!emailResult.ok) {
    console.error("[contact] email failed:", emailResult.error, contactMessage.id);
    return NextResponse.json(
      {
        error:
          "Could not send your message right now. Please email Edd directly and mention you tried the site form.",
        emailError: emailResult.error,
        messageId: contactMessage.id,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    messageId: contactMessage.id,
    message: "Message sent. Edd will get back to you soon.",
  });
}
