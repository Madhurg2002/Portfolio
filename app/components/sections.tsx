import React from 'react';
import { SectionWrapper, Icon } from './utils'; // Corrected import path
import { GITHUB_PROFILE_URL } from '../data';

export const AchievementsAndEducation: React.FC = () => (
    <SectionWrapper id="achievements" title="Achievements & Education">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">Key Achievements</h3>
                <ul className="space-y-3 text-gray-300 list-disc list-inside ml-4">
                    <li><strong>Research Publication:</strong> Authored and published paper in ACM: <em>Map Yog Intelligent Spatiotemporal Data Explorer</em>.</li>
                    <li><strong>Competitive Exams:</strong> Qualified <strong>GATE</strong> (Computer Science 2024) and <strong>CAT</strong> (2024).</li>
                    <li><strong>DSA Proficiency:</strong> Solved <strong>1000+</strong> problems across platforms with 90% accuracy.</li>
                    <li><strong>Hackathon Win:</strong> Contributed to a <strong>MERN stack web app</strong> with facial attendance and geolocation tracking (Codeshastra 8.0).</li>
                    <li><strong>Cybersecurity Internship:</strong> Received Certificate of Recognition from GPCSSI with "Excellent" performance.</li>
                </ul>
            </div>
    </SectionWrapper>
);

export const Contact: React.FC = () => (
    <SectionWrapper id="contact" title="Let's Connect" className="text-center">
        <p className="text-gray-400 mb-4 max-w-2xl mx-auto">I'm currently seeking new full-stack opportunities. Feel free to reach out via any of the methods below!</p>
        <div className="flex justify-center mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-green-400/40 bg-green-400/10 text-green-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></span>
                Open to opportunities
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a
                href="mailto:madhurg2002@gmail.com"
                className="group flex flex-col items-center p-6 bg-gray-800 border border-gray-700 rounded-xl transition duration-300 hover:border-green-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/40"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 border border-green-400/30 mb-4 group-hover:bg-green-400/20 transition duration-300">
                    <Icon name="mail" className="w-5 h-5 text-green-400" />
                </span>
                <span className="text-white font-semibold mb-1">Email</span>
                <span className="text-gray-400 text-sm break-all">madhurg2002@gmail.com</span>
            </a>
            <a
                href="https://wa.me/919034453365"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gray-800 border border-gray-700 rounded-xl transition duration-300 hover:border-green-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/40"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 border border-green-400/30 mb-4 group-hover:bg-green-400/20 transition duration-300">
                    <Icon name="message-square" className="w-5 h-5 text-green-400" />
                </span>
                <span className="text-white font-semibold mb-1">WhatsApp</span>
                <span className="text-gray-400 text-sm">+91 90344 53365</span>
            </a>
            <a
                href="https://www.linkedin.com/in/madhurg2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gray-800 border border-gray-700 rounded-xl transition duration-300 hover:border-green-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/40"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 border border-green-400/30 mb-4 group-hover:bg-green-400/20 transition duration-300">
                    <Icon name="linkedin" className="w-5 h-5 text-green-400" />
                </span>
                <span className="text-white font-semibold mb-1">LinkedIn</span>
                <span className="text-gray-400 text-sm">in/madhurg2002</span>
            </a>
            <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gray-800 border border-gray-700 rounded-xl transition duration-300 hover:border-green-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/40"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10 border border-green-400/30 mb-4 group-hover:bg-green-400/20 transition duration-300">
                    <Icon name="github" className="w-5 h-5 text-green-400" />
                </span>
                <span className="text-white font-semibold mb-1">GitHub</span>
                <span className="text-gray-400 text-sm">@Madhurg2002</span>
            </a>
        </div>

        <p className="mt-10 text-gray-500 text-sm">
            Prefer async? Email works best — I usually reply within a day.
        </p>
    </SectionWrapper>
);
