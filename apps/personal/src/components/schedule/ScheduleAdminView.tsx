"use client";

import { useEffect, useMemo, useState } from "react";
import { SCHEDULE_CONFIG } from "@/data/schedule-availability";
import { formatRequestDateTime } from "@/lib/schedule/slots";
import type { ScheduleRequest } from "@/lib/schedule/types";
import { cn } from "@/lib/cn";

type ScheduleAdminViewProps = {
  token: string;
  className?: string;
};

export function ScheduleAdminView({ token, className }: ScheduleAdminViewProps) {
  const [requests, setRequests] = useState<ScheduleRequest[]>([]);
  const [configured, setConfigured] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/schedule/requests?token=${encodeURIComponent(token)}`);
        const data = (await res.json()) as {
          requests?: ScheduleRequest[];
          configured?: boolean;
          message?: string;
          error?: string;
        };

        if (!cancelled) {
          if (!res.ok) {
            setError(data.error ?? "Could not load requests.");
            return;
          }
          setConfigured(data.configured ?? true);
          setMessage(data.message ?? "");
          setRequests(data.requests ?? []);
        }
      } catch {
        if (!cancelled) setError("Network error while loading requests.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const grouped = useMemo(() => {
    const map = new Map<string, ScheduleRequest[]>();
    for (const request of requests) {
      const bucket = map.get(request.date) ?? [];
      bucket.push(request);
      map.set(request.date, bucket);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [requests]);

  if (loading) {
    return <p className={cn("text-sm text-ink-soft", className)}>Loading requests…</p>;
  }

  if (error) {
    return (
      <p className={cn("rounded border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-900", className)} role="alert">
        {error}
      </p>
    );
  }

  if (!configured) {
    return (
      <div className={cn("rounded border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm text-amber-950", className)}>
        <p className="font-semibold">Storage not configured</p>
        <p className="mt-1">{message || "Check your email inbox for booking requests."}</p>
        <p className="mt-2 text-xs">
          Add <code className="rounded bg-white/70 px-1">UPSTASH_REDIS_REST_URL</code> and{" "}
          <code className="rounded bg-white/70 px-1">UPSTASH_REDIS_REST_TOKEN</code> to enable this view.
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return <p className={cn("text-sm text-ink-soft", className)}>No pending requests yet.</p>;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {grouped.map(([date, dayRequests]) => (
        <section key={date}>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            {formatRequestDateTime(date, dayRequests[0]?.time ?? "10:00", SCHEDULE_CONFIG.timezone).split(",")[0]}
          </h3>
          <ul className="mt-3 space-y-3">
            {dayRequests
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((request) => (
                <li
                  key={request.id}
                  className="rounded border border-ink/15 bg-white/50 px-4 py-3 text-sm text-ink"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">{request.name}</p>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-1 text-ink-soft">
                    {formatRequestDateTime(request.date, request.time, request.timezone)}
                  </p>
                  <p className="mt-1">
                    <a href={`mailto:${request.email}`} className="underline decoration-ink/30 underline-offset-2">
                      {request.email}
                    </a>
                  </p>
                  {request.message && <p className="mt-2 text-ink-soft">{request.message}</p>}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
