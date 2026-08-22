import { motion } from 'framer-motion';

export default function HeroSection() {
  // Container Variant: Controls staggered entrance timing of each element
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Item Variant: Blur-to-Clear Fade-In + Spring Slide Up
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-20 sm:py-12 my-4 sm:my-0 w-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center"
    >
      {/* Availability Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-3 sm:py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium mb-7 sm:mb-8 shadow-xs"
      >
        <span className="w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Available for Work
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="text-[2.6rem] sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6 sm:mb-6"
      >
        Hey there!<br />
        I'm Amiel Jake...
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-gray-500 max-w-md text-[1.05rem] sm:text-base leading-relaxed mb-9 sm:mb-8 mx-auto sm:mx-0"
      >
        Designing intuitive interfaces and building smooth, modern web experiences from concept to code.
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 sm:gap-3 w-full sm:w-auto"
      >
        {/* Primary CTA: Resume Button */}
        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href="/Amiel_Jake_Resume.pdf"
          download="Amiel_Jake_Resume.pdf"
          className="inline-flex items-center justify-center gap-2 px-5.5 py-3 sm:px-5 sm:py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
        >
          <span>Get Resume</span>
          <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.a>

        {/* Secondary CTA: About Me */}
        <motion.a
          whileHover={{ scale: 1.03, x: 2 }}
          whileTap={{ scale: 0.97 }}
          href="#about"
          className="inline-flex items-center justify-center gap-2 px-5.5 py-3 sm:px-5 sm:py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          More about Me <span>&rarr;</span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}