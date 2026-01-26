# Portfolion2026

A colorful, product-style portfolio built with **Next.js App Router**, **TypeScript**, **Tailwind**, and **shadcn/ui**.
It’s fully demoable without a backend (mock content + client-safe patterns) and intentionally designed with clean **backend injection points** for future expansion.

## Live
- Demo: (add your Vercel link)
- Resume PDF: (add link)

## Why this project is different
Most portfolios are static templates. This one behaves like a product:
- Multi-page App Router structure (Home + Projects + Resume + Styleguide)
- Scrollspy navigation (active section highlight)
- URL-driven projects filtering/sorting (shareable state)
- Clear UI states (empty results, form success/error)
- Design tokens + cohesive color system (not random rainbow)
- Backend-ready boundaries (server actions/route handlers can be added later)

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui (Radix primitives)
- react-hook-form + zod (forms)
- lucide-react (icons)

## Local Setup
```bash
npm install
npm run dev
```
## Project Structure
```bash
src/
  app/                 # App Router pages
  components/
    ui/                # shadcn components
    site/              # reusable site components
  data/                # portfolio content single source of truth
  lib/                 # utilities (hooks/helpers)
```
## Backend Injection Points (Future)

**Planned upgrade path:**
<ul>
    Contact form → server action (Resend / EmailJS / API route)

    Projects → fetched from DB (Postgres + Prisma)

    Auth → NextAuth/Clerk integration

    CMS → blog via Contentful/Sanity/MDX
</ul>

## License

 **MIT**

### `CONTRIBUTING.md`
```md
# Contributing to Portfolion2026

## Goals
- Keep the site fast, accessible, and cleanly structured.
- Avoid UI soup: shadcn/ui is the “soul”; other patterns only if they clearly add value.

## How to add a new section
1. Add content in `src/data/portfolio.ts`
2. Create a component in `src/components/site/sections/`
3. Render it from `src/app/page.tsx`
4. Add the section id to the navbar sections list

## Backend-ready rules
- Prefer server components by default
- Use client components only for:
  - scrollspy / intersection observer
  - localStorage persistence
  - form handling
- Keep “data boundaries” clean (swap mock data → API later)

## PR Checklist
- Keyboard navigation works
- Focus rings visible
- Reduced motion respected
- No heavy animation libs
- No layout shift regressions
