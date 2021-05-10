import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUnrevealedQuiz, fetchCorrectChoices } from "../api.js";
import {
  sGetSelectedChoiceId,
  sGetTotalCorrectQuestions,
  sGetTotalWrongQuestions,
} from "./selectors.js";

export const getUnrevealedQuiz = createAsyncThunk(
  "quizTake/getUnrevealedQuiz",
  async (quizId) => {
    return await fetchUnrevealedQuiz(quizId);
  }
);

export const getCorrectChoices = createAsyncThunk(
  "take/getCorrectChoices",
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

const takeSlice = createSlice({
  name: "take",
  initialState,
  reducers: {
    reset(state, action) {
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
      .addCase(getUnrevealedQuiz.pending, (state, action) => {
        state.quizRequestStatus = "pending";
      })
      .addCase(getUnrevealedQuiz.fulfilled, (state, action) => {
        state.quizRequestStatus = "fulfilled";
        state.quiz = action.payload;
      })
      .addCase(getUnrevealedQuiz.rejected, (state, action) => {
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
  reset,
  clearCorrectChoices,
  incrementCurrentQuestionId,
  setSelectedChoiceId,
  setSelectedChoiceCorrect,
  setTotalCorrectQuestions,
  setTotalWrongQuestions,
} = takeSlice.actions;

export default takeSlice.reducer;
