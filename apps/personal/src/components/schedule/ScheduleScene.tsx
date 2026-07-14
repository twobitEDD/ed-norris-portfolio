"use client";

import { Paper } from "@/components/physical-ui/Paper";
import { Tablet } from "@/components/physical-ui/Tablet";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";
import { StudioScene } from "@/components/studio/StudioScene";
import { ScheduleBookingForm } from "@/components/schedule/ScheduleBookingForm";
import { SCHEDULE_CONFIG } from "@/data/schedule-availability";

export function ScheduleScene() {
  const timezoneLabel = SCHEDULE_CONFIG.timezone.replace(/_/g, " ");

  return (
    <StudioScene id="schedule" className="!py-10 sm:!py-16">
      <StudioReveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-12">
          <StudioObject rotate={-1.2}>
            <Paper torn pinned>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Studio calendar</p>
              <h1 className="mt-2 font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                Request a chat with Edd
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Pick an open slot on Tuesdays or Thursdays ({timezoneLabel}). This is a request — Edd confirms by
                email before anything lands on the calendar.
              </p>
            </Paper>
          </StudioObject>

          <StudioObject rotate={0.6}>
            <Tablet glow="cyan" className="max-w-3xl">
              <div className="h-full overflow-y-auto bg-screen-surface/95 p-5 sm:p-7">
                <ScheduleBookingForm />
              </div>
            </Tablet>
          </StudioObject>
        </div>
      </StudioReveal>
    </StudioScene>
  );
}
