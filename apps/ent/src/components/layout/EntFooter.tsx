import Link from "next/link";
import { site } from "@/data/site";

export function EntFooter() {
  return (
    <footer className="ent-chrome border-t border-white/5 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.12em] chrome-text-strong">{site.name}</p>
          <p className="mt-2 max-w-sm font-mono text-[10px] uppercase tracking-[0.16em] chrome-text-faint">
            {site.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider">
          <a href={`mailto:${site.email}`} className="chrome-text-muted hover:chrome-text-strong transition">
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-text-muted hover:chrome-text-strong transition"
          >
            GitHub
          </a>
          <Link href="https://2bitdev.com" className="chrome-text-muted hover:chrome-text-strong transition">
            2bitDEV.com
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl font-mono text-[9px] uppercase tracking-[0.2em] chrome-text-dim">
        © {new Date().getFullYear()} {site.fullName}. All rights reserved.
      </p>
    </footer>
  );
}
