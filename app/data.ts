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
import ClaudeIcon from './skillsIcons/claude.svg';
// --- INTERFACES ---

export interface Skill {
    name: string;
    icon: string | React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    link: string;
}

export interface ExperienceEntry {
    title: string;
    company: string;
    duration: string;
    bullets: string[];
}

export interface ProjectEntry {
    title: string;
    tech: string;
    liveDemo: string | null;
    repo: string | null;
    bullets: string[];
    details?: string[];
}

export const GITHUB_PROFILE_URL = 'https://github.com/Madhurg2002';

// --- RESUME / DRIVE ---

/**
 * Google Drive folder holding every version of the resume.
 * The site lists files in this folder and links the most recently
 * modified one (see app/components/resume.ts).
 *
 * To enable the "latest file" resolution, set VITE_GOOGLE_DRIVE_API_KEY
 * (Google Cloud console → APIs & Services → Credentials → API key,
 * with the Google Drive API enabled). Without it, the buttons open
 * the whole folder instead.
 */
export const RESUME_DRIVE_FOLDER_URL =
    'https://drive.google.com/drive/folders/1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw?usp=sharing';

export const RESUME_DRIVE_FOLDER_ID = '1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw';

// --- DATA STRUCTURES ---

export const SKILLS_DATA: Record<string, Skill[]> = {
    Frontend: [
        { name: 'React.js', icon: ReactIcon, color: '#61DAFB', link: 'https://react.dev/learn' },
        { name: 'Next.js', icon: NextIcon, color: '#6EE7B7', link: 'https://nextjs.org/docs' },
        { name: 'TypeScript', icon: TypeScriptIcon, color: '#3178C6', link: 'https://www.typescriptlang.org/docs/' },
        { name: 'Redux', icon: ReduxIcon, color: '#764ABC', link: 'https://redux.js.org/' },
        { name: 'deck.gl', icon: DeckIcon, color: '#FF6FB4', link: 'https://deck.gl/docs' },
        { name: 'Kepler.gl', icon: KeplerIcon, color: '#EF5350', link: 'https://kepler.gl/' },
        { name: 'Tailwind CSS', icon: TailwindIcon, color: '#06B6D4', link: 'https://tailwindcss.com/docs' },
    ],
    'Backend & Cloud': [
        { name: 'Node.js', icon: NodeIcon, color: '#339933', link: 'https://nodejs.org/en/docs' },
        { name: 'Express', icon: ExpressIcon, color: '#6B7280', link: 'https://expressjs.com/' },
        { name: 'PostGIS', icon: PostgreSQLIcon, color: '#336791', link: 'https://postgis.net/documentation/' },
        { name: 'GCP (Cloud Run)', icon: gcpIcon, color: '#4285F4', link: 'https://cloud.google.com/docs' },
        { name: 'Docker', icon: DockerIcon, color: '#2496ED', link: 'https://docs.docker.com/' },
        { name: 'MongoDB', icon: MongoDBIcon, color: '#47A248', link: 'https://www.mongodb.com/docs/' },
        { name: 'Socket.io', icon: SocketIcon, color: '#FFFFFF', link: 'https://socket.io/docs/v4/' },
    ],
    'Languages': [
        { name: 'JavaScript', icon: JavaScriptIcon, color: '#F7DF1E', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'Python', icon: PythonIcon, color: '#3776AB', link: 'https://docs.python.org/3/' },
        { name: 'C++', icon: CPPIcon, color: '#00599C', link: 'https://cplusplus.com/doc/' },
        { name: 'C', icon: CIcon, color: '#5C6BC0', link: 'https://devdocs.io/c/' },
    ],
    'Developer Tools': [
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
            'Built a high-throughput geospatial visualization engine using <strong>Kepler.gl</strong> and <strong>deck.gl</strong> to render datasets exceeding <strong>1M+ spatiotemporal points</strong>, leveraging viewport-driven rendering to reduce memory overhead by 40%.',
            'Engineered dynamic map tools and automated data ingestion pipelines for <strong>GeoJSON</strong> and <strong>H3 vector tiles</strong> across 10+ complex layers.',
            'Integrated AI workflows (<strong>Claude</strong>) into routine development for component scaffolding, test coverage automation, and system refactoring, boosting team sprint output by 30%.',
            'Centralized global state management using <strong>Redux</strong> and decoupled monolithic frontend views into reusable <strong>TypeScript</strong> hooks, lowering technical debt.',
            'Designed secure cloud data pipelines to fetch assets from <strong>Google Cloud Storage</strong> and deployed containerized micro-services on <strong>GCP Cloud Run</strong> with OAuth 2.0 security.',
            'Streamlined environment setups by containerizing backend services with <strong>Docker</strong>, cutting build times by 50% across the GCP ecosystem.',
        ],
    },
    {
        title: 'Full Stack Intern',
        company: 'Professos',
        duration: 'Jun 2023 — Aug 2023 · Remote',
        bullets: [
            'Developed core features for a <strong>MERN stack</strong> recruitment portal designed to match job seekers with roles based on candidate skill profiles.',
            'Re-architected frontend user layouts with <strong>Tailwind CSS</strong>, improving page load speed, component modularity, and overall UI responsiveness.',
        ],
    },
];

