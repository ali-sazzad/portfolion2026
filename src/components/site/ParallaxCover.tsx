"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** GSAP: the cover art drifts and scales inside its frame as the page scrolls. */
export function ParallaxCover({ children }: { children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.firstElementChild,
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={frame} className="aspect-[16/9] overflow-hidden rounded-3xl border border-ink bg-ink">
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
