import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

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
          Degrees and credentials in the specialized field of Information Technology.
        </p>
      </div>

      {/* Education Item Container */}
      <div className="w-full flex flex-col pb-6 border-b border-t border-[var(--border-color,rgba(0,0,0,0.1))]">
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
              className="text-xs sm:text-sm text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              Bachelor's degree • Information Technology (BSIT)
            </p>
            <p 
              className="text-xs sm:text-sm text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              Major in Information Management
            </p>
          </div>

          {/* Right: Date (Container removed, aligned to right on all screens) */}
          <div 
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          >
        
            <span className="whitespace-nowrap">2022 - 2026</span>
          </div>

        </div>
      </div>
    </motion.section>
  );
}