import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FloatingNavbar({ isLoading = false }) {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={isLoading ? { y: -30, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex justify-center sticky top-0 z-50 mb-[-84px]"
    >
      <div className="bg-[#F6F6F6] rounded-b-[36px] pt-12 pb-10 px-16 sm:px-24 shadow-xs flex items-center justify-center">
        <nav className="flex items-center justify-center gap-10 sm:gap-14">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
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