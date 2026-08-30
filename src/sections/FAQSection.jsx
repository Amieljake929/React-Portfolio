import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

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

  // Configuration para sa smooth spring animation na may bounce
  const springConfig = { type: 'spring', stiffness: 300, damping: 25, mass: 1 };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-start text-left py-6"
    >
      {/* Heading na may kasamang Icon */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <HelpCircle 
          className="w-7 h-7" 
          strokeWidth={1.5} 
          style={{ color: 'var(--text-secondary)' }}
        />
        <h2 
          className="text-xl sm:text-2xl font-normal tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div
              key={faq.id}
              onClick={() => toggleFAQ(faq.id)}
              className="rounded-2xl p-4 sm:p-5 shadow-2xs transition-all duration-300 cursor-pointer flex flex-col justify-between"
              style={{
                // Gumamit ng bg-secondary para magkaroon ng contrast mula sa main background (parang original na bg-[#f9fafb])
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between w-full">
                <h3 
                  className="text-sm sm:text-base font-normal pr-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {faq.question}
                </h3>
                <div 
                  className="text-lg font-light shrink-0 select-none"
                  style={{ color: 'var(--text-primary)' }}
                >
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
                    <div 
                      className="pt-3 mt-3"
                      style={{ 
                        borderColor: 'var(--border-color)',
                        borderTopWidth: '1px',
                        borderTopStyle: 'solid'
                      }}
                    >
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