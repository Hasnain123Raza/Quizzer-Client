export async function postQuiz(quiz) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  };

  const response = await fetch("/api/quiz", requestOptions);
  const data = await response.json();
  return data;
}
