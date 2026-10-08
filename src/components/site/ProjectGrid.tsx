"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Project } from "@/data/portfolio";
import { ProjectThumb } from "./ProjectThumb";
import { TiltCard } from "./TiltCard";

/** Motion: filtering reflows the grid with shared-layout animation; the active chip slides between options. */
export function ProjectGrid({
  projects,
  tags,
  initialTag,
}: {
  projects: Project[];
  tags: string[];
  initialTag?: string;
}) {
  const [tag, setTag] = useState<string | undefined>(initialTag);
  const list = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;

  const choose = (t?: string) => {
    setTag(t);
    const url = t ? `/projects?tag=${encodeURIComponent(t)}` : "/projects";
    window.history.replaceState(null, "", url); // keep the filter shareable
  };

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter by topic" className="mt-8 flex flex-wrap gap-2">
        {[undefined, ...tags].map((t) => {
          const on = t === tag;
          return (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => choose(t)}
              className="relative rounded-full border border-ink/30 px-4 py-1.5 text-[15px] transition-colors hover:border-ink"
            >
              {on && (
                <motion.span
                  layoutId="chip"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative transition-colors ${on ? "text-white" : ""}`}>{t ?? "All"}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-mute" aria-live="polite">
        {list.length} {list.length === 1 ? "project" : "projects"}
        {tag ? ` tagged ${tag}` : ""}
      </p>

      <ul className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={i % 2 === 1 ? "sm:mt-16" : ""}
            >
              <TiltCard>
              <Link href={`/projects/${p.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-ink">
                  <ProjectThumb project={p} className="transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="display text-3xl font-semibold group-hover:underline group-hover:underline-offset-4">
                    {p.name}
                  </h2>
                  <span className="tabular-nums text-mute">{p.year}</span>
                </div>
                <p className="mt-1 text-mute">
                  {p.discipline}, {p.status.toLowerCase()}
                </p>
                <p className="mt-2 max-w-[44ch]">{p.pitch}</p>
              </Link>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </LayoutGroup>
  );
}
