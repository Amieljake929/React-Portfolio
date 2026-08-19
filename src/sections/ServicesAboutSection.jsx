import { useState } from "react";

export default function ServicesAboutSection() {
  // Sample list ng services
  const services = [
    "Website Design",
    "Web Development (React)",
    "Website Redesign",
    "Landing Page Design",
    "Website Maintenance"
  ];

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-20">
        
        {/* ================= SERVICES PART ================= */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            Services
          </h2>

          <div className="flex flex-col gap-3">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-200/70 hover:bg-gray-200 border border-gray-300/40 rounded-2xl px-6 py-4 flex justify-between items-center transition-colors cursor-pointer"
              >
                <span className="text-gray-900 font-medium text-base">
                  {service}
                </span>
                <span className="text-xl text-gray-800 font-light">+</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ABOUT PART ================= */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            About
          </h2>

          <div className="flex flex-col items-start gap-6">
            {/* Profile Image (Placeholder box kung wala pang photo) */}
            <div className="w-28 h-32 bg-gray-300 rounded-2xl overflow-hidden flex items-center justify-center text-gray-500 text-xs">
              [Your Photo]
            </div>

            {/* Bio Text */}
            <p className="text-gray-800 text-base md:text-lg leading-relaxed max-w-2xl">
              I'm Amiel Jake, a passionate Web Developer with experience in building fast, beautiful, and responsive websites for personal and business projects. I blend clean UI design with modern code to turn ideas into functional digital experiences.
            </p>

            {/* Social Links (Simple icons/links katulad sa reference) */}
            <div className="flex items-center gap-5 text-gray-600 font-medium text-sm pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
              <a href="mailto:your-email@gmail.com" className="hover:text-gray-900 transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}