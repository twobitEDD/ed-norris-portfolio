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
  DISCIPLINE_AUTO_ADVANCE_MS,
  type DisciplineSlide,
} from "@/data/discipline-slides";
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

function Co2TrueDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="expertise-parallax-layer absolute -right-6 top-4 h-24 w-24 rounded-full border-2 border-environment/30 expertise-ring-spin" />
      <div className="expertise-parallax-layer absolute left-6 top-8 h-16 w-16 rounded-full border border-environment/20 expertise-ring-spin-reverse" />
      <div className="expertise-float absolute bottom-16 right-12 h-3 w-3 rounded-full bg-environment/50" style={{ animationDelay: "0s" }} />
      <Image
        src={co2tBrand.mascot.src}
        alt=""
        width={96}
        height={96}
        className="expertise-mascot-bob absolute -bottom-2 right-4 h-20 w-20 object-contain opacity-20 sm:h-24 sm:w-24"
      />
    </div>
  );
}

function ErgoDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="expertise-pixel-bounce absolute left-8 top-10 h-4 w-4 rounded-sm bg-games/60" />
      <div className="expertise-pixel-bounce absolute right-12 top-8 h-5 w-5 rounded-sm bg-technology/50" style={{ animationDelay: "0.15s" }} />
      <div className="expertise-crosshair absolute right-1/4 top-1/3 h-8 w-8 border border-games/30" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-games/10 to-transparent" />
    </div>
  );
}

function GamesDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="expertise-pixel-bounce absolute left-10 top-12 h-3 w-3 rounded-sm bg-games/55" />
      <div className="expertise-pixel-bounce absolute right-16 top-10 h-4 w-4 rounded-sm bg-games/45" style={{ animationDelay: "0.25s" }} />
      <div className="expertise-pixel-bounce absolute bottom-16 left-1/3 h-3 w-3 rounded-sm bg-technology/40" style={{ animationDelay: "0.5s" }} />
    </div>
  );
}

function DataDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 400 240">
        <line x1="60" y1="80" x2="200" y2="140" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" />
        <line x1="340" y1="70" x2="200" y2="140" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "1s" }} />
        <circle cx="200" cy="140" r="5" className="expertise-node-pulse fill-environment" />
      </svg>
    </div>
  );
}

function ConsultingDecor({ partnerIds }: { partnerIds: string[] }) {
  const logos = clientLogos.filter((l) => partnerIds.includes(l.id));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 400 240">
        <line x1="80" y1="60" x2="200" y2="120" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" />
        <line x1="320" y1="80" x2="200" y2="120" className="expertise-data-flow" stroke="currentColor" strokeWidth="1" style={{ animationDelay: "0.8s" }} />
        <circle cx="200" cy="120" r="5" className="expertise-node-pulse fill-technology" />
      </svg>
      {logos.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4 opacity-30">
          {logos.slice(0, 4).map((logo) => (
            <div key={logo.id} className="relative h-5 w-10 sm:h-6 sm:w-12">
              <Image src={logo.src} alt="" fill className="object-contain grayscale" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SlideDecor({ slide }: { slide: DisciplineSlide }) {
  switch (slide.decor) {
    case "co2true":
      return <Co2TrueDecor />;
    case "ergo":
      return <ErgoDecor />;
    case "games":
      return <GamesDecor />;
    case "data":
      return <DataDecor />;
    case "consulting":
      return <ConsultingDecor partnerIds={slide.partnerIds} />;
    default:
      return null;
  }
}

function PartnerStrip({ slide }: { slide: DisciplineSlide }) {
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
            className="rounded-full border border-screen-border/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-screen-muted"
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
          className="rounded border border-screen-border/70 bg-screen-panel/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-screen-muted"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function SlideImage({ slide }: { slide: DisciplineSlide }) {
  if (!slide.image) return null;

  return (
    <div className="relative hidden min-h-[280px] w-[38%] shrink-0 overflow-hidden border-r border-screen-border/60 sm:block">
      <Image
        src={slide.image.src}
        alt={slide.image.alt}
        fill
        className="object-cover"
        style={{ objectPosition: slide.image.objectPosition ?? "center" }}
        sizes="(max-width: 768px) 0vw, 320px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-screen-panel/40" />
    </div>
  );
}

function SlideContent({ slide }: { slide: DisciplineSlide }) {
  const primaryLink = slide.links.find((l) => l.primary) ?? slide.links[0];
  const secondaryLinks = slide.links.filter((l) => l !== primaryLink);

  return (
    <div className="relative flex h-full min-h-[300px] sm:min-h-[340px]">
      <SlideImage slide={slide} />
      <div className="relative flex flex-1 flex-col p-4 sm:p-6">
        <SlideDecor slide={slide} />
        <div className="relative z-[1] flex flex-1 flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-screen-muted">{slide.eyebrow}</p>
          <h3 className="mt-1 font-editorial text-xl font-semibold text-screen-text sm:text-2xl">{slide.title}</h3>
          <p className="mt-2 max-w-prose text-xs leading-relaxed text-screen-muted sm:text-sm">{slide.body}</p>
          <TechTags technologies={slide.technologies} />
          <PartnerStrip slide={slide} />
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
            {primaryLink &&
              (primaryLink.external ? (
                <a
                  href={primaryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-technology hover:text-screen-text"
                >
                  {primaryLink.label} →
                </a>
              ) : (
                <Link
                  href={primaryLink.href}
                  className="text-sm font-semibold text-technology hover:text-screen-text"
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
                  className="text-[11px] font-medium text-screen-muted hover:text-screen-text"
                >
                  {link.label} →
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-medium text-screen-muted hover:text-screen-text"
                >
                  {link.label} →
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type DisciplineWorkSlideshowProps = {
  slides: DisciplineSlide[];
  className?: string;
  autoAdvance?: boolean;
  ariaLabel?: string;
};

export function DisciplineWorkSlideshow({
  slides,
  className,
  autoAdvance = true,
  ariaLabel = "Work discipline slideshow",
}: DisciplineWorkSlideshowProps) {
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
      className={cn("relative mx-auto w-full max-w-5xl", className)}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <Tablet glow={slide.glow} orientation="landscape" className="w-full">
        <div
          className="relative overflow-hidden"
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
              >
                <SlideContent slide={slide} />
              </motion.div>
            </AnimatePresence>
          )}

          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-screen-border/60 bg-screen-panel/80 text-screen-muted backdrop-blur-sm transition hover:border-screen-border hover:text-screen-text"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-screen-border/60 bg-screen-panel/80 text-screen-muted backdrop-blur-sm transition hover:border-screen-border hover:text-screen-text"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-screen-border px-4 py-3">
          {slides.map((s, i) => (
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
