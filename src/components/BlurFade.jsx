import { motion } from 'framer-motion';

export default function BlurFade({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}