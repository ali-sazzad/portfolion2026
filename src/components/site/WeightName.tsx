"use client";

import { useEffect, useRef } from "react";

/** Big name whose letters swell and narrow as the pointer comes near. */
export function WeightName({ lines }: { lines: string[] }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    let raf = 0;

    const update = (x: number, y: number) => {
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
        l.style.setProperty("--w", String(Math.round(520 + t * 300)));
        l.style.setProperty("--d", String(Math.round(100 - t * 25)));
      }
    };
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => update(e.clientX, e.clientY));
    };
    const onLeave = () => {
      for (const l of letters) {
        l.style.removeProperty("--w");
        l.style.removeProperty("--d");
      }
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h1
      ref={root}
      className="display wname text-[clamp(4rem,min(17vw,24vh),14rem)] font-semibold text-white"
      aria-label={lines.join(" ")}
    >
      {lines.map((line) => (
        <span key={line} className="block" aria-hidden="true">
          {line.split("").map((c, i) => (
            <span key={i} data-l>
              {c}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
