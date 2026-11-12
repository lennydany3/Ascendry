import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/** — 01 / EYEBROW · h2 serif (one italic word) · lead */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  invert = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-[760px]">
      <Eyebrow className={invert ? "!text-invert-muted" : ""}>
        — {index} / {label}
      </Eyebrow>
      <h2
        className={`mt-6 font-display text-[clamp(34px,4.4vw,48px)] leading-[1.05] font-normal [&_em]:italic ${
          invert
            ? "!text-invert-fg [&_em]:!text-invert-muted"
            : "[&_em]:text-fg-muted"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-[56ch] text-lg leading-[1.6] ${
            invert ? "text-invert-muted" : "text-fg-muted"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
