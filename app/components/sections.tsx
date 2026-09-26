import React from 'react';
import { Section, SectionHeader, Icon, useLucideIcons } from './utils';
import { GITHUB_PROFILE_URL, RESUME_DRIVE_FOLDER_URL } from '../data';
import { useLatestResume } from './resume';

const ACHIEVEMENTS = [
    {
        icon: 'file-text',
        title: 'ACM Publication (2024)',
        text: 'Lead author of "Map Yog — Intelligent Spatiotemporal Data Explorer" on high-scale spatial data visualization.',
    },
    {
        icon: 'braces',
        title: 'Problem Solving',
        text: 'Solved 1000+ algorithmic problems across LeetCode and Codeforces, focusing on Data Structures, Dynamic Programming, and Graph Algorithms.',
    },
    {
        icon: 'graduation-cap',
        title: 'GATE CS 2024',
        text: 'Qualified the GATE Computer Science exam, demonstrating strong foundations in core CS subjects.',
    },
    {
        icon: 'trophy',
        title: 'Hackathons',
        text: 'Developed a geolocation-verified facial attendance prototype during Codeshastra 8.0 with real-time API verification.',
    },
];

export const AchievementsAndEducation: React.FC = () => {
    useLucideIcons();
    return (
    <Section id="achievements">
        <SectionHeader index="/04 — wins" title="Achievements & Education" />
        <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 flex items-start gap-4 p-6 rounded-2xl border border-heat-400/30 bg-gradient-to-r from-heat-500/5 to-transparent">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-heat-400/40 bg-carbon-900 text-heat-400 flex-shrink-0">
                    <Icon name="graduation-cap" className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                        Indian Institute of Information Technology (IIIT), Kota
                    </h3>
                    <p className="text-sm text-carbon-300">Bachelor of Technology in Electronics and Communication · Dec 2020 — June 2024 · Kota, Rajasthan</p>
                </div>
            </div>
            {ACHIEVEMENTS.map((a, i) => (
                <div
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-2xl border border-carbon-700 bg-carbon-850 hover:border-carbon-600 hover:-translate-y-0.5 transition duration-300"
                >
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-carbon-700 bg-carbon-900 text-phosphor-400 flex-shrink-0">
                        <Icon name={a.icon} className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-white mb-1.5">{a.title}</h3>
                        <p className="text-sm text-carbon-300 leading-relaxed">{a.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </Section>
    );
};

const CONTACTS = [
    {
        icon: 'phone',
        label: 'Phone',
        value: '+91 90344 53365',
        href: 'tel:+919034453365',
    },
    {
        icon: 'mail',
        label: 'Email',
        value: 'madhurg2002@gmail.com',
        href: 'mailto:madhurg2002@gmail.com',
    },
    {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: 'in/madhurg2002',
        href: 'https://www.linkedin.com/in/madhurg2002/',
    },
    {
        icon: 'github',
        label: 'GitHub',
        value: '@Madhurg2002',
        href: GITHUB_PROFILE_URL,
    },
    {
        icon: 'code',
        label: 'LeetCode',
        value: 'leetcode.com/madhurg2002',
        href: 'https://leetcode.com/madhurg2002/',
    },
];

export const Contact: React.FC = () => {
    const resume = useLatestResume();
    useLucideIcons([resume.url]);

    return (
    <Section id="contact" className="text-center">
        <div className="max-w-2xl mx-auto">
            <p className="kicker text-xs text-heat-400 mb-3">/05 — ping me</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-5">
                Let's Connect
            </h2>
            <p className="text-carbon-300 mb-4 leading-relaxed">
                I'm currently seeking new full-stack opportunities. Whether you have a question,
                an offer, or just want to say hi — my inbox is always open.
            </p>
            <p className="inline-flex items-center px-4 py-1.5 rounded-full border border-phosphor-400/40 bg-phosphor-400/10 text-phosphor-300 text-sm font-medium mb-12">
                <span className="w-2 h-2 rounded-full bg-phosphor-400 animate-pulse mr-2"></span>
                Open to opportunities
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            <a
                href={resume.url ?? RESUME_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                title={resume.name ? `Latest resume: ${resume.name}` : 'Resume folder on Google Drive'}
                className="group flex flex-col items-center p-6 rounded-2xl border border-carbon-700 bg-carbon-850 transition duration-300 hover:border-heat-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-heat-500/10 sm:col-span-2 lg:col-span-4"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-xl border border-carbon-700 bg-carbon-900 text-heat-400 group-hover:text-heat-300 group-hover:border-heat-400/40 mb-4 transition duration-300">
                    <Icon name="file-text" className="w-5 h-5" />
                </span>
                <span className="text-white font-semibold mb-1">Resume</span>
                <span className="text-carbon-400 text-sm">
                    {resume.name ? `Latest: ${resume.name}` : 'View the latest resume on Google Drive'}
                </span>
            </a>
            {CONTACTS.map((c) => (
                <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-6 rounded-2xl border border-carbon-700 bg-carbon-850 transition duration-300 hover:border-heat-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-heat-500/10"
                >
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl border border-carbon-700 bg-carbon-900 text-heat-400 group-hover:text-heat-300 group-hover:border-heat-400/40 mb-4 transition duration-300">
                        <Icon name={c.icon} className="w-5 h-5" />
                    </span>
                    <span className="text-white font-semibold mb-1">{c.label}</span>
                    <span className="text-carbon-400 text-sm break-all">{c.value}</span>
                </a>
            ))}
        </div>

        <p className="mt-10 text-sm text-carbon-500">
            Prefer async? Email works best — I usually reply within a day.
        </p>
    </Section>
    );
};
