// @vitest-environment jsdom
import '../test-setup';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Section, SectionHeader } from './utils';
import { useHashFocus } from './hooks';

afterEach(cleanup);
beforeEach(() => {
    window.location.hash = '';
});

// Stands in for home.tsx: one listener for the whole page, several Sections.
function Page() {
    useHashFocus();
    return (
        <div>
            <nav>
                <a href="#skills">skills</a>
                <a href="#projects">projects</a>
            </nav>
            <main>
                <Section id="skills">
                    <SectionHeader index="/01" title="Skills" />
                </Section>
                <Section id="projects">
                    <SectionHeader index="/03" title="Projects" />
                </Section>
            </main>
        </div>
    );
}

describe('hash link focus', () => {
    it('makes every section able to hold focus', () => {
        render(<Page />);
        // tabIndex -1 is what turns a section into a focusable target.
        for (const id of ['skills', 'projects']) {
            expect(document.getElementById(id)?.getAttribute('tabindex')).toBe('-1');
        }
    });

    it('moves focus into the section when its link is followed', () => {
        render(<Page />);
        fireEvent.click(screen.getByRole('link', { name: 'projects' }));

        // jsdom does not navigate a fragment on its own, so set the hash the
        // way the browser would and let the listener react to it.
        act(() => {
            window.location.hash = '#projects';
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        expect(document.activeElement).toBe(document.getElementById('projects'));
    });

    it('moves focus on load when the page opens straight at a hash', () => {
        window.location.hash = '#skills';
        render(<Page />);
        expect(document.activeElement).toBe(document.getElementById('skills'));
    });

    it('ignores a hash that matches nothing', () => {
        render(<Page />);
        act(() => {
            window.location.hash = '#nope';
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        // Still focused on body rather than throwing or focusing a stray node.
        expect(document.activeElement).toBe(document.body);
    });

    it('removes its listener on unmount', () => {
        const remove = vi.spyOn(window, 'removeEventListener');
        const { unmount } = render(<Page />);
        unmount();
        expect(remove).toHaveBeenCalledWith('hashchange', expect.any(Function));
        remove.mockRestore();
    });
});
