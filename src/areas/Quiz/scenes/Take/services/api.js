export async function fetchUnrevealedQuiz(quizId) {
  const response = await fetch(`/api/quiz/take/unrevealedQuiz/${quizId}`);
  const data = await response.json();
  return data;
}

export async function fetchCorrectChoices(quizId, questionId) {
  const response = await fetch(
    `/api/quiz/take/correctChoices/${quizId}/${questionId}`
  );
  const data = await response.json();
  return data;
}
