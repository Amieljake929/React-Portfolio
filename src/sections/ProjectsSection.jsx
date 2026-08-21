import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      category: 'WEB DESIGN',
      title: 'Reelio - Photography & Film Studio Framer Template',
      image: '/projects/project1.png',
    },
    {
      id: 2,
      category: 'WEB DESIGN',
      title: 'Vitalo - Personal Training & Coaching Framer Template',
      image: '/projects/project2.png',
    },
    {
      id: 3,
      category: 'WEB DESIGN',
      title: 'Artikle - Membership Framer Template',
      image: '/projects/project3.png',
    },
  ];

  // Container Variant for Stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Blur Fade-in Item Variant
  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.section
      id="projects"
      className="py-8 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8">
        Recent Projects
      </motion.h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="group cursor-pointer flex flex-col w-full"
          >
            {/* Floating Laptop Container */}
            <div className="w-full aspect-[4/3] flex items-center justify-center p-2 mb-4 relative">
              {/* Laptop Wrapper with 3D Elevation & Shadows */}
              <div className="w-full relative z-10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 flex flex-col items-center">
                {/* Laptop Top / Screen Bezel */}
                <div className="w-full bg-[#0a0a0b] border-[2.5px] border-[#38383a] rounded-t-xl p-[3px] relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-shadow duration-500">
                  {/* Laptop Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#0a0a0b] border-b border-x border-[#2b2b2e] rounded-b-md z-30 flex justify-center items-center">
                    <div className="w-1 h-1 rounded-full bg-[#111] border border-gray-700"></div>
                  </div>

                  {/* Laptop Screen Content */}
                  <div className="w-full aspect-[16/10] bg-black rounded-t-md overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20 pointer-events-none"></div>

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Laptop Bottom Lid / Stand */}
                <div className="w-[105%] h-2.5 bg-gradient-to-r from-[#2c2c2e] via-[#4a4a4d] to-[#2c2c2e] rounded-b-md relative shadow-md flex justify-center border-t border-gray-700/50">
                  <div className="w-10 h-1 bg-[#1a1a1c] rounded-b-sm border-t border-gray-600"></div>
                </div>

                {/* Contact Shadow */}
                <div className="w-[92%] h-4 bg-black/40 rounded-[100%] blur-md mt-1 transition-all duration-500 group-hover:w-[98%] group-hover:bg-black/50 group-hover:blur-lg group-hover:mt-2"></div>
              </div>
            </div>

            {/* Category Tag */}
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1">
              {project.category}
            </span>

            {/* Title */}
            <div className="overflow-hidden whitespace-nowrap w-full">
              <h3 className="text-sm font-semibold text-gray-900 transition-all duration-300 inline-block group-hover:animate-marquee">
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div variants={itemVariants} className="mt-8">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
        >
          All Projects <span>&rarr;</span>
        </a>
      </motion.div>
    </motion.section>
  );
}