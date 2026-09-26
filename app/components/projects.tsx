import React, { useState } from 'react';
import { useTiltEffect } from './hooks';
import { PROJECTS_DATA } from '../data';
import { SectionWrapper, Icon } from './utils';

export const Projects: React.FC = () => {
    const cardRefs = useTiltEffect();
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggle = (index: number) => {
        setExpanded(current => (current === index ? null : index));
    };

    return (
        <SectionWrapper id="projects" title="Featured Projects">
            <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS_DATA.map((project, index) => {
                    const isOpen = expanded === index;
                    return (
                        <div
                            key={index}
                            className={`bg-gray-800 p-6 rounded-xl tilt-card shadow-lg hover:shadow-green-900/50 transition duration-300 ${isOpen ? 'ring-1 ring-green-400/50' : ''}`}
                            ref={el => { cardRefs.current[index] = el; }}
                        >
                            <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-sm text-green-400 mb-4">{project.tech}</p>
                            <ul className="text-gray-300 mb-4 list-disc list-inside ml-4 border-l-4 border-green-400 pl-4">
                                {project.bullets.map((bullet, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                                ))}
                            </ul>

                            {project.details && project.details.length > 0 && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3">What I did</p>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            {project.details.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <Icon name="check" className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                {project.liveDemo && (
                                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition duration-300">
                                        <Icon name="external-link" className="w-4 h-4 mr-1" /> Live Demo
                                    </a>
                                )}
                                {project.repo ? (
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition duration-300">
                                        <Icon name="github" className="w-4 h-4 mr-1" /> View Code
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center text-sm font-medium text-gray-500">
                                        <Icon name="code" className="w-4 h-4 mr-1" /> Code Private
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                    className={`ml-auto inline-flex items-center text-sm font-medium transition duration-300 ${isOpen ? 'text-green-300' : 'text-green-400'} hover:text-green-300`}
                                >
                                    <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} className="w-4 h-4 mr-1" />
                                    What I did
                                    <span className="sr-only"> for {project.title}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};
