"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { ProjectThumb } from "./ProjectThumb";

/** Work as an index: one line per project, with a cover that follows focus/hover. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(projects[0]);

  return (
    <div className="on-paper grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
      <ul className="border-t border-ink">
        {projects.map((p) => (
          <li key={p.id} className="border-b border-line">
            <Link
              href={`/projects/${p.id}`}
              onMouseEnter={() => setActive(p)}
              onFocus={() => setActive(p)}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:bg-white md:grid-cols-[1fr_180px_60px]"
            >
              <span className="display text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium transition-transform duration-300 group-hover:translate-x-2">
                {p.name}
              </span>
              <span className="hidden text-[15px] text-mute md:block">{p.discipline}</span>
              <span className="text-right text-[15px] tabular-nums text-mute">{p.year}</span>
              <span className="col-span-2 text-[15px] text-mute md:hidden">{p.discipline}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-ink">
            <ProjectThumb project={active} />
          </div>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-snug text-mute">{active.pitch}</p>
        </div>
      </div>
    </div>
  );
}
