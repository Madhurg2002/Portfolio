import type React from 'react';
import { ICONS, hasIcon, type SvgAttrs } from './icons';

interface IconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

interface SectionHeaderProps {
    index: string;
    title: string;
}

// Renders a Lucide icon as inline SVG. The data lives in ./icons, so the icon
// ships with the server-rendered HTML and there is no client-side swap step.
// Icons are decorative here: every icon-only control already carries its own
// aria-label, so the glyph itself is hidden from assistive tech.
export const Icon: React.FC<IconProps> = ({ name, className = '', style = {} }) => {
    if (!hasIcon(name)) {
        // An unknown name renders nothing at all, which is easy to miss in
        // review and shipped once already: the folder-git-2 project icon was
        // dropped when the inlined icon set was built, and every project card
        // silently lost its glyph. Warn loudly in dev instead of failing quiet.
        if (import.meta.env.DEV) {
            console.warn(
                `[icons] "${name}" is not in app/components/icons.tsx — rendering nothing.`,
            );
        }
        return null;
    }

    const [[, attrs], children] = ICONS[name];
    // The data is raw SVG attribute data; widening to ElementType/SVGProps keeps
    // the JSX side honest without hand-mapping every attribute.
    const svgProps = attrs as unknown as React.SVGProps<SVGSVGElement>;

    return (
        <svg
            {...svgProps}
            className={className}
            style={style}
            aria-hidden="true"
            focusable="false"
        >
            {children.map(([tag, nodeAttrs], i) => {
                const Tag = tag as React.ElementType;
                return <Tag key={i} {...(nodeAttrs as SvgAttrs & React.SVGProps<SVGElement>)} />;
            })}
        </svg>
    );
};

// Numbered section header used across the page.
// mb-10/sm:mb-12 keeps a descending scale against the section's own top padding
// (mobile 64/40, desktop 96/48). At a flat mb-12 the header gap was nearly as
// large as the section break on mobile, which flattened the hierarchy.
export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, title }) => (
    <div className="mb-10 sm:mb-12 flex items-end justify-between gap-4">
        <div className="min-w-0">
            <p className="kicker text-xs text-heat-400 mb-3">{index}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-carbon-100">{title}</h2>
        </div>
        <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-carbon-600 to-transparent mb-2" />
    </div>
);

// Section shell.
// Vertical rhythm is owned here, in ONE place: sections carry top padding and
// no bottom padding, so the gap between two sections is the next section's
// `pt` rather than two paddings stacking. Symmetric `py` on every section made
// each boundary 160px on mobile / 192px on desktop, which read as two separate
// voids rather than one considered break.
//
// tabIndex -1 makes the section a hash-link target that can hold focus (see
// useHashFocus); outline-none follows the <main> in home.tsx, because a 2px
// ring drawn around a whole full-width section reads as a broken box rather
// than as focus.
export const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({
    id,
    children,
    className = '',
}) => (
    <section id={id} tabIndex={-1} className={`pt-16 sm:pt-24 pb-0 scroll-mt-20 outline-none ${className}`}>
        {children}
    </section>
);

export const Footer: React.FC = () => (
    <footer className="border-t border-carbon-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-carbon-400">
            <p className="font-mono text-xs break-all sm:break-normal text-center sm:text-left">
                <span className="text-phosphor-400">$</span> whoami <span className="text-carbon-500">→</span> madhur-gupta
            </p>
            <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Madhur Gupta · Built with React &amp; Tailwind</p>
        </div>
    </footer>
);
