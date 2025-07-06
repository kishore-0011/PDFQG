import { Router } from 'express';
import QuizController from '../controllers/quiz.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// ✅ Allow guests to generate one quiz
router.post('/', QuizController.generateQuiz);

// 🛡️ Protect all routes below this line
router.use(authenticate);

// Get a specific quiz by ID
router.get('/:id', QuizController.getQuiz);

// Update quiz questions
router.put('/:id', QuizController.updateQuiz);

// Delete a quiz
router.delete('/:id', QuizController.deleteQuiz);

// List all quizzes of the user
router.get('/', QuizController.listQuizzes);

export default router;
