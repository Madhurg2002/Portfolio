import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { ICONS } from './icons';

/**
 * Guard against the failure that actually shipped: the project cards' icon
 * name was `folder-git-2`, and because <Icon /> returns null for an unknown
 * name, every project card rendered with no glyph and nothing failed.
 *
 * These tests scan the source for icon names and assert they all resolve, so
 * a future rename or a missing entry breaks the build instead of the page.
 */
const APP_DIR = join(process.cwd(), 'app');

/** Every .ts/.tsx under app/, so data.ts is covered as well as components. */
function sourceFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) return sourceFiles(full);
        return /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [full] : [];
    });
}

/**
 * Collects icon names from the two places they legitimately appear:
 *   1. `<Icon name="some-icon" ... />` in a component
 *   2. an `icon: 'some-icon'` key in a data object
 *
 * Deliberately does NOT scan bare `name="..."`: that also matches
 * `<meta name="viewport">` and the meta descriptors in root.tsx, which are not
 * icons. An earlier version of this scanner was too narrow (it required a
 * hyphen and excluded digits) and missed nine icons; a later version was too
 * wide and picked up the meta tags. These two patterns are the narrow middle.
 */
function referencedIconNames(): string[] {
    const names = new Set<string>();
    const patterns = [
        /<Icon\s+name=["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/g,
        /(?:^|[{,\s])icon:\s*["']([a-z0-9]+(?:-[a-z0-9]+)*)["']/gm,
    ];

    for (const file of sourceFiles(APP_DIR)) {
        const source = readFileSync(file, 'utf8');
        for (const pattern of patterns) {
            for (const match of source.matchAll(pattern)) {
                names.add(match[1]);
            }
        }
    }

    return [...names].sort();
}

/**
 * Icons that exist in the map but cannot be found by a literal scan, so they
 * are expected to be missing from `referenced`:
 *
 * - CONDITIONAL_ONLY: picked through a ternary (theme toggle sun/moon, navbar
 *   x/menu). "x" is listed literally by the modal's close button too.
 * - FALLBACK_ONLY: the default in `project.icon ?? 'folder-git-2'`, which only
 *   appears as a bare string literal rather than an `icon:` assignment.
 */
const CONDITIONAL_ONLY = ['sun', 'moon', 'menu'];
const FALLBACK_ONLY = ['folder-git-2'];
const NOT_LITERALLY_REFERENCED = [...CONDITIONAL_ONLY, ...FALLBACK_ONLY];

describe('icon coverage', () => {
    const referenced = referencedIconNames();

    it('scans every icon outside the non-literal set', () => {
        // Guards the guard: if the scanner regex ever stops matching, or stops
        // covering part of the source tree, this fails loudly instead of the
        // tests below quietly passing on a short set. Derived from the data
        // rather than hardcoded, so adding an icon needs no manual update.
        expect(referenced.length).toBe(
            Object.keys(ICONS).length - NOT_LITERALLY_REFERENCED.length,
        );
    });

    it('resolves every icon name referenced anywhere in app/', () => {
        const missing = referenced.filter((name) => !(name in ICONS));
        expect(
            missing,
            `Icons referenced in source but absent from icons.tsx: ${missing.join(', ')}`,
        ).toEqual([]);
    });

    it('has no unused icons', () => {
        const used = new Set([...referenced, ...NOT_LITERALLY_REFERENCED]);
        const unused = Object.keys(ICONS).filter((name) => !used.has(name));
        expect(unused, `Icons defined but never used: ${unused.join(', ')}`).toEqual([]);
    });

    it('gives every project its own icon', () => {
        // The reason this change exists: seven cards sharing one generic glyph.
        // Guards against someone adding a project and forgetting the field.
        const data = readFileSync(join(APP_DIR, 'data.ts'), 'utf8');
        const projects = data.split('export const PROJECTS_DATA')[1] ?? '';
        expect(projects).not.toBe('');

        // Each project entry starts at `title: '...'`; the icon must appear
        // before the next title (or the end of the array).
        const titles = [...projects.matchAll(/title:\s*'([^']+)'/g)];
        expect(titles.length).toBeGreaterThanOrEqual(7);

        const missing = titles
            .map((match, i) => {
                const end = projects.indexOf('title:', (match.index ?? 0) + 1);
                const block = projects.slice(match.index, end === -1 ? undefined : end);
                return { title: match[1], ok: /icon:\s*'[a-z0-9-]+'/.test(block) };
            })
            .filter((entry) => !entry.ok)
            .map((entry) => entry.title);

        expect(missing, `Projects with no icon: ${missing.join(', ')}`).toEqual([]);
    });
});
