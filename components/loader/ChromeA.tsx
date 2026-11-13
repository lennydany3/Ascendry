"use client";

import { useEffect, useRef } from "react";
import { animate, motion } from "motion/react";
import {
  ORDER,
  PIECES,
  edgesOf,
  pts,
  shift,
  sideQuad,
  type PieceKey,
} from "./geometry";

/** The A (plus reflection room) lives in this crop of the 560×640 space. */
export const A_VIEWBOX = "100 100 380 560";

const EDGE = "rgba(255,255,255,0.5)";

/** Gradients shared by every chrome SVG (referenced by id, same document). */
export function ChromeDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <linearGradient id="sl-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2c2e" />
          <stop offset="0.4" stopColor="#a1a1a6" />
          <stop offset="0.65" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
        <linearGradient id="sl-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d1d1d6" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
        <linearGradient id="sl-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#48484a" />
          <stop offset="1" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="sl-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** One extruded chrome piece: back face → visible side faces → front face. */
function ChromePiece({ k, flash }: { k: PieceKey; flash?: boolean }) {
  const P = PIECES[k];
  const stroke = flash ? "#fff" : EDGE;
  const sw = flash ? 1.8 : 0.75;
  return (
    <>
      <polygon points={pts(shift(P))} fill="#161618" />
      {edgesOf(P)
        .filter((e) => e.visible)
        .map((e, i) => (
          <polygon
            key={i}
            points={pts(sideQuad(e.a, e.b))}
            fill={e.kind === "top" ? "url(#sl-top)" : "url(#sl-side)"}
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        ))}
      <polygon
        points={pts(P)}
        fill="url(#sl-front)"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </>
  );
}

/** Where each piece starts (relative to its landing spot) and when it flies. */
const FLIGHT: Record<
  PieceKey,
  { from: { x?: string; y?: string }; delay: number }
> = {
  right: { from: { y: "-120vh" }, delay: 0.35 },
  left: { from: { x: "-60vw", y: "40vh" }, delay: 0.43 },
  bar: { from: { x: "-80vw" }, delay: 0.51 },
};

export const LAND_AT: Record<PieceKey, number> = {
  right: FLIGHT.right.delay + 0.24,
  left: FLIGHT.left.delay + 0.24,
  bar: FLIGHT.bar.delay + 0.24,
};

function FlyingPiece({
  k,
  settled,
  flash,
}: {
  k: PieceKey;
  settled: boolean;
  flash: boolean;
}) {
  const blur = useRef<SVGFEGaussianBlurElement>(null);
  const { from, delay } = FLIGHT[k];

  // Motion blur: stdDeviationX 12 → 0 while the piece travels.
  useEffect(() => {
    if (settled) return;
    const c = animate(12, 0, {
      duration: 0.34,
      delay,
      ease: "easeOut",
      onUpdate: (v) =>
        blur.current?.setAttribute("stdDeviation", `${v.toFixed(2)} 0`),
    });
    return () => c.stop();
  }, [settled, delay]);

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      initial={settled ? false : { x: 0, y: 0, ...from }}
      animate={{ x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
    >
      <svg viewBox={A_VIEWBOX} className="h-full w-full overflow-visible">
        <defs>
          <filter id={`sl-blur-${k}`} x="-50%" y="-10%" width="200%" height="120%">
            <feGaussianBlur ref={blur} stdDeviation={settled ? "0 0" : "12 0"} />
          </filter>
        </defs>
        <g filter={`url(#sl-blur-${k})`}>
          <ChromePiece k={k} flash={flash} />
        </g>
      </svg>
    </motion.div>
  );
}

export type ChromeAProps = {
  /** Skip all entrance animation and render the final frame. */
  settled?: boolean;
  /** Pieces whose edges are currently flashing white (landing). */
  flash?: Partial<Record<PieceKey, boolean>>;
  /** Run the diagonal sheen sweep. */
  sheen?: boolean;
  /** Show the faint floor reflection. */
  reflect?: boolean;
};

/**
 * The 3D chrome A. Three stacked SVG layers (one per piece, so each can fly
 * independently), a sheen layer clipped to the front faces, and a reflection.
 */
export function ChromeA({
  settled = false,
  flash = {},
  sheen = false,
  reflect = false,
}: ChromeAProps) {
  return (
    <div className="relative aspect-[380/560] h-[210px] md:h-[308px]">
      {/* Floor reflection */}
      <motion.svg
        viewBox={A_VIEWBOX}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        initial={false}
        animate={{ opacity: reflect || settled ? 0.12 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <defs>
          <linearGradient
            id="sl-refl-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="526"
            x2="0"
            y2="640"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id="sl-refl-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="526"
            width="600"
            height="140"
          >
            <rect x="0" y="526" width="600" height="140" fill="url(#sl-refl-grad)" />
          </mask>
        </defs>
        <g mask="url(#sl-refl-mask)">
          <g transform="translate(0 1052) scale(1 -1)">
            {ORDER.map((k) => (
              <ChromePiece key={k} k={k} />
            ))}
          </g>
        </g>
      </motion.svg>

      {ORDER.map((k) => (
        <FlyingPiece key={k} k={k} settled={settled} flash={!!flash[k]} />
      ))}

      {/* Sheen band clipped to every front face */}
      <svg
        viewBox={A_VIEWBOX}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <clipPath id="sl-sheen-clip">
            {ORDER.map((k) => (
              <polygon key={k} points={pts(PIECES[k])} />
            ))}
          </clipPath>
        </defs>
        <g clipPath="url(#sl-sheen-clip)">
          <motion.g
            initial={{ x: -300 }}
            animate={{ x: sheen && !settled ? 470 : -300 }}
            transition={{ duration: sheen ? 0.4 : 0, ease: [0.4, 0, 0.2, 1] }}
          >
            <polygon
              points="228,640 288,640 388,0 328,0"
              fill="url(#sl-sheen)"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

