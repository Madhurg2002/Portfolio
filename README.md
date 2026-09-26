# Madhur Gupta — Portfolio

Personal portfolio website showcasing my work as a Full Stack Developer.

## 🌐 Live

**This portfolio is live at: [https://portfolio-madhurg2002.vercel.app/](https://portfolio-madhurg2002.vercel.app/)**

<!-- A custom domain is not claimed yet. Once madhurg2002.is-a.dev is actually
     serving this site (it currently redirects to is-a.dev's "domain available"
     page), point it at the Vercel project, then swap the primary link above to:
[https://madhurg2002.is-a.dev/](https://madhurg2002.is-a.dev/)
-->

## ✨ Features

- **🌗 Light & dark mode** — toggle in the navbar, follows your system preference by default, persists your choice, and applies before first paint (no flash). Brand SVGs get a subtle halo on dark backgrounds and sit cleanly on light tiles.
- **Typewriter hero** with a terminal-style profile card and at-a-glance stats
- **Project cards with a "What I did" modal** — every project links to its GitHub repo or live demo, with a breakdown of the concrete engineering behind each build
- **Interactive skills grid** — React, TypeScript, Redux, Kepler.gl, deck.gl, Node.js, PostGIS, GCP, Docker and more
- **Timeline experience section** with detailed role highlights
- **Achievements & education** — ACM publication, GATE CS, hackathons, IIIT Kota
- **Resume, always current** — the Resume button resolves the *most recently modified* file in [my Google Drive resume folder](https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw), so uploading a new resume is enough — no code change needed
- **Contact cards** — Email, Phone, LinkedIn, GitHub, LeetCode
- **Carbon/amber terminal-inspired theme** with an ambient grid backdrop
- **Mobile-first and keyboard accessible** — layouts are built for narrow screens first, with visible focus rings, a skip-to-content link, Escape and focus handling on the menu and modal, and `prefers-reduced-motion` support
- **SEO and link previews** — a real page title, Open Graph and Twitter cards pointing at `public/og.png`, a canonical URL, JSON-LD `Person` schema, `robots.txt`, `sitemap.xml` and a styled 404. Regenerate the social image with `python3 scripts/generate-og.py` (pure stdlib, no image libraries needed)

## 🛠 Tech Stack

- [React 19](https://react.dev) + [React Router 7](https://reactrouter.com) (SSR)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) + [Vitest](https://vitest.dev) for building and testing
- [Lucide icons](https://lucide.dev) — only the 26 icons this site uses are inlined in `app/components/icons.tsx`, so they ship in the server-rendered HTML with no CDN request and no client-side icon swap. Each project card picks its own glyph from `data.ts`; a test asserts every icon referenced anywhere in `app/` exists there

## 📄 Resume — always the latest version

All resume versions live in a single [Google Drive folder](https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw).

The `/resume` server route (app/routes/resume.ts) resolves the **most recently modified** file in that folder — keylessly, via Drive's public embedded folder view — and streams the actual PDF bytes from the site's own origin, so it works even on networks that block drive.google.com. The button's subtitle shows the resolved file name.

Drive changes this date format periodically, so the parsing is pinned by tests:

```bash
npm test
```

`app/routes/resume.test.ts` covers all three shapes Drive emits (`M/D/YY`, `MMM D`, and a bare clock time for files touched today) plus the century pivot and entry selection.

If Drive is unreachable (rate limit, outage), `/resume` falls back to the bundled copy at `public/resume.pdf` — so the button always opens a resume. **When you upload a new resume to the Drive folder, refresh `public/resume.pdf` too** (the fallback is only fetched if the live lookup fails, but it should stay reasonably current).

No API key or configuration is needed; the folder just has to stay shared as "Anyone with the link".

## 🚀 Getting Started

```bash
npm install
npm run dev
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build into `build/` |
| `npm run start` | Serves the production build |
| `npm run typecheck` | Generates route types, then runs `tsc` |
| `npm test` | Runs the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |

## 🗂 Repository layout

```
app/
  components/     UI sections (hero, skills, experience, projects, …)
  routes/         home.tsx and the /resume server route
  skillsIcons/    imported brand SVGs
  app.css         design tokens, light/dark flip, shared utilities
  data.ts         all portfolio content in one place
  root.tsx        document shell, metadata, JSON-LD, error boundary
public/           favicon, bundled resume fallback, og.png, robots, sitemap
scripts/
  generate-og.py  regenerates the social preview image
```

All copy — projects, experience, achievements, contact details — lives in
`app/data.ts`, so content edits never require touching components.

## 📦 Deployment

Deployed on [Vercel](https://vercel.com) at [portfolio-madhurg2002.vercel.app](https://portfolio-madhurg2002.vercel.app/).

## 📬 Contact

- Email: [madhurg2002@gmail.com](mailto:madhurg2002@gmail.com)
- GitHub: [@Madhurg2002](https://github.com/Madhurg2002)
- LinkedIn: [in/madhurg2002](https://www.linkedin.com/in/madhurg2002/)
- LeetCode: [madhurg2002](https://leetcode.com/madhurg2002/)
