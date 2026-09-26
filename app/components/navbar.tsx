import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './utils';
import { ThemeToggle } from './themeToggle';

export const Navbar: React.FC = () => {
    const links = ['skills', 'experience', 'projects', 'achievements', 'contact'];
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // Escape closes the mobile menu and returns focus to the hamburger.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setOpen(false);
            toggleRef.current?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className="fixed top-0 inset-x-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-4 flex items-center justify-between h-14 px-5 rounded-2xl border border-carbon-700/70 bg-carbon-900/70 backdrop-blur-xl shadow-lg shadow-black/30">
                    <a href="#home" className="min-w-0 truncate font-mono text-sm font-semibold tracking-tight text-carbon-100">
                        <span className="text-heat-400">~</span>/madhur<span className="text-phosphor-400">.dev</span>
                    </a>
                    <nav aria-label="Site sections" className="hidden md:flex items-center gap-1">
                        {links.map((id, i) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className="px-3 py-1.5 rounded-lg text-sm text-carbon-300 hover:text-carbon-100 hover:bg-carbon-800 transition duration-200"
                            >
                                <span className="font-mono text-xs text-heat-400/80 mr-1.5">0{i + 1}.</span>
                                {id}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center h-8 px-4 rounded-lg border border-heat-400/40 bg-heat-400/10 text-heat-300 text-sm font-medium hover:bg-heat-400/20 transition duration-200"
                        >
                            Hire me
                        </a>
                        <button
                            type="button"
                            ref={toggleRef}
                            onClick={() => setOpen(!open)}
                            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-carbon-300 hover:text-carbon-100 hover:bg-carbon-800 transition"
                            aria-label="Toggle menu"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                        >
                            <Icon name={open ? 'x' : 'menu'} className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {open && (
                    <nav
                        id="mobile-menu"
                        aria-label="Site sections"
                        className="md:hidden mt-2 rounded-2xl border border-carbon-700/70 bg-carbon-900/95 backdrop-blur-xl shadow-lg shadow-black/30 overflow-hidden"
                    >
                        {links.map((id, i) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center px-5 py-3 text-sm text-carbon-300 hover:text-carbon-100 hover:bg-carbon-800 transition border-b border-carbon-800 last:border-b-0"
                            >
                                <span className="font-mono text-xs text-heat-400/80 mr-3">0{i + 1}.</span>
                                {id}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="sm:hidden flex items-center px-5 py-3 text-sm font-medium text-heat-300 hover:bg-carbon-800 transition border-t border-carbon-800"
                        >
                            <span className="font-mono text-xs text-heat-400/80 mr-3">→</span>
                            Hire me
                        </a>
                    </nav>
                )}
            </div>
        </header>
    );
};
