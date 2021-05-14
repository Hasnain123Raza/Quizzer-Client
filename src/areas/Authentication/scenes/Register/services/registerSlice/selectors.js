export const sGetUsername = (state) => state.authentication.register.username;

export const sGetPassword = (state) => state.authentication.register.password;

export const sGetUser = (state) => ({
  username: sGetUsername(state),
  password: sGetPassword(state),
});

export const sGetPostRegisterRequestStatus = (state) =>
  state.authentication.register.postRegisterRequestStatus;

export const sGetValidationErrors = (state) =>
  state.authentication.register.validationErrors;

export const sGetUsernameError = (state) =>
  sGetValidationErrors(state).filter(
    ({ path }) => path.length == 1 && path[0] == "username"
  )[0]?.message;

export const sGetPasswordError = (state) =>
  sGetValidationErrors(state).filter(
    ({ path }) => path.length == 1 && path[0] == "password"
  )[0]?.message;
