export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  file_path?: string;
  mime_type: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Question {
  id?: string;
  quiz_id?: string;
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
}

export interface Quiz {
  id?: string;
  title: string;
  description?: string;
  document_id: string;
  document_title: string;
  user_id: string;
  question_count: number;
  difficulty_level: QuizDifficultyLevel;
  status: QuizStatus;
  created_at?: Date;
  updated_at?: Date;
}

export type QuizDifficultyLevel = 'easy' | 'medium' | 'hard';
export type QuizStatus = 'processing' | 'completed' | 'failed';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface GenerateQuizRequest {
  title: string;
  description?: string;
  question_count: number;
  difficulty_level?: QuizDifficultyLevel;
}

export interface PaginationResult {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface QuizListItem {
  id: string;
  title: string;
  document_id: string;
  document_title: string;
  question_count: number;
  created_at: Date;
}

export interface QuizListResponse {
  data: QuizListItem[];
  pagination: PaginationResult;
}

export interface QuizResponse {
  id: string;
  title: string;
  description?: string;
  document_id: string;
  document_title: string;
  question_count: number;
  difficulty_level: QuizDifficultyLevel;
  status: QuizStatus;
  created_at: Date;
  updated_at: Date;
  questions?: Question[];
}

export interface QuizQueryParams {
  page?: string;
  limit?: string;
  document_id?: string;
}
