import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    id: 1,
    question: 'Do you take on freelance projects?',
    answer: "Yes, I'm available for freelance and collaboration opportunities.",
  },
  {
    id: 2,
    question: 'How can I get in touch with you?',
    answer: 'You can reach out through the contact form on this website or send me a direct email via my social links.',
  },
  {
    id: 3,
    question: 'Do you work with international clients?',
    answer: 'Yes, I collaborate with clients worldwide remotely across different time zones.',
  },
  {
    id: 4,
    question: "What's your usual project timeline?",
    answer: 'Project timelines vary depending on the scope and complexity, typically ranging from 1 to 4 weeks for standard web development projects.',
  },
];

export default function FAQSection() {
  const [openIds, setOpenIds] = useState([]);

  const toggleFAQ = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  // Configuration para sa smooth spring animation na may bounce
  const springConfig = { type: 'spring', stiffness: 300, damping: 25, mass: 1 };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-2"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-3 w-full">
        {FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              onClick={() => toggleFAQ(faq.id)}
              className="bg-[#f9fafb] border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="text-gray-800 text-lg font-light shrink-0 select-none">
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>

              {/* Animated Answer Container */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={springConfig}
                    className="overflow-hidden"
                  >
                    {/* Inner wrapper para sa border at padding para maging smooth ang exit */}
                    <div className="border-t border-gray-200/60 pt-3 mt-3">
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}