import { Request, Response } from 'express';
import QuizService from '../services/quiz.service';
import { CreateQuizDto, QuizQuestion } from '../types/quiz.types';
import { JwtPayload } from '../types/auth.types';


export interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // already includes userId, email, username, iat, exp
}

class QuizController {
  async generateQuiz(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const dto: CreateQuizDto = {
      ...req.body,
      user_id: req.user?.userId ?? null, // ✅ allow null for guests
    };

    const quiz = await QuizService.generateQuiz(dto);
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}



  async getQuiz(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const quiz = await QuizService.getQuiz(req.params.id, req.user!.userId);
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(404).json({ message: 'Quiz not found or unauthorized' });
    }
  }

  async updateQuiz(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const questions: QuizQuestion[] = req.body.questions;
      const updated = await QuizService.updateQuiz(req.params.id, req.user!.userId, questions);
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(400).json({ message: 'Failed to update quiz' });
    }
  }

  async deleteQuiz(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      await QuizService.deleteQuiz(req.params.id, req.user!.userId);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(400).json({ message: 'Failed to delete quiz' });
    }
  }

  async listQuizzes(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const quizzes = await QuizService.listQuizzes(req.user!.userId);
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error listing quizzes:', error);
      res.status(400).json({ message: 'Failed to list quizzes' });
    }
  }
}

export default new QuizController();