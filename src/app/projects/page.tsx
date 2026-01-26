// src/app/projects/page.tsx
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projects",
};

type SP = { q?: string; tag?: string; sort?: string };
type Props = { searchParams?: Promise<SP> | SP };

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default async function ProjectsPage({ searchParams }: Props) {
  // ✅ unwrap searchParams whether it's a Promise or plain object
  const sp = (searchParams instanceof Promise ? await searchParams : searchParams) ?? {};

  const qRaw = (sp.q ?? "").trim();
  const q = qRaw.toLowerCase();
  const tag = (sp.tag ?? "").trim();
  const sort = (sp.sort ?? "featured").trim();

  const allTags = uniq(portfolio.projects.flatMap((p) => p.tags.map((t) => t.trim()))).sort((a, b) =>
    a.localeCompare(b)
  );

  const filtered = portfolio.projects.filter((p) => {
    const matchesTag = !tag || p.tags.includes(tag);
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.shortPitch.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.stack.some((s) => s.toLowerCase().includes(q));
    return matchesTag && matchesQ;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "year") return (b.year ?? 0) - (a.year ?? 0);
    if (sort === "name") return a.name.localeCompare(b.name);
    // default: featured first then year desc
    const fa = a.featured ? 1 : 0;
    const fb = b.featured ? 1 : 0;
    if (fb !== fa) return fb - fa;
    return (b.year ?? 0) - (a.year ?? 0);
  });

  return (
    <Container className="py-10 md:py-14">
      <SectionHeader
        eyebrow="Projects"
        title="Things I’ve built"
        description="Filter, search, sort — frontend-only now, backend-ready later."
      />

      {/* TOP BAR (restored) */}
      <div className="section-tint rounded-2xl border p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* ✅ Server-safe search: GET form updates URL */}
          <form action="/projects" method="GET" className="flex w-full items-center gap-2 md:max-w-md">
            {/* Keep current tag/sort when searching */}
            <input type="hidden" name="tag" value={tag} />
            <input type="hidden" name="sort" value={sort} />

            <input
              name="q"
              defaultValue={qRaw}
              placeholder="Search projects… (name, tags, stack)"
              className="h-10 w-full rounded-xl border px-3 text-sm outline-none"
              style={{
                background: "hsl(var(--card) / 0.75)",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--fg))",
              }}
            />

            <Button
              type="submit"
              className="h-10 rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              Search
            </Button>
          </form>

          {/* Sort pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "featured", label: "Featured" },
              { key: "year", label: "Year" },
              { key: "name", label: "Name" },
            ].map((s) => (
              <Link
                key={s.key}
                href={`/projects?tag=${encodeURIComponent(tag)}&q=${encodeURIComponent(qRaw)}&sort=${encodeURIComponent(
                  s.key
                )}`}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: sort === s.key ? "hsl(var(--brand) / 0.14)" : "hsl(var(--card) / 0.7)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--fg))",
                }}
              >
                Sort: {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Tag chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/projects?q=${encodeURIComponent(qRaw)}&sort=${encodeURIComponent(sort)}`}
            className="rounded-full px-3 py-1 text-xs"
            style={{
              background: !tag ? "hsl(var(--accent-b) / 0.16)" : "hsl(var(--card) / 0.7)",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--fg))",
            }}
          >
            All
          </Link>

          {allTags.map((t) => (
            <Link
              key={t}
              href={`/projects?tag=${encodeURIComponent(t)}&q=${encodeURIComponent(qRaw)}&sort=${encodeURIComponent(sort)}`}
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
      </div>

      {/* RESULTS */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sorted.length === 0 ? (
          <Card className="section-tint rounded-2xl border p-6 md:col-span-2">
            <div className="text-lg font-semibold">No results</div>
            <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
              Try clearing filters or using a different search term.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/projects">
                <Button
                  className="rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                    color: "hsl(var(--brand-fg))",
                  }}
                >
                  Clear filters
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          sorted.map((p) => (
            <Card key={p.id} className="section-tint rounded-2xl border p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="mt-1 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {p.year} • {p.status}
                    {p.featured ? " • Featured" : ""}
                  </div>
                </div>

                <div className="flex gap-2">
                  {p.links.live ? (
                    <a href={p.links.live} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="h-8 rounded-xl px-3 text-xs">
                        Live
                      </Button>
                    </a>
                  ) : null}

                  {p.links.github ? (
                    <a href={p.links.github} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="h-8 rounded-xl px-3 text-xs">
                        GitHub
                      </Button>
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
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "hsl(var(--brand) / 0.10)",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--fg))",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-[11px]"
                    style={{
                      background: "hsl(var(--card) / 0.75)",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--muted-fg))",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}
