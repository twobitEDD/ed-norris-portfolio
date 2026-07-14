import Image from "next/image";
import { cn } from "@/lib/cn";
import { getEraImage } from "@/data/career-images";
import { ObjectShadow } from "./ObjectShadow";

export function Polaroid({
  caption,
  eraId,
  className,
  gradient,
}: {
  caption?: string;
  eraId?: string;
  className?: string;
  gradient?: string;
}) {
  const eraImage = eraId ? getEraImage(eraId) : undefined;

  return (
    <div className={cn("relative w-24 sm:w-28", className)} style={{ transform: "rotate(4deg)" }}>
      <ObjectShadow depth={2} />
      <div className="bg-white p-1.5 pb-7 shadow-paper">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
          {eraImage ? (
            <Image
              src={eraImage.src}
              alt={eraImage.alt}
              fill
              className="object-cover"
              style={{ objectPosition: eraImage.objectPosition ?? "center" }}
              sizes="112px"
            />
          ) : (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                background: gradient ?? "linear-gradient(160deg, #5a7a52, #2d4a35)",
              }}
            />
          )}
        </div>
        {caption && (
          <p className="handwritten absolute bottom-1.5 left-1 right-1 text-center text-[10px] text-ink">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
