import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio_ai_chat');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { role: 'assistant', content: 'Hi there! I am Amiel’s AI assistant. Ask me anything about his portfolio, projects, skills, or even his background and personality!' }
    ];
  });

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Technical Skills",
    "Recent Projects",
    "Work Experience",
    "Contact Details"
  ];

  useEffect(() => {
    localStorage.setItem('portfolio_ai_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
      };
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return;
      if (window.scrollY > 350) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const sendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: 'user', content: query.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch response');

      const assistantReply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response right now.";
      setMessages([...newMessages, { role: 'assistant', content: assistantReply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: 'Error: Could not connect to AI service. Please check your deployment/API setup.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Chat Head Button */
          <motion.div 
            key="chat-button-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 sm:right-8 z-50 font-sans bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-12"
          >
            <motion.button
              key="chat-button"
              layout
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="bg-black text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-gray-800 transition-all group overflow-hidden"
            >
              <motion.div 
                layout 
                className={`flex items-center ${isMinimized ? 'p-3.5 sm:p-4' : 'px-4 sm:px-5 py-3 sm:py-3.5 gap-2.5 sm:gap-3'}`}
              >
                <MessageSquare className="w-5 h-5 text-white shrink-0" />
                <AnimatePresence>
                  {!isMinimized && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden"
                    >
                      Chat with Amiel
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          </motion.div>
        ) : (
          <React.Fragment key="chat-modal-group">
            {/* Dark Overlay Background (Mobile Only) */}
            <motion.div 
              key="chat-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 sm:hidden"
            />

            {/* Centered Modal Container (Inangat ang bottom spacing sa desktop via sm:bottom-12 at sm:right-8) */}
            <div className="fixed inset-0 z-50 font-sans flex items-center justify-center p-4 sm:p-0 sm:inset-auto sm:bottom-12 sm:right-8 pointer-events-none">
              <motion.div
                key="chat-window"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onWheel={(e) => e.stopPropagation()}
                className="pointer-events-auto w-full max-w-[90vw] sm:w-[360px] h-[65vh] max-h-[520px] sm:h-[480px] bg-white border border-gray-200/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="bg-white text-gray-900 px-4 py-3.5 flex items-center justify-between border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0 border border-gray-200 shadow-xs relative">
                      <img 
                        src="/images/Jakes.jpg" 
                        alt="Amiel AI" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900">Chat with Amiel's AI Assistant</h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online now
                      </p>
                    </div>
                  </div>

                  {/* Refined & Animated Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors duration-150 cursor-pointer border border-transparent hover:border-gray-200/80"
                    aria-label="Close Chat"
                  >
                    <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </motion.button>
                </div>

                {/* Messages Area */}
                <div 
                  onWheel={(e) => e.stopPropagation()}
                  className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50 text-xs sm:text-xs overscroll-contain"
                >
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {msg.role === 'user' ? (
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0 border border-gray-200 shadow-xs mt-0.5">
                          <img 
                            src="/images/Jakes.jpg" 
                            alt="AI" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] sm:max-w-[76%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-xs shadow-xs ${
                          msg.role === 'user'
                            ? 'bg-black text-white rounded-tr-xs font-normal'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-gray-400 text-xs italic pl-8"
                    >
                      <span className="animate-pulse">Thinking...</span>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Chips */}
                {messages.length <= 2 && !loading && (
                  <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        className="text-[11px] bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200/80 whitespace-nowrap transition-all cursor-pointer shrink-0 font-medium shadow-2xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Form */}
                <form 
                  onSubmit={handleSend} 
                  className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about me..."
                    className="flex-1 bg-gray-100/80 text-gray-900 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-black border border-transparent focus:border-black transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 sm:w-9 sm:h-9 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-900 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5 translate-x-[-0.5px]" />
                  </button>
                </form>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}