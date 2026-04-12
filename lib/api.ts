const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export interface ChatResponse {
  response?: string;
  content?: string;
  message?: string;
  recommendations?: ProductRecommendation[];
  [key: string]: unknown;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: string | number;
  [key: string]: unknown;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send chat message:', error);
    throw error;
  }
}

export async function fetchProblems() {
  try {
    const response = await fetch(`${API_BASE_URL}/problems/`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch problems:', error);
    throw error;
  }
}
