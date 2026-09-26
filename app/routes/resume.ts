import { redirect } from "react-router";

const FOLDER_ID = "1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw";

interface Latest {
    id: string;
    name: string;
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Drive's embedded folder view renders last-modified dates in three shapes
 * (US locale): "M/D/YY" for older files, "MMM D" for files modified this
 * calendar year, and a bare time like "2:18 am" for files modified today.
 * Returns a timestamp, or null when nothing sensible can be extracted.
 */
function parseDriveDate(raw: string): number | null {
    const s = raw.trim();

    const mdy = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/.exec(s);
    if (mdy) {
        return new Date(2000 + Number(mdy[3]), Number(mdy[1]) - 1, Number(mdy[2])).getTime();
    }

    const monDay = /^([A-Za-z]{3})\s+(\d{1,2})$/.exec(s);
    if (monDay) {
        const month = MONTHS.indexOf(monDay[1].toLowerCase());
        if (month >= 0) {
            return new Date(new Date().getFullYear(), month, Number(monDay[2])).getTime();
        }
    }

    // Time-only: the file was touched today.
    if (/^\d{1,2}:\d{2}\s*(am|pm)?$/i.test(s)) {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    }

    const fallback = new Date(s).getTime();
    return Number.isNaN(fallback) ? null : fallback;
}

/**
 * Parse the newest entry from Drive's public "embedded folder view" HTML.
 */
function parseLatest(html: string): Latest | null {
    const re =
        /id="entry-([\w-]+)"[\s\S]{0,600}?class="flip-entry-title">([^<]+)<[\s\S]{0,600}?flip-entry-last-modified"><div>([^<]+)<\/div>/g;
    let match: RegExpExecArray | null;
    let best: (Latest & { modified: number }) | null = null;

    while ((match = re.exec(html)) !== null) {
        const modified = parseDriveDate(match[3]);
        if (modified === null) continue;
        if (!best || modified > best.modified) {
            best = { id: match[1], name: match[2].trim(), modified };
        }
    }
    return best;
}

let cached: { latest: Latest | null; at: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

async function resolveLatest(): Promise<Latest | null> {
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.latest;

    let latest: Latest | null = null;
    try {
        const res = await fetch(
            `https://drive.google.com/embeddedfolderview?id=${FOLDER_ID}#list`,
            { signal: AbortSignal.timeout(6000) },
        );
        if (res.ok) latest = parseLatest(await res.text());
    } catch {
        latest = null;
    }

    cached = { latest, at: Date.now() };
    return latest;
}

/**
 * GET /resume
 *
 * Resolves the most recently modified file in the public Drive resume folder
 * server-side (keyless, via the embedded folder view) and streams the actual
 * PDF bytes from our own origin — so visitors on networks that block
 * drive.google.com still get the latest resume directly.
 *
 * If Drive is unreachable or the download fails, falls back to the bundled
 * copy at /resume.pdf so the button always opens a resume.
 *
 * GET /resume?json=1 returns { name, url } for the button subtitle instead.
 */
export async function loader({ request }: { request: Request }) {
    const wantsJson = new URL(request.url).searchParams.has("json");
    const latest = await resolveLatest();

    if (wantsJson) {
        return new Response(JSON.stringify({ name: latest?.name ?? null, url: "/resume" }), {
            headers: {
                "content-type": "application/json",
                "cache-control": "public, max-age=300",
            },
        });
    }

    if (latest) {
        try {
            const res = await fetch(
                `https://drive.google.com/uc?export=download&id=${latest.id}`,
                { signal: AbortSignal.timeout(8000) },
            );
            const body = await res.arrayBuffer();
            const isPdf =
                res.ok &&
                body.byteLength > 4 &&
                String.fromCharCode(...new Uint8Array(body.slice(0, 5))) === "%PDF-";

            if (isPdf) {
                const safeName = latest.name.replace(/[\r\n"\\]/g, "").trim() || "resume.pdf";
                return new Response(body, {
                    headers: {
                        "content-type": "application/pdf",
                        "content-disposition": `inline; filename="${safeName}"`,
                        "cache-control": "public, max-age=300",
                    },
                });
            }
        } catch {
            // fall through to the bundled copy
        }
    }

    return redirect("/resume.pdf", {
        status: 302,
        headers: { "cache-control": "public, max-age=300" },
    });
}
