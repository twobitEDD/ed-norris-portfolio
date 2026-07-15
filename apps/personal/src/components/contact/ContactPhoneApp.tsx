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
      <span className="contact-phone-app__row-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="contact-phone-app__title block truncate text-sm font-medium">{label}</span>
        {detail && (
          <span className="contact-phone-app__chip-detail block truncate text-[11px]">{detail}</span>
        )}
      </span>
      <ChevronRight className="contact-phone-app__row-chevron h-4 w-4 shrink-0" strokeWidth={1.75} />
    </>
  );

  const className =
    "contact-phone-app__row flex w-full min-h-[48px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-left";

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

function HomePreviewChip({
  icon,
  label,
  detail,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="contact-phone-app__chip flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center"
    >
      <span className="contact-phone-app__row-icon flex h-8 w-8 items-center justify-center rounded-lg">
        {icon}
      </span>
      <span className="contact-phone-app__title text-[11px] font-semibold leading-tight">{label}</span>
      <span className="contact-phone-app__chip-detail text-[9px] leading-tight">{detail}</span>
    </button>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: ContactScreen) => void }) {
  return (
    <div className="flex h-full flex-col px-0.5">
      <div className="flex flex-col items-center text-center">
        <div className="contact-phone-app__icon-badge mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm">
          <MessageSquare className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <p className="contact-phone-app__label font-mono text-[10px] uppercase tracking-[0.22em]">Reach</p>
        <p className="contact-phone-app__subtitle mt-1 text-xs leading-snug">
          Connect with {profile.name.split(" ")[0]}
        </p>
        <h2 className="contact-phone-app__headline mt-3 font-editorial text-[1.35rem] font-semibold leading-tight sm:text-2xl">
          Let&apos;s build something useful.
        </h2>
        <p className="contact-phone-app__body mt-2 max-w-[300px] text-[13px] leading-relaxed">
          {profile.availability}
        </p>
      </div>

      <div className="mt-6">
        <p className="contact-phone-app__label mb-2.5 font-mono text-[9px] uppercase tracking-[0.16em]">
          Ways to reach out
        </p>
        <div className="flex gap-2">
          <HomePreviewChip
            icon={<Mail className="h-4 w-4" strokeWidth={1.75} />}
            label="Connect"
            detail="Email & schedule"
            onClick={() => onNavigate("methods")}
          />
          <HomePreviewChip
            icon={<MessageSquare className="h-4 w-4" strokeWidth={1.75} />}
            label="Message"
            detail="Send a note"
            onClick={() => onNavigate("message")}
          />
          <HomePreviewChip
            icon={<Globe className="h-4 w-4" strokeWidth={1.75} />}
            label="Links"
            detail="Social & GitHub"
            onClick={() => onNavigate("socials")}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onNavigate("methods")}
          className="contact-phone-app__btn-primary min-h-[46px] rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          Get in touch
        </button>
        <button
          type="button"
          onClick={() => onNavigate("message")}
          className="contact-phone-app__btn-secondary min-h-[46px] rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          Leave a message
        </button>
      </div>

      <p className="contact-phone-app__label mt-auto flex items-center justify-center gap-1.5 pt-4 font-mono text-[9px] uppercase tracking-wider">
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
      <p className="contact-phone-app__label mb-3 font-mono text-[9px] uppercase tracking-[0.18em]">
        Ways to connect
      </p>
      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5">
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
        <p className="contact-phone-app__headline font-editorial text-lg font-semibold">Message sent</p>
        <p className="contact-phone-app__body mt-2 text-xs leading-relaxed">
          Thanks — Edd will reply to <span className="contact-phone-app__title font-medium">{email}</span> soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <p className="contact-phone-app__label mb-3 font-mono text-[9px] uppercase tracking-[0.18em]">
        Leave a message
      </p>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-0.5">
        <label className="contact-phone-app__label block text-[10px]">
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="contact-phone-app__input mt-1 w-full min-h-[42px] rounded-lg px-3 py-2 text-sm"
            autoComplete="name"
          />
        </label>
        <label className="contact-phone-app__label block text-[10px]">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="contact-phone-app__input mt-1 w-full min-h-[42px] rounded-lg px-3 py-2 text-sm"
            autoComplete="email"
          />
        </label>
        <label className="contact-phone-app__label block text-[10px]">
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            minLength={10}
            className="contact-phone-app__input mt-1 w-full resize-none rounded-lg px-3 py-2 text-sm"
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
        className="contact-phone-app__btn-primary mt-3 min-h-[46px] shrink-0 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
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
      <p className="contact-phone-app__label mb-2 font-mono text-[9px] uppercase tracking-[0.16em]">{title}</p>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-phone-app__row flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2"
          >
            <span className="contact-phone-app__row-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-md">
              <LinkIcon link={link} className="h-3.5 w-3.5" />
            </span>
            <span className="contact-phone-app__title min-w-0 flex-1 truncate text-sm font-medium">{link.label}</span>
            <ExternalLink className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialsScreen({ categorized }: { categorized: ReturnType<typeof categorizeContactLinks> }) {
  return (
    <div className="flex h-full flex-col">
      <p className="contact-phone-app__label mb-3 font-mono text-[9px] uppercase tracking-[0.18em]">
        Links & socials
      </p>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
        <LinkSection title="GitHub" links={categorized.github} />
        <LinkSection title="Social" links={categorized.social} />
        <LinkSection title="Projects & orgs" links={categorized.projects} />
        <p className="contact-phone-app__label flex items-center gap-1.5 pb-1 font-mono text-[9px] uppercase tracking-wider">
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
      <header className="contact-phone-app__header-divider mb-3 flex shrink-0 items-center gap-2 border-b pb-2.5">
        {screen !== "home" ? (
          <button
            type="button"
            onClick={goPrev}
            className="contact-phone-app__header-btn flex h-9 w-9 items-center justify-center rounded-lg"
            aria-label="Previous screen"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
        ) : (
          <span className="h-9 w-9" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="contact-phone-app__header-name truncate font-mono text-[9px] uppercase tracking-[0.2em]">
            {profile.name}
          </p>
          <p className="contact-phone-app__header-screen truncate text-sm font-semibold">{SCREEN_LABELS[screen]}</p>
        </div>
        {!scheduleExternal && screen === "methods" ? (
          <Link
            href={scheduleHref}
            className="contact-phone-app__header-btn shrink-0 rounded-lg px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider"
          >
            Book
          </Link>
        ) : (
          <span className="w-9 shrink-0" aria-hidden />
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

      <nav className="mt-3 shrink-0 pt-1" aria-label="Contact app screens">
        <p className="contact-phone-app__nav-hint mb-2 text-center font-mono text-[8px] uppercase tracking-[0.18em]">
          Swipe or tap to explore
        </p>
        <div className="flex items-center justify-center gap-2">
          {SCREENS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={cn(
                "contact-phone-app__dot h-2 rounded-full transition-all",
                id === screen ? "contact-phone-app__dot--active w-7" : "w-2",
              )}
              aria-label={SCREEN_LABELS[id]}
              aria-current={id === screen ? "step" : undefined}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-center gap-3">
          {SCREENS.map((id) => (
            <button
              key={`${id}-label`}
              type="button"
              onClick={() => goTo(id)}
              className={cn(
                "font-mono text-[7px] uppercase tracking-wider transition",
                id === screen ? "contact-phone-app__title font-semibold" : "contact-phone-app__nav-hint",
              )}
            >
              {SCREEN_LABELS[id]}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

type ContactPhoneAppProps = {
  className?: string;
};

export function ContactPhoneApp({ className }: ContactPhoneAppProps) {
  return (
    <Phone
      orientation="portrait"
      screenTheme="warm"
      screenLayout="app"
      className={cn("contact-phone-device", className)}
    >
      <ContactAppContent />
    </Phone>
  );
}
