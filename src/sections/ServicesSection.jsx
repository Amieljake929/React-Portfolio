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
  const [activeId, setActiveId] = useState(1);
  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-4 px-3 sm:px-0 mt-10 mb-10"
    >
      <div className="flex flex-col items-start gap-2 mb-15 sm:mb-15">
        <h2 
          className="text-2xl font-normal tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
        >
          Services
        </h2>
        <p 
            className="text-xs sm:text-base font-normal"
            style={{ color: 'var(--text-secondary)' }}
          >
            Some of the recent websites I've worked on.
          </p>
      </div>

      {/* Main Layout Container: Side-by-side on both mobile and desktop */}
      <div className="w-full grid grid-cols-12 gap-4 sm:gap-12 items-center">
        
        {/* Left Side: Circular Image Nodes List */}
        <div className="col-span-5 sm:col-span-5 flex flex-col gap-3 sm:gap-4 w-full">
          {SERVICES.map((service) => {
            const isActive = service.id === activeId;

            return (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className="group flex items-center gap-3 sm:gap-4 text-left transition-all duration-300 focus:outline-none w-full"
              >
                {/* Circular Container with Image inside */}
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 shadow-sm border shrink-0`}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: isActive ? 'var(--text-primary)' : 'var(--border-color)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isActive ? 'grayscale-0 brightness-100 scale-105' : 'grayscale brightness-95 group-hover:grayscale-0'
                    }`}
                  />
                </div>

                {/* Service Title Label */}
                <span 
                  className={`text-xs sm:text-base transition-opacity duration-300 font-medium line-clamp-1 sm:line-clamp-none ${
                    isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                  }`}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Service Details (Text Only, Side-by-Side on Mobile too) */}
        <div className="col-span-7 sm:col-span-7 w-full pl-2 sm:px-6 py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-start"
            >
              {/* Title */}
              <h3 
                className="text-[20px] sm:text-4xl font-normal tracking-tight mb-2 sm:mb-4 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {activeService.title}
              </h3>

              {/* Description */}
              <p 
                className="text-[12px] sm:text-[15px] leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {activeService.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}