import React from 'react';
import { SectionWrapper, Icon } from './utils'; // Corrected import path

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
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">I'm currently seeking new full-stack opportunities. Feel free to reach out via any of the methods below!</p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="mailto:madhurg2002@gmail.com" className="inline-flex items-center justify-center px-6 py-3 border border-green-400 text-base font-medium rounded-xl text-green-400 hover:bg-green-900 transition duration-300 transform hover:scale-105">
                <Icon name="mail" className="w-5 h-5 mr-2" /> Email
            </a>
            <a href="https://wa.me/919034453365" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-green-400 text-base font-medium rounded-xl text-green-400 hover:bg-green-900 transition duration-300 transform hover:scale-105">
                <Icon name="message-square" className="w-5 h-5 mr-2" /> WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/madhurg2002/overlay/messaging/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-green-400 text-base font-medium rounded-xl text-green-400 hover:bg-green-900 transition duration-300 transform hover:scale-105">
                <Icon name="linkedin" className="w-5 h-5 mr-2" /> LinkedIn Message
            </a>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
            <p>Find me on GitHub: <a href="https://github.com/madhurg2002" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">github.com/madhurg2002</a></p>
        </div>
    </SectionWrapper>
);
