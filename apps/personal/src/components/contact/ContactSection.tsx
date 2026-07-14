import { profile } from "@/data";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";

export function ContactSection() {
  return (
    <SectionShell id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-panel p-8 sm:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(103,213,138,0.15), transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(70,199,215,0.12), transparent 45%)",
          }}
        />
        <div className="relative max-w-2xl">
          <SectionHeading
            eyebrow="Availability"
            title="Let's build something useful."
            description={profile.availability}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <GlowButton
                key={link.url}
                href={link.url}
                variant={link.label === "Email" ? "primary" : "ghost"}
              >
                {link.label}
              </GlowButton>
            ))}
            <GlowButton href="/resume">Build résumé</GlowButton>
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
            {profile.location} · Remote & hybrid friendly
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
