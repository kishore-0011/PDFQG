import DocumentService from "../services/document.services";
import { CreateQuizDto, QuizData, QuizQuestion } from "../types/quiz.types";
import { v4 as uuidv4 } from "uuid";
import QuizModel from "../models/quiz.model";
import { extractTextFromPDF } from "../utils/pdf.utils";
import { buildQuizPrompt, callDeepSeek } from "../utils/ai.utils";
import type { DocumentData } from "../types/document.types";

class QuizService {
  async generateQuiz(data: CreateQuizDto): Promise<QuizData> {
    let inputText = "";
    let document: DocumentData | null = null;

    if (data.source_type === "pdf" && data.source_id) {
      document = await DocumentService.getDocument(data.source_id, data.user_id);

      if (!document || !document.file_path) {
        throw new Error("Document not found or file path missing");
      }

      inputText = await extractTextFromPDF(document.file_path);
    } else if (data.source_type === "text" && data.raw_text) {
      inputText = data.raw_text;
    } else {
      throw new Error("Invalid quiz input");
    }

    const prompt = buildQuizPrompt(
      inputText,
      data.number_of_questions || 10,
      data.difficulty || "medium"
    );

    let aiResponse: string;

    try {
      aiResponse = await callDeepSeek(prompt);
    } catch (err) {
      console.error("❗ Error generating quiz:", err);
      throw err;
    }

    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonContent = jsonMatch ? jsonMatch[1] : aiResponse;

    let questions: QuizQuestion[];
    try {
      questions = JSON.parse(jsonContent);
    } catch (err) {
      console.error("❌ Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse AI response. Please try again.");
    }

    let quizTitle = "Untitled Quiz";

    if (data.source_type === "pdf" && document?.title) {
      quizTitle = document.title;
    } else if (data.source_type === "text" && data.raw_text) {
      const words = data.raw_text.trim().split(/\s+/).slice(0, 8);
      quizTitle = words.join(" ") + (words.length >= 8 ? "..." : "");
    }

    const quiz: QuizData = {
      id: uuidv4(),
      title: quizTitle,
      user_id: data.user_id,
      questions,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await QuizModel.create(quiz);
    return quiz;
  }

  async getQuiz(id: string, userId: string): Promise<QuizData> {
    const quiz = await QuizModel.findById(id);
    if (!quiz || quiz.user_id !== userId) {
      throw new Error("Quiz not found or unauthorized");
    }
    return quiz;
  }

  async updateQuiz(
    id: string,
    userId: string,
    questions: QuizQuestion[]
  ): Promise<QuizData> {
    const quiz = await this.getQuiz(id, userId);
    quiz.questions = questions;
    quiz.updated_at = new Date();
    await QuizModel.update(id, quiz);
    return quiz;
  }

  async deleteQuiz(id: string, userId: string): Promise<void> {
    const quiz = await QuizModel.findById(id);
    if (!quiz || quiz.user_id !== userId) {
      throw new Error("Quiz not found or unauthorized");
    }
    await QuizModel.delete(id);
  }

  async listQuizzes(userId: string): Promise<QuizData[]> {
    return await QuizModel.findByUser(userId);
  }
}

export default new QuizService();
