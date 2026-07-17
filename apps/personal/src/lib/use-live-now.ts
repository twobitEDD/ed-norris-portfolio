"use client";

import { useEffect, useState } from "react";

/** Live `Date` for springboard clocks — 30s ticks to limit re-renders (minute display is enough). */
export function useLiveNow(active = true): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!active) return;

    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [active]);

  return now;
}
