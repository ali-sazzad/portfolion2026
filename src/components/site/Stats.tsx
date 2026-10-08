"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Stat = { value: number; max: number; suffix: string; label: string };

function Ring({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = num.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${stat.value}${stat.suffix}`;
      return;
    }
    const c = animate(0, stat.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${stat.suffix}`),
    });
    return () => c.stop();
  }, [inView, reduce, stat.value, stat.suffix]);

  return (
    <div ref={ref} className="text-center">
      <div className="relative mx-auto aspect-square w-full max-w-[220px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2.5" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#ffd84d"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? stat.value / stat.max : 0 }}
            animate={{ pathLength: inView ? stat.value / stat.max : 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="display absolute inset-0 grid place-items-center text-5xl font-semibold tabular-nums md:text-6xl">
          <span ref={num}>
            {stat.value}
            {stat.suffix}
          </span>
        </span>
      </div>
      <p className="mt-4 text-[15px] text-white/75">{stat.label}</p>
    </div>
  );
}

/** Motion: each figure is a ring that fills while the number counts up. */
export function Stats({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
      {stats.map((s) => (
        <Ring key={s.label} stat={s} />
      ))}
    </div>
  );
}
