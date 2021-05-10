import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postQuiz } from "../api.js";
import quizSchema from "../quizSchema";

const initialState = {
  quiz: {
    title: "",
    description: "",
    questions: [],
  },
  activeQuestionIndex: -1,
  postQuizRequestStatus: "idle",
  validationErrors: [],
};

export const postQuizCreateForm = createAsyncThunk(
  "create/postQuizCreateForm",
  async (quiz, { rejectWithValue }) => {
    const result = quizSchema.validate(quiz, { abortEarly: false });
    if (result.error) return rejectWithValue(result.error.details);
    const data = await postQuiz(quiz);
    return data;
  }
);

const createQuizSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    reset(state, action) {
      return { ...initialState };
    },

    setValidationErrors(state, action) {
      state.validationErrors = action.payload;
    },

    setQuizTitle(state, action) {
      state.quiz.title = action.payload;
    },

    setQuizDescription(state, action) {
      state.quiz.description = action.payload;
    },

    addQuestion(state, action) {
      state.quiz.questions.push({
        prompt: "",
        choices: [],
      });
    },

    removeQuestion(state, action) {
      state.quiz.questions.splice(action.payload, 1);
    },

    setQuestionPrompt: {
      reducer(state, action) {
        const { questionIndex, questionPrompt } = action.payload;
        state.quiz.questions[questionIndex].prompt = questionPrompt;
      },
      prepare(questionIndex, questionPrompt) {
        return {
          payload: { questionIndex, questionPrompt },
        };
      },
    },

    addChoice(state, action) {
      state.quiz.questions[action.payload].choices.push({
        prompt: "",
        correct: false,
      });
    },

    removeChoice: {
      reducer(state, action) {
        const { questionIndex, choiceIndex } = action.payload;
        state.quiz.questions[questionIndex].choices.splice(choiceIndex, 1);
      },
      prepare(questionIndex, choiceIndex) {
        return {
          payload: { questionIndex, choiceIndex },
        };
      },
    },

    setChoicePrompt: {
      reducer(state, action) {
        const { questionIndex, choiceIndex, choicePrompt } = action.payload;
        state.quiz.questions[questionIndex].choices[
          choiceIndex
        ].prompt = choicePrompt;
      },
      prepare(questionIndex, choiceIndex, choicePrompt) {
        return {
          payload: { questionIndex, choiceIndex, choicePrompt },
        };
      },
    },

    setChoiceCorrect: {
      reducer(state, action) {
        const { questionIndex, choiceIndex, choiceCorrect } = action.payload;
        state.quiz.questions[questionIndex].choices[
          choiceIndex
        ].correct = choiceCorrect;
      },
      prepare(questionIndex, choiceIndex, choiceCorrect) {
        return {
          payload: { questionIndex, choiceIndex, choiceCorrect },
        };
      },
    },

    setActiveQuestionIndex(state, action) {
      state.activeQuestionIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postQuizCreateForm.pending, (state, action) => {
        state.postQuizRequestStatus = "pending";
      })
      .addCase(postQuizCreateForm.fulfilled, (state, action) => {
        state.postQuizRequestStatus = "fulfilled";
        state.validationErrors = [];
      })
      .addCase(postQuizCreateForm.rejected, (state, action) => {
        state.postQuizRequestStatus = "rejected";
        state.validationErrors = action.payload;
      });
  },
});

export const {
  reset,
  setValidationErrors,
  setQuizTitle,
  setQuizDescription,
  addQuestion,
  removeQuestion,
  setQuestionPrompt,
  addChoice,
  removeChoice,
  setChoicePrompt,
  setChoiceCorrect,
  setActiveQuestionIndex,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
