// @vitest-environment jsdom
import '../test-setup';

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Projects } from './projects';
import { Navbar } from './navbar';

afterEach(cleanup);

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Mirrors the visibility test in useFocusTrap. */
function isVisible(el: HTMLElement): boolean {
    const cv = (el as { checkVisibility?: (o?: object) => boolean }).checkVisibility;
    return cv ? cv.call(el, { checkVisibilityCSS: true }) : el.getClientRects().length > 0;
}

/** Everything the browser would put in the tab order, right now. */
function documentTabOrder(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        el => !el.closest('[inert]') && isVisible(el),
    );
}

/** The focusable descendants of one container, in the order the trap sees. */
function focusablesIn(root: HTMLElement): HTMLElement[] {
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isVisible);
}

/**
 * One Tab press, the way a browser runs it: the keydown handler gets first
 * say, and the natural focus move only happens if nothing called
 * preventDefault. If the trap is doing its job the move never runs.
 */
function pressTab(shiftKey = false) {
    const from = document.activeElement ?? document.body;
    const notPrevented = fireEvent(
        from,
        new KeyboardEvent('keydown', {
            key: 'Tab',
            shiftKey,
            bubbles: true,
            cancelable: true,
        }),
    );
    if (!notPrevented) return;

    const order = documentTabOrder();
    const index = order.indexOf(from as HTMLElement);
    const next =
        shiftKey
            ? index <= 0
                ? order[order.length - 1]
                : order[index - 1]
            : index === -1 || index === order.length - 1
              ? order[0]
              : order[index + 1];
    next?.focus();
}

const label = (el: Element | null) =>
    el?.getAttribute('aria-label') ?? el?.textContent?.trim() ?? String(el?.tagName);

/* ------------------------------------------------------------------ */

describe('project modal focus trap', () => {
    function openModal() {
        render(
            <div>
                <a href="#before">background before</a>
                <Projects />
                <a href="#after">background after</a>
            </div>,
        );
        fireEvent.click(screen.getAllByRole('button', { name: /what i did/i })[0]);
        return screen.getByRole('dialog');
    }

    it('moves focus into the dialog when it opens', () => {
        openModal();
        expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }));
    });

    it('marks the rest of the page inert while open', () => {
        const dialog = openModal();
        // The dialog shares ancestors with the page, so the background is cut
        // off sibling-by-sibling rather than by inerting <body>.
        expect(document.body.hasAttribute('inert')).toBe(false);
        expect(screen.getByText('background before').closest('[inert]')).not.toBeNull();
        expect(screen.getByText('background after').closest('[inert]')).not.toBeNull();
        expect(dialog.closest('[inert]')).toBeNull();
    });

    it('keeps every Tab press inside the dialog', () => {
        const dialog = openModal();
        const items = focusablesIn(dialog);
        const seen: string[] = [];
        for (let i = 0; i < items.length * 3; i++) {
            pressTab();
            expect(dialog.contains(document.activeElement)).toBe(true);
            seen.push(label(document.activeElement));
        }
        expect(seen).not.toContain('background before');
        expect(seen).not.toContain('background after');
        // The run is three times round a cycle of `items.length` controls, and
        // the final press wrapped past the last control back onto the first.
        expect(new Set(seen)).toEqual(new Set(items.map(label)));
        expect(seen[items.length - 1]).toBe(label(items[0]));
    });

    it('wraps forward off the last control back to the first', () => {
        const dialog = openModal();
        const items = focusablesIn(dialog);
        expect(items.length).toBeGreaterThan(1);

        items[items.length - 1].focus();
        pressTab();
        expect(document.activeElement).toBe(items[0]);
    });

    it('wraps backward off the first control to the last', () => {
        const dialog = openModal();
        const items = focusablesIn(dialog);

        items[0].focus();
        pressTab(true);
        expect(document.activeElement).toBe(items[items.length - 1]);
    });

    it('pulls focus back in when focus sits outside the dialog', () => {
        const dialog = openModal();
        const items = focusablesIn(dialog);

        // Blur leaves focus on <body>, which is never inert — this exercises
        // the handler's outside-focus branch the same way a stray click would.
        (document.activeElement as HTMLElement).blur();
        expect(document.activeElement).toBe(document.body);

        pressTab();
        expect(document.activeElement).toBe(items[0]);
    });

    it('removes inert and restores focus on Escape', () => {
        openModal();
        const trigger = screen.getAllByRole('button', { name: /what i did/i })[0];
        fireEvent.keyDown(document, { key: 'Escape' });

        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.querySelectorAll('[inert]')).toHaveLength(0);
        expect(document.activeElement).toBe(trigger);
        expect(document.body.style.overflow).toBe('');
    });
});

