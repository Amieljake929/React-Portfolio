import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  { sender: 'bot', text: 'Hi! Ask me anything about Amiel, his skills, or his projects!' }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  // Load initial messages from LocalStorage safely
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_MESSAGES;
    try {
      const saved = localStorage.getItem('amiel_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading LocalStorage", e);
    }
    return INITIAL_MESSAGES;
  });

  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const updateAndSaveMessages = (newMessages) => {
    setMessages(newMessages);
    try {
      localStorage.setItem('amiel_chat_history', JSON.stringify(newMessages));
    } catch (e) {
      console.error("Error saving to LocalStorage", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  const handleClearHistory = () => {
    updateAndSaveMessages(INITIAL_MESSAGES);
  };

  const preventParentScroll = (e) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isScrollable = el.scrollHeight > el.clientHeight;
    if (!isScrollable) return;
    e.stopPropagation();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    
    const updatedWithUser = [...messages, { sender: 'user', text: userText }];
    updateAndSaveMessages(updatedWithUser);
    
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        updateAndSaveMessages([...updatedWithUser, { sender: 'bot', text: data.reply }]);
      } else {
        updateAndSaveMessages([...updatedWithUser, { sender: 'bot', text: 'Sorry, I am having trouble fetching a response right now.' }]);
      }
    } catch (err) {
      updateAndSaveMessages([...updatedWithUser, { sender: 'bot', text: 'Error connecting to the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Floating Trigger Button with Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 border border-neutral-700/80 ${
          isOpen ? 'opacity-0 scale-50 pointer-events-none absolute bottom-0 right-0' : 'opacity-100 scale-100 relative'
        }`}
      >
        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        <span className="font-medium text-xs tracking-wide">Chat with us</span>
      </button>

      {/* Main Chat Window shrinking directly to the Trigger Button location */}
      <div 
        className={`w-[280px] sm:w-[310px] h-[430px] max-h-[78vh] bg-white rounded-2xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden border border-neutral-300/90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-x-0 translate-y-0 pointer-events-auto relative' 
            : 'opacity-0 scale-0 translate-x-4 translate-y-4 pointer-events-none absolute bottom-0 right-0'
        }`}
      >
        {/* Soft Graphite Header Bar */}
        <div className="py-3.5 px-4 bg-neutral-800 text-white flex justify-between items-center select-none shadow-sm border-b border-neutral-700/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-700 border border-neutral-600/80 text-white flex items-center justify-center shadow-inner">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-xs tracking-wide text-neutral-100 leading-none">AI Assistant</h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-neutral-300 leading-none">Online</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 text-neutral-300">
            <button
              onClick={handleClearHistory}
              title="Clear Chat History"
              className="hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              title="Close"
              className="hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition active:scale-90"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages Container */}
        <div 
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={preventParentScroll}
          onTouchMove={preventParentScroll}
          className="flex-1 px-4 py-3 overflow-y-auto space-y-3 text-xs overscroll-contain touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2.5 max-w-[88%] leading-relaxed text-xs transition-all ${
                  m.sender === 'user'
                    ? 'bg-neutral-800 text-white rounded-2xl rounded-br-xs shadow-xs font-normal'
                    : 'bg-neutral-100 text-neutral-800 border border-neutral-200/90 rounded-2xl rounded-bl-xs shadow-xs font-normal'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 text-neutral-500 border border-neutral-200/90 px-4 py-2 rounded-2xl rounded-bl-xs text-xs shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Form Section */}
        <form onSubmit={sendMessage} className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your text here....."
            className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-full text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition placeholder:text-neutral-400 border border-neutral-200"
          />
          
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-9 h-9 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full disabled:opacity-30 active:scale-90 transition-all duration-200 flex items-center justify-center shadow-md border border-neutral-700/80 shrink-0"
          >
            <svg 
              className="w-4 h-4 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}