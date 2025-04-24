import { createSlice } from "@reduxjs/toolkit";
import signupForAuth from "../Thunks/signupThunk";

const SignupSlice = createSlice({
  name: "SignupSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupForAuth.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }); // can't use comma (,)
      
    builder.addCase(signupForAuth.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user = action?.payload?.message;
        state.error = null;
      }
    });
      
    builder.addCase(signupForAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    });
  },
});

export const {} = SignupSlice.actions;
export default SignupSlice.reducer;
