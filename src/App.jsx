import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import './App.css'; // Direct import
import Sidebar from './components/Sidebar';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import StackSection from './sections/StackSection';
import GithubSection from './sections/GithubSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import StackPage from './pages/StackPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import IntroLoader from './components/IntroLoader';
import AIAssistant from './components/AIAssistant'; // Imported AI Assistant component

function HomeOverview() {
  return (
    <>
      <HeroSection />
      <hr className="my-4 border-gray-200" />
      <ProjectsSection />
      <hr className="my-4 border-gray-200" />
      <StackSection />
      <hr className="my-4 border-gray-200" />
      <GithubSection />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Intro Loader Screen Overlay */}
      {isLoading && <IntroLoader onFinish={() => setIsLoading(false)} />}

      {/* Main Container */}
      <div className="min-h-screen bg-white flex font-sans text-gray-900 relative">
        <Sidebar isLoading={isLoading} />

        <main className="ml-0 lg:ml-72 flex-1 px-4 sm:px-8 lg:px-12 pt-20 lg:pt-8 pb-6 w-full lg:w-[calc(100%-18rem)] overflow-x-hidden flex flex-col justify-between min-h-screen">
          {!isLoading && (
            <PageTransition delay={0}>
              <div className="flex flex-col gap-2">
                <Routes>
                  <Route path="/" element={<HomeOverview />} />
                  <Route
                    path="/projects"
                    element={
                      <PageTransition delay={0.1}>
                        <ProjectsPage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/projects/:id"
                    element={
                      <PageTransition delay={0.1}>
                        <ProjectDetailPage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/stack"
                    element={
                      <PageTransition delay={0.1}>
                        <StackPage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <PageTransition delay={0.1}>
                        <AboutSection />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <PageTransition delay={0.1}>
                        <ContactSection />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/licensing"
                    element={
                      <PageTransition delay={0.1}>
                        <div className="py-10 text-2xl font-bold">Licensing Page</div>
                      </PageTransition>
                    }
                  />
                </Routes>
              </div>

              {/* Footer */}
              <Footer />
            </PageTransition>
          )}
        </main>

        {/* Floating AI Assistant Widget */}
        <AIAssistant />
      </div>
    </>
  );
}

export default App;