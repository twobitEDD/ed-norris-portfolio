import Image from "next/image";
import type { ClientLogo } from "@/data/client-logos";
import { cn } from "@/lib/cn";

type ClientLogoMarkProps = {
  logo: ClientLogo;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  variant?: "default" | "on-dark";
  fill?: boolean;
  width?: number;
  height?: number;
};

function textLabelClass(logo: ClientLogo, variant: "default" | "on-dark") {
  const onDark = variant === "on-dark";

  if (logo.id === "washu") {
    return cn(
      "font-serif text-[13px] font-bold leading-none tracking-normal",
      onDark ? "text-paper-cream/85" : "text-ink/75",
    );
  }

  if (logo.id === "agencies") {
    return cn(
      "font-mono text-[9px] font-semibold uppercase tracking-[0.14em]",
      onDark ? "text-paper-cream/80" : "text-ink-soft/70",
    );
  }

  return cn(
    "text-[11px] font-bold uppercase tracking-[0.08em]",
    onDark ? "text-paper-cream/85" : "text-ink/75",
  );
}

export function ClientLogoMark({
  logo,
  className,
  imageClassName,
  textClassName,
  variant = "default",
  fill = false,
  width = 120,
  height = 32,
}: ClientLogoMarkProps) {
  if (logo.display === "text") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap",
          textLabelClass(logo, variant),
          textClassName,
          className,
        )}
      >
        {logo.name}
      </span>
    );
  }

  if (fill) {
    if (!logo.src) return null;

    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        className={cn(imageClassName, className)}
      />
    );
  }

  if (!logo.src) return null;

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={width}
      height={height}
      className={cn(imageClassName, className)}
    />
  );
}
