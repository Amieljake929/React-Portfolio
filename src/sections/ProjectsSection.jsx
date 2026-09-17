import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const ALL_PROJECTS = [
  {
    id: 1,
    category: 'WEB SYSTEM',
    title: 'School Management System III - Capstone Project',
    description: 'An advanced enrollment and academic management portal equipped with an integrated AI-driven course assessment assistant, powered by Hugging Face machine learning models to help students navigate their degree paths.',
    image: '/projects/project1.png',
    githubUrl: 'https://github.com/Amieljake929/Enrollment-Management-System---Cluster-7.git',
  },
  {
    id: 2,
    category: 'WEB SYSTEM',
    title: 'Barangay Management System - BMS',
    description: 'A dedicated digital governance platform built for Barangay Bagbag Sauyo, streamlining resident document requests, official reporting workflows, and community announcements.',
    image: '/projects/project2.png',
    githubUrl: 'https://github.com/Amieljake929/Barangay-Bagbag-System.git',
  },
  {
    id: 3,
    category: 'WEB APP',
    title: 'Kaffa - Coffee Shop Website',
    description: 'A modern, responsive e-commerce web platform featuring an interactive product catalog, seamless add-to-cart management, and a smooth online ordering pipeline.',
    image: '/projects/project4.png',
    githubUrl: 'https://github.com/Amieljake929/Kaffa.git',
  },
  {
    id: 4,
    category: 'WEBSITE',
    title: 'Personal Portfolio Website',
    description: 'A minimalist developer portfolio crafted with React and Tailwind CSS, featuring smooth scroll physics, custom typography, interactive elements, and an integrated AI assistant.',
    image: '/projects/project5.png',
    githubUrl: 'https://github.com/Amieljake929/React-Portfolio.git',
  },
  {
    id: 5,
    category: 'WEB SYSTEM',
    title: 'Local Tour Guide - Travel Website',
    description: 'An immersive travel exploration platform designed to help tourists discover hidden local destinations, curated itineraries, and seamless booking insights.',
    image: '/projects/project6.jpg',
    githubUrl: 'https://github.com/christianbacay042504-coder/coderistyarn2.git',
  },
  {
    id: 6,
    category: 'WEB SYSTEM',
    title: 'PRCQC - System for Philippine Red Cross - Quezon City Chapter',
    description: 'An efficient web administrative platform designed for the Philippine Red Cross Quezon City Chapter to streamline data tracking, records keeping, and community service operations.',
    image: '/projects/project7.png',
    githubUrl: 'https://github.com/Amieljake929/PRCQC.git',
  },
];

