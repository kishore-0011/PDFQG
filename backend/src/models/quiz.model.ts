import pool from '../config/db';
import { QuizData, QuizQuestion } from '../types/quiz.types';
import { v4 as uuidv4 } from 'uuid';

const QuizModel = {
  async create(data: QuizData): Promise<void> {
    const query = `
      INSERT INTO quizzes (id, title, user_id, questions, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await pool.query(query, [
      data.id,
      data.title,
      data.user_id,
      JSON.stringify(data.questions),
      data.created_at,
      data.updated_at,
    ]);
  },

  async findById(id: string): Promise<QuizData | undefined> {
    const result = await pool.query(
      'SELECT * FROM quizzes WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) return undefined;

    const row = result.rows[0];
    return {
      ...row,
      questions: row.questions,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  },

  async update(id: string, updated: QuizData): Promise<void> {
    const query = `
      UPDATE quizzes SET title = $1, questions = $2, updated_at = $3
      WHERE id = $4
    `;
    await pool.query(query, [
      updated.title,
      JSON.stringify(updated.questions),
      updated.updated_at,
      id,
    ]);
  },
  

  async delete(id: string): Promise<void> {
    await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);
  },

  async findByUser(userId: string): Promise<QuizData[]> {
    const result = await pool.query(
      'SELECT * FROM quizzes WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows.map((row) => ({
      ...row,
      questions: row.questions,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  },
};



export default QuizModel;