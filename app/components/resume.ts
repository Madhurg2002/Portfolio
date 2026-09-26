import { useEffect, useState } from 'react';
import { RESUME_DRIVE_FOLDER_ID, RESUME_DRIVE_FOLDER_URL } from '../data';

export interface ResumeLink {
    /** Direct link to the most recently modified resume file (null until resolved). */
    url: string | null;
    /** Human-readable file name, when resolved. */
    name: string | null;
    /** Internal debug state. */
    reason?: string;
}

interface FolderEntry {
    id: string;
    name: string;
    /** MM/DD/YY as shown by Drive's folder view (US locale). */
    modified: Date | null;
}

/**
 * Extract (id, name, last-modified) triples from Drive's public
 * "embedded folder view" HTML. Keyless and CORS-friendly.
 *
 * Entry structure in that HTML:
 *   <div class="flip-entry" id="entry-FILE_ID" ...>
 *     <div class="flip-entry-title">Name.pdf</div>        (within ~600 chars)
 *     <div class="flip-entry-last-modified"><div>M/D/YY</div></div>
 */
export function parseFolderView(html: string): FolderEntry[] {
    const entries: FolderEntry[] = [];
    const re =
        /id="entry-([\w-]+)"[\s\S]{0,600}?class="flip-entry-title">([^<]+)<[\s\S]{0,600}?flip-entry-last-modified"><div>([^<]+)<\/div>/g;

    let match: RegExpExecArray | null;
    while ((match = re.exec(html)) !== null) {
        const modified = new Date(match[3]);
        entries.push({
            id: match[1],
            name: match[2].trim(),
            modified: isNaN(modified.getTime()) ? null : modified,
        });
    }
    return entries;
}

/**
 * Resolve the latest resume from the public Drive folder — no API key needed.
 *
 * Fetches Drive's embedded folder view, picks the most recently modified
 * file, and returns a direct link that opens it. Falls back to the folder
 * view if the fetch or parse fails, so the button always works.
 */
export function useLatestResume(): ResumeLink {
    const [link, setLink] = useState<ResumeLink>({ url: null, name: null });

    useEffect(() => {
        let cancelled = false;

        fetch(`https://drive.google.com/embeddedfolderview?id=${RESUME_DRIVE_FOLDER_ID}#list`)
            .then(res => (res.ok ? res.text() : Promise.reject(new Error(`Drive ${res.status}`))))
            .then(html => {
                if (cancelled) return;
                const docs = parseFolderView(html).filter(e => /\.(pdf|docx?|pages)$/i.test(e.name));
                if (docs.length === 0) {
                    setLink({ url: RESUME_DRIVE_FOLDER_URL, name: null, reason: 'no-files' });
                    return;
                }
                const newest = docs.reduce((best, e) =>
                    (e.modified?.getTime() ?? 0) > (best.modified?.getTime() ?? 0) ? e : best
                );
                setLink({
                    url: `https://drive.google.com/file/d/${newest.id}/view`,
                    name: newest.name,
                });
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                console.warn('[resume] falling back to folder view:', err);
                setLink({ url: RESUME_DRIVE_FOLDER_URL, name: null, reason: 'fetch-failed' });
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return link;
}
