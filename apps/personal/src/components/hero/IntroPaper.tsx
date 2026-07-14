import Link from "next/link";
import { profile } from "@/data";
import { practices } from "@/data";
import { Paper } from "@/components/physical-ui/Paper";

const roles = [
  "builder",
  "problem solver",
  "strategist",
  "designer",
  "adventurer",
  "dad",
];

function VennDiagram() {
  return (
    <div className="relative mt-6">
      <svg viewBox="0 0 260 110" className="h-[100px] w-full max-w-[280px]" aria-hidden="true">
        <circle cx="90" cy="58" r="42" fill="none" stroke="#7ea66a" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="58" r="42" fill="none" stroke="#4da4c9" strokeWidth="1.5" opacity="0.8" />
        <circle cx="130" cy="38" r="42" fill="none" stroke="#8c5cc7" strokeWidth="1.5" opacity="0.65" />
        <text x="62" y="64" className="fill-ink-soft text-[8px] font-medium uppercase tracking-wider">
          People
        </text>
        <text x="148" y="64" className="fill-ink-soft text-[8px] font-medium uppercase tracking-wider">
          Planet
        </text>
        <text x="108" y="30" className="fill-ink-soft text-[8px] font-medium uppercase tracking-wider">
          Tech
        </text>
        <text x="108" y="78" className="fill-ink text-[8px] font-medium uppercase tracking-wider">
          Where I work
        </text>
      </svg>
      <p className="handwritten absolute -bottom-1 left-2 text-sm text-ink-soft">where I work.</p>
    </div>
  );
}

export function IntroPaper() {
  return (
    <Paper torn pinned className="h-full">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <p className="handwritten text-lg text-ink">Hi, I&apos;m Edd.</p>
          <h1 className="mt-2 max-w-[22ch] font-editorial text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
            I build useful systems that connect{" "}
            <span className="text-environment">people</span>,{" "}
            <span className="text-technology">technology</span>, and the{" "}
            <span className="text-environment">living world.</span>
          </h1>
          <VennDiagram />
          <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-ink-soft">{profile.summary}</p>
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
