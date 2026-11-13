"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { ChromeA, ChromeDefs, LAND_AT } from "./ChromeA";
import { SplitPanels } from "./splitPanels";
import type { PieceKey } from "./geometry";

/** sessionStorage keys (the Labs toggle writes TOGGLE_KEY, see Header). */
export const STUDIO_SEEN_KEY = "ascendry-intro-seen";
export const TOGGLE_KEY = "ascendry-toggle-to";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NICHES = [
  "CAFES",
  "GYMS",
  "SALONS",
  "BAKERIES",
  "RESTAURANTS",
  "STAYS",
  "FASHION",
  "COACHING",
  "GAMING CAFES",
];
const FINAL_WORDS = "WEBSITES THAT WORK";
const TOTAL_MS = 2600;

type Phase = "line" | "assemble" | "lock" | "hold" | "split";
type Mode = "pending" | "full" | "fade" | "off";

const mono = "font-mono text-[10px] tracking-[0.18em] uppercase";

/** Counter 000 → 100 across the loader's lifetime (tabular-nums). */
function Counter({ settled }: { settled: boolean }) {
  const [n, setN] = useState(settled ? 100 : 0);
  useEffect(() => {
    if (settled) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const v = Math.min(100, Math.floor(((performance.now() - t0) / TOTAL_MS) * 100));
      setN(v);
      if (v < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [settled]);
  return (
    <span className={`${mono} text-fg-muted tabular-nums`}>
      {String(n).padStart(3, "0")}
    </span>
  );
}

/** Flickers through niches at 40ms each, then settles on the tagline. */
function WordReel({ phase, settled }: { phase: Phase; settled: boolean }) {
  const [text, setText] = useState(settled ? FINAL_WORDS : "");
  useEffect(() => {
    if (settled) return;
    if (phase !== "lock") return;
    let i = 0;
    const id = window.setInterval(() => {
      if (i < NICHES.length) setText(NICHES[i++]);
      else {
        setText(FINAL_WORDS);
        window.clearInterval(id);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, [phase, settled]);
  const shown =
    settled || phase === "hold" || phase === "split" ? FINAL_WORDS : text;
  return (
    <div
      aria-hidden="true"
      className="absolute top-full left-1/2 mt-6 -translate-x-1/2 text-center font-mono text-[11px] leading-none tracking-[0.3em] whitespace-nowrap text-fg-muted uppercase md:mt-8"
    >
      {shown || " "}
    </div>
  );
}

type SceneProps = {
  settled?: boolean;
  phase: Phase;
  flash?: Partial<Record<PieceKey, boolean>>;
};

/** Everything inside the loader. `settled` renders the final frame (no motion). */
function Scene({ settled = false, phase, flash }: SceneProps) {
  const past = (p: Phase) =>
    ["line", "assemble", "lock", "hold", "split"].indexOf(phase) >=
    ["line", "assemble", "lock", "hold", "split"].indexOf(p);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
      <ChromeDefs />

      {/* Opening hairline + label */}
      {!settled ? (
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "line" ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.p
            className={`${mono} -translate-y-4 text-center whitespace-nowrap text-fg-muted`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            ASCENDRY — STUDIO
          </motion.p>
          <motion.div
            className="h-px w-[320px] bg-white/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      ) : null}

      <div className="relative">
        {/* Breathing glow behind the A */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[70%] bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_55%)]"
          initial={false}
          animate={{
            opacity: settled ? 0.35 : phase === "hold" ? [0, 1, 0.35] : past("split") ? 0.35 : 0,
          }}
          transition={{ duration: phase === "hold" ? 0.3 : 0 }}
        />
        <ChromeA
          settled={settled}
          flash={flash}
          sheen={phase === "lock"}
          reflect={past("lock")}
        />
        <WordReel phase={phase} settled={settled} />
      </div>

      <span
        aria-hidden="true"
        className={`${mono} absolute bottom-6 left-6 text-fg-subtle md:bottom-8 md:left-8`}
      >
        CHENNAI → WORLDWIDE
      </span>
      <span
        aria-hidden="true"
        className="absolute right-6 bottom-6 md:right-8 md:bottom-8"
      >
        <Counter settled={settled} />
      </span>
    </div>
  );
}

/** Plays the full Studio intro (~2.6s). */
function StudioIntro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const shake = useAnimationControls();
  const [phase, setPhase] = useState<Phase>("line");
  const [flash, setFlash] = useState<Partial<Record<PieceKey, boolean>>>({});
  const [fading, setFading] = useState(false);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useIsoLayoutEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  // Lock scroll while active.
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
      delete el.dataset.introReveal;
    };
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    let cancelled = false;

    if (reduced) {
      // Static A + counter for 0.6s, then a 300ms fade.
      at(600, () => setFading(true));
      at(900, () => doneRef.current());
      return () => timers.forEach(clearTimeout);
    }

    // Wait for fonts + window load, but never longer than 4s overall.
    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const ready = Promise.race([
      Promise.all([document.fonts?.ready, loaded]),
      new Promise((res) => window.setTimeout(res, 4000)),
    ]);

    at(350, () => setPhase("assemble"));
    (Object.keys(LAND_AT) as PieceKey[]).forEach((k) =>
      at(LAND_AT[k] * 1000, () => {
        setFlash((f) => ({ ...f, [k]: true }));
        // 2px screen shake, 80ms
        shake.start({ x: [0, 2, -2, 1, 0], transition: { duration: 0.08 } });
        window.setTimeout(() => setFlash((f) => ({ ...f, [k]: false })), 60);
      }),
    );
    at(1100, () => setPhase("lock"));
    at(1500, () => setPhase("hold"));
    at(1800, () => {
      ready.then(() => {
        if (cancelled) return;
        document.documentElement.dataset.introReveal = "1";
        setPhase("split");
      });
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced, shake]);

  const s = (vp.w >= 768 ? 308 : 210) / 560;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] overflow-hidden"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="sr-only">Loading Ascendry Studio</span>
      {phase === "split" ? (
        <SplitPanels w={vp.w} h={vp.h} s={s} onDone={onDone}>
          <Scene settled phase="split" />
        </SplitPanels>
      ) : (
        <motion.div className="absolute inset-0" animate={shake}>
          <Scene settled={!!reduced} phase={phase} flash={flash} />
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Studio intro gate. Rendered once in app/layout.tsx:
 * - first visit to "/" in a session  → full intro
 * - arriving from Labs via the toggle → plain 300ms crossfade
 * - otherwise                         → nothing
 */
export function IntroLoader() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>(pathname === "/" ? "pending" : "off");
  // Decide once per pathname (React StrictMode re-runs effects in dev).
  const decided = useRef<string | null>(null);

  useIsoLayoutEffect(() => {
    if (decided.current === pathname) return;
    decided.current = pathname;
    if (pathname !== "/") {
      setMode("off");
      return;
    }
    try {
      if (sessionStorage.getItem(TOGGLE_KEY) === "studio") {
        sessionStorage.removeItem(TOGGLE_KEY);
        setMode("fade");
        return;
      }
      if (sessionStorage.getItem(STUDIO_SEEN_KEY)) {
        setMode("off");
        return;
      }
      sessionStorage.setItem(STUDIO_SEEN_KEY, "1");
    } catch {
      /* storage blocked: just play it */
    }
    setMode("full");
  }, [pathname]);

  return (
    <>
      {/* Black cover from the first paint, until we know what to play. */}
      {mode === "pending" ? (
        <div
          aria-hidden="true"
          className="intro-cover fixed inset-0 z-[100] bg-[#0a0a0a]"
        />
      ) : null}
      <AnimatePresence>
        {mode === "fade" ? (
          <motion.div
            key="fade"
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setMode("off")}
          />
        ) : null}
      </AnimatePresence>
      {mode === "full" ? <StudioIntro onDone={() => setMode("off")} /> : null}
    </>
  );
}
