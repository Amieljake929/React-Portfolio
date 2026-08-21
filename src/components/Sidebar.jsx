import { useState } from 'react';
import { Home, User, Folder, Layers, Mail, Shield, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, href: '#home', active: true },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Projects', icon: Folder, href: '#projects' },
    { name: 'Stack', icon: Layers, href: '#stack' },
    { name: 'Contact', icon: Mail, href: '#contact' },
    { name: 'Licensing', icon: Shield, href: '#licensing' },
  ];

  // Container Variant: Controls staggered animation of child elements
  const sidebarContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Sunod-sunod na pag-angat ng bawat element
        delayChildren: 0.1,
      },
    },
  };

  // Item Variant: Slides up from bottom with BOUNCE effect
  const springItemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 140, // Kakapalan/Tigas ng spring
        damping: 12,    // Bawas sa alog para sakto lang ang bounce
        mass: 0.8,
      },
    },
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between z-50">
        <div>
          <h2 className="font-bold text-gray-900 text-base">Patrick Kombo</h2>
          <p className="text-[10px] text-gray-500 font-medium">Product Designer</p>
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
          className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Aside Wrapper */}
      <aside
        className={`w-72 h-screen fixed left-0 top-0 border-r border-gray-200 bg-white z-50 transition-transform lg:transition-none duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Animated Inner Container */}
        <motion.div
          variants={sidebarContainerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col justify-between p-6"
        >
          <div>
            {/* Profile Header */}
            <motion.div variants={springItemVariants} className="text-center mt-10 mb-12 px-2">
              <h2 className="font-bold text-gray-900 text-xl leading-snug tracking-tight">
                Patrick Kombo
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-1.5">
                Product Designer
              </p>
            </motion.div>

            {/* Divider Line */}
            <motion.hr variants={springItemVariants} className="border-gray-200 my-4" />

            {/* Navlinks */}
            <nav className="flex flex-col gap-3 mt-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  variants={springItemVariants}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium leading-relaxed rounded-xl transition-all ${
                    item.active
                      ? 'text-gray-900 bg-gray-100/80 font-semibold'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} className="text-gray-500" />
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social Links Footer */}
          <motion.div
            variants={springItemVariants}
            className="flex items-center justify-around text-gray-400 my-2 pt-5 border-t border-gray-200 text-xs font-semibold"
          >
            <a href="#" className="hover:text-gray-900 transition-colors">X</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Figma</a>
            <a href="#" className="hover:text-gray-900 transition-colors">IG</a>
            <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
          </motion.div>
        </motion.div>
      </aside>
    </>
  );
}