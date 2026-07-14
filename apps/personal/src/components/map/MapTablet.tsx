import { Tablet } from "@/components/physical-ui/Tablet";
import { StudioWorkMap } from "./StudioWorkMap";

export function MapTablet({ className }: { className?: string }) {
  return (
    <Tablet glow="purple" className={className}>
      <div className="flex h-full min-h-[380px] flex-col">
        <div className="border-b border-screen-border px-5 py-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-screen-muted">Work map</p>
          <h2 className="mt-1 font-editorial text-lg font-medium text-screen-text">The living work map.</h2>
        </div>
        <StudioWorkMap />
      </div>
    </Tablet>
  );
}
