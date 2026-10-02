// Type-only: the automatic JSX runtime means the default export is never
// needed at runtime, and importing it anyway makes every build warn.
import type React from 'react';

import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { Skills } from '../components/skills';
import { Experience } from '../components/experience';
import { Projects } from '../components/projects';
import { AchievementsAndEducation, Contact } from '../components/sections';
import { Footer } from '../components/utils';
import { useHashFocus } from '../components/hooks';

const App: React.FC = () => {
    // One listener for the whole page: every #anchor link on the site targets
    // a <Section>, and each one has to be able to take focus.
    useHashFocus();

    return (
        // overflow-x-clip (not hidden) so nothing can scroll sideways on narrow
        // screens, without turning the page into a scroll container.
        <div className="relative min-h-screen bg-carbon-950 overflow-x-clip">
            {/* ambient background: grid + glows */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid bg-grid-fade" />
                <div className="absolute top-1/3 -right-48 w-[36rem] h-[36rem] bg-phosphor-500/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 -left-48 w-[32rem] h-[32rem] bg-heat-500/5 blur-[140px] rounded-full" />
            </div>

            <Navbar />
            <main id="main" tabIndex={-1} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 outline-none">
                <Hero />
                <Skills />
                <Experience />
                <Projects />
                <AchievementsAndEducation />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
