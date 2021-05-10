import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "../../areas/Quiz/services/quizReducer.js";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;
