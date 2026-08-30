import { motion } from 'framer-motion';
import ProjectsSection from '../sections/ProjectsSection';

export default function ProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-6 sm:py-8 w-full max-w-6xl mx-auto"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mt-9 mb-8 text-left">
        <h1 
          className="text-3xl sm:text-4xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Featured Projects
        </h1>
        <p 
          className="text-sm sm:text-base mt-2 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          A showcase of full-stack web applications, custom platforms, and user interface design projects I've engineered.
        </p>
      </motion.div>

      {/* Projects Component displaying ALL items without the bottom button */}
      <ProjectsSection isPage={true} />
    </motion.div>
  );
}