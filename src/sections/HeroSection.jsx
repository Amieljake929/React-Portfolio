// src/components/HeroSection.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowRight, FiX, FiUser } from 'react-icons/fi';
import { supabase } from '../supabase';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visitorCount, setVisitorCount] = useState(0);
  const [liveViewers, setLiveViewers] = useState([]);

  // Secure Supabase Unique Visitor Tracking Logic using RPC Function
  useEffect(() => {
    async function trackVisitor() {
      try {
        const hasVisited = localStorage.getItem('has_visited_portfolio');

        // 1. Kunin ang kasalukuyang count mula sa Supabase table 'visitors'
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

          // 2. Kung first-time visitor pa lang, tawagin ang secure SQL function via rpc()
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

  // Supabase Realtime Presence Channel para sa Live Viewers & Avatars
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const currentUserMeta = {
      id: randomId,
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

  // Keyboard shortcut para sa pagpindot ng 'C' o 'c' na magbubukas ng mailto link
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

  const socialLinks = [
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/amieljake/' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Amieljake929' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/amiel-jake-baril-316366412/' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

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
        className="pt-12 pb-8 sm:pt-16 sm:pb-12 my-0 w-full flex flex-col items-start text-left justify-center"
      >
        {/* Top Bar: Avatar, Name/Title, Status, Social Icons */}
        <motion.div 
          variants={itemVariants} 
          className="mb-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center justify-between sm:justify-start gap-3.5 w-full sm:w-auto">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/Jake.jpg"
                alt="Amiel Jake Baril"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm border flex-shrink-0"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div>
                <h1 
                  className="text-xl sm:text-2xl font-normal tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Amiel Jake Baril
                </h1>
                <p 
                  className="text-xs sm:text-sm font-normal"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Web Designer & Developer
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge & Social Links */}
          <div className="hidden sm:flex items-center gap-5">
            <div 
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to opportunities</span>
            </div>

            <div 
              className="flex items-center gap-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Main Headings */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Building Modern Web Application.
          </h2>
          <p 
            className="text-xl sm:text-2xl font-normal tracking-tight"
            style={{ color: 'var(--text-secondary)' }}
          >
            Delivering Clean Code & User-Centric Design.
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base leading-relaxed mb-6 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          I am Amiel Jake Baril, an IT fresh graduate and web designer & developer specializing in full-stack web solutions. Dedicated to building responsive, high-performance digital experiences, I combine modern frontend interfaces with robust backend architectures using React and Laravel to turn creative concepts into functional applications that deliver seamless user interactions.
        </motion.p>

        {/* Get in touch link: Shown only on mobile */}
        <motion.div
          variants={itemVariants}
          className="flex sm:hidden mb-2 w-full"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-normal transition-colors cursor-pointer group bg-transparent border-none p-0"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>Get in touch</span>
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Mobile Gesture Reminder */}
        <motion.div
          variants={itemVariants}
          className="flex sm:hidden flex-col gap-1.5 text-xs mt-10 mb-1 w-full"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>Double-tap anywhere to switch dark/light mode</span>
        </motion.div>

        {/* Email & Theme Prompts / Keyboard Shortcuts: Hidden on mobile, shown on desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden sm:flex flex-col gap-2 text-xs sm:text-sm mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {/* Email Shortcut */}
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

          {/* Theme Shortcuts */}
          <div className="flex items-center gap-3">
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
          </div>
        </motion.div>

        {/* Total Visitors & Live Viewers: Nilagyan ng mt-0 sm:mt-10 para sa desktop lang ang may margin-top, bold na rin ang visitor count */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center flex-wrap gap-2.5 text-xs sm:text-sm font-normal mt-0 sm:mt-6 -mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>Total Visitors: <strong style={{ color: 'var(--text-primary)' }}>{visitorCount}</strong></span>
          
          <span style={{ opacity: 0.4 }}>&bull;</span>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center -space-x-2">
              {displayedViewers.map((_, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full flex items-center justify-center border shadow-2xs text-[10px]"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <FiUser className="w-3 h-3" />
                </div>
              ))}
              {remainingCount > 0 && (
                <div 
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium border shadow-2xs"
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
      </motion.section>

      {/* Modal Dialog (Para sa Mobile "Get in touch" click) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 overflow-hidden text-left border"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)'
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
                style={{ color: 'var(--text-secondary)' }}
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-8">
                <h3 
                  className="text-2xl font-normal tracking-tight mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Let's Connect!
                </h3>
                <p 
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Feel free to reach out with your projects, questions, or to connect. I will respond promptly, and we can explore opportunities together.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h4 
                    className="text-base font-normal mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Get in Touch
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)',
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)',
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Write a message..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all resize-none"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)',
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-medium text-sm rounded-xl transition-all shadow-sm cursor-pointer mt-1"
                  style={{ 
                    backgroundColor: '#111827',
                    color: '#ffffff'
                  }}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}