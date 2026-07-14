import { profile } from "@/data";
import { Paper } from "@/components/physical-ui/Paper";
import { Tablet } from "@/components/physical-ui/Tablet";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { Notebook } from "@/components/physical-ui/Notebook";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioReveal } from "@/components/studio/StudioReveal";

export function ContactScene() {
  return (
    <StudioScene id="contact" className="!pb-24 !pt-8">
      <StudioReveal>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <StudioObject rotate={-1.2}>
            <Paper torn>
              <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{profile.availability}</p>
            </Paper>

            <Notebook title="Contact" className="mt-6 max-w-sm">
              <div className="mt-3 space-y-3 text-sm text-ink">
                {profile.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="block font-medium underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
                <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                  {profile.location}
                </p>
                <p className="text-xs text-ink-soft">Remote & on-site</p>
              </div>
            </Notebook>
          </StudioObject>

          <StudioObject parallax={0.03} rotate={1.5}>
            <Tablet glow="green" className="w-full max-w-lg lg:ml-auto">
              <div
                className="flex min-h-[300px] flex-col items-center justify-end p-8 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 15%, rgba(0,0,0,0.78) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80') center/cover",
                }}
              >
                <p className="font-editorial text-xl font-semibold text-white sm:text-2xl">
                  Human-centered systems for consequential work.
                </p>
              </div>
            </Tablet>
            <StickyNote color="yellow" className="mt-6 max-w-[220px] lg:ml-8">
              <p className="handwritten text-lg text-ink">Systems that scale. Impact that lasts.</p>
              <p className="mt-1 text-xs text-ink-soft">soil · water · energy · people</p>
            </StickyNote>
          </StudioObject>
        </div>
        <footer className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper-cream/50">
          {profile.name} · {new Date().getFullYear()}
        </footer>
      </StudioReveal>
    </StudioScene>
  );
}
