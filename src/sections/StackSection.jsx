import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StackSection() {
  const stackItems = [
    {
      name: 'Framer',
      category: 'Web Design',
      icon: 'https://cdn.simpleicons.org/framer/0055FF',
    },
    {
      name: 'Figma',
      category: 'Collaborative Design',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    },
    {
      name: 'React',
          description: 'Component-based UI development.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'JavaScript',
          description: 'Dynamic frontend functionality.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'ESLint',
          description: 'Pluggable JavaScript linter.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
    },
    {
      name: 'Laravel',
          description: 'Web application PHP framework.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
      id="stack"
      className="py-8 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Title */}
      <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
        Stack
      </motion.h2>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 w-full">
        {stackItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3.5 p-2.5 sm:p-4 bg-[#f8f8f8] hover:bg-[#f1f1f1] border border-transparent hover:border-gray-200 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src={item.icon}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col min-w-0 w-full">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight truncate">
                {item.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5 truncate">
                {item.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button navigating to separate route */}
      <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
        <Link
          to="/stack"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
        >
          All Stack <span>&rarr;</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}