"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

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

      {/* Motion: reading progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-cobalt"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="overflow-hidden border-t border-line bg-paper px-5 md:hidden"
          >
            <ul className="pb-6 pt-2 text-4xl font-semibold tracking-tight">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * i + 0.08, type: "spring", stiffness: 260, damping: 22 }}
                >
                  <Link href={l.href} className="block py-2" onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
