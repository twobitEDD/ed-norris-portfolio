import { useEffect, useState, type RefObject } from "react";
import { useScroll, type UseScrollOptions } from "framer-motion";

export const easeStudio = [0.22, 1, 0.36, 1] as const;

export const durations = {
  micro: 0.18,
  panel: 0.35,
  section: 0.6,
  ambient: 12,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.section, ease: easeStudio },
  },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export function reducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** useScroll with a target ref only after client mount (avoids hydration errors). */
export function useHydratedScroll(
  ref: RefObject<HTMLElement | null> | undefined,
  options?: Omit<UseScrollOptions, "target">,
) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return useScroll({
    ...options,
    ...(ref && mounted ? { target: ref } : {}),
  });
}
