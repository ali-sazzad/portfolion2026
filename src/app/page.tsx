import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Hero } from "@/components/site/Hero";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { AboutReveal } from "@/components/site/AboutReveal";
import { Stats } from "@/components/site/Stats";
import { ServiceList } from "@/components/site/ServiceList";
import { SkillsMarquee } from "@/components/site/SkillsMarquee";
import { ContactForm } from "@/components/site/ContactForm";

export default function HomePage() {
  const { profile, about, facts, services, skills, projects, recognition, stats } = portfolio;
  const allSkills = skills.flatMap((g) => g.items);

  return (
    <>
      <Hero />

      {/* Work */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28" aria-labelledby="work-h">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="work-h" className="display text-5xl font-semibold md:text-7xl">Selected work</h2>
          <Link href="/projects" className="shrink-0 pb-2 font-medium underline underline-offset-4 hover:text-cobalt">
            All projects
          </Link>
        </div>
        <ProjectIndex projects={projects.filter((p) => p.featured)} />
      </section>

      {/* About */}
      <section id="about" className="bg-ink text-white" aria-labelledby="about-h">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 id="about-h" className="text-xl font-semibold text-butter">About</h2>
          <div className="mt-8">
            <AboutReveal statement={about[0]} />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <dl className="divide-y divide-white/15 self-start border-y border-white/15">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-3 text-[15px]">
                  <dt className="text-white/65">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="prose-serif space-y-5 text-white/90">
              {about.slice(1).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <Stats stats={stats} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28" aria-labelledby="do-h">
        <h2 id="do-h" className="display mb-10 text-5xl font-semibold md:text-7xl">What I do</h2>
        <ServiceList services={services} />
      </section>

      {/* Skills */}
      <section className="overflow-hidden pb-20 md:pb-28" aria-labelledby="skills-h">
        <h2 id="skills-h" className="sr-only">Tools and skills</h2>
        <SkillsMarquee items={allSkills} />
        <ul className="sr-only">
          {allSkills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* Recognition */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28" aria-labelledby="rec-h">
        <h2 id="rec-h" className="text-2xl font-semibold tracking-tight">Recognition</h2>
        <ul className="mt-4 border-t border-ink">
          {recognition.map((r) => (
            <li
              key={r.title}
              className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-line py-4 sm:grid-cols-[1.4fr_1fr_60px]"
            >
              <span className="font-medium">{r.title}</span>
              <span className="text-right tabular-nums text-mute sm:order-3">{r.year}</span>
              <span className="col-span-2 text-mute sm:order-2 sm:col-span-1">{r.issuer}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-butter" aria-labelledby="contact-h">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h2 id="contact-h" className="display text-5xl font-semibold md:text-7xl">
              Let&rsquo;s build something clear.
            </h2>
            <p className="prose-serif mt-6">
              Tell me what you&rsquo;re making and when you need it. I reply to every message within two working days.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block text-xl font-semibold underline underline-offset-4 hover:text-cobalt"
            >
              {profile.email}
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
