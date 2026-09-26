import React from 'react';

import { useLucideIcons } from '../components/utils';
import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { Skills } from '../components/skills';
import { Experience } from '../components/experience';
import { Projects } from '../components/projects';
import { AchievementsAndEducation, Contact } from '../components/sections';
import { Footer } from '../components/utils';

const App: React.FC = () => {
    useLucideIcons();

    return (
        <div className="relative min-h-screen bg-carbon-950">
            {/* ambient background: grid + glows */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-grid bg-grid-fade" />
                <div className="absolute top-1/3 -right-48 w-[36rem] h-[36rem] bg-phosphor-500/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 -left-48 w-[32rem] h-[32rem] bg-heat-500/5 blur-[140px] rounded-full" />
            </div>

            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
