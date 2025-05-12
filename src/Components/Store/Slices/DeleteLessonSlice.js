import { createSlice } from "@reduxjs/toolkit";
import deleteLessonThunk from "../Thunks/deleteLessonThunk";

const DeleteLessonSlice = createSlice({
  name: "DeleteLessonSlice",
  initialState: {
    deleteLesson: null,
    deleteLessonLoading: false,
    deleteLessonError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteLessonThunk.pending, (state, action) => {
      state.deleteLessonLoading = true;
      state.deleteLessonError = null;
      console.log(action);
    });
    builder.addCase(deleteLessonThunk.fulfilled, (state, action) => {
      state.deleteLessonLoading = false;
      state.deleteLesson = action?.payload
      state.deleteLessonError = null;
    });
    builder.addCase(deleteLessonThunk.rejected, (state, action) => {
      state.deleteLessonLoading = false;
      state.deleteLessonError =
        action?.payload?.message || "Something Went Wrong";
    });
  },
});
export default DeleteLessonSlice.reducer;
