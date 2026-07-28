"use client";

import { motion } from "framer-motion";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { services } from "@/data/services";
import { springboardIconGridStyleProps } from "@/design/ent-language";
import { cn } from "@/lib/cn";

function ServicesSpringboard() {
  const gridStyle = springboardIconGridStyleProps(4, 16, 72);

  return (
    <div className="ent-springboard-wallpaper relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-5 pt-3">
        <p className="mb-1 text-xs text-white/70">We help businesses</p>
        <p className="mb-4 font-display text-sm font-semibold text-white">Advance with accountable impact.</p>
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
                <span className={cn("springboard-icon-label text-center font-medium", "text-[9px] leading-tight")}>
                  {service.shortTitle}
                </span>
              </div>
            );
          })}
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
            Advisory. Software. Brand. Campaigns.
          </h2>
          <p className="mt-4 text-screen-muted">
            Four integrated capabilities — environmental guidance backed by systems we&apos;ve actually built and shipped.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-xl border border-white/5 bg-ent-slate/50 p-4 transition hover:border-technology/20"
                >
                  <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: service.gradient }}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-screen-text">{service.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-screen-muted">{service.description}</p>
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
          className="relative mx-auto w-full max-w-[320px] lg:ml-auto lg:max-w-none"
        >
          <div className="hidden lg:block">
            <DeviceViewer device="phone" size="md" glow="cyan" className="rotate-[3deg]">
              <ServicesSpringboard />
            </DeviceViewer>
            <DeviceViewer
              device="ipad"
              size="sm"
              glow="none"
              className="absolute -right-2 top-8 hidden w-[55%] rotate-[-4deg] opacity-90 xl:block"
            >
              <div className="ent-springboard-wallpaper flex h-full flex-col justify-end p-5">
                <p className="font-display text-lg font-bold text-white">Evidence-led growth.</p>
                <p className="mt-1 text-xs text-white/60">For businesses that need to advance responsibly.</p>
              </div>
            </DeviceViewer>
          </div>
          <div className="lg:hidden">
            <DeviceViewer device="phone" size="md" glow="cyan" className="rotate-[2deg]">
              <ServicesSpringboard />
            </DeviceViewer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
