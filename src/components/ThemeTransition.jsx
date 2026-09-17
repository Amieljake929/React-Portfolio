// src/components/ThemeTransition.jsx
import { useEffect, useState, useRef } from 'react';

export default function ThemeTransition({ theme, onThemeApplied, children }) {
  const [animating, setAnimating] = useState(false);
  const prevThemeRef = useRef(theme);
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Track mouse coordinates for desktop view transitions
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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