import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BlurFade from '../components/BlurFade';

export default function AboutSection() {
  const [images, setImages] = useState([
    '/me/unnamed6.jpg',
    '/me/unnamed5.jpg',
    '/me/unnamed2.jpg',
    '/me/unnamed3.jpg',
    '/images/Jake.jpg',
    '/images/about-me.jpg',
    // Maaari kang magdagdag pa ng iba pang images dito para sa stack shuffling
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

  const rotationAngles = [0, -5, 4, -6, 5];

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
    <div className="w-full max-w-5xl mx-auto px-6 pt-14 pb-12 text-gray-900">
      {/* Top Section: Header & 3D Shuffling Image Stack */}
      <BlurFade delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-normal px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open for new opportunities
            </span>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-gray-900 leading-tight">
              About Me: <br />
            </h1>
            <p className="text-gray-500 leading-relaxed text-sm mt-2">
              As a Web Designer and Developer, I am focused on the synergy between visual storytelling and seamless usability. I specialize in building digital products that are not just beautiful but are robust, responsive, and crafted to deliver exceptional user experiences from end-to-end.
            </p>
          </div>

          {/* Image & Helper Text Container */}
          <div className="flex flex-col items-center w-full max-w-[320px] sm:max-w-sm md:max-w-md mx-auto">
            {/* Shuffling 3D Image Stack Container - Fixed proportional height for mobile, square/balanced for desktop */}
            <div 
              className="w-full h-[320px] sm:h-[360px] md:h-auto md:aspect-square flex items-center justify-center relative overflow-visible select-none cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={handleCardClick}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {cards.map((card, index) => {
                  const isTop = index === cards.length - 1;
                  const isFlying = card.id === flyingCardId;
                  const stackIndex = cards.length - 1 - index;
                  const rotation = rotationAngles[card.id % rotationAngles.length];
                  const xOffset = stackIndex % 2 === 0 ? stackIndex * 6 : stackIndex * -6;

                  return (
                    <motion.div
                      key={card.id}
                      animate={
                        isFlying
                          ? {
                              x: 180,
                              y: -15,
                              z: 140,
                              rotateY: -20,
                              rotateZ: 10,
                              scale: 1.02,
                              opacity: 0.95,
                              zIndex: 999,
                            }
                          : {
                              x: isTop ? 0 : xOffset,
                              y: stackIndex * -4,
                              z: -stackIndex * 30,
                              rotateZ: isTop ? 0 : rotation,
                              rotateY: isTop ? 0 : (stackIndex % 2 === 0 ? 3 : -3),
                              scale: 1 - stackIndex * 0.025,
                              opacity: stackIndex > 4 ? 0 : 1,
                              zIndex: index,
                            }
                      }
                      transition={
                        isFlying
                          ? { duration: 0.28, ease: 'easeOut' }
                          : {
                              type: 'spring',
                              stiffness: 220,
                              damping: 24,
                              mass: 0.8,
                            }
                      }
                      whileHover={
                        isTop && !isAnimating
                          ? {
                              scale: 1.02,
                              z: 25,
                              rotateZ: 1,
                              transition: { duration: 0.2 },
                            }
                          : {}
                      }
                      whileTap={isTop && !isAnimating ? { scale: 0.98 } : {}}
                      className={`absolute inset-0 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/60 shadow-sm ${
                        isTop && !isAnimating ? 'cursor-pointer ring-1 ring-gray-900/10 shadow-lg' : 'pointer-events-none'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <img
                        src={card.img}
                        alt="Profile Shuffle"
                        className="w-full h-full object-cover object-[center_18%] md:object-top pointer-events-none"
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                          isTop ? 'bg-transparent' : 'bg-black/10'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Helper text below image */}
            <p className="mt-4 text-xs font-medium text-gray-400 tracking-wider uppercase flex items-center gap-2 select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-emerald-500 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              Click image to shuffle deck
            </p>
          </div>
        </div>
      </BlurFade>

      <hr className="border-gray-100 my-12" />

      {/* Middle Section: Education & Stack */}
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-gray-900">Education</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              My career is built on a strong foundation in Information Technology (BSIT). This academic background solidified my competencies in modern engineering standards and design thinking, allowing me to transition seamlessly into a production-ready professional.
            </p>
            <div>
              <a
                href="#/projects"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 mt-2"
              >
                View Projects <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-gray-900">Stack</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              I operate across the full product development lifecycle, utilizing my core stack of (React, Blade, Javascript, PHP and modern CSS frameworks like Tailwind). My technical philosophy prioritizes code performance, accessibility, and modular design. My skills extend from user-centric visual mockups to deploying full-responsive web applications.
            </p>
            <div>
              <a
                href="#/stack"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 mt-2"
              >
                View Stack <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </BlurFade>

      <hr className="border-gray-100 my-12" />

      {/* Bottom Section: Experience */}
      <BlurFade delay={0.3}>
        <div>
          <h2 className="text-3xl font-normal text-gray-900 mb-6">Experience / Project Experience</h2>

          <div className="flex flex-col gap-4 mb-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-50/80 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="md:w-1/3 flex items-start gap-3">
                  <div className="p-2 bg-gray-200/50 rounded-lg text-gray-600 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-normal text-gray-900 text-base">{exp.title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{exp.company}</p>
                    <p className="text-gray-400 text-xs">{exp.period}</p>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Contact Me <span>&rarr;</span>
            </a>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}