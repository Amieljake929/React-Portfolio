export default function HeroSection() {
  return (
    <section className="min-h-screen pt-24 flex items-center justify-center bg-gray-950 text-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting Badge */}
        <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 inline-block mb-4">
          Welcome to my portfolio
        </span>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Hi, I'm <span className="text-indigo-500">Your Name</span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Aspiring Web Developer passionate about building interactive, clean, 
          and responsive web applications using React and JavaScript.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center gap-4">
          <a 
            href="#projects" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/30"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}