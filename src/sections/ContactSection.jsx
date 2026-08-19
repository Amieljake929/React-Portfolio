export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-900 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Get In <span className="text-indigo-500">Touch</span>
          </h2>
          <p className="text-gray-400">
            May tanong ka ba o gustong makipag-collaborate? Mag-iwan ng mensahe!
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Pangalan</label>
            <input 
              type="text" 
              placeholder="Juan Dela Cruz"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="juan@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mensahe</label>
            <textarea 
              rows="4" 
              placeholder="Isulat dito ang iyong mensahe..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-indigo-600/25"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}