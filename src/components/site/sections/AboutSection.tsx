import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/site/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="section reveal reveal-delay-1">
      <div className="section-tint rounded-2xl p-6 md:p-10">
        <SectionHeader title="About" description={portfolio.about.bio} />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {portfolio.about.details.map((d) => (
            <Card
              key={d.label}
              className="rounded-xl p-4 lift"
              style={{
                background: "hsl(var(--card) / 0.65)",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <div className="text-xs font-semibold" style={{ color: "hsl(var(--muted-fg))" }}>
                {d.label}
              </div>
              <div className="mt-1 text-sm font-medium">{d.value}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
