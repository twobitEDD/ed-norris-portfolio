import Link from "next/link";
import { site } from "@/data/site";

const footerNav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function EntFooter() {
  return (
    <footer className="ent-chrome border-t border-white/5 px-4 py-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-[0.08em] chrome-text-strong">
              2bit<span className="text-technology">ENT</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] chrome-text-faint">
              Digital products. Human impact.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="chrome-text-muted hover:chrome-text-strong transition">
                {item.label}
              </Link>
            ))}
            <a href={`mailto:${site.email}`} className="chrome-text-muted hover:chrome-text-strong transition">
              Email
            </a>
            <Link href={site.linkedIn} className="chrome-text-muted hover:chrome-text-strong transition">
              LinkedIn
            </Link>
            <Link href="https://2bitdev.com" className="chrome-text-muted hover:chrome-text-strong transition">
              2bitDEV
            </Link>
          </nav>
        </div>
        <p className="mt-12 font-mono text-[9px] uppercase tracking-[0.2em] chrome-text-dim">
          © {new Date().getFullYear()} {site.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
