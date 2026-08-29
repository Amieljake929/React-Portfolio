import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, MousePointerClick } from 'lucide-react';

export default function AboutSnippet() {
  const images = [
    '/images/ako.png', 
    '/images/baguio.jpg',
    '/images/me.jpg', 
  ];

  const [cards, setCards] = useState(() =>
    images.map((img, idx) => ({ id: idx, img }))
  );

  const [flyingCardId, setFlyingCardId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const topCard = cards[cards.length - 1];
    setFlyingCardId(topCard.id);

    // Step 1: Lumipad sa gilid (3D Shuffle Flight)
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const popped = newCards.pop();
        newCards.unshift(popped);
        return newCards;
      });
      setFlyingCardId(null);
    }, 280);

    // Step 2: Clear animation lock
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const rotationAngles = [0, -7, 6, -5, 8];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-2"
    >
      <div className="flex flex-col items-start gap-2 mb-4">
        <User className="w-7 h-7 text-gray-500" strokeWidth={1.5} />
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
          About Me
        </h2>
      </div>

      {/* Main Container: Flex-col-reverse sa mobile (image sa taas), sm:flex-row sa desktop */}
      <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-8 max-w-3xl">
        
        {/* Paragraphs */}
        <div className="flex flex-col gap-3 text-gray-600 text-sm sm:text-base leading-relaxed flex-1">
          <p>
            I am a passionate Web Designer and Developer dedicated to bridging aesthetic design and technical performance. I build clean, user-centric web applications using modern frameworks.
          </p>
          <p>
            With a solid academic background in IT and hands-on experience building full-stack platforms like school and community systems, I turn complex problems into elegant digital solutions.
          </p>
        </div>

        {/* 3D Shuffle Deck Images Container with Note */}
        <div className="shrink-0 self-center sm:self-auto flex flex-col items-center">
          <div className="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center select-none overflow-visible">
            <div
              className="relative w-full h-full flex items-center justify-center overflow-visible"
              style={{ perspective: '1200px' }}
            >
              {cards.map((card, index) => {
                const isTop = index === cards.length - 1;
                const isFlying = card.id === flyingCardId;
                const stackIndex = cards.length - 1 - index;
                const rotation = rotationAngles[card.id % rotationAngles.length];
                const xOffset = stackIndex % 2 === 0 ? stackIndex * 4 : stackIndex * -4;

                return (
                  <motion.div
                    key={card.id}
                    onClick={isTop ? handleCardClick : undefined}
                    animate={
                      isFlying
                        ? {
                            x: 180,
                            y: -10,
                            z: 100,
                            rotateY: -20,
                            rotateZ: 10,
                            scale: 1.02,
                            opacity: 0.95,
                            zIndex: 999,
                          }
                        : {
                            x: isTop ? 0 : xOffset,
                            y: stackIndex * -3,
                            z: -stackIndex * 20,
                            rotateZ: isTop ? 0 : rotation,
                            rotateY: isTop ? 0 : (stackIndex % 2 === 0 ? 3 : -3),
                            scale: 1 - stackIndex * 0.03,
                            opacity: stackIndex > 4 ? 0 : 1,
                            zIndex: index,
                          }
                    }
                    transition={
                      isFlying
                        ? { duration: 0.28, ease: 'easeOut' }
                        : {
                            type: 'spring',
                            stiffness: 220,
                            damping: 24,
                            mass: 0.8,
                          }
                    }
                    whileHover={
                      isTop && !isAnimating
                        ? {
                            scale: 1.02,
                            z: 20,
                            rotateZ: 1,
                            transition: { duration: 0.2 },
                          }
                        : {}
                    }
                    whileTap={isTop && !isAnimating ? { scale: 0.98 } : {}}
                    className={`absolute inset-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white ${
                      isTop && !isAnimating
                        ? 'cursor-pointer ring-1 ring-gray-300'
                        : 'pointer-events-none'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={card.img}
                      alt={`About Photo ${card.id + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        isTop ? 'bg-transparent' : 'bg-black/15'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Note sa baba ng image */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 font-medium select-none">
            <MousePointerClick className="w-3.5 h-3.5 animate-pulse" />
            <span>Click photo to shuffle card</span>
          </div>
        </div>

      </div>

      <div className="mt-4">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          More about me <span>&rarr;</span>
        </Link>
      </div>
    </motion.section>
  );
}