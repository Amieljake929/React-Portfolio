import React from 'react';
import { motion } from 'framer-motion';

export default function EducationSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-6 px-4 max-w-2xl mx-auto mt-10 mb-10"
    >
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-8 w-full">
        <h2 
          className="text-2xl sm:text-3xl font-normal tracking-tight text-left"
          style={{ color: 'var(--text-primary)' }}
        >
          Education
        </h2>
        <p 
          className="text-[10px] sm:text-[13px] font-normal text-left"
          style={{ color: 'var(--text-secondary)' }}
        >
          Bachelor of Science in Information Technology (BSIT)
        </p>
      </div>

      {/* Education Item Container */}
      <div className="w-full flex flex-col pb-6 border-t border-[var(--border-color,rgba(0,0,0,0.1))]">
        <div className="flex flex-row items-start justify-between gap-4 w-full">
          
          {/* Left: School, Degree & Major Info */}
          <div className="flex flex-col items-start gap-1 max-w-md">
            <h3 
              className="text-lg font-medium tracking-tight text-left mt-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Bestlink College of the Philippines
            </h3>
            <p 
              className="text-xs sm:text-sm text-left italic"
              style={{ color: 'var(--text-secondary)' }}
            >
              Bachelor of Science in Information Technology (BSIT)
            </p>
            <p 
              className="text-xs sm:text-sm text-left italic"
              style={{ color: 'var(--text-secondary)' }}
            >
              Major in Information Management
            </p>
          </div>

          {/* Right: Date */}
          <div 
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="whitespace-nowrap italic">2022 - 2026</span>
          </div>

        </div>

        {/* Bullet Points Section */}
        <ul className="mt-4 pl-6 list-disc list-outside flex flex-col gap-2 text-xs sm:text-sm text-left" style={{ color: 'var(--text-secondary)' }}>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Capstone Projects:</strong> Developed a School Management System and a Barangay Management System (Full-Stack Developer).
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Relevant Coursework:</strong> Web Systems and Technologies (Frontend/Backend), System Analysis and Design, Data Structure and Algorithms, Application Programming Interfaces (API).
          </li>
        </ul>
      </div>
      
    </motion.section>
  );
}