import React from 'react';
import { Icon } from './utils';
import { useTheme } from './hooks';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { theme, toggle } = useTheme();

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-carbon-700 bg-carbon-850 text-carbon-300 hover:text-white hover:border-heat-400/50 transition ${className}`}
        >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4" />
        </button>
    );
};
