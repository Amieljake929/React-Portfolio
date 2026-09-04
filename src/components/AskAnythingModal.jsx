// src/components/AskAnythingModal.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiLoader, 
  FiArrowRight, 
  FiArrowLeft, 
  FiShield, 
  FiGlobe, 
  FiMapPin, 
  FiSmartphone, 
  FiWifi, 
  FiClock, 
  FiMonitor, 
  FiCpu, 
  FiLock 
} from 'react-icons/fi';

export default function AskAnythingModal({ isOpen, onClose }) {
  const [askQuery, setAskQuery] = useState('');
  const [askStep, setAskStep] = useState('input'); // 'input' | 'processing' | 'result' | 'message'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Realtime processing timer states
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);

  // Typing effect states para sa huling pahina
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const fullLine1 = "Regarding your question";
  const fullLine2 = "I'd rather not waste my tokens, so I'll just leave that to Google.";

  // Dynamic States para sa Totoong Datos ng User (8 items)
  const [visitorInfo, setVisitorInfo] = useState({
    ip: 'Fetching...',
    location: 'Locating...',
    device: 'Detecting...',
    network: 'Detecting...',
    timezone: 'Checking...',
    currentTime: 'Syncing time...',
    screen: 'Measuring...',
    browserAnalysis: 'Analyzing...'
  });

  // Function para kunin ang totoong device, browser, IP, location, oras, atbp.
  useEffect(() => {
    if (isOpen) {
      async function fetchRealVisitorData() {
        let ipVal = '127.0.0.1';
        let cityVal = 'Unknown Location';
        let orgVal = 'Direct ISP';
        let tzVal = 'Asia/Manila';

        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            ipVal = data.ip || '127.0.0.1';
            cityVal = data.city ? `${data.city}, ${data.country_name}` : (data.country_name || 'Philippines');
            orgVal = data.org || data.asn || 'Broadband Network';
            tzVal = data.timezone ? `${data.timezone} (GMT ${data.utc_offset || '+8:00'})` : 'Asia/Manila (+8:00)';
          }
        } catch (err) {
          console.warn('Network info fetch failed, using fallback:', err);
        }

        const ua = navigator.userAgent;
        let deviceModel = 'Desktop / PC';
        let browserName = 'Browser';

        if (ua.includes('Firefox')) browserName = 'Mozilla Firefox';
        else if (ua.includes('SamsungBrowser')) browserName = 'Samsung Internet';
        else if (ua.includes('Opera') || ua.includes('OPR')) browserName = 'Opera';
        else if (ua.includes('Edge')) browserName = 'Microsoft Edge';
        else if (ua.includes('Chrome')) browserName = 'Google Chrome';
        else if (ua.includes('Safari')) browserName = 'Apple Safari';

        if (/iPhone/i.test(ua)) {
          deviceModel = 'iPhone Device';
        } else if (/iPad/i.test(ua)) {
          deviceModel = 'iPad Tablet';
        } else if (/Android/i.test(ua)) {
          const match = ua.match(/\b(SM-[A-Z0-9]+|Pixel \d+[a-zA-Z ]*|Redmi|POCO|Vivo|Oppo)\b/i);
          deviceModel = match ? match[0] : 'Android Mobile';
        } else if (/Macintosh|MacIntel/i.test(ua)) {
          deviceModel = 'MacBook / Mac OS';
        } else if (/Windows/i.test(ua)) {
          deviceModel = 'Windows PC';
        } else if (/Linux/i.test(ua)) {
          deviceModel = 'Linux System';
        }

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
          browserAnalysis: `${browserName} / Secure Protocol`
        });
      }

      fetchRealVisitorData();
    }
  }, [isOpen]);

  // Magdagdag ng history entry kapag binubuksan ang modal para ma-catch ang back button sa mobile
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modalOpen: true }, '');

      const handlePopState = () => {
        handleCloseModal();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen]);

  // Handle Escape key para mag-close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Realtime stopwatch para sa pag-proseso
  useEffect(() => {
    if (askStep === 'processing') {
      setElapsedSeconds(0);
      const startTime = Date.now();

      timerRef.current = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(diff);
      }, 200);

      const totalSteps = 8;
      if (currentStepIndex < totalSteps - 1) {
        const timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, 700);
        return () => {
          clearTimeout(timer);
          clearInterval(timerRef.current);
        };
      } else {
        const finalTimer = setTimeout(() => {
          clearInterval(timerRef.current);
          setAskStep('result');
        }, 900);
        return () => {
          clearTimeout(finalTimer);
          clearInterval(timerRef.current);
        };
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [askStep, currentStepIndex]);

  // Typing effect at 2-second delay para sa message stage
  useEffect(() => {
    if (askStep === 'message') {
      setDisplayedLine1('');
      setDisplayedLine2('');

      let i1 = 0;
      const timer1 = setInterval(() => {
        if (i1 < fullLine1.length) {
          setDisplayedLine1(fullLine1.substring(0, i1 + 1));
          i1++;
        } else {
          clearInterval(timer1);
        }
      }, 30);

      const delayTimer = setTimeout(() => {
        let i2 = 0;
        const timer2 = setInterval(() => {
          if (i2 < fullLine2.length) {
            setDisplayedLine2(fullLine2.substring(0, i2 + 1));
            i2++;
          } else {
            clearInterval(timer2);
          }
        }, 20);
        return () => clearInterval(timer2);
      }, 2000);

      return () => {
        clearInterval(timer1);
        clearTimeout(delayTimer);
      };
    }
  }, [askStep]);

  const handleAskSubmit = (e) => {
    if (e) e.preventDefault();
    if (!askQuery.trim()) return;

    setAskStep('processing');
    setCurrentStepIndex(0);
  };

  const handleCloseModal = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (window.history.state && window.history.state.modalOpen) {
      window.history.back();
    }

    onClose();
    setTimeout(() => {
      setAskStep('input');
      setAskQuery('');
      setElapsedSeconds(0);
      setDisplayedLine1('');
      setDisplayedLine2('');
    }, 300);
  };

  if (!isOpen) return null;

  const processingStepsList = [
    { label: 'IP address', detail: visitorInfo.ip, icon: FiGlobe },
    { label: 'Location', detail: visitorInfo.location, icon: FiMapPin },
    { label: 'Device & Model', detail: visitorInfo.device, icon: FiSmartphone },
    { label: 'Network Provider', detail: visitorInfo.network, icon: FiWifi },
    { label: 'Timezone', detail: visitorInfo.timezone, icon: FiClock },
    { label: 'Current Time', detail: visitorInfo.currentTime, icon: FiCpu },
    { label: 'Screen Resolution', detail: visitorInfo.screen, icon: FiMonitor },
    { label: 'Analyzing...', detail: visitorInfo.browserAnalysis, icon: FiLock }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 sm:p-12 h-screen w-screen overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        {/* STAGE 1: INPUT VIEW */}
        {askStep === 'input' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-xl flex flex-col items-center text-center"
          >
            <h3 
              className="text-xl sm:text-2xl font-normal tracking-tight mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Ask anything
            </h3>

            <form onSubmit={handleAskSubmit} className="w-full flex flex-col items-center">
              <div className="w-full relative mb-6">
                <input
                  type="text"
                  autoFocus
                  placeholder="click here to type"
                  value={askQuery}
                  onChange={(e) => setAskQuery(e.target.value)}
                  className="w-full px-4 py-4 text-center text-sm sm:text-base border-b bg-transparent focus:outline-none transition-all"
                  style={{ 
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                  }}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer shadow-sm"
                style={{ 
                  backgroundColor: 'var(--text-primary)', 
                  color: 'var(--bg-primary)' 
                }}
              >
                <span>Send</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* STAGE 2: PROCESSING VIEW */}
        {askStep === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-4xl flex flex-col items-center justify-center py-8"
          >
            <div className="flex flex-col items-start w-full max-w-xs mx-auto">
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center">
                    <FiShield className="w-5 h-5 text-amber-500 animate-pulse" />
                    <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping" />
                  </div>
                  <h4 className="text-xs sm:text-base font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Analyzing metadata.... ({elapsedSeconds}s)
                  </h4>
                </div>
              </div>

              <div className="relative pl-6 flex flex-col gap-3.5 sm:gap-4 w-full">
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ originY: 0, backgroundColor: 'var(--border-color)' }}
                  className="absolute left-2.5 top-2 bottom-2 w-[1.5px]" 
                />

                {processingStepsList.map((step, idx) => {
                  const isCompleted = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;

                  if (currentStepIndex < idx) return null;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative flex items-center gap-3 text-xs sm:text-sm"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center border"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: 'var(--bg-primary)'
                        }}
                      >
                        {isCompleted ? (
                          <FiCheck className="w-3 h-3 text-emerald-400 font-extrabold drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]" />
                        ) : null}
                      </motion.div>

                      <span style={{ color: 'var(--text-secondary)' }}>
                        {step.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: RESULT VIEW (Mas malalaking icons, light gray, walang vertical line) */}
        {askStep === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-5xl flex flex-col lg:flex-row justify-between items-start gap-8 py-8 overflow-y-auto max-h-[85vh] px-4"
          >
            <div className="flex flex-col items-start w-full lg:max-w-xs shrink-0">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-1.5 rounded-full border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                  <FiCheck className="w-4 h-4 text-emerald-400 font-extrabold drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                </div>
                <h4 className="text-xs sm:text-base font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Thought for {Math.max(elapsedSeconds, 7)}s
                </h4>
              </div>

              {/* Walang vertical line at mas malalaking light-gray icons */}
              <div className="flex flex-col gap-4 w-full">
                {processingStepsList.map((step, idx) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-center gap-3.5 text-xs sm:text-sm"
                    >
                      <IconComponent className="w-5 h-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
                      <strong className="font-medium break-words" style={{ color: 'var(--text-primary)' }}>
                        {step.detail}
                      </strong>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block w-[1px] self-stretch my-2 shrink-0" style={{ backgroundColor: 'var(--border-color)' }} />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-center items-center h-full min-h-[300px] w-full pt-2 lg:px-8"
            >
              <div className="flex flex-col gap-3 max-w-lg w-full items-start text-left">
                <h4 className="text-sm sm:text-base font-semibold tracking-wide uppercase text-amber-500 w-full text-center sm:text-left">
                  ⚠️ Security Awareness Reminder
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-left" style={{ color: 'var(--text-secondary)' }}>
                  Always be cautious when visiting unfamiliar websites or clicking random links sent via chat or social media. 
                  Malicious platforms can easily read your public metadata (such as your IP address, device model, location, and network) 
                  just like what we demonstrated here. Never input sensitive passwords or personal credentials unless you fully trust the site's authenticity.
                </p>
              </div>

              <div className="mt-5 w-full flex justify-center sm:justify-end">
                <button
                  onClick={() => setAskStep('message')}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-opacity cursor-pointer hover:opacity-60 bg-transparent border-none p-0"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>Proceed</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 4: MESSAGE VIEW */}
        {askStep === 'message' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-xl flex flex-col justify-start items-start text-left py-12 px-6"
          >
            <div className="flex flex-col gap-6 w-full items-start min-h-[140px]">
              <p
                className="text-xl sm:text-2xl font-normal min-h-[35px]"
                style={{ color: 'var(--text-primary)' }}
              >
                {displayedLine1}
                {displayedLine1.length < fullLine1.length && (
                  <span className="inline-block w-2 h-5 ml-1 animate-pulse bg-current align-middle" />
                )}
              </p>

              {displayedLine2.length > 0 && (
                <p
                  className="text-lg sm:text-xl font-normal leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {displayedLine2}
                  {displayedLine2.length < fullLine2.length && (
                    <span className="inline-block w-2 h-4 ml-1 animate-pulse bg-current align-middle" />
                  )}
                </p>
              )}
            </div>

            {displayedLine2.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-8 w-full flex justify-start"
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
    </AnimatePresence>
  );
}