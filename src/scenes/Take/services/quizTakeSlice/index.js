import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuiz, fetchCorrectChoices } from "../api.js";
import {
  sGetSelectedChoiceId,
  sGetTotalCorrectQuestions,
  sGetTotalWrongQuestions,
} from "./selectors.js";

export const getQuiz = createAsyncThunk("quizTake/getQuiz", async (quizId) => {
  return await fetchQuiz(quizId);
});

export const getCorrectChoices = createAsyncThunk(
  "quizTake/getCorrectChoices",
  async ({ quizId, questionId }, { dispatch, getState }) => {
    const correctChoices = await fetchCorrectChoices(quizId, questionId);
    const selectedChoiceId = sGetSelectedChoiceId(getState());
    const isCorrect = correctChoices.some((id) => id == selectedChoiceId);

    const totalCorrectQuestions = sGetTotalCorrectQuestions(getState());
    const totalWrongQuestions = sGetTotalWrongQuestions(getState());

    dispatch(setSelectedChoiceCorrect(isCorrect));
    if (isCorrect)
      dispatch(setTotalCorrectQuestions(totalCorrectQuestions + 1));
    else dispatch(setTotalWrongQuestions(totalWrongQuestions + 1));

    return correctChoices;
  }
);

const initialState = {
  quiz: {},
  quizRequestStatus: "idle",
  correctChoices: [],
  correctChoicesRequestStatus: "idle",
  currentQuestionId: 1,
  selectedChoiceId: -1,
  selectedChoiceCorrect: false,
  totalCorrectQuestions: 0,
  totalWrongQuestions: 0,
  quizFinished: false,
};

const quizTakeSlice = createSlice({
  name: "quizTake",
  initialState,
  reducers: {
    clearTake(state, action) {
      return { ...initialState };
    },

    clearCorrectChoices(state, action) {
      state.correctChoices = [];
      state.correctChoicesRequestStatus = "idle";
    },

    incrementCurrentQuestionId(state, action) {
      state.currentQuestionId++;
    },

    setSelectedChoiceId(state, action) {
      state.selectedChoiceId = action.payload;
      state.selectedChoiceCorrect = false;
    },

    setSelectedChoiceCorrect(state, action) {
      state.selectedChoiceCorrect = action.payload;
    },

    setTotalCorrectQuestions(state, action) {
      state.totalCorrectQuestions = action.payload;
    },

    setTotalWrongQuestions(state, action) {
      state.totalWrongQuestions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state, action) => {
        state.quizRequestStatus = "pending";
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.quizRequestStatus = "fulfilled";
        state.quiz = action.payload;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.quizRequestStatus = "rejected";
      })
      .addCase(getCorrectChoices.pending, (state, action) => {
        state.correctChoicesRequestStatus = "pending";
      })
      .addCase(getCorrectChoices.fulfilled, (state, action) => {
        state.correctChoicesRequestStatus = "fulfilled";
        state.correctChoices = action.payload;
      })
      .addCase(getCorrectChoices.rejected, (state, action) => {
        state.correctChoicesRequestStatus = "rejected";
      });
  },
});

export const {
  clearTake,
  clearCorrectChoices,
  incrementCurrentQuestionId,
  setSelectedChoiceId,
  setSelectedChoiceCorrect,
  setTotalCorrectQuestions,
  setTotalWrongQuestions,
} = quizTakeSlice.actions;

export default quizTakeSlice.reducer;
