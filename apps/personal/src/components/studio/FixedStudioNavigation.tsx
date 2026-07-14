"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data";
import { cn } from "@/lib/cn";
import { StudioThemeToggle } from "./StudioThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#map", label: "Map" },
  { href: "#resume", label: "Résumé" },
  { href: "#contact", label: "Contact" },
];

export function FixedStudioNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-wood-dark/92 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-studio-black/55 via-studio-black/20 to-transparent backdrop-blur-[2px]",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="font-display text-xs font-bold tracking-[0.12em] text-paper-cream sm:text-sm">
          {profile.name.toUpperCase()}
        </Link>
        <p className="hidden text-center font-mono text-[9px] uppercase tracking-[0.2em] text-paper-cream/75 lg:block">
          {profile.tagline.replace(/ · /g, " • ")}
        </p>
        <nav className="hidden items-center justify-end gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-[44px] min-w-[44px] content-center text-center text-[11px] uppercase tracking-wider text-paper-cream/80 transition hover:text-paper-cream"
            >
              {link.label}
            </Link>
          ))}
          <StudioThemeToggle />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <StudioThemeToggle />
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-paper-cream/25 text-paper-cream"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-paper-cream/15 bg-wood-dark/95 px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-[44px] content-center text-sm uppercase tracking-wider text-paper-cream/90"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
