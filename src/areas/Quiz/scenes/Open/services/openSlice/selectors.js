export const sGetSimplifiedQuiz = (state) => state.quiz.open.simplifiedQuiz;

export const sGetSimplifiedQuizId = (state) => sGetSimplifiedQuiz(state)._id;

export const sGetSimplifiedQuizTitle = (state) =>
  sGetSimplifiedQuiz(state).title;

export const sGetSimplifiedQuizDescription = (state) =>
  sGetSimplifiedQuiz(state).description;

export const sGetSimplifiedQuizRequestStatus = (state) =>
  state.quiz.open.simplifiedQuizRequestStatus;
