'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/lib/store';
import ChatMessage from './chat-message';
import { sendChatMessage } from '@/lib/api';
import { toast } from 'sonner';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { messages, addMessage } = useChatStore();

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true; // Keep listening until manually stopped or long silence
        recognitionRef.current.interimResults = true; // Show results as they come
        recognitionRef.current.lang = 'en-US'; // Set English as primary for better stability
        
        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setInput((prev) => prev + (prev ? ' ' : '') + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== 'no-speech') {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            toast.error(`Error: ${event.error}`);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        toast.error('Fitur input suara tidak didukung di browser ini.');
        return;
      }
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast.info('Listening...');
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

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
          <div className="flex-1 input-glow relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Describe your car audio issue..."}
              className={`w-full bg-transparent p-3 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-0 transition-opacity ${isListening ? 'opacity-50' : 'opacity-100'}`}
              rows={2}
            />
            {isListening && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-4 bg-primary rounded-full"
                      animate={{ height: [4, 16, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
              className={`p-3 rounded-xl border transition-all ${
                isListening 
                  ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                  : 'bg-primary/20 hover:bg-primary/30 border-primary/50 text-primary'
              }`}
              aria-label={isListening ? "Stop listening" : "Voice input"}
            >
              {isListening ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5" />
                </motion.div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
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
