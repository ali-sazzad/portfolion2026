import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/site/SectionHeader";

export function EducationSection() {
  return (
    <section id="education" className="py-10 md:py-14">
      <SectionHeader title="Education" />

      <div className="grid gap-4 md:grid-cols-2">
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
  );
}
