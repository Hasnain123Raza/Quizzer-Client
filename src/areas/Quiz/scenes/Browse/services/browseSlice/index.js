import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuizCount, fetchSimplifiedQuizzes } from "../api.js";
import { sGetCurrentPage } from "./selectors.js";

const initialState = {
  quizCount: 0,
  simplifiedQuizzes: [],
  quizCountRequestStatus: "idle",
  simplifiedQuizzesRequestStatus: "idle",
  currentPage: 1,
};

export const getQuizCount = createAsyncThunk(
  "browse/getQuizCount",
  async () => {
    return await fetchQuizCount();
  }
);

export const getSimplifiedQuizzes = createAsyncThunk(
  "browse/getSimplifiedQuizzes",
  async (pageSize, { getState }) => {
    return await fetchSimplifiedQuizzes(
      sGetCurrentPage(getState()) - 1,
      pageSize
    );
  }
);

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    reset(state, action) {
      return { ...initialState };
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
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

export const { reset, setCurrentPage } = browseSlice.actions;

export default browseSlice.reducer;
