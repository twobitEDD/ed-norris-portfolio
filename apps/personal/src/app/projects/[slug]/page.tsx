import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, profile } from "@/data";
import { disciplineColors } from "@/data/types";
import { PageShell } from "@/components/layout/PageShell";
import { GlowButton } from "@/components/ui/GlowButton";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const color = disciplineColors[project.disciplines[0]];

  return (
    <PageShell name={profile.name}>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          Case study
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
        {project.organization && (
          <p className="mt-2 text-lg text-text-secondary">{project.organization}</p>
        )}
        <p className="mt-6 text-lg leading-relaxed text-text-secondary">{project.summary}</p>

        {project.challenge && (
          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
              Challenge
            </h2>
            <p className="mt-3 text-text-secondary">{project.challenge}</p>
          </section>
        )}

        {project.approach && (
          <section className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
              Approach
            </h2>
            <p className="mt-3 text-text-secondary">{project.approach}</p>
          </section>
        )}

        {project.outcomes && (
          <section className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
              Outcomes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-text-secondary">
              {project.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
        )}

        {project.metrics && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border bg-panel p-5"
                style={{ borderColor: `${color}33` }}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold" style={{ color }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <GlowButton href="/#game?app=work" variant="ghost">
            ← Back to selected work
          </GlowButton>
        </div>
      </article>
    </PageShell>
  );
}
