import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/site/SectionHeader";

export function SkillsSection() {
  return (
    <section id="skills" className="section reveal reveal-delay-2">
      <SectionHeader
        title="Skills"
        description="Categories are data-driven from src/data/portfolio.ts."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {portfolio.skills.map((cat) => (
          <Card key={cat.category} className="section-tint lift rounded-2xl p-5">
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
  );
}
