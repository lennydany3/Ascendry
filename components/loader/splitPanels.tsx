"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { LEG_SLOPE } from "./geometry";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Where the split line crosses the screen. In A-space (see ChromeA's viewBox)
 * the line x = 202.5 + 0.3375·y runs parallel to the right leg, through the gap
 * between the legs: the left leg + crossbar sit on its left, the right leg on
 * its right. `s` is the px-per-unit scale of the rendered A.
 */
export function splitLine(w: number, h: number, s: number) {
  const px = w / 2 + (330.75 - 290) * s;
  const py = h / 2;
  const xt = px - py * LEG_SLOPE;
  const xb = px + (h - py) * LEG_SLOPE;
  return { xt, xb };
}

/**
 * Two full-screen black panels sharing a diagonal edge. Each panel renders the
 * (static) loader scene clipped to its half, so the A is physically cut in two
 * and each half rides away with its panel. A 1px "crack" flashes on the seam.
 */
export function SplitPanels({
  w,
  h,
  s,
  children,
  onDone,
}: {
  w: number;
  h: number;
  s: number;
  children: ReactNode;
  onDone: () => void;
}) {
  const { xt, xb } = splitLine(w, h, s);
  const left = `polygon(0px 0px, ${xt}px 0px, ${xb}px ${h}px, 0px ${h}px)`;
  const right = `polygon(${xt}px 0px, ${w}px 0px, ${w}px ${h}px, ${xb}px ${h}px)`;

  // Panels move along the seam's normal.
  const norm = Math.hypot(1, LEG_SLOPE);
  const nx = 1 / norm;
  const ny = -LEG_SLOPE / norm; // right panel: up-right
  const dist = Math.hypot(w, h) * 1.1;

  const panel = (clip: string, dir: 1 | -1, done?: boolean) => (
    <motion.div
      className="absolute inset-0 bg-[#0a0a0a] will-change-transform"
      style={{ clipPath: clip }}
      initial={{ x: 0, y: 0 }}
      animate={{ x: nx * dist * dir, y: ny * dist * dir }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      onAnimationComplete={done ? onDone : undefined}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      {panel(left, -1)}
      {panel(right, 1, true)}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.12, times: [0, 0.3, 1] }}
      >
        <line x1={xt} y1={0} x2={xb} y2={h} stroke="#fff" strokeWidth="1" />
      </motion.svg>
    </>
  );
}
