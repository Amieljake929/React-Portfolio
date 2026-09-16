// src/App.jsx
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
import SeminarsPage from './pages/SeminarsPage';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import IntroLoader from './components/IntroLoader';
import AIAssistant from './components/AIAssistant';
import ThemeTransition from './components/ThemeTransition';
import AskAnythingModal from './components/AskAnythingModal';

function HomeOverview() {
  return (
    <>
      <HeroSection />
      <hr className="my-8 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <AboutSnippet />
      <hr className="my-8 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }} />
      <ProjectsSection />
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
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  
  const lenisRef = useRef(null);

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

  // I-stop o i-start ang Lenis smooth scroll depende kung bukas ang modal
  useEffect(() => {
    if (lenisRef.current) {
      if (isAskModalOpen || isChatOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isAskModalOpen, isChatOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        setThemeExplicit('dark');
      } else if (e.key === 'l' || e.key === 'L') {
        setThemeExplicit('light');
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setIsAskModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pendingTheme]);

  useEffect(() => {
    const handleOpenAsk = () => setIsAskModalOpen(true);
    window.addEventListener('open-ask-modal', handleOpenAsk);
    return () => window.removeEventListener('open-ask-modal', handleOpenAsk);
  }, []);

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

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Inline styles for the fixed, non-scrollable blended dotted grid background */}
      <style>{`
        .fixed-dotted-bg {
          background-image: radial-gradient(circle, var(--text-secondary) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.22;
          mask-image: radial-gradient(circle at 50% 30%, #000 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at 50% 30%, #000 20%, transparent 75%);
        }
      `}</style>

      {isLoading && <IntroLoader theme={pendingTheme} onFinish={() => setIsLoading(false)} />}

      <ThemeTransition 
        theme={pendingTheme} 
        onThemeApplied={handleThemeApplied}
      >
        <div 
          className="min-h-screen font-sans relative flex flex-col items-start overflow-x-hidden"
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            color: 'var(--text-primary)' 
          }}
        >
          {/* Fixed Non-Scrollable Dotted Background Overlay */}
          <div className="fixed inset-0 pointer-events-none fixed-dotted-bg z-0" />

          {/* Main content wrapper placed above the background */}
          <div className="relative z-10 w-full flex flex-col items-center">
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
                      <Route path="/seminars" element={<PageTransition delay={0.1}><SeminarsPage /></PageTransition>} />
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

            <AskAnythingModal 
              isOpen={isAskModalOpen} 
              onClose={() => setIsAskModalOpen(false)} 
            />
          </div>
        </div>
      </ThemeTransition>
    </>
  );
}

export default App;