import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Pill } from "@/components/site/Pill";
import { GradientBorderCard } from "@/components/site/GradientBorderCard";

type Props = {
  searchParams?: {
    q?: string;
    tag?: string;
    sort?: string;
    status?: string;
    stack?: string;
    featured?: string; // "1" => featured only
  };
};

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function buildHref(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && v.trim().length) sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

export default function ProjectsPage({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").trim();
  const qLower = q.toLowerCase();

  const tag = (searchParams?.tag ?? "").trim();
  const sort = (searchParams?.sort ?? "featured").trim();

  const status = (searchParams?.status ?? "").trim(); // one of statuses
  const stack = (searchParams?.stack ?? "").trim(); // one of stack tags
  const featuredOnly = (searchParams?.featured ?? "") === "1";

  const statuses = ["Live", "In Progress", "Case Study"] as const;

  const allTags = uniq(portfolio.projects.flatMap((p) => p.tags)).sort((a, b) => a.localeCompare(b));
  const allStacks = uniq(portfolio.projects.flatMap((p) => p.stack)).sort((a, b) => a.localeCompare(b));

  let items = portfolio.projects.slice();

  // Filters
  if (featuredOnly) items = items.filter((p) => p.featured);

  if (tag) items = items.filter((p) => p.tags.includes(tag));

  if (status) items = items.filter((p) => p.status === status);

  if (stack) items = items.filter((p) => p.stack.includes(stack));

  // Search
  if (q) {
    items = items.filter((p) => {
      const hay = `${p.name} ${p.shortPitch} ${p.tags.join(" ")} ${p.stack.join(" ")} ${p.status}`.toLowerCase();
      return hay.includes(qLower);
    });
  }

  // Sort
  items.sort((a, b) => {
    if (sort === "year-desc") return b.year - a.year;
    if (sort === "year-asc") return a.year - b.year;
    if (sort === "name") return a.name.localeCompare(b.name);

    // default: featured first, then year desc
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });

  const baseParams = {
    q: q || undefined,
    sort: sort || undefined,
    // we keep current filters unless intentionally replaced
    tag: tag || undefined,
    status: status || undefined,
    stack: stack || undefined,
    featured: featuredOnly ? "1" : undefined,
  };

  const hasAnyFilter = Boolean(tag || status || stack || featuredOnly || q);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
            Real product filtering: URL-driven, shareable, and backend-ready.
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

      {/* Filter Surface */}
      <div className="section-tint mt-8 rounded-2xl p-4 md:p-5">
        <SectionHeader
          eyebrow="Filter Pipeline"
          title="Search, filter, sort"
          description="Everything here is URL state. That means: shareable links, predictable behavior, and easy backend swap later."
        />

        <form method="get" className="grid gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="md:col-span-2">
            <Input
              name="q"
              defaultValue={q}
              placeholder="Search by name, tags, stack, status…"
              className="rounded-xl"
            />
          </div>

          {/* Sort */}
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

            {/* Preserve current filters on submit */}
            {tag ? <input type="hidden" name="tag" value={tag} /> : null}
            {status ? <input type="hidden" name="status" value={status} /> : null}
            {stack ? <input type="hidden" name="stack" value={stack} /> : null}
            {featuredOnly ? <input type="hidden" name="featured" value="1" /> : null}

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

        {/* Toggles row (Featured only) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link href={buildHref({ ...baseParams, featured: featuredOnly ? undefined : "1" })}>
            <span className="cursor-pointer">
              <Pill tone={featuredOnly ? "accent" : "neutral"} active={featuredOnly}>
                Featured only
              </Pill>
            </span>
          </Link>

          {hasAnyFilter ? (
            <Link href="/projects">
              <span className="cursor-pointer">
                <Pill tone="neutral">Clear all</Pill>
              </span>
            </Link>
          ) : null}
        </div>

        {/* Tag pills */}
        <div className="mt-4">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Tags
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href={buildHref({ ...baseParams, tag: undefined })}>
              <span className="cursor-pointer">
                <Pill tone="brand" active={!tag}>
                  All
                </Pill>
              </span>
            </Link>

            {allTags.map((t) => {
              const isActive = tag === t;
              return (
                <Link key={t} href={buildHref({ ...baseParams, tag: t })} aria-current={isActive ? "page" : undefined}>
                  <span className="cursor-pointer">
                    <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                      {t}
                    </Pill>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Status pills */}
        <div className="mt-5">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Status
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href={buildHref({ ...baseParams, status: undefined })}>
              <span className="cursor-pointer">
                <Pill tone="brand" active={!status}>
                  Any
                </Pill>
              </span>
            </Link>

            {statuses.map((s) => {
              const isActive = status === s;
              return (
                <Link key={s} href={buildHref({ ...baseParams, status: s })} aria-current={isActive ? "page" : undefined}>
                  <span className="cursor-pointer">
                    <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                      {s}
                    </Pill>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stack pills */}
        <div className="mt-5">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Stack
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href={buildHref({ ...baseParams, stack: undefined })}>
              <span className="cursor-pointer">
                <Pill tone="brand" active={!stack}>
                  Any
                </Pill>
              </span>
            </Link>

            {allStacks.map((st) => {
              const isActive = stack === st;
              return (
                <Link key={st} href={buildHref({ ...baseParams, stack: st })} aria-current={isActive ? "page" : undefined}>
                  <span className="cursor-pointer">
                    <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                      {st}
                    </Pill>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Current state row */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
          <span>
            Showing <b style={{ color: "hsl(var(--fg))" }}>{items.length}</b> results
          </span>
          {featuredOnly ? (
            <span>
              • <b style={{ color: "hsl(var(--fg))" }}>Featured only</b>
            </span>
          ) : null}
          {tag ? (
            <span>
              • Tag: <b style={{ color: "hsl(var(--fg))" }}>{tag}</b>
            </span>
          ) : null}
          {status ? (
            <span>
              • Status: <b style={{ color: "hsl(var(--fg))" }}>{status}</b>
            </span>
          ) : null}
          {stack ? (
            <span>
              • Stack: <b style={{ color: "hsl(var(--fg))" }}>{stack}</b>
            </span>
          ) : null}
          {q ? (
            <span>
              • Query: <b style={{ color: "hsl(var(--fg))" }}>{q}</b>
            </span>
          ) : null}
        </div>
      </div>

      {/* Results */}
      {items.length === 0 ? (
        <div className="section-tint mt-8 rounded-2xl p-8">
          <h2 className="text-lg font-semibold">No results</h2>
          <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
            Try clearing a filter or using a different search term.
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
