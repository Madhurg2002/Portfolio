import { useEffect, useState } from 'react';
import { RESUME_DRIVE_FOLDER_ID, RESUME_DRIVE_FOLDER_URL } from '../data';

export interface ResumeLink {
    /** Direct link to the most recently modified resume file (null if unresolvable). */
    url: string | null;
    /** Human-readable file name, when resolved. */
    name: string | null;
    /** Why we fell back, for console/debugging. */
    reason?: string;
}

/**
 * Resolve the latest resume from the configured Google Drive folder.
 *
 * Uses the public Drive API v3 `files.list` endpoint with a browser API key
 * (VITE_GOOGLE_DRIVE_API_KEY) to find the most recently modified file in the
 * folder — so uploading a newer resume to the folder is all it takes for the
 * site to point at it.
 *
 * Without an API key (or if the request fails), falls back to the folder URL.
 */
export function useLatestResume(): ResumeLink {
    const [link, setLink] = useState<ResumeLink>({ url: null, name: null });

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY as string | undefined;

        if (!apiKey) {
            setLink({ url: RESUME_DRIVE_FOLDER_URL, name: null, reason: 'no-api-key' });
            return;
        }

        let cancelled = false;

        const params = new URLSearchParams({
            key: apiKey,
            q: `'${RESUME_DRIVE_FOLDER_ID}' in parents and trashed = false`,
            orderBy: 'modifiedTime desc',
            pageSize: '1',
            fields: 'files(id,name,mimeType,modifiedTime)',
            supportsAllDrives: 'true',
            includeItemsFromAllDrives: 'true',
        });

        fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`)
            .then(res => {
                if (!res.ok) throw new Error(`Drive API ${res.status}`);
                return res.json();
            })
            .then((data: { files?: Array<{ id: string; name: string }> }) => {
                if (cancelled) return;
                const file = data.files?.[0];
                if (file) {
                    setLink({ url: `https://drive.google.com/file/d/${file.id}/view`, name: file.name });
                } else {
                    setLink({ url: RESUME_DRIVE_FOLDER_URL, name: null, reason: 'folder-empty' });
                }
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
