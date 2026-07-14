import Link from "next/link";
import { profile, practices } from "@/data";
import { Paper } from "@/components/physical-ui/Paper";

const roles = [
  "builder",
  "problem solver",
  "strategist",
  "designer",
  "adventurer",
  "dad",
];

const disciplines = [
  { label: "People", className: "text-environment border-environment/35 bg-environment/10" },
  { label: "Technology", className: "text-technology border-technology/35 bg-technology/10" },
  { label: "Planet", className: "text-environment border-environment/35 bg-environment/10" },
];

export function IntroPaper() {
  return (
    <Paper className="h-full">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <p className="handwritten text-lg text-ink">Hi, I&apos;m</p>
          <p className="mt-0.5 font-editorial text-[1.35rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem]">
            {profile.name}
          </p>
          <h1 className="mt-2 max-w-[22ch] font-editorial text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
            {profile.headline}
          </h1>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {profile.tagline}
          </p>

          <p
            className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft/90"
            aria-label="Selected employers and projects"
          >
            {profile.proofStrip.join(" · ")}
          </p>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Where I work">
            {disciplines.map((d) => (
              <span
                key={d.label}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${d.className}`}
              >
                {d.label}
              </span>
            ))}
          </div>

          <p className="mt-4 max-w-[34ch] text-sm leading-snug text-ink-soft">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {practices.map((practice) => (
              <Link
                key={practice.id}
                href={practice.href}
                className="rounded-full border border-ink/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper-cream"
              >
                Explore {practice.id === "environmental" ? "Environmental" : "Creative"} Work →
              </Link>
            ))}
          </div>
        </div>
        <ul className="hidden shrink-0 flex-col gap-1.5 border-l border-ink/10 pl-4 pt-8 sm:flex" aria-label="Roles">
          {roles.map((role) => (
            <li key={role} className="handwritten text-sm text-ink-soft">
              · {role}
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
}
