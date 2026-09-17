import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Christian Irish Bacay',
    role: 'Web Designer & Developer',
    content:
      'Working with Amiel was smooth overall. The project turned out great, though communication could have been a bit quicker at times.',
    avatar: '/images/Ian.png',
    stats: [
      { value: 'Smooth', label: 'Collaboration' },
      { value: 'Great', label: 'Final Result' },
    ],
  },
  {
    id: 2,
    name: 'Jean Marc Aguilar',
    role: 'Full Stack Web Developer',
    content:
      'The design process was incredibly collaborative and efficient. Every idea was carefully considered and translated into visuals that felt both modern and practical. What impressed me most was the balance between creativity and functionality — the end product not only looked polished but also worked seamlessly across all platforms. It felt like the vision was fully understood and brought to life with care and precision.',
    avatar: '/images/Jm.jpg',
    stats: [
      { value: '2x', label: 'Better Workflow' },
      { value: '100%', label: 'Collaborative' },
    ],
  },
  {
    id: 3,
    name: 'Joel Fuentes',
    role: 'PRCQC (DMS) - Supervisor',
    content:
      'Having Amiel Jake Baril as an OJT with us at the Philippine Red Cross - Quezon City Chapter has been an absolute privilege. Aside from showcasing his creativity by designing our daily Facebook pubmats and event graphics, Amiel also excelled in troubleshooting hardware and software issues, ensuring our workstations ran smoothly. His technical competence, reliability, and strong work ethic make him an invaluable asset to any team.',
    avatar: '/images/Joel.png',
    stats: [
      { value: 'Reliable', label: 'Work Ethic' },
      { value: 'Strong', label: 'Technical Skills' },
    ],
  },
  {
    id: 4,
    name: 'John Kenneth Cardinal',
    role: 'Co-Developer (Capstone Project)',
    content:
      'Working alongside Amiel on our capstone thesis project was an exceptional experience. His problem-solving abilities, clean coding practices, and dedication to meeting our milestones made a huge difference. Whenever we hit a roadblock, he was always ready to brainstorm and debug until we found the best solution. A truly reliable teammate and developer!',
    avatar: '/images/Cardinal.png',
    stats: [
      { value: 'Seamless', label: 'Integration' },
      { value: 'Top-Tier', label: 'Teamwork' },
    ],
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = TESTIMONIALS.length;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const previousTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getRelativePosition = (index) => {
    let difference = index - activeIndex;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="w-full py-6 sm:py-8"
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2
          className="text-xl sm:text-2xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Testimonials
        </h2>

        <p
          className="text-xs sm:text-sm mt-1.5 max-w-md leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          A few words from people I have worked with.
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        className="relative w-full px-4 sm:px-12 overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="
            relative
            w-full
            h-[405px]
            sm:h-[430px]
            flex
            items-center
            justify-center
          "
        >
          {TESTIMONIALS.map((item, index) => {
            const position = getRelativePosition(index);

            if (Math.abs(position) > 1) {
              return null;
            }

            const isActive = position === 0;

            let x = 0;
            let y = 0;
            let rotate = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 20;

            if (position === -1) {
              x = -170;
              y = 12;
              rotate = -5;
              scale = 0.88;
              opacity = 0.5;
              zIndex = 10;
            }

            if (position === 1) {
              x = 170;
              y = 12;
              rotate = 5;
              scale = 0.88;
              opacity = 0.5;
              zIndex = 10;
            }

            return (
              <motion.article
                key={item.id}
                animate={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.32,
                  ease: 'easeOut',
                }}
                onClick={() => setActiveIndex(index)}
                style={{
                  zIndex,
                  backgroundColor: isActive
                    ? 'var(--bg-primary)'
                    : 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: isActive
                    ? '0 8px 24px rgba(0,0,0,0.05)'
                    : '0 4px 14px rgba(0,0,0,0.025)',
                  willChange: 'transform, opacity',
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[275px]
                  sm:w-[340px]
                  h-[365px]
                  sm:h-[390px]
                  rounded-[18px]
                  p-5
                  sm:p-6
                  flex
                  flex-col
                  overflow-hidden
                  cursor-pointer
                "
              >
                {/* CARD HEADER */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-mono text-[8px] tracking-[0.22em]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(total).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-[0.15em]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Review
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-hidden">
                  <p
                    className="text-[12px] sm:text-[13px] leading-[1.7]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.content}
                  </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                  {item.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="rounded-lg px-3 py-2.5"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div
                        className="text-sm sm:text-base font-normal"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-[8px] sm:text-[9px] mt-0.5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* DIVIDER */}
                <div
                  className="w-full h-px mb-4"
                  style={{ backgroundColor: 'var(--border-color)' }}
                />

                {/* PERSON */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable="false"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="text-[11px] sm:text-xs font-normal truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.name}
                      </h4>
                      <p
                        className="text-[9px] sm:text-[10px] mt-0.5 truncate"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[1px] shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="text-[9px] sm:text-[10px]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={previousTestimonial}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-opacity hover:opacity-60"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-primary)',
            }}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Pagination */}
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className="transition-all duration-200"
                style={{
                  width: activeIndex === index ? '18px' : '5px',
                  height: '4px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--text-primary)',
                  opacity: activeIndex === index ? 1 : 0.25,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextTestimonial}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-opacity hover:opacity-60"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-primary)',
            }}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </motion.section>
  );
}