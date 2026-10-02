import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';

import { parseDriveDate, parseLatest } from './resume';

/**
 * Drive's embedded folder view has changed its date format twice in production:
 * it dropped the year for files modified in the current calendar year, then
 * started emitting a bare clock time for files touched today. Both regressions
 * silently returned the wrong resume, so the three shapes are pinned here.
 */

// Fixed "now" so the year-less and time-only branches are deterministic.
const NOW = new Date('2026-09-26T12:00:00Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('parseDriveDate', () => {
  it('parses "M/D/YY" (older files) and pivots the century', () => {
    // 25 => 2025, not 1925.
    expect(parseDriveDate('12/17/25')).toBe(new Date(2025, 11, 17).getTime());
    expect(parseDriveDate('1/2/24')).toBe(new Date(2024, 0, 2).getTime());
    expect(parseDriveDate('11/9/99')).toBe(new Date(1999, 10, 9).getTime());
  });

  it('parses "MMM D" (current calendar year)', () => {
    expect(parseDriveDate('Aug 12')).toBe(new Date(2026, 7, 12).getTime());
    expect(parseDriveDate('Jan 1')).toBe(new Date(2026, 0, 1).getTime());
    expect(parseDriveDate('Dec 31')).toBe(new Date(2026, 11, 31).getTime());
  });

  it('parses a bare time as "today"', () => {
    const today = new Date(2026, 8, 26).getTime();
    expect(parseDriveDate('2:18 am')).toBe(today);
    expect(parseDriveDate('11:59 pm')).toBe(today);
  });

  it('is case- and whitespace-insensitive', () => {
    expect(parseDriveDate('  aug 12  ')).toBe(parseDriveDate('Aug 12'));
    expect(parseDriveDate('AUG 12')).toBe(parseDriveDate('Aug 12'));
    expect(parseDriveDate('2:18 AM')).toBe(parseDriveDate('2:18 am'));
  });

  it('ranks the three shapes against each other correctly', () => {
    // The bug this guards: an "Aug 12" file was treated as year 1975 (via the
    // Date(string) fallback) and lost to a 2-digit-year file, so an older
    // resume got served as "latest".
    const yearless = parseDriveDate('Aug 12')!;
    const mdy = parseDriveDate('12/17/25')!;
    const today = parseDriveDate('2:18 am')!;

    expect(yearless).toBeGreaterThan(mdy);
    expect(today).toBeGreaterThan(yearless);
  });

  it('falls back to Date parsing for anything else', () => {
    expect(parseDriveDate('2024-03-05')).toBe(new Date('2024-03-05').getTime());
  });

  it('returns null for unparseable input', () => {
    expect(parseDriveDate('')).toBeNull();
    expect(parseDriveDate('   ')).toBeNull();
    expect(parseDriveDate('not a date')).toBeNull();
  });
});

/** Minimal stand-in for one row of Drive's embedded folder view HTML. */
const entry = (id: string, name: string, modified: string) => `
  <div class="flip-entry" id="entry-${id}">
    <div class="flip-entry-title">${name}</div>
    <div class="flip-entry-last-modified"><div>${modified}</div></div>
  </div>`;

describe('parseLatest', () => {
  it('picks the newest entry across all three date shapes', () => {
    const html = [
      entry('old1', 'Old Resume.pdf', '11/9/19'),
      entry('mid1', 'Mid Resume.pdf', '12/17/25'),
      entry('new1', 'Madhur Resume.pdf', 'Aug 12'),
      entry('new2', 'Today Resume.pdf', '2:18 am'),
    ].join('');

    expect(parseLatest(html)).toEqual({ id: 'new2', name: 'Today Resume.pdf' });
  });

  it('skips entries whose date cannot be read instead of failing', () => {
    const html = [
      entry('bad', 'Broken.pdf', '???'),
      entry('good', 'Good Resume.pdf', 'Aug 12'),
    ].join('');

    expect(parseLatest(html)).toEqual({ id: 'good', name: 'Good Resume.pdf' });
  });

  it('returns null for empty or unrecognisable HTML', () => {
    expect(parseLatest('')).toBeNull();
    expect(parseLatest('<html><body>nothing here</body></html>')).toBeNull();
  });

  it('trims whitespace from the file name', () => {
    const html = entry('x', '  Madhur Resume.pdf  ', 'Aug 12');
    expect(parseLatest(html)?.name).toBe('Madhur Resume.pdf');
  });
});
