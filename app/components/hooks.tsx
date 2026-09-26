import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme(): { theme: Theme; toggle: () => void } {
    // Seeded with the SSR default on both server and client so the first
    // client render matches the server's HTML (no hydration mismatch for
    // light-mode users). The stored/system theme is applied right after
    // mount; the no-FOUC script in root.tsx has already painted the correct
    // CSS class, so only the toggle's icon/label corrects itself.
    const [theme, setTheme] = useState<Theme>('dark');
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        setTheme(getInitialTheme());
        setResolved(true);
    }, []);

    useEffect(() => {
        // Skip the first commit: `theme` is still the SSR default here, and
        // applying it would momentarily overwrite a stored light theme.
        if (!resolved) return;
        const root = document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(theme);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme, resolved]);

    const toggle = useCallback(() => {
        setTheme(current => (current === 'dark' ? 'light' : 'dark'));
    }, []);

    return { theme, toggle };
}
