export const sGetQuizRequestStatus = (state) => {
  return state.quiz.take.quizRequestStatus;
};

export const sGetQuiz = (state) => {
  return state.quiz.take.quiz;
};

export const sGetQuizId = (state) => {
  return sGetQuiz(state)._id;
};

export const sGetQuizTitle = (state) => {
  return sGetQuiz(state).title;
};

export const sGetQuizDescription = (state) => {
  return sGetQuiz(state).description;
};

export const sGetQuestions = (state) => {
  return sGetQuiz(state).questions;
};

export const sGetQuestionCount = (state) => {
  return sGetQuestions(state).length;
};

export const sGetQuestion = (questionId) => (state) => {
  return sGetQuestions(state).filter(
    (question) => question._id == questionId
  )[0];
};

export const sGetChoice = (questionId, choiceId) => (state) => {
  return sGetQuestion(questionId)(state).choices.filter(
    (choice) => choice._id == choiceId
  )[0];
};

export const sGetChoicePrompt = (questionId, choiceId) => (state) => {
  return sGetChoice(questionId, choiceId)(state).prompt;
};

export const sGetCorrectChoices = (state) => {
  return state.quiz.take.correctChoices;
};

export const sGetCorrectChoicesRequestStatus = (state) => {
  return state.quiz.take.correctChoicesRequestStatus;
};

export const sGetCurrentQuestionId = (state) => {
  return state.quiz.take.currentQuestionId;
};

export const sGetSelectedChoiceId = (state) => {
  return state.quiz.take.selectedChoiceId;
};

export const sGetIsChoiceSelected = (state) => {
  return state.quiz.take.selectedChoiceId !== -1;
};

export const sGetSelectedChoiceCorrect = (state) => {
  return state.quiz.take.selectedChoiceCorrect;
};

export const sGetTotalCorrectQuestions = (state) => {
  return state.quiz.take.totalCorrectQuestions;
};

export const sGetTotalWrongQuestions = (state) => {
  return state.quiz.take.totalWrongQuestions;
};
