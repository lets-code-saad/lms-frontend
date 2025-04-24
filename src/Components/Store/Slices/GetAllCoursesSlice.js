import { createSlice } from "@reduxjs/toolkit";
import getAllCourses from "../Thunks/getAllCourses";

const GetAllCourses = createSlice({
  name: "GetAllCoursesSlice",
  initialState: {
    allCourses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        // payload is not an array, the allCourses inside it is an array
      state.allCourses = action.payload.allCourses;
      console.log(action)
      state.error = null;
    });
    builder.addCase(getAllCourses.rejected, (state, action) => {
      state.loading = false;
        state.error = action.payload;
    });
  },
});

export default GetAllCourses.reducer