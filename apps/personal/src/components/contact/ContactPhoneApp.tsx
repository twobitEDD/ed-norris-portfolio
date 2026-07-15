"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  UserRound,
} from "lucide-react";
import { profile } from "@/data";
import { Phone } from "@/components/physical-ui/Phone";
import {
  categorizeContactLinks,
  linkIconKind,
  type ProfileLink,
} from "@/lib/contact/links";
import {
  CONTACT_MAILTO,
  getSchedulingHref,
  isExternalScheduling,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { easeStudio, reducedMotion } from "@/lib/motion";

type ContactScreen = "home" | "methods" | "message" | "socials";

const SCREENS: ContactScreen[] = ["home", "methods", "message", "socials"];

const SCREEN_LABELS: Record<ContactScreen, string> = {
  home: "Home",
  methods: "Connect",
  message: "Message",
  socials: "Links",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: easeStudio },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.28, ease: easeStudio },
  }),
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function LinkIcon({ link, className }: { link: ProfileLink; className?: string }) {
  const kind = linkIconKind(link);
  const props = { className: cn("h-4 w-4 shrink-0", className), strokeWidth: 1.75 };

  switch (kind) {
    case "email":
      return <Mail {...props} />;
    case "github":
      return <GitBranch {...props} />;
    case "linkedin":
      return <UserRound {...props} />;
    default:
      return <Globe {...props} />;
  }
}

function AppListRow({
  icon,
  label,
  detail,
  onClick,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/8 text-ink">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink">{label}</span>
        {detail && <span className="block truncate text-[11px] text-ink-soft">{detail}</span>}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink/35" strokeWidth={1.75} />
    </>
  );

  const className =
    "flex w-full min-h-[44px] items-center gap-3 rounded-xl border border-ink/10 bg-white/45 px-3 py-2.5 text-left transition hover:border-ink/20 hover:bg-white/70";

  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: ContactScreen) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-1 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-paper-cream shadow-sm">
        <span className="font-editorial text-lg font-semibold">EN</span>
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft">Reach</p>
      <h2 className="mt-2 font-editorial text-xl font-semibold leading-tight text-ink sm:text-[1.35rem]">
        Let&apos;s build something useful.
      </h2>
      <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-ink-soft sm:text-[13px]">
        {profile.availability}
      </p>
      <div className="mt-5 flex w-full max-w-[300px] flex-col gap-2">
        <button
          type="button"
          onClick={() => onNavigate("methods")}
          className="min-h-[44px] rounded-xl border border-ink/25 bg-ink px-4 py-2.5 text-sm font-semibold text-paper-cream transition hover:bg-ink/90"
        >
          Get in touch
        </button>
        <button
          type="button"
          onClick={() => onNavigate("message")}
          className="min-h-[44px] rounded-xl border border-ink/15 bg-white/55 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/80"
        >
          Leave a message
        </button>
      </div>
      <p className="mt-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-soft">
        <MapPin className="h-3 w-3" strokeWidth={1.75} />
        {profile.location}
      </p>
    </div>
  );
}

function MethodsScreen({
  onNavigate,
  categorized,
  scheduleHref,
  scheduleExternal,
}: {
  onNavigate: (screen: ContactScreen) => void;
  categorized: ReturnType<typeof categorizeContactLinks>;
  scheduleHref: string;
  scheduleExternal: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Ways to connect</p>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-0.5">
        {categorized.email && (
          <AppListRow
            icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
            label="Email Edd"
            detail={categorized.email.url.replace("mailto:", "")}
            href={CONTACT_MAILTO}
          />
        )}
        {scheduleExternal ? (
          <AppListRow
            icon={<Calendar className="h-4 w-4" strokeWidth={1.75} />}
            label="Schedule a chat"
            detail="Book a time"
            href={scheduleHref}
            external
          />
        ) : (
          <AppListRow
            icon={<Calendar className="h-4 w-4" strokeWidth={1.75} />}
            label="Schedule a chat"
            detail="On-site booking"
            href={scheduleHref}
          />
        )}
        <AppListRow
          icon={<MessageSquare className="h-4 w-4" strokeWidth={1.75} />}
          label="Leave a message"
          detail="Send a note from this site"
          onClick={() => onNavigate("message")}
        />
        <AppListRow
          icon={<Globe className="h-4 w-4" strokeWidth={1.75} />}
          label="All links & socials"
          detail={`${categorized.github.length + categorized.social.length + categorized.projects.length} more`}
          onClick={() => onNavigate("socials")}
        />
      </div>
    </div>
  );
}

function MessageScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setSubmitState("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (submitState === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center px-2 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-environment/20 text-environment">
          <Send className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <p className="font-editorial text-lg font-semibold text-ink">Message sent</p>
        <p className="mt-2 text-xs leading-relaxed text-ink-soft">
          Thanks — Edd will reply to <span className="font-medium text-ink">{email}</span> soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Leave a message</p>
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5">
        <label className="block text-[10px] text-ink-soft">
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full min-h-[40px] rounded-lg border border-ink/15 bg-white/60 px-2.5 py-2 text-sm text-ink"
            autoComplete="name"
          />
        </label>
        <label className="block text-[10px] text-ink-soft">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full min-h-[40px] rounded-lg border border-ink/15 bg-white/60 px-2.5 py-2 text-sm text-ink"
            autoComplete="email"
          />
        </label>
        <label className="block text-[10px] text-ink-soft">
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            minLength={10}
            className="mt-1 w-full resize-none rounded-lg border border-ink/15 bg-white/60 px-2.5 py-2 text-sm text-ink"
            placeholder="Project, role, collaboration…"
          />
        </label>
        {errorMessage && (
          <p className="rounded-lg border border-red-300/50 bg-red-50 px-2.5 py-2 text-[11px] text-red-900" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="mt-3 min-h-[44px] shrink-0 rounded-xl border border-ink/25 bg-ink px-4 py-2 text-sm font-semibold text-paper-cream transition hover:bg-ink/90 disabled:opacity-60"
      >
        {submitState === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function LinkSection({ title, links }: { title: string; links: ProfileLink[] }) {
  if (links.length === 0) return null;

  return (
    <div>
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">{title}</p>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[40px] items-center gap-2.5 rounded-xl border border-ink/10 bg-white/45 px-3 py-2 transition hover:border-ink/20 hover:bg-white/70"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink/8 text-ink">
              <LinkIcon link={link} className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{link.label}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink/30" strokeWidth={1.75} />
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialsScreen({ categorized }: { categorized: ReturnType<typeof categorizeContactLinks> }) {
  return (
    <div className="flex h-full flex-col">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Links & socials</p>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
        <LinkSection title="GitHub" links={categorized.github} />
        <LinkSection title="Social" links={categorized.social} />
        <LinkSection title="Projects & orgs" links={categorized.projects} />
        <p className="flex items-center gap-1.5 pb-1 font-mono text-[9px] uppercase tracking-wider text-ink-soft">
          <MapPin className="h-3 w-3" strokeWidth={1.75} />
          {profile.location}
        </p>
      </div>
    </div>
  );
}

function ContactAppContent() {
  const [[screen, direction], setScreen] = useState<[ContactScreen, number]>(["home", 0]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const categorized = useMemo(() => categorizeContactLinks(profile.links), []);
  const scheduleHref = getSchedulingHref();
  const scheduleExternal = isExternalScheduling();

  const screenIndex = SCREENS.indexOf(screen);

  const goTo = useCallback((next: ContactScreen) => {
    setScreen((prev) => {
      const prevIndex = SCREENS.indexOf(prev[0]);
      const nextIndex = SCREENS.indexOf(next);
      return [next, nextIndex > prevIndex ? 1 : -1];
    });
  }, []);

  const goNext = useCallback(() => {
    if (screenIndex < SCREENS.length - 1) {
      goTo(SCREENS[screenIndex + 1]);
    }
  }, [goTo, screenIndex]);

  const goPrev = useCallback(() => {
    if (screenIndex > 0) {
      goTo(SCREENS[screenIndex - 1]);
    }
  }, [goTo, screenIndex]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current || reducedMotion()) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="contact-phone-app flex h-full min-h-0 flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header className="mb-2 flex shrink-0 items-center gap-2 border-b border-ink/8 pb-2">
        {screen !== "home" ? (
          <button
            type="button"
            onClick={goPrev}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink transition hover:bg-ink/8"
            aria-label="Previous screen"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
        ) : (
          <span className="h-8 w-8" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
            {profile.name}
          </p>
          <p className="truncate text-xs font-semibold text-ink">{SCREEN_LABELS[screen]}</p>
        </div>
        {!scheduleExternal && screen === "methods" ? (
          <Link
            href={scheduleHref}
            className="shrink-0 rounded-lg px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-ink-soft transition hover:bg-ink/8 hover:text-ink"
          >
            Book
          </Link>
        ) : (
          <span className="w-8 shrink-0" aria-hidden />
        )}
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={screen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {screen === "home" && <HomeScreen onNavigate={goTo} />}
            {screen === "methods" && (
              <MethodsScreen
                onNavigate={goTo}
                categorized={categorized}
                scheduleHref={scheduleHref}
                scheduleExternal={scheduleExternal}
              />
            )}
            {screen === "message" && <MessageScreen />}
            {screen === "socials" && <SocialsScreen categorized={categorized} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav
        className="mt-2 flex shrink-0 items-center justify-center gap-1.5 pt-1"
        aria-label="Contact app screens"
      >
        {SCREENS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              id === screen ? "w-5 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/40",
            )}
            aria-label={SCREEN_LABELS[id]}
            aria-current={id === screen ? "step" : undefined}
          />
        ))}
      </nav>
    </div>
  );
}

type ContactPhoneAppProps = {
  className?: string;
};

export function ContactPhoneApp({ className }: ContactPhoneAppProps) {
  return (
    <Phone orientation="landscape" screenTheme="warm" screenLayout="app" className={className}>
      <ContactAppContent />
    </Phone>
  );
}
