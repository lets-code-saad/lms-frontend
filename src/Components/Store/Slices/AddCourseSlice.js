import { createSlice } from "@reduxjs/toolkit";
import addCourse from "../Thunks/addCourseThunk";

const AddCourseSlice = createSlice({
    name:"AddCourse",
  initialState: {
    user: null,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCourse.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
      builder.addCase(addCourse.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
      })
  },
});

export const { } = AddCourseSlice.actions
export default AddCourseSlice.reducer
