import { portfolio } from "@/data/portfolio";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Pill } from "@/components/site/Pill";

export function SkillsSection() {
  return (
    <section id="skills" className="section reveal reveal-delay-2">
      <SectionHeader
        title="Skills"
        description="A structured, product-minded stack — grouped to show how I think, not just what I know."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {portfolio.skills.map((cat) => (
          <Card key={cat.category} className="section-tint lift rounded-2xl p-5">
            <div className="font-semibold">{cat.category}</div>

            <div className="mt-3 flex flex-wrap gap-2">
              {cat.items.map((s) => (
                <Pill key={s.label} tone="brand" className="transition hover:opacity-90">
                  {s.label}
                </Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
