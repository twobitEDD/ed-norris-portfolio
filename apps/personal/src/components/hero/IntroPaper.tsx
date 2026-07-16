import { profile, practices } from "@/data";
import type { TabletAppId } from "@/data/tablet-apps";
import { StudioAppLink } from "@/components/studio/StudioAppLink";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { WorkVennDiagram } from "@/components/hero/WorkVennDiagram";
import { ProfileTagline } from "@/components/ProfileTagline";
import { Paper } from "@/components/physical-ui/Paper";

const roles = [
  "builder",
  "problem solver",
  "strategist",
  "designer",
  "adventurer",
  "dad",
];

const clientIds = ["adidas", "google", "co2t"] as const;

function IntroLogosAndVenn({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="max-w-md xl:max-w-none">
        <ClientLogoStrip size="sm" ids={[...clientIds]} className="xl:hidden" />
        <ClientLogoStrip size="md" ids={[...clientIds]} className="hidden xl:block" />
      </div>
      <WorkVennDiagram className="mt-3 sm:mt-4 xl:mt-5" />
    </div>
  );
}

function IntroBodyCopy() {
  return (
    <>
      <p className="max-w-[34ch] text-sm leading-snug text-ink-soft lg:text-[0.95rem] lg:leading-relaxed xl:max-w-none xl:text-base 2xl:text-[1.05rem] 2xl:leading-relaxed">
        {profile.summary}
      </p>

      <ul
        className="mt-3.5 flex flex-col gap-1.5 sm:mt-4 lg:mt-4 lg:gap-2 xl:grid xl:grid-cols-2 xl:gap-x-6 xl:gap-y-1.5"
        aria-label="Roles"
      >
        {roles.map((role) => (
          <li key={role} className="handwritten text-sm text-ink-soft lg:text-base xl:text-[1.05rem]">
            · {role}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 lg:gap-2.5">
        {practices.map((practice) => (
          <StudioAppLink
            key={practice.id}
            appId={practice.id as TabletAppId}
            className="rounded-full border border-ink/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper-cream lg:px-5 lg:py-2.5 lg:text-xs xl:px-5 xl:py-3"
          >
            Open {practice.id === "environmental" ? "Environmental" : "Creative"} App →
          </StudioAppLink>
        ))}
      </div>
    </>
  );
}

export function IntroPaper() {
  return (
    <Paper className="h-full [&_.paper-surface]:lg:px-10 [&_.paper-surface]:lg:py-11 [&_.paper-surface]:xl:px-12 [&_.paper-surface]:xl:py-12">
      <div className="min-w-0">
        <p className="handwritten text-lg text-ink lg:text-xl xl:text-[1.35rem]">Hi, I&apos;m</p>
        <p className="mt-0.5 font-editorial text-[1.35rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem] lg:text-[1.9rem] xl:text-[2.15rem] 2xl:text-[2.4rem]">
          {profile.name}
        </p>
        <h1 className="mt-2 max-w-[22ch] font-editorial text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem] lg:max-w-[24ch] lg:text-[2.85rem] xl:text-[3.2rem] 2xl:text-[3.55rem]">
          I love building solutions,
          <br />
          for fun and function.
        </h1>

        <ProfileTagline tagline={profile.tagline} variant="paper" className="mt-4 lg:mt-5" />

        <div className="xl:hidden">
          <IntroLogosAndVenn className="mt-3" />
          <div className="mt-4">
            <IntroBodyCopy />
          </div>
        </div>

        <div className="mt-4 hidden xl:mt-5 xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)] xl:items-start xl:gap-x-10">
          <IntroBodyCopy />
          <IntroLogosAndVenn />
        </div>
      </div>
    </Paper>
  );
}
