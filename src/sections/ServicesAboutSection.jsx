import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoGalleryMarquee from "../components/PhotoGalleryMarquee";

export default function ServicesAboutSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    { title: "Website Design", desc: "Creating modern, responsive, and user-centric UI designs using Figma and Tailwind." },
    { title: "Web Development (React)", desc: "Building fast, scalable, and dynamic single-page web applications with React." },
    { title: "Website Redesign", desc: "Upgrading legacy or outdated websites to modern design and performance standards." },
    { title: "Landing Page Design", desc: "Designing high-converting landing pages tailored for campaigns and products." },
    { title: "Website Maintenance", desc: "Fixing bugs, updating content, and keeping website performance smooth and secure." }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-20">
        
        {/* SERVICES */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">Services</h2>

          <div className="flex flex-col gap-3">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  onClick={() => toggleAccordion(index)}
                  className="bg-gray-200/70 hover:bg-gray-200/90 border border-gray-300/40 rounded-2xl px-6 py-4 transition-all cursor-pointer select-none"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium text-base">
                      {service.title}
                    </span>
                    <motion.span 
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xl text-gray-800 font-light inline-block"
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Expandable Text */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 text-sm mt-3 pt-3 border-t border-gray-300/60 leading-relaxed">
                          {service.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ABOUT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-medium text-gray-900 mb-6">About</h2>
          <div className="flex flex-col items-start gap-6">
            <div className="w-28 h-32 bg-gray-300 rounded-2xl overflow-hidden flex items-center justify-center text-gray-500 text-xs">
              <PhotoGalleryMarquee />
            </div>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed max-w-2xl">
              I'm Amiel Jake, a passionate Web Developer with experience in building fast, beautiful, and responsive websites. I blend clean UI design with modern code to turn ideas into functional digital experiences.
            </p>
            <div className="flex items-center gap-5 text-gray-600 font-medium text-sm pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a>
              <a href="mailto:amieljake929@gmail.com" className="hover:text-gray-900 transition-colors">Email</a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}