// src/sections/HeroSection.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiPhoneCall } from 'react-icons/fi';
import { supabase } from '../supabase';

export default function HeroSection() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [liveViewers, setLiveViewers] = useState([]);
  
  // State para sa pag-switch ng hero image
  const [currentImage, setCurrentImage] = useState('/images/hero-image.jpg');

  // State para sa pag-switch ng title text (kada 2 segundo)
  const titles = ['Web Designer & Developer', 'Full Stack Developer'];
  const [titleIndex, setTitleIndex] = useState(0);

  // Auto-switch image kada 5 segundo
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => 
        prev === '/images/hero-image.jpg' ? '/images/hero-image2.png' : '/images/hero-image.jpg'
      );
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  // Auto-switch title text kada 2 segundo na may scroll-up effect
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => clearInterval(titleInterval);
  }, []);

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
        className="pt-15 pb-8 sm:pt-12 sm:pb-12 my-0 w-full flex flex-col items-start text-left justify-center relative"
      >
        {/* Top Profile Header Row with Availability Badge */}
        <motion.div 
          variants={itemVariants} 
          className="mb-8 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            {/* Circular Profile Image with Auto-Switch, Hover & Click */}
            <div 
              className="w-35 h-35 sm:w-35 sm:h-35 rounded-full overflow-hidden flex-shrink-0 border cursor-pointer select-none relative" 
              style={{ borderColor: 'var(--border-color)' }}
              onMouseEnter={() => setCurrentImage('/images/hero-image2.png')}
              onMouseLeave={() => setCurrentImage('/images/hero-image.jpg')}
              onClick={() => {
                setCurrentImage((prev) => 
                  prev === '/images/hero-image.jpg' ? '/images/hero-image2.png' : '/images/hero-image.jpg'
                );
              }}
              title="Click or hover to toggle image"
            >
              {/* Unang Larawan (hero-image.jpg) */}
              <img
                src="/images/hero-image.jpg"
                alt="1000011"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
                  currentImage === '/images/hero-image.jpg' ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Pangalawang Larawan (hero-image2.png) */}
              <img
                src="/images/hero-image2.png"
                alt="1000011"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
                  currentImage === '/images/hero-image2.png' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            
            {/* Name & Title with Scroll-Up Animation */}
            <div>
              <h1 
                className="text-[25px] sm:text-4xl font-normal tracking-tight m-0"
                style={{ color: 'var(--text-primary)' }}
              >
                Amiel Jake Baril
              </h1>
              
              {/* Scroll-up container para sa subtitle */}
              <div className="h-6 sm:h-7 overflow-hidden relative mt-0.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={titleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="text-[13px] sm:text-[15px] font-normal m-0 absolute left-0 top-0"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {titles[titleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Main Hero Headline & Description */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl mb-8">
          <p
            className="text-sm sm:text-base leading-relaxed text-justify sm:text-left mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            I am a fresh IT graduate with a solid foundation in full-stack web development. I build modern, responsive interfaces using React, Tailwind CSS, and JavaScript, and power backends with Laravel, PHP, and XAMPP. Eager to bring my hands-on experience in building AI-integrated web applications to a dynamic software team.
          </p>

          {/* Text-only Social Links */}
          <div className="flex items-center gap-4 flex-wrap w-full mt-6">
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
              index === 0 ? "border-r border-b pt-8 pb-7 pr-3" :
              index === 1 ? "border-b pt-8 pb-7 pl-3" :
              index === 2 ? "border-r pt-8 pb-7 pr-3" : "pt-8 pb-7 pl-3";

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
                  <span className="text-xl sm:text-2xl font-normal tracking-tight truncate leading-none" style={{ color: 'var(--text-primary)' }}>
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


        {/* Ask Anything Text Button for Mobile view */}
        <motion.div
          variants={itemVariants}
          className="flex sm:hidden mt-10 mb-1 w-full justify-start"
        >
          <button
            onClick={() => {
              window.dispatchEvent(new Event('open-ask-modal'));
            }}
            className="inline-flex items-center gap-2 text-[12px] font-normal transition-colors cursor-pointer group bg-transparent border-none p-0 text-left"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>Ask anything</span>
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Total Visitors & Live Viewers */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center justify-start flex-wrap gap-2.5 text-xs sm:text-sm font-normal mt-8 sm:mt-10 mb-2 text-left"
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