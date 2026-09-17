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
    question: 'Are you open to full-time entry-level opportunities?',
    answer: 'Yes, I am actively looking for full-time entry-level roles or junior positions where I can contribute, learn, and grow with a dynamic team.',
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

  const springConfig = { type: 'spring', stiffness: 300, damping: 25, mass: 1 };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-6"
    >
      {/* Heading */}
      <div className="flex flex-col items-start gap-2 mb-4">
        <h2 
          className="text-xl sm:text-2xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ List */}
      <div className="w-full flex flex-col">
        {FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              onClick={() => toggleFAQ(faq.id)}
              className="py-5 cursor-pointer transition-colors duration-200"
              style={{
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between w-full">
                <h3 
                  className="text-sm sm:text-base font-normal pr-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {faq.question}
                </h3>
                <span 
                  className="text-lg font-light shrink-0 select-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {isOpen ? '—' : '+'}
                </span>
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
                    <div className="pt-3 pr-8">
                      <p 
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
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