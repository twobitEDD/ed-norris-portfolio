import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

const photoGradients: Record<string, string> = {
  "era-games": "linear-gradient(160deg, #5c4f78, #1e1830), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=60') center/cover",
  "era-2bit": "linear-gradient(160deg, #6b5a8a, #2a2038), url('https://images.unsplash.com/photo-1493711662062-fa541fb8b571?w=200&q=60') center/cover",
  "era-software": "linear-gradient(160deg, #3d6a8a, #152535), url('https://images.unsplash.com/photo-1550745165-9bf0e3a77932?w=200&q=60') center/cover",
  "era-environment": "linear-gradient(160deg, #4a6b42, #1a2e18), url('https://images.unsplash.com/photo-1466611653911-950815781e6b?w=200&q=60') center/cover",
  "era-ergo": "linear-gradient(160deg, #5c4a8a, #1e1830), url('https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&q=60') center/cover",
};

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
  const bg =
    gradient ??
    (eraId && photoGradients[eraId]) ??
    "linear-gradient(160deg, #5a7a52, #2d4a35)";

  return (
    <div className={cn("relative w-24 sm:w-28", className)} style={{ transform: "rotate(4deg)" }}>
      <ObjectShadow depth={2} />
      <div className="bg-white p-1.5 pb-7 shadow-paper">
        <div
          className="aspect-[4/3] w-full bg-cover bg-center"
          style={{ background: bg }}
        />
        {caption && (
          <p className="handwritten absolute bottom-1.5 left-1 right-1 text-center text-[10px] text-ink">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
