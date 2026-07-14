import { cn } from "@/lib/cn";
import { ObjectShadow } from "./ObjectShadow";

export function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-[220px] sm:w-[248px]", className)}>
      <ObjectShadow depth={4} />
      <div className="device-frame device-bezel device-frame--phone">
        <div className="screen-surface max-h-[440px] overflow-y-auto">
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
