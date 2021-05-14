import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../api.js";
import userSchema from "../../../../services/userSchema.js";

const initialState = {
  username: "",
  password: "",
  postLoginRequestStatus: "idle",
  validationErrors: [],
};

export const postLoginForm = createAsyncThunk(
  "login/postLoginForm",
  async (user, { rejectWithValue }) => {
    const result = userSchema.validate(user, { abortEarly: false });
    if (result.error) return rejectWithValue(result.error.details);

    const data = await postLogin(user);
    if (data.error)
      return rejectWithValue([{ message: data.error, path: [data.field] }]);

    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset(state, action) {
      return { ...initialState };
    },

    setUsername(state, action) {
      state.username = action.payload;
    },

    setPassword(state, action) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLoginForm.pending, (state, action) => {
        state.postLoginRequestStatus = "pending";
      })
      .addCase(postLoginForm.fulfilled, (state, action) => {
        state.postLoginRequestStatus = "fulfilled";
        state.validationErrors = [];
      })
      .addCase(postLoginForm.rejected, (state, action) => {
        state.postLoginRequestStatus = "rejected";
        state.validationErrors = action.payload;
      });
  },
});

export const { reset, setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
