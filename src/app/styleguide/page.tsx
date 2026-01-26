import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Styleguide",
};

export default function StyleguidePage() {
  return (
    <Container className="py-10 md:py-14">
      <SectionHeader
        eyebrow="Developer Support"
        title="Styleguide"
        description="Design tokens preview + component gallery. This page exists to make contributions and future backend integration easier."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Brand", value: "hsl(var(--brand))" },
          { label: "Accent A", value: "hsl(var(--accent-a))" },
          { label: "Accent B", value: "hsl(var(--accent-b))" },
        ].map((c) => (
          <Card key={c.label} className="section-tint rounded-2xl p-5">
            <div className="text-sm font-semibold">{c.label}</div>
            <div className="mt-3 h-10 w-full rounded-xl" style={{ background: c.value }} />
            <div className="mt-3 text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
              {c.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="section-tint rounded-2xl p-6">
          <div className="text-sm font-semibold">Buttons + Badges</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              className="rounded-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                color: "hsl(var(--brand-fg))",
              }}
            >
              Primary
            </Button>
            <Button variant="outline" className="rounded-xl">Outline</Button>
            <Button variant="ghost" className="rounded-xl">Ghost</Button>
            <Badge className="rounded-full" style={{ background: "hsl(var(--brand) / 0.12)", color: "hsl(var(--fg))" }}>
              Chip
            </Badge>
          </div>
        </Card>

        <Card className="section-tint rounded-2xl p-6">
          <div className="text-sm font-semibold">Inputs</div>
          <div className="mt-4 space-y-3">
            <Input className="rounded-xl" placeholder="Input" />
            <Textarea className="rounded-xl" placeholder="Textarea" />
          </div>
        </Card>
      </div>

      <Card className="section-tint mt-10 rounded-2xl p-6">
        <div className="text-sm font-semibold">Contribution Notes</div>
        <ul className="mt-3 list-disc pl-5 text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
          <li>Server components by default; client only for scrollspy/localStorage/forms.</li>
          <li>Tokens live in <code>globals.css</code> (swap theme without refactoring components).</li>
          <li>Content lives in <code>src/data/portfolio.ts</code> (backend swap later).</li>
        </ul>
      </Card>
    </Container>
  );
}
