import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "../../areas/Quiz/services/quizReducer.js";
import authenticationReducer from "../../areas/Authentication/services/authenticationReducer.js";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    authentication: authenticationReducer,
  },
});

export default store;
