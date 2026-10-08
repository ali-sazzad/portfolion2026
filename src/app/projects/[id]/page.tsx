import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, portfolio } from "@/data/portfolio";
import { ProjectThumb } from "@/components/site/ProjectThumb";
import { ParallaxCover } from "@/components/site/ParallaxCover";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return portfolio.projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = getProject(id);
  return p ? { title: p.name, description: p.pitch } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();

  const i = portfolio.projects.indexOf(p);
  const next = portfolio.projects[(i + 1) % portfolio.projects.length];

  const sections = [
    { h: "The problem", t: p.problem },
    { h: "What I did", t: p.approach },
    { h: "The result", t: p.result },
  ];

  return (
    <article className="on-paper">
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:pt-20">
        <Link href="/projects" className="text-mute underline underline-offset-4 hover:text-ink">
          All work
        </Link>
        <h1 className="display mt-6 text-6xl font-semibold md:text-8xl">{p.name}</h1>
        <p className="mt-5 max-w-[40ch] text-xl md:text-2xl">{p.pitch}</p>
      </header>

      <div className="mx-auto max-w-6xl px-5">
        <ParallaxCover>
          <ProjectThumb project={p} />
        </ParallaxCover>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[260px_1fr] md:py-20">
        <dl className="space-y-5 text-[15px]">
          {[
            ["Type", p.discipline],
            ["Year", String(p.year)],
            ["Status", p.status],
            ["Built with", p.stack.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-mute">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          {(p.links.live || p.links.github) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                  Visit site
                </a>
              )}
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                  View code
                </a>
              )}
            </div>
          )}
        </dl>

        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-semibold tracking-tight">{s.h}</h2>
              <p className="prose-serif mt-3">{s.t}</p>
            </section>
          ))}
        </div>
      </div>

      <Link href={`/projects/${next.id}`} className="block bg-ink text-white transition-colors hover:bg-cobalt">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-white/70">Next project</p>
          <p className="display mt-2 text-5xl font-semibold md:text-7xl">{next.name}</p>
        </div>
      </Link>
    </article>
  );
}
