import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  {
    id: 1,
    title: 'Web Design',
    description: 'I create clean, functional websites that reflect your brand and engage your audience with clarity and purpose.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Designing intuitive user interfaces and seamless user experiences focused on usability, modern aesthetics, and accessibility.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'No-code Development',
    description: 'Building robust, highly polished digital platforms and portfolios quickly using advanced modern design tools and frameworks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Product Design',
    description: 'End-to-end product ideation, wireframing, and interactive prototyping to bring your digital concepts to life efficiently.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=400&h=400&fit=crop',
  },
];

export default function ServicesSection() {
  const [openId, setOpenId] = useState(null);

  const toggleService = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-2"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
        Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-start">
        {SERVICES.map((service) => {
          const isOpen = openId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-gray-300 transition-all duration-300 cursor-pointer relative flex flex-col justify-between self-start"
            >
              {/* Arrow sa kanang tuktok */}
              <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 transition-transform duration-300">
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Nilalaman ng Card: Image at Title */}
              <div className="flex flex-col items-start pr-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-gray-200 shrink-0 mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-300 block"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                  {service.title}
                </h3>
              </div>

              {/* Description Animation na may Bounce effect */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    // Dito inilagay ang spring animation para sa bounce
                    transition={{
                      type: 'spring',
                      stiffness: 300, // Lakas ng bounce
                      damping: 20,    // Bilis ng paghupa ng bounce
                      mass: 1         // Bigat ng animation
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed pt-2">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}