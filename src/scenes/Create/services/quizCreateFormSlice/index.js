import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postQuiz } from "../api.js";
import QuizSchema from "../quizSchema";

const initialState = {
  quiz: {
    title: "",
    description: "",
    questions: [],
  },
  postStatus: "idle",
  validationErrors: [],
};

export const postQuizCreateForm = createAsyncThunk(
  "quizCreateForm/postQuizCreateForm",
  async (quiz, { rejectWithValue }) => {
    const result = QuizSchema.validate(quiz, { abortEarly: false });
    if (result.error) return rejectWithValue(result.error.details);
    const data = await postQuiz(quiz);
    return data;
  }
);

const quizCreateFormSlice = createSlice({
  name: "quizCreateForm",
  initialState,
  reducers: {
    loadQuizCreateForm(state, action) {
      state.quiz = action.payload;
    },

    clearCreateForm(state, action) {
      return { ...initialState };
    },

    updateValidationErrors(state, action) {
      state.validationErrors = action.payload;
    },

    updateQuizTitle(state, action) {
      state.quiz.title = action.payload;
    },

    updateQuizDescription(state, action) {
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

    updateQuestionPrompt: {
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

    updateChoicePrompt: {
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

    updateChoiceCorrect: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(postQuizCreateForm.pending, (state, action) => {
        state.postStatus = "pending";
      })
      .addCase(postQuizCreateForm.fulfilled, (state, action) => {
        state.validationErrors = [];
        state.postStatus = "fulfilled";
      })
      .addCase(postQuizCreateForm.rejected, (state, action) => {
        state.validationErrors = action.payload;
        state.postStatus = "rejected";
      });
  },
});

export const {
  loadQuizCreateForm,
  clearCreateForm,
  updateValidationErrors,
  updateQuizTitle,
  updateQuizDescription,
  addQuestion,
  removeQuestion,
  updateQuestionPrompt,
  addChoice,
  removeChoice,
  updateChoicePrompt,
  updateChoiceCorrect,
} = quizCreateFormSlice.actions;

export default quizCreateFormSlice.reducer;
