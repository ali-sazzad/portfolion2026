export type Project = {
  id: string;
  name: string;
  discipline: string;
  pitch: string;
  year: number;
  status: "Live" | "Case study" | "Prototype";
  featured: boolean;
  tags: string[];
  stack: string[];
  hue: number;
  problem: string;
  approach: string;
  result: string;
  links: { live?: string; github?: string };
};

// Sample content: the name, employers and projects below are fictional.
export const portfolio = {
  profile: {
    name: "Mara Lindqvist",
    first: "Mara",
    last: "Lindqvist",
    title: "Design engineer",
    intro:
      "I design and build web products that feel fast, clear and a little bit delightful, from the first sketch to the production deploy.",
    location: "Melbourne, Australia",
    timezone: "AEST (UTC+10)",
    email: "hello@maralindqvist.example",
    availability: "Booking new projects from November",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
  },

  stats: [
    { value: 7, max: 10, suffix: "", label: "years shipping interfaces" },
    { value: 40, max: 50, suffix: "+", label: "projects delivered" },
    { value: 96, max: 100, suffix: "%", label: "average Lighthouse score" },
    { value: 2, max: 7, suffix: "", label: "day reply time" },
  ],

  about: [
    "I'm a design engineer with seven years of experience shipping interfaces for startups and product teams. I work in the space between design and code, so decisions don't get lost in handoff.",
    "My focus is design systems, data-heavy dashboards and marketing sites that load quickly and read well on every screen. I care about the unglamorous details: empty states, error messages, keyboard focus and loading behaviour.",
    "Outside of client work I write about interface craft and mentor junior designers who want to learn to code.",
  ],

  facts: [
    { label: "Based in", value: "Melbourne, Australia" },
    { label: "Experience", value: "7 years" },
    { label: "Works with", value: "Startups, agencies, product teams" },
    { label: "Languages", value: "English, Swedish" },
  ],

  services: [
    {
      name: "Product interfaces",
      body: "Dashboards, onboarding flows and settings screens designed against real data and built in React.",
      includes: ["Research and flow mapping", "High-fidelity design in Figma", "Production React build", "Usability testing and iteration"],
    },
    {
      name: "Design systems",
      body: "Tokens, components and documentation that a team can actually adopt, with accessibility built in.",
      includes: ["Audit of your current UI", "Design tokens and theming", "Documented, tested components", "Team onboarding and handover"],
    },
    {
      name: "Marketing sites",
      body: "Fast, well-written sites with clean SEO, tuned to hit Core Web Vitals on mid-range phones.",
      includes: ["Content and structure workshop", "Design and motion direction", "Next.js build with a simple editor", "Performance and SEO launch checklist"],
    },
  ],

  skills: [
    { group: "Design", items: ["Interface design", "Prototyping", "Design systems", "Typography", "Motion"] },
    { group: "Engineering", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"] },
    { group: "Quality", items: ["Accessibility (WCAG 2.2)", "Performance budgets", "Playwright", "Storybook"] },
    { group: "Tools", items: ["Figma", "Vercel", "GitHub Actions", "Supabase", "Linear"] },
  ],

  experience: [
    {
      company: "Fieldnote",
      role: "Senior design engineer",
      period: "2023 to now",
      place: "Remote",
      points: [
        "Led the design system used by four product squads, cutting new-screen build time by about a third.",
        "Rebuilt the analytics dashboard, improving interaction latency from 380ms to under 100ms.",
        "Introduced accessibility checks in CI; the app now passes WCAG 2.2 AA on all core flows.",
      ],
    },
    {
      company: "Northbeam Studio",
      role: "Front-end developer",
      period: "2020 to 2023",
      place: "Melbourne",
      points: [
        "Delivered 18 client sites and apps across retail, health and education.",
        "Built the studio's component starter, reused on every project after launch.",
        "Mentored two junior developers through their first year.",
      ],
    },
    {
      company: "Kettle & Co.",
      role: "Junior designer",
      period: "2018 to 2020",
      place: "Sydney",
      points: [
        "Designed packaging, print and web for independent food brands.",
        "Taught myself front-end development and shipped the studio's first coded sites.",
      ],
    },
  ],

  education: [
    {
      school: "RMIT University",
      program: "Bachelor of Design (Communication Design)",
      period: "2014 to 2017",
    },
    {
      school: "Google",
      program: "UX Design Professional Certificate",
      period: "2019",
    },
  ],

  recognition: [
    { title: "Site of the Day", issuer: "Awwwards", year: "2025" },
    { title: "Best Design System", issuer: "Australian Web Awards", year: "2024" },
    { title: "Speaker, Interface craft", issuer: "Melbourne Front-End Meetup", year: "2024" },
    { title: "Open-source maintainer, 2.1k stars", issuer: "GitHub", year: "2023" },
  ],

  projects: [
    {
      id: "fieldnote-dashboard",
      name: "Fieldnote Dashboard",
      discipline: "Product interface",
      pitch: "An analytics dashboard for field researchers that stays quick with 50,000 rows on screen.",
      year: 2025,
      status: "Live",
      featured: true,
      tags: ["Product", "Data", "Design system"],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres"],
      hue: 232,
      problem:
        "Researchers were exporting data to spreadsheets because the old dashboard froze on large studies.",
      approach:
        "I redesigned the table around virtualised rows, saved views and keyboard navigation, then rebuilt the charts so they render on the server and hydrate on demand.",
      result:
        "Interaction latency fell from 380ms to under 100ms and weekly active use doubled within two months.",
      links: { live: "https://example.com", github: "https://github.com" },
    },
    {
      id: "harbour-market",
      name: "Harbour Market",
      discipline: "E-commerce",
      pitch: "A storefront for a family-run seafood supplier, built around fast reordering.",
      year: 2025,
      status: "Live",
      featured: true,
      tags: ["E-commerce", "Marketing site"],
      stack: ["Next.js", "Stripe", "Sanity"],
      hue: 18,
      problem:
        "Restaurants reordered by phone every week, and the previous website made that slower, not faster.",
      approach:
        "I put 'reorder last week' on the first screen, wrote clearer product copy with the owners, and made checkout a single page.",
      result:
        "Online orders went from 12% to 61% of total sales in the first quarter.",
      links: { live: "https://example.com" },
    },
    {
      id: "tidepool-ui",
      name: "Tidepool UI",
      discipline: "Design system",
      pitch: "An open-source React component library with tokens, docs and an accessibility audit for each component.",
      year: 2024,
      status: "Live",
      featured: true,
      tags: ["Design system", "Open source"],
      stack: ["React", "TypeScript", "Storybook", "Radix"],
      hue: 172,
      problem:
        "Teams kept rebuilding the same dropdowns and dialogs, each with a different set of keyboard bugs.",
      approach:
        "I built primitives on Radix, documented every state in Storybook and published an audit note next to each component.",
      result:
        "Adopted by 40 teams and 2.1k GitHub stars, with a 96% accessibility audit pass rate.",
      links: { live: "https://example.com", github: "https://github.com" },
    },
    {
      id: "lumen-health",
      name: "Lumen Health",
      discipline: "Product interface",
      pitch: "A patient booking flow designed for people using phones in poor light and with poor signal.",
      year: 2024,
      status: "Case study",
      featured: false,
      tags: ["Product", "Accessibility"],
      stack: ["React", "TypeScript", "Playwright"],
      hue: 288,
      problem: "Drop-off in the booking flow was highest on small phones and slow connections.",
      approach:
        "I cut the flow from seven steps to three, enlarged touch targets and made every step work without JavaScript.",
      result: "Completed bookings rose by 28% and support calls about booking fell by a fifth.",
      links: {},
    },
    {
      id: "paper-trail",
      name: "Paper Trail",
      discipline: "Prototype",
      pitch: "A writing app prototype that keeps every draft, searchable and diffable, without folders.",
      year: 2024,
      status: "Prototype",
      featured: false,
      tags: ["Prototype", "Tooling"],
      stack: ["Next.js", "Supabase", "Framer Motion"],
      hue: 48,
      problem: "Writers lose earlier drafts and fear deleting anything.",
      approach:
        "I designed a timeline view where each draft is a visible line, and built it as a working prototype for user testing.",
      result: "Five of six test participants found an old draft within 20 seconds, unprompted.",
      links: { github: "https://github.com" },
    },
    {
      id: "orchard-school",
      name: "Orchard School",
      discipline: "Marketing site",
      pitch: "A primary school website that parents can use one-handed and teachers can edit without help.",
      year: 2023,
      status: "Live",
      featured: false,
      tags: ["Marketing site", "Accessibility"],
      stack: ["Next.js", "Sanity", "Tailwind CSS"],
      hue: 128,
      problem: "The old site was out of date because nobody on staff felt confident updating it.",
      approach:
        "I modelled the content around what teachers post each week and gave them a three-field editor.",
      result: "Pages are now updated weekly and the Lighthouse score is 99 on mobile.",
      links: { live: "https://example.com" },
    },
  ] satisfies Project[],
};

export const allTags = Array.from(new Set(portfolio.projects.flatMap((p) => p.tags))).sort();

export function getProject(id: string) {
  return portfolio.projects.find((p) => p.id === id);
}
