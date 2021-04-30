export async function getQuiz(quizId) {
  return await fetch(`/api/quiz/${quizId}`);
}

export async function getQuizCount() {
  return await fetch("/api/quiz/count");
}

export async function getPage(pageIndex, pageSize) {
  return await fetch(`/api/quiz/${pageIndex}/${pageSize}`);
}

export async function postQuiz(quiz) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  };

  return await fetch("/api/quiz", requestOptions);
}
