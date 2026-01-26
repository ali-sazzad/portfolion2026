import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Pill } from "@/components/site/Pill";
import { GradientBorderCard } from "@/components/site/GradientBorderCard";

type Props = {
  searchParams?: { q?: string; tag?: string; sort?: string };
};

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function buildHref(params: { q?: string; tag?: string; sort?: string }) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.tag) sp.set("tag", params.tag);
  if (params.sort) sp.set("sort", params.sort);
  const qs = sp.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

export default function ProjectsPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").trim();
  const qLower = q.toLowerCase();
  const tag = (searchParams?.tag ?? "").trim();
  const sort = (searchParams?.sort ?? "featured").trim();

  const allTags = uniq(portfolio.projects.flatMap((p) => p.tags)).sort((a, b) => a.localeCompare(b));

  let items = portfolio.projects.slice();

  if (tag) items = items.filter((p) => p.tags.includes(tag));
  if (q) {
    items = items.filter((p) => {
      const hay = `${p.name} ${p.shortPitch} ${p.tags.join(" ")} ${p.stack.join(" ")}`.toLowerCase();
      return hay.includes(qLower);
    });
  }

  items.sort((a, b) => {
    if (sort === "year-desc") return b.year - a.year;
    if (sort === "year-asc") return a.year - b.year;
    if (sort === "name") return a.name.localeCompare(b.name);
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
            Search + filter + sort are URL-driven (shareable) and backend-ready.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline" className="rounded-xl">
              ← Home
            </Button>
          </Link>
          <Link href="/styleguide">
            <Button variant="ghost" className="rounded-xl">
              Styleguide
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="section-tint mt-8 rounded-2xl p-4 md:p-5">
        <SectionHeader
          eyebrow="Filter"
          title="Find the right project fast"
          description="This UI is designed as a real product surface: clear state, shareable URLs, and scalable patterns."
        />

        <form method="get" className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input
              name="q"
              defaultValue={q}
              placeholder="Search by name, tags, or stack…"
              className="rounded-xl"
            />
          </div>

          <div className="flex gap-3">
            <select
              name="sort"
              defaultValue={sort}
              className="h-10 w-full rounded-xl border px-3 text-sm"
              style={{
                borderColor: "hsl(var(--border))",
                background: "hsl(var(--card) / 0.8)",
                color: "hsl(var(--fg))",
              }}
            >
              <option value="featured">Featured</option>
              <option value="year-desc">Year (new → old)</option>
              <option value="year-asc">Year (old → new)</option>
              <option value="name">Name (A → Z)</option>
            </select>

            {tag ? <input type="hidden" name="tag" value={tag} /> : null}

            <Button
              className="rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              Apply
            </Button>
          </div>
        </form>

        {/* Tag pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={buildHref({ q, sort })}>
            <span className="cursor-pointer">
              <Pill tone={!tag ? "brand" : "neutral"}>All</Pill>
            </span>
          </Link>

          {allTags.map((t) => (
            <Link key={t} href={buildHref({ tag: t, q, sort })}>
              <span className="cursor-pointer">
                <Pill tone={tag === t ? "accent" : "neutral"}>{t}</Pill>
              </span>
            </Link>
          ))}
        </div>

        {/* Current state row */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
          <span>
            Showing <b style={{ color: "hsl(var(--fg))" }}>{items.length}</b> results
          </span>
          {tag ? (
            <span>
              • Tag: <b style={{ color: "hsl(var(--fg))" }}>{tag}</b>
            </span>
          ) : null}
          {q ? (
            <span>
              • Query: <b style={{ color: "hsl(var(--fg))" }}>{q}</b>
            </span>
          ) : null}
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="section-tint mt-8 rounded-2xl p-8">
          <h2 className="text-lg font-semibold">No results</h2>
          <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
            Try a different search term, pick another tag, or clear filters.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/projects">
              <Button variant="outline" className="rounded-xl">
                Clear filters
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <GradientBorderCard key={p.id} featured={p.featured} className="lift">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold">{p.name}</div>
                    {p.featured ? <Pill tone="accent">Featured</Pill> : null}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {p.year} • {p.status}
                  </div>
                </div>

                <div className="flex gap-2">
                  {p.links.live ? (
                    <a href={p.links.live} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-xl">
                        Live
                      </Button>
                    </a>
                  ) : null}
                  {p.links.github ? (
                    <a href={p.links.github} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-xl">
                        GitHub
                      </Button>
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
                {p.shortPitch}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t} tone="neutral">
                    {t}
                  </Pill>
                ))}
              </div>

              <div className="mt-4 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                Stack: <span style={{ color: "hsl(var(--fg))" }}>{p.stack.join(" • ")}</span>
              </div>
            </GradientBorderCard>
          ))}
        </div>
      )}
    </main>
  );
}
