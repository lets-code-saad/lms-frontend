import { createSlice } from "@reduxjs/toolkit";
import signinForAuth from "../Thunks/signinThunk";

const SigninSlice = createSlice({
  name: "SigninSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinForAuth.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signinForAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signinForAuth.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          
      })
  },
});

export const {} = SigninSlice.actions
export default SigninSlice.reducer
