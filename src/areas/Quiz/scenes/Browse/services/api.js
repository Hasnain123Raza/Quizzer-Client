export async function fetchQuizCount() {
  const response = await fetch("/api/quiz/browse/quizCount");
  const data = await response.json();
  return data.count;
}

export async function fetchSimplifiedQuizzes(pageIndex, pageSize) {
  const response = await fetch(
    `/api/quiz/browse/simplifiedQuizzes/${pageIndex}/${pageSize}`
  );
  const data = await response.json();
  return data;
}
