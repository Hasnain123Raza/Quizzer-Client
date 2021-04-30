import * as actionTypes from "./actionTypes.js";

export const addQuiz = (quiz) => {
  return {
    type: actionTypes.ADD_QUIZ,
    payload: { quiz },
  };
};

export const clearQuizzes = () => {
  return {
    type: actionTypes.CLEAR_QUIZZES,
    payload: {},
  };
};

export const removeQuiz = (quizId) => {
  return {
    type: actionTypes.REMOVE_QUIZ,
    payload: { quizId },
  };
};

export const updateQuiz = (quiz) => {
  return {
    type: actionTypes.UPDATE_QUIZ,
    payload: { quiz },
  };
};
