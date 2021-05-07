export async function fetchQuiz(quizId) {
  const response = await fetch(`/api/quiz/take/${quizId}`);
  const data = await response.json();
  return data;
}

export async function fetchCorrectChoices(quizId, questionId) {
  const response = await fetch(
    `/api/quiz/correctChoices/${quizId}/${questionId}`
  );
  const data = await response.json();
  return data;
}
