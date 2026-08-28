import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function HeroSection() {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const notes = [
    "Hello! Welcome to my portfolio 👋",
    "Building clean web apps 💻",
    "Passionate UI/UX designer ✨",
    "Let's build something cool! 🚀",
    "Open for opportunities 🤝"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % notes.length);
    }, 5000); // Ginawa ko nang eksaktong 5 seconds (5000ms)
    return () => clearInterval(interval);
  }, [notes.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/amieljakee' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/amieljake/' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Amieljake929' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/amiel-jake-baril-316366412/' },
  ];

  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-12 pb-8 sm:pt-16 sm:pb-12 my-0 w-full flex flex-col items-start text-left justify-center"
    >
      {/* Profile Avatar + Chat Bubble Container */}
      <motion.div variants={itemVariants} className="mb-5 flex items-center gap-3">
        <img
          src="/images/Jake.jpg"
          alt="Amiel Jake Baril"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm border border-gray-200 flex-shrink-0"
        />

        {/* Chat Bubble Wrapper with Pop-in / Pop-out transition */}
        <div className="relative -translate-y-2 max-w-[110px] sm:max-w-[100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNoteIndex}
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl px-2.5 py-1.5 text-gray-700 text-[9px] sm:text-[8px] font-medium leading-tight relative text-center"
            >
              {/* Bubble Tail slanted downwards to point at the avatar */}
              <div className="absolute -left-1.5 top-[65%] -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-r-[6px] border-r-white border-b-[4px] border-b-transparent drop-shadow-[-1px_0_0px_rgba(0,0,0,0.05)] z-10" />
              
              <p>{notes[currentNoteIndex]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Name and Subtitle */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-1">
          Amiel Jake Baril
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-normal">
          Web Designer & Developer
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg"
      >
        I'm a frontend and full-stack web developer specializing in digital design, interactive user interfaces, and clean web experiences. I help build functional, clear, and memorable applications that stand out and scale.
      </motion.p>

      {/* Social Media Links */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-start gap-5 text-gray-700"
      >
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <IconComponent size={20} />
            </motion.a>
          );
        })}
      </motion.div>
    </motion.section>
  );
}