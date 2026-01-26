import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section id="home" className="reveal section pt-14 md:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Badge
            className="rounded-full px-3 py-1"
            style={{
              background: "hsl(var(--brand) / 0.12)",
              color: "hsl(var(--fg))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            Product-style portfolio • backend-ready structure
          </Badge>

          <h1 className="mt-4 mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Hi, I’m{" "}
            <span
              style={{
                background: "linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {portfolio.profile.name}
            </span>
          </h1>

          <p className="mt-3 text-base md:text-lg" style={{ color: "hsl(var(--muted-fg))" }}>
            {portfolio.profile.shortIntro}
          </p>

          <p className="mt-4 text-sm md:text-base" style={{ color: "hsl(var(--muted-fg))" }}>
            I’m into{" "}
            <span className="rotate-words font-semibold" style={{ color: "hsl(var(--fg))" }}>
              {portfolio.heroRotatingPhrases.slice(0, 6).map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#contact">
              <Button
                className="rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                  color: "hsl(var(--brand-fg))",
                }}
              >
                Contact Me
              </Button>
            </a>

            <Link href="/resume">
              <Button variant="outline" className="rounded-xl">
                Resume
              </Button>
            </Link>

            <Link href="/styleguide">
              <Button variant="ghost" className="rounded-xl">
                Styleguide
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["WCAG-friendly", "App Router", "Reusable UI", "No-backend demo"].map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "hsl(var(--card) / 0.7)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--muted-fg))",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <Card className="section-tint rounded-2xl p-6 md:p-8" style={{ background: "hsl(var(--card) / 0.75)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
            What you’ll see here
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>• Clean routing (multi-page) + data-driven rendering</li>
            <li>• Backend injection points (server actions / route handlers ready)</li>
            <li>• Color system + tokens (not random rainbow)</li>
            <li>• UX states + accessibility + performance-first habits</li>
          </ul>

          <div
            className="mt-6 rounded-xl p-4"
            style={{
              background: "linear-gradient(135deg, hsl(var(--brand) / 0.14), hsl(var(--accent-a) / 0.10))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
              Location
            </div>
            <div className="mt-1 text-sm font-medium">{portfolio.profile.location}</div>
          </div>
        </Card>
      </div>
    </section>
  );
}
