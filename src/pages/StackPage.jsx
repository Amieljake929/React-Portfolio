import { motion } from 'framer-motion';

export default function StackPage() {
  const fullStackCategories = [
    {
      category: 'Design & Prototyping',
      items: [
        {
          name: 'Framer',
          description: 'Interactive web design & prototyping.',
          icon: 'https://cdn.simpleicons.org/framer/0055FF',
        },
        {
          name: 'Figma',
          description: 'Collaborative UI/UX vector design.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        },
      ],
    },
    {
      category: 'Frontend Development',
      items: [
        {
          name: 'HTML 5',
          description: 'Semantic markup & web standard.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        {
          name: 'CSS 3',
          description: 'Modern styling & responsive layouts.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        },
        {
          name: 'JavaScript',
          description: 'Dynamic frontend functionality.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'TypeScript',
          description: 'Strongly typed JavaScript subset.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
        {
          name: 'React',
          description: 'Component-based UI development.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
          name: 'Vite',
          description: 'Next-generation frontend tooling.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
        },
        {
          name: 'Tailwind CSS',
          description: 'Utility-first rapid styling framework.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        },
        {
          name: 'ESLint',
          description: 'Pluggable JavaScript linter.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
        },
      ],
    },
    {
      category: 'Backend & Database',
      items: [
        {
          name: 'Node.js',
          description: 'Server-side JavaScript runtime.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        {
          name: 'Laravel',
          description: 'Web application PHP framework.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
        },
        {
          name: 'Python',
          description: 'High-level programming language.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        },
        {
          name: 'MySQL',
          description: 'Relational database management system.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        },
        {
          name: 'REST API',
          description: 'Architectural style for web services.',
          icon: 'https://cdn.simpleicons.org/fastapi/009688',
        },
      ],
    },
    {
      category: 'AI & Machine Learning',
      items: [
        {
          name: 'OpenAI',
          description: 'AI research & LLM deployment.',
          icon: 'https://api.iconify.design/logos:openai-icon.svg',
        },
        {
          name: 'Hugging Face',
          description: 'ML models & dataset hub.',
          icon: 'https://api.iconify.design/logos:hugging-face-icon.svg',
        },
        {
          name: 'Claude Code',
          description: 'Anthropic AI development assistant.',
          icon: 'https://api.iconify.design/logos:claude-icon.svg',
        },
      ],
    },
    {
      category: 'Productivity, Deployment & Tools',
      items: [
        {
          name: 'Git',
          description: 'Version control system.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        },
        {
          name: 'GitHub',
          description: 'Code hosting & collaboration.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        },
        {
          name: 'VS Code',
          description: 'Primary code editor.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        },
        {
          name: 'Vercel',
          description: 'Frontend deployment platform.',
          icon: 'https://cdn.simpleicons.org/vercel/000000',
        },
        {
          name: 'Notion',
          description: 'Workspace & project docs.',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
        },
        {
          name: 'ChatGPT',
          description: 'AI-assisted code optimization.',
          icon: 'https://api.iconify.design/logos:openai-icon.svg',
        },
        {
          name: 'Discord',
          description: 'Community & team communication.',
          icon: 'https://api.iconify.design/logos:discord-icon.svg',
        },
        {
          name: 'Microsoft Teams',
          description: 'Business messaging & collaboration.',
          icon: 'https://api.iconify.design/logos:microsoft-teams.svg',
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
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
    <motion.div
      className="py-6 sm:py-10 lg:py-16 px-3 sm:px-0 w-full max-w-4xl mx-auto flex flex-col items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 sm:mb-10 lg:mb-14 text-left max-w-xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
          Tech Stack & Tools
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-2 lg:mt-3 leading-relaxed">
          A full overview of the tools, technologies, and software used in building modern web applications.
        </p>
      </motion.div>

      {/* Categorized Sections */}
      <div className="flex flex-col gap-8 lg:gap-12 w-full">
        {fullStackCategories.map((group, groupIdx) => (
          <motion.div key={groupIdx} variants={itemVariants} className="flex flex-col items-start gap-3 lg:gap-4 w-full">
            <h2 className="text-xs sm:text-sm font-bold text-gray-400 tracking-wider uppercase border-b border-gray-100 pb-1.5 lg:pb-2.5 w-full text-left">
              {group.category}
            </h2>

            {/* Grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 lg:gap-5 w-full">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex flex-row items-center text-left gap-1.5 sm:gap-3 lg:gap-3.5 p-1.5 sm:p-3 lg:p-4 bg-[#f8f8f8] hover:bg-[#f1f1f1] border border-transparent hover:border-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300"
                >
                  {/* Icon Container */}
                  <div className="w-5 h-5 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-white rounded flex items-center justify-center p-0.5 sm:p-1.5 shadow-sm border border-gray-100 shrink-0">
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Compact Text Details */}
                  <div className="flex flex-col min-w-0 w-full">
                    <h3 className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[8.5px] sm:text-[11px] lg:text-xs text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}