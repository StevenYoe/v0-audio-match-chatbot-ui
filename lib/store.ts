import { create } from 'zustand';

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  selectedRecommendation: string | null;
  setSelectedRecommendation: (id: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome to AudioMatch! I\'m your AI car audio specialist. Tell me about your vehicle and what you\'re looking to improve in your audio setup.',
      timestamp: new Date(),
    },
  ],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () =>
    set({
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: 'Welcome to AudioMatch! I\'m your AI car audio specialist. Tell me about your vehicle and what you\'re looking to improve in your audio setup.',
          timestamp: new Date(),
        },
      ],
    }),
  selectedRecommendation: null,
  setSelectedRecommendation: (id) =>
    set({
      selectedRecommendation: id,
    }),
}));
