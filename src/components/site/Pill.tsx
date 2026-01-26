import * as React from "react";

export function Pill({
  children,
  tone = "neutral",
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "accent";
  active?: boolean;
  className?: string;
}) {
  const base =
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

  const activeStyle = active
    ? {
        boxShadow: `0 0 0 3px hsl(var(--brand) / 0.18)`,
        border: "1px solid hsl(var(--brand) / 0.35)",
        color: "hsl(var(--fg))",
      }
    : {};

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs transition ${active ? "font-semibold" : ""} ${className}`}
      style={{ ...base, ...activeStyle }}
    >
      {children}
    </span>
  );
}
