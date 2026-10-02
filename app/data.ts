import ReactIcon from './skillsIcons/react.svg'
import NextIcon from './skillsIcons/nextjs.svg'
import TailwindIcon from './skillsIcons/tailwind.svg'
import JavaScriptIcon from './skillsIcons/javascript.svg'
import CIcon from './skillsIcons/c.svg';
import CPPIcon from './skillsIcons/cpp.svg';
import PythonIcon from './skillsIcons/python.svg';
import NodeIcon from './skillsIcons/nodejs.svg';
import ExpressIcon from './skillsIcons/express.svg';
import PostgreSQLIcon from './skillsIcons/postgressql.svg';
import MongoDBIcon from './skillsIcons/mongodb.svg';
import gcpIcon from './skillsIcons/gcp.svg';
import DockerIcon from './skillsIcons/docker.svg';
import GitIcon from './skillsIcons/git.svg';
import LinuxIcon from './skillsIcons/linux.svg';
import TypeScriptIcon from './skillsIcons/typescript.svg';
import ReduxIcon from './skillsIcons/redux.svg';
import DeckIcon from './skillsIcons/deckgl.svg';
import KeplerIcon from './skillsIcons/keplergl.svg';
import SocketIcon from './skillsIcons/socketio.svg';
import PostmanIcon from './skillsIcons/postman.svg';
import VSCodeIcon from './skillsIcons/vscode.svg';
import ClaudeIcon from './skillsIcons/claude.svg'
import BunIcon from './skillsIcons/bun.svg';
// --- INTERFACES ---

export interface Skill {
    name: string;
    icon: string | React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    link: string;
    /** Pure-white monochrome logos; darkened on light-mode tiles via CSS. */
    whiteLogo?: boolean;
}

export interface ExperienceEntry {
    title: string;
    company: string;
    duration: string;
    bullets: string[];
}

export interface ProjectEntry {
    title: string;
    /** Key into ICONS in app/components/icons.tsx; falls back to 'folder-git-2'. */
    icon?: string;
    tech: string;
    liveDemo: string | null;
    repo: string | null;
    /** One-line teaser shown on the card. The modal lists `details` instead,
     *  so keep this to a single sentence and do not restate those bullets. */
    summary: string;
    details?: string[];
}

export const GITHUB_PROFILE_URL = 'https://github.com/Madhurg2002';

// --- RESUME / DRIVE ---

/**
 * Google Drive folder holding every version of the resume.
 * The server route /resume (app/routes/resume.ts) resolves the most
 * recently modified file in this folder keylessly (embedded folder view)
 * and streams its bytes same-origin — no API key needed.
 *
 * public/resume.pdf is a bundled fallback for when Drive is unreachable.
 * Refresh it whenever you upload a newer version to the Drive folder.
 */
export const RESUME_DRIVE_FOLDER_URL =
    'https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw?usp=sharing';

export const RESUME_DRIVE_FOLDER_ID = '1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw';

// --- DATA STRUCTURES ---

