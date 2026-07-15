"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data";
import { getSchedulingHref, isExternalScheduling } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { StudioThemeToggle } from "./StudioThemeToggle";

const links = [
  { href: "/#game", label: "Apps" },
  { href: "/#game?app=work-map", label: "Map" },
  { href: "/work", label: "Work" },
  { href: "/timeline", label: "Timeline" },
  { href: "/resume", label: "Résumé" },
  { href: "/#contact", label: "Contact" },
];

const navLinkClass =
  "shrink-0 whitespace-nowrap min-h-[44px] content-center text-[11px] uppercase tracking-wider text-paper-cream transition hover:text-white";

const scheduleClass =
  "shrink-0 whitespace-nowrap min-h-[44px] content-center rounded-full border border-environment/45 bg-environment/15 px-3 text-[11px] font-semibold uppercase tracking-wider text-environment transition hover:bg-environment/25";

export function FixedStudioNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const scheduleHref = getSchedulingHref();
  const scheduleExternal = isExternalScheduling();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-wood-dark/96 shadow-lg" : "bg-studio-black/70",
      )}
    >
      {/* Desktop */}
      <div className="mx-auto hidden max-w-[1600px] items-center px-4 py-3 sm:px-8 sm:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="min-w-0">
          {pastHero ? (
            <Link
              href="/"
              className="font-display text-xs font-bold tracking-[0.12em] text-paper-cream sm:text-sm"
            >
              {profile.name.toUpperCase()}
            </Link>
          ) : null}
        </div>

        <div className="min-w-0 px-4">
          {pastHero ? (
            <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-paper-cream/90">
              {profile.tagline}
            </p>
          ) : null}
        </div>

        <nav className="flex items-center justify-end gap-4" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                navLinkClass,
                "text-center",
                link.href === "/#game" && "font-semibold text-games hover:text-games",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={scheduleHref}
            className={cn(scheduleClass, "px-4")}
            {...(scheduleExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Chat
          </a>
          <StudioThemeToggle />
        </nav>
      </div>

      {/* Mobile & tablet: horizontal scroll nav + title frame below when past hero */}
      <div className="lg:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
          <nav
            className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkClass,
                  link.href === "/#game" && "font-semibold text-games hover:text-games",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={scheduleHref}
              className={scheduleClass}
              {...(scheduleExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Chat
            </a>
          </nav>
          <StudioThemeToggle />
        </div>

        {pastHero ? (
          <div
            className="border-t border-paper-cream/15 bg-wood-dark/40 px-3 py-2 sm:px-6"
            aria-label="Site identity"
          >
            <Link
              href="/"
              className="font-display text-xs font-bold tracking-[0.12em] text-paper-cream"
            >
              {profile.name}
            </Link>
            <p className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-paper-cream/75">
              {profile.tagline}
            </p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
