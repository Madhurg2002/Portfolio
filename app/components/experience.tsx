import React from 'react';
import { EXPERIENCE_DATA } from '../data';
import { Section, SectionHeader } from './utils';

export const Experience: React.FC = () => {
    return (
        <Section id="experience">
            <SectionHeader index="/02 — career" title="Where I've Worked" />
            <div className="relative ml-2 md:ml-4">
                {/* rail */}
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-heat-400/60 via-carbon-700 to-transparent" />

                <div className="space-y-12">
                    {EXPERIENCE_DATA.map((job, index) => (
                        <div key={index} className="relative pl-8 md:pl-12">
                            {/* node */}
                            <span className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full border-2 border-heat-400 bg-carbon-950" />

                            <div className="group p-6 sm:p-7 rounded-2xl border border-carbon-700 bg-carbon-850 hover:border-carbon-600 transition duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        {job.title} <span className="text-heat-400">@ {job.company}</span>
                                    </h3>
                                    <p className="font-mono text-xs text-carbon-400">{job.duration}</p>
                                </div>
                                <ul className="space-y-2.5">
                                    {job.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start text-sm text-carbon-300 leading-relaxed">
                                            <span className="text-phosphor-400 mr-3 mt-0.5 font-mono flex-shrink-0">▹</span>
                                            <span dangerouslySetInnerHTML={{ __html: bullet }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
