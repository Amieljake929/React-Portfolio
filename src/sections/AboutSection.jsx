import React from 'react';
import BlurFade from '../components/BlurFade';

export default function AboutSection() {
  const experiences = [

    {
      title: 'On-the-job Training IT / Technical Support',
      company: 'Philippine Red Cross - QC Chapter',
      period: 'December 2025 - March 2026',
      description:
        'Minimized workstation downtime for staff, improved internal software stability through QA testing, and enhanced the visual reach of chapter announcements. Troubleshot hardware/network connectivity issues, logged software bugs for the dev team, and designed promotional materials (pubmats).',
    },
    {
      title: 'Full Stack Designer',
      company: 'School Management System III - Capstone.',
      period: '2025 - 2026',
      description:
        "Developed the web application using Laravel Framework, PHP, JSON, Node.js, and RESTful APIs while structuring the centralized database and user access controls.",
    },
    {
      title: 'Full Stack Designer',
      company: 'Barangay Management System - BMS',
      period: '2025 - 2026',
      description:
        'Built mobile-first interfaces using Tailwind CSS and HTML, integrated RESTful APIs, and handled backend workflows with PHP and Node.js.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 text-gray-900">
      {/* Top Section: Header & Image */}
      <BlurFade delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              About Me: <br />
              Code. Design. Repeat.
            </h1>
            <p className="text-gray-500 leading-relaxed text-sm mt-2">
              As a Web Designer and Developer, I am focused on the synergy between visual storytelling and seamless usability. I specialize in building digital products that are not just beautiful but are robust, responsive, and crafted to deliver exceptional user experiences from end-to-end.
            </p>
          </div>

          {/* Tinanggal ang grayscale at pinalitan ang bg-black ng bg-gray-100 */}
          <div className="w-full h-[280px] md:h-[340px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm relative">
            <img
              src="/images/Jakes.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </BlurFade>

      <hr className="border-gray-100 my-12" />

      {/* Middle Section: Education & Stack */}
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              My career is built on the strong educational foundation of a Bachelor’s degree in Web Design and Development. This training solidified my core competencies in modern engineering standards and design thinking, enabling me to transition seamlessly from a studio student to a production-ready professional.
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
            <h2 className="text-2xl font-bold text-gray-900">Stack</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience / Project Experience</h2>

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
                    <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
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