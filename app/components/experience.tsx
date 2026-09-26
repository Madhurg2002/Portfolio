import React from 'react';
import { useTiltEffect } from './hooks';
import { EXPERIENCE_DATA } from '../data';
import { SectionWrapper } from './utils';

export const Experience: React.FC = () => {
    const cardRefs = useTiltEffect();

    return (
        <SectionWrapper id="experience" title="Professional Experience">
            <div className="space-y-10">
                {EXPERIENCE_DATA.map((job, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-6 sm:p-8 rounded-xl tilt-card shadow-lg hover:shadow-green-900/50 transition duration-300"
                        ref={el => { cardRefs.current[index] = el; }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
                                <p className="text-green-400 text-lg">{job.company}</p>
                            </div>
                            <p className="text-sm text-gray-400 md:text-right pt-2 md:pt-0">{job.duration}</p>
                        </div>
                        <ul className="space-y-3 text-gray-300 list-disc list-inside ml-4 border-l-4 border-green-400 pl-4">
                            {job.bullets.map((bullet, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};
