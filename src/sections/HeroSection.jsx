import { motion } from 'framer-motion';

export default function HeroSection() {
  // Container Variant: Controls staggered entrance timing of each element
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Gap sa pagitan ng pagpasok ng bawat element
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
      className="pt-4 pb-12"
    >
      {/* Availability Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Available for Work
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6"
      >
        Hey there!<br />
        I'm Amiel Jake...
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-gray-500 max-w-md text-base leading-relaxed mb-8"
      >
        I'm a passionate web designer dedicated to crafting visually stunning and user-friendly websites.
      </motion.p>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
        {/* Primary CTA: Resume Button */}
        <motion.a
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href="/Amiel_Jake_Resume.pdf"
          download="Amiel_Jake_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
        >
          <span>Get Resume</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.a>

        {/* Secondary CTA: About Me */}
        <motion.a
          whileHover={{ scale: 1.03, x: 2 }}
          whileTap={{ scale: 0.97 }}
          href="#about"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
        >
          More about Me <span>&rarr;</span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}