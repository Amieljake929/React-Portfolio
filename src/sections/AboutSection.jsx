import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ 1. I-import ang Link
import BlurFade from '../components/BlurFade';

export default function AboutSection() {
  const [images, setImages] = useState([
    '/images/Jake.jpg',
    '/me/unnamed2.jpg',
    '/me/unnamed3.jpg',
    '/images/about-me.jpg',
  ]);

  const [cards, setCards] = useState(() =>
    images.map((img, idx) => ({ id: idx, img }))
  );

  const [flyingCardId, setFlyingCardId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = () => {
    if (isAnimating || cards.length <= 1) return;
    setIsAnimating(true);

    const topCard = cards[cards.length - 1];
    setFlyingCardId(topCard.id);

    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const popped = newCards.pop();
        newCards.unshift(popped);
        return newCards;
      });
      setFlyingCardId(null);
    }, 280);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const rotationAngles = [0, -7, 6, -5, 8];

  const experiences = [
    {
      title: 'On-the-job Training IT / Technical Support',
      company: 'Philippine Red Cross - QC Chapter',
      period: 'December 2025 - March 2026',
      description:
        'Minimized workstation downtime for staff, improved internal software stability through QA testing, and enhanced the visual reach of chapter announcements. Troubleshot hardware/network connectivity issues, logged software bugs for the dev team, and designed promotional materials (pubmats).',
    },
    {
      title: 'Full Stack Developer',
      company: 'School Management System III - Capstone.',
      period: '2025 - 2026',
      description:
        "Developed the web application using Laravel Framework, PHP, JSON, Node.js, and RESTful APIs while structuring the centralized database and user access controls.",
    },
    {
      title: 'Full Stack Developer',
      company: 'Barangay Management System - BMS',
      period: '2025 - 2026',
      description:
        'Built mobile-first interfaces using Tailwind CSS and HTML, integrated RESTful APIs, and handled backend workflows with PHP and Node.js.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-14 pb-12" style={{ color: 'var(--text-primary)' }}>
      {/* Top Section: Header & 3D Shuffling Image Stack */}
      <BlurFade delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 text-xs font-normal px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for new opportunities
            </span>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight leading-tight">
              About Me: <br />
            </h1>
            <p className="leading-relaxed text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              As a Web Designer and Developer, I am focused on the synergy between visual storytelling and seamless usability. I specialize in building digital products that are not just beautiful but are robust, responsive, and crafted to deliver exceptional user experiences from end-to-end.
            </p>
          </div>

          {/* Image & Helper Text Container */}
          <div className="flex flex-col items-center w-full max-w-[320px] sm:max-w-sm md:max-w-md mx-auto">
            <div 
              className="w-full h-[320px] sm:h-[360px] md:h-auto md:aspect-square flex items-center justify-center relative overflow-visible select-none"
              style={{ perspective: '1200px' }}
              onClick={handleCardClick}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {cards.map((card, index) => {
                  const isTop = index === cards.length - 1;
                  const isFlying = card.id === flyingCardId;
                  const stackIndex = cards.length - 1 - index;
                  const rotation = rotationAngles[card.id % rotationAngles.length];
                  const xOffset = stackIndex % 2 === 0 ? stackIndex * 4 : stackIndex * -4;

                  return (
                    <motion.div
                      key={card.id}
                      animate={
                        isFlying
                          ? { x: 180, y: -10, z: 100, rotateY: -20, rotateZ: 10, scale: 1.02, opacity: 0.95, zIndex: 999 }
                          : {
                              x: isTop ? 0 : xOffset,
                              y: stackIndex * -3,
                              z: -stackIndex * 20,
                              rotateZ: isTop ? 0 : rotation,
                              rotateY: isTop ? 0 : (stackIndex % 2 === 0 ? 3 : -3),
                              scale: 1 - stackIndex * 0.03,
                              opacity: stackIndex > 4 ? 0 : 1,
                              zIndex: index,
                            }
                      }
                      transition={
                        isFlying
                          ? { duration: 0.28, ease: 'easeOut' }
                          : { type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }
                      }
                      whileHover={isTop && !isAnimating ? { scale: 1.02, z: 20, rotateZ: 1, transition: { duration: 0.2 } } : {}}
                      whileTap={isTop && !isAnimating ? { scale: 0.98 } : {}}
                      className="absolute inset-0 rounded-2xl overflow-hidden border shadow-md"
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-color)',
                        boxShadow: (isTop && !isAnimating) 
                          ? '0 0 0 2px var(--border-color), 0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                          : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <img
                        src={card.img}
                        alt="Profile Shuffle"
                        className="w-full h-full object-cover object-[center_18%] md:object-top pointer-events-none"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isTop ? 'bg-transparent' : 'bg-black/15'}`} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="mt-4 text-xs font-medium tracking-wider uppercase flex items-center gap-2 select-none" style={{ color: 'var(--text-secondary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Click image to shuffle deck
            </p>
          </div>
        </div>
      </BlurFade>

      <hr className="my-12" style={{ borderColor: 'var(--border-color)' }} />

      {/* Middle Section: Education & Stack */}
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal">Education</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              My career is built on a strong foundation in Information Technology (BSIT). This academic background solidified my competencies in modern engineering standards and design thinking, allowing me to transition seamlessly into a production-ready professional.
            </p>
            <div>
              {/* ✅ 2. Pinalitan ang <a> ng <Link> at href ng to */}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 mt-2 border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                View Projects <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal">Stack</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I operate across the full product development lifecycle, utilizing my core stack of (React, Blade, Javascript, PHP and modern CSS frameworks like Tailwind). My technical philosophy prioritizes code performance, accessibility, and modular design. My skills extend from user-centric visual mockups to deploying full-responsive web applications.
            </p>
            <div>
              {/* ✅ 3. Pinalitan ang <a> ng <Link>, at inayos ang typo mula "/stacks" papuntang "/stack" */}
              <Link
                to="/stack"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 mt-2 border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                View Stack <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>

      <hr className="my-12" style={{ borderColor: 'var(--border-color)' }} />

      {/* Bottom Section: Experience */}
      <BlurFade delay={0.3}>
        <div>
          <h2 className="text-3xl font-normal mb-6">Experience / Project Experience</h2>

          <div className="flex flex-col gap-4 mb-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="md:w-1/3 flex items-start gap-3">
                  <div className="p-2 rounded-lg mt-0.5" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-normal text-base">{exp.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{exp.company}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{exp.period}</p>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            {/* ✅ 4. Pinalitan ang <a> ng <Link> */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              Contact Me <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}