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
  const [activeProofImage, setActiveProofImage] = useState(null);

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
      date: "May 2023",
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

  const certificates = [
    {
      id: 'cert-1',
      title: "Information Management in the Digital Age Course",
      organizer: "Singapore Institute of Multidisciplinary Professions & Bestlink College of the Philippines",
      date: "Sept 04, 2025 - October 31, 2025",
      readTime: "3 min read",
      image: "/seminar/singapore/singapore-front.png",
      certificateImage: "/seminar/webinar.jpg",
      snippet: "Join industry experts for a comprehensive exploration of Information Management in the Digital Age, organized by the Singapore Institute of Multidisciplinary Professions and Bestlink College of the Philippines, featuring veteran tech leader Marc Tonido to master AI integration, cybersecurity, and modern software paradigms.",
      content: `
      In today's fast-paced digital ecosystem, data is one of the most critical assets an organization possesses. The way we collect, secure, organize, and leverage information directly dictates operational efficiency, innovation, and strategic growth.

      The Information Management in the Digital Age Course, proudly co-organized by the Singapore Institute of Multidisciplinary Professions and Bestlink College of the Philippines, featured veteran tech leader Marc Tonido as guest speaker. The session was designed to equip students, professionals, and aspiring tech practitioners with the modern frameworks needed to navigate data governance, security, and digital workflows under expert mentorship.
      `,
      speakerMessage: "Featured Speaker: Marc Tonido (Veteran Tech Leader)",
      speakerDescription: "This special session is led by Marc Tonido, a seasoned professional with two decades of experience in software engineering and senior technical leadership. Having worked across multiple startups in diverse domains—including social platforms, e-commerce, loyalty programs, and analytics—and managed global development teams, he brings a wealth of real-world insights. He is a graduate of Bachelor of Science in Computer Science from the University of the Philippines Visayas.",
      topics: [
        "Module 1: Introduction to AI and its Impact: Understanding the foundational concepts of Artificial Intelligence and how it reshapes modern industries and information processing.",
        "Module 2: AI Trends, Tools, and How to Leverage Them: Exploring cutting-edge AI technologies and practical strategies for integrating them into professional workflows.",
        "Module 3 & 4: Python and AI: A deep dive into utilizing Python as the primary programming language for building and powering artificial intelligence applications.",
        "Module 5: Cybersecurity: Establishing robust defenses to protect critical digital infrastructure and sensitive enterprise assets against evolving threats.",
        "Module 6 & 7: Cloud Security: Navigating the unique security challenges, compliance standards, and risk mitigation strategies inherent in cloud environments.",
        "Module 8: Web Application Security: Safeguarding web platforms and applications from vulnerabilities, injection flaws, and common digital attack vectors."
      ],
      proofImages: [
        "/seminar/singapore/singapore.jpg",
        "/seminar/singapore/singapore2.jpg",
        "/seminar/singapore/singapore3.jpg"
      ]
    },
    {
      id: 'cert-2',
      title: "Research Forum 2025: Empowering the Future through Research",
      organizer: "Bestlink College of the Philippines Center for Research and Development",
      date: "July 2025",
      readTime: "3 min read",
      image: "/seminar/research-forum.jpg",
      certificateImage: "/seminar/research-forum.jpg",
      snippet: "Explore the insights and academic outcomes from the Research Forum 2025, organized by Bestlink College of the Philippines Center for Research and Development under the theme Empowering the Future through Research: Local Solutions for Global Challenges.",
      content: `
      In an era where localized challenges increasingly intersect with global dynamics, the pursuit of impactful investigation and evidence-based solutions is paramount. Academic forums serve as vital catalysts for cultivating innovative thinking, rigorous inquiry, and community-driven development.

      The Research Forum 2025, hosted by the Bestlink College of the Philippines Center for Research and Development on July 13, 2025, centered around the compelling theme: "Empowering the Future through Research: Local Solutions for Global Challenges."

      This academic gathering brought together scholars, students, and institutional leaders to examine how grassroots research initiatives can address broader systemic issues. Under the leadership of Joy Evelyn A. Ignacio, Ph.D., Director of the Center for Research and Development, and Charlie I. Cariño, Ph.D., Vice President of Academic Affairs, the forum emphasized bridging the gap between localized community problem-solving and global academic excellence, inspiring participants to leverage scholarly inquiry as a tool for sustainable growth and innovation.
      `
    },
    {
      id: 'cert-3',
      title: "Certficicate of Completion: Bestlink College of the Philippines",
      organizer: "Bestlink College of the Philippines",
      date: "May 2026",
      readTime: "3 min read",
      image: "/seminar/commencement-exercises.png",
      certificateImage: "/seminar/bcp-coc.jpg",
      snippet: "Celebrate the monumental milestone of academic achievement at the Bestlink College of the Philippines 25th Commencement Exercises, held on May 06, 2026, at the Fiesta Pavillion Hall, Manila Hotel, under the inspiring theme One Together: Stronger as One, Rising Above Challenges",
      content: `
      A graduation ceremony represents far more than the conclusion of an academic journey; it marks the triumphant culmination of years of late-night studying, perseverance, and unwavering dedication. It is a moment where academic challenges are transformed into stepping stones for future success.

      The Bestlink College of the Philippines 25th Commencement Exercises, conducted on May 06, 2026, at the prestigious Fiesta Pavillion Hall of the Manila Hotel, brought together proud graduates, families, faculty, and institutional leaders. Embracing the powerful theme "One Together: Stronger as One, Rising Above Challenges," this milestone celebration honored the resilience, solidarity, and relentless hard work of the graduating cohort. As these new professionals step forward into the digital age and industry landscapes, they carry with them the core values of excellence and perseverance instilled by Bestlink College of the Philippines, ready to make a meaningful impact in their respective fields.
      `
    }
  ];

  const otherItems = [
    {
      id: 'other-1',
      title: "The Basic Disaster Management Training (BDMT)",
      organizer: "Philippine Red Cross – Quezon City Chapter",
      date: "February 2026",
      readTime: "4 min read",
      image: "/seminar/PRCQC-front.png",
      certificateImage: "/seminar/PRCQC.jpg",
      snippet: "Master critical preparedness and emergency response skills through the Basic Disaster Management Training (BDMT), certified by the Philippine Red Cross – Quezon City Chapter.",
      content: `
      Disaster preparedness and rapid emergency response are vital components of building resilient communities. Equipping individuals with the right tools, assessment protocols, and relief frameworks ensures coordinated action when crises strike.

      The Basic Disaster Management Training (BDMT), successfully completed on February 26–27, 2026, at the Philippine Red Cross – Quezon City Chapter Building, focused on building foundational competencies in emergency management. The comprehensive curriculum covered essential topics including Disaster Concepts, Emergency Response Concepts, Rapid Disaster Assessment and Needs Analysis (RDANA), Relief Management, and Disaster Reporting. Certified under the leadership of Chapter Service Representative for Disaster Management Service Joel B. Fuentes and Chapter Administrator Janice Melody Adolfo, RN, this training reinforces proactive community service, readiness, and efficient humanitarian action.
      `
    }
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
            src="/images/url.png"
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

          {selectedSeminar.speakerMessage && (
            <div className="pt-4 space-y-2 border-t mt-6" style={{ borderColor: 'var(--border-color)' }}>
              <p className="font-medium text-base sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                {selectedSeminar.speakerMessage}
              </p>
              {selectedSeminar.speakerDescription && (
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selectedSeminar.speakerDescription}
                </p>
              )}
            </div>
          )}

          {selectedSeminar.topics && selectedSeminar.topics.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="text-base sm:text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Course Topics Covered
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                {selectedSeminar.topics.map((topic, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedSeminar.proofImages && selectedSeminar.proofImages.length > 0 && (
            <div className="pt-6 space-y-3">
              <h3 className="text-base sm:text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Images attended to the webinar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {selectedSeminar.proofImages.map((proof, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveProofImage(proof)}
                    className="rounded-lg overflow-hidden border cursor-pointer group aspect-video relative"
                    style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <img 
                      src={proof} 
                      alt={`Attendance proof ${i + 1}`}
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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

          {activeProofImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs cursor-pointer"
              onClick={() => setActiveProofImage(null)}
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
                  src={activeProofImage} 
                  alt="Attendance proof preview"
                  className="w-auto h-auto max-w-full max-h-[82vh] object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  const renderSectionContent = (items) => {
    if (viewMode === 'grid') {
      return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSeminar(item)}
              className="flex flex-col justify-between pb-6 border-b group cursor-pointer"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div>
                <div className="w-full h-40 overflow-hidden relative rounded-lg border mb-4" style={{ borderColor: 'var(--border-color)' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
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
                      {item.date}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 
                    className="text-base font-normal tracking-tight mb-2 line-clamp-2 group-hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    className="text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>{item.readTime}</span>
                <span className="font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--text-primary)' }}>
                  Read <FiArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-col">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSeminar(item)}
              className="py-5 border-b flex flex-row items-center gap-4 transition-all duration-300 cursor-pointer group"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-28 h-28 rounded-lg object-cover border flex-shrink-0 grayscale transition-all duration-500 group-hover:grayscale-0"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <span>{item.date}</span>
                  <span>&bull;</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 
                  className="text-base font-normal tracking-tight mb-1.5 group-hover:underline line-clamp-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-xs sm:text-sm line-clamp-2 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

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
            Seminars & Workshops
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

      {/* Seminars Section */}
      <motion.div variants={itemVariants} className="w-full mb-12">
        <h3 
          className="text-xl sm:text-2xl font-normal tracking-tight mb-6 pb-2"
          style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
        >
          Seminars
        </h3>
        {renderSectionContent(seminars)}
      </motion.div>

      {/* Certificates Section */}
      <motion.div variants={itemVariants} className="w-full mb-12">
        <h3 
          className="text-xl sm:text-2xl font-normal tracking-tight mb-6 pb-2"
          style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
        >
          Certificates
        </h3>
        {renderSectionContent(certificates)}
      </motion.div>

      {/* Other Section */}
      <motion.div variants={itemVariants} className="w-full">
        <h3 
          className="text-xl sm:text-2xl font-normal tracking-tight mb-6 pb-2"
          style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
        >
          Other
        </h3>
        {renderSectionContent(otherItems)}
      </motion.div>
    </motion.section>
  );
}