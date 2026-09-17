import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StackSection() {
  const [isAllColored, setIsAllColored] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.section
      id="stack"
      className="py-6 w-full flex flex-col items-start text-left mt-5 mb-5"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Header Container with Toggle Switch */}
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between gap-4 mb-15 sm:mb-15">
        <div className="flex flex-col items-start gap-2">
          <h2 
            className="text-2xl font-normal tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Stack
          </h2>
          <p 
            className="text-xs sm:text-base font-normal"
            style={{ color: 'var(--text-secondary)' }}
          >
            Some of the recent websites I've worked on.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-2">
          <span 
            className="text-xs font-medium tracking-tight select-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            Color All
          </span>
          <button
            onClick={() => setIsAllColored(!isAllColored)}
            className="w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer"
            style={{ 
              backgroundColor: isAllColored ? '#34C759' : 'var(--bg-secondary)' 
            }}
            aria-label="Toggle Color All"
          >
            <motion.div
              className="w-5 h-5 rounded-full shadow-md"
              style={{ backgroundColor: 'var(--bg-primary)' }}
              animate={{ x: isAllColored ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          </button>
        </div>
      </motion.div>

      {/* Tech Stack Image Container with Dynamic Grayscale/Color Filter */}
      <motion.div variants={itemVariants} className="w-full">
        <img
          src="/stacks/tech-stacks.png"
          alt="Tech Stack"
          className={`w-full h-auto object-contain rounded-xl select-none transition-all duration-300 ${
            isAllColored ? 'grayscale-0' : 'grayscale opacity-80'
          }`}
        />
      </motion.div>

      {/* Button navigating to separate route */}
      <motion.div variants={itemVariants} className="mt-6">
        <Link
          to="/stack"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          All Stack <span>&rarr;</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}