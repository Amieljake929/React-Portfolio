// src/components/FloatingNavbar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingNavbar({ isLoading = false }) {
  const location = useLocation();
  const [currentMode, setCurrentMode] = useState(() => {
    return localStorage.getItem('theme') || 'system';
  });
  
  const [isDarkThemeActive, setIsDarkThemeActive] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Keep state synced with the DOM theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkThemeActive(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Gear', path: '/gear' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleModeSelect = (mode) => {
    if (mode === currentMode && mode !== 'system') return;
    
    setCurrentMode(mode);
    if (mode === 'dark') {
      window.dispatchEvent(new CustomEvent('trigger-theme-toggle', { detail: 'dark' }));
    } else if (mode === 'light') {
      window.dispatchEvent(new CustomEvent('trigger-theme-toggle', { detail: 'light' }));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      window.dispatchEvent(new CustomEvent('trigger-theme-toggle', { detail: prefersDark ? 'dark' : 'light' }));
    }
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={isLoading ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex justify-center sticky top-0 z-50 mb-[-84px]"
    >
      <div className="relative flex flex-col items-center">
        
        {/* 1. Main Navbar Container (Finishes in 0.4 seconds) */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={isLoading ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-b-[36px] pt-10 pb-10 px-13 sm:px-19 shadow-sm flex items-center justify-center relative overflow-hidden z-20"
          style={{ 
            backgroundColor: isDarkThemeActive ? 'var(--bg-secondary)' : '#ffffff',
            border: '1px solid var(--border-color)'
           }}
        >
          {/* Subtle dark tint overlay */}
          <div className="absolute inset-0 bg-black/3 dark:bg-black/5 pointer-events-none" />

          <nav className="flex items-center justify-center gap-6 sm:gap-10 relative z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="text-xs sm:text-sm font-medium transition-colors duration-200"
                  style={{ 
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '500'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </motion.div>

        {/* 2. Theme Switcher Pill Container (Starts right after main navbar finishes at 0.4s) */}
        <motion.div 
          initial={{ y: -15, opacity: 0 }}
          animate={isLoading ? { y: -15, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          className="-mt-1 px-3 py-2 rounded-b-xl shadow-sm flex items-center justify-center gap-1 select-none z-10"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            borderTop: 'none'
          }}
        >
          {/* System/Device Icon */}
          <button 
            onClick={() => handleModeSelect('system')}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-100 flex items-center justify-center p-1.5 -mb-1.5"
            style={{ color: 'var(--text-primary)', opacity: currentMode === 'system' ? 1 : 0.4 }}
            title="System Theme"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </button>

          {/* Light Mode Icon */}
          <button 
            onClick={() => handleModeSelect('light')}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-100 flex items-center justify-center p-1.5 -mb-1.5"
            style={{ color: 'var(--text-primary)', opacity: currentMode === 'light' ? 1 : 0.4 }}
            title="Light Mode"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.07-14.035-1.41 1.41" />
            </svg>
          </button>

          {/* Dark Mode Icon */}
          <button 
            onClick={() => handleModeSelect('dark')}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-100 flex items-center justify-center p-1.5 -mb-1.5"
            style={{ color: 'var(--text-primary)', opacity: currentMode === 'dark' ? 1 : 0.4 }}
            title="Dark Mode"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}