export const PROJECTS_DATA: ProjectEntry[] = [
    {
        title: 'Algorithm Visualizer & Multiplayer Platform',
        tech: 'React, Node.js, Socket.io, Tailwind CSS',
        liveDemo: 'https://visualiz.vercel.app',
        repo: 'https://github.com/Madhurg2002/Visualizer',
        bullets: [
            'Real-time WebSocket communication layer with Socket.io supporting sub-100ms synchronization latency for 50+ concurrent users in turn-based sessions.',
            'Step-by-step visualizers for Graph (Dijkstra, A*) and Sorting algorithms, maintaining a smooth 60fps execution through optimized custom React Hooks.',
        ],
        details: [
            'Built the WebSocket layer with Socket.io for sub-100ms synchronization latency for 50+ concurrent users in turn-based sessions.',
            'Implemented step-by-step visualizers for Graph (Dijkstra, A*) and Sorting algorithms, maintaining smooth 60fps through optimized custom React Hooks.',
            "Implemented a deterministic seed-based generator for Sudoku boards, producing unique, shareable game IDs and 100% reproducible board states.",
            "Includes Conway's Game of Life and dynamic obstacle placement; production build shipped on Vercel with a responsive touch-friendly layout.",
        ],
    },
    {
        title: 'Prometheus Grafana Passthrough',
        tech: 'TypeScript, Fastify, React, PostgreSQL, Vitest',
        liveDemo: 'https://grafana-frontend.vercel.app',
        repo: 'https://github.com/Madhurg2002/grafana',
        bullets: [
            'High-throughput, stateless Fastify proxy and mobile-first React frontend for routing, caching, and streaming Prometheus PromQL queries — eliminating Grafana dependencies.',
            'PostgreSQL persistence with AES-256-GCM encrypted credentials, socket pooling via Undici, rate limiting, and a Vitest-tested codebase.',
        ],
        details: [
            'Proxied /api/v1/query and /api/v1/query_range directly with an LRU cache and Undici socket pooling for high-throughput PromQL serving.',
            'Protected Prometheus credentials with AES-256-GCM encryption at rest in a PostgreSQL schema, plus rate limiting and CORS on the API.',
            'Built a mobile-first React dashboard with Recharts time-series charts and live host telemetry.',
            'Structured the project as an npm-workspaces monorepo and covered core flows with Vitest and React Testing Library.',
        ],
    },
    {
        title: 'DevCleaner CLI',
        tech: 'Python',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Clean_dev',
        bullets: [
            'High-performance, colorized CLI that scans directories and interactively cleans space-hogging dev caches (node_modules, venvs, __pycache__, Rust/Java/Gradle builds).',
            'Detects safe-to-delete targets by checking parent manifests (package.json, Cargo.toml, pom.xml) before cleanup.',
        ],
        details: [
            'Wrote scanners covering Node.js, Python/Conda virtualenvs, Rust target dirs, Gradle/Maven caches, and C/C++ build folders.',
            'Added safety checks that confirm a parent manifest (package.json, Cargo.toml, pom.xml, pyvenv.cfg) before marking a directory deletable.',
            'Implemented interactive selection with per-item size reporting and colorized terminal output.',
            'Packaged it as an installable CLI so a single command reclaims gigabytes of disk space.',
        ],
    },
    {
        title: 'TicTacToe with Minimax AI',
        tech: 'C++',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/TicTacToe',
        bullets: [
            'Unbeatable Tic-Tac-Toe opponent built on the minimax algorithm with alpha-beta style pruning of losing branches.',
            'Console-based C++ implementation exploring game-tree search depth versus performance.',
        ],
        details: [
            'Modeled the full game tree and scored terminal states so the AI always plays optimally or forces a draw.',
            'Pruned losing branches early to keep move computation instant even in the worst case.',
            'Wrote the console UI with input validation, win/draw detection, and replay rounds.',
        ],
    },
    {
        title: 'Web3 Wave DApp',
        tech: 'JavaScript, Ethereum, Hardhat',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Web3-wave',
        bullets: [
            'Decentralized wave portal where visitors connect a wallet and wave at me on-chain — built on Ethereum while learning Solidity.',
            'Contract interactions, transactions, and a frontend wired to the deployed smart contract on the Rinkeby test network.',
        ],
        details: [
            'Wrote a Solidity contract storing waves with a total counter and pseudo-random prize payout, deployed via Hardhat scripts.',
            'Connected MetaMask wallet flows, signing real transactions on the Rinkeby test network.',
            'Built the frontend to read past waves straight from the contract and show them with wallet addresses and timestamps.',
        ],
    },
    {
        title: 'Discord Music Bot',
        tech: 'JavaScript, Node.js, Discord.js',
        liveDemo: null,
        repo: 'https://github.com/Madhurg2002/Discord-music-bot',
        bullets: [
            'Discord music bot streaming from YouTube and Soundcloud with queueing, shuffling, and volume control.',
            'Slash-command interface with a small Node.js backend for playback control.',
        ],
        details: [
            'Implemented a persistent queue supporting play, pause, skip, shuffle, loop, and volume commands from any server the bot joins.',
            'Added slash-command registration so Discord natively autocompletes and validates commands.',
            'Handled audio streaming from YouTube and Soundcloud sources with error recovery when tracks or streams fail.',
        ],
    },
    {
        title: 'Budget Management App',
        tech: 'MERN Stack, MongoDB, Node.js',
        liveDemo: 'https://budgetsn.vercel.app/',
        repo: null,
        bullets: [
            'Full-stack expense tracking platform featuring automated recurring bill reminders and dynamic salary dashboards using indexed MongoDB queries.',
            'Role-aware expense splitting with automated reminder scheduling, plus salary, utilities, and shared-bill management.',
        ],
        details: [
            'Modeled salaries, utilities, and shared bills in MongoDB; built dynamic salary dashboards backed by indexed MongoDb queries.',
            'Built the recurring-bill engine that generates due entries on schedule and triggers automated reminders.',
            'Created a React dashboard summarizing expenses, upcoming bills, and overall financial health at a glance.',
        ],
    },
];
