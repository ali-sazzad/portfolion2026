"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { useScrollSpy } from "@/lib/scrollspy";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const homeSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const pages = [
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/styleguide", label: "Styleguide" },
];

function NavPill({
  active,
  children,
  href,
}: {
  active?: boolean;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-sm transition"
      style={{
        color: active ? "hsl(var(--fg))" : "hsl(var(--muted-fg))",
        background: active ? "hsl(var(--brand) / 0.14)" : "transparent",
        border: active ? "1px solid hsl(var(--border))" : "1px solid transparent",
      }}
    >
      {children}
    </a>
  );
}

function SheetItem({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl px-3 py-3 text-left text-sm transition"
      style={{
        background: active ? "hsl(var(--brand) / 0.14)" : "hsl(var(--card) / 0.80)",
        border: "1px solid hsl(var(--border))",
        color: "hsl(var(--fg))",
      }}
    >
      {label}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const activeSection = useScrollSpy(homeSections.map((s) => s.id));
  const [open, setOpen] = useState(false);

  const pageItems = useMemo(() => pages, []);
  const sectionItems = useMemo(() => homeSections, []);

function afterSheetClose(fn: () => void) {
  setOpen(false);
  // wait for sheet close + body unlock on mobile
  window.setTimeout(fn, 280);
}

function goToSectionOnHome(id: string) {
  afterSheetClose(() => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function goToSectionFromOtherPage(id: string) {
  afterSheetClose(() => {
    // navigate to home with hash (HashScroll will handle it)
    router.push(id === "home" ? "/" : `/#${id}`);
  });
}


  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "linear-gradient(180deg, hsl(var(--card) / 0.92), hsl(var(--card) / 0.78))",
        borderColor: "hsl(var(--border))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
<Link
  href="/"
  scroll={true}
  onClick={(e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }}
  className="flex min-w-0 items-center gap-2"
>
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
              color: "hsl(var(--brand-fg))",
            }}
          >
            SA26
          </span>

          <div className="min-w-0 leading-tight">
            <div className="text-sm font-semibold">{portfolio.profile.name}</div>

            {/* Hide long title on tiny screens so header doesn't wrap */}
            <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
            {portfolio.profile.title}
            </div>

          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {onHome
            ? homeSections.map((s) => (
                <NavPill key={s.id} href={`#${s.id}`} active={activeSection === s.id}>
                  {s.label}
                </NavPill>
              ))
            : pages.map((p) => (
                <Link key={p.href} href={p.href}>
                  <span
                    className="rounded-full px-3 py-2 text-sm transition"
                    style={{
                      color: pathname === p.href ? "hsl(var(--fg))" : "hsl(var(--muted-fg))",
                      background: pathname === p.href ? "hsl(var(--brand) / 0.14)" : "transparent",
                      border:
                        pathname === p.href
                          ? "1px solid hsl(var(--border))"
                          : "1px solid transparent",
                    }}
                  >
                    {p.label}
                  </span>
                </Link>
              ))}

          <Separator orientation="vertical" className="mx-2 h-6" />

          <Link href="/projects">
            <Button
              className="rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              Explore
            </Button>
          </Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="shrink-0 rounded-xl">
                <Menu className="mr-2 h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] p-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--card) / 0.98), hsl(var(--card) / 0.94))",
                borderLeft: "1px solid hsl(var(--border))",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* ✅ Flex column so it doesn't look empty on pages with few items */}
              <div className="flex h-full flex-col p-5">
                <div>
                  <div className="text-sm font-semibold">Navigation</div>
                  <div className="mt-1 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    Pages + jump to home sections
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 flex-1 space-y-4 overflow-auto pr-1">
                  {/* Pages (always) */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--muted-fg))" }}>
                      Pages
                    </div>

                    {pageItems.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setOpen(false)}
                        className="block"
                      >
                        <div
                          className="rounded-xl px-3 py-3 text-sm transition"
                          style={{
                            background: pathname === p.href ? "hsl(var(--brand) / 0.14)" : "hsl(var(--card) / 0.80)",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--fg))",
                          }}
                        >
                          {p.label}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Sections (always) */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--muted-fg))" }}>
                      Home sections
                    </div>

                    {sectionItems.map((s) => (
                      <SheetItem
                        key={s.id}
                        label={s.label}
                        active={onHome ? activeSection === s.id : false}
                        onClick={() => (onHome ? goToSectionOnHome(s.id) : goToSectionFromOtherPage(s.id))}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom CTA always pinned */}
                <div className="mt-5 space-y-3">
                  <Link href="/projects" onClick={() => setOpen(false)}>
                    <Button
                      className="w-full rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                        color: "hsl(var(--brand-fg))",
                      }}
                    >
                      Explore Projects
                    </Button>
                  </Link>

                  <a
                    href={`mailto:${portfolio.profile.email}`}
                    onClick={() => setOpen(false)}
                    className="block mt-2 text-center text-xs font-semibold"
                    style={{ color: "hsl(var(--muted-fg))" }}
                  >
                    {portfolio.profile.email}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
