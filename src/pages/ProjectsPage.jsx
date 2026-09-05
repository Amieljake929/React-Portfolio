import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from '../sections/ProjectsSection';

export default function ProjectsPage() {
  // Kunin ang nakasave sa localStorage o mag-default sa 'list'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('projectsViewMode') || 'list';
  });

  // I-save sa localStorage tuwing magpapalit ang viewMode
  useEffect(() => {
    localStorage.setItem('projectsViewMode', viewMode);
  }, [viewMode]);

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
      className="py-6 sm:py-8 w-full max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Page Header with List/Grid Toggle Switcher */}
      <motion.div variants={itemVariants} className="mt-9 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
        <div>
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
        </div>

        {/* View Mode Toggle Switcher */}
        <div 
          className="flex items-center p-1 rounded-full border shadow-sm self-start sm:self-auto shrink-0"
          style={{ 
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${viewMode === 'list' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'}`}
            style={{
              backgroundColor: viewMode === 'list' ? 'var(--bg-secondary)' : 'transparent',
              color: 'var(--text-primary)',
            }}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${viewMode === 'grid' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'}`}
            style={{
              backgroundColor: viewMode === 'grid' ? 'var(--bg-secondary)' : 'transparent',
              color: 'var(--text-primary)',
            }}
            aria-label="Grid view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Projects Component with passed viewMode */}
      <ProjectsSection isPage={true} viewMode={viewMode} />
    </motion.div>
  );
}