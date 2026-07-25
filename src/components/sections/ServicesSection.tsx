"use client";

import { motion } from "framer-motion";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { services } from "@/data/services";
import { springboardIconGridStyleProps } from "@/design/ent-language";
import { cn } from "@/lib/cn";

function ServicesSpringboard() {
  const gridStyle = springboardIconGridStyleProps(4, 20, 80);

  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-6 pt-4">
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">2bitENT Services</p>
        <div className="springboard-icon-grid flex-1 content-center" style={gridStyle}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="springboard-icon-button">
                <div
                  className="springboard-icon-tile flex items-center justify-center rounded-[22%] shadow-lg"
                  style={{ background: service.gradient }}
                >
                  <Icon className="h-[42%] w-[42%] text-white" strokeWidth={1.75} />
                </div>
                <span className={cn("springboard-icon-label text-center font-medium", "text-[10px] leading-tight")}>
                  {service.shortTitle}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="springboard-widget mt-2 flex flex-col justify-end px-4 py-3"
          style={{ gridColumn: "span 2" }}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">Studio tagline</p>
          <p className="mt-1 text-sm font-medium text-white">Whatever your team needs to ship</p>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-technology">Services</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-screen-text sm:text-4xl">
            Whatever your team needs to ship
          </h2>
          <p className="mt-4 text-screen-muted">
            Technology, brand, campaign, and interactive production — delivered by specialists who
            integrate AI into real workflows, not slide decks.
          </p>
          <div className="mt-10 space-y-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: service.gradient }}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-screen-text">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-screen-muted">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <DeviceViewer device="ipad" size="lg" glow="cyan">
            <ServicesSpringboard />
          </DeviceViewer>
        </motion.div>
      </div>
    </section>
  );
}
