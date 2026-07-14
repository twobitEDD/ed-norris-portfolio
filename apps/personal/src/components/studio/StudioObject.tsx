"use client";

import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useHydratedScroll } from "@/lib/motion";

type StudioObjectProps = {
  children: React.ReactNode;
  className?: string;
  parallax?: number;
  rotate?: number;
};

export function StudioObject({
  children,
  className,
  parallax = 0,
  rotate,
}: StudioObjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useHydratedScroll(parallax !== 0 ? ref : undefined, {
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax * 20, parallax * -20]);

  if (parallax === 0) {
    return (
      <div className={cn("relative", className)} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={cn("relative motion-reduce:transform-none", className)}>
      <div style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}>{children}</div>
    </motion.div>
  );
}
