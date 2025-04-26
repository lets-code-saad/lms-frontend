import { createSlice } from "@reduxjs/toolkit";
import resetPassword from "../Thunks/resetPassThunk";

const ResetPasswordSlice = createSlice({
  name: "ResetPasswordSlice",
  initialState: {
    resetUser: null,
    resetCallLoading: null,
    resetError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state, action) => {
      state.resetCallLoading = true;
      state.resetError = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetCallLoading = false;
      state.resetUser = action.payload;
      state.resetError = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetCallLoading = false;
      state.resetError = action?.payload?.message;
    });
  },
});

export const {} = ResetPasswordSlice.actions;
export default ResetPasswordSlice.reducer;
