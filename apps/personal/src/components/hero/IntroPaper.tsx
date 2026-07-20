import { profile, practices } from "@/data";
import type { TabletAppId } from "@/data/tablet-apps";
import { StudioAppLink } from "@/components/studio/StudioAppLink";
import { ClientLogoStrip } from "@/components/hero/ClientLogoStrip";
import { WorkVennDiagram } from "@/components/hero/WorkVennDiagram";
import { ProfileTagline } from "@/components/ProfileTagline";
import { Paper } from "@/components/physical-ui/Paper";
import { cn } from "@/lib/cn";

const roles = [
  "builder",
  "problem solver",
  "strategist",
  "designer",
  "adventurer",
  "dad",
];

const clientIds = ["adidas", "google", "co2t"] as const;

function IntroLogosAndVenn({
  className,
  layout = "stacked",
}: {
  className?: string;
  layout?: "stacked" | "corner";
}) {
  const isCorner = layout === "corner";

  return (
    <div className={cn(isCorner && "flex flex-col items-end", className)}>
      <div className={cn("max-w-md", isCorner ? "w-full max-w-[280px] 2xl:max-w-[320px]" : "xl:max-w-none")}>
        <ClientLogoStrip size="sm" ids={[...clientIds]} className={isCorner ? "hidden" : "xl:hidden"} />
        <ClientLogoStrip
          size="md"
          ids={[...clientIds]}
          className={isCorner ? "block" : "hidden xl:block"}
        />
      </div>
      <WorkVennDiagram
        className={cn(
          "mt-3 sm:mt-4",
          isCorner ? "mt-4 w-full max-w-[280px] 2xl:max-w-[320px] [&_svg]:ml-auto" : "xl:mt-5",
        )}
      />
    </div>
  );
}

function IntroBodyCopy({
  extended = false,
  className,
}: {
  extended?: boolean;
  className?: string;
}) {
  const summary = extended && profile.summaryExtended ? profile.summaryExtended : profile.summary;

  return (
    <div className={className}>
      <p
        className={cn(
          "text-[0.9375rem] leading-snug text-ink-soft sm:text-sm lg:text-[0.95rem] lg:leading-relaxed",
          extended
            ? "max-w-none sm:max-w-[38ch] xl:max-w-none xl:text-base xl:leading-relaxed 2xl:text-[1.05rem] 2xl:leading-relaxed"
            : "max-w-[34ch] sm:max-w-[26ch] md:max-w-[28ch] lg:max-w-[30ch]",
        )}
      >
        {summary}
      </p>

      <ul
        className="mt-3.5 flex flex-col gap-2 sm:mt-4 sm:gap-2.5 lg:mt-4 lg:gap-3"
        aria-label="Roles"
      >
        {roles.map((role) => (
          <li key={role} className="handwritten text-lg text-ink-soft lg:text-xl xl:text-xl 2xl:text-[1.35rem]">
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
    </div>
  );
}

export function IntroPaper() {
  return (
    <Paper className="h-full [&_.paper-surface]:max-sm:px-3.5 [&_.paper-surface]:max-sm:py-5 [&_.paper-surface]:lg:px-10 [&_.paper-surface]:lg:py-11 [&_.paper-surface]:xl:px-12 [&_.paper-surface]:xl:py-12">
      <div className="min-w-0">
        <p className="handwritten text-xl text-ink sm:text-lg lg:text-xl xl:text-[1.35rem]">Hi, I&apos;m</p>
        <p className="mt-0.5 font-editorial text-[1.5rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem] lg:text-[1.9rem] xl:text-[2.15rem] 2xl:text-[2.4rem]">
          {profile.name}
        </p>
        <h1 className="mt-2 max-w-none font-editorial text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:max-w-[22ch] sm:text-[2.5rem] lg:max-w-[24ch] lg:text-[2.85rem] xl:text-[3.2rem] 2xl:text-[3.55rem]">
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

        <div className="intro-paper-extended relative mt-4 hidden xl:mt-6 xl:block">
          <IntroBodyCopy extended className="intro-paper-extended__copy min-w-0" />
          <IntroLogosAndVenn layout="corner" className="intro-paper-extended__visuals" />
        </div>
      </div>
    </Paper>
  );
}
