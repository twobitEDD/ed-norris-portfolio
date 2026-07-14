"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data";
import { getSchedulingHref, isExternalScheduling } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { StudioThemeToggle } from "./StudioThemeToggle";

const links = [
  { href: "/#game", label: "Play" },
  { href: "/work", label: "Work" },
  { href: "/map", label: "Map" },
  { href: "/timeline", label: "Timeline" },
  { href: "/resume", label: "Résumé" },
  { href: "/#contact", label: "Contact" },
];

export function FixedStudioNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scheduleHref = getSchedulingHref();
  const scheduleExternal = isExternalScheduling();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-wood-dark/96 shadow-lg" : "bg-studio-black/70",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="font-display text-xs font-bold tracking-[0.12em] text-paper-cream sm:text-sm">
          {profile.name.toUpperCase()}
        </Link>
        <p className="hidden text-center font-mono text-[9px] uppercase tracking-[0.18em] text-paper-cream/90 lg:block">
          {profile.tagline}
        </p>
        <nav className="hidden items-center justify-end gap-4 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "min-h-[44px] min-w-[44px] content-center text-center text-[11px] uppercase tracking-wider text-paper-cream transition hover:text-white",
                link.href === "/#game" && "font-semibold text-games hover:text-games",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={scheduleHref}
            className="min-h-[44px] content-center rounded-full border border-environment/45 bg-environment/15 px-4 text-[11px] font-semibold uppercase tracking-wider text-environment transition hover:bg-environment/25"
            {...(scheduleExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Chat
          </a>
          <StudioThemeToggle />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <StudioThemeToggle />
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-paper-cream/35 text-paper-cream"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-paper-cream/20 bg-wood-dark/98 px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block min-h-[44px] content-center text-sm uppercase tracking-wider text-paper-cream",
                    link.href === "/#game" && "font-semibold text-games",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={scheduleHref}
                onClick={() => setOpen(false)}
                className="block min-h-[44px] content-center text-sm font-semibold uppercase tracking-wider text-environment"
                {...(scheduleExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                Schedule a chat
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
