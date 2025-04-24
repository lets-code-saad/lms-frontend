import { createSlice } from "@reduxjs/toolkit";
import unEnrollCourse from "../Thunks/unEnrollCourse";

const UnEnrollCourseSlice = createSlice({
  name: "UnEnrollCourseSlice",
  initialState: {
    user: null,
    unEnrollLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unEnrollCourse.pending, (state, action) => {
      state.unEnrollLoading = true;
      state.error = null;
    });
    builder.addCase(unEnrollCourse.fulfilled, (state, action) => {
      state.unEnrollLoading = false;
      state.user = action?.payload;
    });
    builder.addCase(unEnrollCourse.rejected, (state, action) => {
      state.unEnrollLoading = false;
      state.error = action?.payload?.message;
    });
  },
});

export const {} = UnEnrollCourseSlice.actions;
export default UnEnrollCourseSlice.reducer;
