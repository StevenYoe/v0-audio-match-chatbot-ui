'use client';

import { motion } from 'framer-motion';
import { Message } from '@/lib/store';
import { formatNumbersInText } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.type === 'user';
  const displayContent = isUser ? message.content : formatNumbersInText(message.content);

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div
        className={`${
          isUser
            ? 'chat-bubble-user'
            : 'chat-bubble-assistant'
        }`}
      >
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {displayContent}
        </p>
        <span className="text-xs text-muted-foreground mt-2 block opacity-60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}
