import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ChevronRight, Home, X } from 'lucide-react';
import api from '../api/axios';
import type { BackendQuestion } from '../types/types';

interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  title: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface UserAnswer {
  questionId: string;
  selectedId: string;
  isCorrect: boolean;
}

// Backend quiz structure for fetched quizzes
interface BackendQuiz {
  id: string;
  title: string;
  questions: BackendQuestion[];
}

const QuizInterface: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const passedState = location.state as { quiz: QuizData } | null;

  const [quizData, setQuizData] = useState<QuizData | null>(passedState?.quiz || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(!passedState?.quiz);

  // Transform backend quiz data to frontend format
  const transformBackendQuiz = (backendQuiz: BackendQuiz): QuizData => {
    return {
      id: backendQuiz.id,
      title: backendQuiz.title ?? "Untitled Quiz",
      questions: backendQuiz.questions.map((q: BackendQuestion, index: number) => {
        const correctAnswer = q.answer?.trim().toUpperCase();
        console.log('Question:', q.question);
        console.log('Raw options:', q.options);
        console.log('Correct answer:', correctAnswer);

        const options = q.options.map((optStr: string, optIndex: number) => {
          const cleanOption = optStr.trim();
          const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
          
          console.log(`Processing option ${optIndex}: "${cleanOption}" -> Letter: ${optionLetter}`);
          
          let optionText = cleanOption;
          
          // Handle different formats more carefully
          if (/^[A-D]/i.test(cleanOption)) {
            // Try different patterns to extract text
            const patterns = [
              /^[A-D]\)\s*(.+)$/i,     // A) Text
              /^[A-D]\.\s*(.+)$/i,     // A. Text
              /^[A-D]:\s*(.+)$/i,      // A: Text
              /^[A-D]\s*-\s*(.+)$/i,   // A - Text
              /^[A-D]\s+(.+)$/i,       // A Text (space separated)
            ];
            
            for (const pattern of patterns) {
              const match = cleanOption.match(pattern);
              if (match && match[1] && match[1].trim()) {
                optionText = match[1].trim();
                console.log(`Pattern matched, extracted text: "${optionText}"`);
                break;
              }
            }
            
            // If no pattern matched but starts with letter, manually remove prefix
            if (optionText === cleanOption) {
              // Remove first character and any following punctuation/spaces
              let remaining = cleanOption.substring(1);
              // Remove leading punctuation and spaces
              remaining = remaining.replace(/^[.)\s:-]+/, '');
              if (remaining.length > 0) {
                optionText = remaining;
                console.log(`Manual prefix removal, extracted text: "${optionText}"`);
              }
            }
          }
          
          // Ensure we have valid text
          if (!optionText || optionText.length === 0) {
            optionText = cleanOption;
          }

          const isCorrect = optionLetter === correctAnswer;
          console.log(`Final option - Letter: ${optionLetter}, Text: "${optionText}", Correct: ${isCorrect}`);

          return { 
            id: optionLetter, 
            text: optionText, 
            isCorrect 
          };
        });

        return {
          id: `q${index + 1}`,
          title: `Question ${index + 1}`,
          question: q.question,
          options,
          explanation: q.explanation || "No explanation available.",
        };
      }),
    };
  };

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizData && id) {
        try {
          setIsLoading(true);
          const res = await api.get(`/quizzes/${id}`, { withCredentials: true });
          const backendQuiz: BackendQuiz = res.data;
          
          if (!backendQuiz.questions || backendQuiz.questions.length === 0) {
            throw new Error("No questions found in this quiz.");
          }

          const transformedQuiz = transformBackendQuiz(backendQuiz);
          setQuizData(transformedQuiz);
        } catch (err) {
          console.error('Failed to fetch quiz:', err);
          alert('Quiz data not found or failed to load. Please go back and try again.');
          navigate('/');
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadQuiz();
  }, [quizData, id, navigate]);

  if (isLoading || !quizData) {
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-lg text-gray-300">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === selectedOptionId
    );
    const isCorrect = selectedOption?.isCorrect ?? false;
    
    console.log('Selected option:', selectedOption);
    console.log('Is correct:', isCorrect);
    
    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, selectedId: selectedOptionId, isCorrect },
    ]);
    setHasSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOptionId('');
    setHasSubmitted(false);
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId('');
    setHasSubmitted(false);
    setUserAnswers([]);
    setIsCompleted(false);
  };

  const correctAnswersCount = userAnswers.filter((a) => a.isCorrect).length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto">
      <div className="min-h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">{quizData.title}</h1>
              {!isCompleted && (
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="text-sm md:text-base">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <div className="flex-1 max-w-64 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {isCompleted ? (
              <div className="text-center space-y-8">
                <CheckCircle size={80} className="mx-auto text-green-400" />
                <h2 className="text-3xl md:text-4xl font-bold">Quiz Completed!</h2>
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-xl md:text-2xl text-gray-300 mb-6">
                    You scored <span className="text-green-400 font-bold text-2xl md:text-3xl">{correctAnswersCount}</span> out of <span className="text-purple-400 font-bold text-2xl md:text-3xl">{totalQuestions}</span>
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-6 mb-6">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-purple-400 h-6 rounded-full transition-all duration-500 flex items-center justify-center"
                      style={{ width: `${(correctAnswersCount / totalQuestions) * 100}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {Math.round((correctAnswersCount / totalQuestions) * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg">
                    {correctAnswersCount === totalQuestions 
                      ? "Perfect score! 🎉" 
                      : correctAnswersCount >= totalQuestions * 0.8 
                      ? "Great job! 👏" 
                      : correctAnswersCount >= totalQuestions * 0.6 
                      ? "Good effort! 👍" 
                      : "Keep practicing! 💪"}
                  </p>
                </div>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <button
                    onClick={handleRetry}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg transition-colors font-semibold"
                  >
                    Retry Quiz
                  </button>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-lg transition-colors font-semibold"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Question */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-lg p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                    {currentQuestion.title}
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{currentQuestion.question}</p>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = hasSubmitted && opt.isCorrect;
                    const isWrong = hasSubmitted && isSelected && !opt.isCorrect;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !hasSubmitted && setSelectedOptionId(opt.id)}
                        disabled={hasSubmitted}
                        className={`block w-full text-left px-6 py-5 md:px-8 md:py-6 rounded-lg border-2 transition-all duration-200 ${
                          isCorrect
                            ? 'bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/20'
                            : isWrong
                            ? 'bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/20'
                            : isSelected
                            ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
                            : 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 hover:border-gray-600'
                        } ${hasSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-lg md:text-xl flex-shrink-0 bg-gray-700 text-white px-3 py-1 rounded-full min-w-[2.5rem] text-center">
                            {opt.id}
                          </span>
                          <span className="text-base md:text-lg leading-relaxed pt-1">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {hasSubmitted && (
                  <div className="mt-8 p-6 md:p-8 border-l-4 border-purple-500 bg-purple-500/10 rounded-r-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                          <CheckCircle size={28} className="text-green-400 mt-1" />
                        ) : (
                          <div className="w-7 h-7 rounded-full border-2 border-red-400 flex items-center justify-center mt-1">
                            <X size={18} className="text-red-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-purple-200 mb-3 text-lg">
                          {userAnswers[userAnswers.length - 1]?.isCorrect ? 'Correct! ✅' : 'Incorrect ❌'}
                        </p>
                        <p className="text-purple-100 leading-relaxed text-base md:text-lg">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-center pt-8">
                  {!hasSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedOptionId}
                      className={`flex items-center gap-3 px-10 py-4 rounded-lg text-white font-semibold text-lg transition-all ${
                        selectedOptionId
                          ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Submit Answer <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-3 px-10 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all"
                    >
                      {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;