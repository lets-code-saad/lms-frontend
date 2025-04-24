import { createSlice } from "@reduxjs/toolkit";
import singleCourse from "../Thunks/singleCourseThunk";

const GetSingleCourse = createSlice({
  name: "GetSingleCourse",
    initialState: {
      getSingleCourse:{},
      loading: false,
      error:null
  },
  reducers: { 
    },
    extraReducers: (builder) => {
        builder.addCase(singleCourse.pending, (state,action) => {
                state.loading = true
                state.error = null
        })


            builder.addCase(singleCourse.fulfilled, (state, action) => {
              state.getSingleCourse = action.payload;
              state.loading = false;
              state.error = null;
                
            })
        
            builder.addCase(singleCourse.rejected, (state, action) => {
                state.loading =false
                state.error = action.payload
            })
    }
});

export const {  } = GetSingleCourse.actions;
export default GetSingleCourse.reducer;
