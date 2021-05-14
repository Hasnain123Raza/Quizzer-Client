export const sGetUsername = (state) => state.authentication.login.username;

export const sGetPassword = (state) => state.authentication.login.password;

export const sGetUser = (state) => ({
  username: sGetUsername(state),
  password: sGetPassword(state),
});

export const sGetPostLoginRequestStatus = (state) =>
  state.authentication.login.postLoginRequestStatus;

export const sGetValidationErrors = (state) =>
  state.authentication.login.validationErrors;

export const sGetUsernameError = (state) =>
  sGetValidationErrors(state).filter(
    ({ path }) => path.length == 1 && path[0] == "username"
  )[0]?.message;

export const sGetPasswordError = (state) =>
  sGetValidationErrors(state).filter(
    ({ path }) => path.length == 1 && path[0] == "password"
  )[0]?.message;
