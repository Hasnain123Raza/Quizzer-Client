export const sGetAuthenticatedUser = (state) =>
  state.authenticated.authenticated;

export const sGetIsAuthenticated = (state) =>
  state.authenticated.authenticated !== null &&
  state.authenticated.authenticated !== undefined;

export const sGetAuthenticatedRequestStatus = (state) =>
  state.authenticated.getAuthenticatedRequestStatus;

export const sGetHasAuthenticatedBefore = (state) =>
  state.authenticated.firstTime == false;
