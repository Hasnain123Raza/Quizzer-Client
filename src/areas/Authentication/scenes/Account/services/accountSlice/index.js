import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogout } from "../api.js";
import { getAuthenticated } from "../../../../../../services/authenticatedSlice";

const initialState = {
  postLogoutRequestStatus: "idle",
};

export const postLogoutRequest = createAsyncThunk(
  "account/postLogoutRequest",
  async (_, { dispatch }) => {
    const data = await postLogout();
    await dispatch(getAuthenticated());
    return data;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset(state, action) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogoutRequest.pending, (state, action) => {
        state.postLogoutRequestStatus = "pending";
      })
      .addCase(postLogoutRequest.fulfilled, (state, action) => {
        state.postLogoutRequestStatus = "fulfilled";
      })
      .addCase(postLogoutRequest.rejected, (state, action) => {
        state.postLogoutRequestStatus = "rejected";
      });
  },
});

export const { reset } = accountSlice.actions;

export default accountSlice.reducer;
