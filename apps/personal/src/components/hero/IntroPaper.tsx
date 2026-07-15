import { profile, practices } from "@/data";
import type { TabletAppId } from "@/data/tablet-apps";
import { StudioAppLink } from "@/components/studio/StudioAppLink";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { WorkVennDiagram } from "@/components/hero/WorkVennDiagram";
import { Paper } from "@/components/physical-ui/Paper";

const roles = [
  "builder",
  "problem solver",
  "strategist",
  "designer",
  "adventurer",
  "dad",
];

export function IntroPaper() {
  return (
    <Paper className="h-full">
      <div className="min-w-0">
        <p className="handwritten text-lg text-ink">Hi, I&apos;m</p>
        <p className="mt-0.5 font-editorial text-[1.35rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem]">
          {profile.name}
        </p>
        <h1 className="mt-2 max-w-[22ch] font-editorial text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
          I love building solutions,
          <br />
          for fun and function.
        </h1>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          {profile.tagline}
        </p>

        <div className="mt-3 max-w-md">
          <ClientLogoStrip size="sm" ids={["adidas", "google", "co2t"]} />
        </div>

        <WorkVennDiagram className="mt-3 sm:mt-4" />

        <p className="mt-4 max-w-[34ch] text-sm leading-snug text-ink-soft">{profile.summary}</p>

        <ul className="mt-3.5 flex flex-col gap-1.5 sm:mt-4" aria-label="Roles">
          {roles.map((role) => (
            <li key={role} className="handwritten text-sm text-ink-soft">
              · {role}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
          {practices.map((practice) => (
            <StudioAppLink
              key={practice.id}
              appId={practice.id as TabletAppId}
              className="rounded-full border border-ink/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper-cream"
            >
              Open {practice.id === "environmental" ? "Environmental" : "Creative"} App →
            </StudioAppLink>
          ))}
        </div>
      </div>
    </Paper>
  );
}
