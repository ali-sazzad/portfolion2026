# Portfolion2026

A sample design-engineer portfolio built with Next.js (App Router), TypeScript and Tailwind CSS. It is meant as a starting point and demo for client sites. The person, employers and projects shown are fictional.

Live demo: https://portfolion2026.vercel.app

## What's inside
- Home page with a variable-font hero name that reacts to the pointer, a selected-work index with live cover preview, about, services, skills, recognition and a validated contact form
- `/projects` with topic filters driven by the URL, and a case-study page for every project
- `/resume` as a print-ready document ("Save as PDF" uses the browser print dialog)
- All content lives in `src/data/portfolio.ts`, so swapping in a real person takes minutes
- Accessible by default: skip link, visible focus, reduced-motion support, semantic landmarks

## Animation stack
| Library | Where it is used |
| --- | --- |
| Three.js | Hero WebGL blob (custom GLSL shader) |
| Theatre.js | Timeline that choreographs the blob's intro (`src/lib/heroSequence.ts`) |
| GSAP + ScrollTrigger | Hero intro and scroll exit, scrubbed About statement, skills marquee that reacts to scroll speed, project cover parallax |
| Motion (motion.dev) | Header progress bar and menu, services accordion, project index wipe, filter layout animations, counters, magnetic buttons, page transitions |
| Animate.css | Form validation shake and success tick |

Reduced-motion preferences are respected everywhere, and the hero degrades to plain cobalt if WebGL is unavailable.

## Run locally
```bash
npm install
npm run dev
```

## Customise
1. Edit `src/data/portfolio.ts` (name, bio, experience, projects).
2. Adjust colours in `src/app/globals.css` (`:root` tokens).
3. Replace the generated cover art in `src/components/site/ProjectThumb.tsx` with real screenshots if wanted.
4. Connect `ContactForm.tsx` to a server action or email service.
