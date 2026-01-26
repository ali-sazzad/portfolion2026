export type PortfolioProject = {
  id: string;
  name: string;
  shortPitch: string;
  year: number;
  status: "Live" | "In Progress" | "Case Study";
  featured: boolean;
  tags: string[];
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
};

export const portfolio = {
  profile: {
    name: "Your Name",
    title: "Frontend Developer • Next.js • UI Engineering",
    shortIntro:
      "I build product-style web experiences with strong UX states, clean architecture, and performance-first UI.",
    location: "Sydney, Australia",
    email: "you@example.com",
    socials: {
      github: "https://github.com/your-handle",
      linkedin: "https://linkedin.com/in/your-handle",
      x: "https://x.com/your-handle",
    },
    resumeLink: "https://example.com/your-resume.pdf",
  },

  heroRotatingPhrases: [
    "design systems that scale",
    "Next.js App Router patterns",
    "accessible UI with polish",
    "fast, clean, data-driven pages",
    "frontend architecture that stays sane",
    "colorful UI that still feels premium",
  ],

  about: {
    bio:
      "I’m a product-minded frontend developer who cares about the boring-but-important details: UX states, accessibility, performance, and maintainable structure. I love turning messy ideas into clean UI systems with clear data boundaries — so swapping mock data for real APIs later is painless.",
    details: [
      { label: "Focus", value: "UI Engineering, App Router, Component Systems" },
      { label: "Strengths", value: "Clean UX states, reusable components, responsive layout" },
      { label: "Currently", value: "Building Portfolion2026 (deployable, backend-ready)" },
      { label: "Open to", value: "Junior Frontend / Web Developer roles" },
    ],
  },

  skills: [
    {
      category: "Frontend",
      items: [
        { label: "Next.js (App Router)", icon: "Layout" },
        { label: "React", icon: "Atom" },
        { label: "TypeScript", icon: "Braces" },
        { label: "Tailwind CSS", icon: "Palette" },
        { label: "Accessibility (WCAG)", icon: "BadgeCheck" },
      ],
    },
    {
      category: "UI / Product",
      items: [
        { label: "shadcn/ui + Radix", icon: "SquareStack" },
        { label: "Design Tokens", icon: "SwatchBook" },
        { label: "UX States", icon: "Layers" },
        { label: "Micro-interactions", icon: "Sparkles" },
      ],
    },
    {
      category: "Backend-Ready",
      items: [
        { label: "API Boundaries", icon: "PlugZap" },
        { label: "Server Actions (ready)", icon: "Server" },
        { label: "Route Handlers (ready)", icon: "Route" },
        { label: "Auth/DB integration points", icon: "KeyRound" },
      ],
    },
  ],

  education: [
    {
      school: "Sydney Institute of Higher Education",
      program: "Master of Information Technology",
      period: "2024 — 2026",
      highlights: ["Security & networking foundations", "Project-based assessments", "Team collaboration"],
    },
    {
      school: "Your University",
      program: "Bachelor of IT",
      period: "2020 — 2023",
      highlights: ["Dean’s List", "Capstone web app", "Strong CS fundamentals"],
    },
  ],

  experience: [
    {
      company: "Freelance / Personal Projects",
      role: "Frontend Developer",
      period: "2024 — Present",
      summary:
        "Shipping product-style Next.js apps with reusable components, clean routing, and real UX states. Focus on scalable UI + backend-ready boundaries.",
    },
    {
      company: "Example Company",
      role: "Junior Web Developer (Intern)",
      period: "2023 — 2024",
      summary:
        "Built responsive UI, maintained components, improved performance, and shipped features with design + product feedback loops.",
    },
  ],

  projects: [
    {
      id: "portfolion2026",
      name: "Portfolion2026",
      shortPitch: "Product-style portfolio with scrollspy, filterable projects, SEO, and backend injection points.",
      year: 2026,
      status: "In Progress",
      featured: true,
      tags: ["Portfolio", "UI System", "App Router"],
      stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      links: { live: "https://example.com", github: "https://github.com/your-handle/portfolion2026" },
    },
    {
      id: "jobtrack",
      name: "JobTrack",
      shortPitch: "Job application tracker with clean UX states, persistence, and export-ready data model.",
      year: 2026,
      status: "Case Study",
      featured: true,
      tags: ["Productivity", "UX States"],
      stack: ["Next.js", "React", "TypeScript"],
      links: { live: "https://example.com", github: "https://github.com/your-handle/jobtrack" },
    },
    {
      id: "orbitpaws",
      name: "OrbitPaws",
      shortPitch: "Colorful e-commerce frontend with strong components and conversion-friendly layout.",
      year: 2026,
      status: "Live",
      featured: true,
      tags: ["E-commerce", "UI"],
      stack: ["Next.js", "Tailwind", "shadcn/ui"],
      links: { live: "https://example.com", github: "https://github.com/your-handle/orbitpaws" },
    },
    {
      id: "sitebazaar",
      name: "SiteBazaar",
      shortPitch: "Marketplace UI for buying/selling websites with bidding-ready patterns.",
      year: 2026,
      status: "In Progress",
      featured: false,
      tags: ["Marketplace", "Bidding"],
      stack: ["Next.js", "TypeScript"],
      links: { github: "https://github.com/your-handle/sitebazaar" },
    },
    {
      id: "linkedinfmt",
      name: "LinkedIn Text Formatter (Clone+)",
      shortPitch: "Formatter tool with clean typography preview and copy UX.",
      year: 2026,
      status: "Case Study",
      featured: false,
      tags: ["Tooling", "Text"],
      stack: ["Next.js", "TypeScript", "Tailwind"],
      links: { live: "https://example.com" },
    },
    {
      id: "uikit",
      name: "UI Kit Playground",
      shortPitch: "Component gallery + styleguide page for tokens, variants, and accessibility checks.",
      year: 2026,
      status: "In Progress",
      featured: false,
      tags: ["Design System", "Components"],
      stack: ["shadcn/ui", "Tailwind"],
      links: { github: "https://github.com/your-handle/ui-kit" },
    },
    {
      id: "cms-blog-shell",
      name: "Blog Shell (CMS-ready)",
      shortPitch: "Static blog structure prepared for Contentful/Sanity later (routing + SEO patterns).",
      year: 2026,
      status: "Case Study",
      featured: false,
      tags: ["Blog", "SEO"],
      stack: ["Next.js", "MDX"],
      links: {},
    },
    {
      id: "contact-patterns",
      name: "Contact Patterns",
      shortPitch: "Forms with validation, draft persistence, and server-action swap readiness.",
      year: 2026,
      status: "Case Study",
      featured: false,
      tags: ["Forms", "Validation"],
      stack: ["React Hook Form", "Zod"],
      links: {},
    },
  ] satisfies PortfolioProject[],

  achievements: [
    { title: "Built 5+ product-style Next.js apps", issuer: "Personal Projects", date: "2026-01" },
    { title: "Shipped reusable UI system + tokens", issuer: "Portfolion2026", date: "2026-01" },
    { title: "Improved Lighthouse score to 90+", issuer: "Case Study", date: "2025-12" },
    { title: "Implemented accessible forms (WCAG-friendly)", issuer: "Case Study", date: "2025-11" },
    { title: "Deployed multiple sites to Vercel", issuer: "Vercel", date: "2025-10" },
    { title: "Consistent content + project shipping cadence", issuer: "Public Portfolio", date: "2025-09" },
  ],
} as const;
