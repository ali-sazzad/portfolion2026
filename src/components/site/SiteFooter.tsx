import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  const { name, socials, location } = portfolio.profile;
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-mute md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {name}. Based in {location}.
        </p>
        <ul className="flex gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-mute">
        This is a sample portfolio. The person, employers and projects shown are fictional.
      </p>
    </footer>
  );
}
