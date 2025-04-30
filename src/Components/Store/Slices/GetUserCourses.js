import { createSlice } from "@reduxjs/toolkit";
import fetchCourses from "../Thunks/coursesThunk";

const GetUserCourses = createSlice({
  name: "GetUserCourses",
    initialState: {
      courses:[],
      loading: false,
      error:null
  },
  reducers: { 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.pending, (state,action) => {
                state.loading = true
                state.error = null
        })


            builder.addCase(fetchCourses.fulfilled, (state, action) => {
              state.loading = false;
              state.courses = action?.payload
              state.error = null;
                
            })
        
            builder.addCase(fetchCourses.rejected, (state, action) => {
                state.loading =false
                state.error = action.payload?.message
            })
    }
});

export const {  } = GetUserCourses.actions;
export default GetUserCourses.reducer;
