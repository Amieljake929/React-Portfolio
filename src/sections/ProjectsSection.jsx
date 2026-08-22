import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      category: 'WEB DESIGN',
      title: 'School Management System III - Capstone Project',
      image: '/projects/project1.png',
      githubUrl: 'https://github.com/Amieljake929/Enrollment-Management-System---Cluster-7.git',
    },
    {
      id: 2,
      category: 'WEB DESIGN',
      title: 'Barangay Management System - BMS',
      image: '/projects/project2.png',
      githubUrl: 'https://github.com/Amieljake929/Barangay-Bagbag-System.git',
    },
    {
      id: 3,
      category: 'WEB DESIGN',
      title: 'Kaffa - Coffee Shop Website',
      image: '/projects/project4.png',
      githubUrl: 'https://github.com/Amieljake929/Kaffa.git',
    },
  ]);

  const containerRef = useRef(null);

  // Container Variant for Stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Blur Fade-in Item Variant
  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
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

  // Function para palitan ang pwesto ng dalawang items
  const handleSwap = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= projects.length) return;
    const updated = [...projects];
    const temp = updated[fromIndex];
    updated[fromIndex] = updated[toIndex];
    updated[toIndex] = temp;
    setProjects(updated);
  };

  return (
    <motion.section
      id="projects"
      className="py-8 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Title */}
      <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
        Recent Projects
      </motion.h2>

      {/* Grid / Flex Layout */}
      <div 
        ref={containerRef}
        className="flex flex-wrap justify-center gap-x-4 gap-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 w-full relative"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalItems={projects.length}
            itemVariants={itemVariants}
            onSwap={handleSwap}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <motion.div variants={itemVariants} className="mt-10 sm:mt-8 flex justify-center sm:justify-start">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
        >
          All Projects <span>&rarr;</span>
        </a>
      </motion.div>
    </motion.section>
  );
}

function ProjectCard({ project, index, totalItems, itemVariants, onSwap }) {
  const [isDragging, setIsDragging] = useState(false);

  // Kina-calculate ang bagong pwesto base sa layo ng drag
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const { offset } = info;
    
    const threshold = 80;
    
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal Swap
      if (offset.x > threshold && index < totalItems - 1) {
        onSwap(index, index + 1);
      } else if (offset.x < -threshold && index > 0) {
        onSwap(index, index - 1);
      }
    } else {
      // Vertical Swap
      if (offset.y > threshold && index < totalItems - 1) {
        onSwap(index, index + 1);
      } else if (offset.y < -threshold && index > 0) {
        onSwap(index, index - 1);
      }
    }
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      className={`group flex flex-col items-center text-center w-[calc(50%-10px)] lg:w-full ${
        index === 2 ? 'sm:w-[calc(50%-10px)] lg:w-full' : ''
      }`}
    >
      {/* Floating Laptop Container */}
      <div className="w-full aspect-[4/3.2] sm:aspect-[4/3] flex items-center justify-center p-1 sm:p-2 mb-2 sm:mb-4 relative">
        
        {/* Draggable Laptop Frame */}
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.05, zIndex: 50 }}
          className="w-full relative z-10 transition-shadow duration-500 ease-out flex flex-col items-center cursor-grab active:cursor-grabbing"
        >
          {/* Upper-Right Drag Indicator Badge - Isinama sa loob ng draggable container */}
          <div className={`absolute -top-3 right-0 sm:-top-4 sm:right-1 z-30 pointer-events-none transition-opacity duration-200 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-900/80 backdrop-blur-md text-white rounded-full text-[8px] sm:text-[10px] font-medium shadow-sm border border-white/20">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
              Drag me
            </span>
          </div>

          {/* Laptop Top / Screen Bezel */}
          <div className="w-full bg-[#0a0a0b] border-[1.5px] sm:border-[2.5px] border-[#38383a] rounded-t-lg sm:rounded-t-xl p-[2px] sm:p-[3px] relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-shadow duration-500">
            {/* Laptop Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1.5 sm:h-2 bg-[#0a0a0b] border-b border-x border-[#2b2b2e] rounded-b-sm sm:rounded-b-md z-30 flex justify-center items-center">
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#111] border border-gray-700"></div>
            </div>

            {/* Laptop Screen Content */}
            <div className="w-full aspect-[16/10] bg-black rounded-t-sm sm:rounded-t-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20 pointer-events-none"></div>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Laptop Bottom Lid / Stand */}
          <div className="w-[105%] h-1.5 sm:h-2.5 bg-gradient-to-r from-[#2c2c2e] via-[#4a4a4d] to-[#2c2c2e] rounded-b-sm sm:rounded-b-md relative shadow-md flex justify-center border-t border-gray-700/50">
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#1a1a1c] rounded-b-sm border-t border-gray-600"></div>
          </div>

          {/* Contact Shadow */}
          <div className="w-[92%] h-2 sm:h-4 bg-black/40 rounded-[100%] blur-sm sm:blur-md mt-0.5 sm:mt-1 transition-all duration-500 group-hover:w-[98%] group-hover:bg-black/50 group-hover:blur-lg group-hover:mt-2"></div>
        </motion.div>
      </div>

      {/* Details Container */}
      <motion.div
        animate={{
          filter: isDragging ? 'blur(6px)' : 'blur(0px)',
          opacity: isDragging ? 0.3 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center select-none"
      >
        {/* Category Tag */}
        <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-0.5 sm:mb-1">
          {project.category}
        </span>

        {/* Title */}
        <div className="w-full min-h-[2.25rem] sm:min-h-[2.5rem] mb-2 sm:mb-3 flex items-start justify-center">
          <h3 className="text-[11px] sm:text-sm font-semibold text-gray-900 leading-tight line-clamp-2 whitespace-normal">
            {project.title}
          </h3>
        </div>

        {/* GitHub Repo Button */}
        <div className="mt-auto flex justify-center w-full">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => isDragging && e.preventDefault()}
            className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 border border-gray-900 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-all group-hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-3 h-3 sm:w-3.5 sm:h-4 transition-transform duration-300 group-hover:scale-110"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View Repository
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}