"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** GSAP ScrollTrigger: the statement is pinned and each word lights up as you scroll. */
export function AboutReveal({ statement }: { statement: string }) {
  const root = useRef<HTMLDivElement>(null);
  const words = statement.split(" ");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = el.querySelectorAll("[data-w]");
      gsap.set(targets, { opacity: 0.18 });
      gsap.to(targets, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <p className="display text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.08] tracking-tight">
        {words.map((w, i) => (
          <span key={i} data-w className="inline-block pr-[0.28em]">
            {w}
          </span>
        ))}
      </p>
    </div>
  );
}
