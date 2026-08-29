import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const text = "Amiel Jake";
  const letters = Array.from(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: 1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: '100vh',
      filter: 'blur(20px)',
    },
    visible: {
      opacity: 1,
      y: -20,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: '-100vh',
      filter: 'blur(20px)',
      transition: {
        duration: 0.8,
        ease: [0.7, 0, 0.84, 0],
      },
    },
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onFinish) onFinish();
      }}
    >
      {isVisible && (
        <motion.div
          key="loader-wrapper"
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="flex py-6 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="loader-letter"
                style={{ fontWeight: 400 }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;