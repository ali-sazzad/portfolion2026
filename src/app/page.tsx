import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";


export default function HomePage() {
  const featured = portfolio.projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      
      {/* HERO */}
      <main id="home" className="mx-auto max-w-6xl px-4">
        <section className="py-14 md:py-20">
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

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Hi, I’m{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-b)))",
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
                <span
                  className="rotate-words font-semibold"
                  style={{ color: "hsl(var(--fg))" }}
                >
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
                      background:
                        "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
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

            <Card
              className="section-tint rounded-2xl p-6 md:p-8"
              style={{ background: "hsl(var(--card) / 0.75)" }}
            >
              <h2 className="text-sm font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
                What you’ll see here
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>• Clean routing (multi-page) + data-driven rendering</li>
                <li>• “Backend injection points” (future server actions / route handlers)</li>
                <li>• Color system + tokens (not random rainbow)</li>
                <li>• UX states + accessibility + performance-first habits</li>
              </ul>

              <div className="mt-6 rounded-xl p-4"
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

        {/* ABOUT */}
        <section id="about" className="py-10 md:py-14">
          <div className="section-tint rounded-2xl p-6 md:p-10">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="mt-3 max-w-3xl" style={{ color: "hsl(var(--muted-fg))" }}>
              {portfolio.about.bio}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {portfolio.about.details.map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "hsl(var(--card) / 0.65)",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
                    {d.label}
                  </div>
                  <div className="mt-1 text-sm font-medium">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
            Categories are data-driven from <code>src/data/portfolio.ts</code>.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {portfolio.skills.map((cat) => (
              <Card key={cat.category} className="section-tint rounded-2xl p-5">
                <div className="font-semibold">{cat.category}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <span
                      key={s.label}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "hsl(var(--brand) / 0.10)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {portfolio.education.map((e) => (
              <Card key={e.school} className="section-tint rounded-2xl p-6">
                <div className="text-sm font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
                  {e.period}
                </div>
                <div className="mt-1 text-lg font-semibold">{e.school}</div>
                <div className="mt-1 text-sm">{e.program}</div>
                <ul className="mt-4 list-disc pl-5 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="mt-6 grid gap-4">
            {portfolio.experience.map((x) => (
              <Card key={x.company} className="section-tint rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-lg font-semibold">{x.role}</div>
                  <div className="text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {x.period}
                  </div>
                </div>
                <div className="mt-1 text-sm font-medium">{x.company}</div>
                <p className="mt-3 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                  {x.summary}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* PROJECTS PREVIEW */}
        <section className="py-10 md:py-14">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <Link href="/projects" className="text-sm font-semibold"
              style={{ color: "hsl(var(--brand))" }}
            >
              View all →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featured.map((p) => (
              <Card key={p.id} className="section-tint rounded-2xl p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold">{p.name}</div>
                  <span className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {p.year}
                  </span>
                </div>
                <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                  {p.shortPitch}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: "hsl(var(--accent-b) / 0.10)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="py-10 md:py-14">
          <h2 className="text-2xl font-semibold">Achievements</h2>
          <div className="mt-6 grid gap-3">
            {portfolio.achievements.map((a) => (
              <div
                key={`${a.title}-${a.date}`}
                className="section-tint rounded-2xl px-5 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {a.date}
                  </div>
                </div>
                <div className="text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                  {a.issuer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT (form comes Sprint 4) */}
        <section id="contact" className="py-10 md:py-14">
          <div className="section-tint rounded-2xl p-6 md:p-10">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
              Form validation + simulated submission + draft persistence comes in Sprint 4.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${portfolio.profile.email}`}>
                <Button
                  className="rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                    color: "hsl(var(--brand-fg))",
                  }}
                >
                  Email Me
                </Button>
              </a>
              <Link href="/projects">
                <Button variant="outline" className="rounded-xl">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pb-12 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-6"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
              © {new Date().getFullYear()} {portfolio.profile.name}. Built with Next.js + shadcn/ui.
            </div>
            <div className="flex items-center gap-3 text-sm">
              <a href={portfolio.profile.socials.github} style={{ color: "hsl(var(--brand))" }}>
                GitHub
              </a>
              <a href={portfolio.profile.socials.linkedin} style={{ color: "hsl(var(--brand))" }}>
                LinkedIn
              </a>
              <a href="#home" style={{ color: "hsl(var(--brand))" }}>
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
