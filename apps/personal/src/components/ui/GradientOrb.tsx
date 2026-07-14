import { cn } from "@/lib/cn";

type Props = {
  color?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function GradientOrb({ color = "70,199,215", size = "520px", className, style }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-[50px]", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color}, 0.16), transparent 68%)`,
        ...style,
      }}
    />
  );
}
