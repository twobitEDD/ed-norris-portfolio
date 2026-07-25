"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { featuredProjects } from "@/data/projects";

const rotations = [-4, 2, -2];

export function WorkSection() {
  return (
    <section id="work" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="ent-studio-floor pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">Selected work</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl">
            Platforms, brands, and experiences we&apos;ve shipped
          </h2>
        </div>

        {/* Polaroid strip — concept 04 layout */}
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-center sm:gap-6 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group w-full max-w-[280px]"
              style={{ transform: `rotate(${rotations[index]}deg)` }}
            >
              <Link href={project.href ?? "#"} target={project.href ? "_blank" : undefined} className="block">
                <Polaroid
                  caption={project.title}
                  subtitle={project.caption}
                  gradient={project.gradient}
                  rotation={0}
                  size="lg"
                  className="transition group-hover:scale-[1.02]"
                />
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-technology/80">
                    {project.category}
                  </span>
                  {project.href && (
                    <ArrowUpRight className="h-4 w-4 text-screen-muted transition group-hover:text-technology" />
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
