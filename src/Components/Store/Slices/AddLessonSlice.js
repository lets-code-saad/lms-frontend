import { createSlice } from "@reduxjs/toolkit";
import addLessonThunk from "../Thunks/addLessonThunk";

const AddLessonSlice = createSlice({
  name: "AddLessonSlice",
  initialState: {
    stateLessons: [],
    lessonLoading: false,
    lessonError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addLessonThunk.pending, (state, action) => {
      state.lessonLoading = true;
      state.lessonError = null;
    });
    builder.addCase(addLessonThunk.fulfilled, (state, action) => {
      state.lessonLoading = false;

      state.stateLessons.push(action?.payload);
      state.lessonError = null;
    });
    builder.addCase(addLessonThunk.rejected, (state, action) => {
      state.lessonLoading = false;
      state.lessonError = action.payload?.message;
    });
  },
});
export default AddLessonSlice.reducer;
