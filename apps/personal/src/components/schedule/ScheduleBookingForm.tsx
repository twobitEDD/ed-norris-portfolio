"use client";

import { useEffect, useMemo, useState } from "react";
import { SCHEDULE_CONFIG } from "@/data/schedule-availability";
import { cn } from "@/lib/cn";

type ScheduleSlotOption = {
  time: string;
  label: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type ScheduleBookingFormProps = {
  className?: string;
};

function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function ScheduleBookingForm({ className }: ScheduleBookingFormProps) {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<ScheduleSlotOption[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadDates() {
      setLoadingDates(true);
      try {
        const res = await fetch("/api/schedule/dates");
        const data = (await res.json()) as { dates?: string[] };
        if (!cancelled) {
          const nextDates = data.dates ?? [];
          setDates(nextDates);
          setSelectedDate(nextDates[0] ?? "");
        }
      } catch {
        if (!cancelled) setErrorMessage("Could not load available dates.");
      } finally {
        if (!cancelled) setLoadingDates(false);
      }
    }
    void loadDates();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      setSelectedTime("");
      return;
    }

    let cancelled = false;
    async function loadSlots() {
      setLoadingSlots(true);
      setSelectedTime("");
      try {
        const res = await fetch(`/api/schedule/slots?date=${encodeURIComponent(selectedDate)}`);
        const data = (await res.json()) as { slots?: ScheduleSlotOption[]; error?: string };
        if (!cancelled) {
          if (!res.ok) {
            setErrorMessage(data.error ?? "Could not load time slots.");
            setSlots([]);
            return;
          }
          setSlots(data.slots ?? []);
        }
      } catch {
        if (!cancelled) setErrorMessage("Could not load time slots.");
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }
    void loadSlots();
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const timezoneLabel = useMemo(
    () => SCHEDULE_CONFIG.timezone.replace(/_/g, " "),
    [],
  );

  const availableDateSet = useMemo(() => new Set(dates), [dates]);

  const minDate = dates[0] ?? "";
  const maxDate = dates[dates.length - 1] ?? "";

  const selectedDateLabel = selectedDate ? formatDateLabel(selectedDate) : "";

  const dateUnavailable =
    selectedDate.length > 0 && !loadingDates && dates.length > 0 && !availableDateSet.has(selectedDate);

  function handleDateChange(value: string) {
    setSelectedDate(value);
    if (value && !availableDateSet.has(value)) {
      setErrorMessage("Only Tuesdays and Thursdays have open slots in the booking window.");
    } else {
      setErrorMessage("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/schedule/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          date: selectedDate,
          time: selectedTime,
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setSubmitState("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (submitState === "success") {
    return (
      <div className={cn("rounded border border-environment/30 bg-environment/10 px-5 py-6 text-ink", className)}>
        <p className="font-editorial text-xl font-semibold">Request sent</p>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks — your preferred time is on its way to Edd. You&apos;ll get a confirmation by email once it&apos;s
          accepted.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs text-ink-soft">
          Your name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full min-h-[44px] rounded border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink"
            autoComplete="name"
          />
        </label>
        <label className="block text-xs text-ink-soft">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full min-h-[44px] rounded border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="block text-xs text-ink-soft">
          <label htmlFor="schedule-preferred-date">Preferred date</label>
          <input
            id="schedule-preferred-date"
            required
            type="date"
            value={selectedDate}
            onChange={(event) => handleDateChange(event.target.value)}
            disabled={loadingDates || dates.length === 0}
            min={minDate || undefined}
            max={maxDate || undefined}
            aria-invalid={dateUnavailable || undefined}
            aria-describedby={
              dateUnavailable
                ? "schedule-date-error"
                : selectedDateLabel
                  ? "schedule-date-label"
                  : "schedule-date-hint"
            }
            className={cn(
              "mt-1 w-full min-h-[44px] rounded border bg-white/60 px-3 py-2 text-sm text-ink",
              "border-ink/20 [color-scheme:light]",
              dateUnavailable && "border-red-400/70",
            )}
          />
          {loadingDates ? (
            <p id="schedule-date-hint" className="mt-1 text-[11px] text-ink-soft">
              Loading available dates…
            </p>
          ) : dates.length === 0 ? (
            <p id="schedule-date-hint" className="mt-1 text-[11px] text-ink-soft">
              No dates available right now.
            </p>
          ) : dateUnavailable ? (
            <p id="schedule-date-error" className="mt-1 text-[11px] text-red-900" role="alert">
              Pick a Tuesday or Thursday within the next {SCHEDULE_CONFIG.bookingWindowWeeks} weeks.
            </p>
          ) : selectedDateLabel ? (
            <p id="schedule-date-label" className="mt-1 text-[11px] text-ink-soft">
              {selectedDateLabel} · Tuesdays &amp; Thursdays only
            </p>
          ) : (
            <p id="schedule-date-hint" className="mt-1 text-[11px] text-ink-soft">
              Tuesdays &amp; Thursdays · next {SCHEDULE_CONFIG.bookingWindowWeeks} weeks
            </p>
          )}
        </div>

        <label className="block text-xs text-ink-soft">
          Time ({timezoneLabel})
          <select
            required
            value={selectedTime}
            onChange={(event) => setSelectedTime(event.target.value)}
            disabled={loadingSlots || slots.length === 0}
            className="mt-1 w-full min-h-[44px] rounded border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink"
          >
            {loadingSlots && <option value="">Loading times…</option>}
            {!loadingSlots && slots.length === 0 && <option value="">No open slots</option>}
            {slots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-xs text-ink-soft">
        What would you like to chat about?
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          className="mt-1 w-full rounded border border-ink/20 bg-white/60 px-3 py-2 text-sm text-ink"
          placeholder="Optional — project, role, collaboration, etc."
        />
      </label>

      {errorMessage && (
        <p className="rounded border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={
          submitState === "submitting" ||
          !selectedDate ||
          dateUnavailable ||
          !selectedTime ||
          loadingDates ||
          loadingSlots
        }
        className="w-full min-h-[44px] rounded border border-ink/30 bg-ink px-4 py-2.5 text-sm font-semibold text-paper-cream transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState === "submitting" ? "Sending request…" : "Request this time"}
      </button>

      <p className="text-xs text-ink-soft">
        This sends a booking request — not an automatic calendar hold. Edd confirms by email.
      </p>
    </form>
  );
}
