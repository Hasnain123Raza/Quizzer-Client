import * as actionTypes from "./actionTypes.js";

export const loadQuizCreateForm = (quiz) => {
  return {
    type: actionTypes.LOAD_QUIZ_CREATE_FORM,
    payload: { quiz },
  };
};

export const clearCreateForm = () => {
  return {
    type: actionTypes.CLEAR_CREATE_FORM,
    payload: {},
  };
};

export const updateQuizTitle = (quizTitle) => {
  return {
    type: actionTypes.UPDATE_QUIZ_TITLE,
    payload: { quizTitle },
  };
};

export const updateQuizDescription = (quizDescription) => {
  return {
    type: actionTypes.UPDATE_QUIZ_DESCRIPTION,
    payload: { quizDescription },
  };
};

export const addQuestion = () => {
  return {
    type: actionTypes.ADD_QUESTION,
    payload: {},
  };
};

export const removeQuestion = (questionIndex) => {
  return {
    type: actionTypes.REMOVE_QUESTION,
    payload: { questionIndex },
  };
};

export const updateQuestionPrompt = (questionIndex, questionPrompt) => {
  return {
    type: actionTypes.UPDATE_QUESTION_PROMPT,
    payload: { questionIndex, questionPrompt },
  };
};

export const addChoice = (questionIndex) => {
  return {
    type: actionTypes.ADD_CHOICE,
    payload: { questionIndex },
  };
};

export const removeChoice = (questionIndex, choiceIndex) => {
  return {
    type: actionTypes.REMOVE_CHOICE,
    payload: { questionIndex, choiceIndex },
  };
};

export const updateChoicePrompt = (
  questionIndex,
  choiceIndex,
  choicePrompt
) => {
  return {
    type: actionTypes.UPDATE_CHOICE_PROMPT,
    payload: { questionIndex, choiceIndex, choicePrompt },
  };
};

export const updateChoiceCorrect = (
  questionIndex,
  choiceIndex,
  choiceCorrect
) => {
  return {
    type: actionTypes.UPDATE_CHOICE_CORRECT,
    payload: { questionIndex, choiceIndex, choiceCorrect },
  };
};
