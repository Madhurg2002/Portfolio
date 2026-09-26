import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import { Section, SectionHeader, Icon } from './utils';

export const Projects: React.FC = () => {
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggle = (index: number) => {
        setExpanded(current => (current === index ? null : index));
    };

    return (
        <Section id="projects">
            <SectionHeader index="/03 — builds" title="Things I've Built" />

            <div className="grid md:grid-cols-2 gap-6">
                {PROJECTS_DATA.map((project, index) => {
                    const isOpen = expanded === index;
                    const techs = project.tech.split(',').map(t => t.trim()).filter(Boolean);

                    return (
                        <div
                            key={index}
                            className={`group relative flex flex-col p-6 rounded-2xl border bg-carbon-850 transition duration-300 hover:-translate-y-1 ${
                                isOpen
                                    ? 'border-heat-400/50 shadow-xl shadow-heat-500/10'
                                    : 'border-carbon-700 hover:border-carbon-600 hover:shadow-xl hover:shadow-black/40'
                            }`}
                        >
                            {/* header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-carbon-700 bg-carbon-900 text-heat-400 group-hover:text-heat-300 group-hover:border-heat-400/40 transition duration-300">
                                    <Icon name="folder-git-2" className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1">
                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} source code`}
                                            className="p-2 rounded-lg text-carbon-400 hover:text-white hover:bg-carbon-800 transition"
                                        >
                                            <Icon name="github" className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.liveDemo && (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} live demo`}
                                            className="p-2 rounded-lg text-carbon-400 hover:text-white hover:bg-carbon-800 transition"
                                        >
                                            <Icon name="external-link" className="w-5 h-5" />
                                        </a>
                                    )}
                                    {!project.repo && !project.liveDemo && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-carbon-700 text-[11px] font-mono text-carbon-400">
                                            <Icon name="lock" className="w-3 h-3" /> private
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
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

                            {/* expandable details */}
                            {project.details && project.details.length > 0 && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 mb-5' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="rounded-xl border border-carbon-700 bg-carbon-900 p-4">
                                        <p className="kicker text-[11px] text-heat-400 mb-3">what i did</p>
                                        <ul className="space-y-2.5">
                                            {project.details.map((item, i) => (
                                                <li key={i} className="flex items-start text-sm text-carbon-300 leading-relaxed">
                                                    <span className="text-phosphor-400 mr-2.5 mt-0.5 font-mono flex-shrink-0">▹</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* footer row */}
                            <div className="mt-auto flex items-center justify-between border-t border-carbon-800 pt-4">
                                <p className="text-xs font-mono text-carbon-500">
                                    {project.repo ? 'source available' : 'code private'}
                                </p>
                                {project.details && project.details.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => toggle(index)}
                                        aria-expanded={isOpen}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-heat-400 hover:text-heat-300 transition"
                                    >
                                        {isOpen ? 'Less' : 'What I did'}
                                        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="w-4 h-4" />
                                        <span className="sr-only"> for {project.title}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};
