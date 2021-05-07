export const sGetQuizRequestStatus = (state) => {
  return state.quizTake.quizRequestStatus;
};

export const sGetQuizId = (state) => {
  return state.quizTake.quiz._id;
};

export const sGetQuizTitle = (state) => {
  return state.quizTake.quiz.title;
};

export const sGetQuizDescription = (state) => {
  return state.quizTake.quiz.description;
};

export const sGetTotalQuestions = (state) => {
  return state.quizTake.quiz.questions.length;
};

export const sGetQuestionById = (questionId) => (state) => {
  return state.quizTake.quiz.questions[questionId - 1];
};

export const sGetCorrectChoices = (state) => {
  return state.quizTake.correctChoices;
};

export const sGetCorrectChoicesRequestStatus = (state) => {
  return state.quizTake.correctChoicesRequestStatus;
};

export const sGetCurrentQuestionId = (state) => {
  return state.quizTake.currentQuestionId;
};

export const sGetSelectedChoiceId = (state) => {
  return state.quizTake.selectedChoiceId;
};

export const sGetSelectedChoiceCorrect = (state) => {
  return state.quizTake.selectedChoiceCorrect;
};

export const sGetChoiceById = (questionId, choiceId) => (state) => {
  return state.quizTake.quiz.questions[questionId - 1].choices[choiceId - 1];
};

export const sGetTotalCorrectQuestions = (state) => {
  return state.quizTake.totalCorrectQuestions;
};

export const sGetTotalWrongQuestions = (state) => {
  return state.quizTake.totalWrongQuestions;
};
