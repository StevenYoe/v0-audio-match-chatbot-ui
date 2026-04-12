'use client';

import { motion } from 'framer-motion';
import { Message } from '@/lib/store';
import { formatNumbersInText } from '@/lib/utils';
import InlineRecommendations from './inline-recommendations';
import ReactMarkdown from 'react-markdown';

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
        {isUser ? (
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {displayContent}
          </p>
        ) : (
          <div className="markdown-content text-sm leading-relaxed text-foreground">
            <ReactMarkdown>{displayContent}</ReactMarkdown>
          </div>
        )}
        <span className="text-xs text-muted-foreground mt-2 block opacity-60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {/* Display inline recommendations if available */}
        {!isUser && message.recommendations && message.recommendations.length > 0 && (
          <InlineRecommendations recommendations={message.recommendations} />
        )}
      </div>
    </motion.div>
  );
}
