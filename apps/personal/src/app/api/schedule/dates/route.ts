import { NextResponse } from "next/server";
import { getAvailableDates } from "@/lib/schedule/slots";

export async function GET() {
  return NextResponse.json({ dates: getAvailableDates() });
}
