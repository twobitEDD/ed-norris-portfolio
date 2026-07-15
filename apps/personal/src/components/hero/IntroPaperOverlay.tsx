import Link from "next/link";
import { ContactCTAs } from "@/components/contact/ContactCTAs";
import { Paper } from "@/components/physical-ui/Paper";

export function IntroPaperOverlay() {
  return (
    <Paper compact elevated className="w-full">
      <div className="flex flex-col gap-2.5">
        <ContactCTAs variant="desk" className="flex-col !gap-2 sm:flex-row sm:!gap-2" />
        <Link
          href="/#game"
          className="rounded-full border border-ink/20 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper-cream"
        >
          Open studio apps ↓
        </Link>
      </div>
    </Paper>
  );
}