export const SKILLS_DATA: Record<string, Skill[]> = {
    Frontend: [
        { name: 'React.js', icon: ReactIcon, color: '#61DAFB', link: 'https://react.dev/learn' },
        { name: 'Next.js', icon: NextIcon, color: '#6EE7B7', link: 'https://nextjs.org/docs', whiteLogo: true },
        { name: 'TypeScript', icon: TypeScriptIcon, color: '#3178C6', link: 'https://www.typescriptlang.org/docs/' },
        { name: 'Redux', icon: ReduxIcon, color: '#764ABC', link: 'https://redux.js.org/' },
        { name: 'deck.gl', icon: DeckIcon, color: '#FF6FB4', link: 'https://deck.gl/docs' },
        { name: 'Kepler.gl', icon: KeplerIcon, color: '#EF5350', link: 'https://kepler.gl/' },
        { name: 'Tailwind CSS', icon: TailwindIcon, color: '#06B6D4', link: 'https://tailwindcss.com/docs' },
    ],
    'Backend & Cloud': [
        { name: 'Node.js', icon: NodeIcon, color: '#339933', link: 'https://nodejs.org/en/docs' },
        { name: 'Express', icon: ExpressIcon, color: '#6B7280', link: 'https://expressjs.com/', whiteLogo: true },
        { name: 'PostGIS', icon: PostgreSQLIcon, color: '#336791', link: 'https://postgis.net/documentation/' },
        { name: 'GCP', icon: gcpIcon, color: '#4285F4', link: 'https://cloud.google.com/docs' },
        { name: 'Docker', icon: DockerIcon, color: '#2496ED', link: 'https://docs.docker.com/' },
        { name: 'MongoDB', icon: MongoDBIcon, color: '#47A248', link: 'https://www.mongodb.com/docs/' },
        { name: 'Socket.io', icon: SocketIcon, color: '#FFFFFF', link: 'https://socket.io/docs/v4/', whiteLogo: true },
    ],
    'Languages': [
        { name: 'JavaScript', icon: JavaScriptIcon, color: '#F7DF1E', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'Python', icon: PythonIcon, color: '#3776AB', link: 'https://docs.python.org/3/' },
        { name: 'C++', icon: CPPIcon, color: '#00599C', link: 'https://cplusplus.com/doc/' },
        { name: 'C', icon: CIcon, color: '#5C6BC0', link: 'https://devdocs.io/c/' },
    ],
    'Developer Tools': [
        { name: 'Bun', icon: BunIcon, color: '#FBF0DF', link: 'https://bun.sh/docs' },
        { name: 'Git', icon: GitIcon, color: '#F05032', link: 'https://git-scm.com/doc' },
        { name: 'Linux', icon: LinuxIcon, color: '#E95420', link: 'https://www.linux.org/docs/tutorials.html' },
        { name: 'Postman', icon: PostmanIcon, color: '#FF6C37', link: 'https://learning.postman.com/docs/' },
        { name: 'VS Code', icon: VSCodeIcon, color: '#007ACC', link: 'https://code.visualstudio.com/docs' },
        { name: 'Claude & Cursor', icon: ClaudeIcon, color: '#D97757', link: 'https://docs.anthropic.com/' },
    ]
};

export const EXPERIENCE_DATA: ExperienceEntry[] = [
    {
        title: 'Full Stack Developer',
        company: 'Qen Labs',
        duration: 'Feb 2024 — Present · Remote',
        bullets: [
            'Built a high-throughput geospatial visualization engine using <strong>Kepler.gl</strong> and <strong>deck.gl</strong> to render datasets of <strong>1M+ spatiotemporal points</strong>, leveraging viewport-driven rendering to reduce memory overhead by 40%.',
            'Engineered dynamic map tools and automated data ingestion pipelines for <strong>GeoJSON</strong> and <strong>H3 vector tiles</strong> across 10+ complex layers.',
            'Integrated AI workflows (<strong>Claude</strong>) into routine development for component scaffolding, test coverage automation, and system refactoring, boosting team sprint output by 30%.',
            'Centralized global state management using <strong>Redux</strong> and broke up large views into reusable <strong>TypeScript</strong> hooks, reducing duplication.',
            'Designed secure cloud data pipelines to fetch assets from cloud object storage and deployed containerized microservices as stateless containers with OAuth 2.0 security.',
            'Streamlined environment setups by containerizing backend services with <strong>Docker</strong>, cutting build times by 50% across the team.',
        ],
    },
    {
        title: 'Full Stack Intern',
        company: 'Professos',
        duration: 'Jun 2023 — Aug 2023 · Remote',
        bullets: [
            'Developed core features for a <strong>MERN stack</strong> recruitment portal designed to match candidates with roles based on their skill profiles.',
            'Re-architected frontend user layouts with <strong>Tailwind CSS</strong>, improving page load speed, component modularity, and UI responsiveness.',
        ],
    },
];

