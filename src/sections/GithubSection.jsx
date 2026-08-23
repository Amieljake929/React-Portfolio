import BlurFade from '../components/BlurFade';

function GithubSection() {
  return (
    <BlurFade delay={0.1}>
      <section className="py-6 flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            GitHub Contributions
          </h2>
          <a
            href="https://github.com/Amieljake929"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xs font-medium text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/60 shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="group-hover:underline">@Amieljake929</span>
          </a>
        </div>

        <div className="w-full overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-gray-200">
          <div className="min-w-[670px] sm:min-w-0 w-full flex justify-center items-center">
            <img
              src="https://ghchart.rshah.org/216e39/Amieljake929"
              alt="Amiel Jake's GitHub Contributions"
              className="w-full max-w-4xl h-auto object-contain filter contrast-[1.05]"
              onError={(e) => {
                e.target.src = "https://ghchart.rshah.org/Amieljake929";
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto flex items-center justify-between text-[11px] sm:text-xs text-gray-400 pt-2 border-t border-gray-100">
          <span>Live GitHub Activity</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span>Less</span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#ebedf0]"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#9be9a8]"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#40c463]"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#30a14e]"></span>
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs bg-[#216e39]"></span>
            <span>More</span>
          </div>
        </div>
      </section>
    </BlurFade>
  );
}

export default GithubSection;