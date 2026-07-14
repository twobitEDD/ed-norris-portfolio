"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { practices, projects } from "@/data";
import { getProjectImage } from "@/data/career-images";
import type { Practice, Project } from "@/data/types";
import { disciplineColors } from "@/data/types";
import { Paper } from "@/components/physical-ui/Paper";
import { Tablet } from "@/components/physical-ui/Tablet";
import { PracticeGateway } from "@/components/practices/PracticeGateway";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";
import { StudioScene } from "@/components/studio/StudioScene";
import { cn } from "@/lib/cn";
import {
  parseWorkHash,
  practiceForHash,
  projectsForDiscipline,
  projectsForPractice,
  scrollToWorkSection,
  WORK_HASH_LABELS,
  WORK_HASHES,
  type WorkHash,
} from "@/lib/work-discipline";

const fallbackPhotos: Record<string, string> = {
  "proj-ergo": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  "proj-2bit-games":
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
};

const accentMap = {
  environmental: { primary: disciplineColors.environment, secondary: disciplineColors.data },
  creative: { primary: disciplineColors.games, secondary: disciplineColors.marketing },
  games: { primary: disciplineColors.games, secondary: disciplineColors.software },
};

function ProjectCard({ project }: { project: Project }) {
  const accent = disciplineColors[project.disciplines[0]];
  const brandImage = getProjectImage(project.id);
  const photo = brandImage?.src ?? fallbackPhotos[project.id];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full transition duration-300 ease-studio hover:-translate-y-1"
    >
      <Tablet glow="none" orientation="portrait" className="h-full w-full">
        <div className="relative flex min-h-[240px] flex-col justify-end overflow-hidden p-3 sm:min-h-[280px]">
          {photo && (
            <Image
              src={photo}
              alt={brandImage?.alt ?? ""}
              fill
              loading="lazy"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              style={{ objectPosition: brandImage?.objectPosition ?? "center" }}
              sizes="(max-width: 768px) 100vw, 320px"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 15%, ${accent}dd 100%)`,
            }}
          />
          <div className="relative">
            <p className="font-mono text-[8px] uppercase tracking-wider text-white/70">
              {project.disciplines.join(" · ")}
            </p>
            <h3 className="mt-1 font-display text-sm font-bold leading-tight text-white">{project.title}</h3>
            <p className="mt-1 line-clamp-3 text-[10px] text-white/85">{project.summary}</p>
            <span className="mt-2 inline-block text-[10px] font-semibold text-white/90 opacity-80 transition group-hover:opacity-100">
              Open case study →
            </span>
          </div>
        </div>
      </Tablet>
    </Link>
  );
}

function DisciplineNav({ activeHash }: { activeHash: WorkHash | null }) {
  return (
    <nav
      className="mt-6 flex flex-wrap gap-2"
      aria-label="Filter work by discipline"
    >
      <Link
        href="/work"
        className={cn(
          "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition",
          activeHash === null
            ? "border-ink bg-ink text-paper-cream"
            : "border-ink/20 text-ink hover:bg-ink/10",
        )}
      >
        All work
      </Link>
      {WORK_HASHES.map((hash) => (
        <Link
          key={hash}
          href={`/work#${hash}`}
          className={cn(
            "rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition",
            activeHash === hash
              ? "border-ink bg-ink text-paper-cream"
              : "border-ink/20 text-ink hover:bg-ink/10",
          )}
        >
          {WORK_HASH_LABELS[hash]}
        </Link>
      ))}
    </nav>
  );
}

