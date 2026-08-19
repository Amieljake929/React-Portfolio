export default function MarqueeBanner() {
  const items = [
    "WEB DEVELOPMENT",
    "REACT.JS",
    "TAILWIND CSS",
    "UI/UX DESIGN",
    "RESPONSIVE DESIGN",
    "CLEAN CODE",
  ];

  return (
    <div className="bg-black text-white py-4 overflow-hidden select-none border-y border-gray-800">
      <div className="animate-marquee flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
        {/* Unang set ng text */}
        {items.map((item, index) => (
          <div key={`a-${index}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-gray-600">•</span>
          </div>
        ))}
        {/* Duplicate set para sa seamless looping */}
        {items.map((item, index) => (
          <div key={`b-${index}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-gray-600">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}