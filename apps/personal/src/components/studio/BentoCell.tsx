"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type BentoCellProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  span?: "default" | "wide" | "tall" | "full";
  /** Defer paint for below-fold cells (content-visibility: auto). */
  deferPaint?: boolean;
};

export function BentoCell({
  children,
  id,
  className,
  span = "default",
  deferPaint = false,
}: BentoCellProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-4% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={id}
      className={cn(
        "bento-cell scroll-mt-28",
        visible ? "bento-cell--visible" : "bento-cell--hidden",
        deferPaint && "bento-cell--deferred",
        span === "wide" && "bento-cell--wide",
        span === "tall" && "bento-cell--tall",
        span === "full" && "bento-cell--full",
        className,
      )}
    >
      {children}
    </article>
  );
}
