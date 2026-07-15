import { profile } from "@/data";
import { Paper } from "@/components/physical-ui/Paper";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { contactPolaroidImage } from "@/data/career-images";
import { StickyNote } from "@/components/physical-ui/StickyNote";
import { Notebook } from "@/components/physical-ui/Notebook";
import { StudioScene } from "@/components/studio/StudioScene";
import { StudioObject } from "@/components/studio/StudioObject";
import { StudioFooter } from "@/components/studio/StudioFooter";
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
            <Polaroid
              size="lg"
              rotation={0}
              image={contactPolaroidImage}
              caption="Human-centered systems for consequential work."
              subtitle="Oregon, USA · Edd Norris"
              className="mx-auto lg:ml-auto"
            />
            <StickyNote color="yellow" className="mt-6 max-w-[220px] lg:ml-8">
              <p className="handwritten text-lg text-ink">Systems that scale. Impact that lasts.</p>
              <p className="mt-1 text-xs text-ink-soft">soil · water · energy · people</p>
            </StickyNote>
          </StudioObject>
        </div>
        <StudioFooter showBorder={false} />
      </StudioReveal>
    </StudioScene>
  );
}
