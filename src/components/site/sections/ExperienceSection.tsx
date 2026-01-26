import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/site/SectionHeader";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-10 md:py-14">
      <SectionHeader title="Experience" />

      <div className="grid gap-4">
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
  );
}
