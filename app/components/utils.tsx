import React from 'react';

// 1. Define types for reusable components

interface IconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

interface SectionWrapperProps {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

// 2. Implement Components using TypeScript interfaces

// Helper component to render Lucide Icons
export const Icon: React.FC<IconProps> = ({ name, className = '', style = {} }) => {
    return <span data-lucide={name} className={className} style={style}></span>;
};

// Custom React Logo with spinning animation
export const ReactLogo: React.FC = () => (
    <div className="react-logo">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="-11.5 -10.23174 23 20.46348" 
            width="40" height="40"
            className="text-4xl mb-2 block mx-auto react-spin-target" // Target for CSS spin
            style={{ color: '#61DAFB' }} 
        >
            <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
            <g stroke="#61DAFB" strokeWidth="1" fill="none">
                {/* Ellipses fill is now set to the body background color in global styles */}
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    </div>
);

// Generic wrapper for all sections
export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, className = '' }) => (
    <section id={id} className={`py-16 border-t border-gray-800 ${className}`}>
        <h2 className="text-4xl font-bold text-center mb-12">
            {title.split(' ').map((word, index) => (
                <span key={index} className={index === 0 || index === 2 ? 'text-white' : 'gradient-text'}>
                    {word}{' '}
                </span>
            ))}
        </h2>
        {children}
    </section>
);

export const Footer: React.FC = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Madhur Gupta. Built with React, Tailwind CSS & lots of ☕.</p>
        </div>
    </footer>
);
