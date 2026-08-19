import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    { id: 1, title: "Livvy", imageColor: "bg-[#1a1a1a]" },
    { id: 2, title: "Orbit", imageColor: "bg-[#121216]" }
  ];

  return (
    <section id="projects" className="bg-gray-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
            Selected Work
          </h2>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4 transition-colors">
            view more
          </a>
        </div>

        {/* Projects Stack with Scroll Reveal */}
        <div className="flex flex-col gap-12">
          {projects.map((proj) => (
            <motion.a 
              href="#" 
              key={proj.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group block cursor-pointer"
            >
              {/* Image Container with Smooth Scale */}
              <div className={`w-full aspect-[16/9] md:aspect-[16/8] ${proj.imageColor} rounded-2xl md:rounded-3xl overflow-hidden mb-4 relative transition-all duration-500 group-hover:shadow-xl`}>
                <motion.div 
                  className="w-full h-full flex items-center justify-center text-white/10 font-bold text-4xl tracking-widest uppercase"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  {proj.title}
                </motion.div>
              </div>

              {/* Title & Animated Arrow */}
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-medium text-gray-900">
                  {proj.title}
                </h3>
                
                <svg 
                  className="w-5 h-5 text-gray-900 transform transition-transform duration-300 group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}