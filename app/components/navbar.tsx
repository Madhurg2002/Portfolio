import React, { useState, useEffect } from 'react';
import { Icon } from './utils';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Ensure icons in the mobile menu and button appear
    useEffect(() => {
        if (typeof (window as any).lucide !== 'undefined') {
            (window as any).lucide.createIcons();
        }
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-xl font-bold gradient-text">Madhur.dev</a>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        {['skills', 'experience', 'projects', 'achievements', 'contact'].map(id => (
                            <a key={id} href={`#${id}`} className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300 capitalize">
                                {id}
                            </a>
                        ))}
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-green-400 focus:outline-none">
                        <Icon name={isOpen ? 'x' : 'menu'} className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
                    {['skills', 'experience', 'projects', 'achievements', 'contact'].map(id => (
                        <a key={id} href={`#${id}`} onClick={() => setIsOpen(false)} className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium capitalize">
                            {id}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};
