import {
  ADD_QUIZ,
  CLEAR_QUIZZES,
  REMOVE_QUIZ,
  UPDATE_QUIZ,
} from "./actionTypes.js";
import produce from "immer";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_QUIZ:
      return produce(state, (draft) => {
        draft.push(payload.quiz);
      });
    case CLEAR_QUIZZES:
      return [];
    case REMOVE_QUIZ:
      return state.filter((quiz) => quiz.id !== payload.quizId);
    case UPDATE_QUIZ:
      const newState = state.filter((quiz) => quiz.id !== payload.quiz.id);
      return produce(newState, (draft) => {
        draft.push(payload.quiz);
      });
    default:
      return state;
  }
}
