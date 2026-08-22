import React from 'react';
import BlurFade from '../components/BlurFade'; // Siguraduhing naka-import ito

export default function ContactSection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 text-gray-900 font-sans">
      
      {/* Wrapper para sa transition */}
      <BlurFade delay={0.1}>
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            May tanong ka ba o gustong makipag-collaborate? Mag-iwan ng mensahe gamit ang form sa ibaba!
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Juan Dela Cruz"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="juan@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Isulat dito ang iyong mensahe..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Send Message <span>&rarr;</span>
            </button>
          </form>
        </div>

      </BlurFade>
    </div>
  );
}