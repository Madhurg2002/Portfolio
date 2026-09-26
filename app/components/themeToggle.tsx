import React from 'react';
import { Icon, useLucideIcons } from './utils';
import { useTheme } from './hooks';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { theme, toggle } = useTheme();
    useLucideIcons([theme]);
    const nextLabel = theme === 'dark' ? 'Light' : 'Dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${nextLabel.toLowerCase()} mode (currently ${theme})`}
            title={`Switch to ${nextLabel.toLowerCase()} mode`}
            className={`inline-flex items-center gap-2 h-9 pl-2.5 pr-3 rounded-lg border border-carbon-700 bg-carbon-850 text-carbon-300 hover:text-white hover:border-heat-400/50 transition ${className}`}
        >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4 text-heat-400" />
            <span className="text-xs font-medium">{nextLabel}</span>
        </button>
    );
};
