import BlurFade from '../components/BlurFade';

function GithubSection() {
  return (
    <BlurFade delay={0.1}>
      <section className="py-6 flex flex-col gap-3 w-full">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-2 px-1">
          <svg 
            className="w-7 h-7" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ color: 'var(--text-secondary)' }}
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <div className="flex flex-col gap-0.5">
            <h2 
              className="text-xl sm:text-2xl font-normal tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Contributions
            </h2>
            <p 
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Live GitHub contributions & activity timeline for @Amieljake929
            </p>
          </div>
        </div>

        {/* Main Container - GitHub Card Style */}
        <div 
          className="rounded-lg p-5 sm:p-6 transition-all duration-300 flex flex-col gap-5 w-full"
          style={{ 
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          
          {/* Header with Visit Profile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Contribution Activity
              </span>
            </div>
            <a
              href="https://github.com/Amieljake929"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200"
              style={{ 
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Visit Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          {/* GitHub Graph Container */}
          <div 
            className="rounded-md p-4 overflow-x-auto"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div className="min-w-[650px]">
              <img
                src="https://ghchart.rshah.org/39d353/Amieljake929"
                alt="GitHub Contributions"
                className="w-full h-auto"
                style={{
                  filter: 'contrast(1.15) saturate(1.1)',
                }}
              />
            </div>
          </div>

          {/* Footer Legend */}
          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Learn how we count contributions
            </a>
            
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--gh-0)' }}></span>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--gh-1)' }}></span>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--gh-2)' }}></span>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--gh-3)' }}></span>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--gh-4)' }}></span>
              </div>
              <span>More</span>
            </div>
          </div>

        </div>
      </section>
    </BlurFade>
  );
}

export default GithubSection;