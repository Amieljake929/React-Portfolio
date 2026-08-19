export default function ContactFooterSection() {
  return (
    <section id="contact" className="bg-gray-100 pt-10 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* ================= CONTACT CARD ================= */}
        <div className="bg-gray-200/70 border border-gray-300/40 rounded-3xl p-8 md:p-12 mb-16 text-left">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            I'd love to hear about it. Whether it's a new website, a redesign, or just an idea you're exploring, drop me a message and let's see how I can help bring it to life.
          </p>

          {/* Action Button */}
          <a
            href="mailto:amieljake929@gmail.com"
            className="inline-block w-full text-center bg-black hover:bg-gray-800 text-white font-medium text-sm py-3.5 px-8 rounded-full transition-colors duration-200 shadow-sm"
          >
            Send a Message
          </a>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()}</p>
          <p className="text-gray-500">
            Designed & Built by <span className="text-gray-900 font-medium">Amiel Jake</span>
          </p>
        </footer>

      </div>
    </section>
  );
}