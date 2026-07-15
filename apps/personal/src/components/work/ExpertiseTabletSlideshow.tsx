"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tablet } from "@/components/physical-ui/Tablet";
import { clientLogos } from "@/data/client-logos";
import { co2tBrand } from "@/data/career-images";
import {
  EXPERTISE_AUTO_ADVANCE_MS,
  expertiseSlides,
  type ExpertiseSlide,
} from "@/data/expertise-slides";
import { cn } from "@/lib/cn";
import { easeStudio, reducedMotion } from "@/lib/motion";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: easeStudio },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 48 : -48,
    opacity: 0,
    transition: { duration: 0.35, ease: easeStudio },
  }),
};

function Co2TrueDecor({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="expertise-parallax-layer absolute -right-6 top-4 h-24 w-24 rounded-full border-2 border-environment/30 expertise-ring-spin" />
      <div className="expertise-parallax-layer absolute left-6 top-8 h-16 w-16 rounded-full border border-environment/20 expertise-ring-spin-reverse" />
      <div className="expertise-float absolute bottom-16 right-12 h-3 w-3 rounded-full bg-environment/50" style={{ animationDelay: "0s" }} />
      <div className="expertise-float absolute bottom-24 left-16 h-2 w-2 rounded-full bg-environment/40" style={{ animationDelay: "1.2s" }} />
      <div className="expertise-float absolute right-1/3 top-1/3 h-2.5 w-2.5 rounded-sm bg-environment/35" style={{ animationDelay: "0.6s" }} />
      <Image
        src={co2tBrand.mascot.src}
        alt=""
        width={96}
        height={96}
        className="expertise-mascot-bob absolute -bottom-2 right-4 h-20 w-20 object-contain opacity-25 sm:h-24 sm:w-24"
      />
    </div>
  );
}

function ErgoDecor({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="expertise-pixel-bounce absolute left-8 top-10 h-4 w-4 rounded-sm bg-games/60" style={{ animationDelay: "0s" }} />
      <div className="expertise-pixel-bounce absolute left-16 top-16 h-3 w-3 rounded-sm bg-games/45" style={{ animationDelay: "0.3s" }} />
      <div className="expertise-pixel-bounce absolute right-12 top-8 h-5 w-5 rounded-sm bg-technology/50" style={{ animationDelay: "0.15s" }} />
      <div className="expertise-pixel-bounce absolute bottom-20 left-1/4 h-3 w-3 rounded-sm bg-games/55" style={{ animationDelay: "0.45s" }} />
      <div className="expertise-crosshair absolute right-1/4 top-1/3 h-8 w-8 border border-games/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-games/10 to-transparent" />
    </div>
  );
}

