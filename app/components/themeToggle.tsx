import type React from 'react';
import { Icon } from './utils';
import { useTheme } from './hooks';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { theme, toggle } = useTheme();
    const nextLabel = theme === 'dark' ? 'Light' : 'Dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${nextLabel.toLowerCase()} mode (currently ${theme})`}
            title={`Switch to ${nextLabel.toLowerCase()} mode`}
            className={`inline-flex items-center gap-2 h-9 flex-shrink-0 pl-2.5 pr-2.5 min-[380px]:pr-3 rounded-lg border border-carbon-700 bg-carbon-850 text-carbon-300 hover:text-carbon-100 hover:border-heat-400/50 transition ${className}`}
        >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4 flex-shrink-0 text-heat-400" />
            {/* label is redundant with the aria-label and crowds the bar on
                very narrow screens, so it only appears from ~380px up */}
            <span className="hidden min-[380px]:inline text-xs font-medium">{nextLabel}</span>
        </button>
    );
};
