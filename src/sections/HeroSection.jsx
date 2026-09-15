// src/sections/HeroSection.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { supabase } from '../supabase';

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [liveViewers, setLiveViewers] = useState([]);

  // Secure Supabase Unique Visitor Tracking Logic using RPC Function
  useEffect(() => {
    async function trackVisitor() {
      try {
        const hasVisited = localStorage.getItem('has_visited_portfolio');

        const { data, error } = await supabase
          .from('visitors')
          .select('count')
          .eq('id', 1);

        if (error) {
          console.error('Error fetching visitor count:', error.message);
          return;
        }

        if (data && data.length > 0) {
          const currentCount = data[0].count;
          setVisitorCount(currentCount);

          if (!hasVisited) {
            const { error: rpcError } = await supabase.rpc('increment_visitor_count');

            if (!rpcError) {
              setVisitorCount(currentCount + 1);
              localStorage.setItem('has_visited_portfolio', 'true');
            } else {
              console.error('Error incrementing visitor count via RPC:', rpcError.message);
            }
          }
        }
      } catch (err) {
        console.error('Unexpected error tracking visitor:', err);
      }
    }

    trackVisitor();
  }, []);

  // Supabase Realtime Presence Channel para sa Live Viewers & Dicebear Avatars
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomId}`;
    
    const currentUserMeta = {
      id: randomId,
      avatar: avatarUrl,
      online_at: new Date().toISOString(),
    };

    const room = supabase.channel('portfolio-live-viewers', {
      config: {
        presence: {
          key: randomId,
        },
      },
    });

    room
      .on('presence', { event: 'sync' }, () => {
        const state = room.presenceState();
        const viewersList = [];
        Object.keys(state).forEach((key) => {
          const presences = state[key];
          if (presences && presences.length > 0) {
            viewersList.push(presences[0]);
          }
        });
        setLiveViewers(viewersList);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await room.track(currentUserMeta);
        }
      });

    return () => {
      supabase.removeChannel(room);
    };
  }, []);

  // Keyboard shortcuts para sa 'C' (Email)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        window.location.href = 'mailto:amieljake929@gmail.com';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  // Text-only social links list
  const mobileSocials = [
    { name: 'Instagram', href: 'https://www.instagram.com/amieljake/' },
    { name: 'GitHub', href: 'https://github.com/Amieljake929' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/amiel-jake-baril-316366412/' },
  ];

  const statsItems = [
    {
      number: "06+",
      label: "Full-Stack Projects",
      href: "#projects",
      external: false,
    },
    {
      number: "10+",
      label: "Core Technologies",
      href: "#stack",
      external: false,
    },
    {
      number: "270+",
      label: "Github Contributions",
      href: "https://github.com/Amieljake929",
      external: true,
    },
    {
      number: "03",
      label: "Seminars attended",
      href: "#seminars",
      external: false,
    },
  ];

  const totalLive = liveViewers.length > 0 ? liveViewers.length : 1;
  const maxDisplayedAvatars = 3;
  const displayedViewers = liveViewers.slice(0, maxDisplayedAvatars);
  const remainingCount = totalLive - displayedViewers.length;

  return (
    <>
      <motion.section
        id="home"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 pb-8 sm:pt-16 sm:pb-12 my-0 w-full flex flex-col items-start text-left justify-center"
      >
        {/* Main Hero Container: Image on Left, Content Block on Right (Desktop) */}
        <motion.div 
          variants={itemVariants} 
          className="mb-6 w-full flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
        >
          {/* Left Column: Image */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-start flex-shrink-0">
            <img
              src="/images/amiel-gradpic.png"
              alt="Amiel Jake Baril"
              className="w-92 h-92 sm:w-77 sm:h-77 object-cover"
            />
          </div>

          {/* Right Column: Name, Title, Description, and Socials */}
          <div className="text-left w-full flex flex-col justify-start">
            <h1 
              className="text-4xl sm:text-4xl font-normal tracking-tight whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}
            >
              Amiel Jake Baril
            </h1>
            <p 
              className="text-1x1 sm:text-1x1 font-normal mt-0.5 sm:mt-0 sm:mb-3 mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Web Designer & Developer
            </p>

            {/* Description (Justified) */}
            <p
              className="text-2x1 sm:text-[13px] leading-relaxed sm:mb-4 mb-10 text-justify sm:text-justify"
              style={{ color: 'var(--text-secondary)' }}
            >
              I am a fresh IT graduate with a solid foundation in full-stack web development. I build modern, responsive interfaces using React, Tailwind CSS, and JavaScript, and power my backends with Laravel, PHP, and XAMPP. Eager to bring my hands-on experience in building AI-integrated web applications to a dynamic software team.
            </p>

            {/* Text-only social links with arrows */}
            <div className="flex items-center gap-4 flex-wrap w-full mb-8 sm:mb-0">
              {mobileSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-normal transition-colors group"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span>{social.name}</span>
                  <FiArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats: Cleaned up borders on desktop */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-full sm:max-w-3xl grid grid-cols-2 sm:flex sm:flex-row items-center sm:border-t border-t border-b mt-2 sm:my-2 py-0"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {statsItems.map((stat, index) => {
            const isLast = index === statsItems.length - 1;
            const mobileBorderClasses = 
              index === 0 ? "border-r border-b pt-11 pb-9 pr-3" :
              index === 1 ? "border-b pt-11 pb-9 pl-3" :
              index === 2 ? "border-r pt-11 pb-9 pr-3" : "pt-11 pb-9 pl-3";

            return (
              <a
                key={stat.label}
                href={stat.href}
                target={stat.external ? "_blank" : "_self"}
                rel={stat.external ? "noopener noreferrer" : undefined}
                className={`flex flex-col justify-center my-0 ${mobileBorderClasses} sm:border-b-0 sm:py-6 sm:px-6 ${!isLast ? 'sm:border-r' : 'sm:border-r-0 sm:pr-0'} ${index === 0 ? 'sm:pl-0' : ''} flex-1 min-w-0 h-auto sm:h-24 group transition-colors cursor-pointer text-decoration-none text-left`}
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center justify-start gap-1.5 w-full">
                  <span className="text-2xl sm:text-2xl font-normal tracking-tight truncate leading-none" style={{ color: 'var(--text-primary)' }}>
                    {stat.number}
                  </span>
                  <FiArrowUpRight 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                    style={{ color: 'var(--text-primary)' }}
                  />
                </div>
                <span className="text-[10px] sm:text-sm mt-1.5 truncate text-left" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </span>
              </a>
            );
          })}
        </motion.div>

        {/* Total Visitors & Live Viewers */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center justify-start flex-wrap gap-2.5 text-xs sm:text-sm font-normal mt-20 sm:mt-10 mb-2 text-left"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>Total Visitors: <strong style={{ color: 'var(--text-primary)' }}>{visitorCount}</strong></span>
          
          <span style={{ opacity: 0.4 }}>&bull;</span>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center -space-x-2">
              {displayedViewers.map((viewer, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full flex items-center justify-center border shadow-2xs overflow-hidden relative"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <img
                    src={viewer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${viewer.id || index}`}
                    alt="Live viewer avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {remainingCount > 0 && (
                <div 
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium border shadow-2xs flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  +{remainingCount}
                </div>
              )}
            </div>
            <span><strong style={{ color: 'var(--text-primary)' }}>{totalLive}</strong> people viewing now</span>
          </div>
        </motion.div>

        {/* Ask Anything Text Button for Mobile view */}
        <motion.div
          variants={itemVariants}
          className="flex sm:hidden mt-3 mb-1 w-full justify-start"
        >
          <button
            onClick={() => {
              window.dispatchEvent(new Event('open-ask-modal'));
            }}
            className="inline-flex items-center gap-2 text-xs font-normal transition-colors cursor-pointer group bg-transparent border-none p-0 text-left"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>Ask anything</span>
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <motion.div
          variants={itemVariants}
          className="hidden sm:flex flex-col gap-2 text-xs sm:text-sm -mb-7 mt-4 sm:mt-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div className="flex items-center gap-1.5">
            <span>Press</span>
            <kbd 
              className="px-2 py-0.5 text-xs font-semibold rounded-md shadow-2xs"
              style={{ 
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                border: '1px solid'
              }}
            >
              C
            </kbd>
            <span>anytime to send me an email</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span>Press</span>
              <kbd 
                className="px-2 py-0.5 text-xs font-semibold rounded-md shadow-2xs"
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  border: '1px solid'
                }}
              >
                D
              </kbd>
              <span>for dark mode</span>
            </div>
            <span style={{ opacity: 0.4 }}>&bull;</span>
            <div className="flex items-center gap-1.5">
              <kbd 
                className="px-2 py-0.5 text-xs font-semibold rounded-md shadow-2xs"
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  border: '1px solid'
                }}
              >
                L
              </kbd>
              <span>for light mode</span>
            </div>
            <span style={{ opacity: 0.4 }}>&bull;</span>
            <div className="flex items-center gap-1.5">
              <kbd 
                className="px-2 py-0.5 text-xs font-semibold rounded-md shadow-2xs"
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  border: '1px solid'
                }}
              >
                A
              </kbd>
              <span>to ask anything</span>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}