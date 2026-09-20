import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

export default function AboutSnippet() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-6 px-4 max-w-2xl mx-auto mt-10 mb-10"
    >
      {/* Headings aligned to the left */}
      <div className="flex flex-col items-start gap-2 mb-6 w-full">
        <h2 
          className="text-3xl sm:text-3xl font-normal tracking-tight text-left"
          style={{ color: 'var(--text-primary)' }}
        >
          Professional Profile
        </h2>
        <p 
          className="text-[10px] sm:text-[13px] font-normal text-left"
          style={{ color: 'var(--text-secondary)' }}
        >
          A Fresh IT Graduate & Full-Stack Web Developer
        </p>
      </div>

      {/* Paragraph content aligned to the left */}
      <div 
        className="flex flex-col gap-4 text-[12px] sm:text-left leading-relaxed mb-8 w-full"
        style={{ color: 'var(--text-secondary)' }}
      >
        <p className="text-justify">
          I am a passionate full-stack web developer and recent Bachelor of Science in Information Technology graduate. I specialize in building robust, user-centric web applications using modern technologies like React, Tailwind CSS, JavaScript, PHP, and Laravel.
        </p>
        <p className="text-justify">
          From architecting capstone platforms like school and community management systems to designing seamless user interfaces, I focus on transforming complex technical requirements into clean, scalable, and high-performance digital solutions.
        </p>
      </div>

      {/* Bottom Actions aligned to the left/start */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 sm:gap-8 w-full">
        <a
          href="/resume/Amiel_Jake_Baril_CV.pdf" 
          download="Amiel_Jake_Baril_Resume.pdf"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--text-primary)', background: 'transparent', border: 'none' }}
        >
          <span>Download CV</span>
          <Download className="w-4 h-4" />
        </a>

        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          More about me <span>&rarr;</span>
        </Link>
      </div>
    </motion.section>
  );
}