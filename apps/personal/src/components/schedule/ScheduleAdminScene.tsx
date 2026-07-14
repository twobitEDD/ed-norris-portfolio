"use client";

import { useSearchParams } from "next/navigation";
import { Paper } from "@/components/physical-ui/Paper";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";
import { StudioScene } from "@/components/studio/StudioScene";
import { ScheduleAdminView } from "@/components/schedule/ScheduleAdminView";

export function ScheduleAdminScene() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <StudioScene id="schedule-admin" className="!py-10 sm:!py-16">
      <StudioReveal>
        <StudioObject rotate={-0.8}>
          <Paper elevated className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Admin</p>
            <h1 className="mt-2 font-editorial text-2xl font-semibold text-ink">Scheduling requests</h1>
            {!token ? (
              <p className="mt-3 text-sm text-ink-soft">
                Add <code className="rounded bg-black/5 px-1">?token=YOUR_SECRET</code> to the URL. Set{" "}
                <code className="rounded bg-black/5 px-1">SCHEDULE_ADMIN_SECRET</code> in your environment.
              </p>
            ) : (
              <ScheduleAdminView token={token} className="mt-6" />
            )}
          </Paper>
        </StudioObject>
      </StudioReveal>
    </StudioScene>
  );
}
