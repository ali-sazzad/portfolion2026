import { portfolio } from "@/data/portfolio";
import { PrintButton } from "@/components/site/PrintButton";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  const { profile, experience, education, skills, recognition } = portfolio;

  return (
    <div className="on-paper mx-auto max-w-4xl px-5 py-12 md:py-16">
      <div className="no-print mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-6xl font-semibold md:text-7xl">Resume</h1>
        <PrintButton />
      </div>

      <div className="resume-sheet rounded-2xl border border-line bg-white p-7 shadow-sm md:p-12">
        <header className="border-b-4 border-cobalt pb-6">
          <h2 className="display text-5xl font-semibold">{profile.name}</h2>
          <p className="mt-2 text-xl">{profile.title}</p>
          <p className="mt-2 text-[15px] text-mute">
            {profile.location} &middot; {profile.email}
          </p>
        </header>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="prose-serif mt-2 text-[1.0625rem]">{portfolio.about[0]}</p>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Experience</h3>
          <div className="mt-4 space-y-7">
            {experience.map((x) => (
              <div key={x.company} className="grid gap-1 sm:grid-cols-[170px_1fr] sm:gap-6">
                <div className="text-[15px] text-mute">
                  <p>{x.period}</p>
                  <p>{x.place}</p>
                </div>
                <div>
                  <p className="font-semibold">
                    {x.role}, {x.company}
                  </p>
                  <ul className="prose-serif mt-2 list-disc space-y-1 pl-5 text-[1.0625rem]">
                    {x.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <section>
            <h3 className="text-lg font-semibold">Education</h3>
            <div className="mt-3 space-y-3 text-[15px]">
              {education.map((e) => (
                <div key={e.school}>
                  <p className="font-medium">{e.program}</p>
                  <p className="text-mute">
                    {e.school}, {e.period}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Recognition</h3>
            <ul className="mt-3 space-y-3 text-[15px]">
              {recognition.map((r) => (
                <li key={r.title}>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-mute">
                    {r.issuer}, {r.year}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Skills</h3>
          <dl className="mt-3 space-y-2 text-[15px]">
            {skills.map((g) => (
              <div key={g.group} className="grid gap-x-6 sm:grid-cols-[110px_1fr]">
                <dt className="font-medium">{g.group}</dt>
                <dd className="text-mute">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
