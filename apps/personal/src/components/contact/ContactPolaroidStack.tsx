"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { contactPolaroidImages } from "@/data/career-images";
import { cn } from "@/lib/cn";

const CAPTION = "Human-centered systems for consequential work.";
const SUBTITLE = "Oregon, USA · Edd Norris";

const BACK_LAYERS = [
  { className: "absolute -bottom-4 -left-5 z-0", rotation: -8, offset: 1 },
  { className: "absolute -bottom-2 -right-4 z-[1]", rotation: 6, offset: 2 },
] as const;

export function ContactPolaroidStack({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const photoCount = contactPolaroidImages.length;
  const mainImage = contactPolaroidImages[index]!;

  const cycle = useCallback(() => {
    setIndex((current) => (current + 1) % photoCount);
  }, [photoCount]);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Oregon photo ${index + 1} of ${photoCount}. Click for next photo.`}
      className={cn(
        "group relative mx-auto block w-full max-w-md cursor-pointer border-0 bg-transparent p-0 text-left lg:ml-auto",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper-cream/40",
        className,
      )}
    >
      {BACK_LAYERS.map((layer, layerIndex) => {
        const image = contactPolaroidImages[(index + layer.offset) % photoCount]!;

        return (
          <div
            key={layerIndex}
            className={cn("studio-object hidden sm:block", layer.className)}
            style={{ transform: `rotate(${layer.rotation}deg)` }}
            aria-hidden="true"
          >
            <Polaroid size="sm" rotation={0} image={image} />
          </div>
        );
      })}

      <div
        className="studio-object relative z-10 transition-transform duration-300 group-hover:scale-[1.008] group-active:scale-[0.995]"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mainImage.src}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Polaroid
              size="lg"
              rotation={0}
              image={mainImage}
              caption={CAPTION}
              subtitle={SUBTITLE}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}
