"use client";

import { STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data";
import { cn } from "@/lib/cn";
import { StudioThemeToggle } from "./StudioThemeToggle";

const NAV_SUBTITLE = "Technology Production Specialist";

const navLinks = [
  { id: "hero", href: "/#hero", label: "Introduction" },
  { id: "game", href: "/#game", label: "Applications" },
  { id: "timeline", href: "/#timeline", label: "Timeline" },
  { id: "resume", href: "/#resume", label: "Resume" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const;

type SectionId = (typeof navLinks)[number]["id"];

const SCROLL_SPY_MARGIN = "-35% 0px -45% 0px";

export function FixedStudioNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: SCROLL_SPY_MARGIN, threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const linkClass = (id: SectionId) =>
    cn(
      STUDIO_TYPOGRAPHY.navLink,
      activeSection === id
        ? "font-semibold text-white"
        : "text-paper-cream/75 hover:text-paper-cream",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-wood-dark/96 shadow-lg" : "bg-studio-black/70",
      )}
    >
      {/* Desktop */}
      <div className="mx-auto hidden max-w-[1600px] items-center justify-between gap-6 px-4 py-3 sm:px-8 sm:py-4 lg:flex">
        <div className="min-w-0 shrink">
          {pastHero ? (
            <div>
              <Link href="/#hero" className={cn(STUDIO_TYPOGRAPHY.navBrand)}>
                {profile.name}
              </Link>
              <p className={cn("mt-0.5", STUDIO_TYPOGRAPHY.navTagline)}>{NAV_SUBTITLE}</p>
            </div>
          ) : null}
        </div>

        <nav className="flex shrink-0 items-center justify-end gap-4" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.href} className={linkClass(link.id)}>
              {link.label}
            </Link>
          ))}
          <StudioThemeToggle />
        </nav>
      </div>

      {/* Mobile & tablet */}
      <div className="lg:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
          <nav
            className="flex min-w-0 flex-1 items-center justify-end gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link key={link.id} href={link.href} className={linkClass(link.id)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <StudioThemeToggle />
        </div>

        {pastHero ? (
          <div
            className="border-t border-paper-cream/15 bg-wood-dark/40 px-3 py-2 sm:px-6"
            aria-label="Site identity"
          >
            <Link href="/#hero" className={cn(STUDIO_TYPOGRAPHY.navBrand)}>
              {profile.name}
            </Link>
            <p
              className={cn(
                "mt-0.5 leading-tight tracking-[0.14em] text-paper-cream/75",
                STUDIO_TYPOGRAPHY.labelSmall,
              )}
            >
              {NAV_SUBTITLE}
            </p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