export default function ProjectsSection({ isPage = false, viewMode = 'list' }) {
  const projectsToDisplay = isPage ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  if (isPage) {
    return (
      <motion.section
        id="projects"
        className="py-2 w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={`w-full max-w-6xl mx-auto px-4 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'flex flex-col gap-16 max-w-3xl'
            }`}
          >
            {ALL_PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                isActive={true} 
                isGrid={viewMode === 'grid'} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.section>
    );
  }

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projectsToDisplay.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projectsToDisplay.length) % projectsToDisplay.length);
  };

  const currentProject = projectsToDisplay[activeIndex];

  return (
    <motion.section
      id="projects"
      className="py-1 w-full flex flex-col items-center overflow-hidden mt-10 mb-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="w-full max-w-4xl mb-4 flex flex-col items-start px-4 gap-2">
        <motion.div variants={itemVariants} className="flex flex-col items-start gap-1">
          <h2 
            className="text-2xl font-normal tracking-tight sm:text-3xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Selected Projects
          </h2>
          <p 
            className="text-xs sm:text-base font-normal"
            style={{ color: 'var(--text-secondary)' }}
          >
            Some of the recent websites I've worked on.
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl relative flex items-center justify-center px-2 my-2 mt-8">
        <div className="w-full max-w-xl flex justify-center">
          <ProjectCard 
            project={currentProject} 
            isActive={true} 
            isGrid={false}
            direction={direction}
            onSwipeNext={handleNext}
            onSwipePrev={handlePrev}
          />
        </div>
      </div>

      {/* Integrated Navigation Arrows and Indicators Section */}
      <div className="flex items-center gap-4 mb-2 mt-8">
        {/* Previous Arrow Button */}
        <button
          onClick={handlePrev}
          className="p-2 rounded-full border transition-colors shadow-sm cursor-pointer flex items-center justify-center"
          style={{ 
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
          aria-label="Previous project"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
            style={{ color: 'var(--text-primary)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators Dots */}
        <div className="flex items-center gap-1.5">
          {projectsToDisplay.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6' : 'w-1.5 bg-gray-400/40'
              }`}
              style={{
                backgroundColor: activeIndex === idx ? 'var(--text-primary)' : undefined
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full border transition-colors shadow-sm cursor-pointer flex items-center justify-center"
          style={{ 
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
          aria-label="Next project"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
            style={{ color: 'var(--text-primary)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <motion.div variants={itemVariants} className="mt-8 w-full flex justify-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors py-1"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          See all projects <span>&rarr;</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}

function ProjectCard({ project, isActive, isGrid = false, direction = 0, onSwipeNext, onSwipePrev }) {
  const navigate = useNavigate();

  const handleDragEnd = (e, info) => {
    if (!onSwipeNext || !onSwipePrev) return;
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      onSwipeNext();
    } else if (info.offset.x > swipeThreshold) {
      onSwipePrev();
    }
  };

  return (
    <div className="w-full group flex flex-col text-left transition-all duration-300">
      <div className="w-full flex flex-col items-center p-1 mb-1 relative">
        <div className="w-full relative z-10 flex flex-col items-center">
          
          {/* Laptop Lid / Shell */}
          <div className="w-full bg-[#0a0a0b] border-[2px] sm:border-[2.5px] border-[#38383a] rounded-t-lg sm:rounded-t-xl p-[2px] sm:p-[3px] relative shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1.5 sm:h-2 bg-[#0a0a0b] border-b border-x border-[#2b2b2e] rounded-b-sm sm:rounded-b-md z-30 flex justify-center items-center">
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#111] border border-gray-700"></div>
            </div>

            {/* Screen Viewport */}
            <div className="w-full aspect-[16/10] bg-black rounded-t-sm sm:rounded-t-md overflow-hidden relative cursor-grab active:cursor-grabbing touch-pan-y">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={project.id}
                  custom={direction}
                  initial={{ x: direction * 300, opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -300, opacity: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  {...(onSwipeNext && onSwipePrev ? {
                    drag: "x",
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.2,
                    onDragEnd: handleDragEnd
                  } : {})}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    if (isActive) {
                      navigate(`/projects/${project.id}`);
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20 pointer-events-none"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Laptop Base / Keyboard Ridge */}
          <div className="w-[105%] h-1.5 sm:h-2 bg-gradient-to-r from-[#2c2c2e] via-[#4a4a4d] to-[#2c2c2e] rounded-b-sm sm:rounded-b-md relative shadow-md flex justify-center border-t border-gray-700/50">
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#1a1a1c] rounded-b-sm border-t border-gray-600"></div>
          </div>

          {/* Shadow beneath laptop */}
          <div className="w-[92%] h-2 sm:h-3 bg-black/15 rounded-[100%] blur-sm mt-1"></div>
        </div>
      </div>

      {/* Project Details */}
      <div className="flex flex-col items-start w-full px-1 mt-2">
        {isActive ? (
          <div className="w-full flex flex-col items-start">
            <div 
              className="w-full flex items-center justify-between mb-1 cursor-pointer"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <h3 
                className={`font-normal transition-colors line-clamp-1 ${isGrid ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h3>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 shadow-sm shrink-0 ml-2"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <p 
              className="text-[11px] sm:text-xs leading-relaxed font-normal line-clamp-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>
        ) : (
          <div className="h-[45px]"></div>
        )}
      </div>
    </div>
  );
}