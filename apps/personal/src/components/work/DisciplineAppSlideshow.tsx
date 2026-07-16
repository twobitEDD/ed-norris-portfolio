"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClientLogoMark } from "@/components/hero/ClientLogoMark";
import { clientLogos } from "@/data/client-logos";
import {
  DISCIPLINE_AUTO_ADVANCE_MS,
  type DisciplineSlide,
} from "@/data/discipline-slides";
import { cn } from "@/lib/cn";
import { easeStudio, reducedMotion } from "@/lib/motion";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easeStudio },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 36 : -36,
    opacity: 0,
    transition: { duration: 0.3, ease: easeStudio },
  }),
};

const accentBorder: Record<DisciplineSlide["glow"], string> = {
  green: "border-environment/35",
  purple: "border-games/35",
  cyan: "border-technology/35",
  amber: "border-amber-400/35",
};

const accentText: Record<DisciplineSlide["glow"], string> = {
  green: "text-environment",
  purple: "text-games",
  cyan: "text-technology",
  amber: "text-amber-300",
};

function PartnerStrip({ slide }: { slide: DisciplineSlide }) {
  const logos = clientLogos.filter((l) => slide.partnerIds.includes(l.id));
  if (logos.length === 0 && !slide.partnerNotes?.length) return null;

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">Partners</p>
      <div className="mt-2 flex flex-wrap items-center gap-2.5">
        {logos.map((logo) => (
          <span key={logo.id} className="relative inline-flex h-4 min-w-[2.75rem] opacity-55">
            <ClientLogoMark
              logo={logo}
              fill={logo.display !== "text"}
              imageClassName="object-contain object-left grayscale"
            />
          </span>
        ))}
        {slide.partnerNotes?.map((note) => (
          <span
            key={note}
            className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/50"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function SlidePanel({ slide }: { slide: DisciplineSlide }) {
  const primaryLink = slide.links.find((l) => l.primary) ?? slide.links[0];
  const secondaryLinks = slide.links.filter((l) => l !== primaryLink);

  return (
    <div className="flex min-h-[280px] flex-col sm:min-h-[300px]">
      {slide.image && (
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-white/10">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            className="object-cover"
            style={{ objectPosition: slide.image.objectPosition ?? "center" }}
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent" />
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col p-4 sm:p-5",
          accentBorder[slide.glow],
          !slide.image && "border-t",
        )}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{slide.eyebrow}</p>
        <h3 className="mt-1 font-editorial text-lg font-semibold text-white sm:text-xl">{slide.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">{slide.body}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {slide.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/45"
            >
              {tech}
            </span>
          ))}
        </div>

        <PartnerStrip slide={slide} />

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {primaryLink &&
            (primaryLink.external ? (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("text-xs font-semibold transition hover:text-white", accentText[slide.glow])}
              >
                {primaryLink.label} →
              </a>
            ) : (
              <Link
                href={primaryLink.href}
                className={cn("text-xs font-semibold transition hover:text-white", accentText[slide.glow])}
              >
                {primaryLink.label} →
              </Link>
            ))}
          {secondaryLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-white/55 transition hover:text-white/85"
              >
                {link.label} →
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium text-white/55 transition hover:text-white/85"
              >
                {link.label} →
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

type DisciplineAppSlideshowProps = {
  slides: DisciplineSlide[];
  className?: string;
  autoAdvance?: boolean;
  ariaLabel?: string;
};

export function DisciplineAppSlideshow({
  slides,
  className,
  autoAdvance = true,
  ariaLabel = "Practice highlights slideshow",
}: DisciplineAppSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [motionReduced, setMotionReduced] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const slide = slides[activeIndex];

  useEffect(() => {
    setMotionReduced(reducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setMotionReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((prev) => {
        if (index === prev) return prev;
        const forward = index > prev || (prev === slides.length - 1 && index === 0);
        setDirection(forward ? 1 : -1);
        return index;
      });
    },
    [slides.length],
  );

  const paginate = useCallback(
    (delta: number) => {
      const next = (activeIndex + delta + slides.length) % slides.length;
      setDirection(delta);
      setActiveIndex(next);
    },
    [activeIndex, slides.length],
  );

  useEffect(() => {
    if (motionReduced || !autoAdvance) return;
    const timer = window.setInterval(() => paginate(1), DISCIPLINE_AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoAdvance, motionReduced, paginate]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      paginate(dx < 0 ? 1 : -1);
    }
  };

  if (!slide) return null;

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        {motionReduced ? (
          <SlidePanel slide={slide} />
        ) : (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <SlidePanel slide={slide} />
            </motion.div>
          </AnimatePresence>
        )}

        <button
          type="button"
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition hover:border-white/30 hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition hover:border-white/30 hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-5 bg-white/85" : "w-1.5 bg-white/25 hover:bg-white/40",
            )}
            aria-label={`Go to ${s.title}`}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
