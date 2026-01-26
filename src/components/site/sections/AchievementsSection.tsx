import { portfolio } from "@/data/portfolio";
import { SectionHeader } from "@/components/site/SectionHeader";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-10 md:py-14">
      <SectionHeader title="Achievements" />

      <div className="grid gap-3">
        {portfolio.achievements.map((a) => (
          <div key={`${a.title}-${a.date}`} className="section-tint rounded-2xl px-5 py-4">
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
  );
}
