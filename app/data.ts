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

// --- DATA STRUCTURES ---

export const SKILLS_DATA: Record<string, Skill[]> = {
    Frontend: [
        { name: 'React.js', icon: ReactIcon, color: '#61DAFB', link: 'https://react.dev/learn' },
        { name: 'Next.js', icon: NextIcon, color: '#6EE7B7', link: 'https://nextjs.org/docs' },
        { name: 'Tailwind CSS', icon: TailwindIcon, color: '#06B6D4', link: 'https://tailwindcss.com/docs' },
    ],
    'Backend / Runtime': [
        { name: 'Node.js', icon: NodeIcon, color: '#339933', link: 'https://nodejs.org/en/docs' },
        { name: 'Express', icon: ExpressIcon, color: '#6B7280', link: 'https://expressjs.com/' },
    ],
    'Database ': [
        { name: 'PostgreSQL', icon: PostgreSQLIcon, color: '#336791', link: 'https://www.postgresql.org/docs/' },
        { name: 'MongoDB', icon: MongoDBIcon, color: '#47A248', link: 'https://www.mongodb.com/docs/' },
    ],
    'Tools / DevOps': [
        { name: 'Google Cloud (GCP)', icon: gcpIcon, color: '#4285F4', link: 'https://cloud.google.com/docs' },
        { name: 'Docker', icon: DockerIcon, color: '#2496ED', link: 'https://docs.docker.com/' },
        { name: 'Git', icon: GitIcon, color: '#F05032', link: 'https://git-scm.com/doc' },
        { name: 'Linux', icon: LinuxIcon, color: '#E95420', link: 'https://www.linux.org/docs/tutorials.html' }
    ],
    "Languages": [
        { name: 'Python', icon: PythonIcon, color: '#3776AB', link: 'https://docs.python.org/3/' },
        { name: 'JavaScript', icon: JavaScriptIcon, color: '#F7DF1E', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'C++ ', icon: CPPIcon, color: '#00599C', link: 'https://cplusplus.com/doc/' },
    ]
};

export const EXPERIENCE_DATA: ExperienceEntry[] = [
    {
        title: 'Full Stack Developer',
        company: 'Qen Labs',
        duration: 'Feb 2024 - Present',
        bullets: [
            'Architected a cloud-native geospatial platform for environmental data visualization, enabling interactive user data creation and real-time monitoring.',
            'Designed and deployed a 24/7 automated data aggregation pipeline from diverse sources, ensuring complex real-time data integration and reliability.',
            'Engineered backend GeoJSON vector tile creation and live summarization, establishing scalable geospatial data services.',
            'Built secure, user-driven APIs to support data interaction and external access, facilitating future extensibility and partner integrations.',
            'Managed and deployed comprehensive cloud infrastructure on GCP (PostgreSQL/PostGIS, Cloud Run, Linux VMs), ensuring production-grade robustness.',
        ],
    },
    {
        title: 'Full Stack Intern',
        company: 'Professos',
        duration: 'Jun 2023 - Aug 2023',
        bullets: [
            'Developed a MERN stack recruitment portal matching students to roles and assisting companies with candidate selection workflows.',
            'Re-architected the frontend UI using Tailwind CSS (migrating from Material UI), resulting in improved load speeds and a modern aesthetic.',
            'Streamlined data management by implementing an Admin Dashboard using UI Bakery, simplifying administrative workflows.',
        ],
    },
];

export const PROJECTS_DATA: ProjectEntry[] = [
    {
        title: 'Algorithm Visualizer',
        tech: 'React, Tailwind CSS, JavaScript, Socket.io',
        liveDemo: 'https://visualiz.vercel.app',
        repo: 'https://github.com/Madhurg2002/Visualizer',
        bullets: [
            'Interactive platform for visualizing pathfinding algorithms (Dijkstra, BFS, DFS) with dynamic obstacle placement and animated step-by-step execution.',
            "Includes Conway's Game of Life plus real-time multiplayer games via Socket.io, and is extendable to Sudoku and sorting visualizations.",
        ],
        details: [
            'Built an interactive grid where users draw and erase walls/weights, then watch Dijkstra, BFS, and DFS explore step-by-step with adjustable animation speed.',
            "Implemented Conway's Game of Life with pattern presets and play/pause controls.",
            'Added real-time multiplayer games over Socket.io, with lobbies and synchronized game state across clients.',
            'Shipped the production build on Vercel with a responsive layout that works on touch devices.',
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
        tech: 'MERN Stack, React',
        liveDemo: null,
        repo: null,
        bullets: [
            'Comprehensive budget solution handling salary management, utilities tracking, and bill sharing functionalities.',
            'Robust support for recurring timed bills with automated reminder systems and an expense dashboard.',
        ],
        details: [
            'Modeled salaries, utilities, and shared bills in MongoDB with per-user authorization on the Express API.',
            'Built the recurring-bill engine that generates due entries on schedule and triggers automated reminders.',
            'Created a React dashboard summarizing expenses, upcoming bills, and overall financial health at a glance.',
        ],
    },
];
