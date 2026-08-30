import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Christian Irish Bacay',
    role: 'Web Designer & Developer',
    content: 'Working with Amiel was smooth overall. The project turned out great, though communication could have been a bit quicker at times.',
    avatar: '/images/Ian.png',
  },
  {
    id: 2,
    name: 'Jean Marc Aguilar',
    role: 'Full Stack Web Developer',
    content: 'The design process was incredibly collaborative and efficient. Every idea was carefully considered and translated into visuals that felt both modern and practical. What impressed me most was the balance between creativity and functionality — the end product not only looked polished but also worked seamlessly across all platforms. It felt like the vision was fully understood and brought to life with care and precision.',
    avatar: '/images/Jm.png',
  },
  {
    id: 3,
    name: 'Joel Fuentes',
    role: 'PRCQC (DMS) - Supervisor',
    content: 'Having Amiel Jake Baril as an OJT with us at the Philippine Red Cross - Quezon City Chapter has been an absolute privilege. Aside from showcasing his creativity by designing our daily Facebook pubmats and event graphics, Amiel also excelled in troubleshooting hardware and software issues, ensuring our workstations ran smoothly. His technical competence, reliability, and strong work ethic make him an invaluable asset to any team.',
    avatar: '/images/Joel.png',
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const posRef = useRef(0);

  useEffect(() => {
    let animationFrameId;
    const speed = 1.2;

    const step = () => {
      if (!isPaused && !isDragging && trackRef.current) {
        posRef.current -= speed;
        const trackWidth = trackRef.current.scrollWidth / 2;

        if (Math.abs(posRef.current) >= trackWidth) {
          posRef.current = 0;
        }

        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.pageX - posRef.current;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startXRef.current;
    posRef.current = walk;

    const trackWidth = trackRef.current.scrollWidth / 2;
    if (posRef.current > 0) {
      posRef.current = -trackWidth;
    } else if (Math.abs(posRef.current) >= trackWidth) {
      posRef.current = 0;
    }

    trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-6 overflow-hidden"
    >
      {/* Heading na may Icon */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <MessageSquareQuote 
          className="w-7 h-7" 
          strokeWidth={1.5} 
          style={{ color: 'var(--text-secondary)' }}
        />
        <h2 
          className="text-xl sm:text-2xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Testimonials
        </h2>
      </div>

      {/* Container na may Mask Fade Effect sa kaliwa at kanang gilid */}
      <div
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing py-2 select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={containerRef}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max items-start"
          style={{ willChange: 'transform' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[300px] sm:w-[350px] border rounded-2xl p-5 shadow-2xs shrink-0 flex flex-col justify-between h-auto transition-colors duration-300"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)'
              }}
            >
              <p 
                className="text-xs sm:text-sm leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                "{item.content}"
              </p>

              <div className="flex items-center gap-3 mt-auto pt-2">
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden border shrink-0"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div>
                  <h4 
                    className="text-xs sm:text-sm font-normal"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.name}
                  </h4>
                  <p 
                    className="text-[11px] sm:text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}