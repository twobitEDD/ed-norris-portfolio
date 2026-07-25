"use client";

import Link from "next/link";
import { ENT_TYPOGRAPHY } from "@/design/ent-language";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function EntHeader() {
  return (
    <header className="ent-chrome sticky top-0 z-50 border-b border-white/5 bg-ent-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-baseline gap-1">
          <span className={cn(ENT_TYPOGRAPHY.navBrand, "chrome-text-strong text-base")}>
            2bit<span className="text-technology">ENT</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(ENT_TYPOGRAPHY.navLink, "chrome-text-muted hover:chrome-text-strong px-3 py-2")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#contact"
          className="shrink-0 rounded-full border border-technology/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-technology transition hover:bg-technology/10"
        >
          Let&apos;s build ↗
        </Link>
      </div>
    </header>
  );
}
