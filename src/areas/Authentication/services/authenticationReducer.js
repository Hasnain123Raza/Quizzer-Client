import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "../scenes/Login/services/loginSlice";
import registerReducer from "../scenes/Register/services/registerSlice";
import accountReducer from "../scenes/Account/services/accountSlice";

const authenticationReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  account: accountReducer,
});

export default authenticationReducer;
