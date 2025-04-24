import { createSlice } from "@reduxjs/toolkit";
import enrollCourse from "../Thunks/enrollCourse";

const EnrollCourseSlice = createSlice({
  name: "EnrollCourseSlice",
  initialState: {
    user: null,
    enrollLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(enrollCourse.pending, (state, action) => {
      state.enrollLoading = true;
      state.error = null;
    });
    builder.addCase(enrollCourse.fulfilled, (state, action) => {
      state.enrollLoading = false;
      state.user = action?.payload;
      state.error = null;
    });
    builder.addCase(enrollCourse.rejected, (state, action) => {
      state.enrollLoading = false;
      state.error = action?.payload?.message;
    });
  },
});

export const {} = EnrollCourseSlice.actions;
export default EnrollCourseSlice.reducer;