function ConsultingDecor({ active }: { active: boolean }) {
  const logos = clientLogos.filter((l) =>
    ["adidas", "google", "dell", "washu"].includes(l.id),
  );

  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 240">
        <line x1="80" y1="60" x2="200" y2="120" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" />
        <line x1="320" y1="80" x2="200" y2="120" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "0.8s" }} />
        <line x1="200" y1="120" x2="120" y2="180" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "1.4s" }} />
        <line x1="200" y1="120" x2="280" y2="190" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "2s" }} />
        <circle cx="80" cy="60" r="4" className="expertise-node-pulse fill-technology" />
        <circle cx="320" cy="80" r="4" className="expertise-node-pulse fill-technology" style={{ animationDelay: "0.5s" }} />
        <circle cx="200" cy="120" r="5" className="expertise-node-pulse fill-environment" style={{ animationDelay: "1s" }} />
        <circle cx="120" cy="180" r="3" className="expertise-node-pulse fill-games" style={{ animationDelay: "1.5s" }} />
        <circle cx="280" cy="190" r="3" className="expertise-node-pulse fill-technology" style={{ animationDelay: "2s" }} />
      </svg>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
        {logos.map((logo, i) => (
          <div
            key={logo.id}
            className="expertise-logo-reveal relative h-5 w-10 opacity-0 sm:h-6 sm:w-12"
            style={{ animationDelay: `${i * 0.35}s` }}
          >
            <Image src={logo.src} alt="" fill className="object-contain grayscale" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideDecor({ slide }: { slide: ExpertiseSlide }) {
  switch (slide.theme) {
    case "co2true":
      return <Co2TrueDecor active />;
    case "ergo":
      return <ErgoDecor active />;
    case "consulting":
      return <ConsultingDecor active />;
  }
}

function PartnerStrip({ slide }: { slide: ExpertiseSlide }) {
  const logos = clientLogos.filter((l) => slide.partnerIds.includes(l.id));

  if (logos.length === 0 && !slide.partnerNotes?.length) return null;

  return (
    <div className="mt-4 border-t border-screen-border/60 pt-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-screen-muted">Partners</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {logos.map((logo) => (
          <span key={logo.id} className="relative inline-flex h-4 w-12 opacity-60 sm:h-5 sm:w-14">
            <Image src={logo.src} alt={logo.alt} fill className="object-contain object-left grayscale" />
          </span>
        ))}
        {slide.partnerNotes?.map((note) => (
          <span
            key={note}
            className="rounded-full border border-screen-border/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-screen-muted"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function TechTags({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="rounded border border-screen-border/70 bg-screen-panel/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-screen-muted"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function SlideContent({ slide }: { slide: ExpertiseSlide }) {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col p-4 sm:min-h-[300px] sm:p-5">
      <SlideDecor slide={slide} />
      <div className="relative z-[1] flex flex-1 flex-col">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-screen-muted">{slide.eyebrow}</p>
        <h3 className="mt-1 font-editorial text-lg font-semibold text-screen-text sm:text-xl">{slide.title}</h3>
        <p className="mt-2 max-w-prose text-[11px] leading-relaxed text-screen-muted sm:text-xs">{slide.body}</p>
        <TechTags technologies={slide.technologies} />
        <PartnerStrip slide={slide} />
        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {slide.links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-technology hover:text-screen-text"
              >
                {link.label} →
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold text-technology hover:text-screen-text"
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

type ExpertiseTabletSlideshowProps = {
  className?: string;
};

export function ExpertiseTabletSlideshow({ className }: ExpertiseTabletSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [motionReduced, setMotionReduced] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const slide = expertiseSlides[activeIndex];

  useEffect(() => {
    setMotionReduced(reducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setMotionReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex((prev) => {
      if (index === prev) return prev;
      const forward = index > prev || (prev === expertiseSlides.length - 1 && index === 0);
      setDirection(forward ? 1 : -1);
      return index;
    });
  }, []);

  const paginate = useCallback(
    (delta: number) => {
      const next = (activeIndex + delta + expertiseSlides.length) % expertiseSlides.length;
      setDirection(delta);
      setActiveIndex(next);
    },
    [activeIndex],
  );

  useEffect(() => {
    if (motionReduced) return;
    const timer = window.setInterval(() => paginate(1), EXPERTISE_AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, motionReduced, paginate]);

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

  return (
    <div className={cn("relative mx-auto w-full max-w-2xl", className)}>
      <Tablet glow={slide.glow} orientation="landscape" className="w-full">
        <div
          className="relative min-h-[300px] overflow-hidden sm:min-h-[320px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {motionReduced ? (
            <SlideContent slide={slide} />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <SlideContent slide={slide} />
              </motion.div>
            </AnimatePresence>
          )}

          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-screen-border/60 bg-screen-panel/80 text-screen-muted backdrop-blur-sm transition hover:border-screen-border hover:text-screen-text"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-screen-border/60 bg-screen-panel/80 text-screen-muted backdrop-blur-sm transition hover:border-screen-border hover:text-screen-text"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-screen-border px-4 py-3">
          {expertiseSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-screen-text" : "w-2 bg-screen-muted/40 hover:bg-screen-muted/70",
              )}
              aria-label={`Go to ${s.title}`}
              aria-current={i === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </Tablet>
    </div>
  );
}
