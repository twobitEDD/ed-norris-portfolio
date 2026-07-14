"use client";

import { useMemo, useState } from "react";
import type { CareerEntry, Person, ResumePreset } from "@ed-norris/career-data";
import { formatYears, getResumeEntries } from "@ed-norris/career-data";

type Props = {
  person: Person;
  presets: ResumePreset[];
  entries: CareerEntry[];
};

export function ResumeSection({ person, presets, entries }: Props) {
  const [presetId, setPresetId] = useState(presets[0]?.id ?? "executive");
  const [emphasizeSustainability, setEmphasizeSustainability] = useState(true);
  const [emphasizeSoftware, setEmphasizeSoftware] = useState(true);
  const [includeEntertainment, setIncludeEntertainment] = useState(false);

  const resumeEntries = useMemo(() => {
    let selected = getResumeEntries(presetId);
    if (!includeEntertainment) {
      selected = selected.filter((entry) => !entry.tags.includes("games"));
    }
    if (emphasizeSustainability) {
      const env = entries.filter((entry) =>
        entry.tags.some((tag) => ["environmental", "agriculture", "climate"].includes(tag)),
      );
      selected = [...new Map([...selected, ...env].map((item) => [item.id, item])).values()];
    }
    if (emphasizeSoftware) {
      const software = entries.filter((entry) =>
        entry.tags.some((tag) => ["software", "platform"].includes(tag)),
      );
      selected = [...new Map([...selected, ...software].map((item) => [item.id, item])).values()];
    }
    return selected.slice(0, presetId === "full" ? 6 : presetId === "technical" ? 4 : 3);
  }, [presetId, emphasizeSustainability, emphasizeSoftware, includeEntertainment, entries]);

  const activePreset = presets.find((preset) => preset.id === presetId);

  return (
    <section id="resume" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <h2 className="text-3xl font-bold sm:text-5xl">Résumé generator, not résumé maintenance.</h2>
      <div className="mt-8 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="no-print border border-ink p-6 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
            Output controls
          </p>
          <h3 className="mt-2 text-2xl font-bold">Build the version the opportunity needs.</h3>

          <div className="mt-6 space-y-1">
            {presets.map((preset) => (
              <label
                key={preset.id}
                className="flex cursor-pointer items-start gap-2 border-b border-line py-2.5 text-sm"
              >
                <input
                  type="radio"
                  name="preset"
                  checked={presetId === preset.id}
                  onChange={() => setPresetId(preset.id)}
                  className="mt-1"
                />
                <span>
                  <span className="font-semibold">{preset.label}</span>
                  <span className="mt-0.5 block text-muted">{preset.description}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emphasizeSustainability}
                onChange={(event) => setEmphasizeSustainability(event.target.checked)}
              />
              Emphasize sustainability
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emphasizeSoftware}
                onChange={(event) => setEmphasizeSoftware(event.target.checked)}
              />
              Include software leadership
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeEntertainment}
                onChange={(event) => setIncludeEntertainment(event.target.checked)}
              />
              Include entertainment projects
            </label>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 rounded-full border border-ink px-4 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-paper"
          >
            Print / save as PDF
          </button>
        </div>

        <article className="print-area min-h-[520px] border border-ink bg-white p-6 shadow-paper sm:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-forest">
            {person.name.toUpperCase()}
          </p>
          <h3 className="mt-1 text-2xl font-bold sm:text-3xl">Software & Product Innovator</h3>
          <p className="mt-1 text-sm text-[#626966]">
            {person.location} · Software systems · Environmental technology · Interactive products
          </p>
          <hr className="my-4 border-line" />

          <section>
            <h4 className="font-bold">Profile</h4>
            <p className="mt-2 text-sm leading-relaxed">
              Cross-disciplinary product and software leader who turns complex operational,
              environmental, and creative challenges into coherent systems people can understand
              and use.
            </p>
          </section>

          <section className="mt-5">
            <h4 className="font-bold">Selected impact</h4>
            <p className="mt-2 text-sm leading-relaxed">
              Designed and shipped digital products, operational infrastructure, game concepts,
              brand systems, and sustainability tools across entrepreneurial environments.
            </p>
          </section>

          <section className="mt-5">
            <h4 className="font-bold">Experience</h4>
            <div className="mt-3 space-y-4">
              {resumeEntries.map((entry) => (
                <div key={entry.id}>
                  <p className="text-sm font-bold">
                    {entry.title}
                    {entry.organization ? ` — ${entry.organization}` : ""}
                  </p>
                  <p className="text-xs text-[#626966]">{formatYears(entry.start, entry.end)}</p>
                  <p className="mt-1 text-sm leading-relaxed">{entry.summary}</p>
                  {entry.actions && entry.actions.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      {entry.actions.slice(0, activePreset?.pages === 1 ? 1 : 2).map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
