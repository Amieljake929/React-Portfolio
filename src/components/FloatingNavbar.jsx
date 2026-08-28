import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNavbar({ isLoading = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Live clock matching the reference style
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position para sa pagliit at paglaki ng navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/amieljakee' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/amieljake/' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Amieljake929' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/amiel-jake-baril-316366412/' },
  ];

  // Spring configuration na may bounce para sa pag-open ng menu dropdown
  const dropdownSpring = {
    type: 'spring',
    stiffness: 400,
    damping: 22,
    mass: 1,
    delay: 0.05
  };

  // Spring configuration na may bounce para sa entry transition pagkatapos ng intro
  const entrySpring = {
    type: 'spring',
    stiffness: 350,
    damping: 15,
    mass: 1,
    delay: 1.2
  };

  return (
    <>
      {/* Floating Header Container - Naka-align center sa gitna ng screen */}
      <div className="fixed top-10 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={isLoading ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={entrySpring}
          className="pointer-events-auto flex items-center bg-white/90 text-gray-900 px-4 h-14 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-200/80 backdrop-blur-xl origin-top"
          style={{
            width: isScrolled && !isOpen ? '148px' : '260px',
            justifyContent: isScrolled && !isOpen ? 'center' : 'space-between',
            transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), justify-content 0.35s ease',
          }}
        >
          {/* Menu / Close Button & Smooth Text Animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-gray-900 focus:outline-none cursor-pointer group shrink-0"
            aria-label="Toggle Navigation"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              {isOpen ? <X size={18} className="text-gray-900" /> : <Menu size={18} className="text-gray-900" />}
            </motion.div>
            
            {/* Conditional Text na may smooth fade at width transition */}
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold tracking-wide text-gray-900 overflow-hidden whitespace-nowrap"
                >
                  Close
                </motion.span>
              ) : isScrolled ? (
                <motion.span
                  key="name"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="text-xs font-semibold tracking-wide text-gray-900 overflow-hidden whitespace-nowrap"
                >
                  Amiel Jake
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="text-xs font-semibold tracking-wide text-gray-900 overflow-hidden whitespace-nowrap"
                >
                  Menu
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Live Clock Display - Smooth na nawawala at bumabalik */}
          <AnimatePresence>
            {(!isScrolled || isOpen) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex items-center text-gray-600 text-[11px] font-semibold pl-2.5 border-l border-gray-200 tracking-wider shrink-0 overflow-hidden"
              >
                <span>{time}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dropdown Card na may Bounce Effect */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={dropdownSpring}
              className="pointer-events-auto mt-3 w-full max-w-sm bg-white/95 backdrop-blur-2xl border border-gray-200/85 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 flex flex-col justify-between max-h-[80vh] overflow-y-auto origin-top"
            >
              {/* Menu Section */}
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-3">
                  Menu
                </span>
                <nav className="flex flex-col gap-0.5">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-gray-900 bg-gray-100 font-semibold shadow-xs'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* Divider */}
              <hr className="border-gray-100 my-3" />

              {/* Social Media Footer inside Dropdown */}
              <div className="text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-3 block">
                  Social media
                </span>
                <div className="flex items-center justify-around text-gray-600 pt-0.5">
                  {socialLinks.map((social) => {
                    const SocialIcon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        whileTap={{ scale: 0.85 }}
                        className="p-2 rounded-xl hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <SocialIcon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[3px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}