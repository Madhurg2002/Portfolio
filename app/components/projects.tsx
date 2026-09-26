import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS_DATA, GITHUB_PROFILE_URL } from '../data';
import { Section, SectionHeader, Icon } from './utils';

export const Projects: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const lastTrigger = useRef<HTMLButtonElement | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const openProject = openIndex !== null ? PROJECTS_DATA[openIndex] : null;

    // Esc closes the popup, focus moves to the close button on open and is
    // returned to the "What I did" trigger on close; body scroll locks.
    useEffect(() => {
        if (openIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenIndex(null);
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            lastTrigger.current?.focus();
        };
    }, [openIndex]);

    return (
        <Section id="projects">
            <SectionHeader index="/03 — builds" title="Things I've Built" />

            <div className="grid md:grid-cols-2 gap-6">
                {PROJECTS_DATA.map((project, index) => {
                    const techs = project.tech.split(',').map(t => t.trim()).filter(Boolean);
                    const titleHref = project.liveDemo ?? project.repo ?? GITHUB_PROFILE_URL;

                    return (
                        <div
                            key={index}
                            className="group relative flex flex-col min-w-0 p-5 sm:p-6 rounded-2xl border border-carbon-700 bg-carbon-850 transition duration-300 hover:-translate-y-1 hover:border-carbon-600 hover:shadow-xl hover:shadow-black/40"
                        >
                            {/* header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-carbon-700 bg-carbon-900 text-heat-400 group-hover:text-heat-300 group-hover:border-heat-400/40 transition duration-300">
                                    <Icon name={project.icon ?? 'folder-git-2'} className="w-5 h-5" />
                                </div>
                                {project.repo && (
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} source code`}
                                        className="p-2 rounded-lg text-carbon-400 hover:text-carbon-100 hover:bg-carbon-800 transition"
                                    >
                                        <Icon name="github" className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-carbon-100 mb-2">
                                <a
                                    href={titleHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-heat-300"
                                >
                                    {project.title}
                                </a>
                            </h3>
                            <p className="text-sm text-carbon-300 leading-relaxed mb-4">
                                {project.bullets[0]}
                            </p>

                            {/* tech chips */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {techs.map(t => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md border border-carbon-700 bg-carbon-900 font-mono text-[11px] text-phosphor-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* footer: links (URI first) + details trigger.
                                Wraps on narrow screens so the row never overflows the card. */}
                            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-t border-carbon-800 pt-4">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    {project.liveDemo ? (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-heat-400 hover:text-heat-300 transition"
                                        >
                                            <Icon name="external-link" className="w-4 h-4" />
                                            Live demo
                                        </a>
                                    ) : (
                                        <span
                                            title="No public deployment"
                                            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-carbon-400"
                                        >
                                            <Icon name="globe-lock" className="w-4 h-4" />
                                            no live URL
                                        </span>
                                    )}
                                    {project.repo ? (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-carbon-300 hover:text-heat-300 transition"
                                        >
                                            <Icon name="github" className="w-4 h-4" />
                                            Code
                                        </a>
                                    ) : (
                                        <span
                                            title="Source is not public"
                                            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-carbon-400"
                                        >
                                            <Icon name="lock" className="w-4 h-4" />
                                            code private
                                        </span>
                                    )}
                                </div>
                                {project.details && project.details.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            lastTrigger.current = document.activeElement as HTMLButtonElement;
                                            setOpenIndex(index);
                                        }}
                                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-heat-400 hover:text-heat-300 transition"
                                    >
                                        What I did
                                        <Icon name="arrow-up-right" className="w-4 h-4" />
                                        <span className="sr-only"> for {project.title}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* What-I-did popup */}
            {openProject && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`What I did on ${openProject.title}`}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setOpenIndex(null)}
                >
                    {/* backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    <div
                        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-carbon-600 bg-carbon-850 shadow-2xl shadow-black/60"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-carbon-700 bg-carbon-850/95 backdrop-blur px-5 sm:px-6 py-5">
                            <div className="min-w-0">
                                <p className="kicker text-[11px] text-heat-400 mb-1.5">what i did</p>
                                <h3 className="text-lg font-semibold text-carbon-100 leading-snug">{openProject.title}</h3>
                            </div>
                            <button
                                type="button"
                                ref={closeRef}
                                onClick={() => setOpenIndex(null)}
                                aria-label="Close"
                                className="p-2 -m-1 rounded-lg flex-shrink-0 text-carbon-400 hover:text-carbon-100 hover:bg-carbon-800 transition"
                            >
                                <Icon name="x" className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-5 sm:px-6 py-5">
                            <div className="flex flex-wrap gap-2 mb-5">
                                {openProject.tech.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md border border-carbon-700 bg-carbon-900 font-mono text-[11px] text-phosphor-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <ul className="space-y-3">
                                {(openProject.details ?? []).map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-carbon-200 leading-relaxed">
                                        <span className="text-phosphor-400 mr-2.5 mt-0.5 font-mono flex-shrink-0">▹</span>
                                        <span className="min-w-0 break-words">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-carbon-800">
                                {openProject.liveDemo && (
                                    <a
                                        href={openProject.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-heat-400 on-accent text-sm font-semibold hover:bg-heat-300 transition"
                                    >
                                        <Icon name="external-link" className="w-4 h-4" />
                                        Open live demo
                                    </a>
                                )}
                                {openProject.repo && (
                                    <a
                                        href={openProject.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-carbon-600 text-sm font-medium text-carbon-200 hover:border-heat-400/60 hover:text-carbon-100 transition"
                                    >
                                        <Icon name="github" className="w-4 h-4" />
                                        View code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Section>
    );
};
