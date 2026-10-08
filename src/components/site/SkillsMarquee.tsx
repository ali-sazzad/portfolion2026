"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Two rows of skills that drift in opposite directions and speed up with scroll velocity. */
export function SkillsMarquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tweens = Array.from(el.querySelectorAll<HTMLElement>("[data-row]")).map((row, i) =>
        gsap.to(row, {
          xPercent: i % 2 === 0 ? -50 : 0,
          startAt: { xPercent: i % 2 === 0 ? 0 : -50 },
          duration: 38,
          ease: "none",
          repeat: -1,
        }),
      );
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 6);
          tweens.forEach((t) => {
            gsap.to(t, { timeScale: boost, duration: 0.2, overwrite: true });
            gsap.to(t, { timeScale: 1, duration: 1.2, delay: 0.2 });
          });
        },
      });
      return () => {
        st.kill();
        tweens.forEach((t) => t.kill());
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="overflow-hidden py-2" aria-label="Skills">
      {rows.map((row, r) => (
        <div key={r} data-row className="flex w-max gap-4 py-2" aria-hidden={r > 0 ? "true" : undefined}>
          {[...row, ...row, ...row, ...row].map((s, i) => (
            <span
              key={i}
              className={`display whitespace-nowrap rounded-full border px-7 py-3 text-2xl font-medium md:text-4xl ${
                (i + r) % 3 === 0 ? "border-ink bg-ink text-white" : "border-ink/70"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
