"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/portfolio";
import { ProjectThumb } from "./ProjectThumb";
import { TiltCard } from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP: on large screens the section pins and the projects slide past sideways like a film strip.
 * On smaller screens it is a native swipeable row with scroll snapping.
 */
export function WorkStrip({ projects }: { projects: Project[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = outer.current;
    const tr = track.current;
    if (!wrap || !tr) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const pinned = wrap.firstElementChild as HTMLElement;
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + 96);
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinned,
          start: "top 56px",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      // Cards lean into their motion: a gentle skew tied to velocity.
      const skew = gsap.quickTo(tr.querySelectorAll("[data-card]"), "skewX", { duration: 0.4 });
      const st = ScrollTrigger.create({
        trigger: pinned,
        start: "top 56px",
        end: () => `+=${distance()}`,
        onUpdate: (self) => skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -400)),
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
      return () => {
        st.kill();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={outer}>
      <section className="relative overflow-hidden lg:flex lg:h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center" aria-labelledby="work-h">
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-5 pb-8 pt-28 lg:pt-14">
          <h2 id="work-h" className="display text-5xl font-semibold md:text-7xl">Selected work</h2>
          <Link href="/projects" className="shrink-0 pb-2 font-medium underline underline-offset-4 hover:text-cobalt">
            All projects
          </Link>
        </div>

        <ul
          ref={track}
          className="flex w-max snap-x snap-mandatory gap-6 px-5 pb-10 max-lg:w-full max-lg:overflow-x-auto max-lg:pb-8 lg:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] lg:pr-24"
        >
          {projects.map((p) => (
            <li key={p.id} data-card className="w-[78vw] max-w-[560px] shrink-0 snap-center lg:w-[520px]">
              <TiltCard>
                <Link href={`/projects/${p.id}`} className="on-paper group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-3xl border-2 border-ink bg-ink">
                    <ProjectThumb project={p} className="transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="display text-4xl font-semibold group-hover:text-cobalt">{p.name}</h3>
                    <span className="tabular-nums text-mute">{p.year}</span>
                  </div>
                  <p className="mt-1 text-mute">{p.discipline}</p>
                  <p className="mt-2 max-w-[42ch]">{p.pitch}</p>
                </Link>
              </TiltCard>
            </li>
          ))}
          <li data-card className="grid w-[60vw] max-w-[360px] shrink-0 snap-center place-items-center lg:w-[320px]">
            <Link
              href="/projects"
              className="grid aspect-square w-full place-items-center rounded-full bg-cobalt p-8 text-center text-white transition-colors hover:bg-ink"
            >
              <span className="display text-4xl font-semibold">See every project</span>
            </Link>
          </li>
        </ul>

        <div className="mx-auto hidden w-full max-w-6xl px-5 pb-10 lg:block" aria-hidden="true">
          <div className="h-1 bg-line">
            <div ref={bar} className="h-full origin-left scale-x-0 bg-cobalt" />
          </div>
        </div>
      </section>
    </div>
  );
}
