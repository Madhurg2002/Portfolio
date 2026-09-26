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
 *
 * Both the hero CTA and the contact card show this, so the in-flight promise is
 * memoised at module scope - otherwise every page load fired two identical
 * requests and ran the server loader twice for the same answer.
 */
let inflight: Promise<string | null> | null = null;

function fetchLatestName(): Promise<string | null> {
    if (!inflight) {
        inflight = fetch(`${RESUME_URL}?json=1`)
            .then(res => {
                if (!res.ok) throw new Error(`resume ${res.status}`);
                return res.json() as Promise<{ name?: string | null }>;
            })
            .then(data => data.name ?? null)
            .catch(() => {
                /* subtitle is optional; the button still works. Drop the
                   memo so a later mount can retry rather than pinning a failure. */
                inflight = null;
                return null;
            });
    }
    return inflight;
}

export function useLatestResume(): ResumeLink {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchLatestName().then(result => {
            if (!cancelled) setName(result);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return { url: RESUME_URL, name };
}
