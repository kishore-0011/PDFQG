// types.ts
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// Quiz types
export interface QuizSettings {
  prompt: string;
  questionCount: number;
  difficulty: string;
  file: File | null;
  pageRange: string;
  questionType: string;
  includeExplanations: boolean;
  language: string;
}


export interface BackendQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

