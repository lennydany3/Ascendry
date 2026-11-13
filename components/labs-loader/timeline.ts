/** Timing for the Labs loader. All values are milliseconds on one clock. */

export type LabsMode = "full" | "toggle";
type Range = [number, number];

export type Timeline = {
  grid: Range;
  s1: Range; // IDEA — wireframe
  s2: Range; // PROTOTYPE — glass
  s3: Range; // LAUNCH — chrome
  labelsOut: Range;
  exit: Range; // full-screen scanline wipe
  /** ms per typed character in the build log */
  char: number;
  log: { at: number; text: string }[];
};

export const TIMELINES: Record<LabsMode, Timeline> = {
  full: {
    grid: [0, 400],
    s1: [400, 1200],
    s2: [1200, 1900],
    s3: [1900, 2400],
    labelsOut: [2400, 2480],
    exit: [2520, 2950],
    char: 12,
    log: [
      { at: 420, text: "> init ascendry-labs" },
      { at: 700, text: "> sketching geometry … ok" },
      { at: 1220, text: "> prototyping … ok" },
      { at: 1920, text: "> shipping … ok" },
      { at: 2150, text: "> launched ✓" },
    ],
  },
  // Studio → Labs toggle: no grid intro, stages compressed to ~0.4s each.
  toggle: {
    grid: [0, 0],
    s1: [0, 400],
    s2: [400, 800],
    s3: [800, 1200],
    labelsOut: [1200, 1260],
    exit: [1300, 1650],
    char: 6,
    log: [
      { at: 20, text: "> init ascendry-labs" },
      { at: 170, text: "> sketching geometry … ok" },
      { at: 420, text: "> prototyping … ok" },
      { at: 820, text: "> shipping … ok" },
      { at: 980, text: "> launched ✓" },
    ],
  },
};

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** 0 → 1 progress of t inside a range. */
export const prog = (t: number, [a, b]: Range) =>
  b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a));

/** CSS-style cubic-bezier easing. */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1,
    bx = 3 * (x2 - x1) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * y1,
    by = 3 * (y2 - y1) - cy,
    ay = 1 - cy - by;
  const sx = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sy = (u: number) => ((ay * u + by) * u + cy) * u;
  const dx = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let u = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(u) - x;
      const d = dx(u);
      if (Math.abs(e) < 1e-5 || Math.abs(d) < 1e-6) break;
      u -= e / d;
    }
    return sy(clamp(u));
  };
}
