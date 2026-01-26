// src/app/projects/page.tsx
import Link from "next/link";
import { Search, X } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Pill } from "@/components/site/Pill";
import { GradientBorderCard } from "@/components/site/GradientBorderCard";

type SPValue = string | string[] | undefined;

type SearchParams = {
  q?: SPValue;
  tag?: SPValue;
  sort?: SPValue;
  status?: SPValue;
  stack?: SPValue;
  featured?: SPValue; // "1"
};

type Props = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

/** normalize: string | string[] | undefined -> string */
function asString(v: SPValue, fallback = "") {
  if (Array.isArray(v)) return (v[0] ?? fallback).toString();
  if (typeof v === "string") return v;
  return fallback;
}

function buildHref(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string" && v.trim().length) sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `/projects?${qs}` : "/projects";
}

export default async function ProjectsPage({ searchParams }: Props) {
  const raw = searchParams ? await Promise.resolve(searchParams) : {};

  // ✅ Safe normalized params
  const q = asString(raw.q).trim();
  const qLower = q.toLowerCase();

  const tag = asString(raw.tag).trim();
  const sort = asString(raw.sort, "featured").trim();

  const status = asString(raw.status).trim();
  const stack = asString(raw.stack).trim();
  const featuredOnly = asString(raw.featured) === "1";

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

        {/* Search + Sort */}
        <form method="get" className="mt-4 grid gap-3">
          {/* ✅ Preserve current pill state when pressing Apply/Search */}
          {tag ? <input type="hidden" name="tag" value={tag} /> : null}
          {status ? <input type="hidden" name="status" value={status} /> : null}
          {stack ? <input type="hidden" name="stack" value={stack} /> : null}
          {sort ? <input type="hidden" name="sort" value={sort} /> : null}

          {/* =========================
              Row 1: Search only (full width)
            ========================= */}
          <div className="flex w-full gap-2">
            <Input
              name="q"
              defaultValue={q}
              placeholder="Search by name, tags, stack, status…"
              className="h-10 flex-1 rounded-xl"
            />

            <Button
              type="submit"
              className="h-10 rounded-xl px-3"
              aria-label="Search"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              <Search className="h-4 w-4" />
            </Button>

            {hasAnyFilter ? (
              <Link scroll={false} href="/projects" aria-label="Clear filters">
                <Button type="button" variant="outline" className="h-10 rounded-xl px-3">
                  <X className="h-4 w-4" />
                </Button>
              </Link>
            ) : null}
          </div>

          {/* =========================
              Row 2: Sort + Featured + Apply (aligned)
            ========================= */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Left side: Sort takes remaining space */}
            <select
              name="sort"
              defaultValue={sort}
              className="h-10 w-full rounded-xl border px-3 text-sm sm:flex-1"
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

            {/* Right side: Featured + Apply (always same row on >=sm) */}
            <div className="flex items-center gap-2 sm:shrink-0">
              <label
                className="flex h-10 items-center gap-2 rounded-xl border px-3 text-sm"
                style={{
                  borderColor: "hsl(var(--border))",
                  background: "hsl(var(--card) / 0.75)",
                }}
              >
                <input
                  type="checkbox"
                  name="featured"
                  value="1"
                  defaultChecked={featuredOnly}
                  className="h-4 w-4"
                />
                <span className="whitespace-nowrap">Featured only</span>
              </label>

              <Button
                type="submit"
                className=" scroll={false} h-10 rounded-xl px-5"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                  color: "hsl(var(--brand-fg))",
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </form>



        {/* Toggles */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link scroll={false} href={buildHref({ ...baseParams, featured: featuredOnly ? undefined : "1" })} className="inline-block">
            <Pill tone={featuredOnly ? "accent" : "neutral"} active={featuredOnly}>
              Featured only
            </Pill>
          </Link>

          {hasAnyFilter ? (
            <Link href="/projects" className="inline-block">
              <Pill tone="neutral">Clear all</Pill>
            </Link>
          ) : null}
        </div>

        {/* Tags */}
        <div className="mt-4">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Tags
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link scroll={false} href={buildHref({ ...baseParams, tag: undefined })} className="inline-block">
              <Pill tone="brand" active={!tag}>
                All
              </Pill>
            </Link>

            {allTags.map((t) => {
              const isActive = tag === t;
              return (
                <Link scroll={false} key={t} href={buildHref({ ...baseParams, tag: t })} className="inline-block">
                  <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                    {t}
                  </Pill>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div className="mt-5">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Status
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link scroll={false} href={buildHref({ ...baseParams, status: undefined })} className="inline-block">
              <Pill tone="brand" active={!status}>
                Any
              </Pill>
            </Link>

            {statuses.map((s) => {
              const isActive = status === s;
              return (
                <Link scroll={false} key={s} href={buildHref({ ...baseParams, status: s })} className="inline-block">
                  <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                    {s}
                  </Pill>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stack */}
        <div className="mt-5">
          <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            Stack
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link scroll={false} href={buildHref({ ...baseParams, stack: undefined })} className="inline-block">
              <Pill tone="brand" active={!stack}>
                Any
              </Pill>
            </Link>

            {allStacks.map((st) => {
              const isActive = stack === st;
              return (
                <Link scroll={false} key={st} href={buildHref({ ...baseParams, stack: st })} className="inline-block">
                  <Pill tone={isActive ? "accent" : "neutral"} active={isActive}>
                    {st}
                  </Pill>
                </Link>
              );
            })}
          </div>
        </div>

        {/* State line */}
        <div className="mt-5 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
          Showing <b style={{ color: "hsl(var(--fg))" }}>{items.length}</b> results
          {q ? (
            <>
              {" "}
              • Query: <b style={{ color: "hsl(var(--fg))" }}>{q}</b>
            </>
          ) : null}
          {tag ? (
            <>
              {" "}
              • Tag: <b style={{ color: "hsl(var(--fg))" }}>{tag}</b>
            </>
          ) : null}
          {status ? (
            <>
              {" "}
              • Status: <b style={{ color: "hsl(var(--fg))" }}>{status}</b>
            </>
          ) : null}
          {stack ? (
            <>
              {" "}
              • Stack: <b style={{ color: "hsl(var(--fg))" }}>{stack}</b>
            </>
          ) : null}
          {featuredOnly ? <> • <b style={{ color: "hsl(var(--fg))" }}>Featured only</b></> : null}
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
            <Link scroll={false} href="/projects">
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
