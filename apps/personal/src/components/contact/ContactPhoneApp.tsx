"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  UserRound,
  Users,
} from "lucide-react";
import { profile } from "@/data";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
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
type ContactLayout = "phone" | "tablet" | "phone-landscape";

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
  layout,
  truncate = true,
  nested,
  folderOpen,
}: {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  compact?: boolean;
  layout?: ContactLayout;
  truncate?: boolean;
  nested?: boolean;
  folderOpen?: boolean;
}) {
  const isTablet = layout === "tablet";
  const isLandscape = layout === "phone-landscape";
  const content = (
    <>
      <span
        className={cn(
          "contact-phone-app__row-icon flex shrink-0 items-center justify-center rounded-lg",
          isLandscape ? "h-6 w-6" : isTablet ? "h-9 w-9" : compact ? "h-7 w-7" : "h-8 w-8",
          nested && isLandscape && "h-5 w-5",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "contact-phone-app__title block font-medium",
            truncate && "truncate",
            isLandscape ? "text-[11px] leading-snug" : isTablet ? "text-sm" : "text-[13px]",
            nested && isLandscape && "text-[10px]",
          )}
        >
          {label}
        </span>
        {detail && (
          <span
            className={cn(
              "contact-phone-app__chip-detail block",
              truncate && "truncate",
              isLandscape ? "text-[9px] leading-snug" : isTablet ? "text-[11px]" : "text-[10px]",
              nested && isLandscape && "text-[8px]",
            )}
          >
            {detail}
          </span>
        )}
      </span>
      {external ? (
        <ExternalLink className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      ) : folderOpen !== undefined ? (
        folderOpen ? (
          <ChevronDown className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        ) : (
          <ChevronRight className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        )
      ) : (
        <ChevronRight className="contact-phone-app__row-chevron h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      )}
    </>
  );

  const className = cn(
    "contact-phone-app__row flex w-full items-center gap-2.5 rounded-xl px-2.5 text-left",
    nested && "contact-phone-app__row--nested",
    isLandscape
      ? "min-h-[34px] gap-2 py-1"
      : isTablet
        ? "min-h-[48px] gap-3 px-3 py-2.5"
        : compact
          ? "min-h-[40px] py-1.5"
          : "min-h-[44px] py-2",
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

function ContactLinkFolder({
  icon,
  label,
  detail,
  links,
  layout,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  label: string;
  detail?: string;
  links: ProfileLink[];
  layout: ContactLayout;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isLandscape = layout === "phone-landscape";

  if (links.length === 0) return null;

  if (links.length === 1) {
    const link = links[0];
    return (
      <AppListRow
        icon={icon}
        label={link.label}
        detail={detail}
        href={link.url}
        external
        layout={layout}
        truncate={!isLandscape}
      />
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <AppListRow
        icon={icon}
        label={label}
        detail={detail ?? `${links.length} links`}
        onClick={() => setOpen((prev) => !prev)}
        layout={layout}
        truncate={!isLandscape}
        folderOpen={open}
      />
      {open && (
        <div className={cn(isLandscape && "contact-phone-app__folder-children")}>
          {links.map((link) => (
            <AppListRow
              key={link.url}
              icon={<LinkIcon link={link} className={isLandscape ? "h-3 w-3" : undefined} />}
              label={link.label}
              detail={link.url.replace(/^https?:\/\/(www\.)?/, "")}
              href={link.url}
              external
              layout={layout}
              truncate={!isLandscape}
              nested={isLandscape}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HomeScreen({
  onNavigate,
  categorized,
  scheduleHref,
  scheduleExternal,
  layout,
}: {
  onNavigate: (screen: ContactScreen) => void;
  categorized: ReturnType<typeof categorizeContactLinks>;
  scheduleHref: string;
  scheduleExternal: boolean;
  layout: ContactLayout;
}) {
  const isTablet = layout === "tablet";
  const isLandscape = layout === "phone-landscape";
  const socialLinks = categorized.social;
  const githubLinks = categorized.github;
  const projectLinks = categorized.projects;

  return (
    <div
      className={cn(
        "grid h-full min-h-0",
        isLandscape
          ? "contact-phone-app__home-grid grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] gap-3"
          : isTablet
            ? "grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5 sm:gap-6"
            : "grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-5",
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-col",
          isLandscape ? "contact-phone-app__reach-col justify-start gap-0 pr-0.5" : "justify-center gap-0.5",
        )}
      >
        {!isLandscape && (
          <p
            className={cn(
              "contact-phone-app__label font-mono uppercase tracking-[0.2em]",
              isTablet ? "text-[10px]" : "text-[9px]",
            )}
          >
            Contact Me
          </p>
        )}
        <h2
          className={cn(
            "contact-phone-app__headline font-editorial font-semibold",
            isLandscape
              ? "text-[13px] leading-[1.2]"
              : isTablet
                ? "mt-3 text-2xl sm:text-[1.65rem]"
                : "mt-2 text-lg sm:mt-2.5 sm:text-xl",
          )}
        >
          Let&apos;s build something useful.
        </h2>
        <p
          className={cn(
            "contact-phone-app__body",
            isLandscape
              ? "mt-0.5 text-[8px] leading-[1.35]"
              : isTablet
                ? "mt-3 text-sm leading-relaxed"
                : "mt-2.5 text-[11px] leading-relaxed sm:mt-3 sm:text-xs",
          )}
        >
          {profile.availability}
        </p>
        {!isLandscape && (
          <p
            className={cn(
              "contact-phone-app__label flex items-start gap-1.5 font-mono uppercase tracking-wider",
              isTablet
                ? "mt-auto gap-2 pt-5 text-[9px]"
                : "mt-auto pt-4 text-[8px] sm:pt-5",
            )}
          >
            <MapPin
              className={cn("shrink-0", isTablet ? "h-3.5 w-3.5" : "h-3 w-3")}
              strokeWidth={1.75}
            />
            <span>{profile.location}</span>
          </p>
        )}
      </div>

      <div className={cn("flex min-h-0 flex-col", isLandscape && "contact-phone-app__touch-col")}>
        <p
          className={cn(
            "contact-phone-app__label shrink-0 font-mono uppercase tracking-[0.16em]",
            isLandscape ? "mb-1 text-[7px]" : isTablet ? "mb-2 text-[9px]" : "mb-1.5 text-[8px]",
          )}
        >
          Get in touch
        </p>
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col pr-0.5",
            isLandscape ? "contact-phone-app__contact-list gap-1" : "gap-1.5 overflow-y-auto",
            isTablet && !isLandscape && "gap-2",
          )}
        >
          {categorized.email && (
            <AppListRow
              icon={<Mail className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Email Edd"
              detail={categorized.email.url.replace("mailto:", "")}
              href={CONTACT_MAILTO}
              compact={!isTablet && !isLandscape}
              layout={layout}
              truncate={!isLandscape}
            />
          )}
          <AppListRow
            icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Schedule a chat"
            detail={scheduleExternal ? "Book a time online" : "On-site booking"}
            href={scheduleHref}
            external={scheduleExternal}
            compact={!isTablet && !isLandscape}
            layout={layout}
            truncate={!isLandscape}
          />
          {githubLinks.length > 0 && (
            <ContactLinkFolder
              icon={<GitBranch className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="GitHub"
              detail={`${githubLinks.length} repositories`}
              links={githubLinks}
              layout={layout}
            />
          )}
          {socialLinks.length > 0 && (
            <ContactLinkFolder
              icon={<Users className="h-3.5 w-3.5" strokeWidth={1.75} />}
              label="Social"
              detail={`${socialLinks.length} profiles`}
              links={socialLinks}
              layout={layout}
            />
          )}
          {projectLinks.map((link) => (
            <AppListRow
              key={link.url}
              icon={<LinkIcon link={link} />}
              label={link.label}
              detail={link.url.replace(/^https?:\/\/(www\.)?/, "")}
              href={link.url}
              external
              compact={!isTablet && !isLandscape}
              layout={layout}
              truncate={!isLandscape}
            />
          ))}
          <AppListRow
            icon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />}
            label="Leave a message"
            detail="Send a note from this site"
            onClick={() => onNavigate("message")}
            compact={!isTablet && !isLandscape}
            layout={layout}
            truncate={!isLandscape}
          />
        </div>
      </div>
    </div>
  );
}

function MessageScreen({ onBack, layout }: { onBack: () => void; layout: ContactLayout }) {
  const isTablet = layout === "tablet";
  const isLandscape = layout === "phone-landscape";
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
        <div
          className={cn(
            "mb-3 flex items-center justify-center rounded-full bg-environment/20 text-environment",
            isTablet ? "h-12 w-12" : "h-10 w-10",
          )}
        >
          <Send className={cn(isTablet ? "h-5 w-5" : "h-4 w-4")} strokeWidth={1.75} />
        </div>
        <p
          className={cn(
            "contact-phone-app__headline font-editorial font-semibold",
            isTablet ? "text-xl" : "text-lg",
          )}
        >
          Message sent
        </p>
        <p className={cn("contact-phone-app__body mt-2 leading-relaxed", isTablet ? "text-sm" : "text-xs")}>
          Thanks — Edd will reply to <span className="contact-phone-app__title font-medium">{email}</span> soon.
        </p>
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "contact-phone-app__btn-secondary mt-4 rounded-xl px-4 py-2 font-semibold",
            isTablet ? "min-h-[44px] text-sm" : "min-h-[40px] text-sm",
          )}
        >
          Back to contact
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col overflow-hidden">
      <p
        className={cn(
          "contact-phone-app__label mb-1 shrink-0 font-mono uppercase tracking-[0.18em]",
          isTablet ? "mb-2 text-[9px]" : "text-[8px]",
        )}
      >
        Leave a message
      </p>
      <div
        className={cn(
          "grid min-h-0 flex-1 overflow-hidden",
          isTablet
            ? "grid-cols-2 grid-rows-[auto_auto_minmax(0,1fr)] gap-x-3 gap-y-2"
            : "grid-cols-2 grid-rows-[auto_auto_minmax(0,1fr)] gap-x-2 gap-y-1",
        )}
      >
        <label className={cn("contact-phone-app__label block", isTablet ? "text-[11px]" : "text-[10px]")}>
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn(
              "contact-phone-app__input mt-0.5 w-full rounded-lg px-2 py-1",
              isTablet ? "min-h-[36px] text-sm" : "min-h-[32px] text-[13px]",
            )}
            autoComplete="name"
          />
        </label>
        <label className={cn("contact-phone-app__label block", isTablet ? "text-[11px]" : "text-[10px]")}>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "contact-phone-app__input mt-0.5 w-full rounded-lg px-2 py-1",
              isTablet ? "min-h-[36px] text-sm" : "min-h-[32px] text-[13px]",
            )}
            autoComplete="email"
          />
        </label>
        <label
          className={cn(
            "contact-phone-app__label col-span-2 flex min-h-0 flex-col",
            isTablet ? "text-[11px]" : "text-[10px]",
          )}
        >
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={isTablet ? 4 : 2}
            minLength={10}
            className={cn(
              "contact-phone-app__input contact-phone-app__input--message mt-0.5 min-h-0 flex-1 resize-none rounded-lg px-2 py-1",
              isTablet ? "text-sm" : "text-[13px]",
              isTablet && "contact-phone-app__input--message-tablet",
            )}
            placeholder="Project, role, collaboration…"
          />
        </label>
        {errorMessage && (
          <p
            className={cn(
              "col-span-2 rounded-lg border border-red-300/50 bg-red-50 px-2 py-1 leading-snug text-red-900",
              isTablet ? "text-xs" : "text-[10px]",
            )}
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
      <div className="mt-2 flex shrink-0 justify-end">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="contact-phone-app__btn-primary contact-phone-app__btn-send disabled:opacity-60"
        >
          <ArrowRight className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden />
          {submitState === "submitting" ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

export type ContactAppContentProps = {
  layout?: ContactLayout;
  /** When set, home screen shows back control to exit embedded device view. */
  onExit?: () => void;
};

export function ContactAppContent({ layout = "tablet", onExit }: ContactAppContentProps) {
  const [[screen, direction], setScreen] = useState<[ContactScreen, number]>(["home", 0]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const categorized = useMemo(() => categorizeContactLinks(profile.links), []);
  const scheduleHref = getSchedulingHref();
  const scheduleExternal = isExternalScheduling();
  const isTablet = layout === "tablet";
  const isLandscape = layout === "phone-landscape";

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

  const handleHomeBack = () => {
    if (onExit) onExit();
    else goTo("home");
  };

  return (
    <div
      className={cn(
        "contact-phone-app flex h-full min-h-0 flex-col",
        isTablet && "contact-phone-app--tablet",
        isLandscape && "contact-phone-app--landscape",
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header
        className={cn(
          "contact-phone-app__header-divider flex shrink-0 items-center gap-2 border-b",
          isLandscape ? "mb-1.5 gap-2 pb-1.5" : isTablet ? "mb-3 gap-2.5 pb-3" : "mb-2.5 pb-2.5",
        )}
      >
        {screen !== "home" || onExit ? (
          <button
            type="button"
            onClick={screen === "home" ? handleHomeBack : () => goTo("home")}
            className={cn(
              "contact-phone-app__header-btn flex items-center justify-center rounded-lg",
              isLandscape ? "h-7 w-7" : isTablet ? "h-9 w-9" : "h-8 w-8",
            )}
            aria-label={screen === "home" ? "Back to home screen" : "Back to contact home"}
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        ) : (
          <span className={cn(isLandscape ? "h-7 w-7" : isTablet ? "h-9 w-9" : "h-8 w-8")} aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "contact-phone-app__header-name truncate font-mono uppercase tracking-[0.2em]",
              isLandscape ? "text-[7px]" : isTablet ? "text-[9px]" : "text-[8px]",
            )}
          >
            {profile.name}
          </p>
          <p
            className={cn(
              "contact-phone-app__header-screen truncate font-semibold",
              isLandscape ? "text-[11px]" : isTablet ? "text-sm" : "text-xs",
            )}
          >
            {screen === "home" ? "Contact" : "Message"}
          </p>
          {isLandscape && screen === "home" && (
            <p
              className={cn(
                "contact-phone-app__header-location contact-phone-app__label mt-0.5 flex items-center gap-1 font-mono uppercase tracking-wider",
                "text-[6px] leading-none",
              )}
            >
              <MapPin className="h-2 w-2 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="truncate">{profile.location}</span>
            </p>
          )}
        </div>
        {!scheduleExternal && screen === "home" ? (
          <Link
            href={scheduleHref}
            className={cn(
              "contact-phone-app__header-btn shrink-0 rounded-lg px-2 py-1 font-mono uppercase tracking-wider",
              isLandscape ? "text-[7px]" : isTablet ? "text-[9px]" : "text-[8px]",
            )}
          >
            Book
          </Link>
        ) : (
          <span className={cn("shrink-0", isLandscape ? "w-7" : isTablet ? "w-9" : "w-8")} aria-hidden />
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
            className={cn(
              "absolute inset-0 min-h-0",
              isLandscape && "contact-phone-app__screen-body",
            )}
          >
            {screen === "home" && (
              <HomeScreen
                onNavigate={goTo}
                categorized={categorized}
                scheduleHref={scheduleHref}
                scheduleExternal={scheduleExternal}
                layout={layout}
              />
            )}
            {screen === "message" && <MessageScreen onBack={() => goTo("home")} layout={layout} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav
        className={cn(
          "flex shrink-0 items-center justify-center gap-2",
          isLandscape ? "mt-1" : isTablet ? "mt-3" : "mt-2",
        )}
        aria-label="Contact screens"
      >
        {SCREENS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            className={cn(
              "contact-phone-app__dot rounded-full transition-all",
              isLandscape ? "h-1" : isTablet ? "h-2" : "h-1.5",
              id === screen
                ? isLandscape
                  ? "contact-phone-app__dot--active w-3.5"
                  : "contact-phone-app__dot--active w-5"
                : isLandscape
                  ? "w-1"
                  : isTablet
                    ? "w-2"
                    : "w-1.5",
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
    <DeviceViewer
      device="phone"
      size="md"
      orientation="landscape"
      glow="amber"
      mode="card"
      screenTheme="warm"
      screenLayout="app"
      className={cn("contact-phone-device w-full", className)}
    >
      <ContactAppContent layout="phone-landscape" />
    </DeviceViewer>
  );
}
