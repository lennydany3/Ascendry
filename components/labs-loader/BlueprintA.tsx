import { memo } from "react";
import {
  ORDER,
  PIECES,
  edgesOf,
  inset,
  pts,
  segD,
  shift,
  sideQuad,
  wireSegments,
  type PieceKey,
} from "@/components/loader/geometry";
import { clamp, prog, type Timeline } from "./timeline";

/** Crop of the 560×640 space with room for the dimension lines. */
const VIEWBOX = "90 70 460 500";
const TOP = 96;
const BOTTOM = 532;

// Geometry is static: compute once.
const WIRE = ORDER.map((k) => wireSegments(PIECES[k]));
const SOLID = WIRE.flatMap((w) => w.solid);
const HIDDEN = WIRE.flatMap((w) => w.hidden);
const FRONT_VERTS = ORDER.flatMap((k) => PIECES[k]);

const DASH_1 = { strokeDasharray: 1 } as const;

/** Edges of the three pieces, one <path> each so every stage can restyle. */
const Glass = memo(function Glass({ k }: { k: PieceKey }) {
  const P = PIECES[k];
  return (
    <>
      {edgesOf(P)
        .filter((e) => e.visible)
        .map((e, i) => (
          <polygon
            key={i}
            points={pts(sideQuad(e.a, e.b))}
            fill={e.kind === "top" ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.03)"}
          />
        ))}
      <polygon points={pts(P)} fill="rgba(255,255,255,0.05)" />
      <polygon
        points={pts(inset(P, 3))}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </>
  );
});

const Chrome = memo(function Chrome({ k }: { k: PieceKey }) {
  const P = PIECES[k];
  return (
    <>
      <polygon points={pts(shift(P))} fill="#161618" />
      {edgesOf(P)
        .filter((e) => e.visible)
        .map((e, i) => (
          <polygon
            key={i}
            points={pts(sideQuad(e.a, e.b))}
            fill={e.kind === "top" ? "url(#bl-top)" : "url(#bl-side)"}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />
        ))}
      <polygon
        points={pts(P)}
        fill="url(#bl-front)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </>
  );
});

/** Dimension annotations: height bracket, base angle, leg-top delta. */
function Dims({ dp, op }: { dp: number; op: number }) {
  const d = { fill: "none", stroke: "#fff", strokeWidth: 0.75, pathLength: 1, ...DASH_1 };
  const off = 1 - dp;
  const label = clamp((dp - 0.6) / 0.4);
  const text = "font-mono text-[10px] tracking-[0.12em] fill-white";
  return (
    <g opacity={op}>
      {/* h 400 — bracket right of the right leg */}
      <path {...d} strokeDashoffset={off} d="M492 120V520M486 120H498M486 520H498" />
      <path {...d} strokeDashoffset={off} strokeOpacity={0.35} strokeDasharray="1" d="M312 120H492M452 520H492" />
      <text className={text} x="500" y="324" opacity={label}>h 400</text>
      {/* 72° at the base of the right leg */}
      <path {...d} strokeDashoffset={off} d="M342 520A48 48 0 0 1 374.8 474.5" />
      <text className={text} x="296" y="506" opacity={label}>72°</text>
      {/* Δ 80 between the leg tops */}
      <path {...d} strokeDashoffset={off} d="M200 120V200M194 120H206M194 200H206" />
      <path {...d} strokeDashoffset={off} strokeOpacity={0.35} d="M206 120H255M206 200H215" />
      <text className={text} x="190" y="164" textAnchor="end" opacity={label}>Δ 80</text>
    </g>
  );
}

const Crosshairs = memo(function Crosshairs({ gp }: { gp: number }) {
  return (
    <g stroke="#fff" strokeWidth="0.75">
      {FRONT_VERTS.map(([x, y], i) => {
        const o = 0.4 * clamp(gp * 1.8 - i * 0.05);
        return (
          <path key={i} opacity={o} d={`M${x - 4} ${y}H${x + 4}M${x} ${y - 4}V${y + 4}`} />
        );
      })}
    </g>
  );
});

/**
 * The 3D A, engineered in three material layers (wire → glass → chrome), each
 * revealed by its own clip rect. Everything is a pure function of the clock `t`.
 */
