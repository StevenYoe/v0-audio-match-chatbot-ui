'use client';

import { motion } from 'framer-motion';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Header() {
  const clearMessages = useChatStore((state) => state.clearMessages);

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

          <div className="flex items-center gap-4">
            {/* New Chat Button with Confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-semibold transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="w-4 h-4" />
                  New Chat
                </motion.button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-panel border-primary/30 bg-card/90 backdrop-blur-md">
                <AlertDialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/20 text-primary">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <AlertDialogTitle className="text-xl font-bold text-foreground">
                      Start New Session?
                    </AlertDialogTitle>
                  </div>
                  <AlertDialogDescription className="text-muted-foreground">
                    This will clear your current conversation history. This action cannot be undone. Are you sure you want to start a new chat?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 gap-3">
                  <AlertDialogCancel className="bg-card hover:bg-card/80 border-border/50 text-foreground rounded-lg px-4 py-2 transition-colors">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={clearMessages}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg px-6 py-2 transition-all button-neon"
                  >
                    Yes, New Chat
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
      </div>

      {/* Subtle glow border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.header>
  );
}