import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutSnippet() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-2"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-3">
        About Me
      </h2>

      {/* Small Image / Avatar preview like the reference image */}
      <motion.div className="mb-4">
        <img
          src="/images/baguio.jpg"
          alt="Amiel Jake Baril"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm border border-gray-200"
        />
      </motion.div>

      {/* Paragraphs with max-w to keep text narrower and not stretch too far to the right */}
      <div className="flex flex-col gap-3 text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
        <p>
          I am a passionate Web Designer and Developer dedicated to bridging aesthetic design and technical performance. I build clean, user-centric web applications using modern frameworks.
        </p>
        <p>
          With a solid academic background in IT and hands-on experience building full-stack platforms like school and community systems, I turn complex problems into elegant digital solutions.
        </p>
      </div>

      <div className="mt-4">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          More about me <span>&rarr;</span>
        </Link>
      </div>
    </motion.section>
  );
}