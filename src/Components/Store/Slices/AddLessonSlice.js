import { createSlice } from "@reduxjs/toolkit";
import addLessonThunk from "../Thunks/addLessonThunk";

const AddLessonSlice = createSlice({
  name: "AddLessonSlice",
  initialState: {
    stateLessons: [],
    addLessonLoading: false,
    lessonError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addLessonThunk.pending, (state, action) => {
      state.addLessonLoading = true;
      state.lessonError = null;
      console.log(action)
      
    });
    builder.addCase(addLessonThunk.fulfilled, (state, action) => {
      state.addLessonLoading = false;
      state.stateLessons.push(action?.payload?.newLesson);
      state.lessonError = null;
    });
    builder.addCase(addLessonThunk.rejected, (state, action) => {
      state.addLessonLoading = false;
      state.lessonError = action?.payload?.message || "Something Went Wrong";
    });
  },
});

export default AddLessonSlice.reducer;
