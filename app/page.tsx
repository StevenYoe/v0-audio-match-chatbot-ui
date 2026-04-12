'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header';
import ChatInterface from '@/components/chat-interface';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background dark overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0 bg-background">
        <div className="absolute inset-0 soundwave" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(at 20% 50%, rgba(85, 111, 255, 0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
            animation: 'gradient-shift 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header />

        {/* Full-screen chat layout */}
        <div className="flex-1 overflow-hidden p-6">
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
