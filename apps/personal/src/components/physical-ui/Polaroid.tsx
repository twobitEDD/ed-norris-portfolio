import Image from "next/image";
import { cn } from "@/lib/cn";
import { getEraImage, type CareerImageEntry } from "@/data/career-images";
import { ObjectShadow } from "./ObjectShadow";

export function Polaroid({
  caption,
  eraId,
  image,
  className,
  gradient,
  rotation = 4,
  size = "sm",
  subtitle,
}: {
  caption?: string;
  eraId?: string;
  image?: CareerImageEntry;
  className?: string;
  gradient?: string;
  rotation?: number;
  size?: "sm" | "lg";
  subtitle?: string;
}) {
  const eraImage = eraId ? getEraImage(eraId) : undefined;
  const photo = image ?? eraImage;
  const isLarge = size === "lg";

  return (
    <div
      className={cn("relative", isLarge ? "w-full max-w-md" : "w-24 sm:w-28", className)}
      style={rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <ObjectShadow depth={isLarge ? 3 : 2} />
      <div className={cn("polaroid-frame shadow-paper", isLarge && "polaroid-frame--lg")}>
        <div className="polaroid-image-wrap">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="polaroid-photo object-cover"
              style={{ objectPosition: photo.objectPosition ?? "center" }}
              sizes={isLarge ? "(max-width: 768px) 90vw, 448px" : "112px"}
            />
          ) : (
            <div
              className="polaroid-photo polaroid-placeholder h-full w-full bg-cover bg-center"
              style={{
                background: gradient ?? "linear-gradient(160deg, #5a7a52, #2d4a35)",
              }}
            />
          )}
          <div className="polaroid-vintage-fx" aria-hidden="true" />
        </div>
        {caption && (
          <div className={cn("polaroid-caption", isLarge && "polaroid-caption--lg")}>
            <p className="handwritten polaroid-caption-text">{caption}</p>
            {subtitle && <p className="polaroid-subtitle">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
