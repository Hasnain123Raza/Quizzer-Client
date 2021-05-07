import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuizCount, fetchSimplifiedQuizzes } from "../api.js";

const initialState = {
  quizCount: -1,
  simplifiedQuizzes: [],
  quizCountRequestStatus: "idle",
  simplifiedQuizzesRequestStatus: "idle",
};

export const getQuizCount = createAsyncThunk(
  "quizzesSimplified/getQuizCount",
  async () => {
    return await fetchQuizCount();
  }
);

export const getSimplifiedQuizzes = createAsyncThunk(
  "quizzesSimplified/getSimplifiedQuizzes",
  async ({ pageIndex, pageSize }) => {
    return await fetchSimplifiedQuizzes(pageIndex, pageSize);
  }
);

const quizzesSimplifiedSlice = createSlice({
  name: "quizzesSimplified",
  initialState,
  reducers: {
    clearBrowseView(state, action) {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizCount.pending, (state, action) => {
        state.quizCountRequestStatus = "pending";
      })
      .addCase(getQuizCount.fulfilled, (state, action) => {
        state.quizCountRequestStatus = "fulfilled";
        state.quizCount = action.payload;
      })
      .addCase(getQuizCount.rejected, (state, action) => {
        state.quizCountRequestStatus = "rejected";
      })
      .addCase(getSimplifiedQuizzes.pending, (state, action) => {
        state.simplifiedQuizzesRequestStatus = "pending";
      })
      .addCase(getSimplifiedQuizzes.fulfilled, (state, action) => {
        state.simplifiedQuizzesRequestStatus = "fulfilled";
        state.simplifiedQuizzes = action.payload;
      })
      .addCase(getSimplifiedQuizzes.rejected, (state, action) => {
        state.simplifiedQuizzesRequestStatus = "rejected";
      });
  },
});

export const { clearBrowseView } = quizzesSimplifiedSlice.actions;

export default quizzesSimplifiedSlice.reducer;
