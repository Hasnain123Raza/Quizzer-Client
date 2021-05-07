export const getQuizCreateForm = (state) => state.quizCreateForm;

export const getQuizTitleError = (state) =>
  state.quizCreateForm.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "title"
  )[0]?.message;

export const getQuizDescriptionError = (state) =>
  state.quizCreateForm.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "description"
  )[0]?.message;

export const getQuestionPromptError = (questionIndex) => (state) =>
  state.quizCreateForm.validationErrors.filter(
    ({ path }) =>
      path.length == 3 &&
      path[0] == "questions" &&
      path[1] == questionIndex &&
      path[2] == "prompt"
  )[0]?.message;

export const getChoiceCriteriaError = (questionIndex) => (state) =>
  state.quizCreateForm.validationErrors.filter(
    ({ path }) =>
      path.length == 3 &&
      path[0] == "questions" &&
      path[1] == questionIndex &&
      path[2] == "choices"
  )[0]?.message;

export const getQuestionsAmountError = (state) =>
  state.quizCreateForm.validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] == "questions"
  )[0]?.message;
