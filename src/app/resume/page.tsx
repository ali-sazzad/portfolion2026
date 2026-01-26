import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <Container className="py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
          <p className="mt-2" style={{ color: "hsl(var(--muted-fg))" }}>
            Print-friendly resume view. PDF download link is a placeholder for now.
          </p>
        </div>
        <div className="flex gap-3">
          <a href={portfolio.profile.resumeLink} target="_blank" rel="noreferrer">
            <Button
              className="rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              Download PDF
            </Button>
          </a>
          <Link href="/projects">
            <Button variant="outline" className="rounded-xl">Projects</Button>
          </Link>
        </div>
      </div>

      <Card className="section-tint mt-8 rounded-2xl p-6 md:p-10">
        <h2 className="text-xl font-semibold">{portfolio.profile.name}</h2>
        <div className="mt-1 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
          {portfolio.profile.title} • {portfolio.profile.location}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold">Summary</h3>
          <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
            {portfolio.profile.shortIntro}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold">Experience</h3>
            <div className="mt-3 space-y-4">
              {portfolio.experience.map((x) => (
                <div key={x.company}>
                  <div className="text-sm font-semibold">{x.role}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {x.company} • {x.period}
                  </div>
                  <p className="mt-1 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {x.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Education</h3>
            <div className="mt-3 space-y-4">
              {portfolio.education.map((e) => (
                <div key={e.school}>
                  <div className="text-sm font-semibold">{e.school}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
                    {e.program} • {e.period}
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
