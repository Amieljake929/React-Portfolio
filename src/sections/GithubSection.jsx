import BlurFade from '../components/BlurFade';

function GithubSection() {
  return (
    <BlurFade delay={0.1}>
      <section className="py-6 flex flex-col gap-3 w-full">
        
        {/* GitHub Icon sa labas ng container sa itaas */}
        <div className="flex flex-col items-start gap-2 px-1">
          <svg className="w-7 h-7 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
              Contributions
            </h2>
            <p className="text-xs text-gray-500">
              Live GitHub contributions & activity timeline for @Amieljake929
            </p>
          </div>
        </div>

        {/* Pangunahing Container */}
        <div className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 w-full">
          
          {/* Top action row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Activity Overview</span>
            <a
              href="https://github.com/Amieljake929"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/80 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Visit Profile</span>
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

          {/* Footer sa loob ng container: Learn how we count + Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-gray-500">
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors underline underline-offset-2"
            >
              Learn how we count contributions
            </a>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#ebedf0]"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#9be9a8]"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#40c463]"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#30a14e]"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-[#216e39]"></span>
              <span>More</span>
            </div>
          </div>

        </div>
      </section>
    </BlurFade>
  );
}

export default GithubSection;