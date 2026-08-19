export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center items-center px-6 pt-20">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Badge with Glowing Green Dot */}
        <div className="inline-flex items-center gap-2 bg-gray-200/80 border border-gray-300/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for new projects
        </div>

        {/* Main Name Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-2">
          Amiel Jake
        </h1>

        {/* Sub-title / Role */}
        <p className="text-gray-600 font-medium text-base md:text-lg mb-8">
          Web Developer & React Specialist
        </p>

        {/* Minimalist Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="bg-black text-white hover:bg-gray-800 text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-sm"
          >
            Hire Me
          </a>
          <a
            href="#projects"
            className="bg-gray-200/80 hover:bg-gray-300/80 text-gray-900 border border-gray-300/80 text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            My Work
          </a>
        </div>

      </div>
    </section>
  );
}