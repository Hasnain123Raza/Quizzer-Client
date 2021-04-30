import {
  LOAD_QUIZ_CREATE_FORM,
  CLEAR_CREATE_FORM,
  UPDATE_QUIZ_TITLE,
  UPDATE_QUIZ_DESCRIPTION,
  ADD_QUESTION,
  REMOVE_QUESTION,
  UPDATE_QUESTION_PROMPT,
  ADD_CHOICE,
  REMOVE_CHOICE,
  UPDATE_CHOICE_PROMPT,
  UPDATE_CHOICE_CORRECT,
} from "./actionTypes.js";
import produce from "immer";

const initialState = {
  title: "",
  description: "",
  questions: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case LOAD_QUIZ_CREATE_FORM:
        return payload.quiz;
      case CLEAR_CREATE_FORM:
        return { ...initialState };
      case UPDATE_QUIZ_TITLE:
        draft.title = payload.quizTitle;
        break;
      case UPDATE_QUIZ_DESCRIPTION:
        draft.description = payload.quizDescription;
        break;
      case ADD_QUESTION:
        draft.questions.push({
          prompt: "",
          choices: [],
        });
        break;
      case REMOVE_QUESTION:
        draft.questions.splice(payload.questionIndex, 1);
        break;
      case UPDATE_QUESTION_PROMPT:
        draft.questions[payload.questionIndex].prompt = payload.questionPrompt;
        break;
      case ADD_CHOICE:
        draft.questions[payload.questionIndex].choices.push({
          prompt: "",
          correct: false,
        });
        break;
      case REMOVE_CHOICE:
        draft.questions[payload.questionIndex].choices.splice(
          payload.choiceIndex,
          1
        );
        break;
      case UPDATE_CHOICE_PROMPT:
        draft.questions[payload.questionIndex].choices[
          payload.choiceIndex
        ].prompt = payload.choicePrompt;
        break;
      case UPDATE_CHOICE_CORRECT:
        draft.questions[payload.questionIndex].choices[
          payload.choiceIndex
        ].correct = payload.choiceCorrect;
        break;
      default:
        return draft;
    }
  });
}
