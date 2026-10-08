"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { WeightName } from "./WeightName";
import { Magnetic } from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

// Three.js and Theatre.js are browser-only, so load them after first paint.
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { profile } = portfolio;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrance: letters rise from a mask, then supporting copy follows.
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-l]", { yPercent: 110, rotate: 6, duration: 1.1, stagger: 0.035 })
        .from("[data-hero-in]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.7");

      // Scroll: copy drifts up and fades as the next section arrives.
      gsap.to("[data-hero-content]", {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="contour relative overflow-hidden bg-cobalt text-white">
      <HeroScene />
      <div
        aria-hidden="true"
        className="absolute right-6 top-6 z-10 hidden size-32 place-items-center md:grid lg:right-12 lg:top-10"
      >
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fill="#fff" fontSize="10.5" fontWeight="600">
            <textPath href="#badge-circle" textLength="283" lengthAdjust="spacing">Scroll down &#183; See the work &#183; Scroll down &#183;</textPath>
          </text>
        </svg>
        <span className="grid size-12 place-items-center rounded-full bg-butter text-ink">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </span>
      </div>
      <div
        data-hero-content
        className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-between px-5 pb-10 pt-10 md:pt-14"
      >
        <p
          data-hero-in
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[15px] backdrop-blur"
        >
          <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-butter" />
          {profile.availability}
        </p>

        <div className="-ml-1 mt-6 overflow-hidden pb-4 [&_h1]:overflow-visible">
          <WeightName lines={[profile.first, profile.last]} />
        </div>

        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p data-hero-in className="max-w-[34ch] text-xl leading-snug md:text-2xl">
            {profile.title} in {profile.location.split(",")[0]}. {profile.intro}
          </p>
          <div data-hero-in className="flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href="/projects"
                className="inline-block rounded-full bg-butter px-6 py-3 font-medium text-ink"
              >
                See the work
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/resume"
                className="inline-block rounded-full border border-white/60 px-6 py-3 font-medium transition-colors hover:bg-white hover:text-cobalt"
              >
                Read the resume
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
