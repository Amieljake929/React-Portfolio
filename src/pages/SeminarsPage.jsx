// src/pages/SeminarsPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';

export default function SeminarsPage() {
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('seminars_view_mode') || 'grid';
  });
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('seminars_view_mode', viewMode);
  }, [viewMode]);

  const seminars = [
    {
      id: 'quantum-computing',
      title: "Quantum Computing: Breaking The Limits. Generative AI & its Application",
      organizer: "Tech Innovation Summit",
      date: "November 2024",
      readTime: "5 min read",
      image: "/seminar/baguio1.png",
      certificateImage: "/seminar/seminar3.png",
      snippet: "Explored the intersection of quantum computing paradigms, advanced machine learning architectures, and real-world API integrations for generative AI models.",
      content: `
        The rapid convergence of quantum computing concepts and Generative Artificial Intelligence is redefining what is possible in software development and data processing. 

        During this seminar, industry leaders dissected how theoretical quantum mechanics principles inspire new approaches to algorithm optimization. While physical quantum hardware is still evolving, developers can already adopt quantum-inspired thinking to build resilient, highly scalable systems.

        Key takeaways included leveraging advanced transformer models, setting up secure Hugging Face API pipelines, and engineering fault-tolerant serverless function routes to manage intensive AI workloads seamlessly.
      `
    },
    {
      id: 'beachside-code-camp',
      title: "Beachside Code Camp: Diving Deep Into Tech Innovation",
      organizer: "Developer Bootcamps & Workshops",
      date: "May 2025",
      readTime: "4 min read",
      image: "/seminar/subic.jpg",
      certificateImage: "#",
      snippet: "An intensive immersion program focusing on rapid software prototyping, collaborative code workflows, and scalable web application architecture.",
      content: `
        An intensive immersion program focusing on collaboration, code maintainability, and rapid product delivery under tight constraints. 

        We collaborated closely with cross-functional developers to architect full-stack applications using React, Tailwind CSS, and robust backend endpoints. The camp emphasized clean code practices, modular component structuring, and effective version control strategies using Git and GitHub.
      `
    },
    {
      id: 'bitz-2023',
      title: "BITZ 2023: Accelerating the Innovators Role in Digital Transformation",
      organizer: "IT Conference & Academic Forum",
      date: "April 2023",
      readTime: "6 min read",
      image: "/seminar/morong-bataan.png",
      certificateImage: "/seminar/seminar2.jpg",
      snippet: "Focused on modern IT governance solutions, enterprise digital transformation strategies, and leveraging agile methodologies for impactful software systems.",
      content: `
        BITZ 2023 served as a comprehensive forum analyzing how emerging IT systems streamline local governance, institutional workflows, and enterprise operations.

        Discussions highlighted the pivotal role of IT professionals in modernizing legacy structures through intuitive web portals, automated databases, and secure user management workflows—principles that later heavily influenced the architecture of real-world deployment projects like capstone systems and barangay management platforms.
      `
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    },
  };

  if (selectedSeminar) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full flex flex-col items-start text-left py-6 sm:py-10 relative"
      >
        <button
          onClick={() => setSelectedSeminar(null)}
          className="inline-flex items-center gap-2 text-xs font-medium mb-8 cursor-pointer bg-transparent border-none p-0 transition-colors group"
          style={{ color: 'var(--text-secondary)' }}
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span style={{ color: 'var(--text-primary)' }}>all seminars</span>
        </button>

        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
          <span>{selectedSeminar.date}</span>
          <span>&bull;</span>
          <span>{selectedSeminar.readTime}</span>
        </div>

        <h1 
          className="text-2xl sm:text-3xl font-normal tracking-tight mb-6 leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {selectedSeminar.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b w-full" style={{ borderColor: 'var(--border-color)' }}>
          <img
            src="/images/Jake.jpg"
            alt="Amiel Jake Baril"
            className="w-9 h-9 rounded-full object-cover border"
            style={{ borderColor: 'var(--border-color)' }}
          />
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Amiel Jake Baril</p>
            <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Attendee &bull; {selectedSeminar.organizer}</p>
          </div>
        </div>

        <div className="w-full rounded-xl overflow-hidden border mb-8 shadow-xs flex justify-center items-center group cursor-pointer" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <img 
            src={selectedSeminar.image} 
            alt={selectedSeminar.title} 
            className="w-full h-auto object-contain max-h-[80vh] grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>

        <div 
          className="text-sm sm:text-base leading-relaxed space-y-4 w-full mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {selectedSeminar.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-6 w-full flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-transparent border-none p-0 cursor-pointer transition-opacity hover:opacity-70 group"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>View Certificate</span>
            <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <AnimatePresence>
          {isCertModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsCertModalOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-[95vw] max-h-[90vh] p-2 rounded-xl border shadow-2xl flex flex-col items-center cursor-default overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)' 
                }}
              >
                <img 
                  src={selectedSeminar.certificateImage} 
                  alt="Certificate preview"
                  className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.section
      id="seminars"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 sm:py-16 w-full flex flex-col items-start text-left justify-center scroll-mt-28"
    >
      <motion.div variants={itemVariants} className="mb-8 w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h2 
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            seminars & workshops
          </h2>
          <p 
            className="text-sm sm:text-base max-w-xl mb-4 sm:mb-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            Continuous learning, professional development, and tech conferences attended.
          </p>
        </div>

        <div 
          className="flex items-center gap-1 p-1 rounded-lg border self-start sm:mt-0"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
        >
          <button
            onClick={() => setViewMode('list')}
            aria-label="List view"
            className={`p-1.5 rounded-md transition-colors cursor-pointer border-none ${viewMode === 'list' ? 'shadow-2xs' : 'opacity-50'}`}
            style={{ 
              backgroundColor: viewMode === 'list' ? 'var(--bg-primary)' : 'transparent',
              color: 'var(--text-primary)'
            }}
          >
            <FiList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            className={`p-1.5 rounded-md transition-colors cursor-pointer border-none ${viewMode === 'grid' ? 'shadow-2xs' : 'opacity-50'}`}
            style={{ 
              backgroundColor: viewMode === 'grid' ? 'var(--bg-primary)' : 'transparent',
              color: 'var(--text-primary)'
            }}
          >
            <FiGrid className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {viewMode === 'grid' ? (
        <motion.div 
          variants={itemVariants} 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {seminars.map((seminar) => (
            <div
              key={seminar.id}
              onClick={() => setSelectedSeminar(seminar)}
              className="flex flex-col justify-between pb-6 border-b group cursor-pointer"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div>
                <div className="w-full h-40 overflow-hidden relative rounded-lg border mb-4" style={{ borderColor: 'var(--border-color)' }}>
                  <img 
                    src={seminar.image} 
                    alt={seminar.title}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute top-2 left-2">
                    <span 
                      className="text-[10px] font-medium px-2.5 py-1 rounded-md border backdrop-blur-md"
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff'
                      }}
                    >
                      {seminar.date}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 
                    className="text-base font-normal tracking-tight mb-2 line-clamp-2 group-hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {seminar.title}
                  </h3>
                  
                  <p 
                    className="text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {seminar.snippet}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>{seminar.readTime}</span>
                <span className="font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--text-primary)' }}>
                  Read <FiArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants} 
          className="w-full flex flex-col"
        >
          {seminars.map((seminar) => (
            <div
              key={seminar.id}
              onClick={() => setSelectedSeminar(seminar)}
              className="py-5 border-b flex flex-row items-center gap-4 transition-all duration-300 cursor-pointer group"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <img 
                src={seminar.image} 
                alt={seminar.title}
                className="w-28 h-28 rounded-lg object-cover border flex-shrink-0 grayscale transition-all duration-500 group-hover:grayscale-0"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <span>{seminar.date}</span>
                  <span>&bull;</span>
                  <span>{seminar.readTime}</span>
                </div>
                <h3 
                  className="text-base font-normal tracking-tight mb-1.5 group-hover:underline line-clamp-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {seminar.title}
                </h3>
                <p 
                  className="text-xs sm:text-sm line-clamp-2 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {seminar.snippet}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}