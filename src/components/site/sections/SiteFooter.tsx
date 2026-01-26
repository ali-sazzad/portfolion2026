import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="pb-12 pt-6">
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-t pt-6"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
          © {new Date().getFullYear()} {portfolio.profile.name}. Built with Next.js + shadcn/ui.
        </div>
        <div className="flex items-center gap-3 text-sm">
          <a href={portfolio.profile.socials.github} style={{ color: "hsl(var(--brand))" }}>
            GitHub
          </a>
          <a href={portfolio.profile.socials.linkedin} style={{ color: "hsl(var(--brand))" }}>
            LinkedIn
          </a>
          <a href="#home" style={{ color: "hsl(var(--brand))" }}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
