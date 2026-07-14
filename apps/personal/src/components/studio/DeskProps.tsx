import { cn } from "@/lib/cn";

export function DeskPlant({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none relative select-none", className)} aria-hidden="true">
      <div className="relative h-16 w-14 rounded-b-xl bg-gradient-to-b from-[#5c3d28] to-[#3a2518] shadow-[0_6px_16px_rgba(0,0,0,0.35)]">
        <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 gap-0.5">
          <span className="h-9 w-2.5 rotate-[-22deg] rounded-full bg-gradient-to-t from-environment/80 to-environment/50" />
          <span className="h-12 w-3 rounded-full bg-gradient-to-t from-environment to-environment/70" />
          <span className="h-8 w-2.5 rotate-[18deg] rounded-full bg-gradient-to-t from-environment/70 to-environment/40" />
          <span className="h-10 w-2 rotate-[30deg] rounded-full bg-gradient-to-t from-environment/60 to-environment/30" />
        </div>
        <div className="absolute inset-x-1 top-0 h-2 rounded-t-sm bg-[#6b4a32]/60" />
      </div>
    </div>
  );
}

export function DeskCompass({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-[4.5rem] w-[4.5rem] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.35)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border-2 border-amber-700/60 bg-gradient-to-br from-amber-500/25 via-amber-800/40 to-amber-950/70" />
      <div className="absolute inset-2 rounded-full border border-amber-600/30 bg-gradient-to-br from-amber-900/50 to-amber-950/80">
        <div className="absolute left-1/2 top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] bg-gradient-to-t from-amber-200/80 to-amber-600/60" />
        <div className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-[60deg] bg-gradient-to-t from-zinc-300/70 to-zinc-500/50" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/90" />
      </div>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[5px] uppercase tracking-widest text-amber-200/50">
        N
      </span>
    </div>
  );
}

export function DeskPatch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full border-2 border-environment/40 bg-gradient-to-br from-[#2d4a28] to-wood-dark text-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="mb-0.5 h-4 w-4 text-environment/80" fill="currentColor">
        <path d="M12 2C8 6 4 8 4 12a8 8 0 1016 0c0-4-4-6-8-10z" />
      </svg>
      <span className="font-mono text-[5px] font-bold uppercase leading-tight tracking-wider text-paper-cream/90">
        Make
        <br />
        something
        <br />
        useful
      </span>
    </div>
  );
}

export function DeskPenCup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-[5.5rem] w-16 rounded-b-2xl bg-gradient-to-b from-zinc-400/50 via-zinc-600/60 to-zinc-800/90 shadow-[0_6px_16px_rgba(0,0,0,0.3)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-x-1 top-0 h-2 rounded-t-lg bg-zinc-300/30" />
      <div className="flex justify-center gap-1 pt-2">
        <span className="h-16 w-1 rotate-[-10deg] rounded-full bg-gradient-to-t from-amber-800 to-amber-600/80" />
        <span className="h-[4.5rem] w-1 rounded-full bg-gradient-to-t from-slate-500 to-slate-300/70" />
        <span className="h-14 w-1 rotate-[8deg] rounded-full bg-gradient-to-t from-environment/80 to-environment/50" />
        <span className="h-12 w-0.5 rotate-[15deg] rounded-full bg-zinc-400/60" />
      </div>
    </div>
  );
}

export function DeskCoffeeCup({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      <div className="h-3 w-14 rounded-full bg-zinc-300/20 shadow-sm" />
      <div className="mx-auto h-10 w-12 rounded-b-2xl bg-gradient-to-b from-zinc-100/90 to-zinc-300/70 shadow-paper">
        <div className="mx-auto mt-1 h-6 w-10 rounded-b-xl bg-gradient-to-b from-[#4a3020] to-[#2a1a10]" />
      </div>
      <div className="absolute -right-1 top-3 h-4 w-3 rounded-r-full border-2 border-l-0 border-zinc-300/60" />
    </div>
  );
}
