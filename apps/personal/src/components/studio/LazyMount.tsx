"use client";

import { useRef, type ReactNode } from "react";
import { useInViewport } from "@/lib/useInViewport";

type LazyMountProps = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
};

export function LazyMount({
  children,
  placeholder,
  rootMargin = "160px 0px",
  minHeight = "280px",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInViewport(ref, { threshold: 0.01, rootMargin });

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : placeholder}
    </div>
  );
}
