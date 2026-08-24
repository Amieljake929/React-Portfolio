import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const text = "Amiel Jake";
  const letters = Array.from(text);

  useEffect(() => {
    // Sapat na oras para mag-stay at mag-scroll nang malinaw sa gitna bago i-trigger ang exit
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  // Stagger Controller
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Mabilis na pagpasok ng bawat letra
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Isa-isang aakyat pataas sa exit
        staggerDirection: 1,
      },
    },
  };

  // Letter Motion Variants
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: '100vh', // Galing sa dulo ng baba
      filter: 'blur(20px)', // Bago pumasok ay naka-blur
    },
    visible: {
      opacity: 1,
      y: -20, // Dahan-dahang aakyat pataas habang nasa gitna
      filter: 'blur(0px)', // Malinaw habang nasa gitna
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: '-100vh', // Aakyat diretso sa pinakataas ng screen
      filter: 'blur(20px)', // Sabay na magbublur HABANG umaakyat pataas
      transition: {
        duration: 0.8,
        ease: [0.7, 0, 0.84, 0], // Iisa ang ease at duration para 100% synchronized
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