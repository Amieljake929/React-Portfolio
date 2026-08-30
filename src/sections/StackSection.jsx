import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export default function StackSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAllColored, setIsAllColored] = useState(false);

  const allStacks = [
    // Design & Prototyping
    { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    // Frontend
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'ESLint', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg' },
    // Backend & Database
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'REST API', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
    // AI & Tools
    { name: 'OpenAI', icon: 'https://api.iconify.design/logos:openai-icon.svg' },
    { name: 'Hugging Face', icon: 'https://api.iconify.design/logos:hugging-face-icon.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
  ];

  const handleBadgeClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.section
      id="stack"
      className="py-6 w-full flex flex-col items-start text-left"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Header Container: Heading sa kaliwa, Clean iPhone Switch sa kanan */}
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-start gap-2">
          <Cpu 
            className="w-7 h-7" 
            strokeWidth={1.5} 
            style={{ color: 'var(--text-secondary)' }}
          />
          <h2 
            className="text-xl sm:text-2xl font-normal tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Stack
          </h2>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-2">
          <span 
            className="text-xs font-medium tracking-tight select-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            Color All
          </span>
          <button
            onClick={() => setIsAllColored(!isAllColored)}
            className="w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer"
            style={{ 
              backgroundColor: isAllColored ? '#34C759' : 'var(--bg-secondary)' 
            }}
            aria-label="Toggle Color All"
          >
            <motion.div
              className="w-5 h-5 rounded-full shadow-md"
              style={{ backgroundColor: 'var(--bg-primary)' }}
              animate={{ x: isAllColored ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          </button>
        </div>
      </motion.div>

      {/* Pill/Badge Grid Container */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 w-full">
        {allStacks.map((item, index) => {
          const isSelected = activeIndex === index || isAllColored;

          return (
            <motion.div
              key={index}
              onClick={() => handleBadgeClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full transition-all duration-200 cursor-pointer shadow-2xs group select-none"
              style={{
                backgroundColor: isSelected ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                borderColor: isSelected ? 'var(--text-secondary)' : 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--text-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }
              }}
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isSelected
                      ? 'grayscale-0 opacity-100 scale-110'
                      : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100'
                  }`}
                />
              </div>
              <span className="text-xs font-medium tracking-tight">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Button navigating to separate route */}
      <motion.div variants={itemVariants} className="mt-6">
        <Link
          to="/stack"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          All Stack <span>&rarr;</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}