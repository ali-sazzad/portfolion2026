import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams?: {
    q?: string;
    tag?: string;
    sort?: string;
  };
};

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function ProjectsPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").trim().toLowerCase();
  const tag = (searchParams?.tag ?? "").trim();
  const sort = (searchParams?.sort ?? "featured").trim();

  const allTags = uniq(portfolio.projects.flatMap((p) => p.tags)).sort((a, b) => a.localeCompare(b));

  let items = portfolio.projects.slice();

  if (tag) items = items.filter((p) => p.tags.includes(tag));
  if (q) {
    items = items.filter((p) => {
      const hay = `${p.name} ${p.shortPitch} ${p.tags.join(" ")} ${p.stack.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }

  items.sort((a, b) => {
    if (sort === "year-desc") return b.year - a.year;
    if (sort === "year-asc") return a.year - b.year;
    if (sort === "name") return a.name.localeCompare(b.name);
    // featured default: featured first, then year desc
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
            Filter + sort is URL-driven (shareable) and backend-ready.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" className="rounded-xl">← Home</Button>
        </Link>
      </div>

      {/* Search + Sort */}
      <form method="get" className="mt-8 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <Input
            name="q"
            defaultValue={searchParams?.q ?? ""}
            placeholder="Search by name, tags, stack…"
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-3">
          <select
            name="sort"
            defaultValue={sort}
            className="h-10 w-full rounded-xl border bg-white px-3 text-sm"
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

      {/* Tag chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/projects?q=${encodeURIComponent(searchParams?.q ?? "")}&sort=${encodeURIComponent(sort)}`}
          className="rounded-full px-3 py-1 text-xs"
          style={{
            background: !tag ? "hsl(var(--brand) / 0.16)" : "hsl(var(--card) / 0.7)",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--fg))",
          }}
        >
          All
        </Link>

        {allTags.map((t) => (
          <Link
            key={t}
            href={`/projects?tag=${encodeURIComponent(t)}&q=${encodeURIComponent(searchParams?.q ?? "")}&sort=${encodeURIComponent(sort)}`}
            className="rounded-full px-3 py-1 text-xs"
            style={{
              background: tag === t ? "hsl(var(--accent-b) / 0.16)" : "hsl(var(--card) / 0.7)",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--fg))",
            }}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="mt-10 section-tint rounded-2xl p-8">
          <h2 className="text-lg font-semibold">No results</h2>
          <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
            Try a different search term or clear filters.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/projects">
              <Button variant="outline" className="rounded-xl">Clear</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <Card key={p.id} className="section-tint rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold">{p.name}</div>
                    {p.featured ? (
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--brand) / 0.18), hsl(var(--accent-a) / 0.12))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      >
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {p.year} • {p.status}
                  </div>
                </div>

                <div className="flex gap-2">
                  {p.links.live ? (
                    <a href={p.links.live} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-xl">Live</Button>
                    </a>
                  ) : null}
                  {p.links.github ? (
                    <a href={p.links.github} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-xl">GitHub</Button>
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                {p.shortPitch}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      background: "hsl(var(--brand) / 0.10)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                Stack: {p.stack.join(" • ")}
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
