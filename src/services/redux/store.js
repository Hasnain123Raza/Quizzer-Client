import { configureStore } from "@reduxjs/toolkit";

import quizCreateFormReducer from "../../../src/scenes/Create/services/quizCreateFormSlice";
import quizzesSimplifiedReducer from "../../../src/scenes/Browse/services/quizzesSimplifiedSlice";
import openQuizReducer from "../../../src/scenes/Open/services/openQuizSlice";
import takeQuizReducer from "../../../src/scenes/Take/services/quizTakeSlice";

const store = configureStore({
  reducer: {
    quizCreateForm: quizCreateFormReducer,
    quizzesSimplified: quizzesSimplifiedReducer,
    openQuiz: openQuizReducer,
    quizTake: takeQuizReducer,
  },
});

export default store;
