import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { WeightName } from "@/components/site/WeightName";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { ContactForm } from "@/components/site/ContactForm";

export default function HomePage() {
  const { profile, about, facts, services, skills, projects, recognition } = portfolio;

  return (
    <>
      {/* Hero */}
      <section className="bg-cobalt text-white">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 md:pb-16 md:pt-16">
          <div className="hero-in">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[15px]">
              <span aria-hidden="true" className="size-2 rounded-full bg-butter" />
              {profile.availability}
            </p>
            <div className="mt-6 -ml-1">
              <WeightName lines={[profile.first, profile.last]} />
            </div>
            <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <p className="max-w-[34ch] text-xl leading-snug md:text-2xl">
                {profile.title} in {profile.location.split(",")[0]}. {profile.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-full bg-butter px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  See the work
                </Link>
                <Link
                  href="/resume"
                  className="rounded-full border border-white/60 px-6 py-3 font-medium transition-colors hover:bg-white hover:text-cobalt"
                >
                  Read the resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
          <div>
            <h2 id="about-h" className="display text-5xl font-semibold md:text-7xl">About</h2>
            <dl className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-3 text-[15px]">
                  <dt className="text-white/65">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="prose-serif space-y-5 text-white/90">
            {about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Services + skills */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28" aria-labelledby="do-h">
        <h2 id="do-h" className="display text-5xl font-semibold md:text-7xl">What I do</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="border-t-4 border-cobalt pt-5">
              <h3 className="text-2xl font-semibold tracking-tight">{s.name}</h3>
              <p className="prose-serif mt-3 text-[1.0625rem]">{s.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-20 text-2xl font-semibold tracking-tight">Tools and skills</h3>
        <div className="mt-6 grid gap-x-10 gap-y-8 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group}>
              <h4 className="font-semibold">{g.group}</h4>
              <ul className="mt-2 space-y-1 text-mute">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
              <span className="col-span-2 text-mute sm:col-span-1 sm:order-2">{r.issuer}</span>
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
