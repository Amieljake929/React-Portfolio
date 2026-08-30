import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

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

export default function ProjectsSection({ isPage = false }) {
  const projectsToDisplay = isPage ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 14 },
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
        <div className="w-full max-w-xl flex flex-col gap-12">
          {ALL_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isActive={true} />
          ))}
        </div>
      </motion.section>
    );
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsToDisplay.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsToDisplay.length) % projectsToDisplay.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <motion.section
      id="projects"
      className="py-1 w-full flex flex-col items-center overflow-visible"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Pinatibay ang flex container para magkatabi ang text info at ang arrows kahit sa mobile view */}
      <div className="w-full max-w-5xl mb-0 flex flex-row items-end sm:items-center justify-between px-4 gap-4">
        <motion.div variants={itemVariants} className="flex flex-col items-start gap-2">
          {/* Binigyan ng strokeWidth={1.5} para pumayat ang icon */}
          <Briefcase className="w-7 h-7 text-gray-500" strokeWidth={1.5} />
          <h2 className="text-2xl font-normal text-gray-900 tracking-tight sm:text-3xl">
            Selected Projects
          </h2>
          <p className="text-xs sm:text-base text-gray-500 font-normal">
            Some of the recent websites I've worked on.
          </p>
        </motion.div>
        
        {/* Navigation Buttons laging nasa kanan ng header row */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
            aria-label="Previous project"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
            aria-label="Next project"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        className="w-full max-w-6xl relative h-[380px] sm:h-[410px] flex items-center justify-center px-12 sm:px-24 my-0 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {projectsToDisplay.map((project, index) => {
          const total = projectsToDisplay.length;
          let offset = (index - activeIndex + total) % total;
          if (offset > total / 2) {
            offset -= total;
          }

          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          let xPercentage = offset * 55;
          let scale = isActive ? 1 : 0.72;
          let zIndex = 30 - absOffset * 10;
          let opacity = absOffset > 1 ? 0.15 : isActive ? 1 : 0.45;
          let rotateY = offset * -10;

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: `${xPercentage}%`,
                scale,
                zIndex,
                opacity,
                rotateY,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                pointerEvents: absOffset > 1 ? 'none' : 'auto',
                position: 'absolute',
              }}
              className="w-[260px] sm:w-[320px] cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <ProjectCard project={project} isActive={isActive} />
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={itemVariants} className="mt-4 w-full flex justify-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-1"
        >
          See all projects <span>&rarr;</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}

function ProjectCard({ project, isActive }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        if (isActive) {
          navigate(`/projects/${project.id}`);
        }
      }}
      className={`group flex flex-col text-left transition-all duration-300 ${isActive ? 'cursor-pointer' : 'cursor-pointer select-none'}`}
    >
      <div className="w-full aspect-[4/3] flex items-center justify-center p-1 mb-1 relative">
        <div className="w-full relative z-10 flex flex-col items-center transform transition-transform duration-500 ease-out">
          
          <div className="w-full bg-[#0a0a0b] border-[2px] sm:border-[2.5px] border-[#38383a] rounded-t-lg sm:rounded-t-xl p-[2px] sm:p-[3px] relative shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1.5 sm:h-2 bg-[#0a0a0b] border-b border-x border-[#2b2b2e] rounded-b-sm sm:rounded-b-md z-30 flex justify-center items-center">
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#111] border border-gray-700"></div>
            </div>

            <div className="w-full aspect-[16/10] bg-black rounded-t-sm sm:rounded-t-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20 pointer-events-none"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top select-none pointer-events-none"
              />
            </div>
          </div>

          <div className="w-[105%] h-1.5 sm:h-2 bg-gradient-to-r from-[#2c2c2e] via-[#4a4a4d] to-[#2c2c2e] rounded-b-sm sm:rounded-b-md relative shadow-md flex justify-center border-t border-gray-700/50">
            <div className="w-6 sm:w-10 h-0.5 sm:h-1 bg-[#1a1a1c] rounded-b-sm border-t border-gray-600"></div>
          </div>

          <div className="w-[92%] h-2 sm:h-3 bg-black/15 rounded-[100%] blur-sm mt-1 transition-all duration-500"></div>
        </div>
      </div>

      <div className="flex flex-col items-start w-full px-1 min-h-[55px]">
        {isActive ? (
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.25 }}
            className="w-full flex flex-col items-start"
          >
            <div className="w-full flex items-center justify-between mb-1">
              <h3 className="text-sm sm:text-base font-normal text-gray-900 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5 shadow-sm shrink-0">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <p className="text-xs sm:text-xs text-gray-600 leading-relaxed font-normal line-clamp-2">
              {project.description}
            </p>
          </motion.div>
        ) : (
          <div className="h-[45px]"></div>
        )}
      </div>
    </div>
  );
}