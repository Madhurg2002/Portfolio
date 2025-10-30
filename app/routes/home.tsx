import React, { useEffect } from 'react';
import { styles } from '../globalStyles';

// Import all distinct components (using .tsx or .ts extensions)
import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { Skills } from '../components/skills';
import { Experience } from '../components/experience';
import { Projects } from '../components/projects';
import { AchievementsAndEducation, Contact } from '../components/sections';
import { Footer } from '../components/utils';

// --- MAIN APPLICATION COMPONENT ---

const App: React.FC = () => {
    // Inject global styles including keyframes
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);
        
        // Initial call to create icons
        if (typeof (window as any).lucide !== 'undefined') {
            (window as any).lucide.createIcons();
        }

        return () => {
             document.head.removeChild(styleTag);
        }
    }, []);

    // FIX: Re-initialize Lucide Icons after component renders or state changes
    useEffect(() => {
        if (typeof (window as any).lucide !== 'undefined') {
            (window as any).lucide.createIcons();
        }
    });

    return (
        <React.StrictMode>
            {/* FIX: Set a default background color on the outer div */}
            <div className="bg-gray-900 min-h-screen"> 
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Hero />
                    <Skills />
                    <Experience />
                    <Projects />
                    <AchievementsAndEducation />
                    <Contact />
                </main>
                <Footer />
            </div>
        </React.StrictMode>
    );
};

export default App;