export const PROJECTS_DATA: ProjectEntry[] = [
    {
        title: 'Skytrace — Flight Log & Great-Circle Map',
        icon: 'plane',
        tech: 'React 19, TypeScript, deck.gl, MapLibre GL, Drizzle ORM, PostgreSQL',
        liveDemo: 'https://flight-visualizer-frontend-cyan.vercel.app',
        repo: 'https://github.com/Madhurg2002/Flight-Visualizer',
        summary:
            'Describe a flight the way you would say it out loud — "United to Tokyo in March 2025" — and Skytrace resolves which flight you meant and draws it on a world map.',
        details: [
            'Built the free-text resolver: airline names, city names, IATA/ICAO codes, partial dates and route pairs are ranked into candidates, each carrying a confidence and the reason behind it. When it is unsure it asks rather than guessing, so the log only ever holds real routes.',
            'Bundled a public aviation dataset into the repo and wired six free map-tile providers, so the whole app runs offline of any paid service with nothing to sign up for.',
            'Drew great-circle arcs on the sphere with deck.gl over MapLibre GL, colourable by year, cabin, distance or airline, with timeline playback and PNG export.',
            'Snapshot derived values (distance, duration, cabin-aware CO₂) at save time instead of recomputing on read, so re-deriving a 2019 entry against changed data can never quietly alter what the log remembers.',
            'Structured as a workspace monorepo — backend, a single-origin serverless entry, the frontend, and four shared packages — with dependencies running one way only, and all four logging types checking out under one command.',
            'Carved the share-alike aviation data out of the permissive code licence explicitly, rather than papering over the incompatibility, and documented what it means for redistribution.',
        ],
    },
    {
        title: 'todo.sh — One Command Grammar, Four Surfaces',
        icon: 'square-terminal',
        tech: 'Node.js, Express, ssh2, React, Server-Sent Events',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/todo-cli',
        summary:
            'A task manager you can use as a CLI, a browser board, a CRT terminal or an SSH session — all speaking one command grammar over one shared store. The CLI needs no account and no server.',
        details: [
            'Wrote one pure command grammar (`parseCommand` / `runCommand`) in `@todo/shared`; the CLI, the SSH stream and the browser terminal differ only in their io sink and store adapter, so a new surface inherits every existing command.',
            'Shipped the SSH TUI over ssh2 on port 2222 — a live line-based session against the same grammar, not a second implementation.',
            'Added live cross-surface sync with a Server-Sent Events feed, so a task added on the CLI shows up on an open board without a refresh.',
            'Implemented atomic JSON writes with cross-process file locking, so two surfaces writing the same `tasks.json` cannot interleave and corrupt it.',
            'Handled accounts with scrypt password hashing and sessions, over either a per-user file or a Postgres store, and built workspace integration suites covering both the REST API and the SSH surface.',
        ],
    },
    {
        title: 'Algorithm Visualizer & Multiplayer Platform',
        icon: 'route',
        tech: 'React, Node.js, Socket.io, Tailwind CSS',
        liveDemo: 'https://visualiz.vercel.app',
        repo: 'https://github.com/Madhurg2002/Visualizer',
        summary:
            'Real-time WebSocket communication layer with Socket.io supporting sub-100ms synchronization latency for 50+ concurrent users in turn-based sessions.',
        details: [
            'Designed a room-based Socket.io protocol where the server owns game state, so a dropped connection re-syncs the board instead of corrupting the match.',
            'Implemented step-by-step visualizers for Graph (Dijkstra, A*) and Sorting algorithms, maintaining smooth 60fps through optimized custom React Hooks.',
            'Implemented a deterministic, seed-based generator for Sudoku boards, producing unique, shareable game IDs and 100% reproducible board states.',
            'Shipped Conway\u2019s Game of Life and dynamic obstacle placement, with a responsive, touch-friendly layout.',
        ],
    },
    {
        title: 'Prometheus Query Gateway',
        icon: 'gauge',
        tech: 'TypeScript, Fastify, React, PostgreSQL, Vitest',
        liveDemo: 'https://grafana-helper.vercel.app/',
        repo: 'https://github.com/Madhurg2002/grafana',
        summary:
            'High-throughput, stateless Fastify proxy and mobile-first React frontend for routing, caching, and streaming Prometheus PromQL queries — so routine queries no longer need a full Grafana instance.',
        details: [
            'Proxied /api/v1/query and /api/v1/query_range directly with an LRU cache and Undici socket pooling for high-throughput PromQL serving.',
            'Protected Prometheus credentials with AES-256-GCM encryption at rest in a PostgreSQL schema, plus rate limiting and CORS on the API.',
            'Built a mobile-first React dashboard with Recharts time-series charts and live host telemetry.',
            'Structured the project as an npm-workspaces monorepo and covered core flows with Vitest and React Testing Library.',
        ],
    },
    {
        title: 'Budget Management App',
        icon: 'piggy-bank',
        tech: 'MERN Stack, MongoDB, Node.js',
        liveDemo: 'https://budgetsn.vercel.app/',
        repo: null,
        summary:
            'Full-stack expense tracking platform featuring automated recurring bill reminders and dynamic salary dashboards using indexed MongoDB queries.',
        details: [
            'Modeled salaries, utilities, and shared bills as separate MongoDB collections, with every household member scoped to only the records they own.',
            'Built the recurring-bill engine that generates due entries on schedule and triggers automated reminders.',
            'Created a React dashboard summarizing expenses, upcoming bills, and overall financial health at a glance.',
        ],
    },
    {
        title: 'DevCleaner CLI',
        icon: 'trash-2',
        tech: 'Python',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Clean_dev',
        summary:
            'High-performance, colorized CLI that scans directories and interactively cleans disk-heavy development caches (node_modules, venvs, __pycache__, Rust/Java/Gradle builds).',
        details: [
            'Wrote per-ecosystem scanners that match each build system\u2019s cache layout, walk the directory once, and total the bytes each candidate is holding.',
            'Added safety checks that confirm a parent manifest (package.json, Cargo.toml, pom.xml, pyvenv.cfg) before marking a directory deletable.',
            'Implemented interactive selection with per-item size reporting and colorized terminal output.',
            'Packaged it as an installable CLI so a single command reclaims gigabytes of disk space.',
        ],
    },
    {
        title: 'Tic-Tac-Toe with Minimax AI',
        icon: 'grid-3x3',
        tech: 'C++',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/TicTacToe',
        summary:
            'Unbeatable opponent built on the minimax algorithm with alpha-beta pruning of losing branches.',
        details: [
            'Modeled the full game tree and scored terminal states so the AI always plays optimally or forces a draw.',
            'Pruned losing branches early to keep move computation instant even in the worst case.',
            'Wrote the console UI with input validation, win/draw detection, and replay rounds.',
        ],
    },
    {
        title: 'Web3 Wave DApp',
        icon: 'waves',
        tech: 'JavaScript, Ethereum, Hardhat',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Web3-wave',
        summary:
            'Decentralized wave portal where visitors connect a wallet and leave a wave on-chain — built on Ethereum while learning Solidity.',
        details: [
            'Wrote a Solidity contract storing waves with a total counter and pseudo-random prize payout, deployed via Hardhat scripts.',
            'Connected MetaMask wallet flows, signing real transactions on the Rinkeby test network.',
            'Built the frontend to read past waves straight from the contract and show them with wallet addresses and timestamps.',
        ],
    },
    {
        title: 'Discord Music Bot',
        icon: 'music-4',
        tech: 'JavaScript, Node.js, Discord.js',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Discord-music-bot',
        summary:
            'Discord music bot streaming from YouTube and Soundcloud with queueing, shuffling, and volume control.',
        details: [
            'Implemented a persistent queue supporting play, pause, skip, shuffle, loop, and volume commands from any server the bot joins.',
            'Added slash-command registration so Discord natively autocompletes and validates commands.',
            'Handled audio streaming from YouTube and Soundcloud sources with error recovery when tracks or streams fail.',
        ],
    },
];
