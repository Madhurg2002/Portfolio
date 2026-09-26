import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { ICONS } from './icons';

/**
 * Guard against the failure that actually shipped: the project cards' icon
 * name was `folder-git-2`, and because <Icon /> returns null for an unknown
 * name, every project card rendered with no glyph and nothing failed. The
 * name had been dropped from the inlined set during a refactor.
 *
 * These tests scan the component sources for icon names and assert they all
 * resolve, so a future rename or a missing entry breaks the build instead of
 * the page.
 */
const COMPONENT_DIR = join(process.cwd(), 'app', 'components');

/**
 * Literal `name="some-icon"` and `icon: 'some-icon'` in the components.
 *
 * The character class deliberately allows single-word names ("github",
 * "mail") and digits ("folder-git-2"). An earlier version of this scanner
 * required a hyphen and excluded digits, so it silently missed nine of the
 * icons - the exact blind spot that let the project icon ship broken.
 */
function referencedIconNames(): string[] {
    const names = new Set<string>();

    for (const file of readdirSync(COMPONENT_DIR).filter((f) => f.endsWith('.tsx'))) {
        const source = readFileSync(join(COMPONENT_DIR, file), 'utf8');
        for (const match of source.matchAll(/(?:name=|icon:\s*)["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/g)) {
            names.add(match[1]);
        }
    }

    return [...names].sort();
}

/**
 * Icons only ever reached through a ternary, so the literal scanner cannot
 * see them: the theme toggle picks sun/moon and the navbar picks x/menu.
 * ("x" is listed literally by the modal's close button too.)
 */
const CONDITIONAL_ONLY = ['sun', 'moon', 'menu'];

describe('icon coverage', () => {
    const referenced = referencedIconNames();

    it('scans every icon outside the ternary-only set', () => {
        // Guards the guard: if the scanner regex ever stops matching, this
        // fails loudly instead of the tests below quietly passing on a short
        // set. Derived from the data rather than hardcoded, so adding an icon
        // does not need this number updated by hand.
        expect(referenced.length).toBe(
            Object.keys(ICONS).length - CONDITIONAL_ONLY.length,
        );
    });

    it('resolves every icon name referenced by a component', () => {
        const missing = referenced.filter((name) => !(name in ICONS));
        expect(
            missing,
            `Icons referenced in components but absent from icons.tsx: ${missing.join(', ')}`,
        ).toEqual([]);
    });

    it('has no unused icons', () => {
        const used = new Set([...referenced, ...CONDITIONAL_ONLY]);
        const unused = Object.keys(ICONS).filter((name) => !used.has(name));
        expect(unused, `Icons defined but never used: ${unused.join(', ')}`).toEqual([]);
    });
});
