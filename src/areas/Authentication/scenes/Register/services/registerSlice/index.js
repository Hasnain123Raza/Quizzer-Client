import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegister } from "../api.js";
import userSchema from "../../../../services/userSchema.js";

const initialState = {
  username: "",
  password: "",
  postRegisterRequestStatus: "idle",
  validationErrors: [],
};

export const postRegisterForm = createAsyncThunk(
  "register/postRegisterForm",
  async (user, { rejectWithValue }) => {
    const result = userSchema.validate(user, { abortEarly: false });
    if (result.error) return rejectWithValue(result.error.details);

    const data = await postRegister(user);
    if (data.error)
      return rejectWithValue([{ message: data.error, path: [data.field] }]);

    return data;
  }
);

const registerSlice = createSlice({
  name: "register",
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
      .addCase(postRegisterForm.pending, (state, action) => {
        state.postRegisterRequestStatus = "pending";
      })
      .addCase(postRegisterForm.fulfilled, (state, action) => {
        state.postRegisterRequestStatus = "fulfilled";
        state.validationErrors = [];
      })
      .addCase(postRegisterForm.rejected, (state, action) => {
        state.postRegisterRequestStatus = "rejected";
        state.validationErrors = action.payload;
      });
  },
});

export const { reset, setUsername, setPassword } = registerSlice.actions;

export default registerSlice.reducer;
