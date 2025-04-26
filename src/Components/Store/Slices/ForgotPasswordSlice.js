import { createSlice } from "@reduxjs/toolkit";
import forgotPassword from "../Thunks/forgotPassThunk";

const ForgotPasswordSlice = createSlice({
  name: "ForgotPasswordSlice",
  initialState: {
    forgotUser: null,
    forgotCallLoading: null,
    forgotError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.forgotCallLoading = true;
      state.forgotError = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotCallLoading = false;
      state.forgotUser = action.payload;
      state.forgotError = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.forgotCallLoading = false;
      state.forgotError = action?.payload?.message;
    });
  },
});

export const {} = ForgotPasswordSlice.actions;
export default ForgotPasswordSlice.reducer;
