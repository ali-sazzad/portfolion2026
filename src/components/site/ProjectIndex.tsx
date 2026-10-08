"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/data/portfolio";
import { ProjectThumb } from "./ProjectThumb";

/** Work as an index: one line per project, with a cover that wipes in as focus or hover moves. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(projects[0]);

  return (
    <div className="on-paper grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
      <ul className="border-t border-ink">
        {projects.map((p) => {
          const on = active.id === p.id;
          return (
            <li key={p.id} className="relative border-b border-line">
              {on && (
                <motion.span
                  layoutId="row-bg"
                  aria-hidden="true"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <Link
                href={`/projects/${p.id}`}
                onMouseEnter={() => setActive(p)}
                onFocus={() => setActive(p)}
                className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[1fr_180px_60px]"
              >
                <motion.span
                  animate={{ x: on ? 12 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="display text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium"
                >
                  {p.name}
                </motion.span>
                <span className="hidden text-[15px] text-mute md:block">{p.discipline}</span>
                <span className="text-right text-[15px] tabular-nums text-mute">{p.year}</span>
                <span className="col-span-2 text-[15px] text-mute md:hidden">{p.discipline}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-ink">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.99, transition: { delay: 0.5 } }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              >
                <ProjectThumb project={active} />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-snug text-mute">{active.pitch}</p>
        </div>
      </div>
    </div>
  );
}
