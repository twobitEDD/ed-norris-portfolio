"use client";

import { STUDIO_TYPOGRAPHY } from "@/design/studio-language";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileTagline } from "@/components/ProfileTagline";
import { profile } from "@/data";
import { cn } from "@/lib/cn";
import { StudioThemeToggle } from "./StudioThemeToggle";

const navLinks = [
  { id: "hero", href: "/#hero", label: "Introduction" },
  { id: "game", href: "/#game", label: "Applications" },
  { id: "timeline", href: "/#timeline", label: "Timeline" },
  { id: "resume", href: "/#resume", label: "Resume" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const;

type SectionId = (typeof navLinks)[number]["id"];

/** Activation line sits just below the fixed header bar. */
const HEADER_LINE_PX = 80;

function measureSections(
  setPastHero: (value: boolean) => void,
  setActiveSection: (value: SectionId) => void,
) {
  const heroEl = document.getElementById("hero");
  if (heroEl) {
    setPastHero(heroEl.getBoundingClientRect().bottom <= HEADER_LINE_PX);
  } else {
    setPastHero(window.scrollY > 60);
  }

  const scrollMarker = window.scrollY + HEADER_LINE_PX;
  let next: SectionId = navLinks[0].id;

  for (const { id } of navLinks) {
    const el = document.getElementById(id);
    if (!el) continue;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= scrollMarker + 4) {
      next = id;
    }
  }

  setActiveSection(next);
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
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => measureSections(setPastHero, setActiveSection));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const linkClass = (id: SectionId) =>
    cn(
      STUDIO_TYPOGRAPHY.navLink,
      activeSection === id
        ? "chrome-text-strong font-semibold underline decoration-white/45 underline-offset-[6px] hover:chrome-text-strong"
        : "chrome-text-muted hover:chrome-text",
    );

  return (
    <header
      className={cn(
        "studio-chrome fixed inset-x-0 top-0 z-50 border-b border-paper-cream/10 transition-colors duration-300",
        scrolled
          ? "bg-wood-dark/96 shadow-lg backdrop-blur-sm"
          : "bg-studio-black/70 backdrop-blur-sm",
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
