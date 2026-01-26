import * as React from "react";

export function Pill({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "accent";
  className?: string;
}) {
  const style =
    tone === "brand"
      ? {
          background: "hsl(var(--brand) / 0.12)",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--fg))",
        }
      : tone === "accent"
      ? {
          background: "hsl(var(--accent-b) / 0.12)",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--fg))",
        }
      : {
          background: "hsl(var(--card) / 0.7)",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--muted-fg))",
        };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
