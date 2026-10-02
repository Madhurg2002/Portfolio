// @vitest-environment jsdom
import '../test-setup';

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { AchievementsAndEducation } from './sections';

afterEach(cleanup);

describe('achievement links', () => {
    it('turns a linked title into a safe outbound link', () => {
        render(<AchievementsAndEducation />);
        const link = screen.getByRole('link', { name: /opens the ACM Digital Library/ });

        expect(link.textContent).toBe(
            'ACM SIGSPATIAL Workshop (2024) — opens the ACM Digital Library in a new tab',
        );
        expect(link.getAttribute('href')).toBe('https://doi.org/10.1145/3681780.3697250');
        expect(link.getAttribute('target')).toBe('_blank');
        // noopener/noreferrer are the reason target="_blank" is safe here.
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('keeps the new-tab hint out of the visible text', () => {
        render(<AchievementsAndEducation />);
        const link = screen.getByRole('link', { name: /opens the ACM Digital Library/ });

        // The suffix is screen-reader-only, so on screen the card still reads
        // as the title plus an outbound arrow, not a sentence about tabs.
        const srOnly = link.querySelector('.sr-only');
        expect(srOnly).not.toBeNull();
        expect(srOnly?.textContent).toContain('opens the ACM Digital Library');

        const visible = Array.from(link.childNodes)
            .filter(n => !(n instanceof Element && n.classList.contains('sr-only')))
            .map(n => n.textContent)
            .join('')
            .trim();
        expect(visible).toBe('ACM SIGSPATIAL Workshop (2024)');
    });

    it('leaves unlinked achievements as plain text', () => {
        render(<AchievementsAndEducation />);
        const gate = screen.getByRole('heading', { name: 'GATE CS 2024' });
        expect(gate.querySelector('a')).toBeNull();
    });

    it('links only what has a URL', () => {
        render(<AchievementsAndEducation />);
        // One linked achievement out of four; the other three stay plain.
        expect(screen.getAllByRole('link')).toHaveLength(1);
    });
});
