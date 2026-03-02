import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Welcome to AudioMatch! I\'m your AI car audio specialist. Tell me about your vehicle and what you\'re looking to improve in your audio setup.',
    timestamp: new Date(),
  },
];

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: INITIAL_MESSAGES,
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () =>
        set({
          messages: [
            {
              id: Date.now().toString(),
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
    }),
    {
      name: 'audiomatch-chat-storage',
      storage: createJSONStorage(() => localStorage),
      // Handle Date serialization/deserialization
      onRehydrateStorage: () => (state) => {
        if (state && state.messages) {
          state.messages = state.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        }
      },
    }
  )
);
