import { allTags, portfolio } from "@/data/portfolio";
import { ProjectGrid } from "@/components/site/ProjectGrid";

export const metadata = { title: "Work" };

type Props = { searchParams: Promise<{ tag?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const initialTag = tag && allTags.includes(tag) ? tag : undefined;

  return (
    <div className="on-paper mx-auto max-w-6xl px-5 py-14 md:py-20">
      <h1 className="display text-6xl font-semibold md:text-8xl">Work</h1>
      <p className="prose-serif mt-5">
        Product interfaces, design systems and sites from the last few years. Pick a topic to narrow the list.
      </p>
      <ProjectGrid projects={portfolio.projects} tags={allTags} initialTag={initialTag} />
    </div>
  );
}
