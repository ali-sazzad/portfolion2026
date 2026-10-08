"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Job = { company: string; role: string; period: string; place: string; points: readonly string[] };

/** GSAP: a line draws down the page as you scroll and each role lights its marker when reached. */
export function ExperiencePath({ jobs }: { jobs: readonly Job[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelector("[data-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 70%", scrub: true },
        },
      );
      el.querySelectorAll<HTMLElement>("[data-job]").forEach((job) => {
        const dot = job.querySelector("[data-dot]");
        gsap.fromTo(
          dot,
          { scale: 0.5, backgroundColor: "#ffffff" },
          {
            scale: 1,
            backgroundColor: "#2a35ff",
            duration: 0.4,
            ease: "back.out(3)",
            scrollTrigger: { trigger: job, start: "top 62%", toggleActions: "play none none reverse" },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <ol ref={root} className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-[2px] bg-line md:left-[15px]" />
      <span
        aria-hidden="true"
        data-line
        className="absolute bottom-0 left-[11px] top-2 w-[2px] origin-top bg-cobalt md:left-[15px]"
      />
      {jobs.map((j) => (
        <li key={j.company} data-job className="relative grid gap-4 pb-16 pl-12 last:pb-0 md:grid-cols-[320px_1fr] md:gap-12 md:pl-16">
          <span
            aria-hidden="true"
            data-dot
            className="absolute left-0 top-1.5 size-6 rounded-full border-2 border-cobalt bg-white md:size-8"
          />
          <div>
            <h3 className="display text-4xl font-semibold md:text-5xl">{j.company}</h3>
            <p className="mt-2 font-medium">{j.role}</p>
            <p className="text-[15px] text-mute">
              {j.period}, {j.place}
            </p>
          </div>
          <ul className="prose-serif space-y-3 text-[1.0625rem]">
            {j.points.map((pt) => (
              <li key={pt} className="border-l-2 border-line pl-4">
                {pt}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
