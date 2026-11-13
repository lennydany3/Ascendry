"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

export const CONSENT_KEY = "ascendry-cookie-consent";
const OPEN_EVENT = "ascendry:cookie-settings";
export type Consent = "accepted" | "rejected";

/** Read the saved choice (null until the visitor decides). */
export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie banner. Essential cookies always work; anything optional (analytics)
 * must check `readConsent() === "accepted"` before loading. A
 * "ascendry:cookie-consent" event fires whenever the choice changes.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Wait for the intro loaders to finish before asking.
    const t = window.setTimeout(() => {
      if (readConsent() === null) setOpen(true);
    }, 3600);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage blocked: the choice just won't persist */
    }
    window.dispatchEvent(new CustomEvent("ascendry:cookie-consent", { detail: value }));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          aria-describedby="cookie-desc"
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-xl border border-line-strong bg-[#0d0d0d]/95 p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.04] text-fg">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.5A9 9 0 1 1 11.5 3a3.5 3.5 0 0 0 4 4 3 3 0 0 0 5.5 5.5Z" />
                  <path d="M8.5 10.5h.01M12 15h.01M15.5 12.5h.01M8 15.5h.01" />
                </svg>
              </span>
              <div>
                <p className="text-[15px] font-medium text-fg">We use cookies</p>
                <p
                  id="cookie-desc"
                  className="mt-1.5 text-[13.5px] leading-[1.6] text-fg-muted"
                >
                  Essential cookies keep this site working. Optional analytics
                  cookies help us see what&apos;s useful.{" "}
                  <Link
                    href="/legal/privacy-policy#cookies"
                    className="text-fg underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-fg"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="h-10 cursor-pointer rounded-md border border-line-strong bg-transparent text-sm font-medium text-fg transition-colors hover:bg-white/[0.06]"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="h-10 cursor-pointer rounded-md border-0 bg-fg text-sm font-medium text-bg transition-colors hover:bg-[#e5e5e5]"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Footer link that re-opens the banner so visitors can change their mind. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`cursor-pointer border-0 bg-transparent p-0 text-left ${className}`}
    >
      Cookie settings
    </button>
  );
}
