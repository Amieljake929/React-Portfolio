import { useState, useEffect } from 'react';
import BlurFade from '../components/BlurFade';

function GithubSection() {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchGitHubContributions();
  }, []);

  const fetchGitHubContributions = async () => {
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              totalCommitContributions
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                    weekday
                  }
                }
                months {
                  name
                  firstDay
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN || ''}`
        },
        body: JSON.stringify({
          query,
          variables: { login: 'Amieljake929' }
        })
      });

      const data = await response.json();
      
      if (data.data) {
        const calendar = data.data.user.contributionsCollection.contributionCalendar;
        setContributions(calendar.weeks);
        setTotalContributions(calendar.totalContributions);
      } else {
        fetchPublicContributions();
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
      fetchPublicContributions();
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicContributions = async () => {
    try {
      const response = await fetch('https://github-contributions-api.jogruber.de/v4/Amieljake929');
      const data = await response.json();
      if (data && data.years) {
        const currentYear = new Date().getFullYear();
        const yearData = data.years[currentYear] || Object.values(data.years)[0];
        setTotalContributions(yearData?.total || 0);
        if (yearData?.contributions) {
          const weeks = transformToWeeks(yearData.contributions);
          setContributions(weeks);
        }
      }
    } catch (error) {
      console.error('Error with fallback:', error);
    }
  };

  const transformToWeeks = (contributions) => {
    const weeks = [];
    let currentWeek = [];
    
    Object.entries(contributions).forEach(([date, count]) => {
      const dayOfWeek = new Date(date).getDay();
      currentWeek.push({
        date,
        contributionCount: count,
        contributionLevel: getContributionLevel(count),
        weekday: dayOfWeek
      });
      
      if (currentWeek.length === 7) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: '',
          contributionCount: 0,
          contributionLevel: 'NONE',
          weekday: 0
        });
      }
      weeks.push({ contributionDays: currentWeek });
    }
    
    return weeks;
  };

  const getContributionLevel = (count) => {
    if (count === 0) return 'NONE';
    if (count <= 3) return 'FIRST_QUARTILE';
    if (count <= 6) return 'SECOND_QUARTILE';
    if (count <= 9) return 'THIRD_QUARTILE';
    return 'FOURTH_QUARTILE';
  };

  const getMonthLabels = () => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };

  const handleMouseEnter = (day, event) => {
    if (!day.date) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.closest('.contribution-wrapper').getBoundingClientRect();
    
    setTooltipPos({
      top: rect.top - containerRect.top - 40,
      left: rect.left - containerRect.left + (rect.width / 2)
    });
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  if (loading) {
    return (
      <BlurFade delay={0.1}>
        <section className="py-6 flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2 px-1">
            <div className="animate-pulse h-7 w-7 rounded bg-gray-700"></div>
            <div className="flex flex-col gap-1">
              <div className="animate-pulse h-6 w-32 bg-gray-700 rounded"></div>
              <div className="animate-pulse h-4 w-48 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse h-48 bg-gray-800 rounded-lg"></div>
        </section>
      </BlurFade>
    );
  }

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

        {/* Main Container */}
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

          {/* GitHub Graph Wrapper (Hosts Tooltip securely relative to card box) */}
          <div 
            className="contribution-wrapper rounded-md p-4 relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Custom Thinner Horizontal Green Scrollbar Styles */}
            <style>{`
              .contribution-scroll-area::-webkit-scrollbar {
                height: 5px;
              }
              .contribution-scroll-area::-webkit-scrollbar-track {
                background: var(--bg-primary);
                border-radius: 3px;
              }
              .contribution-scroll-area::-webkit-scrollbar-thumb {
                background: #22c55e;
                border-radius: 3px;
              }
              .contribution-scroll-area::-webkit-scrollbar-thumb:hover {
                background: #16a34a;
              }
            `}</style>

            {/* Scrollable Calendar Area Only */}
            <div className="contribution-scroll-area overflow-x-auto overflow-y-hidden pb-3">
              <div className="min-w-[650px]">
                {/* Month Labels */}
                <div className="flex mb-2 ml-7">
                  {getMonthLabels().map((month, index) => (
                    <div 
                      key={index} 
                      className="flex-1 text-[10px] font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {month}
                    </div>
                  ))}
                </div>

                {/* Contribution Grid */}
                <div className="flex gap-[3px]">
                  {/* Day Labels - Monday to Sunday Alignment */}
                  <div className="flex flex-col gap-[3px] justify-between text-[10px] pr-2 select-none" style={{ color: 'var(--text-secondary)', height: '100%' }}>
                    <span className="h-[10px] leading-[10px]">Mon</span>
                    <span className="h-[10px] leading-[10px]"></span>
                    <span className="h-[10px] leading-[10px]">Wed</span>
                    <span className="h-[10px] leading-[10px]"></span>
                    <span className="h-[10px] leading-[10px]">Fri</span>
                    <span className="h-[10px] leading-[10px]"></span>
                    <span className="h-[10px] leading-[10px]"></span>
                  </div>

                  {/* Squares Grid */}
                  <div className="flex gap-[3px] flex-1">
                    {contributions.slice(0, 52).map((week, weekIndex) => {
                      let days = [...week.contributionDays];
                      if (days.length === 7) {
                        const sunday = days.shift();
                        days.push(sunday);
                      }
                      return (
                        <div key={weekIndex} className="flex flex-col gap-[3px] flex-1">
                          {days.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className="w-full aspect-square rounded-[3px] transition-all duration-150 hover:ring-1 hover:ring-emerald-400/50 cursor-pointer relative"
                              style={{
                                backgroundColor: `var(--gh-${day.contributionLevel === 'NONE' ? '0' : day.contributionLevel === 'FIRST_QUARTILE' ? '1' : day.contributionLevel === 'SECOND_QUARTILE' ? '2' : day.contributionLevel === 'THIRD_QUARTILE' ? '3' : '4'})`
                              }}
                              onMouseEnter={(e) => handleMouseEnter(day, e)}
                              onMouseLeave={handleMouseLeave}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Steady Non-Scrolling Footer Row (Total Contributions & Legend) */}
            <div className="mt-3 pt-3 flex items-center justify-between text-xs font-medium border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <div>
                <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>
                  {totalContributions}
                </span>
                {' '}contributions in the last year
              </div>

              <div className="flex items-center gap-1.5 text-[10px]">
                <span>Less</span>
                <div className="flex gap-[3px]">
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: 'var(--gh-0)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: 'var(--gh-1)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: 'var(--gh-2)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: 'var(--gh-3)' }}></span>
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: 'var(--gh-4)' }}></span>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Tooltip Popup */}
            {hoveredDay && hoveredDay.date && (
              <div
                className="absolute pointer-events-none z-50 px-2.5 py-1 text-[10px] font-medium rounded-md shadow-lg whitespace-nowrap"
                style={{
                  top: `${Math.max(0, tooltipPos.top)}px`,
                  left: `${Math.max(10, Math.min(tooltipPos.left - 40, 600))}px`,
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <strong>{hoveredDay.contributionCount}</strong> contributions on {hoveredDay.date}
              </div>
            )}
          </div>

        </div>
      </section>
    </BlurFade>
  );
}

export default GithubSection;