describe('mobile navigation menu focus trap', () => {
    function openMenu() {
        render(
            <div>
                <Navbar />
                <main>
                    <a href="#one">page link one</a>
                    <a href="#two">page link two</a>
                </main>
            </div>,
        );
        const toggle = screen.getByRole('button', { name: /toggle menu/i });
        fireEvent.click(toggle);
        // The desktop and mobile navs share an accessible name, so the panel
        // is addressed by its id rather than by role.
        const menu = document.getElementById('mobile-menu') as HTMLElement;
        return { toggle, menu, nav: toggle.closest('header') as HTMLElement };
    }

    it('moves focus to the first menu item when it opens', () => {
        const { menu } = openMenu();
        expect(document.activeElement).toBe(focusablesIn(menu)[0]);
    });

    it('marks the page content inert while open', () => {
        openMenu();
        expect(screen.getByRole('main').hasAttribute('inert')).toBe(true);
        expect(screen.getByText('page link one').closest('[inert]')).not.toBeNull();
    });

    it('keeps every Tab press inside the navbar', () => {
        const { nav, menu } = openMenu();
        for (let i = 0; i < 12; i++) {
            pressTab();
            expect(nav.contains(document.activeElement)).toBe(true);
            expect(focusablesIn(menu).length).toBeGreaterThan(0);
        }
    });

    it('never lands on a page link behind the menu', () => {
        const { nav } = openMenu();
        const pageLinks = Array.from(screen.getByRole('main').querySelectorAll('a[href]'));
        for (let i = 0; i < 12; i++) {
            pressTab();
            expect(pageLinks).not.toContain(document.activeElement);
            expect(nav.contains(document.activeElement)).toBe(true);
        }
    });

    it('wraps forward off the last navbar control back to the first', () => {
        const { nav } = openMenu();
        const items = focusablesIn(nav);
        items[items.length - 1].focus();
        pressTab();
        expect(document.activeElement).toBe(items[0]);
    });

    it('wraps backward off the first navbar control to the last', () => {
        const { nav } = openMenu();
        const items = focusablesIn(nav);
        items[0].focus();
        pressTab(true);
        expect(document.activeElement).toBe(items[items.length - 1]);
    });

    it('removes inert and returns focus to the toggle on Escape', () => {
        const { toggle } = openMenu();
        fireEvent.keyDown(document, { key: 'Escape' });

        expect(document.querySelectorAll('[inert]')).toHaveLength(0);
        expect(document.activeElement).toBe(toggle);
        expect(screen.getByRole('main').hasAttribute('inert')).toBe(false);
    });

    it('closes and un-inerts when a menu link is chosen', () => {
        const { menu } = openMenu();
        fireEvent.click(focusablesIn(menu)[0]);
        expect(document.querySelectorAll('[inert]')).toHaveLength(0);
    });
});

describe('control: without a trap, focus really would leave', () => {
    it('tabbing out of a plain pair of links reaches the second one', () => {
        render(
            <div>
                <a href="#a">first</a>
                <a href="#b">second</a>
            </div>,
        );
        screen.getByText('first').focus();
        pressTab();
        expect(document.activeElement).toBe(screen.getByText('second'));
    });
});
