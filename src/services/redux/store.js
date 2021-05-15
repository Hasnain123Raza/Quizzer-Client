import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "../../areas/Quiz/services/quizReducer.js";
import authenticationReducer from "../../areas/Authentication/services/authenticationReducer.js";
import authenticatedReducer from "../authenticatedSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    authentication: authenticationReducer,
    authenticated: authenticatedReducer,
  },
});

export default store;
