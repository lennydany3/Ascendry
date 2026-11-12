"use client";

import { useEffect, useRef } from "react";

/**
 * The Ascent mark. Server-rendered 2D SVG assembles with CSS (works before JS,
 * on mobile, low-power devices and reduced motion). On capable desktops a
 * lazily-loaded WebGL chrome version crossfades in over it.
 */
export function HeroMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = hostRef.current;
    const svg = svgRef.current;
    const svgWrap = svgWrapRef.current;
    if (!wrap || !host || !svg || !svgWrap) return;

    const section = wrap.closest("section");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { px: 0, py: 0, scrollP: 0, visible: true };
    let inView = true;
    let disposed = false;
    let dispose3D: (() => void) | null = null;
    const t0 = performance.now();

    const onScroll = () => {
      const h = section?.offsetHeight || window.innerHeight;
      state.scrollP = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
      svg.style.opacity = String(1 - state.scrollP);
      if (!reduced) {
        svg.style.transform = `perspective(900px) rotateY(${state.scrollP * 25}deg) scale(${1 - 0.2 * state.scrollP})`;
      }
      const cv = host.firstElementChild as HTMLElement | null;
      if (cv) cv.style.opacity = String(1 - state.scrollP);
    };
    const onPointer = (e: PointerEvent) => {
      state.px = (e.clientX / window.innerWidth) * 2 - 1;
      state.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVis = () => {
      state.visible = !document.hidden && inView;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | undefined;
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([en]) => {
        inView = en.isIntersecting;
        onVis();
      });
      io.observe(section);
    }

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const use3D =
      window.innerWidth >= 768 &&
      !conn?.saveData &&
      (navigator.hardwareConcurrency || 8) > 4 &&
      !reduced;

    if (use3D) {
      import("./mark3d")
        .then(({ createMark3D }) => {
          if (disposed) return;
          dispose3D = createMark3D(host, state, {
            reduced,
            t0,
            onFirstFrame: () => {
              host.style.opacity = "1";
              svgWrap.style.transition = "opacity 600ms cubic-bezier(0.22,1,0.36,1)";
              svgWrap.style.opacity = "0";
            },
          });
        })
        .catch(() => {
          /* keep the 2D fallback */
        });
    }

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
      dispose3D?.();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative h-[clamp(260px,40vw,580px)] w-full md:flex-[1_1_420px]"
    >
      <div
        ref={svgWrapRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          ref={svgRef}
          viewBox="8 0 112 116"
          className="aspect-[112/116] h-[78%] max-w-[82%] overflow-visible text-fg will-change-[transform,opacity]"
        >
          <g fill="currentColor">
            <path className="mark-piece" data-p="l" d="M8 116 41 18h17L34 116z" />
            <path className="mark-piece" data-p="r" d="M73 0h17l30 116H94z" />
            <path className="mark-piece" data-p="c" d="M25 82h40l4 14H21z" />
          </g>
        </svg>
      </div>
      <div
        ref={hostRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-[600ms] ease-out"
      />
    </div>
  );
}
