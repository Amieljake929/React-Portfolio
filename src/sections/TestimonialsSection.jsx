import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Daniel Foster',
    role: 'Product Designer',
    content: 'Working with Amiel was smooth overall. The project turned out great, though communication could have been a bit quicker at times.',
    avatar: '/images/Jake.jpg',
  },
  {
    id: 2,
    name: 'Aiden Carter',
    role: 'Creative Director',
    content: 'The design process was incredibly collaborative and efficient. Every idea was carefully considered and translated into visuals that felt both modern and practical. What impressed me most was the balance between creativity and functionality — the end product not only looked polished but also worked seamlessly across all platforms. It felt like the vision was fully understood and brought to life with care and precision.',
    avatar: '/images/Jake.jpg',
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    role: 'Frontend Engineer',
    content: 'Clean code and seamless animations! The portfolio implementation exceeded expectations and the attention to detail is top-notch.',
    avatar: '/images/Jake.jpg',
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const posRef = useRef(0);

  useEffect(() => {
    let animationFrameId;
    const speed = 1.2; // Bilis ng paggalaw

    const step = () => {
      if (!isPaused && !isDragging && trackRef.current) {
        posRef.current -= speed;
        const trackWidth = trackRef.current.scrollWidth / 2;

        // Kapag umabot na sa kalahati, ibalik sa 0 nang walang putol para sa infinite loop
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

  // Mouse / Touch drag handlers para masmooth ang pag-grab at pag-slide pabalik-balik
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
      className="w-full flex flex-col items-start text-left py-2 overflow-hidden"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
        Testimonials
      </h2>

      <div
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing py-2 select-none"
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
          {/* Doblehin ang listahan para sa seamless infinite loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[300px] sm:w-[350px] bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm shrink-0 flex flex-col justify-between h-auto"
            >
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
                "{item.content}"
              </p>

              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500">
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