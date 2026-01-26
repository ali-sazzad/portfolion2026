import { Card } from "@/components/ui/card";

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export function ExperienceTimeline({ items }: { items: readonly ExperienceItem[] }) {
  return (
    <ol className="relative mt-6 space-y-4 md:space-y-6">
      {/* Rail line (shows on all sizes) */}
      <div
        aria-hidden="true"
        className="absolute left-1.5 top-0 h-full w-px md:left-4.5"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(var(--brand) / 0.55), hsl(var(--accent-b) / 0.45), transparent)",
        }}
      />

      {items.map((x, idx) => (
        <li key={`${x.company}-${x.period}-${idx}`} className="relative pl-10 md:pl-16">
          {/* Dot (mobile = small, desktop = larger) */}
          <div className="absolute left-0 top-6">
            {/* Desktop dot */}
            <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--brand) / 0.18), hsl(var(--accent-b) / 0.12))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                }}
              />
            </div>

            {/* Mobile dot */}
            <div
              className="md:hidden mt-1 h-3 w-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
                boxShadow: "0 0 0 4px hsl(var(--card) / 0.9)",
              }}
            />
          </div>

          <Card className="section-tint lift rounded-2xl p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3">
              <div>
                <div className="text-base font-semibold md:text-lg">{x.role}</div>
                <div className="mt-1 text-sm font-medium">{x.company}</div>
              </div>

              <div
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "hsl(var(--brand) / 0.12)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--fg))",
                }}
              >
                {x.period}
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
              {x.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {idx === 0 ? (
                <span
                  className="rounded-full px-3 py-1 text-xs"
                  style={{
                    background: "hsl(var(--accent-b) / 0.12)",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--fg))",
                  }}
                >
                  Recent
                </span>
              ) : null}

              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "hsl(var(--card) / 0.7)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--muted-fg))",
                }}
              >
                Product focus
              </span>

              <span
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: "hsl(var(--card) / 0.7)",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--muted-fg))",
                }}
              >
                UI engineering
              </span>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