export function BlueprintA({ t, tl }: { t: number; tl: Timeline }) {
  const gp = prog(t, tl.grid);
  const p1 = prog(t, tl.s1);
  const p2 = prog(t, tl.s2);
  const p3 = prog(t, tl.s3);
  const d3 = tl.s3[1] - tl.s3[0];

  // Scan lines: stage 2 sweeps top→bottom, stage 3 bottom→top.
  const y1 = TOP + (BOTTOM - TOP) * p2;
  const y2 = BOTTOM - (BOTTOM - TOP) * p3;
  const scan1 = p2 > 0 && p2 < 1;
  const scan2 = p3 > 0 && p3 < 1;

  const sheenP = prog(t, [tl.s3[0] + d3 * 0.45, tl.s3[1] + d3 * 0.2]);
  const dimDraw = prog(t, [tl.s1[0] + (tl.s1[1] - tl.s1[0]) * 0.45, tl.s1[1]]);
  const dimOp = 1 - 0.85 * p2;
  const dot = prog(t, [tl.s3[1] - d3 * 0.15, tl.s3[1]]);

  return (
    <svg
      viewBox={VIEWBOX}
      aria-hidden="true"
      className="aspect-[460/500] h-[200px] overflow-visible md:h-[300px]"
    >
      <defs>
        <linearGradient id="bl-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2c2e" />
          <stop offset="0.4" stopColor="#a1a1a6" />
          <stop offset="0.65" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
        <linearGradient id="bl-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d1d1d6" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
        <linearGradient id="bl-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#48484a" />
          <stop offset="1" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="bl-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bl-scan-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="bl-scan-up" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.28" />
        </linearGradient>
        <filter id="bl-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id="bl-glass-clip">
          <rect x="60" y="60" width="520" height={Math.max(0, y1 - 60)} />
        </clipPath>
        <clipPath id="bl-chrome-clip">
          <rect x="60" y={y2} width="520" height={Math.max(0, 600 - y2)} />
        </clipPath>
        <clipPath id="bl-front-clip">
          {ORDER.map((k) => (
            <polygon key={k} points={pts(PIECES[k])} />
          ))}
        </clipPath>
      </defs>

      <Crosshairs gp={gp} />

      {/* Material 2 — frosted glass, revealed top → bottom */}
      <g clipPath="url(#bl-glass-clip)">
        {ORDER.map((k) => (
          <Glass key={k} k={k} />
        ))}
      </g>

      {/* Material 3 — brushed chrome, revealed bottom → top */}
      <g clipPath="url(#bl-chrome-clip)">
        {ORDER.map((k) => (
          <Chrome key={k} k={k} />
        ))}
      </g>
      <g clipPath="url(#bl-front-clip)" opacity={sheenP > 0 && sheenP < 1 ? 1 : 0}>
        <polygon
          points="228,640 288,640 388,0 328,0"
          transform={`translate(${-300 + sheenP * 770} 0)`}
          fill="url(#bl-sheen)"
          style={{ mixBlendMode: "screen" }}
        />
      </g>

      {/* Material 1 — wireframe edges (always on top, fading once chrome lands) */}
      <g opacity={1 - 0.75 * p3} fill="none" strokeLinecap="round">
        <path
          d={HIDDEN.map(segD).join("")}
          stroke="#fff"
          strokeWidth="0.75"
          strokeDasharray="3 4"
          opacity={0.3 * clamp(p1 * 2 - 0.6)}
        />
        {SOLID.map((seg, i) => {
          const ep = clamp(p1 * 1.7 - (i / SOLID.length) * 0.7);
          return (
            <path
              key={i}
              d={segD(seg)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - ep}
              stroke="#fff"
              strokeOpacity={0.8}
              strokeWidth="1"
            />
          );
        })}
      </g>

      <Dims dp={dimDraw} op={dimOp} />

      {/* Scan lines */}
      {scan1 ? (
        <g>
          <rect x="80" y={y1 - 24} width="480" height="24" fill="url(#bl-scan-down)" />
          <line x1="80" y1={y1} x2="560" y2={y1} stroke="#fff" strokeWidth="1" />
        </g>
      ) : null}
      {scan2 ? (
        <g>
          <rect x="80" y={y2} width="480" height="24" fill="url(#bl-scan-up)" />
          <line x1="80" y1={y2} x2="560" y2={y2} stroke="#fff" strokeWidth="1" />
        </g>
      ) : null}

      {/* Summit ignition */}
      <g opacity={dot}>
        <circle cx="287" cy="115" r="6" fill="#fff" filter="url(#bl-glow)" />
        <circle cx="287" cy="115" r="2.6" fill="#fff" />
      </g>
    </svg>
  );
}
