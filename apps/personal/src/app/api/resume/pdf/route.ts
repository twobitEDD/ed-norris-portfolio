import { NextResponse } from "next/server";
import type { ResumeContent } from "@/lib/resume";
import { generateResumePdf } from "@/components/resume/ResumeDocument";

export async function POST(request: Request) {
  const content = (await request.json()) as ResumeContent;
  const blob = await generateResumePdf(content);
  const buffer = Buffer.from(await blob.arrayBuffer());

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="edd-norris-resume.pdf"',
    },
  });
}
