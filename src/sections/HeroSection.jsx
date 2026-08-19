import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-white text-gray-900 pt-32 pb-16 px-8 sm:px-12 border-b border-gray-100 flex justify-center">
      {/* Centered Box para sa eksaktong balance sa gitna ng grid lines */}
      <div className="w-full max-w-xl flex flex-col items-start text-left">
        
        {/* Circle Profile Avatar */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-6 bg-gray-200 border border-gray-200 shadow-sm"
        >
          <img
            src="public/images/Jake.jpg" 
            alt="Amiel Jake"
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>

        {/* Main Title Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-3"
        >
          Hey, I'm Amiel Jake. <br />
          Developer & Designer
        </motion.h1>

        {/* Bio Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 font-normal text-xs sm:text-sm leading-relaxed max-w-md mb-6"
        >
          Crafting seamless experiences and bold visuals. Web developer by day, creative thinker, and aspiring innovator building modern web applications.
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Black Primary Button */}
          <a
            href="#projects"
            className="bg-[#18181b] text-white hover:bg-black text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-sm active:scale-95"
          >
            Get this Template
          </a>

          {/* Light Green Available Badge */}
          <div className="bg-[#e2f7e2] border border-[#d2f3d2] text-[#1b7a2b] text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
            Available for new project
          </div>
        </motion.div>

      </div>
    </section>
  );
}