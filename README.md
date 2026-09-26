# Madhur Gupta — Portfolio

Personal portfolio website showcasing my work as a Full Stack Developer.

## 🌐 Live

**This portfolio is live at: [https://portfolio-madhurg2002.vercel.app/](https://portfolio-madhurg2002.vercel.app/)**

<!-- When https://madhurg2002.is-a.dev is live, swap the primary link above to:
[https://madhurg2002.is-a.dev/](https://madhurg2002.is-a.dev/)
-->

Also reachable via [https://madhurg2002.is-a.dev/](https://madhurg2002.is-a.dev/) once the subdomain goes live.

## ✨ Features

- **🌗 Light & dark mode** — toggle in the navbar, follows your system preference by default, persists your choice, and applies before first paint (no flash). Brand SVGs get a subtle halo on dark backgrounds and sit cleanly on light tiles.
- **Typewriter hero** with a terminal-style profile card and live stats
- **Expandable project cards** — every project links to its GitHub repo or live demo, with a "What I did" breakdown of the concrete engineering behind each build
- **Interactive skills grid** — React, TypeScript, Redux, Kepler.gl, deck.gl, Node.js, PostGIS, GCP, Docker and more
- **Timeline experience section** with detailed role highlights
- **Achievements & education** — ACM publication, GATE CS, hackathons, IIIT Kota
- **Resume, always current** — the Resume button resolves the *most recently modified* file in [my Google Drive resume folder](https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw), so uploading a new resume is enough — no code change needed
- **Contact cards** — Email, Phone, LinkedIn, GitHub, LeetCode
- Carbon/amber terminal-inspired theme with ambient grid backdrop

## 🛠 Tech Stack

- [React 19](https://react.dev) + [React Router 7](https://reactrouter.com) (SSR)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide icons](https://lucide.dev)

## 📄 Resume via Google Drive

All resume versions live in a single [Google Drive folder](https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw).

The site queries the Drive API for the **latest file** in that folder (ordered by `modifiedTime desc`) and links it directly:

1. Create a Google Cloud API key with the **Google Drive API** enabled (APIs & Services → Credentials).
2. Set it as `VITE_GOOGLE_DRIVE_API_KEY` (locally in `.env`, in Vercel project settings for production).
3. The folder must stay shared as "Anyone with the link".

Without the key the Resume button simply opens the folder view — everything still works.

## 🚀 Getting Started

```bash
npm install
npm run dev      # development server at http://localhost:5173
```

### Build & run in production

```bash
npm run build    # outputs to build/
npm run start    # serves the production build
```

## 📦 Deployment

Deployed on [Vercel](https://vercel.com) at [portfolio-madhurg2002.vercel.app](https://portfolio-madhurg2002.vercel.app/), with the `madhurg2002.is-a.dev` subdomain pointed at it.

## 📬 Contact

- Email: [madhurg2002@gmail.com](mailto:madhurg2002@gmail.com)
- GitHub: [@Madhurg2002](https://github.com/Madhurg2002)
- LinkedIn: [in/madhurg2002](https://www.linkedin.com/in/madhurg2002/)
- LeetCode: [madhurg2002](https://leetcode.com/madhurg2002/)
