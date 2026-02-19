'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="relative border-b border-border/30 backdrop-blur-sm bg-card/20"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex flex-col">
            <motion.h1
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter"
              animate={{ 
                textShadow: [
                  '0 0 0px rgba(85, 111, 255, 0)',
                  '0 0 20px rgba(85, 111, 255, 0.5)',
                  '0 0 0px rgba(85, 111, 255, 0)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AudioMatch
            </motion.h1>
            <p className="text-sm text-muted-foreground mt-1 tracking-wide">
              Find Your Perfect Audio Setup
            </p>
          </div>

          {/* Status indicator */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-primary rounded-full neon-glow" />
            <span className="text-xs text-primary font-medium">Active</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle glow border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.header>
  );
}
