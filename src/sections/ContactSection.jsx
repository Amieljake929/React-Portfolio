import React from 'react';
import BlurFade from '../components/BlurFade';

export default function ContactSection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 text-gray-900 font-sans">
      <BlurFade delay={0.1}>
        <div className="flex flex-col gap-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-start gap-4 max-w-2xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for Work
            </div>

            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-gray-900">
              Let's Connect!
            </h1>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Feel free to reach out with your projects, questions, or to connect. I'll respond promptly, and we can explore opportunities together.
            </p>
          </div>

          <hr className="border-gray-100 my-2" />

          {/* Main Content Grid: Form (Left) & Info Sidebar (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h2 className="text-lg font-normal text-gray-900">Get in Touch</h2>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#f8f8f8] border border-transparent focus:border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-[#f8f8f8] border border-transparent focus:border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all"
                  />
                </div>

                <textarea
                  rows={8}
                  placeholder="Write a message..."
                  className="w-full bg-[#f8f8f8] border border-transparent focus:border-gray-300 rounded-2xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-[#18181b] hover:bg-black text-white text-sm font-medium py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column - Contact & Social Links */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Contact Group */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-normal text-gray-900">Contact</h2>
                <div className="flex flex-col gap-3 text-sm text-gray-600">
                  <a href="mailto:amieljake929@gmail.com" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    amieljake929@gmail.com
                  </a>
                  <a className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0985-814-6011
                  </a>
                </div>
              </div>

              {/* Social Group */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-normal text-gray-900">Social</h2>
                <div className="flex flex-col gap-3 text-sm text-gray-600">
                  <a href="https://x.com/amieljake11" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter)
                  </a>
                  <a href="https://www.facebook.com/amieljakee" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/amieljake/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.8" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="1.8" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/amiel-jake-baril-316366412/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/Amieljake929" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </BlurFade>
    </div>
  );
}