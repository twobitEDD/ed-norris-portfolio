import Link from "next/link";
import Image from "next/image";
import { practices } from "@/data";
import type { Practice } from "@/data/types";
import { co2tBrand } from "@/data/career-images";
import { Tablet } from "@/components/physical-ui/Tablet";
import { cn } from "@/lib/cn";

const practiceImages = {
  environmental: co2tBrand.mascot.src,
  creative: "/assets/practice-creative-bg.webp",
} as const;

const practiceImagePosition = {
  environmental: "center 20%",
  creative: "center",
} as const;

function ForkPath({ practice, side }: { practice: Practice; side: "left" | "right" }) {
  const imageKey = practice.id === "environmental" ? "environmental" : "creative";
  const isEnvironmental = practice.id === "environmental";

  return (
    <Link
      href={practice.href}
      className={cn(
        "practice-fork-path group relative flex min-h-[120px] flex-1 flex-col justify-end overflow-hidden sm:min-h-0",
        side === "left" ? "practice-fork-path--left" : "practice-fork-path--right",
        isEnvironmental && "practice-fork-path--env",
      )}
    >
      <Image
        src={practiceImages[imageKey]}
        alt={isEnvironmental ? co2tBrand.mascot.alt : ""}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.04]"
        style={{ objectPosition: practiceImagePosition[imageKey] }}
        sizes="(max-width: 640px) 100vw, 280px"
      />
      <div className="practice-fork-path__wash absolute inset-0" />
      <div className="practice-panel-scrim absolute inset-0" />
      <div
        className={cn(
          "practice-fork-path__chevron absolute top-1/2 z-10 -translate-y-1/2 text-white/50 transition duration-300 group-hover:text-white/90",
          side === "left" ? "left-2.5 sm:left-3" : "right-2.5 sm:right-3",
        )}
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          {side === "left" ? (
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>
      <div className="relative z-10 p-3 sm:p-3.5">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
          {practice.number}
        </p>
        <h3 className="mt-0.5 text-[11px] font-semibold leading-snug text-white sm:text-[12px]">{practice.title}</h3>
        {practice.tagline && (
          <p className="mt-0.5 hidden text-[9px] font-medium italic text-white/75 sm:block sm:text-[10px]">
            {practice.tagline}
          </p>
        )}
        <span className="mt-1.5 inline-flex text-[10px] font-medium text-white/90 opacity-70 transition group-hover:opacity-100 sm:mt-2 sm:text-[11px]">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export function PracticeTablet() {
  const environmental = practices.find((p) => p.id === "environmental")!;
  const creative = practices.find((p) => p.id === "creative")!;

  return (
    <Tablet glow="cyan" mode="fork" className="w-full max-w-[520px] lg:ml-auto lg:max-w-none">
      <div className="practice-fork flex h-full flex-col">
        <div className="practice-fork__header shrink-0 px-3.5 pb-2 pt-3 sm:px-4 sm:pt-3.5">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-screen-muted sm:text-xs">
            Choose a path
          </p>
          <p className="mt-0.5 text-[9px] text-screen-muted/70 sm:text-[10px]">Two focused practices</p>
        </div>

        <div className="practice-fork__body relative flex min-h-0 flex-1 flex-col sm:flex-row">
          <ForkPath practice={environmental} side="left" />
          <ForkPath practice={creative} side="right" />

          <svg
            className="practice-fork__divider pointer-events-none absolute inset-0 z-20 hidden sm:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M50 0 L50 38 M50 38 L18 100 M50 38 L82 100"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.6"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="50" cy="38" r="2.2" fill="rgba(255,255,255,0.35)" />
          </svg>

          <div className="practice-fork__divider-mobile pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-white/15 sm:hidden" aria-hidden="true" />
        </div>
      </div>
    </Tablet>
  );
}
