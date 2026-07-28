"use client";

import { motion } from "framer-motion";
import { Paper } from "@/components/physical-ui/Paper";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { EntContactApp } from "@/components/contact/EntContactApp";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="ent-ambient-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">Start the conversation</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-screen-text sm:text-4xl">
              Tell us what your business needs to advance responsibly
            </h2>
            <p className="mt-4 max-w-lg text-screen-muted">
              Environmental accountability, software, branding, or production — leave a message here or email us
              directly at{" "}
              <a href={`mailto:${site.email}`} className="text-technology hover:underline">
                {site.email}
              </a>
              .
            </p>
            <p className="handwritten mt-6 text-lg text-screen-muted">We respond quickly ✦</p>
          </div>

          <div>
            <div className="hidden lg:block">
              <DeviceViewer device="phone" size="md" glow="amber" className="mx-auto max-w-[320px] rotate-[2deg]">
                <EntContactApp />
              </DeviceViewer>
            </div>
            <div className="lg:hidden">
              <Paper variant="desk" pinned torn>
                <EntContactApp compact />
              </Paper>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
