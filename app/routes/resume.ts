import { redirect } from "react-router";

const FOLDER_ID = "1Y-kttLqnemV5qcnwQhQ7_3_1D2Jas1Yw";

interface Latest {
    id: string;
    name: string;
}

/**
 * Parse the newest entry from Drive's public "embedded folder view" HTML.
 * Dates are MM/DD/YY in Drive's US locale.
 */
function parseLatest(html: string): Latest | null {
    const re =
        /id="entry-([\w-]+)"[\s\S]{0,600}?class="flip-entry-title">([^<]+)<[\s\S]{0,600}?flip-entry-last-modified"><div>([^<]+)<\/div>/g;
    let match: RegExpExecArray | null;
    let best: (Latest & { modified: number }) | null = null;

    while ((match = re.exec(html)) !== null) {
        const modified = new Date(match[3]).getTime();
        if (Number.isNaN(modified)) continue;
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
