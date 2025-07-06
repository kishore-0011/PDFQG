export const incrementGuestQuizCount = () => {
  const count = parseInt(localStorage.getItem('guest_quiz_count') || '0', 10);
  localStorage.setItem('guest_quiz_count', (count + 1).toString());
};

export const canGenerateGuestQuiz = () => {
  const count = parseInt(localStorage.getItem('guest_quiz_count') || '0', 10);
  return count < 1;
};