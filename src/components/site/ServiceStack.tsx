"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Service = { name: string; body: string; includes: readonly string[] };

const skins = [
  { bg: "bg-cobalt", fg: "text-white", dot: "bg-butter", sub: "text-white/85" },
  { bg: "bg-butter", fg: "text-ink", dot: "bg-ink", sub: "text-ink/80" },
  { bg: "bg-ink", fg: "text-white", dot: "bg-butter", sub: "text-white/80" },
];

function Card({ s, i, last }: { s: Service; i: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.45]);
  const k = skins[i % skins.length];

  return (
    <li ref={ref} className="h-[88vh] md:h-[92vh]">
      <motion.div
        style={{ scale, top: `calc(5rem + ${i * 1.1}rem)` }}
        className={`sticky origin-top overflow-hidden rounded-[2rem] ${k.bg} ${k.fg} p-7 md:p-12`}
      >
        <div className="grid min-h-[56vh] gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="flex flex-col justify-between gap-8">
            <h3 className="display text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold">{s.name}</h3>
            <p className={`prose-serif ${k.sub}`}>{s.body}</p>
          </div>
          <ul className="space-y-3 self-end">
            {s.includes.map((x) => (
              <li key={x} className="flex gap-3 border-b border-current/25 pb-3 text-lg">
                <span aria-hidden="true" className={`mt-2.5 size-2 shrink-0 rounded-full ${k.dot}`} />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <motion.span aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </li>
  );
}

/** Motion: service cards pile up as you scroll, each shrinking and dimming under the next. */
export function ServiceStack({ services }: { services: readonly Service[] }) {
  return (
    <ul>
      {services.map((s, i) => (
        <Card key={s.name} s={s} i={i} last={i === services.length - 1} />
      ))}
    </ul>
  );
}
