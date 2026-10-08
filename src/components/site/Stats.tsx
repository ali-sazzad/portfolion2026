"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Stat = { value: number; suffix: string; label: string };

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/** Motion: numbers count up when they scroll into view. */
export function Stats({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="border-t-4 border-butter pt-4">
          <dt className="sr-only">{s.label}</dt>
          <dd className="display text-6xl font-semibold md:text-7xl">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
          <p aria-hidden="true" className="mt-2 text-[15px] text-white/70">
            {s.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
