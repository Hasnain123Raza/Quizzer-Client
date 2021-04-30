export const getQuizzes = (state) => state.quizzes;

export const getQuizById = (id) => (state) =>
  state.quizzes.find((quiz) => quiz._id === id);
