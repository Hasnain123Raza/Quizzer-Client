import { combineReducers } from "@reduxjs/toolkit";

import browseReducer from "../scenes/Browse/services/browseSlice";
import createReducer from "../scenes/Create/services/createSlice";
import openReducer from "../scenes/Open/services/openSlice";
import takeReducer from "../scenes/Take/services/takeSlice";

const quizReducer = combineReducers({
  browse: browseReducer,
  create: createReducer,
  open: openReducer,
  take: takeReducer,
});

export default quizReducer;
