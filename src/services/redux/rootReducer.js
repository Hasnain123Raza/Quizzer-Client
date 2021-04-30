import { combineReducers } from "redux";

import quizzes from "../../../src/scenes/Browse/services/quizzes/quizzesReducer.js";
import create from "../../../src/scenes/Create/services/create/createReducer.js";

export default combineReducers({ quizzes, create });