function PracticeSection({
  id,
  practice,
  sectionProjects,
  highlighted,
}: {
  id: WorkHash;
  practice?: Practice;
  sectionProjects: Project[];
  highlighted: boolean;
}) {
  const accent = accentMap[id];
  const title = practice?.title ?? "Games & Interactive Media";
  const summary =
    practice?.summary ??
    "Game platforms, indie studio work, and interactive experiences across web and console.";
  const tagline = practice?.tagline;
  const tags = practice?.tags ?? ["Game Platforms", "Indie Studio", "Interactive UX"];

  return (
    <StudioScene
      id={id}
      className={cn(
        "!py-10 sm:!py-14",
        highlighted && "scroll-mt-24",
      )}
    >
      <StudioReveal>
        <StudioObject rotate={0.5}>
          <div
            className={cn(
              "max-w-3xl transition-shadow duration-300",
              highlighted && "rounded-[2px] ring-2 ring-offset-4 ring-offset-transparent",
            )}
            style={
              highlighted
                ? { boxShadow: `0 0 0 2px ${accent.primary}88, 0 18px 48px ${accent.primary}22` }
                : undefined
            }
          >
            <Paper torn>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: accent.primary }}
            >
              {practice?.label ?? "Games focus"}
            </p>
            {tagline && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                {tagline}
              </p>
            )}
            <h2 className="mt-3 font-editorial text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-wider"
                  style={{ borderColor: `${accent.primary}44`, color: accent.primary }}
                >
                  {tag}
                </span>
              ))}
            </div>
            </Paper>
          </div>
        </StudioObject>

        {sectionProjects.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectionProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-ink-soft">No projects in this discipline yet.</p>
        )}
      </StudioReveal>
    </StudioScene>
  );
}

export function WorkScene() {
  const [activeHash, setActiveHash] = useState<WorkHash | null>(null);

  useEffect(() => {
    const syncHash = () => {
      const next = parseWorkHash(window.location.hash);
      setActiveHash(next);
      scrollToWorkSection(next, "smooth");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const environmentalProjects = useMemo(
    () => projectsForPractice(practices[0], projects),
    [],
  );
  const creativeProjects = useMemo(
    () => projectsForPractice(practices[1], projects),
    [],
  );
  const gamesProjects = useMemo(() => projectsForDiscipline("games", projects), []);

  const focusedPractice = activeHash ? practiceForHash(activeHash, practices) : undefined;
  const pageTitle = focusedPractice?.title ?? (activeHash === "games" ? "Games & Interactive Media" : "Work that solves real problems.");
  const pageDescription =
    focusedPractice?.summary ??
    (activeHash === "games"
      ? "Game platforms, indie studio work, and interactive experiences."
      : "Environmental systems and creative technology — each with proof, case studies, and a clear hiring path.");

  const visibleSections = activeHash ? [activeHash] : WORK_HASHES;

  return (
    <>
      <StudioScene id="work" minHeight="min-h-0" className="!pb-6 !pt-24 sm:!pt-28">
        <StudioReveal>
          <StudioObject rotate={0.4}>
            <Paper torn className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Selected work</p>
              <h1 className="mt-2 font-editorial text-3xl font-semibold text-ink sm:text-4xl">{pageTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{pageDescription}</p>
              <DisciplineNav activeHash={activeHash} />
            </Paper>
          </StudioObject>
        </StudioReveal>
      </StudioScene>

      {!activeHash && (
        <StudioScene id="practices" className="!py-8 sm:!py-10">
          <StudioReveal>
            <PracticeGateway practices={practices} useAnchors />
          </StudioReveal>
        </StudioScene>
      )}

      {visibleSections.includes("environmental") && (
        <PracticeSection
          id="environmental"
          practice={practices[0]}
          sectionProjects={environmentalProjects}
          highlighted={activeHash === "environmental"}
        />
      )}

      {visibleSections.includes("creative") && (
        <PracticeSection
          id="creative"
          practice={practices[1]}
          sectionProjects={creativeProjects}
          highlighted={activeHash === "creative"}
        />
      )}

      {visibleSections.includes("games") && (
        <PracticeSection
          id="games"
          sectionProjects={gamesProjects}
          highlighted={activeHash === "games"}
        />
      )}
    </>
  );
}
