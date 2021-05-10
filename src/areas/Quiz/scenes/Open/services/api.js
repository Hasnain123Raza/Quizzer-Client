export async function fetchSimplifiedQuiz(quizId) {
  const response = await fetch(`/api/quiz/open/simplifiedQuiz/${quizId}`);
  const data = await response.json();
  return data;
}
