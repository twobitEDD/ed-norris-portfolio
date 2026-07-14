import { NextResponse } from "next/server";
import { getAdminTokenFromRequest, isValidAdminToken } from "@/lib/schedule/auth";
import { isScheduleStoreConfigured, listScheduleRequests } from "@/lib/schedule/store";

export async function GET(request: Request) {
  const token = getAdminTokenFromRequest(request);
  if (!isValidAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isScheduleStoreConfigured()) {
    return NextResponse.json({
      configured: false,
      requests: [],
      message:
        "Upstash Redis is not configured. Requests are emailed to you, but not stored for this admin view.",
    });
  }

  const requests = await listScheduleRequests();
  return NextResponse.json({ configured: true, requests });
}
