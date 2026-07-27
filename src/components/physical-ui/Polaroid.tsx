import Image from "next/image";
import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

export function Polaroid({
  caption,
  className,
  gradient,
  imageSrc,
  rotation = 3,
  size = "sm",
  subtitle,
}: {
  caption?: string;
  className?: string;
  gradient?: string;
  imageSrc?: string;
  rotation?: number;
  size?: "sm" | "lg";
  subtitle?: string;
}) {
  const isLarge = size === "lg";

  return (
    <div
      className={cn("relative", isLarge ? "w-full max-w-sm" : "w-28 sm:w-32", className)}
      style={rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <ObjectShadow depth={isLarge ? 3 : 2} />
      <div className={cn("polaroid-frame shadow-paper", isLarge && "polaroid-frame--lg")}>
        <div className="polaroid-image-wrap">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={caption ?? ""}
              fill
              className="polaroid-photo object-cover"
              sizes={isLarge ? "(max-width: 768px) 280px, 320px" : "128px"}
            />
          ) : (
            <div
              className="polaroid-photo polaroid-placeholder h-full w-full"
              style={{ background: gradient ?? "linear-gradient(160deg, #2a4a6b, #4da4c9)" }}
            />
          )}
          <div className="polaroid-vintage-fx" aria-hidden />
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
