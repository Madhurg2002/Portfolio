import React, { useState, useEffect } from 'react';
import { Icon } from './utils';
import { GITHUB_PROFILE_URL } from '../data';

export const Hero: React.FC = () => {
    const roles: string[] = ["Full Stack Developer", "Backend Automation Specialist", "Geospatial Engineer", "UI/UX Enthusiast"];
    const [displayedText, setDisplayedText] = useState<string>('');
    const [roleIndex, setRoleIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const currentRole: string = roles[roleIndex];
        const typingSpeed: number = isDeleting ? 50 : 100;

        timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentRole.length) {
                setDisplayedText(currentRole.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setDisplayedText(currentRole.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of word
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIndex === 0) {
                // Done deleting, start next word
                setIsDeleting(false);
                setRoleIndex((roleIndex + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex]);


    return (
        <section id="home" className="py-24 md:py-36 text-center">
            <div className="relative max-w-4xl mx-auto">
                <p className="text-lg text-gray-400 mb-4">Hello, I'm</p>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight">
                    Madhur Gupta
                </h1>
                <p className="text-2xl sm:text-4xl font-light text-gray-300 mb-8 h-10 md:h-12">
                    A <span className="gradient-text font-mono tracking-wide">{displayedText}</span>
                    <span className="inline-block w-1 bg-green-400 animate-pulse ml-1 h-8"></span>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#projects" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-gray-900 bg-green-400 hover:bg-green-500 transition duration-300 transform hover:scale-105">
                        View Projects
                    </a>
                    <a href="#contact" className="inline-flex items-center px-8 py-3 border border-green-400 text-base font-medium rounded-xl text-green-400 hover:bg-green-900 transition duration-300 transform hover:scale-105">
                        Get in Touch
                    </a>
                    <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-3 border border-green-400 text-base font-medium rounded-xl text-green-400 hover:bg-green-900 transition duration-300 transform hover:scale-105">
                        <Icon name="github" className="w-5 h-5 mr-2" /> GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};
