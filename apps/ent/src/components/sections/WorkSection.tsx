"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Polaroid } from "@/components/physical-ui/Polaroid";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

export function WorkSection() {
  return (
    <section id="work" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">Selected work</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl">
              Platforms, brands, and experiences we&apos;ve shipped
            </h2>
          </div>
          <p className="max-w-md text-sm text-screen-muted">
            Original products and partner production — drawn from two decades of software, branding,
            and campaign delivery.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group"
            >
              <Polaroid
                caption={project.caption}
                subtitle={project.category}
                gradient={project.gradient}
                rotation={index % 2 === 0 ? -2 : 3}
                size="lg"
                className="mx-auto"
              />
              <div className="mt-5 px-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-screen-text">{project.title}</h3>
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-screen-muted transition group-hover:text-technology"
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-screen-muted">{project.description}</p>
                <span
                  className={cn(
                    "mt-3 inline-block font-mono text-[9px] uppercase tracking-[0.16em]",
                    "text-technology/80",
                  )}
                >
                  {project.category}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
