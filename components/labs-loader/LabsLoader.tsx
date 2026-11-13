"use client";

import {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BlueprintA } from "./BlueprintA";
import { BuildLog } from "./BuildLog";
import { ProgressTrack } from "./ProgressTrack";
import {
  TIMELINES,
  bezier,
  clamp,
  prog,
  type LabsMode,
} from "./timeline";

const LABS_SEEN_KEY = "ascendry-labs-intro-seen";
const TOGGLE_KEY = "ascendry-toggle-to";
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const wipeEase = bezier(0.65, 0, 0.35, 1);
const GRID = 32;

const label = "font-mono text-[10px] tracking-[0.18em] uppercase";

/** 32px blueprint grid; lines draw outward from the centre (stroke-dashoffset). */
const Grid = memo(function Grid({
  w,
  h,
  gp,
}: {
  w: number;
  h: number;
  gp: number;
}) {
  const cx = Math.round(w / 2);
  const cy = Math.round(h / 2);
  const kx = Math.ceil(cx / GRID);
  const ky = Math.ceil(cy / GRID);
  const kmax = Math.max(kx, ky);
  const lines: ReactNode[] = [];
  const draw = (key: string, d: string, k: number) => {
    const lp = clamp(gp * 1.8 - (Math.abs(k) / kmax) * 0.8);
    lines.push(
      <path
        key={key}
        d={d}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - lp}
      />,
    );
  };
  for (let k = -kx; k <= kx; k++) {
    const x = cx + k * GRID;
    draw(`vu${k}`, `M${x} ${cy}V0`, k);
    draw(`vd${k}`, `M${x} ${cy}V${h}`, k);
  }
  for (let k = -ky; k <= ky; k++) {
    const y = cy + k * GRID;
    draw(`hl${k}`, `M${cx} ${y}H0`, k);
    draw(`hr${k}`, `M${cx} ${y}H${w}`, k);
  }
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_75%)]"
      fill="none"
      stroke="rgba(255,255,255,0.05)"
      strokeWidth="1"
      shapeRendering="crispEdges"
    >
      {lines}
    </svg>
  );
});

/** One run of the loader. Everything on screen is a function of the clock `t`. */
function LabsRun({ mode, onDone }: { mode: LabsMode; onDone: () => void }) {
  const tl = TIMELINES[mode];
  const reduced = useReducedMotion();
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  const [t, setT] = useState(0);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });
  const finalT = tl.s3[1] + 600;

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
      delete el.dataset.labsReveal;
    };
  }, []);

  // Reduced motion: finished chrome A for 0.6s, then a 300ms fade.
  useEffect(() => {
    if (!reduced) return;
    const a = window.setTimeout(() => setFading(true), 600);
    const b = window.setTimeout(() => doneRef.current(), 900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);

  // The clock. In full mode it holds before the exit until fonts + load are
  // ready (never longer than 4s of wall time).
  useEffect(() => {
    if (reduced) return;
    let ready = mode === "toggle";
    if (!ready) {
      const loaded = new Promise<void>((res) => {
        if (document.readyState === "complete") res();
        else window.addEventListener("load", () => res(), { once: true });
      });
      Promise.all([document.fonts?.ready, loaded]).then(() => (ready = true));
    }
    const start = performance.now();
    let last = start;
    let clock = 0;
    let raf = 0;
    let revealed = false;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const holding = clock >= tl.labelsOut[0] && !ready && now - start < 4000;
      if (!holding) clock += dt;
      if (!revealed && clock >= tl.exit[0]) {
        revealed = true;
        document.documentElement.dataset.labsReveal = "1";
      }
      setT(clock);
      if (clock >= tl.exit[1]) {
        doneRef.current();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, mode, tl]);

  const time = reduced ? finalT : t;
  const ui = 1 - prog(time, tl.labelsOut);
  const gp = reduced ? 1 : prog(time, tl.grid);
  const sweep = reduced ? 0 : wipeEase(prog(time, tl.exit));
  const wipeY = sweep * vp.h;
  const sweeping = sweep > 0 && sweep < 1;
  const timer = Math.min(time, tl.s3[1]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] overflow-hidden"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      // Above the sweep line the loader is clipped away, revealing the page.
      style={{ clipPath: sweeping ? `inset(${wipeY}px 0 0 0)` : undefined }}
    >
      <span className="sr-only">Loading Ascendry Labs</span>
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <Grid w={vp.w} h={vp.h} gp={gp} />

      {/* Centre: the A + progress track */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 pb-6">
        <BlueprintA t={time} tl={tl} />
        <div style={{ opacity: ui }}>
          <ProgressTrack t={time} tl={tl} />
        </div>
      </div>

      {/* Corner UI */}
      <div style={{ opacity: ui }} aria-hidden="true">
        <span className={`${label} absolute top-6 left-6 text-white/35 md:top-8 md:left-8`}>
          ASCENDRY LABS
        </span>
        <span className={`${label} absolute top-6 right-6 text-white/35 md:top-8 md:right-8`}>
          FIG. 00 — BUILD
        </span>
        <span
          className={`${label} absolute right-6 bottom-6 text-white/35 tabular-nums md:right-8 md:bottom-8`}
        >
          T+{(timer / 1000).toFixed(3)}s
        </span>
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
          <BuildLog t={time} tl={tl} onlyLast={!!reduced} />
        </div>
      </div>

      {/* Exit: bright scanline + 6px band of shifted grid rows behind it */}
      {sweeping ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 h-px bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.45)]"
            style={{ top: wipeY }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 h-[6px] [background-image:linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-position:0_0,2px_3px] [background-size:32px_3px,32px_3px] [background-repeat:repeat-x,repeat-x]"
            style={{ top: wipeY + 1 }}
          />
        </>
      ) : null}
    </motion.div>
  );
}

/**
 * Labs intro gate (mounted in app/labs/layout.tsx).
 * - arriving via the STUDIO → LABS toggle → compressed 1.6s run
 * - first visit to /labs in a session      → full run
 * - otherwise                              → nothing
 */
export function LabsLoader({ mode: forced }: { mode?: LabsMode }) {
  const [state, setState] = useState<{ kind: "pending" | "off" | "run"; mode: LabsMode }>({
    kind: "pending",
    mode: forced ?? "full",
  });
  const decided = useRef(false);

  useIsoLayoutEffect(() => {
    if (decided.current) return; // StrictMode runs effects twice in dev
    decided.current = true;
    let mode: LabsMode | null = forced ?? null;
    try {
      const toggled = sessionStorage.getItem(TOGGLE_KEY) === "labs";
      if (toggled) sessionStorage.removeItem(TOGGLE_KEY);
      if (toggled) mode = "toggle";
      else if (!mode && !sessionStorage.getItem(LABS_SEEN_KEY)) mode = "full";
      sessionStorage.setItem(LABS_SEEN_KEY, "1");
    } catch {
      mode = mode ?? "full";
    }
    setState(mode ? { kind: "run", mode } : { kind: "off", mode: "full" });
  }, [forced]);

  return (
    <>
      {state.kind === "pending" ? (
        <div
          aria-hidden="true"
          className="labs-cover fixed inset-0 z-[100] bg-[#0a0a0a]"
        />
      ) : null}
      <AnimatePresence>
        {state.kind === "run" ? (
          <LabsRun
            key="run"
            mode={state.mode}
            onDone={() => setState({ kind: "off", mode: state.mode })}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
