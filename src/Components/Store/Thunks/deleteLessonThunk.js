import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const deleteLessonThunk = createAsyncThunk(
  "instructor/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.delete(
        `instructor/deleteLesson/${lessonId}`
      );
      return res?.data?.message;
      
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: error?.message }
      );
    }
  }
);

export default deleteLessonThunk;
