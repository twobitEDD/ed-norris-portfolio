"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function SplitWorldVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 20 });
  const springY = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <TechnicalGrid className="opacity-60" />
      <motion.div
        style={{ rotateY, rotateX }}
        className="relative h-full w-full motion-reduce:transform-none"
      >
        <div className="absolute inset-[8%] rounded-full border border-border-active shadow-[0_0_80px_rgba(70,199,215,0.15)]">
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1a3d2e 0%, #2d5a45 35%, transparent 50%), linear-gradient(225deg, #1a2548 0%, #2a3f6e 40%, #152238 100%)",
              }}
            />
            <div
              className="absolute left-0 top-0 h-full w-1/2"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, rgba(103,213,138,0.5), transparent 55%), linear-gradient(160deg, #1f4d35, #0d2818)",
                clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
              }}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/2"
              style={{
                background:
                  "radial-gradient(circle at 30% 40%, rgba(70,199,215,0.45), transparent 50%), linear-gradient(200deg, #1a2f4a, #0a1525)",
                clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.15),transparent_45%)]" />
            <div
              className="absolute left-1/2 top-[52%] h-24 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-slate-700 to-slate-900 opacity-80"
              aria-hidden="true"
            />
            <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
              <circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(148,163,184,0.3)" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(148,163,184,0.15)" />
              <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(148,163,184,0.15)" />
            </svg>
          </div>
          <div className="absolute -inset-1 rounded-full border border-technology/30 motion-safe:animate-pulse" />
        </div>
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{
              left: `${20 + (i * 7) % 60}%`,
              top: `${15 + (i * 11) % 70}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
