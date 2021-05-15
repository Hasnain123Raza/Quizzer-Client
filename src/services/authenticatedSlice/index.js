import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthenticated } from "./api.js";

const initialState = {
  authenticated: null,
  getAuthenticatedRequestStatus: "idle",
  firstTime: true,
};

export const getAuthenticated = createAsyncThunk(
  "authenticated/getAuthenticated",
  async () => {
    const data = await fetchAuthenticated();
    return data;
  }
);

const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    reset(state, action) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthenticated.pending, (state, action) => {
        state.getAuthenticatedRequestStatus = "pending";
        state.authenticated = null;
        state.firstTime = false;
      })
      .addCase(getAuthenticated.fulfilled, (state, action) => {
        state.getAuthenticatedRequestStatus = "fulfilled";
        state.authenticated = action.payload;
      })
      .addCase(getAuthenticated.rejected, (state, action) => {
        state.getAuthenticatedRequestStatus = "rejected";
        state.authenticated = null;
      });
  },
});

export const { reset } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
