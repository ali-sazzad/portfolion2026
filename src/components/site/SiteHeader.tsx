"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {portfolio.profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] md:flex">
          {links.map((l) => {
            const active = !l.href.includes("#") && pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="underline-offset-8 hover:underline aria-[current=page]:underline"
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="rounded-full bg-cobalt px-4 py-1.5 font-medium text-white transition-colors hover:bg-ink"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-[15px] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden">
          <ul className="text-3xl font-semibold tracking-tight">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
