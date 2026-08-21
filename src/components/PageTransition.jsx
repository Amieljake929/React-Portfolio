import { motion } from 'framer-motion';

export default function PageTransition({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth custom spring jump-in cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}