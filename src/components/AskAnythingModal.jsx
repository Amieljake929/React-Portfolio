// src/components/AskAnythingModal.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

export default function AskAnythingModal({ isOpen, onClose }) {
  const [askQuery, setAskQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [askStep, setAskStep] = useState('input'); // 'input' | 'thinking' | 'analyzing' | 'sequence'
  const [isMobile, setIsMobile] = useState(false);
  
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const sequenceTimerRef = useRef(null);

  const [visitorInfo, setVisitorInfo] = useState({
    ip: 'Fetching...',
    location: 'Locating...',
    device: 'Detecting...',
    network: 'Detecting...',
    timezone: 'Checking...',
    currentTime: 'Syncing time...',
    screen: 'Measuring...',
    connection: '4G / Broadband Connection',
    browserAnalysis: 'Analyzing...'
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      async function fetchRealVisitorData() {
        let ipVal = '127.0.0.1';
        let cityVal = 'Manila, National Capital Region, Philippines';
        let orgVal = 'Direct ISP';
        let tzVal = 'Asia/Manila';
        let connType = '4G Connection / Broadband';

        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            ipVal = data.ip || '127.0.0.1';
            cityVal = data.city ? `${data.city}, ${data.region || 'National Capital Region'}, ${data.country_name || 'Philippines'}` : 'Manila, National Capital Region, Philippines';
            orgVal = data.org || data.asn || 'Broadband Network';
            tzVal = data.timezone ? `${data.timezone}` : 'Asia/Manila';
          }
        } catch (err) {
          console.warn('Network info fetch failed, using fallback:', err);
        }

        if (navigator.connection) {
          const effectiveType = navigator.connection.effectiveType;
          if (effectiveType) {
            connType = `${effectiveType.toUpperCase()} connection`;
          }
        }

        const ua = navigator.userAgent;
        let deviceModel = 'Desktop / PC';
        let browserVersionName = 'Unknown Browser';

        if (/firefox|fxios/i.test(ua)) {
          const match = ua.match(/(?:firefox|fxios)\/([0-9.]+)/i);
          browserVersionName = match ? `Mozilla Firefox ${match[1]}` : 'Mozilla Firefox';
        } else if (/edg/i.test(ua)) {
          const match = ua.match(/edg\/([0-9.]+)/i);
          browserVersionName = match ? `Microsoft Edge ${match[1]}` : 'Microsoft Edge';
        } else if (/samsungbrowser/i.test(ua)) {
          const match = ua.match(/samsungbrowser\/([0-9.]+)/i);
          browserVersionName = match ? `Samsung Internet ${match[1]}` : 'Samsung Internet';
        } else if (/opr|opera/i.test(ua)) {
          const match = ua.match(/(?:opr|opera)\/([0-9.]+)/i);
          browserVersionName = match ? `Opera ${match[1]}` : 'Opera';
        } else if (/chrome|crios/i.test(ua)) {
          const match = ua.match(/(?:chrome|crios)\/([0-9.]+)/i);
          browserVersionName = match ? `Google Chrome ${match[1]}` : 'Google Chrome';
        } else if (/safari/i.test(ua)) {
          const match = ua.match(/version\/([0-9.]+).*safari/i);
          browserVersionName = match ? `Apple Safari ${match[1]}` : 'Apple Safari';
        }

        if (/iPhone/i.test(ua)) deviceModel = 'iPhone Device';
        else if (/iPad/i.test(ua)) deviceModel = 'iPad Tablet';
        else if (/Android/i.test(ua)) {
          const match = ua.match(/\b(SM-[A-Z0-9]+|Pixel \d+[a-zA-Z ]*|Redmi|POCO|Vivo|Oppo)\b/i);
          deviceModel = match ? match[0] : 'Android Mobile';
        } else if (/Macintosh|MacIntel/i.test(ua)) deviceModel = 'MacBook / Mac OS';
        else if (/Windows/i.test(ua)) deviceModel = 'Windows PC';
        else if (/Linux/i.test(ua)) deviceModel = 'Linux System';

        const now = new Date();
        const localTimeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const screenRes = `${window.screen.width} x ${window.screen.height} px`;

        setVisitorInfo({
          ip: ipVal,
          location: cityVal,
          device: deviceModel,
          network: orgVal,
          timezone: tzVal,
          currentTime: localTimeFormatted,
          screen: screenRes,
          connection: connType,
          browserAnalysis: `${browserVersionName} / ${screenRes}`
        });
      }

      fetchRealVisitorData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modalOpen: true }, '');
      const handlePopState = () => {
        // Prevent going back via browser history kung nasa sequence step pa at hindi pa tapos
        if (askStep === 'sequence' && currentLineIndex < sequenceLines.length - 1) {
          window.history.pushState({ modalOpen: true }, '');
          return;
        }
        handleCloseModal();
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isOpen, askStep, currentLineIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        // Huwag hayaang i-close gamit ang Escape kung nasa sequence step pa at di pa tapos
        if (askStep === 'sequence' && currentLineIndex < sequenceLines.length - 1) {
          return;
        }
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, askStep, currentLineIndex]);

  useEffect(() => {
    if (askStep === 'thinking') {
      const timer = setTimeout(() => {
        setAskStep('analyzing');
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (askStep === 'analyzing') {
      const timer = setTimeout(() => {
        setAskStep('sequence');
        setCurrentLineIndex(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [askStep]);

  const sequenceLines = [
    "before we proceed",
    "consider the digital footprint you are already leaving just by loading this page.",
    `the registered address for this device is ${visitorInfo.location}`,
    `your public ip address is "${visitorInfo.ip}"`,
    `you are connected through "${visitorInfo.network}"`,
    `your approximate coordinates are around lat/long based on ${visitorInfo.location}`,
    `you are on a "${visitorInfo.device}" ${visitorInfo.screen}`,
    `you are browsing with "${visitorInfo.browserAnalysis}"`,
    `your timezone is ${visitorInfo.timezone} and it is around ${visitorInfo.currentTime} where you are`,
    `you are on a "${visitorInfo.connection}"`,
    "None of this requires your explicit consent.",
    "Your browser silently broadcasts this data to every site you visit.",
    "Always stay vigilant about the links you follow and the platforms you trust.",
    "Regarding your actual query,",
    "i don't want to waste tokens on that, search for it yourself :)"
  ];

  useEffect(() => {
    if (askStep === 'sequence') {
      if (currentLineIndex < sequenceLines.length - 1) {
        let duration = 5000;
        if (currentLineIndex === 0) {
          duration = 2000;
        } else if (currentLineIndex === 1) {
          duration = 7000;
        }

        sequenceTimerRef.current = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, duration);

        return () => clearTimeout(sequenceTimerRef.current);
      }
    }
  }, [askStep, currentLineIndex, sequenceLines.length]);

  const handleAskSubmit = (e) => {
    if (e) e.preventDefault();
    if (!askQuery.trim()) return;

    setSubmittedQuery(askQuery);
    setAskStep('thinking');
    setCurrentLineIndex(0);
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter' && !isMobile) {
      e.preventDefault();
      handleAskSubmit();
    }
  };

  const handleCloseModal = () => {
    // Kung nasa sequence step pa at hindi pa umabot sa huling linya, bawal i-close
    if (askStep === 'sequence' && currentLineIndex < sequenceLines.length - 1) {
      return;
    }

    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    
    if (window.history.state && window.history.state.modalOpen) {
      window.history.back();
    }

    onClose();
    setTimeout(() => {
      setAskStep('input');
      setAskQuery('');
      setSubmittedQuery('');
      setCurrentLineIndex(0);
    }, 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          onClick={handleCloseModal} // Magko-close lang kung hindi naka-lock sa sequence
          className="fixed inset-0 z-50 flex flex-col justify-center h-screen w-screen overflow-hidden px-12 sm:px-24 md:px-36 lg:px-48"
          style={{ 
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            background: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)',
            color: 'var(--text-primary)',
            alignItems: 'flex-start'
          }}
        >
          <style>{`
            @keyframes shimmerText {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .shimmer-text {
              background: linear-gradient(
                90deg, 
                var(--text-secondary) 0%, 
                var(--text-secondary) 35%, 
                var(--text-primary) 50%, 
                var(--text-secondary) 65%, 
                var(--text-secondary) 100%
              );
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: shimmerText 2.2s linear infinite;
              display: inline-block;
              line-height: 1.5;
              padding-bottom: 6px;
            }
          `}</style>

          {/* INPUT VIEW */}
          {askStep === 'input' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl flex flex-col items-start text-left"
            >
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                what do you want to ask?
              </h3>

              <form onSubmit={handleAskSubmit} className="w-full flex flex-col items-start">
                <div className="w-full relative mb-4 flex items-center">
                  <input
                    type="text"
                    autoFocus
                    value={askQuery}
                    onChange={(e) => setAskQuery(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    className="w-full py-2 text-left text-xl sm:text-2xl md:text-3xl bg-transparent border-none focus:outline-none transition-all pr-16"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  
                  {isMobile && askQuery.trim() && (
                    <div className="absolute right-0 flex items-center">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center p-2 rounded-lg text-xs font-medium border transition-all cursor-pointer shadow-sm hover:opacity-80"
                        style={{ 
                          borderColor: 'var(--border-color)', 
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)' 
                        }}
                      >
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {/* THINKING & ANALYZING VIEW */}
          {(askStep === 'thinking' || askStep === 'analyzing') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl flex flex-col items-start justify-center py-6 gap-5 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="px-4 py-2.5 rounded-xl border shadow-sm max-w-full break-words text-lg sm:text-xl md:text-2xl font-normal"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                {submittedQuery}
              </motion.div>

              <motion.div
                key={askStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 text-2xl sm:text-3xl md:text-4xl font-normal mt-1 overflow-visible"
              >
                <div className="grid grid-cols-2 gap-1.5 w-5 h-5 shrink-0 opacity-80 animate-spin">
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                </div>
                <span className="shimmer-text tracking-tight font-normal">
                  {askStep === 'thinking' ? 'thinking...' : 'analyzing...'}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* SEQUENCE VIEW */}
          {askStep === 'sequence' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl flex flex-col justify-start items-start text-left py-12"
            >
              <div className="flex flex-col gap-6 w-full items-start min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentLineIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed capitalize"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {sequenceLines[currentLineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {currentLineIndex === sequenceLines.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                  className="mt-12 w-full flex justify-start"
                >
                  <button
                    onClick={handleCloseModal}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-opacity cursor-pointer hover:opacity-60 bg-transparent border-none p-0"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Back to home</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}