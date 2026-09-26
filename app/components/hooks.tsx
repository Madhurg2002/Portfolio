import { useCallback, useEffect, useState } from 'react';
import type React from 'react';

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

// --- ANCHOR NAVIGATION ---

/**
 * Move keyboard focus to the section a hash link points at.
 *
 * Scrolling alone is not navigation as far as a keyboard or screen-reader
 * user is concerned: the viewport moves but focus stays on the link in the
 * navbar, so the next Tab press carries on from the top of the page and the
 * section that was just jumped to is skipped entirely.
 *
 * Call this once, high in the tree. Targets must be focusable (tabIndex -1),
 * which Section sets. preventScroll is deliberate — the browser's own
 * fragment scrolling already handles the viewport, and letting focus scroll
 * as well would fight it.
 */
export function useHashFocus() {
    useEffect(() => {
        const focusHash = () => {
            const id = window.location.hash.slice(1);
            if (!id) return;
            document.getElementById(id)?.focus({ preventScroll: true });
        };
        focusHash();
        window.addEventListener('hashchange', focusHash);
        return () => window.removeEventListener('hashchange', focusHash);
    }, []);
}

// --- FOCUS TRAPPING ---

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Whether `el` is actually rendered, and therefore tabbable.
 *
 * checkVisibility() is the check that gets this right: the project modal
 * lives inside a `position: fixed` container, and offsetParent is null for
 * every descendant of a fixed element, so the offsetParent test would
 * report a perfectly visible button as hidden and empty out the trap.
 * Older engines (Safari 15.5-17.3) have inert but not checkVisibility, so
 * getClientRects is the fallback there.
 */
function isVisible(el: HTMLElement): boolean {
    const check = (el as { checkVisibility?: (o?: object) => boolean }).checkVisibility;
    if (typeof check === 'function') return check.call(el, { checkVisibilityCSS: true });
    return el.getClientRects().length > 0;
}

/** Focusable descendants of `root`, in tab order. */
function getFocusable(root: HTMLElement): HTMLElement[] {
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isVisible);
}

/**
 * Keep keyboard focus inside `ref` while `active`, and make everything else
 * unreachable while it is.
 *
 * Two halves, because either alone is a half-fix:
 *
 *  - Tab / Shift-Tab wrap at the first and last focusable node. Without this,
 *    Tab walks straight out of an open dialog into the page behind it.
 *  - Every element outside the container's ancestor chain is marked `inert`.
 *    `inert` removes the node from the tab order *and* from the accessibility
 *    tree, which is what actually makes an `aria-modal="true"` promise true.
 *    Wrapping alone still leaves background content exposed to screen
 *    readers, which browse the tree rather than the tab order.
 *
 * Inerting siblings at every level (not just body's children) is what keeps
 * the container reachable: the modal and the rest of the page share ancestors,
 * so marking `document.body`'s direct children would inert the modal too.
 *
 * Everything added here is undone on cleanup, so the attributes never leak
 * into the next render or the next open.
 */
export function useFocusTrap(
    ref: React.RefObject<HTMLElement | null>,
    active: boolean,
    options: { initialFocus?: React.RefObject<HTMLElement | null> } = {},
) {
    const { initialFocus } = options;

    useEffect(() => {
        if (!active) return;
        const container = ref.current;
        if (!container) return;

        // Mark everything outside the container inert, level by level.
        const inerted: HTMLElement[] = [];
        let node: HTMLElement | null = container;
        while (node && node !== document.body && node.parentElement) {
            const parent: HTMLElement = node.parentElement;
            for (const sibling of Array.from(parent.children)) {
                if (sibling === node || !(sibling instanceof HTMLElement)) continue;
                if (sibling.hasAttribute('inert')) continue;
                sibling.setAttribute('inert', '');
                inerted.push(sibling);
            }
            node = parent;
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey) return;

            const focusable = getFocusable(container);
            if (focusable.length === 0) {
                e.preventDefault();
                container.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const current = document.activeElement;
            const inside = container.contains(current);

            // Focus sitting outside the container (the trigger that opened it,
            // or body) is pulled in from whichever end the user is heading to.
            if (e.shiftKey) {
                if (!inside || current === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else if (!inside || current === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        (initialFocus?.current ?? getFocusable(container)[0])?.focus();

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            for (const el of inerted) el.removeAttribute('inert');
        };
    }, [ref, active, initialFocus]);
}
