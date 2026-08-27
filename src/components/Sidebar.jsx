import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Folder, Layers, Mail, Shield, Menu, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isLoading = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const location = useLocation();

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent background scrolling on mobile when open
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

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About', icon: User, path: '/about' },
    { name: 'Projects', icon: Folder, path: '/projects' },
    { name: 'Stack', icon: Layers, path: '/stack' },
    { name: 'Contact', icon: Mail, path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/amieljakee' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/amieljake/' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Amieljake929' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/amiel-jake-baril-316366412/' },
  ];

  const sidebarContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const springItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <>
      {/* Mobile Floating Navbar Container */}
      <div className="lg:hidden fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 25 }}
          className="pointer-events-auto flex items-center justify-between bg-black/90 text-white px-4 h-14 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.3)] border border-white/20 w-full max-w-[245px] backdrop-blur-xl"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 text-white focus:outline-none cursor-pointer group"
            aria-label="Toggle Navigation"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={18} className="text-gray-300" /> : <Menu size={18} className="text-gray-300" />}
            </motion.div>
            <span className="text-sm font-medium tracking-wide">{isOpen ? 'Close' : 'Menu'}</span>
          </button>

          <div className="flex items-center text-gray-400 text-xs font-medium pl-3 border-l border-white/20 tracking-wider">
            <span>{time}</span>
          </div>
        </motion.div>

        {/* Dropdown Card with Subtle Gray Border and Enhanced Shadow */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="pointer-events-auto mt-3 w-full max-w-sm bg-[#FDFCFA]/95 backdrop-blur-2xl border border-gray-300/70 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 flex flex-col justify-between max-h-[80vh] overflow-y-auto origin-top"
            >
              {/* Navigation Menu Links */}
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-3">
                  Menu
                </span>
                <motion.nav 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.04 } }
                  }}
                  className="flex flex-col gap-1.5"
                >
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <motion.div
                        key={item.name}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <div
                            className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-2xl transition-all duration-200 ${
                              isActive
                                ? 'text-gray-900 bg-gray-200/70 font-semibold shadow-xs'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                            }`}
                          >
                            <IconComponent size={18} className={isActive ? 'text-gray-900' : 'text-gray-500'} />
                            <span>{item.name}</span>
                          </div>
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* Divider */}
              <hr className="border-gray-200/80 my-4" />

              {/* Social Media Footer inside Dropdown */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3 block">
                  Social media
                </span>
                <div className="flex items-center justify-around text-gray-600 pt-1">
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
                        className="p-2.5 rounded-2xl hover:text-gray-900 hover:bg-gray-200/60 transition-colors"
                      >
                        <SocialIcon size={20} />
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
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/25 backdrop-blur-[4px]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside Wrapper (Desktop View) */}
      <aside
        className={`w-72 fixed left-0 top-0 bottom-0 border-r border-gray-200 bg-white z-50 hidden lg:block overflow-hidden`}
      >
        <motion.div
          variants={sidebarContainerVariants}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
          className="h-full flex flex-col justify-between p-6 overflow-hidden"
        >
          {/* Top Section: Header & Nav */}
          <div className="flex flex-col">
            {/* Profile Header */}
            <motion.div variants={springItemVariants} className="text-center mt-10 mb-12 px-2">
              <h2 className="mt-3 font-bold text-gray-900 text-xl leading-snug tracking-tight">
                Amiel Jake Baril
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1.5">
                Web Designer & Developer
              </p>
            </motion.div>

            {/* Divider Line */}
            <motion.hr variants={springItemVariants} className="border-gray-200 my-4" />

            {/* Navlinks */}
            <nav className="flex flex-col gap-3 mt-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div key={item.name} variants={springItemVariants}>
                    <NavLink to={item.path} className="block">
                      <motion.div
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium leading-relaxed rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'text-gray-900 bg-gray-100/80 font-semibold'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
                          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                        >
                          <IconComponent
                            size={18}
                            className={`transition-colors duration-300 ${
                              isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                            }`}
                          />
                        </motion.div>
                        <span>{item.name}</span>
                      </motion.div>
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Social Links Footer */}
          <motion.div
            variants={springItemVariants}
            className="flex items-center justify-around text-gray-500 pt-4 border-t border-gray-200 mt-6"
          >
            {socialLinks.map((social) => {
              const SocialIcon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <SocialIcon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </aside>
    </>
  );
}