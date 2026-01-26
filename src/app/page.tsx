// src/app/page.tsx
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HashScroll } from "@/components/site/HashScroll";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      {/* Client helper: handles /#hash scrolling smoothly (you already have this file) */}
      <HashScroll />

      <main className="py-10 md:py-14">
        <Container>
          {/* HERO */}
          <section
            id="home"
            className="section-tint relative overflow-hidden rounded-3xl border p-6 md:p-10"
          >
            {/* Subtle gradient wash */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(1200px 600px at 20% 10%, hsl(var(--brand) / 0.28), transparent 60%), radial-gradient(900px 500px at 90% 20%, hsl(var(--accent-b) / 0.20), transparent 55%)",
              }}
            />

            <div className="relative">
              <div
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "hsl(var(--brand) / 0.12)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--fg))",
                }}
              >
                Product-style portfolio • backend-ready structure
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Hi, I’m{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {portfolio.profile.name}
                </span>
              </h1>

              <p
                className="mt-4 max-w-2xl text-sm md:text-base"
                style={{ color: "hsl(var(--muted-fg))" }}
              >
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

              <div className="mt-6 flex flex-wrap gap-3">
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

                <Link href="/projects">
                  <Button variant="outline" className="rounded-xl">
                    View Projects
                  </Button>
                </Link>

                <Link href="/resume">
                  <Button variant="ghost" className="rounded-xl">
                    Resume
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="mt-12 md:mt-16">
            <SectionHeader
              eyebrow="About"
              title="A builder mindset, product-quality execution"
              description={portfolio.about.bio}
            />

            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.about.details.map((d) => (
                <Card key={d.label} className="section-tint rounded-2xl border p-5">
                  <div
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "hsl(var(--muted-fg))" }}
                  >
                    {d.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold">{d.value}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="mt-12 md:mt-16">
            <SectionHeader
              eyebrow="Skills"
              title="Strong fundamentals, modern tooling"
              description="Categories + chips to keep it scannable and hiring-friendly."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.skills.map((cat) => (
                <Card key={cat.category} className="section-tint rounded-2xl border p-5">
                  <div className="text-sm font-semibold">{cat.category}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((it) => (
                      <span
                        key={it.label}
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: "hsl(var(--brand) / 0.10)",
                          border: "1px solid hsl(var(--border))",
                          color: "hsl(var(--fg))",
                        }}
                      >
                        {it.label}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" className="mt-12 md:mt-16">
            <SectionHeader
              eyebrow="Education"
              title="Built through structured learning"
              description="Keep it clean: program, timeframe, highlights."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.education.map((e) => (
                <Card key={e.school} className="section-tint rounded-2xl border p-5">
                  <div className="text-sm font-semibold">{e.school}</div>
                  <div className="mt-1 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {e.program} • {e.period}
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="mt-12 md:mt-16">
            <SectionHeader
              eyebrow="Experience"
              title="Outcome-focused work"
              description="This becomes a timeline later. For now: clean cards."
            />

            <div className="grid gap-4">
              {portfolio.experience.map((x) => (
                <Card key={`${x.company}-${x.role}`} className="section-tint rounded-2xl border p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold">{x.role}</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                      {x.period}
                    </div>
                  </div>
                  <div className="mt-1 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {x.company}
                  </div>
                  <p className="mt-3 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {x.summary}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" className="mt-12 md:mt-16">
            <SectionHeader
              eyebrow="Achievements"
              title="Proof of progress"
              description="Awards, milestones, certifications — scannable and credible."
            />

            <Card className="section-tint rounded-2xl border p-5">
              <ul className="space-y-3">
                {portfolio.achievements.map((a) => (
                  <li key={a.title} className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                      {a.issuer} • {a.date}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mt-12 md:mt-16 pb-8">
            <SectionHeader
              eyebrow="Contact"
              title="Let’s build something real"
              description="Form wiring comes next (React Hook Form + Zod + toast states)."
            />

            <Card className="section-tint rounded-2xl border p-5">
              <div className="text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                Email:{" "}
                <a className="font-semibold underline underline-offset-4" href={`mailto:${portfolio.profile.email}`}>
                  {portfolio.profile.email}
                </a>
              </div>
            </Card>
          </section>
        </Container>
      </main>
    </>
  );
}
