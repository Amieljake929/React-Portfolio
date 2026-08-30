import { useEffect, useState, useRef } from 'react';

export default function ThemeTransition({ theme, onThemeApplied, children }) {
  const [animating, setAnimating] = useState(false);
  const prevThemeRef = useRef(theme);
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastTapRef = useRef(0);

  // Track mouse coordinates for desktop view transitions
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Double Tap for Mobile Devices
  useEffect(() => {
    const handleTouchStart = (e) => {
      // Huwag i-trigger kung nag-click/tap sa mga interactive elements (buttons, links, inputs, etc.)
      if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
        return;
      }

      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapRef.current;
      
      // Double tap threshold: 300ms
      if (tapLength < 300 && tapLength > 0) {
        // Kunin ang touch coordinates para sa touch point kung saan nangyari ang double tap
        if (e.touches && e.touches[0]) {
          mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        
        // I-trigger ang toggle ng theme sa App.jsx sa pamamagitan ng custom event o callback kung kailangan,
        // pero dahil hawak ng App.jsx ang pendingTheme, gagamit tayo ng window custom event para madaling maabot.
        window.dispatchEvent(new CustomEvent('trigger-theme-toggle'));
        e.preventDefault();
      }
      lastTapRef.current = currentTime;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      const x = mousePosRef.current.x;
      const y = mousePosRef.current.y;
      
      setAnimating(true);

      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          if (onThemeApplied) onThemeApplied();
        });
      } else {
        setTimeout(() => {
          if (onThemeApplied) onThemeApplied();
        }, 300);
      }

      const timer = setTimeout(() => {
        setAnimating(false);
        prevThemeRef.current = theme;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [theme]);

  return (
    <div className="w-full h-full relative">
      {children}
    </div>
  );
}