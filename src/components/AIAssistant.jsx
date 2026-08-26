import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Load messages from localStorage so they don't reset on page refresh
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio_ai_chat');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { role: 'assistant', content: 'Hi there! 👋 I am Amiel’s AI assistant. Ask me anything about his portfolio, projects, skills, or even his background and personality!' }
    ];
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('portfolio_ai_chat', JSON.stringify(messages));
  }, [messages]);

  // Siguraduhing laging nasa pinakababa (recent message) ang scroll tuwing magbubukas o may bagong mensahe
  useEffect(() => {
    if (isOpen) {
      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        });
      };
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages]);

  // Scroll listener para sa smooth minimization habang nag-a-scroll sa pahina
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
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
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Error: Could not connect to AI service. Please check your Vercel deployment/API setup.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 font-sans">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Floating Chat Head Button */
          <motion.button
            key="chat-button"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
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
                    transition={{ duration: 0.2 }}
                    className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap overflow-hidden"
                  >
                    Chat with Amiel
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        ) : (
          /* Chat Window Modal */
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onWheel={(e) => e.stopPropagation()}
            className="w-[70vw] sm:w-[320px] h-[390px] sm:h-[440px] bg-white border border-gray-200/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header na may mas pinagandang Close Button */}
            <div className="bg-white text-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0 border border-gray-200 shadow-sm relative">
                  <img 
                    src="/images/Jakes.jpg" 
                    alt="Amiel AI" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                    className="w-full h-full object-cover"
                  />
                  <span className="text-white text-[10px] font-bold absolute hidden">AI</span>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-900">Chat with Amiel</h3>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100/90 rounded-full transition-all duration-200 cursor-pointer shadow-none"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-white text-xs sm:text-sm overscroll-contain"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <User className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0 border border-gray-200">
                      <img 
                        src="/images/Jakes.jpg" 
                        alt="AI" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[76%] px-3 py-2 rounded-2xl leading-relaxed text-xs ${
                      msg.role === 'user'
                        ? 'bg-black text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs italic pl-8">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form na may mas pinagandang Send Button */}
            <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about me..."
                className="flex-1 bg-gray-50 text-gray-900 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-black border border-gray-200/80 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-900 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 translate-x-[-0.5px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}