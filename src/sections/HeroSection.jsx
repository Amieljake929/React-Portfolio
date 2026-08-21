export default function HeroSection() {
  return (
    <section id="home" className="pt-4 pb-12">
      {/* Availability Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Available for Work
      </div>

      {/* Main Title */}
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
        Hey there!<br />
        I'm Patrick...
      </h1>

      {/* Description */}
      <p className="text-gray-500 max-w-md text-base leading-relaxed mb-8">
        I'm a passionate web designer dedicated to crafting visually stunning and user-friendly websites.
      </p>

      {/* CTA Button */}
      <a
        href="#about"
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
      >
        More about Me <span>&rarr;</span>
      </a>
    </section>
  );
}