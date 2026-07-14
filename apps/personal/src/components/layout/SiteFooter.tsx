import { profile } from "@/data";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-4 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.06em] text-text-primary">
            {profile.name.toUpperCase()}
          </p>
          <p className="mt-2 max-w-md text-text-secondary">
            Human-centered systems for consequential work.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
          {profile.location}
        </p>
      </div>
    </footer>
  );
}
