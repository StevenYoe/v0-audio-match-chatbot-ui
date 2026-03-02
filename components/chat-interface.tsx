'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/store';
import ChatMessage from './chat-message';
import { sendChatMessage } from '@/lib/api';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useChatStore();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    setInput('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(userMessage);
      
      // Assuming the response from backend is { response: "..." } or { content: "..." }
      const content = data.response || data.content || data.message || "I'm sorry, I couldn't process your request.";

      addMessage({
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: content,
        timestamp: new Date(),
      });
    } catch (error) {
      addMessage({
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Sorry, I'm having trouble connecting to the server. Please check your connection and try again.",
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{
          scrollBehavior: 'smooth',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(85, 111, 255, 0.3) transparent',
        }}
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              className="h-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-primary/50 border-t-primary mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to Find Your Perfect Audio
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Describe your car, audio goals, or ask any questions about our products and services.
              </p>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <ChatMessage key={msg.id} message={msg} index={idx} />
            ))
          )}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className="chat-bubble-assistant"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Analyzing...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 border-t border-border/30 bg-gradient-to-t from-card/40 to-transparent">
        <div className="flex gap-3">
          <div className="flex-1 input-glow">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your car audio issue..."
              className="w-full bg-transparent p-3 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-0"
              rows={2}
            />
          </div>
          
          <div className="flex gap-2 items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary transition-colors"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors button-neon"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
