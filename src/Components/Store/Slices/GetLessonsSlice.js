import { createSlice } from "@reduxjs/toolkit";
import getLessonsThunk from "../Thunks/getLessonsThunk";

const GetLessonsSlice = createSlice({
  name: "GetLessonsSlice",
  initialState: {
    getLessons:[],
    getLessonsLoading: false,
    getLessonsError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonsThunk.pending, (state, action) => {
      state.getLessonsLoading = true;
      state.getLessonsError = null;
      console.log(action)
      
    });
    builder.addCase(getLessonsThunk.fulfilled, (state, action) => {
      state.getLessonsLoading = false;
      state.getLessons = action?.payload?.allLessons;
      state.getLessonsError = null;
    });
    builder.addCase(getLessonsThunk.rejected, (state, action) => {
      state.getLessonsLoading = false;
      state.getLessonsError = action?.payload?.message || "Something Went Wrong";
    });
  },
});
export default GetLessonsSlice.reducer;
