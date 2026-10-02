import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
];

/* ---------- document metadata ----------
   Served from root so every route (including /resume) gets a real title
   instead of the browser showing a bare URL in the tab. */
const SITE_URL = "https://portfolio-madhurg2002.vercel.app";
const SITE_TITLE = "Madhur Gupta — Full Stack Developer";
const SITE_DESCRIPTION =
  "Madhur Gupta — Full Stack Developer. Geospatial platforms, Prometheus tooling, and interactive web apps.";

export const meta: Route.MetaFunction = () => [
  { title: SITE_TITLE },
  { name: "description", content: SITE_DESCRIPTION },
  { tagName: "link", rel: "canonical", href: SITE_URL },

  // Open Graph — makes shared links render a rich card on LinkedIn/X/WhatsApp
  { property: "og:type", content: "website" },
  { property: "og:url", content: SITE_URL },
  { property: "og:site_name", content: "Madhur Gupta" },
  { property: "og:title", content: SITE_TITLE },
  { property: "og:description", content: SITE_DESCRIPTION },
  { property: "og:image", content: `${SITE_URL}/og.png` },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Madhur Gupta — Full Stack Developer" },

  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: SITE_TITLE },
  { name: "twitter:description", content: SITE_DESCRIPTION },
  { name: "twitter:image", content: `${SITE_URL}/og.png` },
  { name: "twitter:image:alt", content: "Madhur Gupta — Full Stack Developer" },

  // Match the browser chrome to the active theme
  { name: "theme-color", content: "#09090b", media: "(prefers-color-scheme: dark)" },
  { name: "theme-color", content: "#f5f6f8", media: "(prefers-color-scheme: light)" },
];

/* Structured data so search engines can read this as a person, not just a page.
   Only facts already stated on the site. */
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Madhur Gupta",
  jobTitle: "Full Stack Developer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  sameAs: [
    "https://github.com/Madhurg2002",
    "https://www.linkedin.com/in/madhurg2002/",
    "https://leetcode.com/madhurg2002/",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Node.js",
    "Geospatial systems",
    "Prometheus",
    "Docker",
    "PostGIS",
  ],
};

/**
 * Applies the persisted (or system) theme before first paint so there is no
 * flash of the wrong theme. Keep in sync with app/components/hooks.tsx.
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:rounded-lg focus-visible:bg-heat-400 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold on-accent"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="relative min-h-screen bg-carbon-950 flex items-center justify-center px-4 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute top-1/3 -right-48 w-[36rem] h-[36rem] bg-phosphor-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 -left-48 w-[32rem] h-[32rem] bg-heat-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-carbon-700 bg-carbon-850 p-8 text-center shadow-2xl shadow-black/40">
        <p className="kicker text-xs text-heat-400 mb-4">
          $ status {message}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-carbon-100 mb-4">
          {message}
        </h1>
        <p className="text-carbon-300 leading-relaxed mb-8">{details}</p>

        <a
          href="/"
          className="on-accent inline-flex items-center px-6 py-3 rounded-xl bg-heat-400 font-semibold hover:bg-heat-300 transition duration-200"
        >
          Back to home
        </a>

        {stack && (
          <pre className="w-full mt-8 p-4 overflow-x-auto text-left rounded-xl border border-carbon-700 bg-carbon-900 text-xs text-carbon-400">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
