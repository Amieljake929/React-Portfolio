export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="text-xl font-bold text-white tracking-wide">
          My<span className="text-indigo-500">Portfolio</span>
        </a>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm text-gray-300 font-medium">
          <a href="#about" className="hover:text-indigo-400 transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-indigo-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-indigo-400 transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}