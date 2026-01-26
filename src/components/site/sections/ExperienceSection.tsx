import { portfolio } from "@/data/portfolio";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ExperienceTimeline } from "@/components/site/ExperienceTimeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-10 md:py-14">
      <SectionHeader
        title="Experience"
        description="A quick timeline of roles and product-style work — built with a scalable, backend-ready mindset."
      />

      <ExperienceTimeline items={portfolio.experience} />
    </section>
  );
}
