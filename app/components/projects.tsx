import React from 'react';
import { useTiltEffect } from './hooks';
import { PROJECTS_DATA } from '../data';
import { SectionWrapper, Icon } from './utils';

export const Projects: React.FC = () => {
    const cardRefs = useTiltEffect();

    return (
        <SectionWrapper id="projects" title="Featured Projects">
            <div className="grid md:grid-cols-2 gap-8">
                {PROJECTS_DATA.map((project, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-6 rounded-xl tilt-card shadow-lg hover:shadow-green-900/50 transition duration-300"
                        ref={el => (cardRefs.current[index] = el)}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-sm text-green-400 mb-4">{project.tech}</p>
                        <ul className="text-gray-300 mb-4 list-disc list-inside ml-4 border-l-4 border-green-400 pl-4">
                            {project.bullets.map((bullet, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                        </ul>
                        <div className="flex space-x-4">
                            {project.liveDemo ? (
                                <a href={`https://${project.liveDemo}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition duration-300">
                                    <Icon name="external-link" className="w-4 h-4 mr-1" /> Live Demo
                                </a>
                            ) : (
                                <span className="inline-flex items-center text-sm font-medium text-gray-500">
                                    <Icon name="code" className="w-4 h-4 mr-1" /> Code Private
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};
