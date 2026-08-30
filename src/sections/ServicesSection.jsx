import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

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
      <div className="flex flex-col items-start gap-2 mb-4">
        <Layers 
          className="w-7 h-7" 
          strokeWidth={1.5} 
          style={{ color: 'var(--text-secondary)' }}
        />
        <h2 
          className="text-xl sm:text-2xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Services
        </h2>
      </div>

      {/* Ginamit ang grid-cols-2 para maging dalawa ang column kahit sa mobile */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full items-start">
        {SERVICES.map((service) => {
          const isOpen = openId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className="rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 cursor-pointer relative flex flex-col justify-between self-start"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                // Mag-iiba ang border color sa hover (mas prominent)
                e.currentTarget.style.borderColor = 'var(--text-secondary)';
              }}
              onMouseLeave={(e) => {
                // Babalik sa normal border color
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Arrow sa kanang tuktok */}
              <div 
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-transform duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <svg
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Nilalaman ng Card: Image at Title */}
              <div className="flex flex-col items-start pr-8 sm:pr-10">
                <div 
                  className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border shrink-0 mb-3 sm:mb-4"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-300 block"
                  />
                </div>
                <h3 
                  className="text-sm sm:text-lg font-normal mb-1 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Description Animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      mass: 1,
                    }}
                    className="overflow-hidden"
                  >
                    <p 
                      className="text-xs sm:text-sm leading-relaxed pt-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
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