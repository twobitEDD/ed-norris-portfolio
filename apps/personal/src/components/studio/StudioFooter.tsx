import Link from "next/link";
import { profile } from "@/data";
import { STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import { cn } from "@/lib/cn";

type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
  hoverClass?: string;
};

function resolveProfileUrl(...needles: string[]): string | undefined {
  const normalized = needles.map((n) => n.toLowerCase());
  const match = profile.links.find((link) => {
    const haystack = `${link.label} ${link.url}`.toLowerCase();
    return normalized.some((needle) => haystack.includes(needle));
  });
  return match?.url;
}

const footerLinks: FooterLinkItem[] = [
  { label: "Contact", href: "/#contact", hoverClass: "hover:chrome-text" },
  { label: "Work Experience", href: "/#timeline", hoverClass: "hover:chrome-text" },
  {
    label: "CO2True",
    href: resolveProfileUrl("co2true.com", "co2true") ?? "https://co2true.com",
    external: true,
    hoverClass: "hover:text-environment",
  },
  {
    label: "ERGO",
    href: resolveProfileUrl("ergo.games", "ergo") ?? "https://ergo.games",
    external: true,
    hoverClass: "hover:text-games",
  },
  {
    label: "2bitENT (2bitENT.com)",
    href: resolveProfileUrl("2bitent.com", "2bitent") ?? "https://2bitent.com",
    external: true,
    hoverClass: "hover:text-games",
  },
];

type StudioFooterProps = {
  className?: string;
  showBorder?: boolean;
};

export function StudioFooter({ className, showBorder = true }: StudioFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "studio-chrome mt-16 text-center sm:mt-20",
        showBorder && "border-t border-paper-cream/10 pt-8",
        STUDIO_TYPOGRAPHY.ambientLabelMuted,
        className,
      )}
    >
      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3"
      >
        {footerLinks.map((item, index) => (
          <span key={item.label} className="inline-flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 ? (
              <span aria-hidden className="chrome-text-dim">
                ·
              </span>
            ) : null}
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "chrome-text-faint transition-colors duration-200",
                  item.hoverClass,
                )}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "chrome-text-faint transition-colors duration-200",
                  item.hoverClass,
                )}
              >
                {item.label}
              </Link>
            )}
          </span>
        ))}
        <span aria-hidden className="chrome-text-dim">
          ·
        </span>
        <span>
          {profile.name} · {year}
        </span>
      </nav>
    </footer>
  );
}
