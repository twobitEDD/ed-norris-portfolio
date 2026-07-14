import Link from "next/link";
import Image from "next/image";
import { practices } from "@/data";
import { Tablet } from "@/components/physical-ui/Tablet";

const practiceImages = {
  environmental:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  creative:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
};

export function PracticeTablet() {
  return (
    <Tablet glow="cyan" orientation="portrait" className="w-full max-w-[420px] lg:ml-auto lg:max-w-none">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-screen-muted">
          Two focused practices
        </p>
        <div className="mt-4 grid flex-1 gap-3">
          {practices.map((practice) => {
            const imageKey = practice.id === "environmental" ? "environmental" : "creative";
            return (
              <Link
                key={practice.id}
                href={practice.href}
                className="practice-panel group relative flex min-h-[130px] flex-col justify-end overflow-hidden rounded-md sm:min-h-[148px]"
              >
                <Image
                  src={practiceImages[imageKey]}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="practice-panel-scrim absolute inset-0" />
                <div className="relative p-3.5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">
                    {practice.number}
                  </p>
                  <h3 className="mt-1 text-[12px] font-semibold leading-snug text-white sm:text-[13px]">
                    {practice.title}
                  </h3>
                  <span className="mt-2 inline-flex text-[11px] font-medium text-white/90 opacity-0 transition group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Tablet>
  );
}
