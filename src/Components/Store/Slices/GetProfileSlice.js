import { createSlice } from "@reduxjs/toolkit";
import authToProfile from "../Thunks/getProfileThunk";

const GetProfileSlice = createSlice({
  name: "GetProfileSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authToProfile.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authToProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      state.error = null;
    });
    builder.addCase(authToProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
          
      })
  }
});

export const {} = GetProfileSlice.actions
export default GetProfileSlice.reducer
