import { prog, type Timeline } from "./timeline";

const NODES = ["IDEA", "PROTOTYPE", "LAUNCH"] as const;

/** ○ IDEA —— ○ PROTOTYPE —— ○ LAUNCH. Lines fill, nodes turn solid on completion. */
export function ProgressTrack({ t, tl }: { t: number; tl: Timeline }) {
  const done = [t >= tl.s1[1], t >= tl.s2[1], t >= tl.s3[1]];
  const fills = [prog(t, tl.s2), prog(t, tl.s3)];

  const node = (i: number) => (
    <div className="relative flex w-0 flex-col items-center">
      <span
        className={`block size-2.5 rounded-full border border-white/60 ${
          done[i] ? "bg-white" : "bg-transparent"
        }`}
      />
      <span
        className={`absolute top-5 font-mono text-[9px] tracking-[0.18em] whitespace-nowrap ${
          done[i] ? "text-white" : "text-white/35"
        }`}
      >
        {NODES[i]}
      </span>
    </div>
  );
  const line = (i: number) => (
    <div className="relative mx-3 h-px flex-1 bg-white/15">
      <div
        className="absolute inset-0 origin-left bg-white"
        style={{ transform: `scaleX(${fills[i]})` }}
      />
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className="flex w-[min(340px,78vw)] items-center pb-6"
    >
      {node(0)}
      {line(0)}
      {node(1)}
      {line(1)}
      {node(2)}
    </div>
  );
}
