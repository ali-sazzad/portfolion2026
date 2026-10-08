"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** GSAP: a tilted tape that runs across the page and speeds up when you scroll fast. */
export function Ribbon({ words, tilt = -2 }: { words: string[]; tilt?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = el.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const tween = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction;
          gsap.to(tween, { timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 300, 6)), duration: 0.25, overwrite: true });
          gsap.to(tween, { timeScale: 1, duration: 1.4, delay: 0.25 });
        },
      });
      return () => {
        st.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  const run = [...words, ...words];
  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6" aria-hidden="true">
      <div
        ref={root}
        className="bg-butter py-4 text-ink"
        style={{ transform: `rotate(${tilt}deg)`, width: "110%", marginLeft: "-5%" }}
      >
        <div data-track className="flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {run.map((w, i) => (
                <span key={i} className="display flex items-center gap-8 whitespace-nowrap pr-8 text-3xl font-semibold md:text-5xl">
                  {w}
                  <svg viewBox="0 0 24 24" className="size-6 md:size-9" fill="currentColor">
                    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
