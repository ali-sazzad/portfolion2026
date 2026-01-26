// src/components/site/SectionHeader.tsx
type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

export function SectionHeader({ title, description, eyebrow, className = "" }: Props) {
  return (
    <div className={`mb-4 ${className}`}>
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>

      {description ? (
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
          {description}
        </p>
      ) : null}

      {/* Decorative underline - NOT absolute, so it cannot block clicks */}
      <div className="mt-4 h-0.5 w-24 rounded-full" style={{ background: "hsl(var(--brand))" }} aria-hidden="true" />
    </div>
  );
}
