import ReactIcon from './Icons/react.svg'
import NextIcon from './Icons/nextjs.svg'
import TailwindIcon from './Icons/tailwind.svg'
import JavaScriptIcon from './Icons/javascript.svg'
import CIcon from './Icons/C.svg';
import CPPIcon from './Icons/Cpp.svg';
import PythonIcon from './Icons/python.svg';
import NodeIcon from './Icons/nodejs.svg';
import ExpressIcon from './Icons/express.svg';
import PostgreSQLIcon from './Icons/PostgresSQL.svg';
import MongoDBIcon from './Icons/mongodb.svg';
import gcpIcon from './Icons/gcp.svg';
import DockerIcon from './Icons/docker.svg';
import GitIcon from './Icons/Git.svg';
import LinuxIcon from './Icons/Linux.svg';
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
    bullets: string[];
}

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
        tech: 'React, JavaScript',
        liveDemo: 'visualiz.vercel.app',
        bullets: [
            'Developed an interactive web platform to visualize core pathfinding algorithms (Dijkstra, BFS, DFS) with dynamic obstacle placement.',
            "Features include animated step-by-step execution and a working Conway's Game of Life simulation.",
            'Project is expandable to include Sudoku, cellular automata, and sorting visualizations.',
        ],
    },
    {
        title: 'Budget Management App',
        tech: 'MERN Stack, React',
        liveDemo: null,
        bullets: [
            'A comprehensive budget solution handling salary management, utilities tracking, and bill sharing functionalities.',
            'Implemented robust support for recurring timed bills with automated reminder systems.',
            'Provides users with an intuitive dashboard summarizing expenses, upcoming bills, and overall financial health.',
        ],
    },
];
