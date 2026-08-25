import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Folder, Layers, Mail, Shield, Menu, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Sidebar({ isLoading = false }) { // Add isLoading prop
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
    { name: 'Licensing', icon: Shield, path: '/licensing' },
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
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between z-50">
        <div>
          <h2 className="font-bold text-gray-900 text-base">Amiel Jake</h2>
          <p className="text-[10px] text-gray-500 font-medium">Web Designer & Developer</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Dark Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm touch-none"
        />
      )}

      {/* Sidebar Aside Wrapper */}
      <aside
        className={`w-72 fixed left-0 top-0 bottom-0 border-r border-gray-200 bg-white z-50 transition-transform lg:transition-none duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Inner Container: Mag-a-animate lang kung tapos na ang loader (!isLoading) */}
        <motion.div
          variants={sidebarContainerVariants}
          initial="hidden"
          animate={isLoading ? 'hidden' : 'visible'}
          className="h-full flex flex-col justify-between p-6 overflow-hidden"
        >
          {/* Top Section: Header & Nav */}
          <div className="flex flex-col">
            {/* Profile Header */}
            <motion.div variants={springItemVariants} className="text-center mt-6 lg:mt-10 mb-6 lg:mb-12 px-2">
              <h2 className="mt-3 font-bold text-gray-900 text-xl leading-snug tracking-tight">
                Amiel Jake Baril
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1.5 mb-6 lg:mb-0">
                Web Designer & Developer
              </p>
            </motion.div>

            {/* Divider Line */}
            <motion.hr variants={springItemVariants} className="border-gray-200 my-4" />

            {/* Navlinks */}
            <nav className="flex flex-col gap-3 mt-6 lg:mt-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div key={item.name} variants={springItemVariants}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
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