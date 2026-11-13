import type { Timeline } from "./timeline";

/**
 * Terminal-style build log: lines type in character by character, at most four
 * visible, older lines fade towards 0.3.
 */
export function BuildLog({
  t,
  tl,
  onlyLast = false,
}: {
  t: number;
  tl: Timeline;
  /** Reduced motion: show only the final line, fully typed. */
  onlyLast?: boolean;
}) {
  const all = onlyLast ? tl.log.slice(-1) : tl.log;
  const started = all
    .map((l) => ({
      text: l.text,
      n: onlyLast
        ? l.text.length
        : Math.min(l.text.length, Math.floor((t - l.at) / tl.char)),
    }))
    .filter((l) => l.n > 0)
    .slice(-4);

  return (
    <div
      aria-hidden="true"
      className="flex h-[4.8em] flex-col justify-end font-mono text-[11px] leading-[1.2em] text-white"
    >
      {started.map((l, i) => {
        const fromEnd = started.length - 1 - i;
        const typed = l.text.slice(0, l.n);
        const check = typed.indexOf("✓");
        return (
          <div
            key={l.text}
            className="whitespace-pre"
            style={{ opacity: [1, 0.7, 0.5, 0.3][fromEnd] }}
          >
            {check >= 0 ? (
              <>
                <span className="text-white/60">{typed.slice(0, check)}</span>
                <span className="text-white">✓</span>
              </>
            ) : (
              <span className="text-white/60">{typed}</span>
            )}
            {fromEnd === 0 && l.n < l.text.length ? (
              <span className="text-white/60">▍</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
