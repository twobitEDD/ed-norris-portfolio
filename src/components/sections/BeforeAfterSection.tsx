"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Paper } from "@/components/physical-ui/Paper";
import { MessagePaperStack } from "@/components/ui/MessagePaperStack";
import { ProductStrip } from "@/components/ui/ProductStrip";
import { With2bitEntApp } from "@/components/ui/With2bitEntApp";
import { practiceProof } from "@/data/site";

export function BeforeAfterSection() {
  return (
    <section id="process" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">How we advise</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl lg:text-5xl">
            Not more tools.{" "}
            <span className="text-technology">Better flow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-screen-muted">
            We help businesses connect field operations, product sales, and environmental reporting — so
            growth doesn&apos;t outpace accountability.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1.15fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-screen-muted">Before</p>
            <MessagePaperStack />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col items-center gap-3"
          >
            <ArrowRight className="hidden h-5 w-5 text-technology lg:block" aria-hidden />
            <Paper compact className="max-w-[220px] rotate-[-2deg]" pinned>
              <p className="handwritten text-center text-xl leading-snug text-ink">
                Understand impact before you market it
              </p>
              <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                2bitENT advisory
              </p>
            </Paper>
            <ArrowRight className="hidden h-5 w-5 rotate-180 text-technology lg:block" aria-hidden />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <With2bitEntApp />
          </motion.div>
        </div>

        <ProductStrip />

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {practiceProof.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className="group rounded-xl border border-white/5 bg-ent-slate/30 p-4 transition hover:border-technology/25"
            >
              <p className="font-display text-sm font-semibold text-screen-text group-hover:text-technology">
                {item.label}
              </p>
              <p className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-screen-muted">
                {item.detail}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
