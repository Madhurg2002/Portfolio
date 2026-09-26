import React, { useEffect } from 'react';

interface IconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

interface SectionHeaderProps {
    index: string;
    title: string;
}

// Lucide icon renderer (icons come from the global lucide UMD bundle)
export const Icon: React.FC<IconProps> = ({ name, className = '', style = {} }) => (
    <span data-lucide={name} className={className} style={style}></span>
);

/**
 * Re-run lucide.createIcons() after render so <span data-lucide> elements
 * become SVGs. Must re-run whenever icons swap (toggles, menus, modals).
 */
export function useLucideIcons(deps: unknown[] = []) {
    useEffect(() => {
        const w = window as unknown as { lucide?: { createIcons?: () => void } };
        w.lucide?.createIcons?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

// Numbered section header used across the page
export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, title }) => (
    <div className="mb-12 flex items-end justify-between gap-4">
        <div>
            <p className="kicker text-xs text-heat-400 mb-3">{index}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-carbon-100">{title}</h2>
        </div>
        <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-carbon-600 to-transparent mb-2" />
    </div>
);

// Section shell
export const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({
    id,
    children,
    className = '',
}) => (
    <section id={id} className={`py-20 sm:py-24 scroll-mt-20 ${className}`}>
        {children}
    </section>
);

export const Footer: React.FC = () => (
    <footer className="border-t border-carbon-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-carbon-400">
            <p className="font-mono text-xs">
                <span className="text-phosphor-400">$</span> whoami <span className="text-carbon-500">→</span> madhur-gupta
            </p>
            <p>&copy; {new Date().getFullYear()} Madhur Gupta · Built with React &amp; Tailwind</p>
        </div>
    </footer>
);
