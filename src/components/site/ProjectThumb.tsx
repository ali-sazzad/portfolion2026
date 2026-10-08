import type { Project } from "@/data/portfolio";

/** Generated cover art: a layered composition tinted by each project's hue. */
export function ProjectThumb({ project, className = "" }: { project: Project; className?: string }) {
  const h = project.hue;
  const a = `hsl(${h} 85% 58%)`;
  const b = `hsl(${(h + 40) % 360} 90% 72%)`;
  const dark = `hsl(${h} 60% 14%)`;
  const n = project.id.length;
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={`Cover art for ${project.name}`}
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={dark} />
      <circle cx={80 + (n % 5) * 40} cy="90" r="120" fill={a} />
      <rect x="170" y="110" width="260" height="220" rx="18" fill={b} transform={`rotate(${(n % 7) - 3} 300 220)`} />
      <rect x="196" y="140" width="150" height="14" rx="7" fill={dark} opacity=".85" />
      <rect x="196" y="166" width="104" height="14" rx="7" fill={dark} opacity=".5" />
      <rect x="196" y="192" width="128" height="14" rx="7" fill={dark} opacity=".3" />
      <circle cx="70" cy="236" r="34" fill="none" stroke={b} strokeWidth="6" />
    </svg>
  );
}
