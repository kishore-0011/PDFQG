export type QuestionType = 'mcq' | 'true_false' | 'fill_blank';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface CreateQuizDto {
  source_type: 'pdf' | 'text';
  source_id?: string; // Document ID
  raw_text?: string;
  number_of_questions: number;
  difficulty?: Difficulty;
  question_type?: QuestionType;
  include_explanations?: boolean;
  language?: string;
  user_id: string;
}

export interface QuizData {
  id: string;
  title: string;
  user_id: string;
  questions: QuizQuestion[];
  created_at: Date;
  updated_at?: Date;
}