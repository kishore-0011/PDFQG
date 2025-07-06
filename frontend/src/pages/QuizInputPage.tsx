import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { BackendQuestion, QuizSettings } from "../types/types";
import { Sidebar } from "./quiz/Sidebar";
import { PromptInput } from "./quiz/PromptInput";
import { PdfUpload } from "./quiz/PdfUpload";
import { AdvancedSettings } from "./quiz/AdvancedSettings";
import { GenerateButton } from "./quiz/GenerateButton";
import { TipsFooter } from "./quiz/TipsFooter";
import api from "../api/axios";
import { Navbar } from "./quiz/Navbar";
import { canGenerateGuestQuiz, incrementGuestQuizCount } from "../utils/guestLimit.utils";
import { useAuth } from "../context/use-auth";
import { toast } from "react-toastify";

export interface QuizHistoryItem {
  id: string;
  title: string;
  created_at: string;
}

const QuizInputPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<QuizSettings>({
    prompt: "",
    questionCount: 10,
    difficulty: "medium",
    file: null,
    pageRange: "",
    questionType: "mcq",
    includeExplanations: true,
    language: "english",
  });

  const { user, loading } = useAuth(); // ✅ include loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!user) return;
        const res = await api.get("/quizzes", { withCredentials: true });
        setQuizHistory(res.data || []);
      } catch (err) {
        console.error("Failed to fetch quiz history", err);
      }
    };

    if (!loading) fetchHistory();
  }, [user, loading]);

  const handleSettingChange = (
    field: string,
    value: string | number | boolean | File | null
  ): void => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateQuiz = async (): Promise<void> => {
    setIsGenerating(true);
    try {
      if (!user) {
        if (!canGenerateGuestQuiz()) {
          toast.info("You've reached your free quiz limit. Please sign up to continue.");
          setTimeout(() => navigate("/loginsignup"), 2000);
          return;
        } else {
          incrementGuestQuizCount();
        }
      } else if (user.plan === "free") {
        const userRes = await api.get("/users/me", { withCredentials: true });
        if (userRes.data.quizCount >= 3) {
          toast.info("Free quiz limit reached. Upgrade to unlock more.");
          return;
        }
      }

      let source_type: "pdf" | "text" = "text";
      let source_id: string | undefined;

      if (settings.file) {
        const docForm = new FormData();
        docForm.append("file", settings.file);
        docForm.append("title", settings.file.name || "Untitled Document");

        const docRes = await api.post("/documents", docForm, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        source_type = "pdf";
        source_id = docRes.data.id;
      }

      const quizPayload = {
        source_type,
        source_id,
        raw_text: settings.prompt,
        number_of_questions: settings.questionCount,
        difficulty: settings.difficulty,
        question_type: settings.questionType,
        include_explanations: settings.includeExplanations,
        language: settings.language,
      };

      const quizRes = await api.post("/quizzes", quizPayload, {
        withCredentials: !!user,
      });

      const backendQuiz = quizRes.data;

      if (!backendQuiz.questions || backendQuiz.questions.length === 0) {
        throw new Error("No questions returned from quiz API.");
      }

      const transformedQuiz = {
        id: backendQuiz.id,
        title: backendQuiz.title ?? "Untitled Quiz",
        questions: backendQuiz.questions.map((q: BackendQuestion, index: number) => {
          const correctLetter = q.answer?.trim().toUpperCase();
          const options = q.options.map((optStr: string, optIndex: number) => {
            const cleanOption = optStr.trim();
            const optionLetter = String.fromCharCode(65 + optIndex);
            let optionText = cleanOption;

            const patterns = [
              /^[A-D]\)\s*(.+)$/i,
              /^[A-D]\.\s*(.+)$/i,
              /^[A-D]:\s*(.+)$/i,
              /^[A-D]\s*-\s*(.+)$/i,
              /^[A-D]\s+(.+)$/i,
            ];

            for (const pattern of patterns) {
              const match = cleanOption.match(pattern);
              if (match && match[1]) {
                optionText = match[1].trim();
                break;
              }
            }

            if (optionText === cleanOption && /^[A-D]/i.test(cleanOption)) {
              const remaining = cleanOption.substring(1).replace(/^[.)\s:-]+/, "");
              if (remaining.length > 0) {
                optionText = remaining;
              }
            }

            return {
              id: optionLetter,
              text: optionText,
              isCorrect: optionLetter === correctLetter,
            };
          });

          return {
            id: `q${index + 1}`,
            title: `Question ${index + 1}`,
            question: q.question,
            options,
            explanation: q.explanation,
          };
        }),
      };

      navigate(`/quiz/${backendQuiz.id}`, { state: { quiz: transformedQuiz } });

      setSettings({
        prompt: "",
        questionCount: 10,
        difficulty: "medium",
        file: null,
        pageRange: "",
        questionType: "mcq",
        includeExplanations: true,
        language: "english",
      });
    } catch (err) {
      console.error("Error generating quiz:", err);
      alert("Failed to generate quiz.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate: boolean =
    (settings.prompt.trim().length > 0 || settings.file !== null) && !isGenerating;

  // ✅ Wait until loading is false before rendering anything
  if (loading) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {user && <Navbar />}
      {user && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          history={quizHistory}
        />
      )}
      <div className={user ? "lg:ml-64" : ""}>
        <main className="px-8 py-6 max-w-4xl mx-auto pt-20">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Create New Quiz</h1>
              <p className="text-gray-400">
                Generate custom quizzes from prompts and PDF documents
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-6 space-y-6">
              <PromptInput
                prompt={settings.prompt}
                questionCount={settings.questionCount}
                difficulty={settings.difficulty}
                onChange={handleSettingChange}
              />
              <PdfUpload
                file={settings.file}
                pageRange={settings.pageRange}
                onChange={handleSettingChange}
              />
            </div>
            <AdvancedSettings
              questionType={settings.questionType}
              includeExplanations={settings.includeExplanations}
              language={settings.language}
              onChange={handleSettingChange}
            />
            <GenerateButton
              onClick={handleGenerateQuiz}
              disabled={!canGenerate}
              isLoading={isGenerating}
            />
            <TipsFooter />
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizInputPage;
