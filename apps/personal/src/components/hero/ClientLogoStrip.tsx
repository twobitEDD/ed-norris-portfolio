import Image from "next/image";
import type { CSSProperties } from "react";
import { clientLogos, type ClientLogo } from "@/data/client-logos";
import { cn } from "@/lib/cn";

type ClientLogoStripProps = {
  className?: string;
  /** Filter to specific client ids */
  ids?: string[];
  size?: "sm" | "md";
  /** Show context line under the strip */
  showLabel?: boolean;
  /** Higher-contrast treatment for dark wood / screen backgrounds */
  variant?: "default" | "on-dark";
};

const sizeMap = {
  sm: { height: 18, gap: "gap-4", maxW: "max-w-[52px]" },
  md: { height: 22, gap: "gap-5 sm:gap-6", maxW: "max-w-[68px]" },
};

function LogoItem({
  logo,
  size,
  variant,
}: {
  logo: ClientLogo;
  size: "sm" | "md";
  variant: "default" | "on-dark";
}) {
  const dims = sizeMap[size];
  const inner = (
    <span
      className={cn(
        "relative inline-flex h-[var(--logo-h)] w-full items-center justify-center transition duration-300",
        variant === "on-dark"
          ? "opacity-80 brightness-0 invert grayscale-[15%] group-hover:opacity-100 group-hover:grayscale-0"
          : "opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0",
        "group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
      )}
      style={{ "--logo-h": `${dims.height}px` } as CSSProperties}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={32}
        className={cn("h-full w-auto max-w-full object-contain", dims.maxW)}
      />
    </span>
  );

  const title = logo.context ? `${logo.name} — ${logo.context}` : logo.name;

  if (logo.url) {
    return (
      <a
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 flex-1 basis-0 flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 rounded"
        title={title}
        aria-label={title}
      >
        {inner}
      </a>
    );
  }

  return (
    <span className="group flex min-w-0 flex-1 basis-0 flex-col items-center" title={title}>
      {inner}
    </span>
  );
}

export function ClientLogoStrip({
  className,
  ids,
  size = "md",
  showLabel = false,
  variant = "default",
}: ClientLogoStripProps) {
  const logos = ids ? clientLogos.filter((l) => ids.includes(l.id)) : clientLogos;
  const dims = sizeMap[size];

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <p
          className={cn(
            "mb-3 font-mono uppercase tracking-[0.18em]",
            variant === "on-dark"
              ? "text-[10px] text-paper-cream/80 sm:text-[11px]"
              : "text-[9px] text-ink-soft/80",
          )}
        >
          Selected clients &amp; partners
        </p>
      )}
      <ul
        className={cn("flex flex-wrap items-center justify-center", dims.gap)}
        aria-label="Companies and clients"
      >
        {logos.map((logo) => (
          <li key={logo.id} className="flex min-w-[52px] max-w-[88px] flex-1 basis-[72px] justify-center">
            <LogoItem logo={logo} size={size} variant={variant} />
          </li>
        ))}
      </ul>
    </div>
  );
}
