import Image from "next/image";
import { clientLogos, clientNames } from "@/data/site";

export function ClientLogoBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
      {clientLogos.map((client) => (
        <Image
          key={client.name}
          src={client.src}
          alt={client.name}
          width={client.width}
          height={24}
          className="h-5 w-auto opacity-35 brightness-0 invert transition hover:opacity-55"
        />
      ))}
      {clientNames.map((name) => (
        <span key={name} className="font-display text-sm font-semibold tracking-wide text-white/35">
          {name}
        </span>
      ))}
    </div>
  );
}
