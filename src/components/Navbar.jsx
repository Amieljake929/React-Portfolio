export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-sm rounded-full px-4 py-2 flex items-center gap-6">
        {/* Home Icon */}
        <a href="#" className="p-1.5 text-gray-700 hover:text-black transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </a>

        {/* X / Twitter Icon */}
        <a href="#" className="p-1.5 text-gray-700 hover:text-black transition-colors text-xs font-bold">
          𝕏
        </a>

        {/* Instagram Icon */}
        <a href="#" className="p-1.5 text-gray-700 hover:text-black transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* Document / Blog Icon */}
        <a href="#" className="p-1.5 text-gray-700 hover:text-black transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </a>

        {/* Book a Call Button */}
        <a
          href="#contact"
          className="bg-black text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Book a Call
        </a>
      </nav>
    </div>
  );
}