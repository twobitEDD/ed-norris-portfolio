"use client";

import { STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ProfileTagline } from "@/components/ProfileTagline";
import { profile } from "@/data";
import { cn } from "@/lib/cn";
import {
  studioNavSectionFromHash,
  type StudioNavSectionId,
} from "@/lib/studio-app-nav";
import { StudioThemeToggle } from "./StudioThemeToggle";

const navLinks = [
  { id: "hero", href: "/#hero", label: "Introduction" },
  { id: "game", href: "/#game", label: "Applications" },
  { id: "timeline", href: "/#timeline", label: "Timeline" },
  { id: "resume", href: "/#resume", label: "Resume" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const satisfies ReadonlyArray<{ id: StudioNavSectionId; href: string; label: string }>;

/** Matches `html { scroll-padding-top }` — section tops land just below the fixed header. */
const HEADER_ACTIVATION_PX = 104;

/** Cream/paper bento cells where a transparent header hurts contrast. */
const LIGHT_SECTIONS = new Set<StudioNavSectionId>(["hero", "timeline", "resume"]);

function readScrollPaddingTop(): number {
  if (typeof window === "undefined") return HEADER_ACTIVATION_PX;
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : HEADER_ACTIVATION_PX;
}

function measureActiveSection(): StudioNavSectionId {
  const activationLine = readScrollPaddingTop();
  let next: StudioNavSectionId = navLinks[0].id;

  for (const { id } of navLinks) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= activationLine) {
      next = id;
    }
  }

  return next;
}

function SiteIdentity({ className, align = "start" }: { className?: string; align?: "start" | "end" }) {
  return (
    <div className={className} aria-label="Site identity">
      <Link href="/#hero" className={cn(STUDIO_TYPOGRAPHY.navBrand)}>
        {profile.name}
      </Link>
      <ProfileTagline tagline={profile.tagline} variant="nav" align={align} className="mt-0.5" />
    </div>
  );
}

function HomeBrandLink() {
  return (
    <Link
      href="/"
      className={cn(
        "shrink-0 font-mono text-[10px] font-semibold tracking-[0.02em] chrome-text transition-colors hover:chrome-text-strong sm:text-[11px]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper-cream/50",
      )}
      aria-label="Home — 2bitdev.com"
    >
      2bit<span className="chrome-text-subtle">[</span>
      <span className="chrome-text">DEV</span>
      <span className="chrome-text-subtle">]</span>
      .com
    </Link>
  );
}

export function FixedStudioNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<StudioNavSectionId>("hero");

  const syncNavState = useCallback(() => {
    setScrolled(window.scrollY > 40);

    const heroEl = document.getElementById("hero");
    if (heroEl) {
      setPastHero(heroEl.getBoundingClientRect().bottom <= readScrollPaddingTop());
    } else {
      setPastHero(window.scrollY > 60);
    }

    const fromHash = studioNavSectionFromHash();
    const fromScroll = measureActiveSection();
    setActiveSection(fromHash ?? fromScroll);
  }, []);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const heroEl = document.getElementById("hero");
        if (heroEl) {
          setPastHero(heroEl.getBoundingClientRect().bottom <= readScrollPaddingTop());
        } else {
          setPastHero(window.scrollY > 60);
        }
        setActiveSection(measureActiveSection());
      });
    };

    const onHashChange = () => {
      const fromHash = studioNavSectionFromHash();
      if (fromHash) setActiveSection(fromHash);
      window.setTimeout(() => setActiveSection(measureActiveSection()), 180);
    };

    syncNavState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [syncNavState]);

  const onNavClick = (id: StudioNavSectionId) => {
    setActiveSection(id);
    requestAnimationFrame(syncNavState);
  };

  const solidChrome = scrolled || LIGHT_SECTIONS.has(activeSection);

  const linkClass = (id: StudioNavSectionId) =>
    cn(
      STUDIO_TYPOGRAPHY.navLink,
      activeSection === id
        ? "chrome-text-strong font-semibold underline decoration-white/45 underline-offset-[6px] hover:chrome-text-strong"
        : "chrome-text-muted hover:chrome-text",
    );

  return (
    <header
      className={cn(
        "studio-chrome fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solidChrome
          ? "border-paper-cream/15 bg-wood-dark/[0.98] shadow-lg backdrop-blur-md"
          : "border-paper-cream/10 bg-studio-black/88 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between gap-4 px-3 py-2.5 sm:px-6 sm:py-3 lg:gap-6 lg:px-8 lg:py-4">
        <div className="flex min-w-0 flex-col gap-1">
          <HomeBrandLink />
          {pastHero ? <SiteIdentity className="hidden min-w-0 lg:block" /> : null}
        </div>

        <div className="flex min-w-0 flex-col items-end gap-1 lg:shrink-0">
          <div className="flex w-full items-center justify-end gap-2 sm:gap-3 lg:gap-4">
            <nav
              className="flex min-w-0 flex-1 items-center justify-end gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-none lg:overflow-visible [&::-webkit-scrollbar]:hidden"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={linkClass(link.id)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  onClick={() => onNavClick(link.id)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <StudioThemeToggle />
          </div>

          {pastHero ? <SiteIdentity className="text-right lg:hidden" align="end" /> : null}
        </div>
      </div>
    </header>
  );
}
