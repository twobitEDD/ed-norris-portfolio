"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Paper } from "@/components/physical-ui/Paper";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="ent-ambient-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Paper variant="desk" pinned className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Start the conversation</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
              Tell us what your business needs to advance responsibly
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">
              Environmental accountability, software, branding, or production — we respond quickly and bring
              clarity to programs you can defend.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-wider text-paper-cream transition hover:bg-ink/90"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
            <p className="handwritten mt-6 text-lg text-ink-soft">We respond quickly ✦</p>
          </Paper>
        </motion.div>
      </div>
    </section>
  );
}
