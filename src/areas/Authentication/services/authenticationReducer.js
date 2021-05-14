import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "../scenes/Login/services/loginSlice";
import registerReducer from "../scenes/Register/services/registerSlice";

const authenticationReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default authenticationReducer;
