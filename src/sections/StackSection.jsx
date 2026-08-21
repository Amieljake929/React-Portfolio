import { motion } from 'framer-motion';

export default function StackSection() {
  const stackItems = [
    {
      name: 'Framer',
      category: 'Web Design',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg',
    },
    {
      name: 'Figma',
      category: 'Collaborative Design',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    },
    {
      name: 'Notion',
      category: 'Project Management',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
    },
    {
      name: 'Chat GPT',
      category: 'Content Generation',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    },
    {
      name: 'HTML 5',
      category: 'Structure and Content',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'CSS 3',
      category: 'Visual Styling',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
  ];

  // Container Variant for Stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="stack"
      className="py-8 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8">
        Stack
      </motion.h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stackItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-4 p-4 bg-[#f8f8f8] hover:bg-[#f1f1f1] border border-transparent hover:border-gray-200 rounded-2xl transition-all duration-300 cursor-pointer group"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2.5 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
              <img
                src={item.icon}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {item.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div variants={itemVariants} className="mt-8">
        <a
          href="#stack"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
        >
          All Stack <span>&rarr;</span>
        </a>
      </motion.div>
    </motion.section>
  );
}