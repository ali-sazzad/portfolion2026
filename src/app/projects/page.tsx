import Link from "next/link";
import { allTags, portfolio } from "@/data/portfolio";
import { ProjectThumb } from "@/components/site/ProjectThumb";

export const metadata = { title: "Work" };

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const active = tag && allTags.includes(tag) ? tag : undefined;
  const list = active ? portfolio.projects.filter((p) => p.tags.includes(active)) : portfolio.projects;

  const chip = (isOn: boolean) =>
    `rounded-full border px-4 py-1.5 text-[15px] transition-colors ${
      isOn ? "border-ink bg-ink text-white" : "border-ink/30 hover:border-ink"
    }`;

  return (
    <div className="on-paper mx-auto max-w-6xl px-5 py-14 md:py-20">
      <h1 className="display text-6xl font-semibold md:text-8xl">Work</h1>
      <p className="prose-serif mt-5">
        Product interfaces, design systems and sites from the last few years. Pick a topic to narrow the list.
      </p>

      <nav aria-label="Filter by topic" className="mt-8 flex flex-wrap gap-2">
        <Link href="/projects" aria-current={!active ? "true" : undefined} className={chip(!active)}>
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/projects?tag=${encodeURIComponent(t)}`}
            aria-current={active === t ? "true" : undefined}
            className={chip(active === t)}
          >
            {t}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-mute" aria-live="polite">
        {list.length} {list.length === 1 ? "project" : "projects"}
        {active ? ` tagged ${active}` : ""}
      </p>

      <ul className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {list.map((p, i) => (
          <li key={p.id} className={i % 2 === 1 ? "sm:mt-16" : ""}>
            <Link href={`/projects/${p.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ink bg-ink">
                <ProjectThumb project={p} className="transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="display text-3xl font-semibold group-hover:underline group-hover:underline-offset-4">
                  {p.name}
                </h2>
                <span className="text-mute tabular-nums">{p.year}</span>
              </div>
              <p className="mt-1 text-mute">
                {p.discipline}, {p.status.toLowerCase()}
              </p>
              <p className="mt-2 max-w-[44ch]">{p.pitch}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
