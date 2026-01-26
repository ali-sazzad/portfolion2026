export function SectionHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <div
          className="text-xs font-semibold tracking-wide uppercase"
          style={{ color: "hsl(var(--muted-fg))" }}
        >
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm md:text-base" style={{ color: "hsl(var(--muted-fg))" }}>
          {description}
        </p>
      ) : null}

      <div
        className="mt-4 h-0.5 w-24 rounded-full"
        style={{
          background: "linear-gradient(90deg, hsl(var(--brand)), hsl(var(--accent-b)))",
        }}
      />
    </div>
  );
}
