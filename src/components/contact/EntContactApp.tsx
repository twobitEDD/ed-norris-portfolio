"use client";

import { useState } from "react";
import { ArrowRight, Copy, Mail, MessageSquare, Check } from "lucide-react";
import { CONTACT_MAILTO, CONTACT_EMAIL } from "@/lib/contact/message-email";
import { cn } from "@/lib/cn";

type Screen = "home" | "message";
type SubmitState = "idle" | "submitting" | "success" | "error";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ent-contact-row flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-technology/15 text-technology">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium text-white">{copied ? "Copied!" : "Copy email"}</span>
        <span className="block truncate text-[10px] text-white/50">{CONTACT_EMAIL}</span>
      </span>
    </button>
  );
}

function MessageForm({ onBack, compact }: { onBack?: () => void; compact?: boolean }) {
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
      const data = (await res.json()) as { error?: string };

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
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-ink">Message sent</p>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks — we&apos;ll reply to <span className="font-medium text-ink">{email}</span> soon.
        </p>
        {onBack && (
          <button type="button" onClick={onBack} className="ent-contact-btn-secondary mt-4 rounded-xl px-4 py-2 text-sm font-semibold">
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", compact ? "" : "h-full min-h-0")}>
      <label className="ent-contact-label block text-[10px]">
        Your name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ent-contact-input mt-1 w-full rounded-lg px-2.5 py-2 text-[13px]"
          autoComplete="name"
        />
      </label>
      <label className="ent-contact-label block text-[10px]">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ent-contact-input mt-1 w-full rounded-lg px-2.5 py-2 text-[13px]"
          autoComplete="email"
        />
      </label>
      <label className="ent-contact-label block text-[10px]">
        Message
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={compact ? 3 : 4}
          minLength={10}
          className="ent-contact-input mt-1 w-full resize-none rounded-lg px-2.5 py-2 text-[13px]"
          placeholder="Project, advisory need, collaboration…"
        />
      </label>
      {errorMessage && (
        <p className="rounded-lg border border-red-300/40 bg-red-50 px-2 py-1.5 text-[11px] text-red-900" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="flex gap-2">
        {onBack && (
          <button type="button" onClick={onBack} className="ent-contact-btn-secondary rounded-xl px-4 py-2 text-sm font-semibold">
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="ent-contact-btn-primary ml-auto inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {submitState === "submitting" ? "Sending…" : "Send"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}

export function EntContactApp({ compact }: { compact?: boolean }) {
  const [screen, setScreen] = useState<Screen>("home");

  if (compact) {
    return (
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">Get in touch</p>
        <a
          href={CONTACT_MAILTO}
          className="mt-3 flex items-center gap-2 font-display text-lg font-semibold text-ink hover:text-technology"
        >
          <Mail className="h-4 w-4 text-technology" />
          {CONTACT_EMAIL}
        </a>
        <div className="mt-6">
          <MessageForm compact />
        </div>
      </div>
    );
  }

  return (
    <div className="ent-contact-app flex h-full min-h-0 flex-col px-1">
      <header className="mb-3 shrink-0 border-b border-white/10 pb-2.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">2bitENT</p>
        <p className="font-display text-sm font-semibold text-white">
          {screen === "home" ? "Contact" : "Leave a message"}
        </p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {screen === "home" ? (
          <div className="space-y-1.5">
            <p className="mb-3 text-[11px] leading-relaxed text-white/60">
              Environmental advisory, software, branding, or production — reach out and we&apos;ll respond quickly.
            </p>
            <a href={CONTACT_MAILTO} className="ent-contact-row flex items-center gap-2.5 rounded-xl px-2.5 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-technology/15 text-technology">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-white">Email us</span>
                <span className="block truncate text-[10px] text-technology">{CONTACT_EMAIL}</span>
              </span>
            </a>
            <CopyEmailButton />
            <button
              type="button"
              onClick={() => setScreen("message")}
              className="ent-contact-row flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-technology/15 text-technology">
                <MessageSquare className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-white">Leave a message</span>
                <span className="block text-[10px] text-white/50">Send a note from this site</span>
              </span>
            </button>
          </div>
        ) : (
          <MessageForm onBack={() => setScreen("home")} />
        )}
      </div>
    </div>
  );
}
