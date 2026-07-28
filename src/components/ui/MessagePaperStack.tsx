import { Paper } from "@/components/physical-ui/Paper";
import { cn } from "@/lib/cn";

const inboxMessages = [
  {
    from: "Marketing",
    subject: "Can we call this carbon neutral?",
    preview: "Need copy for the Q3 launch deck by Friday.",
    rotate: -5,
    className: "top-0 left-0 z-[1]",
  },
  {
    from: "Legal",
    subject: "RE: sustainability claims audit",
    preview: "Where is the field data backing these numbers?",
    rotate: 3,
    className: "top-10 left-6 z-[2]",
  },
  {
    from: "Investor relations",
    subject: "Stakeholder questions incoming",
    preview: "Board wants proof before we publish the report.",
    rotate: -2,
    className: "top-[5.5rem] left-2 z-[3]",
  },
  {
    from: "Ops",
    subject: "Sustainability_Claims_FINAL_v4.xlsx",
    preview: "Manual spreadsheet — still reconciling field logs.",
    rotate: 4,
    className: "top-[9.5rem] left-8 z-[4]",
  },
] as const;

export function MessagePaperStack() {
  return (
    <div className="message-paper-stack relative mx-auto h-[340px] w-full max-w-[300px] sm:max-w-[320px]">
      {inboxMessages.map((msg) => (
        <div
          key={msg.subject}
          className={cn("message-paper-stack__item absolute w-[88%]", msg.className)}
          style={{ transform: `rotate(${msg.rotate}deg)` }}
        >
          <Paper compact variant="desk" className="shadow-paper">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">From: {msg.from}</p>
            <p className="mt-1.5 font-display text-sm font-semibold leading-snug text-ink">{msg.subject}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{msg.preview}</p>
          </Paper>
        </div>
      ))}
      <div
        className="message-paper-stack__alert absolute bottom-2 right-0 z-[5] rotate-[3deg]"
        aria-hidden
      >
        <div className="desk-prop desk-prop--sticky px-3 py-2.5">
          <p className="font-mono text-[7px] uppercase tracking-wider text-ink-soft">Risk</p>
          <p className="handwritten text-base leading-tight text-red-800">Greenwashing exposure</p>
        </div>
      </div>
    </div>
  );
}
