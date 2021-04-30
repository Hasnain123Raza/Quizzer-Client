export const getCreateQuizForm = (state) => state.create;

export const getQuestions = (state) => state.create.questions;

export const getQuestionFromIndex = (index) => (state) =>
  state.create.questions[index];
