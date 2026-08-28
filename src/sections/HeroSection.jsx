import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function HeroSection() {
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
      {/* Profile Avatar */}
      <motion.div variants={itemVariants} className="mb-5">
        <img
          src="/images/Jake.jpg"
          alt="Amiel Jake Baril"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm border border-gray-200"
        />
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