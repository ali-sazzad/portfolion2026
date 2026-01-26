import * as React from "react";

export function GradientBorderCard({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  if (!featured) {
    return (
      <div
        className={`section-tint rounded-2xl border p-6 ${className}`}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-px ${className}`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--brand)), hsl(var(--accent-b)))",
      }}
    >
      <div
        className="section-tint rounded-2xl p-6"
        style={{
          background: "hsl(var(--card) / 0.78)",
          border: "1px solid hsl(var(--border))",
        }}
      >
        {children}
      </div>
    </div>
  );
}
