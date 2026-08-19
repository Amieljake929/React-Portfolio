export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100/80 backdrop-blur-md z-50 py-6 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Name / Logo */}
        <a href="#" className="text-xl font-bold text-gray-900 tracking-tight">
          Amiel J.
        </a>

        {/* Menu Icon (Hamburger) */}
        <button 
          aria-label="Open Menu" 
          className="text-gray-900 focus:outline-none p-1 hover:opacity-75 transition-opacity"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 8h16M4 16h16" 
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}