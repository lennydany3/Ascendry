/**
 * Shared geometry for the "Split Summit" A used by both intro loaders.
 * Front faces live in a 560×640 space. Depth is faked with an oblique
 * projection: every piece is extruded along the vector D.
 */

export type Pt = [number, number];
export type PieceKey = "right" | "left" | "bar";

/** Depth vector (oblique projection). */
export const D: Pt = [14, -10];

export const PIECES: Record<PieceKey, Pt[]> = {
  right: [[255, 120], [305, 120], [445, 520], [390, 520]],
  left: [[215, 200], [258, 200], [170, 520], [125, 520]],
  bar: [[205, 400], [290, 400], [300, 432], [196, 432]],
};

/** Pieces never overlap, so draw order is irrelevant; keep it stable anyway. */
export const ORDER: PieceKey[] = ["bar", "left", "right"];

/** Slope (dx/dy) of the right leg's slanted edge — used for the split line. */
export const LEG_SLOPE = 135 / 400;

const r2 = (v: number) => Math.round(v * 100) / 100;

export const pts = (P: Pt[]) => P.map(([x, y]) => `${r2(x)},${r2(y)}`).join(" ");

export const shift = (P: Pt[], d: Pt = D): Pt[] =>
  P.map(([x, y]) => [x + d[0], y + d[1]] as Pt);

const centroid = (P: Pt[]): Pt => [
  P.reduce((a, p) => a + p[0], 0) / P.length,
  P.reduce((a, p) => a + p[1], 0) / P.length,
];

export type Edge = {
  a: Pt;
  b: Pt;
  /** Unit outward normal. */
  n: Pt;
  /** Side face is visible from the viewer (normal points along D). */
  visible: boolean;
  /** Mostly-vertical normal => top face, else right-hand side face. */
  kind: "top" | "side";
};

export function edgesOf(P: Pt[]): Edge[] {
  const c = centroid(P);
  return P.map((a, i) => {
    const b = P[(i + 1) % P.length];
    let nx = b[1] - a[1];
    let ny = -(b[0] - a[0]);
    const mx = (a[0] + b[0]) / 2 - c[0];
    const my = (a[1] + b[1]) / 2 - c[1];
    if (nx * mx + ny * my < 0) {
      nx = -nx;
      ny = -ny;
    }
    const len = Math.hypot(nx, ny);
    nx /= len;
    ny /= len;
    return {
      a,
      b,
      n: [nx, ny] as Pt,
      visible: nx * D[0] + ny * D[1] > 0,
      kind: Math.abs(ny) > Math.abs(nx) ? "top" : "side",
    };
  });
}

/** Quad for the side face that extrudes edge a→b. */
export const sideQuad = (a: Pt, b: Pt): Pt[] => [
  a,
  b,
  [b[0] + D[0], b[1] + D[1]],
  [a[0] + D[0], a[1] + D[1]],
];

/** Polygon inset by k units (used for the glass inner highlight). */
export function inset(P: Pt[], k: number): Pt[] {
  const E = edgesOf(P);
  const lines = E.map(({ a, b, n }) => [
    [a[0] - n[0] * k, a[1] - n[1] * k],
    [b[0] - n[0] * k, b[1] - n[1] * k],
  ]);
  return P.map((_, i) => {
    const [p1, p2] = lines[(i + P.length - 1) % P.length];
    const [p3, p4] = lines[i];
    const den =
      (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    const t =
      ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) /
      den;
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])] as Pt;
  });
}

/** Wireframe edges split into visible (solid) and hidden (dashed) segments. */
export function wireSegments(P: Pt[]) {
  const E = edgesOf(P);
  const B = shift(P);
  const n = P.length;
  const solid: [Pt, Pt][] = [];
  const hidden: [Pt, Pt][] = [];
  for (let i = 0; i < n; i++) {
    solid.push([E[i].a, E[i].b]); // front edge
    (E[i].visible ? solid : hidden).push([B[i], B[(i + 1) % n]]); // back edge
    const prev = E[(i + n - 1) % n].visible;
    (E[i].visible || prev ? solid : hidden).push([P[i], B[i]]); // depth edge
  }
  return { solid, hidden };
}

export const segD = ([a, b]: [Pt, Pt]) =>
  `M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}`;
