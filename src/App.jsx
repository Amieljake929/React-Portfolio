import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import './App.css';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './sections/HeroSection';
import AboutSnippet from './sections/AboutSnippet';
import ServicesSection from './sections/ServicesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import ProjectsSection from './sections/ProjectsSection';
import StackSection from './sections/StackSection';
import GithubSection from './sections/GithubSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import StackPage from './pages/StackPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import GearPage from './pages/GearPage';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import IntroLoader from './components/IntroLoader';
import AIAssistant from './components/AIAssistant';
import ThemeTransition from './components/ThemeTransition';

function HomeOverview() {
  return (
    <>
      <HeroSection />
      <hr className="my-8 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <ProjectsSection />
      <hr className="my-8 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <AboutSnippet />
      <hr className="my-8 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <ServicesSection />
      <hr className="my-12 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <StackSection />
      <hr className="my-12 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <TestimonialsSection />
      <hr className="my-12 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <FAQSection />
      <hr className="my-12 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <GithubSection />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Theme states
  const [pendingTheme, setPendingTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [appliedTheme, setAppliedTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  
  const isAnimatingRef = useRef(false);

  // Apply theme class to <html> element
  useEffect(() => {
    const html = document.documentElement;
    
    if (appliedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', appliedTheme);
  }, [appliedTheme]);

  const toggleTheme = () => {
    if (isAnimatingRef.current) return;
    const nextTheme = pendingTheme === 'dark' ? 'light' : 'dark';
    isAnimatingRef.current = true;
    setPendingTheme(nextTheme);
  };

  const setThemeExplicit = (targetTheme) => {
    if (isAnimatingRef.current) return;
    if (pendingTheme !== targetTheme) {
      isAnimatingRef.current = true;
      setPendingTheme(targetTheme);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        setThemeExplicit('dark');
      } else if (e.key === 'l' || e.key === 'L') {
        setThemeExplicit('light');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pendingTheme]);

  useEffect(() => {
    const handleCustomThemeToggle = () => {
      toggleTheme();
    };

    window.addEventListener('trigger-theme-toggle', handleCustomThemeToggle);
    return () => window.removeEventListener('trigger-theme-toggle', handleCustomThemeToggle);
  }, [pendingTheme]);

  const handleThemeApplied = () => {
    setAppliedTheme(pendingTheme);
    isAnimatingRef.current = false;
  };

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
      {isLoading && <IntroLoader theme={pendingTheme} onFinish={() => setIsLoading(false)} />}

      <ThemeTransition 
        theme={pendingTheme} 
        onThemeApplied={handleThemeApplied}
      >
        <div 
          className="min-h-screen font-sans relative flex flex-col items-center overflow-x-hidden"
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            color: 'var(--text-primary)' 
          }}
        >
          <FloatingNavbar 
            isLoading={isLoading} 
            isChatOpen={isChatOpen} 
            setIsChatOpen={setIsChatOpen} 
          />

          <main className="w-full max-w-3xl px-6 pt-32 pb-12 flex flex-col justify-between min-h-screen mx-auto box-border">
            {!isLoading && (
              <PageTransition delay={0}>
                <div className="flex flex-col gap-2">
                  <Routes>
                    <Route path="/" element={<HomeOverview />} />
                    <Route path="/projects" element={<PageTransition delay={0.1}><ProjectsPage /></PageTransition>} />
                    <Route path="/projects/:id" element={<PageTransition delay={0.1}><ProjectDetailPage /></PageTransition>} />
                    <Route path="/stack" element={<PageTransition delay={0.1}><StackPage /></PageTransition>} />
                    <Route path="/gear" element={<PageTransition delay={0.1}><GearPage /></PageTransition>} />
                    <Route path="/about" element={<PageTransition delay={0.1}><AboutSection /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition delay={0.1}><ContactSection /></PageTransition>} />
                    <Route path="/licensing" element={<PageTransition delay={0.1}><div className="py-10 text-2xl font-bold">Licensing Page</div></PageTransition>} />
                  </Routes>
                </div>

                <Footer />
              </PageTransition>
            )}
          </main>

          <AIAssistant 
            isOpen={isChatOpen} 
            setIsOpen={setIsChatOpen} 
          />
        </div>
      </ThemeTransition>
    </>
  );
}

export default App;