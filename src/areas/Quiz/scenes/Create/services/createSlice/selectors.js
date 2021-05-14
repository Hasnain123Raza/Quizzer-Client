export const sGetQuiz = (state) => state.quiz.create.quiz;

export const sGetQuizTitle = (state) => sGetQuiz(state).title;

export const sGetQuizDescription = (state) => sGetQuiz(state).description;

export const sGetQuestions = (state) => sGetQuiz(state).questions;

export const sGetQuestion = (questionIndex) => (state) =>
  sGetQuestions(state)[questionIndex];

export const sGetQuestionPrompt = (questionIndex) => (state) =>
  sGetQuestion(questionIndex)(state).prompt;

export const sGetChoices = (questionIndex) => (state) =>
  sGetQuestion(questionIndex)(state).choices;

export const sGetChoice = (questionIndex, choiceIndex) => (state) =>
  sGetChoices(questionIndex)(state)[choiceIndex];

export const sGetChoicePrompt = (questionId, choiceIndex) => (state) =>
  sGetChoice(questionId, choiceIndex)(state).prompt;

export const sGetChoiceCorrect = (questionId, choiceIndex) => (state) =>
  sGetChoice(questionId, choiceIndex)(state).correct;

export const sGetActiveQuestionIndex = (state) =>
  state.quiz.create.activeQuestionIndex;

export const sGetPostQuizRequestStatus = (state) =>
  state.quiz.create.postQuizRequestStatus;

export const sGetPostedQuizId = (state) => state.quiz.create.postedQuizId;

export const sGetQuizTitleError = (state) =>
  state.quiz.create.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "title"
  )[0]?.message;

export const sGetQuizDescriptionError = (state) =>
  state.quiz.create.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "description"
  )[0]?.message;

export const sGetQuestionsAmountError = (state) =>
  state.quiz.create.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "questions"
  )[0]?.message;

export const sGetQuestionPromptError = (questionIndex) => (state) =>
  state.quiz.create.validationErrors.filter(
    ({ path }) =>
      path.length == 3 &&
      path[0] == "questions" &&
      path[1] == questionIndex &&
      path[2] == "prompt"
  )[0]?.message;

export const sGetChoiceCriteriaError = (questionIndex) => (state) =>
  state.quiz.create.validationErrors.filter(
    ({ path }) =>
      path.length == 3 &&
      path[0] == "questions" &&
      path[1] == questionIndex &&
      path[2] == "choices"
  )[0]?.message;
