import { useEffect, useState } from 'react';

export interface ResumeLink {
    /** Always /resume — the server route resolves the latest file and redirects. */
    url: string;
    /** File name of the latest resume, when the lookup succeeded. */
    name: string | null;
}

/**
 * The canonical resume link. `/resume` is a server route that resolves the
 * most recently modified file in the Drive folder server-side (immune to
 * browser CORS/extension blocks) and redirects to it, so this URL never
 * changes even when a new resume is uploaded.
 */
export const RESUME_URL = '/resume';

/**
 * Cosmetic lookup of the latest resume's file name for the button subtitle.
 * Talks to our own /resume route in JSON mode, so no cross-origin requests.
 */
export function useLatestResume(): ResumeLink {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetch(`${RESUME_URL}?json=1`)
            .then(res => {
                if (!res.ok) throw new Error(`resume ${res.status}`);
                return res.json() as Promise<{ name?: string | null }>;
            })
            .then(data => {
                if (!cancelled && data.name) setName(data.name);
            })
            .catch(() => {
                /* subtitle is optional; the button still works */
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { url: RESUME_URL, name };
}
