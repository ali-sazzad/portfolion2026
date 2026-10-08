import { portfolio } from "@/data/portfolio";
import { Hero } from "@/components/site/Hero";
import { Ribbon } from "@/components/site/Ribbon";
import { WorkStrip } from "@/components/site/WorkStrip";
import { AboutReveal } from "@/components/site/AboutReveal";
import { Stats } from "@/components/site/Stats";
import { ServiceStack } from "@/components/site/ServiceStack";
import { ExperiencePath } from "@/components/site/ExperiencePath";
import { StickerBoard } from "@/components/site/StickerBoard";
import { ContactForm } from "@/components/site/ContactForm";

export default function HomePage() {
  const { profile, about, facts, services, skills, projects, recognition, stats, experience } = portfolio;

  return (
    <>
      <Hero />
      <Ribbon words={["Design systems", "Product interfaces", "Motion", "Accessible by default", "Fast sites"]} />

      <WorkStrip projects={projects} />

      {/* About */}
      <section id="about" className="contour relative bg-ink text-white" aria-labelledby="about-h">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <h2 id="about-h" className="text-xl font-semibold text-butter">About</h2>
          <div className="mt-8">
            <AboutReveal statement={about[0]} />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <dl className="self-start rounded-3xl border border-white/20 bg-white/5 px-6 py-2 backdrop-blur-sm">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 border-b border-white/10 py-4 text-[15px] last:border-0">
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
      <section className="mx-auto max-w-6xl px-5 pt-24 md:pt-32" aria-labelledby="do-h">
        <h2 id="do-h" className="display mb-12 text-5xl font-semibold md:text-7xl">What I do</h2>
        <ServiceStack services={services} />
      </section>

      {/* Experience */}
      <section className="bg-white" aria-labelledby="exp-h">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <h2 id="exp-h" className="display mb-14 text-5xl font-semibold md:text-7xl">Where I&rsquo;ve worked</h2>
          <ExperiencePath jobs={experience} />
        </div>
      </section>

      {/* Skills */}
      <section className="px-5 py-24 md:py-32" aria-labelledby="skills-h">
        <div className="mx-auto mb-10 max-w-6xl">
          <h2 id="skills-h" className="display text-5xl font-semibold md:text-7xl">Toolbox</h2>
          <p className="mt-4 text-mute">Pick one up and move it around.</p>
        </div>
        <StickerBoard groups={skills} />
      </section>

      {/* Recognition */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32" aria-labelledby="rec-h">
        <h2 id="rec-h" className="display mb-8 text-5xl font-semibold md:text-7xl">Recognition</h2>
        <ul className="border-t-2 border-ink">
          {recognition.map((r) => (
            <li
              key={r.title}
              tabIndex={0}
              className="award grid grid-cols-[1fr_auto] gap-x-6 border-b border-ink/20 px-3 py-6 sm:grid-cols-[1.4fr_1fr_60px]"
            >
              <span className="display text-2xl font-medium md:text-3xl">{r.title}</span>
              <span className="award-sub text-right tabular-nums text-mute sm:order-3">{r.year}</span>
              <span className="award-sub col-span-2 text-mute sm:order-2 sm:col-span-1">{r.issuer}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="contour-dark relative overflow-hidden bg-butter" aria-labelledby="contact-h">
        <div aria-hidden="true" className="display pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap text-[26vw] font-semibold leading-none text-ink/[0.06]">
          Say hello
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 md:grid-cols-[1fr_1.05fr] md:py-32">
          <div>
            <h2 id="contact-h" className="display text-5xl font-semibold md:text-7xl">
              Let&rsquo;s build something clear.
            </h2>
            <p className="prose-serif mt-6">
              Tell me what you&rsquo;re making and when you need it. I reply to every message within two working days.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block break-all text-xl font-semibold underline underline-offset-4 hover:text-cobalt"
            >
              {profile.email}
            </a>
          </div>
          <div className="rotate-1 rounded-3xl border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_#0f1222] transition-transform duration-300 focus-within:rotate-0 md:p-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
