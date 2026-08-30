import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FloatingNavbar({ isLoading = false }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Gear', path: '/gear' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={isLoading ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex justify-center sticky top-0 z-50 mb-[-84px]"
    >
      <div 
        className="rounded-b-[36px] pt-10 pb-10 px-13 sm:px-19 shadow-xs flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <nav className="flex items-center justify-center gap-6 sm:gap-10 relative">
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
      </div>
    </motion.div>
  );
}