"use client";

import { useEffect, useState, type RefObject } from "react";

type UseInViewportOptions = {
  /** Fraction of element that must be visible (0–1). Default 0. */
  threshold?: number;
  rootMargin?: string;
};

/** True when the element intersects the viewport per IntersectionObserver. */
export function useInViewport(
  ref: RefObject<Element | null>,
  { threshold = 0, rootMargin = "0px" }: UseInViewportOptions = {},
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold: threshold > 0 ? [0, threshold] : 0, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return visible;
}

type UseViewportCenteredOptions = {
  /** Minimum intersection ratio before center check applies. */
  minRatio?: number;
  /** Max distance from viewport vertical center as a fraction of viewport height. */
  centerTolerance?: number;
};

/** True when element is sufficiently visible and near the viewport vertical center. */
export function useViewportCentered(
  ref: RefObject<Element | null>,
  { minRatio = 0.5, centerTolerance = 0.25 }: UseViewportCenteredOptions = {},
) {
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = visibleHeight / Math.max(rect.height, 1);

      if (ratio < minRatio) {
        setCentered(false);
        return;
      }

      const centerY = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      setCentered(Math.abs(centerY - viewportCenter) <= vh * centerTolerance);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(schedule, {
      threshold: [0, 0.1, minRatio, 0.75, 1],
    });
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, minRatio, centerTolerance]);

  return centered;
}
