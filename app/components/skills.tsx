import type React from 'react';
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {skills.map((skill) => (
                                <a
                                    key={skill.name}
                                    href={skill.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 min-w-0 p-3 sm:p-3.5 rounded-xl border border-carbon-700 bg-carbon-850 hover:border-heat-400/50 hover:bg-carbon-800 transition duration-200"
                                >
                                    {/* theme-aware tile: dark in dark mode, light gray in light mode;
                                        white monochrome logos get darkened via .skill-icon-white */}
                                    <span className="skill-tile flex items-center justify-center w-9 h-9 rounded-lg bg-carbon-800 border border-carbon-700 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={typeof skill.icon === 'string' ? skill.icon : undefined}
                                            alt={skill.name}
                                            loading="lazy"
                                            className={`skill-icon w-5 h-5${skill.whiteLogo ? ' skill-icon-white' : ''}`}
                                        />
                                    </span>
                                    <span className="min-w-0 text-[13px] sm:text-sm leading-snug break-words font-medium text-carbon-200 group-hover:text-carbon-100 transition">{skill.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
