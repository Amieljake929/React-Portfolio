import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ThreeDCarousel({ images = [] }) {
  const [cards, setCards] = useState(() =>
    images.map((img, idx) => ({ id: idx, img }))
  );

  const [flyingCardId, setFlyingCardId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!images || images.length === 0) return null;

  const handleCardClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const topCard = cards[cards.length - 1];
    setFlyingCardId(topCard.id);

    // Step 1: Lumipad sa gilid (3D Shuffle Flight)
    setTimeout(() => {
      // Step 2: I-pop at i-unshift papunta sa ilalim ng stack
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const popped = newCards.pop();
        newCards.unshift(popped);
        return newCards;
      });
      setFlyingCardId(null);
    }, 280);

    // Step 3: Clear animation lock
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Preset Alternating Angles para litaw na litaw ang sulok sa kaliwa't kanan sa likod
  const rotationAngles = [0, -7, 6, -5, 8, -6, 5, -8, 4, -3];

  return (
    <div className="relative w-full py-10 flex flex-col items-center justify-center select-none overflow-visible">
      {/* Container with 3D Perspective */}
      <div
        className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center overflow-visible"
        style={{ perspective: '1200px' }}
      >
        {cards.map((card, index) => {
          const isTop = index === cards.length - 1;
          const isFlying = card.id === flyingCardId;
          const stackIndex = cards.length - 1 - index; // 0 = Top, 1 = direct behind, 2...
          const rotation = rotationAngles[card.id % rotationAngles.length];

          // Mas pinalabas ang offset para makita ang cards sa likod
          const xOffset = stackIndex % 2 === 0 ? stackIndex * 6 : stackIndex * -6;

          return (
            <motion.div
              key={card.id}
              onClick={isTop ? handleCardClick : undefined}
              animate={
                isFlying
                  ? {
                      // Lumipad sa kanan sa 3D space
                      x: 230,
                      y: -15,
                      z: 140,
                      rotateY: -20,
                      rotateZ: 10,
                      scale: 1.02,
                      opacity: 0.95,
                      zIndex: 999,
                    }
                  : {
                      // Normal Stacked Layout - Kita ang cards sa likod
                      x: isTop ? 0 : xOffset,
                      y: stackIndex * -4,
                      z: -stackIndex * 30,
                      rotateZ: isTop ? 0 : rotation,
                      rotateY: isTop ? 0 : (stackIndex % 2 === 0 ? 3 : -3),
                      scale: 1 - stackIndex * 0.025, // Bahagyang pagliit para sa depth effect
                      opacity: stackIndex > 6 ? 0 : 1, // Malinaw pa rin kahit sa malalim na layer
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
                      z: 25,
                      rotateZ: 1,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              whileTap={isTop && !isAnimating ? { scale: 0.98 } : {}}
              className={`absolute inset-0 rounded-2xl overflow-hidden border border-gray-700/60 shadow-2xl bg-gray-900 ${
                isTop && !isAnimating
                  ? 'cursor-pointer ring-1 ring-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
                  : 'pointer-events-none shadow-lg'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src={card.img}
                alt={`Project Slide ${card.id + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Minimal darkening sa cards na nasa likod para magka-contrast at hindi matakpan ang detalye */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                  isTop ? 'bg-transparent' : 'bg-black/20'
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Helper text */}
      <p className="mt-8 text-xs font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
        Click upper card to shuffle deck
      </p>
    </div>
  );
}