"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useScrollSpy(homeSections.map((s) => s.id));

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "linear-gradient(180deg, hsl(var(--card) / 0.92), hsl(var(--card) / 0.70))",
        borderColor: "hsl(var(--border))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
              color: "hsl(var(--brand-fg))",
            }}
          >
            P26
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{portfolio.profile.name}</div>
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
                      border: pathname === p.href ? "1px solid hsl(var(--border))" : "1px solid transparent",
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Menu className="mr-2 h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
              <div className="mt-6 space-y-2">
                {(onHome ? homeSections.map((s) => ({ href: `#${s.id}`, label: s.label })) : pages).map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="block rounded-xl px-3 py-2 text-sm"
                    style={{
                      background: "hsl(var(--card) / 0.75)",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--fg))",
                    }}
                  >
                    {i.label}
                  </a>
                ))}

                <div className="pt-4">
                  <Link href="/projects">
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
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
