import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSimplifiedQuiz } from "../api.js";

const initialState = {
  simplifiedQuiz: {},
  simplifiedQuizRequestStatus: "idle",
};

export const getSimplifiedQuiz = createAsyncThunk(
  "openQuiz/getSimplifiedQuiz",
  async (quizId) => {
    return await fetchSimplifiedQuiz(quizId);
  }
);

const openQuizSlice = createSlice({
  name: "openQuiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSimplifiedQuiz.pending, (state, action) => {
        state.simplifiedQuizRequestStatus = "pending";
      })
      .addCase(getSimplifiedQuiz.fulfilled, (state, action) => {
        state.simplifiedQuizRequestStatus = "fulfilled";
        state.simplifiedQuiz = action.payload;
      })
      .addCase(getSimplifiedQuiz.rejected, (state, action) => {
        state.simplifiedQuizRequestStatus = "rejected";
      });
  },
});

export const {} = openQuizSlice.actions;

export default openQuizSlice.reducer;
