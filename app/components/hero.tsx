import type React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from './utils';
import { GITHUB_PROFILE_URL } from '../data';
import { useLatestResume } from './resume';

export const Hero: React.FC = () => {
    const roles: string[] = ['Full Stack Developer', 'Geospatial Engineer', 'Realtime Systems Builder', 'UI/UX Enthusiast'];
    const resume = useLatestResume();
    const [displayedText, setDisplayedText] = useState<string>('');
    const [roleIndex, setRoleIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [reduceMotion, setReduceMotion] = useState<boolean>(false);

    // Honour prefers-reduced-motion: the typewriter is a per-character JS loop,
    // so the CSS media query alone can't stop it.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduceMotion(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (reduceMotion) {
            setDisplayedText(roles[0]);
            return;
        }
        let timer: ReturnType<typeof setTimeout>;
        const currentRole: string = roles[roleIndex];
        const typingSpeed: number = isDeleting ? 40 : 85;

        timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentRole.length) {
                setDisplayedText(currentRole.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setDisplayedText(currentRole.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((roleIndex + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, reduceMotion]);

    // pt clears the fixed navbar; pb is 0 so the next section's pt owns the gap
    // between sections (see the Section shell in utils.tsx).
    return (
        <section id="home" className="relative pt-36 sm:pt-44 pb-0 scroll-mt-20">
            {/* ambient glows — clipped so the oversized blurred blobs never
                widen the document on small screens */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] bg-heat-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-40 -left-40 w-96 h-96 bg-phosphor-500/10 blur-[110px] rounded-full" />
            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 sm:gap-12 items-center">
                {/* left: copy */}
                <div className="min-w-0">
                    <p className="rise kicker text-xs text-phosphor-400 mb-5">
                        $ whoami <span className="text-carbon-500">—</span> hello, world
                    </p>
                    <h1 className="rise rise-1 text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
                        Madhur <span className="text-gradient">Gupta</span>
                    </h1>
                    <p className="rise rise-2 text-base sm:text-xl sm:text-2xl text-carbon-300 mb-8 min-h-9 font-mono">
                        {/* The typed text is decorative motion; screen readers get a
                            stable one-line summary of the same roles instead. */}
                        <span className="sr-only">Roles: {roles.join(', ')}.</span>
                        <span aria-hidden="true">
                            <span className="text-heat-400">&gt;</span> {displayedText}
                            <span className={`inline-block w-[2px] h-6 bg-heat-400 ml-1 align-middle ${reduceMotion ? '' : 'animate-pulse'}`} />
                        </span>
                    </p>

                    <div className="rise rise-3 flex flex-wrap items-center gap-4 mb-12">
                        <a
                            href="#projects"
                            className="inline-flex items-center px-6 py-3 rounded-xl bg-heat-400 on-accent font-semibold hover:bg-heat-300 transition duration-200 hover:-translate-y-0.5 shadow-lg shadow-heat-500/25"
                        >
                            View my work
                            <Icon name="arrow-down-right" className="w-4 h-4 ml-2" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center px-6 py-3 rounded-xl border border-carbon-600 text-carbon-200 font-medium hover:border-heat-400/60 hover:text-carbon-100 transition duration-200 hover:-translate-y-0.5"
                        >
                            Get in touch
                        </a>
                        <a
                            href={resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={resume.name ? `Latest resume: ${resume.name}` : 'Latest resume from Google Drive'}
                            className="inline-flex items-center px-6 py-3 rounded-xl border border-carbon-600 text-carbon-200 font-medium hover:border-heat-400/60 hover:text-carbon-100 transition duration-200 hover:-translate-y-0.5"
                        >
                            <Icon name="file-text" className="w-4 h-4 mr-2" />
                            Resume
                        </a>
                        <a
                            href={GITHUB_PROFILE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-carbon-600 text-carbon-300 hover:text-carbon-100 hover:border-heat-400/60 transition duration-200 hover:-translate-y-0.5"
                        >
                            <Icon name="github" className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="rise rise-4 flex flex-wrap gap-x-10 gap-y-4">
                        {[
                            ['30+', 'public repos'],
                            ['2+ yrs', 'shipping full-stack'],
                            ['1,000+', 'DSA problems'],
                        ].map(([value, label]) => (
                            <div key={label}>
                                <p className="text-2xl font-bold text-carbon-100 font-mono">{value}</p>
                                <p className="text-xs text-carbon-400 kicker mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* right: terminal card */}
                <div className="rise rise-2 relative max-w-md w-full lg:justify-self-end">
                    <div className="absolute -inset-1 bg-gradient-to-br from-heat-500/20 via-transparent to-phosphor-500/20 rounded-2xl blur-sm" aria-hidden />
                    <div className="relative rounded-2xl border border-carbon-700 bg-carbon-850 shadow-2xl shadow-black/50 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 h-10 border-b border-carbon-700 bg-carbon-900">
                            <span className="w-3 h-3 flex-shrink-0 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 flex-shrink-0 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 flex-shrink-0 rounded-full bg-[#28c840]" />
                            <span className="ml-3 min-w-0 truncate font-mono text-xs text-carbon-400">madhur@dev — profile</span>
                        </div>
                        <div className="p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-7 break-words">
                            <p className="text-carbon-400">// current status</p>
                            <p className="text-carbon-100">
                                <span className="text-phosphor-400">const</span> role <span className="text-carbon-500">=</span>{' '}
                                <span className="text-heat-300">'Full Stack Dev @ Qen Labs'</span>;
                            </p>
                            <p className="text-carbon-100">
                                <span className="text-phosphor-400">const</span> focus <span className="text-carbon-500">=</span>{' '}
                                <span className="text-heat-300">'geospatial + realtime systems'</span>;
                            </p>
                            <p className="text-carbon-400 mt-3">// elsewhere</p>
                            <p>
                                <span className="text-phosphor-400">github</span>
                                <span className="text-carbon-500">:~$</span>{' '}
                                <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-carbon-300 underline decoration-carbon-600 hover:text-heat-300 hover:decoration-heat-400 transition">
                                    @Madhurg2002
                                </a>
                            </p>
                            <p className="mt-2 text-carbon-500">$ <span className="inline-block w-2 h-4 bg-heat-400/80 animate-pulse align-middle" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
