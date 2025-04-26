import { createSlice } from "@reduxjs/toolkit";
import forgotPassword from "../Thunks/forgotPassThunk";
import deleteCourse from "../Thunks/deleteCourseThunk";

const DeleteCourseSlice = createSlice({
  name: "DeleteCourseSlice",
  initialState: {
    deleteUser: null,
    deleteCallLoading: false,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCourse.pending, (state, action) => {
      state.deleteCallLoading = true;
      state.deleteError = null;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.deleteCallLoading = false;
      state.deleteUser = action?.payload?.message;
      console.log(action);
      state.deleteError = null;
      
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.deleteCallLoading = false;
      state.deleteError = action?.payload?.message;
    });
  },
});

export const {} = DeleteCourseSlice.actions;
export default DeleteCourseSlice.reducer;
