import {
  ORDER,
  PIECES,
  segD,
  wireSegments,
} from "@/components/loader/geometry";

// Geometry is static: compute once.
const SOLID = ORDER.flatMap((k) => wireSegments(PIECES[k]).solid);
const HIDDEN = ORDER.flatMap((k) => wireSegments(PIECES[k]).hidden);
const VERTS = ORDER.flatMap((k) => PIECES[k]);

/**
 * Blueprint-style wireframe of the Ascendry A (3 extruded pieces). Decorative:
 * colour comes from `currentColor`, so set it with a text colour class.
 */
export function MarkOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="100 90 380 450"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path
        d={HIDDEN.map(segD).join("")}
        strokeWidth="0.8"
        strokeDasharray="3 5"
        opacity="0.55"
      />
      <path d={SOLID.map(segD).join("")} strokeWidth="1" />
      <path
        d={VERTS.map(([x, y]) => `M${x - 4} ${y}H${x + 4}M${x} ${y - 4}V${y + 4}`).join("")}
        strokeWidth="0.8"
        opacity="0.7"
      />
    </svg>
  );
}
