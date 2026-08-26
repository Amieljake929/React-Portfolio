import BlurFade from '../components/BlurFade';

function GithubSection() {
  return (
    <BlurFade delay={0.1}>
      <section className="py-6 flex flex-col gap-4 w-full">
        <div className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 w-full">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <div className="flex flex-col gap-0.5">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                  @Amieljake929
                </h2>
                <p className="text-xs text-gray-500">
                  Live GitHub contributions & activity timeline
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Amieljake929"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/80 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Visit Profile</span>
              {/* Inline External Link SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          {/* Contribution Graph Container */}
          <div className="w-full bg-gray-50/80 border border-gray-100 rounded-xl p-4 overflow-x-auto pb-3 pt-3 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="min-w-[670px] sm:min-w-0 w-full flex justify-center items-center">
              <img
                src="https://ghchart.rshah.org/216e39/Amieljake929"
                alt="Amiel Jake's GitHub Contributions"
                className="w-full max-w-4xl h-auto object-contain filter contrast-[1.05] rounded-lg"
                onError={(e) => {
                  e.target.src = "https://ghchart.rshah.org/Amieljake929";
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </BlurFade>
  );
}

export default GithubSection;