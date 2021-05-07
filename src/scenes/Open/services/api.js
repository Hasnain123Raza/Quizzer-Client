export async function fetchSimplifiedQuiz(quizId) {
  const response = await fetch(`/api/quiz/simplified/${quizId}`);
  const data = await response.json();
  return data;
}
