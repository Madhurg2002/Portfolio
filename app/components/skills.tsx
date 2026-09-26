import React from 'react';
import { SKILLS_DATA } from '../data';
import { Section, SectionHeader } from './utils';

export const Skills: React.FC = () => {
    return (
        <Section id="skills">
            <SectionHeader index="/01 — stack" title="Skills & Tools" />
            <div className="space-y-10">
                {Object.entries(SKILLS_DATA).map(([category, skills]) => (
                    <div key={category} className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start">
                        <h3 className="kicker text-xs text-carbon-400 md:pt-3">{category}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                            {skills.map((skill) => (
                                <a
                                    key={skill.name}
                                    href={skill.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 p-3.5 rounded-xl border border-carbon-700 bg-carbon-850 hover:border-heat-400/50 hover:bg-carbon-800 transition duration-200"
                                >
                                    <img
                                        src={typeof skill.icon === 'string' ? skill.icon : undefined}
                                        alt=""
                                        className="w-7 h-7 flex-shrink-0 transition duration-200 group-hover:scale-110"
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.08))' }}
                                    />
                                    <span className="text-sm font-medium text-carbon-200 group-hover:text-white transition">{skill.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
