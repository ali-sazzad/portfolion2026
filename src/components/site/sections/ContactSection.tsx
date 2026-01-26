import { portfolio } from "@/data/portfolio";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";

export function ContactSection() {
  return (
    <section id="contact" className="section reveal reveal-delay-3">
      <div className="section-tint lift rounded-2xl p-6 md:p-10">
        <SectionHeader
          title="Contact"
          description="Form validation + draft persistence + simulated submit comes in Sprint 4."
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={`mailto:${portfolio.profile.email}`}>
            <Button
              className="rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
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
  );
}
