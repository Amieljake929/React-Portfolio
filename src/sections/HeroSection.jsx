import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center px-6 pt-20">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-gray-200/80 border border-gray-300/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for new projects
        </motion.div>

        {/* Animated Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-2"
        >
          Amiel Jake
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-gray-600 font-medium text-base md:text-lg mb-8"
        >
          Web Developer & React Specialist
        </motion.p>

        {/* Animated Action Buttons with Hover Effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full transition-shadow duration-200 shadow-sm hover:shadow-md"
          >
            Hire Me
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="bg-gray-200/80 text-gray-900 border border-gray-300/80 text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            My Work
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}