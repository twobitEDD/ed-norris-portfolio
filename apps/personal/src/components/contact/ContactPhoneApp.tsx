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

type ContactScreen = "home" | "message";

const SCREENS: ContactScreen[] = ["home", "message"];

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
  const props = { className: cn("h-3.5 w-3.5 shrink-0", className), strokeWidth: 1.75 };

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
  compact,
}: {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  compact?: boolean;
}) {
  const content = (
    <>
      <span
        className={cn(
          "contact-phone-app__row-icon flex shrink-0 items-center justify-center rounded-lg",
          compact ? "h-7 w-7" : "h-8 w-8",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="contact-phone-app__title block truncate text-[13px] font-medium">{label}</span>
        {detail && (
          <span className="contact-phone-app__chip-detail block truncate text-[10px]">{detail}</span>
        )}
      </span>
      {external ? (
        <ExternalLink className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      ) : (
        <ChevronRight className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      )}
    </>
  );

  const className = cn(
    "contact-phone-app__row flex w-full items-center gap-2.5 rounded-xl px-2.5 text-left",
    compact ? "min-h-[40px] py-1.5" : "min-h-[44px] py-2",
  );

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

function HomeScreen({
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
  const extraLinks = [
    ...categorized.github,
    ...categorized.social.filter((link) => !link.url.includes("linkedin.com")),
    ...categorized.projects,
  ];

  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-4">
      <div className="flex min-h-0 flex-col justify-center">
        <p className="contact-phone-app__label font-mono text-[9px] uppercase tracking-[0.2em]">Reach</p>
        <h2 className="contact-phone-app__headline mt-1.5 font-editorial text-lg font-semibold leading-tight sm:text-xl">
          Let&apos;s build something useful.
        </h2>
        <p className="contact-phone-app__body mt-2 text-[11px] leading-snug sm:text-xs">
          {profile.availability}
        </p>
        <p className="contact-phone-app__label mt-auto flex items-center gap-1.5 pt-3 font-mono text-[8px] uppercase tracking-wider sm:pt-4">
          <MapPin className="h-3 w-3" strokeWidth={1.75} />
          {profile.location}
        </p>
      </div>

      <div className="flex min-h-0 flex-col">
        <p className="contact-phone-app__label mb-1.5 font-mono text-[8px] uppercase tracking-[0.16em]">
          Get in touch
        </p>
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-0.5">
          {categorized.email && (
            <AppListRow
              icon={<Mail className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Email Edd"
              detail={categorized.email.url.replace("mailto:", "")}
              href={CONTACT_MAILTO}
              compact
            />
          )}
          <AppListRow
            icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Schedule a chat"
            detail={scheduleExternal ? "Book a time" : "On-site booking"}
            href={scheduleHref}
            external={scheduleExternal}
            compact
          />
          {categorized.social
            .filter((link) => link.url.includes("linkedin.com"))
            .map((link) => (
              <AppListRow
                key={link.url}
                icon={<UserRound className="h-3.5 w-3.5" strokeWidth={1.75} />}
                label={link.label}
                detail="Professional profile"
                href={link.url}
                external
                compact
              />
            ))}
          {extraLinks.slice(0, 3).map((link) => (
            <AppListRow
              key={link.url}
              icon={<LinkIcon link={link} />}
              label={link.label}
              href={link.url}
              external
              compact
            />
          ))}
          <AppListRow
            icon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Leave a message"
            detail="Send a note from this site"
            onClick={() => onNavigate("message")}
            compact
          />
        </div>
      </div>
    </div>
  );
}

function MessageScreen({ onBack }: { onBack: () => void }) {
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
        <button
          type="button"
          onClick={onBack}
          className="contact-phone-app__btn-secondary mt-4 min-h-[40px] rounded-xl px-4 py-2 text-sm font-semibold"
        >
          Back to contact
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col">
      <p className="contact-phone-app__label mb-2 font-mono text-[8px] uppercase tracking-[0.18em]">
        Leave a message
      </p>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2 sm:gap-x-3">
        <label className="contact-phone-app__label block text-[10px]">
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="contact-phone-app__input mt-1 w-full min-h-[38px] rounded-lg px-2.5 py-1.5 text-sm"
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
            className="contact-phone-app__input mt-1 w-full min-h-[38px] rounded-lg px-2.5 py-1.5 text-sm"
            autoComplete="email"
          />
        </label>
        <label className="contact-phone-app__label col-span-1 block text-[10px] sm:col-span-2">
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            minLength={10}
            className="contact-phone-app__input mt-1 w-full resize-none rounded-lg px-2.5 py-1.5 text-sm"
            placeholder="Project, role, collaboration…"
          />
        </label>
        {errorMessage && (
          <p
            className="col-span-1 rounded-lg border border-red-300/50 bg-red-50 px-2.5 py-2 text-[11px] text-red-900 sm:col-span-2"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="contact-phone-app__btn-primary mt-2 min-h-[42px] shrink-0 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
      >
        {submitState === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
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
      <header className="contact-phone-app__header-divider mb-2 flex shrink-0 items-center gap-2 border-b pb-2">
        {screen !== "home" ? (
          <button
            type="button"
            onClick={() => goTo("home")}
            className="contact-phone-app__header-btn flex h-8 w-8 items-center justify-center rounded-lg"
            aria-label="Back to contact home"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        ) : (
          <span className="h-8 w-8" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p className="contact-phone-app__header-name truncate font-mono text-[8px] uppercase tracking-[0.2em]">
            {profile.name}
          </p>
          <p className="contact-phone-app__header-screen truncate text-xs font-semibold">
            {screen === "home" ? "Contact" : "Message"}
          </p>
        </div>
        {!scheduleExternal && screen === "home" ? (
          <Link
            href={scheduleHref}
            className="contact-phone-app__header-btn shrink-0 rounded-lg px-2 py-1 font-mono text-[8px] uppercase tracking-wider"
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
            {screen === "home" && (
              <HomeScreen
                onNavigate={goTo}
                categorized={categorized}
                scheduleHref={scheduleHref}
                scheduleExternal={scheduleExternal}
              />
            )}
            {screen === "message" && <MessageScreen onBack={() => goTo("home")} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="mt-2 flex shrink-0 items-center justify-center gap-2" aria-label="Contact screens">
        {SCREENS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            className={cn(
              "contact-phone-app__dot h-1.5 rounded-full transition-all",
              id === screen ? "contact-phone-app__dot--active w-5" : "w-1.5",
            )}
            aria-label={id === "home" ? "Contact home" : "Message form"}
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
    <Phone
      orientation="landscape"
      screenTheme="warm"
      screenLayout="app"
      className={cn("contact-phone-device", className)}
    >
      <ContactAppContent />
    </Phone>
  );
}
