"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

type BentoCellProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  span?: "default" | "wide" | "tall" | "full";
  delay?: number;
};

export function BentoCell({ children, id, className, span = "default", delay = 0 }: BentoCellProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  return (
    <motion.article
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...(typeof fadeUp.visible.transition === "object" ? fadeUp.visible.transition : {}),
            delay,
          },
        },
      }}
      className={cn(
        "bento-cell scroll-mt-24",
        span === "wide" && "bento-cell--wide",
        span === "tall" && "bento-cell--tall",
        span === "full" && "bento-cell--full",
        className,
      )}
    >
      {children}
    </motion.article>
  );
}
